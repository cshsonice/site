function homepage() {
  const homepageCookie = "toHome";
  if (window.location.pathname === '/') {
    if (getCookie(homepageCookie) === '') {
      setCookie(homepageCookie, '1', 1);
      window.location.href = '/home';
    }
  }
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

// 必须是全局变量
var remark_config = {
  host: "https://api.xchens.cn",
  site_id: 'xchens_cn',
  components: ['embed']
};
function showComment() {
  if (document.getElementById("remark42") == null) {
    console.log("not found comment div, stop show comment");
    return;
  }
  !function (e, n) { for (var o = 0; o < e.length; o++) { var r = n.createElement("script"), c = ".js", d = n.head || n.body; "noModule" in r ? (r.type = "module", c = ".mjs") : r.async = !0, r.defer = !0, r.src = remark_config.host + "/web/" + e[o] + c, d.appendChild(r) } }(remark_config.components || ["embed"], document);
}

// 修复 remark42 弹出窗体 css 冲突的问题
function fixPopupCommentStyle() {
  // Select the node that will be observed for mutations
  const targetNode = document.body;

  // Options for the observer (which mutations to observe)
  const config = { childList: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // 设置 div#remark-* 的 z-index 属性
        for (let node of mutation.addedNodes) {
          if (node.id.search(/^remark-[\w\d]+-\w{4}$/i) == 0) {
            node.style.zIndex = 8;
          }
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Later, you can stop observing
  //observer.disconnect();
}

// ----
homepage();
showComment();
fixPopupCommentStyle();
