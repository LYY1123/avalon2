import 'common/css/common.css';
import './index.less';

import avalon from 'avalon2';
import mmRouter from 'mmRouter';

import * as request from 'js/request.js';
import "js/service-worker-registration.js"
// offline-plugin
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();

window.devFlag = window.location.origin.indexOf('lyy1123.github.io') > 0 ? 0 : 1;

console.log(1)
// 主controll
var vm = avalon.define({
  $id: 'app',
  view: '',
  headerLink: '',
  name: '',
  projectName: '',
  pageToTop: 0,
  headerClick () {
    if (this.headerLink) {
      window.location.href = this.headerLink;
    }
  },
  pageScroll () {}
});

/**
 *子controller列表
 * ！！！！！！！！！！！此处有坑
 * 因为按需加载 若将子controller实例写在对应的子页面JS中 JS的异步加载问题 并且按需加载引入的js有一定的下载时间
 * 会造成先出现页面后定义controller 此时子页面渲染需要的默认数据将不是从子controller中查找 因为此时定义子controller的js并未加载完成
 * 页面渲染会出现undefined或者未找到vmodel等情况 目前暂时采用将子controller定义在index.js中
 */
// homeList
export var homeListVm = avalon.define({
  $id: 'homeList',
  list: []
});

// 定义路由指向的页面和和回调
var map = {
  homeList: {
    html: require('./homeList/homeList.html'),
    callback () {
      // 按需加载
      // ！！！！！此处有坑
      require.ensure([], function (require) {
        require('./homeList/homeList.js');
      });
    }
  }
};

// 添加路由规则
for (var i in map) {
  avalon.router.add('/' + i, function (a) {
    vm.view = map[i].html;
    map[i].callback();
  });
}

// 启动路由监听
avalon.history.start({
  hashPrefix: ''
});

// 默认加载路由
avalon.router.navigate('/homeList');

// json数据
request.listJson().then(function (data) {
  let datas = JSON.parse(data);
  vm.headerLink = datas.headerLink;
  vm.name = datas.name;
  vm.projectName = datas['project-name'];
  homeListVm.list = datas.data;
});

// 功能代码
// 监控整个页面的滚动 改变头部UI
vm.pageScroll = function (event) {
  let projectNameEle = document.getElementById('projectName');
  if (projectNameEle.offsetTop + projectNameEle.clientHeight - event.target.scrollTop <= 0) {
    vm.pageToTop = 1;
  }else{
    vm.pageToTop = 0;
  }
}

avalon.scan(document.body);
