<template>
  <div id="emain">
    <el-main style="height: 100%">
      <div id="Main" style="height: 100%">
        <div id="eeeform">
          <el-form :model="data" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                   hide-required-asterisk="false">
            <el-form-item label="姓名:">
              <el-input v-model="askName" disabled></el-input>
            </el-form-item>
            <el-form-item label="班级:" v-if="StudentClass">
              <el-input v-model="className" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式:">
              <el-input v-model="leavePhone" disabled></el-input>
            </el-form-item>
            <el-form-item label="时间:" required>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                      v-model="add"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['8:00:00']"
                      disabled>
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="原因:" prop="leaveReason">
              <el-input type="textarea" v-model="leaveReason"
                        disabled></el-input>
            </el-form-item>
            <div class="Cancellation" v-show="leaveTime">
              <span>销假时间：{{ Terminate }}</span>
            </div>
          </el-form>
        </div>
        <div id="offer">
          <el-row class="border" v-show="submit">
            <el-button type="primary" @click="absence" round>销假</el-button>
          </el-row>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "absence",
  data() {
    return {
      submit:true,
      StudentClass: true,//控制班级input显示变量
      data: {},//用post请求存放服务器上的数据
      add: [],
      leavePhone: '',
      leaveReason:'',
      Terminate: '',
      leaveTime: false,
    }
  },
  created() {
    this.data = this.$route.query.canshu;
    console.log('++++++++++', this.data);
    this.add = [this.data.leaveStarttime, this.leaveEndtime];
    console.log('-----------', this.add);
  },
  mounted() {
    this.Absence();
    this.teacherClass();
  },
  methods: {
    teacherClass() {
      if (window.localStorage.getItem("rank") == 2) {
        this.StudentClass = false;
      }
    },
    Absence() {
      this.$post("/testIp/offTheList/selectLeaveByTime", {})
          .then((response) => {
            if (response.code == 500) {
              this.$message({
                showClose: true,
                message: response.msg,
                type: 'error'
              })
            }
            console.log("瑟得瑟" + JSON.stringify(response.data));
            this.data = response.data;
            this.add = [this.data.leaveStarttime, this.data.leaveEndtime]
          })
    },
    absence() {
      this.$post("testIp/offTheList/updateLeave", {})
          .then((response) => {
            console.log(response.msg);
            let mydate = new Date();
            this.Terminate = mydate.toLocaleString('chinese', {hour12: false}).split('/').join('-');
            console.log(this.Terminate);
            this.leaveTime = true;
            this.submit = false;
            if (response.code == 0) {
              this.$message({
                showClose: true,
                message: '成功',
                type: 'success'
              });
            }
          })
    }
  }
}
</script>

<style scoped>

/*main主体页面*/
#emain {
  height: 100%;
  background: rgba(248, 248, 248, 1);
}

/*表单外div框*/
/deep/ #eeeform {
  border: 1px white solid;
  border-radius: 21px;
  width: 65%;
  height: 70%;
  margin: 2% auto;
  background: rgba(255, 255, 255, 1);
  min-height: 440px;
  min-width: 530px;
}
.Cancellation{
  width: 100%;
  margin: 3% 0% 5% 1%;
  color:rgba(51, 51, 51, 1);
  font-size: 20px;
}
/*表单*/
.el-form {
  width: 100%;
  margin: 5% 0% 5% 3%;
}

/*input宽度*/
.el-input {
  width: 75%;
}
/*label*/
/deep/.el-form-item__label{
  color:rgba(51, 51, 51, 1);
  font-size: 20px;
}
/*文本域*/
.el-textarea {
  width: 75%;
}
/deep/.el-textarea__inner{
  max-height: 220px;
}
/*时间*/
.el-col-11 {
  width: 50%;
  margin-right: -8%;
}
/*按钮*/
/deep/ .border {
  width: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: center;
}

/deep/ .el-button {
  background: rgba(24, 95, 212, 1);
  width: 55%;
}

</style>