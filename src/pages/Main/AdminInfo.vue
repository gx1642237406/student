<template>
    <div class="body">
        <div class="main" v-if="amend">
            <div class="mainHeader">
                <span>管理员信息</span>
                <div>
                    <el-button type="primary" round @click="password">修改密码</el-button>
                </div>
            </div>
            <div class="mainCent">
                <div class="middle">
                    <el-form :model="admianInfo" :inline="true" class="adminForm">
                        <el-form-item label="管理员编号：">
                            <label>{{admianInfo.id}}</label>
                        </el-form-item>
                    </el-form>
                    <el-form :model="admianInfo" :inline="true" class="adminForm">
                        <el-form-item label="学校：">
                            <label>{{admianInfo.name}}</label>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <changWork v-else></changWork>
    </div>
</template>

<script>
    import changWork from "@/components/changWork";
    export default {
        name: "AdminInfo",
        components:{
            changWork//声明插件
        },
        data(){
            return{
                amend:true,
                admianInfo:{},
            }
        },
        mounted(){
            this.getInfo();
        },
        methods:{
            getInfo() {//获取当前登录教师个人信息
                console.log("成功");
                this.$post("/testIp/school/selectSchoolNameByadminId",)
                    .then((response) => {
                        console.log(response);
                        this.admianInfo=response.data;
                        console.log(response.data)

                    })
            },
            password(){
                this.amend=false;
            }
        },

    }
</script>

<style scoped>
    .body{
        width: 100%;
        height: 100%;
    }
    .main{
        height: 100%;
        width: 100%;
        background-color: rgba(248, 248, 248, 1);
    }
    .mainHeader{
        height: 70px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding-left: 2%;
        padding-right: 2%;
        align-items: center;
    }
    .mainHeader span{
        font-size: 16px;
        font-weight: bold;
    }
    .mainCent{
        height: 60%;
        width: 80%;
        background-color: white;
        margin: 3% auto;
        border-radius: 21px;
    }
    .middle{
        padding:30px 0 0 30px;
    }
    /deep/.el-form-item__label{
        color: #000;
        text-align: left;
    }
</style>