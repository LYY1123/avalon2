// sw-precache插件官方注册方法

if ('serviceWorker' in navigator && (window.location.protocol === "https:" || window.location.hostname === "localhost")) {
  //延迟注册，直到页面加载完毕，确保我们的预先缓存请求不会降低首次访问体验。
  window.addEventListener('load', function() {
    // 此处注册service-worker.js脚本  注意路径引用问题
    let sk_path = window.location.hostname === "localhost" ? "./service-worker.js" : "./service-worker.min.js";

    navigator.serviceWorker.register(sk_path).then(function(reg) {
      console.log("service worker 注册成功！！！")
      //如果service-worker.js发生更改，则会触发updatefound。
      reg.onupdatefound = function() {
        // 这是一个服务者对象
        var installingWorker = reg.installing;
        // 当service worker的状态发生变化时触发此方法
        installingWorker.onstatechange = function() {
          // installing 安装中
          // installed, 安装完成 在这种状态下的服务工作者被认为是一名等候工作者。
          // activating 激活中 
          // activated 已激活  处于此状态的服务人员被视为准备处理功能事件的活动员工。
          // redundant 被卸载 被解雇   新的服务工作人员正在替换当前的服务工作人员，或者当前的服务工作人员由于安装失败而被丢弃。
          console.log("service worker -- " + installingWorker.state)
          switch (installingWorker.state) {
            case 'installing':
              console.log("service worker 安装中...")
              break;
            case 'installed':
              // 不理解这段代码有什么意义
              if (navigator.serviceWorker.controller) {
                // 表示页面已被service worker控制
                console.log('页面已被service worker控制，请尝试刷新页面！！');
              } else {
                // 内容已被预先缓存完毕
                console.log('内容现在可以离线使用了！！');
              }
              break;

            case 'activating': 
              break;
            case 'activated': 
              break;
            case 'redundant':
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  });
}
