import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import moment from 'moment'

import {post,fetch,patch,put} from './utils/http'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

Vue.prototype.moment = moment

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.filter('dateYMDHMSFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern);
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')