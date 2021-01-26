import VueRouter from "vue-router";
import Vue from "vue";

//路由懒加载
const index = () =>import('@/pages/index/index.vue');
const Login = () =>import('@/pages/Login/Login.vue');
const personal = () =>import('@/pages/Main/personal.vue');
const TeacherInfo = () =>import('@/pages/Main/TeacherInfo.vue');
const AdminInfo = () =>import('@/pages/Main/AdminInfo.vue');
const AllStudent = () =>import('@/pages/stuList/AllStudent.vue');
const ClassStudent = () =>import('@/pages/stuList/ClassStudent.vue');
const StudentAdmin = () =>import('@/pages/stuList/StudentAdmin.vue');
const offTheList = () =>import('@/pages/leaveList/offTheList/offTheList.vue');
const absence = () =>import('@/pages/leaveList/absence/absence.vue');
const leaveRecord = () =>import('@/pages/leaveList/leaveRecord/leaveRecord.vue');
const ClassScore = () =>import('@/pages/ResultList/ClassScore/ClassScore.vue');
const AllScore = () =>import('@/pages/ResultList/AllScores/AllScore.vue');
const TeacherInfo2 = () =>import('@/pages/teacherList/TeacherInfo2.vue');
const TeacherAdmin = () =>import('@/pages/teacherList/TeacherAdmin');
const majorManage = () =>import('@/pages/SchoolManage/profeManag/majorManage.vue');
const classManag = () =>import('@/pages/SchoolManage/classManag/classManag');
const ScoreManage = () =>import('@/pages/ResultList/ScoreManage/ScoreManage');

Vue.use(VueRouter);


const routes =[
    {
        path:'/',
        name:'/Login',
        component:Login,
    },
    {
        path: '/index',
        name:'index',
        // eslint-disable-next-line no-undef
        component: index,
        // meta:{
        //     isLogin:true //添加该字段表示进入这个路由是需要登陆的
        // },
        children:[
            {
                path:'/personal',
                name:'个人信息',
                component:personal,
            },
            {
                path:'/TeacherInfo',
                name:'TeacherInfo',
                component: TeacherInfo
            },
            {
                path: '/AdminInfo',
                name:'AdminInfo',
                component: AdminInfo
            },
            {
                path: '/AllStudent',
                name: 'AllStudent',
                component: AllStudent
            },
            {
                path:'/ClassStudent',
                name: 'ClassStudent',
                component: ClassStudent
            },
            {
                path: '/StudentAdmin',
                name:'StudentAdmin',
                component: StudentAdmin
            },
            {
                path:'/offTheList',
                name:'请假',
                component: offTheList
            },
            {
                path:'/absence',
                name:'销假',
                component: absence
            },
            {
                path:'/leaveRecord',
                name:'请假记录',
                component: leaveRecord
            },
            {
                path:'/ClassScore',
                name:'本班成绩',
                component: ClassScore
            },
            {
                path:'/AllScore',
                name:'全校成绩',
                component: AllScore
            },
            {
                component: ScoreManage,
                path: '/ScoreManage',
                name:'成绩管理',
            },
            {
                path: '/TeacherInfo2',
                name:'教师信息',
                component: TeacherInfo2,
            },
            {
                path: '/TeacherAdmin',
                name:'教师管理',
                component: TeacherAdmin,
            },
            {
                path:'/majorManage',
                name:'专业管理',
                component:majorManage,
            },
            {
                path: '/classManag',
                name:'班级管理',
                component: classManag
            }
        ]
    }
]

const  router=new VueRouter({
    routes,
    mode:'history'
})
// 路由守卫
router.beforeEach((to, from, next) => {
    if (to === from){
        return
    }
    // 判断是否需要登录
    if (to.matched.some(res => res.meta.isLogin)) {
        // console.log('满足跳转条件');
        // 是否满足跳转条件
        next();
        if (window.localStorage.getItem('token')) {
            // 跳转到目标页面
            next();
        } else {
            // 返回登陆页面
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        // console.log('不满足跳转条件');
        next()
    }
});
export default router