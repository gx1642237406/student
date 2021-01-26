<template>
  <div class="main">
    <div v-show="classManag">
      <div class="mainHeader">
        <span>班级管理</span>
      </div>
      <div class="addButs">
        <el-button type="primary" round @click="add">+添加</el-button>
      </div>
      <div class="middle">
        <div class="table">
          <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                    prop="class_name"
                    label="班级名称"
                    align="center"
                    style="width:16.6%">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="编辑"
                    align="center"
                    style="width: 16.6%">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleEdite(scope.$index,scope.row)" round>编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.$index,scope.row)" round>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div><!--All结束-->
    <div v-show="addManag" class="test"><!--test组件  点击添加按钮后的页面-->
      <div class="top">
        <div class="topButs">
          <div class="button" @click="nextLevel">返回</div>
          <span class="title">{{ addclass }}</span>
        </div>
      </div>
      <div class="testAll">
        <div class="stWidth">
          <div class="label">学校：</div>
          <el-select v-model="school" placeholder="请选择学校">
            <el-option v-for="item in schoolData" :key="item.school_id"
                       :value="item.school_id"
                       :label="item.school_id"></el-option>
          </el-select>
        </div>
        <div class="stWidth">
          <div class="label">专业：</div>
          <el-select v-model="major" placeholder="请选择" @change="getTeacher">
            <el-option v-for="item in options" :key="item.majorId"
                       :value="item.majorId"
                       :label="item.majorName"></el-option>
          </el-select>
        </div>
        <div class="stWidth">
          <div class="label">年级：</div>
          <el-select v-model="grade" placeholder="请选择">
            <el-option v-for="item in tost" :key="item.gradeId"
                       :value="item.gradeId"
                       :label="item.gradeName"></el-option>
          </el-select>
        </div>
        <div class="stWidth">
          <div class="label">教师：</div>
          <el-select v-model="teacher" placeholder="请选择教师" :disabled="start">
            <el-option v-for="item in teacherData" :key="item.teacher_id"
                       :value="item.teacher_id"
                       :label="item.teacher_name"></el-option>
          </el-select>
        </div>

        <div class="stWidth">
          <div class="label">班级：</div>
          <el-input v-model="classData" placeholder="请输入内容"></el-input>
        </div>

        <div v-if="append">
          <el-row class="border">
            <el-button type="primary" @click="addClass" round>添加</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "classManag",
    data() {
      return {
        tableData: [],//班级信息
        classManag: true,
        addManag: false,
        addclass: '添加班级',
        options: [], //添加页面专业
        teacherData: [], //添加页面教师
        major: '', //添加班级专业ID
        tost: [],//年级
        grade: '',//添加班级年级ID
        append: true,
        classData: '',//添加班级  班级名称
        teacher: '',//添加班级  班主任教师Id
        school: '',//学校id
        start: true,//下拉框选择状态
        tinfo: '',//修改回显示教师ID
        classId: '',//班级ID
        schoolData: [{school_id: 1},{school_id: 2},{school_id: 3},{school_id: 4}],
        openStart: '',
      }
    },
    mounted() {
      this.getClass();
    },
    methods: {
      getClass() {
        this.$post("testIp/class/selectClassBySchool", {})
            .then((response) => {
              this.tableData = response.data;
            })
      },
      getMajor(info) {
        this.$post("testIp/major/selectMajorByAdminSchool", {})
            .then((response) => {
              this.options = response.data;
              if (info != null && info != 0 && info != "") {
                this.major = info;
                this.$post("testIp/teacher/selectTeacherByMajor?majorId=" + this.major, {})
                    .then((response) => {
                      this.teacherData = response.data;
                      this.start = false;
                      if (this.info != null && this.info != 0 && this.info != "") {
                        this.teacher = this.tinfo;
                      }
                    })
              }
            })
      },
      getGrade(info) {
        this.$post("testIp/grade/selectGradeAll", {})
            .then((response) => {
              this.tost = response.data;
              if (info != null && info != 0 && info != "") {
                this.grade = info;
              }
            })
      },
      getTeacher() {
        this.$post("testIp/teacher/selectTeacherByMajor?majorId=" + this.major, {})
            .then((response) => {
              this.teacherData = response.data;
              console.log(response.data);
              this.start = false;
            })
      },
      addClass() {
        this.$post("testIp/class/addClass", {
          classSchool: this.school,
          classMajor: this.major,
          classGrade: this.grade,
          classTeacher: this.teacher,
          className: this.classData,
        }).then((response) => {
          console.log(response);
          if (response.msg == '添加成功') {
            this.openStart = '添加成功';
            this.open();
            this.classManag = true;
            this.addManag = false
          }
          this.getClass();
        })
      },
      updateClass() {
        this.$post("testIp/class/updateClass", {
          classId: this.classId,
          clasSchoold: this.school,
          classMajor: this.major,
          classGrade: this.grade,
          classTeacher: this.teacher,
          className: this.classData
        }).then((response) => {
          console.log(response);
          if (response.code == 0) {
            this.openStart = "修改成功";
            this.open();
            this.classManag = true;
            this.addManag = false;
            this.getClass();
          }
        })
      },
      handleEdite(index, row) {
        console.log(index, row);
        this.tinfo = row.class_teacher;
        this.getMajor(row.class_major);
        this.getGrade(row.class_grade);
        this.classData = row.class_name;
        this.classId = row.class_id;
        this.append = true;
        this.classManag = false;
        this.addManag = true;
        this.addclass = '修改班级';

      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该班级，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: false
        }).then(() => {
          this.$post("testIp/class/deleteClass?classId=" + row.class_id, {})
              .then((response) => {
                if (response.msg == '删除成功') {
                  this.$message({type: 'success', message: '删除成功!'});
                  this.getClass();
                }
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      add() {
        this.getMajor();
        this.getGrade();
        this.classManag = false;
        this.addManag = true;
        this.addclass = '添加班级';
        this.append = true;
        this.major = '';
        this.grade = '';
        this.teacher = '';
        this.classData = '';
      },
      open() {
        this.$message({
          showClose: true,
          message: this.openStart,
          type: 'success',
        })
      },
      nextLevel() {
        this.classManag = true;
        this.addManag = false;
      }
    },
  }
</script>

<style scoped>
  .main {
    height: 100%;
    background-color: rgba(248, 248, 248, 1);
  }

  .mainHeader {
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
    align-items: center;
  }

  .mainHeader span {
    font-size: 16px;
    font-weight: bold;
  }

  /deep/ .el-input__inner {
    border-radius: 24px;
    height: 35px;
    margin-left: 10px;
  }

  .el-input:last-child {
    margin-right: 40px;
  }

  .addButs {
    margin-left: 5%;
    margin-top: 2%;
  }

  .middle {
    height: 60%;
    width: 90%;
    background-color: #fff;
    margin: 2% auto;
  }

  /deep/ .el-table {
    font-size: 16px;
    font-family: 楷体;
    color: #000;
  }

  /*表格的第一行样式*/
  /deep/ .el-table th {
    background-color: #E9F6FF;
    height: 20px;
  }

  /*表格每一个单元格的样式*/
  /deep/ .el-table td {
    padding: 0 0;
    height: 40px;

  }

  /deep/ .el-button--primary {
    height: 30px;
    line-height: 7px;
    border: none;
  }

  /deep/ .el-button--primary:last-child {
    background-color: red;

  }

  /deep/ .el-button--primary:nth-of-type(1) {
    background-color: rgba(7, 150, 140, 1);

  }

  .test {
    height: 100%;
    min-width: 683px;
  }

  .top {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
  }

  .testAll {
    height: 80%;
    width: 60%;
    background-color: white;
    margin: 2% auto;
    padding-top: 20px;
    padding-left: 10px;
  }

  .stWidth {
    display: flex;
    height: 40px;
    width: 70%;
    margin: 6% auto;
  }

  .stWidth .label {
    min-width: 90px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }

  /deep/ .border {
    width: 100%;
    margin: 0px auto;
    display: flex;
    justify-content: center;
  }

  /deep/ .border .el-button {
    background: rgba(24, 95, 212, 1);
    width: 65%;
  }



  .input {
    line-height: 40px;
  }
</style>