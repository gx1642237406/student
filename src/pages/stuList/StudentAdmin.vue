<template>
  <div class="main">
    <div v-show="All">
      <div class="mainHeader">
        <span>全部学生</span>
        <div class="topItem">
          <el-select @change="changeclassname" v-model="valueClass" placeholder="请选择班级" class="aaa"
                     :popper-append-to-body="true">
            <el-option v-for="item in options" :key="item.class_id" :label="item.class_name" :value="item.class_name">
            </el-option>
          </el-select>
          <div class="nameIcon">
            <el-input v-model="input" placeholder="请输入姓名" class="input"></el-input>
            <img src="../../../static/图标 18.svg" class="icon" width="20px" height="20px">
          </div>
        </div>
      </div>
      <div class="addButs">
        <el-button type="primary" round @click="addStu">+添加</el-button>
      </div>
      <div class="middle">
        <div class="table">
          <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              border
              style="width: 100%">
            <el-table-column
                prop="stu_name"
                label="姓名"
                align="center"
                style="width:16.6%">
            </el-table-column>
            <el-table-column
                prop="stu_sex"
                label="性别"
                align="center" :formatter="stuSex"
                style="width:16.6%">
            </el-table-column>
            <el-table-column
                prop="school_name"
                label="学校"
                align="center"
                style="width:16.6%">
            </el-table-column>
            <el-table-column
                prop="stu_sno"
                label="学号"
                align="center"
                style="width:16.6%">
            </el-table-column>
            <el-table-column
                prop="stu_address"
                label="地址"
                align="center"
                style="width:16.6%">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                style="width: 16.6%"
                align="center">
              <template slot-scope="scope">
                <el-button class="buttonA" size="mini" @click="handleEdit(scope.$index,scope.row)">
                  编辑
                </el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">
                  删除
                </el-button>
                <!--                                    <el-button type="primary" round @click="getUpdateStu">修改</el-button>-->
                <!--                                    <el-button type="primary" round @click="deleteStu">删除</el-button>-->
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
    </div><!--All结束-->
    <div v-show="adress" class="test"><!--test组件  点击添加按钮后的页面-->
      <div class="top">
        <div class="topButs">
          <div @click="nextLevel" class="retrun">返回</div>
          <span class="title">{{ mation }}</span>
        </div>
      </div>
      <div class="testAll">
        <div class="stWidth">
          <div>学生姓名：</div>
          <el-input v-model="stuName" placeholder="请输入内容" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div>年龄：</div>
          <el-input v-model="stuAge" placeholder="请输入内容" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div>性别：</div>
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="0">女</el-radio>
        </div>
        <div class="stWidth">
          <div>学号：</div>
          <el-input v-model="stuNumber" placeholder="请输入内容" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div>所在学校：</div>
          <el-input v-model="stuSchool.name" placeholder="请输入内容" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div>所在年级：</div>
          <el-select v-model="stuGrade" placeholder="请选择年级" class="inputs">
            <el-option v-for="items in stuGrades" :key="items.gradeId" :value="items.gradeId"
                       :label="items.gradeName">
            </el-option>
          </el-select>
        </div>
        <div class="stWidth">
          <div>所在专业：</div>
          <el-select v-model="stuMajor" @change="getClass" placeholder="请选择专业" class="inputs">
            <el-option v-for="items in stuMajors" :key="items.majorId" :value="items.majorId"
                       :label="items.majorName">
            </el-option>
          </el-select>
        </div>
        <div class="stWidth">
          <div>所在班级：</div>
          <el-select v-model="stuClass" placeholder="请选择班级" class="inputs">
            <el-option v-for="items in stuClasss" :key="items.class_id" :value="items.class_name"
                       :label="items.class_name">
            </el-option>
          </el-select>
        </div>
        <div class="stWidth">
          <div>身份证号：</div>
          <el-input v-model="stuCID" placeholder="请输入内容" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div>家庭住址：</div>
          <el-input v-model="stuAddress" placeholder="请输入内容" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div>出生日期：</div>
          <el-date-picker v-model="stuDate" type="datetime" placeholder="请选择出生日期" class="inputs"></el-date-picker>
        </div>
        <div class="addChengbuts">
          <div v-if="oppend">
            <el-button type="primary" round class="Button" @click="addStudent">添加</el-button>
          </div>
          <div v-else>
            <el-button type="primary" round class="Button" @click="updateStudent">修改</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentAdmin",
  data() {
    return {
      //分页数据
      currentPage: 1,   //当前页
      pageSize: 5,      //每页多少个
      currentTotal: 0, //共多少条数据

      adress: false,
      mation: '添加学生信息',
      All: true,
      radio: '1',//单选按钮
      valueClass: '',
      input: '',//双向绑定的姓名
      options: [],
      tableData: [],//搜索前的数据
      stuName: '',//学生姓名
      stuAge: '',//学生年龄
      stuNumber: '',//学号
      stuAddress: '',//家庭住址
      stuSchool: '',//学校
      stuGrade: '',//所在年级
      stuGrades: [],//全部年级
      stuMajor: '',//所在专业
      stuMajors: [],//全部专业
      stuClass: '',//所在班级
      stuClasss: [],//全部班级信息
      stuDate: '',
      stuCID: '',//身份证号
      oppend: true,//添加
      stuID: '',//学生id
      openStart: '',//成功弹窗提示
    }
  },
  mounted() {//一进入就执行方法（已进入界面就显示的）
    this.getStuInfo();
    this.schoolname();
    this.getClass();
  },
  methods: {
    nextLevel() {
      this.All = true;
      this.adress = false;
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },

    getStuInfo() {//获取全部学生信息接口，页面一加载就全部获取
      this.$post("/testIp/assembly/selectUserAll", {
        "info": 1,//后端要求1为学生
        "currentPage": 1,//当前页
        "pageSize": 5,//当前页数据
      }).then((response) => {
        this.tableData = response.items;
        this.currentTotal = response.items.length;
        console.log(response)
      })
    },
    stuSex(row, column, val) {
      if (val === 0) {
        return "女";
      } else {
        return "男";
      }
    },
    //获取当前管理员学校，添加学学生
    getschool() {
      this.$post("/testIp/school/selectSchoolNameByadminId")
          .then((response) => {
            this.stuSchool = response.data;
            console.log('学校', response)
          })
    },
    //获取年级全部信息   添加学生
    getGrade() {
      this.$post("/testIp/grade/selectGradeAll", {})
          .then((response) => {
            this.stuGrades = response.data;
            console.log('年级', response.data);
          })
    },
    //获取学校全部专业信息  添加学生
    getMajor() {
      this.$post("/testIp/major/selectMajorByAdminSchool")
          .then((response) => {
            this.stuMajors = response.data;
            console.log('专业信息', response.data);
          })
    },
    //获取当前学校  专业年级下的班级
    getClass() {
      this.$post("/testIp/class/selectClassBySchoolAndMajor", {
        schoolId: this.stuSchool.id,
        majorId: this.stuMajor,
        gradeId: this.stuGrade,
      })
          .then((response) => {
            this.stuClasss = response.data;
            console.log('班级', response)
          })
    },
    addStudent() {//添加学生信息
      this.$post("/testIp/student/addStudent", {
        stuSex: this.radio,//性别
        stuAge: this.stuAge,//年龄
        stuName: this.stuName,//姓名
        stuSno: this.stuNumber,//学号
        stuSchool: this.stuSchool.id,//学生学校的id
        stuClass: this.stuClasss[0].class_id,//学生班级
        stuIdcard: this.stuCID,//身份证号
        stuAddress: this.stuAddress,//学生地址
        stuBirthday: this.stuDate,//学生出生日期
      }).then((response) => {
        if (response.msg == "添加成功") {
          this.openStart = "添加成功";
          this.open();
          this.All = true;
          this.adress = false;
        }
        this.getStuInfo()
      })
    },
    deleteStu() {//删除学生
      this.$confirm("此操作将永久删除该信息，是否继续", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        this.$post("/testIp/assembly/deleteStuOrTeacherById", {
          rank: 1,
          userId: this.stuID
        }).then((response) => {
          if (response.msg == "删除成功") {
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
            this.getStuInfo();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getUpdateStu() {
      console.log("1111")
      this.$post("/testIp/student/selectStudentById?stuId=" + this.stuID, {})
          //获取当前需要修改学生的信息
          .then((response) => {
            console.log("学生信息", response);
            this.$post("/testIp/grade/selectGradeAll", {})
                .then((response2) => {//获取年级信息
                  this.stuGrades = response2.data;
                  this.stuGrade = response.data.grade_id;
                });
            this.$post("/testIp/major/selectMajorByAdminSchool", {})//获取年级下专业信息
                .then((response3) => {
                  this.stuMajors = response3.data;
                  this.stuMajor = response.data.grade_id;
                  this.$post("/testIp/class/selectClassBySchoolAndMajor", {
                    schoolId: this.stuSchool.id,
                    majorId: this.stuMajor,
                    gradeId: this.stuGrade
                  }).then((response4) => {
                    this.stuClasss = response4.data;
                    this.stuClass = response.data.class_name;
                    console.log(this.stuClass)
                  })
                });
            this.radio = response.data.stu_sex + '';//性别
            this.stuAge = response.data.stu_age//年龄
            this.stuName = response.data.stu_name//姓名
            this.stuNumber = response.data.stu_sno//学号
            this.stuCID = response.data.stu_idcard//身份证号
            this.stuAddress = response.data.stu_address//家庭住址
            this.stuDate = response.data.stu_brithday//出生日期
          })
    },
    updateStudent() {//修改学生信息
      console.log(this.stuClasss[0].class_id);
      this.$post("/testIp/student/updateStudent", {
        stuId: this.stuID,//学生id
        stuSex: this.radio,//性别
        stuAge: this.stuAge,//年龄
        stuName: this.stuName,//姓名
        stuSno: this.stuNumber,//学号
        stuSchool: this.stuSchool.id,//学生学校的id
        stuClass: this.stuClasss[0].class_id,//学生班级
        stuIdcard: this.stuCID,//身份证号
        stuAddress: this.stuAddress,//学生地址
        stuBirthday: this.stuDate,//学生出生日期
      }).then((response) => {
        console.log(response);
        if (response.msg == '修改成功') {
          this.openStart = "修改成功";
          // this.open();
          this.All = true;
          this.adress = false;
        }
        this.getStuInfo();
      })
    },
    handleEdit(index, row) {//编辑按钮
      console.log(index, row);
      this.stuID = row.stu_id;
      this.getschool();
      this.getUpdateStu();
      this.All = false;
      this.adress = true;
      this.mation = '修改学生信息';
      this.oppend = false;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.stuID = row.stu_id;
      this.deleteStu();
    },
    addStu() {
      this.getschool();
      this.getGrade();
      this.getMajor();
      this.mation = "添加学生信息"
      this.oppend = true;
      this.All = false;
      this.adress = true;
      this.radio = '';//性别
      this.stuAge = '';//年龄
      this.stuName = '';//姓名
      this.stuNumber = '';//学号
      this.stuCID = '';//身份证号
      this.stuAddress = '';//家庭住址
      this.stuDate = '';//出生日期
      this.stuGrade = '';
      this.stuMajor = '';
      this.stuClass = '';
    },
    schoolname() {
      this.$post("/testIp/class/selectClassBySchool")
          .then(response => {
            this.options = response.data;
            console.log(response);
          })
    },
    changeclassname() {
      console.log('现在的班级',this.valueClass);
      this.$post("/testIp/student/selectStudentByClassName", {
        className: this.valueClass,
      })
          .then(response => {
            this.tableData = response.data;
            console.log(response);
          })
    },
    open() {//弹窗提示
      this.$message({
        showClose: true,
        message: this.openStart,
        type: 'success'
      })
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

/deep/ .topItem .el-input__inner {
  border-radius: 24px;
  height: 35px;
  width: 300px;
  margin-left: 10px;
}
/deep/ .testAll .el-input__inner {
  border-radius: 24px;
  height: 35px;
  width: 300px;
  margin-left: 10px;
}
/*/deep/ .el-input:last-child {*/
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
  /*background-color: darkgrey;*/
  margin: 2% auto;
  padding-top: 20px;
  padding-left: 10px;
}

.stWidth {
  display: flex;
  height: 40px;
  width: 70%;
  margin: 0 auto;
}

.stWidth1 {
  display: flex;
  height: 40px;
  width: 70%;
  margin: 0 auto;
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