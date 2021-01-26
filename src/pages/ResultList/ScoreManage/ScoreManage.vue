<template>
  <div class="main">
    <div v-show="AllScores">
      <div class="top">
        <div><span class="title">学生成绩</span></div>
        <div class="topItem">
          <el-select
              v-model="data"
              class="ClassIput"
              @change="AllGrade(data)">
            <el-option v-for="item in add"
                       :key="item.data"
                       :label="item.label"
                       :value="item.data">
            </el-option>
          </el-select>
          <el-select
              v-model="valueClass"
              class="ClassIput"
              @change="subject(valueClass)">
            <el-option v-for="item in options"
                       :key="item.subjectId"
                       :label="item.subjectName"
                       :value="item.subjectId">
            </el-option>
          </el-select>
          <div class="nameIcon">
            <el-input v-model="importName" palceholder="请输入姓名" class="input"
                      @change="arr"></el-input>
            <img src="../../../../static/图标 18.svg" width="25px" height="25px" class="icon" alt=""/>
          </div>
          <div>
            <el-button type="primary" round class="button" @click="soloMassage">个人信息</el-button>
          </div>
        </div>
      </div>
      <div class="adders" @click="addTo">添加+</div>
      <div class="table">
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border width="100%">
          <el-table-column type="index" :index="indexMethod" label="排序"
                           align="center"
                           width="100px">
          </el-table-column>
          <el-table-column label="姓名" prop="studentname" align="center"></el-table-column>
          <el-table-column label="HTML" prop="Htmls" align="center"></el-table-column>
          <el-table-column label="Java" prop="java" align="center"></el-table-column>
          <el-table-column label="C语言" prop="Clanguage" align="center"></el-table-column>
          <el-table-column label="PHP" prop="phps" align="center"></el-table-column>
          <el-table-column label="平均成绩" prop="average" align="center" sortable></el-table-column>
          <el-table-column label="编辑" align="center">
            <template slot-scope="scope">
              <el-button type="primary" class="Button" @click="handeEdite(scope.$index)" round>修改</el-button>
              <el-button type="primary" class="Button" @click="handleDelete(scope.$index,scope.row)" round>删除</el-button>
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
    <div v-show="address">
      <div class="top">
        <div class="topButs">
          <div @click="nextLevel" class="retrun">返回</div>
          <span class="title">{{ mation }}</span>
        </div>
      </div>
      <div class="testAll">
        <div class="stWidth">
          <div class="label">学生姓名：</div>
          <el-input v-model="studentName" placeholder="请输入内容" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div class="label">学期：</div>
          <el-select v-model="data" class="inputs">
            <el-option v-for="item in add"
                       :key="item.data"
                       :value="item.data"
                       :label="item.label">
            </el-option>
          </el-select>
        </div>
        <div class="stWidth">
          <div class="label">HTML：</div>
          <el-input v-model="html" placeholder="请输入HTML成绩" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div class="label">Java：</div>
          <el-input v-model="java" placeholder="请输入JAVA成绩" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div class="label">C语言：</div>
          <el-input v-model="Clanguage" placeholder="请输入C语言成绩" class="inputs"></el-input>
        </div>
        <div class="stWidth">
          <div class="label">PHP：</div>
          <el-input v-model="php" placeholder="请输入PHP成绩" class="inputs"></el-input>
        </div>
        <div v-if="append">
          <el-botton type="primary" round class="ButtonB" @click="addStudent">添加</el-botton>
        </div>
        <div v-else>
          <el-botton type="primary" round class="ButtonB" @click="updateStudent">修改</el-botton>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ScoreManage",
  data() {
    return {

      //分页数据
      currentPage: 1,   //当前页
      pageSize: 5,      //每页多少个
      currentTotal: 0, //共多少条数据


      AllScores: true,
      address: false,
      add: [
        {data: 0, label: '大一上学期'},
        {data: 1, label: '大一下学期'},
        {data: 2, label: '大二上学期'},
        {data: 3, label: '大二下学期'},
        {data: 4, label: '大三上学期'},
        {data: 5, label: '大三下学期'},
        {data: 6, label: '大四上学期'},
        {data: 7, label: '大四下学期'},
      ],
      data: 0,
      options: [],
      valueClass: '',
      importName: '',
      tableData: [],
      mation: '添加成绩',
      stuid: '',
      classid: '',
      semesterid: '',
      studentName: '',
      append: true,
      coptied: [{scoreClass: 0, label: '大班'}, {scoreClass: 1, label: '二班'}],
      scoreClass: '',
      html: '',
      java: '',
      Clanguage: '',
      php: ''
    }
  },
  mounted() {
    this.arr();
    this.career();
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

    indexMethod(index) {
      return index + 1;
    },
    soloMassage() {
      this.$router.push({path: 'AdminInfo'});
    },
    arr() {
      this.$post("/testIp/score/selectAdmScoreAll", {
        // stuName: this.importName
      }).then((response) => {
        this.tableData = response.data;
        this.currentTotal = response.data.length;
        console.log(response.data);
      })
    },
    AllGrade(data) {
      this.$post("/testIp/score/selectAdmScoreAll", {
        scoreSemester: this.add[data].data + 1,
        stuName: this.importName
      }).then((response) => {
        this.tableData = response.data;
      })
    },
    career() {
      this.$post("/testIp/subject/selectSubjectByMajor?majorId=" + 1, {})
          .then((response) => {
            this.options = response.data;
          })
    },
    subject(valueClass) {
      this.$post("/testIp/score/selectAdmScoreAll", {
        scoreSubject: this.options[valueClass - 1].subjectId,
        stuName: this.importName,
      }).then((response) => {
        this.tableData = response.data;
      })
    },
    handeEdite(index) {
      this.AllScores = false;
      this.address = true;
      this.append = false;
      this.mation = '修改成绩';
      this.$post("/testIp/score/selectAdmScoreAll", {
        scoreStudent: this.tableData[index].studentid,
        scoreSemeter: this.tableData[index].scoresemester,
      })
          .then((response) => {
            console.log("接口" + response.data.java);
            this.studentName = response.data[0].studentname;
            this.data = response.data[0].scoresemester;
            this.html = response.data[0].Htmls;
            this.java = response.data[0].java;
            this.Clanguage = response.data[0].Clanguage;
            this.php = response.data[0].phps;
          })
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$post('testIp/score/deleteScore', {
        list: [
          {
            studentid: this.tableData[index].studentid,
            scoresemester: this.tableData[index].scoresemester,
          }
        ]
      })
          .then((response) => {
            if (response.code == 0) {
              this.arr();
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
            }
          });
    },
    addTo() {
      this.AllScores = false;
      this.address = true;
      this.mation = '添加成绩';
      this.append = true;
      this.studentName = '';
      this.scoreClass = '';
      this.data = 0;
      this.html = '';
      this.java = '';
      this.php = '';
      this.Clanguage = '';
    },
    nextLevel() {
      this.AllScores = true;
      this.address = false;
    },
    addStudent() {
      this.$post("/testIp/score/insertScore", {
        stuName: this.studentName,
        stuClass: this.scoreClass + 1,
        list: [
          {
            scoreSubject: 1, scoreSemester: this.data,
            scoreNumber: this.html
          },
          {
            scoreSubject: 2, scoreSemester: this.data,
            scoreNumber: this.java
          },
          {
            scoreSubject: 3, scoreSemester: this.data,
            scoreNumber: this.Clanguage
          },
          {
            scoreSubject: 4, scoreSemester: this.data,
            scoreNumber: this.php
          },
        ]
      }).then((response) => {
        console.log(response);
        if (response.code == 0) {
          this.arr();
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.AllScores = true;
          this.address = false;
        }
      })
    },
    updateStudent() {
      this.$post("testIp/score/updateScore", {
        scoreStudent: this.studentName,
        scoreSemester: this.data,
        // scoreClass: this.classid,
        list: [
          {scoreSubject: 1, scoreNumber: this.html},
          {scoreSubject: 2, scoreNumber: this.java},
          {scoreSubject: 3, scoreNumber: this.Clanguage},
          {scoreSubject: 4, scoreNumber: this.php},
        ]
      }).then((response) => {
        console.log(response.code);
        if (response.code == 0) {
          this.arr();
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.AllScores = true;
          this.address = false;
        }
      })
    }
  }

}
</script>
<style scoped>
.main {
  height: 100%;
  margin: 0;
  background-color: #f8f8f8;
}

.top {
  background-color: #ffffff;
  height: 70px;
  line-height: 70px;
  display: flex;
  justify-content: space-between;
  padding-right: 3%;
  padding-left: 3%;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

/deep/ .table .el-button--primary {
  height: 30px;
  line-height: 7px;
  border: none;
}

/deep/ .table .el-button--primary:last-child {
  background-color: red;

}

/deep/ .table .el-button--primary:nth-of-type(1) {
  background-color: rgba(7, 150, 140, 1);

}

.topItem {
  display: flex;
}

.icon {
  position: absolute;
  right: 8px;
  top: 28px;
}

.nameIcon {
  position: relative;
}

/deep/ .el-input__inner {
  border-radius: 24px;
  height: 35px;
}

.ClassIput {
  width: 250px;
  margin-right: 2%;
}

.input {
  width: 250px;
}

.button {
  margin-left: 60px;
  width: 186px;
  height: 38px;
}

.table {
  width: 97%;
  margin: 1% auto 0%;
}

/deep/ .el-table th {
  padding: 0 0;
  height: 50px;
  background-color: #e9f6ff;
}

/deep/ .el-table td {
  padding: 0 0;
  height: 48px;
}

.adders {
  width: 88px;
  height: 28px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(7, 150, 140, 1);
  border-radius: 20px;
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  margin-top: 1%;
  margin-left: 2.5%;
}
/deep/ .el-button--mini{
  width: 60px !important;
  border-radius: 20px;
}
.buttonA{
  background-color: rgba(60,124,231,1);
  color: #ffffff;
}
.paging{
  margin-top: 1%;
}
.testAll{
  width: 50%;
  margin: 0 auto;
  padding-top: 1%;
}
.inputs{
  width: 60%;
  height: 43px;
  margin-top: 4px;
}
.stWidth{
  display: flex;
  margin-top: 2%;
}
.stWidth div:nth-child(1){
  width: 150px;
  height: 43px;
  line-height: 43px;
  text-align: right;
  margin-right: 20px;
}


.Button{
  width: 75%;
  margin-left: 13%;
  margin-top: 3%;
}


  .ButtonB{
    margin: 0 auto;
    line-height: 45px;
    text-align: center;
    display: block;
    width: 150px;
    height: 45px;
    border: 1px solid black;
    background: #42b983;
  }
</style>