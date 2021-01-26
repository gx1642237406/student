<template>
  <div class="main">
    <div class="mainHeader">
      <span>全校学生</span>
      <div class="topItem">
        <div>
          <el-input @change="selectStu" v-model="input" placeholder="请输入班级名称" class="input"></el-input>
          <img src="../../../static/图标 18.svg" class="icon" width="20px" height="20px">
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="table">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              prop="stu_name"
              label="姓名"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="stu_sex"
              label="性别"
              align="center" :formatter="stuSex"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="school_name"
              label="学校"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="stu_sno"
              label="学号"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="stu_address"
              label="地址"
              align="center"
              style="width:20%">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllStudent",
  data() {
    return {
      index: 0,
      input: '',
      tableData: [],//搜索前的数据
      selectData: [],//搜索后的数据
    }
  },
  mounted() {
    this.getStuInfo()
  },
  methods: {
    getStuInfo() {
      this.$post("/testIp/assembly/selectUserAll", {
        "info": 1,//后端要求1为学生
        "currentPage": 1,//当前页
        "pageSize": 3,//当前页数据
      })
          .then((response) => {
            this.tableData = response.items;
          })
    },
    stuSex(row, column, val) {
      if (val === 0) {
        return "女";
      } else {
        return "男";
      }
    },
    selectStu() {
      this.$post("/testIp/student/selectStudentByClassName", {
        className: this.input,
      })
          .then((response) => {
            this.tableData = response.item;
          })
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

.topItem {
  display: flex;
}

.icon {
  position: absolute;
  right: 2.5%;
  top: 107px;
}

/deep/ .el-input__inner {
  border-radius: 24px;
  height: 35px;
  width: 300px;
  margin-left: 10px;
}

.el-input:last-child {
  margin-right: 40px;
}

.middle {
  height: 80%;
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
</style>