<template>
    <div class="main">
        <div class="mainTop">
            <div class="mainHeader">
                修改密码
            </div>
        </div>
        <div class="middle">
            <div class="mainCent">
                <div>
                    <span>旧密码：</span>
                    <el-input v-model="oldPass" placeholder="请输入旧密码" class="Input"></el-input>
                </div>
                <div>
                    <span>新密码：</span>
                    <el-input v-model="newPass" type="password" placeholder="请输入新密码" class="Input"></el-input>
                </div>
            </div>
<!--            <div class="chage">修改密码成功</div>-->
            <div class="buts">
                <el-button type="primary" round class="button" @click="submited" id="primary1">提交</el-button>
<!--                <el-button type="primary" round class="button" id="primary1">返回</el-button>-->
            </div>

        </div>
    </div>


</template>

<script>
    export default {
        name: "changWork",
        data(){
            return{
                //双向绑定旧密码
                oldPass:'',
                //双向绑定新密码
                newPass:'',
                //双向绑定提交按钮
                submit:false,
                //绑定切换
                password:true,
            }
        },
        methods:{
            submited(){
                if(this.oldPass==''){
                    alert('请输入旧密码');
                }else if(this.newPass==''){
                    alert('请输入新密码')
                }
                else{
                    this.$post("",{//修改密码接口
                        oldPassword:this.oldPass, //向后端传输旧密码和新密码
                        newPassword:this.newPass,
                    })
                        .then((response)=>{
                            if(this.oldPass!=window.localStorage.getItem("password")){
                                alert(response.msg);
                                this.oldPass='';
                            }else if(this.newPass.length<6){
                                alert(response.msg);
                                this.newPass='';
                            } else {
                                this.password=false;//切换页面
                                // this.submit=false;
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .main{
        height: 1285px;
        /*width: 100%;*/
        background-color:rgba(248, 248, 248, 1);
    }
    .mainHeader{
        height: 70px;
        line-height: 70px;
        background-color: #fff;
        padding-left: 2%;
        font-size: 16px;
        font-weight: bold;
    }
    .middle{
        background-color: #fff;
        border-radius: 16px;
        margin: 0 auto;
        margin-top: 2%;
        padding-top: 39px;
        width: 40%;
        height: 30%;
        /*弹性布局*/
        display: flex;
        flex-direction: column;
        /*水平居中*/
        align-items: center;
    }
    .mainCent{
        padding-top: 6%;
        text-align: center;
    }
    .mainCent div{
        display: flex;
    }
    .mainCent div span{
        width: 90px;
        line-height:40px;
        /*margin-left:5%;*/
    }
    .mainCent div:first-child{
        margin-bottom: 40px;
    }
    /deep/.el-input__inner{
        border-radius: 21px;
    }
    #primary1{
        height: 40px;
        width: 160px;

    }
    .buts{
        margin-top: 70px;
        height: 60px;
    }
</style>