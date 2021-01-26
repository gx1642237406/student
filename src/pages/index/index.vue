<template>
  <el-container style="border: 1px solid #eee;height: 100%;overflow:hidden">
    <el-header style="height:80px">
      <Header></Header>
    </el-header>
    <el-container style="height: 100%">
      <el-aside id="scroll" style="height: 100%" width="170px">
        <el-menu background-color="#081120" text-color="#ffffff"
                 :default-active="$route.path"
                 class="el-menu" router>
          <div v-for="item in menu" :key="item.path">
            <div v-if="item.child.length > 0">
              <el-submenu :index="item.path">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span class="right-title">{{item.title}}</span>
                </template>
                <el-menu-item v-for="i in item.child" :key="i.path" :index="i.path">
                  {{i.title}}
                </el-menu-item>
              </el-submenu>
            </div>
            <div v-else>
              <el-menu-item :index="item.index">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
        <div style="position:absolute;bottom:0">
          <el-button class="button" @click="quit">退出登录</el-button>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header/Header";//引入Header组件
export default {
  name: "index",//声明组件
  components: {
    Header
  },
  mounted() {
    if (window.localStorage.getItem("token") == "") {
      this.$router.push({
        path: "/"
      })
    } else {
      this.getInfo();//绑定接口
    }
  },
  data() {
    return {
      menu: [
        // 没绑接口前的假数据
        // {
        //   title: '个人中心',
        //   icon: 'el-icon-house',
        //   path: '1',
        //   child: [
        //     {
        //       title: '个人信息',
        //       path: '/Main'
        //     },
        //     {
        //       title: '教师信息',
        //       path: '/teacherMain'
        //     },
        //     {
        //       title: '管理员信息',
        //       path: '/admainMain'
        //     }
        //   ]
        // },
        // {
        //   title: '学生列表',
        //   icon: 'el-icon-left',
        //   path: '2',
        //   child: [
        //     {
        //       title: '全部学生',
        //       path: '/AllStudent'
        //     },
        //     {
        //       title: '本班学生',
        //       path: '/ClassStudent'
        //     },
        //     {
        //       title: '学生管理',
        //       path: '/studentManag'
        //     }
        //   ]
        // },
        // {
        //   title: '教师列表',
        //   icon: 'el-icon-right',
        //   path: '3',
        //   child: [
        //     {
        //       title: '教师信息',
        //       path: '/teachersInfor'
        //     },
        //     {
        //       title: '教师管理',
        //       path: '/teacherManag'
        //     }
        //   ]
        // },
        // {
        //   title: '学校管理',
        //   icon: 'el-icon-top',
        //   path: '4',
        //   child: [
        //     {
        //       title: '专业管理',
        //       path: '/profeManag'
        //     },
        //     {
        //       title: '班级管理',
        //       path: '/classManag'
        //     }
        //   ]
        // },
        // {
        //   title: '成绩列表',
        //   icon: 'el-icon-download',
        //   path: '5',
        //   child: [
        //     {
        //       title: '本班成绩',
        //       path: '/ClassScore'
        //     },
        //     {
        //       title: '全校成绩',
        //       path: '/AllScores'
        //     },
        //     {
        //       title: '成绩管理',
        //       path: '/ScoreManage'
        //     }
        //   ]
        // },
        // {
        //   title: '请假列表',
        //   icon: 'el-icon-arrow-right',
        //   path: "6",
        //   child: [
        //     {
        //       title: '请假',
        //       path: '/offTheList'
        //     },
        //     {
        //       title: '销假',
        //       path: '/absence'
        //     },
        //     {
        //       title: '请假记录',
        //       path: '/leaveRecord'
        //     }
        //   ]
        // }
      ]
    }
  },
  methods: {
    getInfo() {    //获取当前登录用户的权限目录
      this.$post("/testIp/menu/selectMenu", {})
          .then((response) => {
                this.menu = response.data;   //将数据附给数组
              }
          )
    },
    quit() {    //退出登录
      this.$router.push({
        path: "/"
      })
      window.localStorage.setItem("token", "");
    },
  }
}
</script>

<style scoped>
/deep/ .el-header {
  background-color: #0b429d;
  color: #333;
  /*height:50px;*/
  line-height: 80px;
}

/deep/ .el-aside {
  background-color: #081120;
  color: #081120;
  overflow: hidden;
  height: 100%;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-submenu .el-menu-item {
  min-width: 99%;
}

.button {
  border: 0;
  background-color: #081120;
  color: #ffffff;
  width: 170px;
  border-top: 1px solid #333333;
}

* {
  margin: 0;
  padding: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 1020px;
}

.el-submenu__icon-arrow el-icon-arrow-down {
  display: none;
}

.el-icon-house {
  background: url("../../../static/icon_index1.png") left center no-repeat;
  background-size: 20px;
}

/deep/ .el-icon-house:before {
  content: "1" !important;
  font-size: 16px;
  visibility: hidden;
}

.el-icon-left {
  background: url("../../../static/icon_index2.png") left center no-repeat;
  background-size: 20px;

}

/deep/ .el-icon-left:before {
  content: "1" !important;
  font-size: 16px;
  visibility: hidden;
}

.el-icon-right {
  background: url("../../../static/icon_index3.png") left center no-repeat;
  background-size: 20px;

}

/deep/ .el-icon-right:before {
  content: "1" !important;
  font-size: 16px;
  visibility: hidden;
}

.el-icon-top {
  background: url("../../../static/icon_index4.png") left center no-repeat;
  background-size: 20px;
}

/deep/ .el-icon-top:before {
  content: "1" !important;
  font-size: 16px;
  visibility: hidden;
}

.el-icon-download {
  background: url("../../../static/icon_index4-1.png") left center no-repeat;
  background-size: 20px;
}

/deep/ .el-icon-download:before {
  content: "1" !important;
  font-size: 16px;
  visibility: hidden;
}

/deep/ .el-icon-arrow-down {
  background: url("../../../static/icon_list.png") center center no-repeat;
  background-size: 17px;
  margin-top: -14px;
}

/deep/ .el-icon-arrow-down:before {
  content: "1" !important;
  font-size: 32px;
  visibility: hidden;
}

.el-icon-arrow-right {
  background: url("../../../static/icon_index5.png") left center no-repeat;
  background-size: 20px;
}

/deep/ .el-icon-arrow-right:before {
  content: "1" !important;
  font-size: 16px;
  visibility: hidden;
}

.el-menu-item.is-active {
  background: rgba(16, 39, 73, 1) url("../../../static/图标 2.svg") no-repeat right center !important;
}

.el-button {
  background: rgba(24, 95, 212, 1);
}

.el-row {
  margin-right: 30px;
}

.el-form-item {
  font-size: 21px;
  color: rgba(51, 51, 51, 1);
  margin: 15px auto 0px;
}

/deep/ .el-form-item__label {
  font-size: 21px;
  line-height: 150%;
  color: rgba(51, 51, 51, 1);
}

label {
  font-size: 21px;
  line-height: 150%;
  color: rgba(51, 51, 51, 1);
}

.el-form-item {
  margin-right: 50px;
}

/deep/ .select {
  width: 12%;
  height: 20px;
  margin-left: 12px;
}

.el-table .color {
  background: #e9f6ff;
}

</style>