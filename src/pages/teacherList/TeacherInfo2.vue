<template>
  <div class="main">
    <div class="mainHeader">
      <span>全部教师</span>
      <div class="topItem">
        <el-select v-model="valueClass" placeholder="请选择班级" class="aaa" :popper-append-to-body="true">
          <el-option v-for="item in options" :label="item.label" :key="item.valueClas" :value="item.valueClas">
          </el-option>
        </el-select>
        <div>
          <el-input v-model="input"  @change="selectStu(index)" placeholder="请输入姓名" class="input"></el-input>
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
              prop="teacher_name"
              label="姓名"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="teacher_sex"
              label="性别"
              align="center" :formatter="teacherSex"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="teacher_age"
              label="年龄"
              align="center"
              style="width:20%">
          </el-table-column>
          <el-table-column
              prop="teacher_course"
              label="所授科目"
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
  name: "TeacherInfo2",
  data() {
    return {
      options: [
        {
          valueClas: 0,
          label: '1801',
        },
        {
          valueClas: 1,
          label: '1802',
        },
        {
          valueClas: 2,
          label: '1803',
        },
        {
          valueClas: 3,
          label: '1804',
        }
      ],
      index:0,
      valueClass: '',
      input: '',
      tableData: [],//搜索前的数据
      selectData: [],//搜索后的数据
    }
  },
  mounted() {
    this.TeacherInfo()
  },
  methods: {
    TeacherInfo() {
      this.$post("/testIp/assembly/selectUserAll", {
        info: 2,//后端要求1为学生
        currentPage: 1,//当前页
        pageSize: 3,//当前页数据
      })
          .then((response) => {
            this.tableData = response.items;
            console.log('1111'+this.tableData)
          })
    },
    teacherSex(row, column, val) {
      if (val === 0) {
        return "女";
      } else {
        return "男";
      }
    },
    selectStu(index) {
      const input = this.input;
      const abc = this.options[index];
      const hhh = this.tableData[index];
      if (input.length < 0) {
        alert("请输入搜素内容！");
      } else {
        console.log('111');
        // this.$post("/testIp/assembly/selectUserAll", {
        this.$post("/testIp/student/selectStudentByClassAndName",{
          stuClass:abc,
          stuName:hhh,
        })
            .then((response) =>{
              this.tableData = response.item;
            })

      }

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
  right: 45px;
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