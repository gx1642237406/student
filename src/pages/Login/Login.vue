<template>
   <div class="body-cont">
      <div class="img-bg">
         <div class="login_box">
            <span class="title">学生管理系统</span>
            <div class="center">
               <div class="fromInput" >
                  <img src="../../../static/icon1.png" alt="">
                  <el-select v-model="value" placeholder="请选择身份登陆" class="aaa" :popper-append-to-body="true">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                  </el-select>
               </div>
               <div class="fromInput">
                  <img src="../../../static/icon2.png" alt="">
                  <el-input v-model="userNumber" placeholder="请输入账号"></el-input>
               </div>
               <div class="fromInput">
                  <img src="../../../static/icon3.png" alt="">
                  <el-input v-model="userPassword" type="password" placeholder="请输入账号"></el-input>
               </div>
            </div>
            <el-button type="button" @click="getInfo">登陆</el-button>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: "Login",
      data(){
         return{
            account:'',
            password:'',
            options:[{
               value:1,
               label:'管理员'
            },{
               value: 3,
               label: '教师'
            },{
               value:2,
               label: '学生'
            }],

            value: '',
            userNumber: '',
            userPassword: '',
            rank:3
         }
      },

      mounted() {
      },
      methods: {
         getInfo() {//登陆接口//点击登陆调用接口
            if (this.value == '') {
               this.$message({
                  showClose: true,
                  message: '请选择登陆身份',
                  type: 'error'
               });
            } else if (this.userNumber == '') {
               this.$message({
                  showClose: true,
                  message: '请输入账号',
                  type: 'errpr'
               });
            } else if (this.userPassword == '') {
               this.$message({
                  chowClose: true,
                  message: '请输入密码',
                  type: 'error'
               });
            } else {
               this.$post("/testIp/login/login",//接口路径
                       {
                          number: this.userNumber,
                          password: this.userPassword,
                          rank: this.value - 1,
                       }
               ).then((response) => {
                  // this.router.push({path:'/'});
                  window.localStorage.setItem("token", response.token);//接收保存token
                  window.localStorage.setItem("rank", response.rank);//接收保存登陆信息
                  window.localStorage.setItem("password", response.password);//接收保存登陆密码
                  if (response.code == 403) {
                     this.$message({
                        showClose: true,
                        message: response.message,
                        type: 'error'
                     });
                  }
                  if (response.message == '认证成功') {
                     // this.loginSucces();//登陆成功弹出弹窗
                     this.rank = response.rank;
                     console.log('123'+this.rank);
                     if (response.rank == 0) {
                        this.$router.push({path:'/AdminInfo'});
                     }
                     if (response.rank == 1) {
                        this.$router.push({path:'/personal'});
                     }
                     if (response.rank == 2) {
                        this.$router.push({path:'/TeacherInfo'});
                     }
                     //登陆成功跳转
                  }

               })
            }
         }
      }
   }

</script>

<style scoped>
   .body-cont{
      background-image: url("../../../static/backimage.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 100%;
      min-width: 1300px;
   }
   .img-bg{
      height: 100%;
      background-color: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-self: center;
   }
   .login_box{
     min-height: 562px;
     min-width: 465px;
      background-color: white;
      min-height: 562px;
      min-width: 465px;
      width: 33%;
      height: 85%;
      /*margin: 0px auto;*/
      /*margin-top: 4%;*/
      border-radius: 8px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
   }
   .title{
      font-size: 40px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin-top: 15%;
   }
   .center{
      margin-top: 15%;
   }
   .fromInput{
      /*display: flex;*/
      /*justify-content: center;*/
      width:80%;
      height: 20%;
      margin: 0 auto;
      margin-top: 8%;
      border-bottom: 1px solid lightsteelblue;
      position: relative;

   }
   .fromInput img{
      width: 23px;
      height: 23px;
      position: absolute;
      top:5px;
      left: 0;
      z-index: 1000;
   }
   /deep/.el-input__inner{
      width: 400px;
      height: 40px;
      border-radius: 0;
      border: 0;
      margin-left: 5%;
   }
   /deep/.el-select{
      width: 100%;
   }
   /deep/.el-input{
      width: 100%;
   }
   /*.aaa{*/
   /*   width: 450px;*/
   /*   padding-left: 1%;*/
   /*}*/
   /deep/.el-button{
      width: 80%;
      height: 8%;
      border-radius: 33px;
      margin-top: 20%;
      font-size: 16px;
      margin: 10% 10% 10% 10%;
      background-color: cornflowerblue;
      color: white;
   }

</style>