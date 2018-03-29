// 手动定义serviceWorker缓存方案

var CACHE_NAME = 'OLLiu-' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
var cacheList = [
  'index.html'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    // 安装时 sk会根据设定的路径拉取资源进行缓存
    // 注意：有任何一个文件路径错误或者获取资源失败都会造成安装失败
    // 代码出错也会造成安装失败
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('serviceWorker 安装成功！！');
      // 安装之前检测是否有过期缓存 如果有清除掉
      caches.keys().then(function(cacheNames) {
          cacheNames.map(function(cname){
              if (cname !== CACHE_NAME) {
                caches.delete(cname);
              }
          })
      })

      // 缓存我们需要缓存的资源
      return cache.addAll(cacheList);
      
    }).catch(function (err) {
      console.log('serviceWorker 安装失败' + err);
    })
  );
});

// serviceWorker 被激活
// 新的serviceWorker被激活 当service-worker.js更新时会触发
self.addEventListener('activate', function(event){
    console.log('serviceWorker 激活！！')
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cname) {
          console.log('删除过期caches!!    ------------   ' + cname)
          caches.delete(cname);
        })).then(function(resp){
          // 创建新缓存
          caches.open(CACHE_NAME).then(function (cache) {
            console.log('过期资源已删除 --  创建新缓存成功！！！')
            // 缓存我们需要缓存的资源
            cache.addAll(cacheList);
          }).catch(function (err) {
            console.log(err);
          })
        })
      })
    );
});

// fetch 拦截页面的请求
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // 匹配请求的资源
    // Cache 接口的 match() 方法, 返回一个 Promise 解析为与 Cache 对象中的第一个匹配请求相关联的Response 。如果没有找到匹配，Promise 解析为 undefined。详情见：https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/match
    //match 方法会匹配请求url和请求头 所以hash值不同也会匹配失败 
    caches.match(event.request).then(function(respones){
      if (respones) {
        console.log('serviceWorker 匹配成功，cache 到资源！！');
        return respones
      }
      console.log('没有 cache 到资源,开始从服务器获取资源...');

      // 不理解为什么要return
      return fetch(event.request).then(function(resp){
        if (resp === "404") {
          return resp
        }
        
        console.log('从服务器获取资源成功！！');

        if (event.request.url.indexOf('https') <= -1 && event.request.url.indexOf('localhost') <= -1) {
          console.log(event.request.url + ' ---- 请求不支持缓存！！')
          return resp;
        }
        if (event.request.method !== "GET") {
          console.log('暂不支持储存此类型请求！！！')
          return resp;
        }

        // 如果是webpack热更新服务选择直接返回
        if (event.request.url.indexOf('hot-update.json') > -1 || event.request.url.indexOf('__webpack_hmr') > -1) {
          return resp;
        }

        // 用变量缓存获取到的新资源
        // 注意：这里要用clone方法复制一份 因为resp是流文件并且resp的body只能被使用一次。 其实我不理解
        var newResp = resp.clone();
        // 从网络成功请求资源  然后将请求额资源缓存起来
        caches.open(CACHE_NAME).then(function(cache){
          // 查询当前cache列表 清除已经存在的相同请求
          cache.keys().then(function(list){
            var cleanUrl1 = newResp.url.indexOf('?') > -1 ? newResp.url.substr(0,newResp.url.indexOf('?')) : newResp.url;
            var cleanUrl2 ;
            for (var i = 0; i < list.length; i++) {
              cleanUrl2 = list[i].url.indexOf('?') > -1 ? list[i].url.substr(0,list[i].url.indexOf('?')) : list[i].url
              if (cleanUrl1 === cleanUrl2) {
                cache.delete(list[i].url).then(function(deleteFlag){
                  console.log(deleteFlag)
                  if (deleteFlag){
                    console.log(list)
                    console.log(i)
                    console.log('service worker 删除 -- ' + list[i].url + ' -- 请求');
                  }else{
                    console.log('service worker 删除 -- ' + list[i].url + '  -- 请求失败！！');
                  }
                })
              }
            }
            // 抓取我们的请求 然后将新请求缓存起来
            cache.put(event.request, newResp);
            console.log('缓存新资源成功！！！')
          })
        }).catch(function(err){
          console.log('缓存新资源失败！！')
        })
        // 把获取到的新资源返回给浏览器
        return resp;
      }).catch(function(err){
        console.log('serviceWorker 从服务器获取资源失败！！')
        throw err
        // 此处应该设置一个可退会的错误页面
      })

    })
  );
});
