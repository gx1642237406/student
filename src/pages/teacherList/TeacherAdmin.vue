<template>
  <div class="main">
    <div v-show="All">
      <div class="mainHeader">
        <span>全部教师</span>
        <div class="topItem">
          <el-select v-model="value" placeholder="请选择学科" class="aaa" :popper-append-to-body="true">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="nameIcon">
            <el-input v-model="input" placeholder="请输入姓名" class="input"></el-input>
            <img src="../../../static/图标 18.svg" class="icon" width="20px" height="20px">
          </div>
        </div>
      </div>
      <div class="addButs">
        <el-button type="primary" round @click="add">+添加</el-button>
      </div>
      <div class="middle">
        <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            style="width: 100%">
          <el-table-column
              prop="teacher_name"
              label="姓名"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="teacher_sex"
              label="性别"
              align="center"
              style="width:20%" :formatter="teacherSex">
          </el-table-column>
          <el-table-column
              prop="teacher_age"
              label="教龄"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="teacher_course"
              label="所授学科"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              style="width: 20%"
              align="center">
            <template slot-scope="scope">
              <el-button class="buttonA" size="mini" @click="handleEdit(scope.$index,scope.row)">
                编辑
              </el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="currentTotal"
            align="center"
            class="paging">
        </el-pagination>
      </div>
    </div>
    <div v-show="adress" class="test"><!--test组件  点击添加按钮后的页面-->
      <div class="top">
        <div class="topButs">
          <div @click="nextLevel" class="retrun">返回</div>
          <span class="title">{{ mation }}</span>
        </div>
      </div>
      <div class="testAll">
        <el-form label-width="120px" :model="formLabelAlign">
          <el-form-item label="姓名：">
            <el-input v-model="formLabelAlign.names" placeholder="请输入姓名" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-input v-model="formLabelAlign.age" placeholder="请输入年龄" class="inputs"></el-input>
          </el-form-item>
          <div class="stWidth1">
            <el-form-item label="性别：" :formatter="teacherSex">
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="0">女</el-radio>
            </el-form-item>
          </div>
          <el-form-item label="教师编号：">
            <el-input v-model="formLabelAlign.serial" placeholder="请输入教师编号" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="所在学校：">
            <el-input v-model="labelSchool" placeholder="请输入学校" disabled class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="所在专业">
            <el-select v-model="labelMajor" placeholder="请选择专业" @change="getSubject">
              <el-option v-for="item in optionsMajor" :key="item.majorId" :value="item.majorId"
                         :label="item.majorName"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="所授学科">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in optionsSubject"
                             :key="item.subjectId" :label="item.subjectName" @change="selectCourseIds(item.subjectId)">
                  {{ item.subjectName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <el-form-item label="所在年级">
            <el-select v-model="labelGrade" placeholder="请选择年级" @change="getClass">
              <el-option v-for="item in optionGrade"
                         :key="item.gradeId" :value="item.gradeId" :label="item.gradeName"></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="所授班级">
              <el-select @change="selectClassIds(item.class_id)" v-model="checkListClass" placeholder="请选择年级">
                <el-option v-for="item in optionsClass"
                           :key="item.class_id" :value="item.class_name" :label="item.class_name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="职务：">
            <el-select v-model="dutyJob" placeholder="请选择职务">
              <el-option v-for="item in post" :key="item.jobId" :value="item.jobId" :label="item.jobName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号就：">
            <el-input v-model="formLabelAlign.card" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址：">
            <el-input v-model="formLabelAlign.address" placeholder="请输入家庭住址"></el-input>
          </el-form-item>
        </el-form>
        <div class="addChengbuts">
          <div v-if="oppend">
            <el-button type="primary" round class="Button" @click="addteacher">添加</el-button>
          </div>
          <div v-else>
            <el-button type="primary" round class="Button" @click="updataTeacher">修改</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// const classListAll=['1','2','3'];
export default {
  name: "TeacherAdmin",
  data() {
    return {
      //分页数据
      currentPage: 1,   //当前页
      pageSize: 5,      //每页多少个
      currentTotal: 0, //共多少条数据

      input: '',
      tableData: [],//教师信息
      options: [],
      value: '',
      All: true,
      adress: false,
      oppend: true,
      labelPosition: 'righe',
      formLabelAlign: {names: '', age: '', serial: '', card: '', address: ''},
      checkList: [],//学科
      checkListClass: [],//班级
      radio: '1',//性别
      optionsMajor: [],//专业信息
      labelMajor: '',//当前所选专业
      labelSchool: '',//当前学校
      labelSchoolId: 0,//
      optionsSubject: [],//全部学科
      optionGrade: [],//全部年级
      labelGrade: '',
      optionsClass: [],//专业年级下的班级
      courseIds: [],//所选课程id
      ClassIds: [],//所选班级id
      post: [],//职务
      dutyJob: '',//当前职务
      openStart: '',//成功提示文字
      teacherId: '',//教师id
      mation: '添加教师信息',
    }
  },
  mounted() {
    this.getTeacherInfo();
  },

  methods: {
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },


    nextLevel() {
      this.All = true;
      this.adress = false;
    },
    getTeacherInfo() {
      this.$post("/testIp/assembly/selectUserAll", {
        info: 2,
        currentPage: 1,
        pageSize: 1
      }).then((response) => {
        this.tableData = response.items;
        this.currentTotal = response.items.length;

        console.log(this.tableData);
      })
    },
    teacherSex(row, column, val) {
      if (val === 0) {
        return "女";
      } else {
        return "男";
      }
    },
    getSchool() {//获取管理员学校
      this.$post("/testIp/school/selectSchoolNameByadminId", {})
          .then((response) => {
            console.log('教师学校' + response);
            this.labelSchool = response.data.name;
            this.labelSchoolId = response.data.id;
            console.log('学校ID', this.labelSchoolId);
          })
    },
    getMajor() {//获取当前学校的所有专业
      this.$post("/testIp/major/selectMajorByAdminSchool")
          .then((response) => {
            console.log(response);
            this.optionsMajor = response.data;
          })
    },
    getSubject() {//获取当前专业下的学科
      this.$post("/testIp/subject/selectSubjectByMajor?majorId=" + this.labelMajor, {})
          .then((response) => {
            this.optionsSubject = response.data;
            console.log('学科',response.data)
          })
    },
    getJob() {//获取教师全部职务
      this.$post("/testIp/job/selectTeacherJob", {})
          .then((response) => {
            this.post = response.data;
          })
    },
    getGrade() {//获取年级全部信息
      this.$post("/testIp/grade/selectGradeAll", {})
          .then((response) => {
            this.optionGrade = response.data;
          })
    },
    getClass() {//获取年级下的班级
      this.$post("/testIp/class/selectClassBySchoolAndMajor", {
        schoolId: this.labelSchoolId,
        majorId: this.labelMajor,
        gradeId: this.labelGrade,
      }).then((response) => {
        this.optionsClass = response.data;
        console.log("2222222222", response);
      })
    },
    addteacher() {//添加教师信息
      this.$post("/testIp/teacher/addTeacher", {
        teacherName: this.formLabelAlign.names,//教师姓名
        teacherAge: this.formLabelAlign.age,//教师年龄
        teacherSex: this.radio,
        teacherNumber: this.formLabelAlign.serial,//教师编号
        teacherSchool: this.labelSchoolId,//教师所在学校
        teacherMajor: this.labelMajor,//教师专业
        teacherCourse: this.courseIds.join('',''),//教师所授学科
        teacherClass: this.ClassIds.join('',''),//教师所授班级
        teacherJob: this.dutyJob,//
        teacherIdcard: this.formLabelAlign.card,
        teacherAddress: this.formLabelAlign.address,
      }).then((response) => {
        console.log(response);
        if (response.msg == "添加成功") {
          this.optenStart = "添加成功";
          this.open();
          this.All = true;
          this.adress = false;
        }
        this.getTeacherInfo();
      })
    },
    selectClassIds(e) {//获取选中班级的id
      this.ClassIds.push(e);
      console.log(this.checkListClass);
    },
    selectCourseIds(e) {
      console.log(e);
      this.courseIds.push(e);
    },
    deleteTeacher() {
      this.$confirm("此操作将永久删除该信息，是否继续", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        this.$post("/testIp/assembly/deleteStuOrTeacherById", {
          rank: 2,
          userId: this.teacherId
        }).then((response) => {
          if (response.msg == "删除成功") {
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
            this.getTeacherInfo();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    SelectupdateTeacher() {//获取要修改教师信息回显
      this.getSchool();

      //没对应接口
      //没对应接口
      //没对应接口
      //没对应接口

      this.$post("/testIp/teacher/selectTeacherById?teacherId=" + this.teacherId, {})//获取当前教师信息
          .then((response) => {
            console.log(response)
            this.formLabelAlign.names = response.data.teacher_name;
            this.formLabelAlign.age = response.data.teacher_age;
            this.radio = response.data.teacher_sex + '';
            this.formLabelAlign.serial = response.data.teacher_number;
            this.formLabelAlign.card = response.data.teacher_idcard;
            this.formLabelAlign.address = response.data.teacher_address;
            this.$post("/testIp/major/selectMajorByAdminSchool", {})//获取当前学校专业
                .then((response2) => {
                  this.optionsMajor = response2.data;
                  this.labelMajor = response.data.major_id;//获取当前教师所在的专业
                  this.$post("/testIp/subject/selectSubjectByMajor", {
                    majorId: this.labelMajor,
                  })
                      .then((response3) => {
                        console.log('学科？', response3)
                        this.optionsSubject = response3.data;
                        for (let i = 0; i < response.data.teacher_course.length; i++) {//获取当前教师所授学科
                          this.checkList[i] = parseInt(response.data.teacher_course[i]);
                        }
                      });
                  //获取年级
                  this.$post("/testIp/grade/selectGradeAll", {}).then((response4) => {
                    console.log('DDDDDDDDDDDDD', response4.data)
                    this.optionGrade = response4.data;
                    this.labelGrade = response.data.grade_id;//获取当前教师所在年级
                    this.$post("/testIp/class/selectClassBySchoolAndMajor", {//获取当前学校  专业年级下
                      schoolId: this.labelSchoolId,
                      majorId: this.labelMajor,
                      gradeId: this.labelGrade
                    }).then((response5) => {
                      console.log('EEEEEEEEEEEEEEE', response5.data)
                      this.optionsClass = response5.data;
                      for (let i = 0; i < response.data.AllClass.length; i++) {
                        this.checkListClass[i] = parseInt(response.data.AllClass[i].class_id);
                      }
                      this.ClassIds = this.checkListClass;//获取当前教师所授班级
                    });
                  });
                });
            this.$post("/testIp/job/selectTeacherJob", {}).then((response6) => {//获取全部身份
              this.post = response6.data;
              this.dutyJob = parseInt(response.data.teacher_job)//获取当前教师身份
            });
            this.courseIds = this.checkList;//当前选中学科
            console.log(response);
          })
    },
    // updataTeacher(){
    //     this.$post("/testIp/teacher/updateTeacherInfo",{
    //         teacherId:parseInt(this.teacherId),
    //         teacherName:this.formLabelAlign.names,
    //         teacherAge:this.formLabelAlign.age,
    //         teacherSex:this.radio,
    //         teacherNumber: this.formLabelAlign.serial,
    //         teacherSchool: this.labelSchoolId,
    //         teacherMajor: this.labelMajor,
    //         teacherCourse: this.courseIds.join('',''),//教师所授学科  将数组转化为字符串teacher_course
    //         teacherClass: this.ClassIds.join('',''),
    //         teacherJob: this.dutyJob,
    //         teacherIdcard: this.formLabelAlign.card,
    //         teacherAdderss: this.formLabelAlign.address,
    //     }).then((response)=>{
    //         console.log('eeeeee', response);
    //         console.log('SSSSSSSSSSS',this.formLabelAlign.address)
    //         console.log('AAAAAAAAAA',this.courseIds)
    //         if(response.msg=="修改成功"){
    //             this.optenStart="修改成功";
    //             this.open();
    //             this.All=true;
    //             this.adress=false;
    //         }
    //         this.getTeacherInfo();//获取全部教师信息
    //     })
    // },
    updataTeacher() {    //修改教师信息
      this.$post("/testIp/teacher/updateTeacherInfo", {
        teacherId: parseInt(this.teacherId),
        teacherName: this.formLabelAlign.names,     //教师姓名
        teacherAge: this.formLabelAlign.age,       //教师年龄
        teacherSex: this.radio,                   //教师性别
        teacherNumber: this.formLabelAlign.serial,   //教师编号
        teacherSchool: this.labelSchoolId,          //教师所在学校
        teacherMajor: this.labelMajor,               //教师专业
        teacherCourse: this.courseIds.join(","),     //教师所授学科   将数组转化成字符串
        teacherClass: this.ClassIds.join(","),       //教师所授班级
        teacherJob: this.dutyJob,                       //教师职位
        teacherIdcard: this.formLabelAlign.card,     //教师身份证号
        teacherAddress: this.formLabelAlign.address,  //教师家庭住址
      }).then((response) => {
        console.log(response);
        if (response.msg == "修改成功") {   //判断添加是否成功
          this.optenStart = "修改成功";
          this.open();
          // this.AddTeacherManag = true;   //页面切换
          // this.addres = false;
          this.All = true;
          this.adress = false
        }
        this.getTeacherInfo();    //再次获取全部教师信息
      })
    },
    handleEdit(index, row) {//修改按钮
      console.log(index, row);
      this.teacherId = row.teacher_id;
      this.SelectupdateTeacher();
      this.All = false;
      this.adress = true;
      this.oppend = false;
      this.mation = '修改教师信息';





    },
    handleDelete(index, row) {//删除按钮
      console.log(index, row);
      this.teacherId = row.teacher_id;
      this.deleteTeacher()
      this.SelectupdateTeacher();
    },
    add() {
      this.getSchool();
      this.getMajor();
      this.getJob();
      this.getGrade();
      this.All = false;
      this.adress = true;
      this.oppend = true;
      this.mation = '添加教师信息';
      this.formLabelAlign.names = '';
      this.formLabelAlign.age = '';
      this.formLabelAlign.serial = '';
      this.labelSchoolId = '';
      this.labelMajor = '';
      this.optionsSubject = '';
      this.labelGrade = '';
      this.optionsClass = '';
      this.dutyJob = '';
      this.formLabelAlign.card = '';
      this.formLabelAlign.address = '';
    },
    open() {
      this.$message({
        showClose: true,
        message: this.optenStart,
        type: 'success'
      });
    },

  }
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

.topItem {
  display: flex;
}

.icon {
  position: absolute;
  right: 45px;
  top: 107px;
}


/deep/ .el-form .el-input__inner {
  border-radius: 24px;
  height: 35px;
  width: 300px;
  margin-left: 10px;
}

/deep/ .topItem .el-input__inner {
  border-radius: 24px;
  height: 35px;
  width: 300px;
  margin-left: 10px;
}

/*.topItem .el-input:last-child {*/
/*  margin-right: 40px;*/
/*}*/

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

/*/deep/ .el-button--primary {*/
/*  height: 30px;*/
/*  line-height: 7px;*/
/*  border: none;*/
/*}*/

/*/deep/ .el-button--primary:last-child {*/
/*  background-color: red;*/

/*}*/

/*/deep/ .el-button--primary:nth-of-type(1) {*/
/*  background-color: rgba(7, 150, 140, 1);*/

/*}*/

.el-form {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
}

.test {
  height: 100%;
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

/deep/ .el-form-item__label {
  font-size: 16px;
  height: 35px;
}

.testAll {
  height: 80%;
  width: 60%;
  margin: 5px auto;
  padding-top: 4px;
  padding-left: 10px;
}

.stWidth {
  display: flex;
  height: 30px;
  width: 70%;
  margin: 0 auto;
}

/deep/ .el-form-item {
  margin-bottom: 5px;
}

.stWidth div {
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: right;
}

.addChengbuts {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

/deep/ .el-radio {
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
}


</style>