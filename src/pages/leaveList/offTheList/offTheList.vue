<template>
  <div id="emain">
    <el-main style="height: 100%">
      <div id="Main" style="height: 100%">
        <div id="eeeform">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                   hide-required-asterisk="false">
            <el-form-item label="姓名:">
              <el-input v-model="ruleForm.askName"></el-input>
            </el-form-item>
            <el-form-item label="班级:" v-if="StudentClass">
              <el-input v-model="ruleForm.className"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="时间:" required>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                      v-model="dateTime"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['8:00:00']">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="原因:">
              <el-input type="textarea" style="max-height: 220px" v-model="ruleForm.textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div id="offer">
          <el-row class="border">
            <el-button type="primary" @click="submitForm('ruleForm')" round>提交</el-button>
          </el-row>
          <div id="border" @click="absence">
            <span>去销假</span>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "offTheList",
  data() {
    return {
      StudentClass: true,
      leaveTime: true,
      ruleForm:{
        askName: '',
        className: '',
        phone: '',
        textarea: '',
      },
        dateTime:[],
      rules: {
        askName: [
          {required: true, message: '请输入学生姓名', trigger: 'blur'},
          {min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'}
        ],
        className: [
          {required: true, message: '请输入班级', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur'}
        ],
        textarea: [
          {required: true, message: '请输入请假原因', trigger: 'blur'}
        ]
      }
    };
  },
  mounted() {
    this.getInfo();
    this.teacherClass();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post("/testIp//leave/insertLeave", {
            teacherName: this.ruleForm.askName,
            className: this.ruleForm.className,
            leavePhone: this.ruleForm.phone,
            leaveStarttime: this.dateTime[0],
            leaveEndtime: this.dateTime[1],
            leaveReason: this.ruleForm.textarea,
          }).then((response) => {
            if (response.code == 0) {
              this.$message({
                showClose: true,
                message: response.msg,
                type: 'success'
              });
            }
            console.log(response);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    teacherClass() {
      if (window.localStorage.getItem("rank") == 2) {
        this.StudentClass = false;
      }
    },
    getInfo() {
      this.$post("/testIp/assembly/selectInfo", {})
          .then((response) => {
            if (window.localStorage.getItem("rank") == 1) {
              console.log('123'+response);
              this.ruleForm.askName = response.data.stu_name;
              this.ruleForm.className = response.data.class_name;
            }
            if (window.localStorage.getItem("rank") == 2) {
              console.log(response);
              this.ruleForm.askName = response.data.teacher_name;
            }
          })
    },
    absence() {
      this.$post("testIp/leave/updateLeave", {})
          .then((response) => {
            console.log(response);
            this.$router.push({path: '/absence', query: {canshu: response.data}});
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

/*表单*/
.el-form {
  width: 100%;
  margin: 5% 0% 5% 3%;
}
/*.el-form-item{*/
/*  margin: 2% auto;*/
/*}*/
/*input宽度*/
.el-input {
  width: 75%;
}

/*label*/
/deep/ .el-form-item__label {
  color: rgba(51, 51, 51, 1);
  font-size: 20px;
}

/*文本域*/
.el-textarea {
  width: 75%;
}

/deep/ .el-textarea__inner {
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

#border {
  color: rgba(153, 153, 153, 1);
  width: 20%;
  margin: 5px auto;
  text-align: center;
}

</style>