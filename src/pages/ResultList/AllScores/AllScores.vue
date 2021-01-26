<template>
  <div class="main">
    <div class="mainHeader">
      <span>学生成绩</span>
      <div class="topItem">
        <el-select v-model="semester" @change="Allsemester(semester)" placeholder="请选择学期" class="select"
                   :popper-append-to-body="true">
          <el-option v-for="item in options" :key="item.data" :label="item.label" :value="item.data">
          </el-option>
        </el-select>
        <el-select v-model="valueClass" @change="Subject(valueClass)" placeholder="请选择科目" class="select"
                   :popper-append-to-body="true">
          <el-option v-for="item in options1" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId">
          </el-option>
        </el-select>
        <div class="margin">
          <el-input v-model="input" @change="selectStu()" placeholder="请输入姓名" class="input"></el-input>
          <img src="../../../../static/图标 18.svg" class="icon" width="20px" height="20px">
        </div>
        <div>
          <el-button class="btn" @click="selectMsg">个人信息</el-button>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="table">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              border
              type="index"
              :index="indexMethod"
              label="排序"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="studentname"
              label="姓名"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="htmls"
              label="HTML"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="javas"
              label="JAVA"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="CLanguage"
              label="C语言"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="phps"
              label="PHP"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="total"
              label="总分"
              align="center"
              style="width:20%">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <el-pagination
          background
          layout="prev,pager,next"
          :total="50"
          align="center"
          class="paging">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
name: "AllScores",
  data() {
    return {
      options: [
        {data: 0, label: '大一上学期'},
        {data: 1, label: '大一下学期'},
        {data: 2, label: '大二上学期'},
        {data: 3, label: '大二下学期'},
        {data: 4, label: '大三上学期'},
        {data: 5, label: '大三下学期'},
        {data: 6, label: '大四上学期'},
        {data: 7, label: '大四下学期'},
      ],
      options1: [
        {valueClass: 0},
        {valueClass: 1},
        {valueClass: 2},
        {valueClass: 3},
      ],
      valueClass: '',
      semester: '',
      input: '',
      tableData: [],
    }
  },
  methods: {
    selectStu() {
      this.$post("/testIp/score/selectAdmScoreAllSh", {}).then((response) => {
        this.tableData = response.data;
      })
    },
    indexMethod(index) {
      return index + 1;
    },
    selectMsg() {
      this.$router.push({
        path: '/Main'
      });
    },
    Allsemester(semester) {
      this.$post("/testIp/score/selectAdmScoreAllSh", {
        scoreSemester: this.options[semester].data + 1,
        stuName: this.input,
      }).then((response) => {
        this.tableData = response.data;
      });
    },
    career() {
      this.$post("/testIp/subject/selectSubjectByMajor?majorId=" + 1, {})
          .then((response) => {
            this.options1 = response.data;
          })
    },
    Subject(valueClass) {
      this.$post("/testIp/score/selectAdmScoreAllSh", {
        scoreSubject: this.options1[valueClass - 1].subjectId,
        stuName: this.input,
      }).then((response) => {
        this.tableData = response.data;
        console.log(this.tableData);
      });
    },
  },
  mounted() {
    this.selectStu();
    this.career();
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 90%;
  min-width: 1364px;
}

.mainHeader {
  height: 70px;
  background-color: #fff;
  display: flex;
  padding-left: 2%;
  padding-right: 2%;
  align-items: center;
}

.topItem {
  display: flex;
}

/*放大镜定位*/
.icon {
  position: absolute;
  left: 63%;
  top: 107px;
}
/deep/ .el-input{
  width: 300px;
}
/deep/ .el-select{
  width: 300px;
}

/deep/.topItem .el-input__inner {
  border-radius: 24px;
  width: 300px;
}

.btn {
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(65, 173, 248, 1);
  border-radius: 24px;
  font-size: 16px;
  text-align: center;

}

.margin {
  margin: 0px 50px 0px 50px;
}

.middle {
  height: 80%;
  width: 90%;
  background-color: #fff;
  margin: 2% auto;
}

/deep/ .el-table {
  font-size: 16px;
  font-weight: bold;
}

/deep/ .el-table thead {
  color: black;
}

/*表格的第一行样式*/
/deep/ .el-table th {
  background-color: #e9f6ff;
  height: 20px;
}

/*表格每一个单元格的样式*/
/deep/ .el-table td {
  padding: 0 0;
  height: 40px;

}
</style>