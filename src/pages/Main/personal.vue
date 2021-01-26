<template>
    <div class="body">
        <div class="body"  v-if="amend">
            <div class="mainHeader">
                <span>学生信息</span>
                <div>
                    <el-button type="primary" round @click="password">修改密码</el-button>
                    <el-button type="primary" round @click="AllStudent">全部学生</el-button>
                    <el-button type="primary" round @click="ClassGrade">班级成绩</el-button>
                </div>
            </div>
            <!--                    <div class="mainMain">-->

            <!--                    </div>-->
            <div class="userFrom">
                <el-form :inline="true" class="userFromcss" :model="userInfo">
                    <el-form-item label="姓名：">
                        <label>{{userInfo.stu_name}}</label>
                    </el-form-item>
                    <el-form-item label="班级：">
                        <label>{{userInfo.class_name}}</label>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="userFromcss" :model="userInfo">
                    <el-form-item label="性别：">
                        <label>{{userInfo.stu_sex==0?'男':'女'}}</label>
                    </el-form-item>
                    <el-form-item label="学号：">
                        <label>{{userInfo.stu_sno}}</label>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="userFromcss" :model="userInfo">
                    <el-form-item label="学校：">
                        <label>{{userInfo.school_name}}</label>
                    </el-form-item>
                    <el-form-item label="班主任：">
                        <label>{{userInfo.teacher_name}}</label>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="userFromcss" :model="userInfo">
                    <el-form-item label="出生日期：">
                        <label>{{userInfo.stu_birthday}}</label>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="userFromcss" :model="userInfo">
                    <el-form-item label="身份证号：">
                        <label>{{userInfo.stu_idcard}}</label>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="userFromcss" :model="userInfo">
                    <el-form-item label="家庭住址：">
                        <label>{{userInfo.stu_address}}</label>
                    </el-form-item>
                </el-form>
            </div>
            <div class="below">
                <div class="belowSelect">
                    <span class="title">学生成绩</span>
                    <el-select v-model="value" class="select">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <!--                        table成绩表格-->
                <div class="table">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="achievement"
                                label="学科"
                                align="center"
                                style="width:20%">
                        </el-table-column>
                        <el-table-column
                                prop="CLanguage"
                                label="C语言"
                                align="center"
                                style="width:20%">
                        </el-table-column>
                        <el-table-column
                                prop="htmls"
                                label="HTML"
                                align="center"
                                style="width:20%">
                        </el-table-column>
                        <el-table-column
                                prop="javas"
                                label="JAVA"
                                align="center"
                                style="width:20%">
                        </el-table-column>
                      <el-table-column
                          prop="phps"
                          label="PHP"
                          align="center"
                          style="width:20%">
                      </el-table-column>
                        <el-table-column
                                prop="total"
                                label="总分"
                                align="center"
                                style="width:20%">
                        </el-table-column>
                    </el-table>
                </div>
            </div>

        </div>
        <changWork v-else></changWork>
    </div>
</template>

<script>
    import changWork from "../../components/changWork";
    export default {
        name: "personal",
    components:{
            changWork
    },
        data(){

            return{
                amend:true,
                userInfo:{},
                options:[
                    {value:'1',label:'2020-6'},
                    {value:'2',label:'2019-6'},
                    {value:'3',label:'2018-6'},
                    {value:'4',label:'2017-6'}
                ],
                value:'2020-06',
                tableData:[],
            }
        },
        mounted(){
            // 定义的执行接口方法
            this.getInfo();
            this.getdata();
        },
        methods: {
            getInfo(){
                //获取当前登录学生个人信息
                //前面后台接口地址，后面括号是传输的参数
                this.$post("/testIp/assembly/selectInfo",{})
                    .then((response)=>{
                        console.log(response);
                        this.userInfo=response.data;
                        console.log(response.data);
                    })
            },
            getdata(){//获取当前登录学生的个人成绩信息
                this.$post("/testIp/score/selectScoreSelf",{})
                    .then((response)=>{
                        //打印后端返回大数据查看信息
                        console.log('qqqqqq',response.data);
                        this.tableData=[response.data[0]];
                        // console.log(response.data);
                    })
            },
            password(){//修改密码点击事件
                this.amend=false;
            },
            AllStudent(){//全部学生点击事件
                this.$router.push({path:'AllStudent'});
            },
            ClassGrade(){//班级成绩点击事件
                this.$router.push({path:'ClassScore'});
            }
        },

    }
</script>
<style>
    /*设置主菜单的选中状态*/
    .el-submenu .el-submenu__title:hover {
        background-color: rgba(8, 17, 32, 1) !important;
    }
</style>
<style scoped>
    .body{
        width: 100%;
        height: 100%;
    }
    .body-box{
        width: 100%;
        height: 100%;
    }

    .el-header {
        height: 15%;
        background-color:rgba(11, 66, 157, 1);
        color: #333;
        /*text-align: center;*/
        line-height: 60px;
        font-size: 30px;
        color: white;
        display: flex;
        justify-content: flex-start;
        padding-left: 3%;
    }
    .el-container{
        height: 86%;
        width: 100%;
    }
    .el-aside {
        background-color: rgba(8, 17, 32, 1);
        color: #fff;
        text-align: center;
        line-height: 200px;

    }

    .el-main {
        width: 100%;
        height: 100%;
        background-color: rgba(248, 248, 248, 1);
        color: #333;
        text-align: center;
        padding: 0;
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .el-menu,.el-aside,.el-menu-item-group{
        padding: 0;
        background-color:rgba(8, 17, 32, 1)
    }

    /*鼠标悬浮子菜单时状态*/
    .el-menu-item:hover {
        background-color: rgb(2, 102, 250) !important;
    }
    /*鼠标选中子菜单时*/
    .el-menu-item.is-active{
        background: rgba(16, 39, 73, 1) url("../../../static/图标 2.svg") no-repeat right center !important;
    }
    i, span{
        position: relative;
        left: -35px;
    }
    span{
        position: relative;
        left: -18px;
    }
    .mainHeader{
        height: 70px;
        display: flex;
        background-color: white;
        line-height: 100%;
        align-items: center;
        justify-content: space-between;
        padding-left: 3%;
        padding-right: 5%;
    }
    /deep/.el-button--primary{
        background-color: rgba(24, 95, 212, 1);
        border-color: rgba(24, 95, 212, 1);
        width: 31%;
        height: 20%;
    }
    .userFrom{
        /*这是中间个人信息部分的样式*/
        height: 40%;
        width: 90%;
        background-color: #fff;
        border-radius: 10px;
        margin: 2% auto 1%;
        border:1px solid darkgrey;
        padding-top: 2%;
        padding-left: 5%;
        text-align: left;
    }
    .mainHeader span{
        /*字体大小 加粗*/
        font-size: 16px;
        font-weight: bold;
    }
    i{
        color: #fff;
    }
    /deep/.el-form{
        height: 15%;

    }
    /deep/.el-form-item__label{
        font-size: 16px;
        height: 13%;
        line-height: 13%;
    }
    /deep/.el-form-item__content{
        line-height: 170%;
        font-size: 16px;
        color: rgba(51,51,51,1);
    }
    /deep/.el-form-item{
        margin-right: 100px;
    }
    .below{
        height: 40%;
        padding-left:4%;
    }
    .table{
        height: 50%;
        width: 95%;
        background-color: #fff;
        margin: 3% auto;
        padding: 0;
    }
    .iIco{
        z-index: 1000;
        position: absolute;
        height: 20px;
        width: 20px;
        background-color: red;
    }
    /deep/.el-icon-arrow-down{
        height: 18px;
        width: 18px;
        content: " ";
        color: rgba(8, 17, 32, 1);
        background: url("../../../static/图片 2.png") no-repeat ;
        background-size: 18px;
    }
    label{
        width: 200px;
    }
    .table{
        /*margin-top: 2%;*/
    }
    /deep/.el-table-td{
        padding: 0 0;
        height: 50px;
    }
    /deep/.el-form-th{
        background-color: #E9F6FF;
    }
    /deep/.el-input__inner{
        border-radius: 21px;
    }

</style>