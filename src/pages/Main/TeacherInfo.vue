<template>
  <div class="body">
    <div class="main" v-if="amend">
      <div class="top">
        <span>教师信息</span>
        <div>
          <el-button type="primary" round @click="password">修改密码</el-button>
          <el-button type="primary" round @click="ClassGrade">班级成绩</el-button>
        </div>
      </div>
      <div class="mainBody">
        <el-form :inline="true" :model="teacherInfo">
          <el-form-item label="姓名：">
            <label>{{ teacherInfo.teacher_name }}</label>
          </el-form-item>
          <el-form-item label="教工号：">
            <label>{{ teacherInfo.teacher_number }}</label>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="teacherInfo">
          <el-form-item label="性别：">
            <label>{{ teacherInfo.teacher_sex = 1 ? '男' : '女' }}</label>
          </el-form-item>
          <el-form-item label="所在班级：">
            <label>{{ teacherInfo.class_name }}</label>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="teacherInfo">
          <el-form-item label="所授学科：">
            <label>{{ teacherInfo.teacher_course }}</label>
          </el-form-item>
          <el-form-item label="职务：">
            <label>{{ teacherInfo.job_name }}</label>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="teacherInfo">
          <el-form-item label="年龄：">
            <label>{{ teacherInfo.teacher_age }}</label>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="teacherInfo">
          <el-form-item label="身份证号：">
            <label>{{ teacherInfo.teacher_idcard }}</label>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="teacherInfo">
          <el-form-item label="家庭住址：">
            <label>{{ teacherInfo.teacher_address }}</label>
          </el-form-item>
        </el-form>

      </div>
    </div>
    <changWork v-else></changWork>
  </div>
</template>

<script>
import changWork from "@/components/changWork";

export default {
  name: "TeacherInfo",
  components: {
    changWork//声明插件
  },
  data() {
    return {
      amend: true,
      teacherInfo: {},
    }

  },
  mounted() {
    this.getInfo();

  },
  methods: {
    getInfo() {//获取当前登录教师个人信息
      console.log("成功");
      this.$post("/testIp/assembly/selectInfo", {})
          .then((response) => {
            console.log(response);
            this.teacherInfo = response.data;
            console.log(this.teacherInfo);
          })
    },
    //修改密码按钮单击事件
    password() {
      this.amend = false;
    },
    //班级成绩点击按钮
    ClassGrade() {
      //跳转地址
      // this.$router.push(({path:'ClassScore'}))
    }
  }
}

</script>
<style scoped>
.body {
  width: 100%;
  height: 100%;
}

.main {
  height: 100%;
  width: 100%;
  background-color: rgba(248, 248, 248, 1);
}

/deep/ .el-button--primary {
  background-color: rgba(24, 95, 212, 1);
  border-color: #185fd4;
  width: 47%;
  height: 20%;
}

/deep/ .el-button {
  width: 150px;
  border-radius: 23px;
}

.top {
  height: 70px;
  /*width: calc(100% - 30px); //宽两个padding自动算 */
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  /*line-height: 10%;*/
  align-items: center;
  padding: 0 20px 0 20px;
}

.top span {
  /*字体大小 加粗*/
  font-size: 16px;
  font-weight: bold;
}

.mainBody {
  width: 90%;
  height: 400px;
  margin: 40px auto 0;
  border-radius: 21px;
  background-color: #fff;
  padding: 30px 0 0 40px;
}

/deep/ .el-form {
  height: 50px;
}

/deep/ .el-form-item__label {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  color: rgba(51, 51, 51, 1);
}

/deep/ .el-form-item__content {
  width: 200px;
  line-height: 50px;
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
}
</style>