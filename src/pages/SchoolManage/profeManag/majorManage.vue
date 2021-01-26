<template>
  <div class="main">
    <div v-show="AddprofeManag">
      <div class="mainHeader">
        <span>专业管理</span>
      </div>
      <div class="addButs">
        <el-button type="primary" round @click="addProfess">+添加</el-button>
      </div>
      <div class="middle">
        <div class="table">
          <el-table
              :data="tableData"
              border
              style="width: 100%">
            <el-table-column
                prop="majorName"
                label="专业名称"
                align="center"
                style="width:16.6%">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="编辑"
                align="center"
                style="width: 16.6%">
              <template slot-scope="scope">
                <el-button type="primary" @click="handeEdite(scope.$index,scope.row)" round>修改</el-button>
                <el-button type="primary" @click="handleDelete(scope.$index,scope.row)" round>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div><!--All结束-->
    <div v-show="addManag" class="test"><!--test组件  点击添加按钮后的页面-->
      <div class="top">
        <div class="topButs">
          <div @click="nextLevel" class="retrun">返回</div>
          <span class="title">{{ mation }}</span>
        </div>
      </div>
      <div class="testAll">
        <div class="stWidth">
          <div class="label">学校名称：</div>
          <div class="input">{{ school }}</div>
        </div>
        <div class="stWidth">
          <div class="label">专业名称：</div>
          <el-input v-model="domain" placeholder="请输入专业名称" class="inputs"></el-input>
        </div>
        <div v-if="append">
            <div v-if="judge">
              <el-row class="border">
              <el-button class="button" type="primary" @click="addMajpr" round>添加</el-button>
              </el-row>
            </div>
            <div v-else>
              <el-row class="border">
              <el-button class="button" type="primary" @click="revamp" round>修改</el-button>
              </el-row>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "majorManage",
  data() {
    return {
      tableData: [{name: 'C语言'}, {name: 'C语言'}, {name: 'C语言'}, {name: 'C语言'}],
      AddprofeManag: true,
      addManag: false,
      options: [{major: '计算机专业'}, {major: '航海专业'}, {major: '工程师专业'}],
      major: '',
      tost: [{grade: '18级'}, {grade: '19级'}, {grade: '20级'}],
      grade: '',
      append: true,
      domain: '',
      ProfeSchool: '',
      addMaj: '添加专业',
      school: '',
      MajorId: '',
      judge: true,
      mation:'',
    }
  },
  mounted() {
    this.allSchool()
  },
  methods: {
    // allSchool() {
    //   this.$post("/testIp/major/selectMajorBySchool", {})
    //       .then((response) => {
    //         this.tableData = response.data;
    //         console.log(response.data);
    //       })
    // },
    allSchool() {
      this.$post("/testIp/major/selectMajorByAdminSchool", {})
          .then((response) => {
            this.tableData = response.data;
            console.log(response.data);
          })
    },
    handeEdite(index, row) {
      this.$post("testIp/school/selectSchoolNameByadminId?schoolId=" + row.majorSchool, {})
          .then((response) => {
            console.log(response);
            this.school = response.data.name;
          })
          this.domain = row.majorName,
          this.majorId = row.majorId,
          this.ProfeSchool = row.majorSchool,
          this.append = true,
          this.AddprofeManag = false,
          this.addManag = true,
          this.addMaj = '修改专业';
          this.judge = false;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该班级，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        this.$post("testIp/major/deleteMajorById?majorId=" + row.majorId, {})
            .then((response) => {
              if (response.msg == '删除成功') {
                this.$message({type: 'success', message: '删除成功!'});
                this.allSchool();
              }
            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    addProfess() {
      this.getAdminSchool();
      this.mation = "添加专业信息"
      this.AddprofeManag = false;
      this.addManag = true;
      this.domain = '';
      this.judge = true;
    },
    getAdminSchool() {
      this.$post("testIp/school/selectSchoolNameByadminId", {})
          .then((response) => {
            this.school = response.data.name;
          })
    },
    addMajpr() {
      this.$post("testIp/major/addMajor", {
        majorName: this.domain,
      }).then((response) => {
        console.log(response);
        if (response.msg == "添加成功") {
          this.openStart = '添加成功';
          this.open();
          this.AddprofeManag = true;
          this.addManag = false;
        }
        this.allSchool();
      })
    },
    revamp() {
      this.$post("testIp/major/updateMajorById", {
        majorId: this.majorId,
        majorName: this.domain,
        majorSchool: this.ProfeSchool
      }).then((response) => {
        if (response.msg == "修改成功") {
          this.openStart = '修改成功';
          this.open();
          this.AddprofeManag = true;
          this.addManag = false;
        }
        this.allSchool();
      })
    },
    open() {
      this.$message({
        showClose: true,
        message: this.openStart,
        type: 'success'
      })
    },
    nextLevel() {
      this.AddprofeManag = true;
      this.addManag = false;
    }
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
  margin: 10% auto;
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

.button {
  border: 1px solid white;
  width: 50px;
  text-align: center;
  background: #42b983;
}

.input {
  line-height: 40px;
}
</style>