<template>
    <div class="mian">
        <div class="mainHeader">
            <span>修改密码</span>
        </div>
        <div class="middle">
            <div class="mianCent">
                <p>修改密码成功！</p>
                <div class="buts">
                    <el-button type="primary" round>返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "succeedPass"
    }
</script>

<style scoped>
    .mian{
        width: 100%;
        height: 100%;
        background-color: rgba(248, 248, 248, 1);;
    }
    .mainHeader{
        height: 70px;
        background-color: #fff;
        display: flex;
        padding-left: 2%;
        align-items: center;
    }
    .mainHeader span{
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
    .mianCent p{
        font-size: 18px;
        padding-top:90px ;
        padding-bottom: 60px;
        text-align: center;
    }
    /deep/.el-button--primary{
        height: 40px;
        line-height: 40px;
        width: 160px;
    }
</style>