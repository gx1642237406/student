<template>
  <div class="main">
    <div class="mainHeader">
      <span>审批状态</span>
      <div>
        <el-select v-model="valueClass" class="select" @change="List(valueClass)">
          <el-option v-for="item in options"
                     :value="item.valueClass"
                     :label="item.label"
                     :key="item.valueClass">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="middle">
      <div class="table">
        <el-table
            :data="tableData"
            width="100%">
          <el-table-column
              prop="askleave"
              label="请假人"
              align="center">
          </el-table-column>
          <el-table-column
              prop="state"
              label="审核状态"
              align="center"
              :formatter="Astated">
          </el-table-column>
          <el-table-column
              prop="starttime"
              label="请假时间"
              align="center">
            <template slot-scope="scope">{{ scope.row.starttime | dateYMDHMSFormat }}</template>
          </el-table-column>
          <el-table-column label="审核" align="center" v-if="this.tableData[0].state === 0?'true':''">
            <template slot-scope="scope">
              <el-button
                  class="buttonA"
                  size="mini"
                  @click="handleEdit(scope.$index,scope.row)">
                通过
              </el-button>
              <el-button
                  type="danger"
                  size="mini"
                  @click="handleDelete(scope.$index,scope.row)">
                不通过
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "leaveRecord",
  data() {
    return {
      options: [
        {valueClass: 0,label:'审核中'},
        {valueClass: 1,label:'已通过'},
        {valueClass: 2,label:'未通过'},
      ],
      valueClass: 1,
      tableData: [],
    }
  },
  mounted() {
    this.add();//页面一加载就显示"已通过"数据
  },
  methods: {
    add() {
      this.$post("/testIp/leave/selectLeaveAll", {
        leaveState: 1,
      }).then((response) => {
        this.tableData = response.data;
        console.log(response.data);
      })
    },
    List(valueClass) {
      console.log('121212121');
      this.$post("/testIp/leave/selectLeaveAll", {
        leaveState: this.options[valueClass].valueClass,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data;
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$post("/testIp/leave/leaveApproval", {
        leaveId: this.tableData[index].leaveId,
        leaveState: 2,
      }).then((response) => {
        console.log(response.data);
        this.List(2);
        this.valueClass = 2;
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$post("/testIp/leave/leaveApproval", {
        leaveId: this.tableData[index].leaveId,
        leaveState: 1,
      }).then( response => {
        //有问题！！！
        console.log(this.tableData);
        // this.tableData[index].state = 1;
        row.state = 1;
        console.log(response);
        console.log('通过了他'+row.state);
        this.add();
        this.valueClass = 1;
      }).catch(response => {
        console.log('失败了'+response);
      })
    },
    Astated(row, column, val) {
      if (val === 0) {
        return "审核中";
      }
      if (val === 1) {
        return "已通过";
      }
      if (val === 2) {
        return "未通过";
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main {
  width: 100%;
  height: 100%;
}

.mainHeader {
  height: 70px;
  display: flex;
  background-color: white;
  line-height: 100%;
  align-items: center;
  padding-left: 3%;
  padding-right: 5%;
}

.mainHeader span {
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-weight: bold;
  margin-right: 1%;
}
.select{
  width: 95%;
}
/*下拉列表*/
/deep/ .el-input__inner {
  border-radius: 21px;
  width: 200px;
}
  /*审批按钮*/
  /deep/ .el-button--mini{
    border-radius: 20px;
    width: 80px;
    height: 30px;
  }
  .buttonA{
    color: #ffffff;
    background: rgba(60,124,231,1);
  }
</style>