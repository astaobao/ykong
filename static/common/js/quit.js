import {
  Indicator,
  Toast,
  MessageBox
} from 'mint-ui'

document.addEventListener('plusready', function (a) {
	 Indicator.close();
    var first = '';
    plus.key.addEventListener('backbutton', function () {
      //获取地址栏目中的url
      var url = location.hash.split('/')[1]
      var url2 = location.hash.split('/')[2]
      var url3 = location.hash.split('/')[3]
      var url4 = location.hash.split('/')[4]
      
	  
      if ((url3 == url4&&url2=='tabbar')|| url==='') {//判断是首页的时候点击二次退出app
	
	  /* 
	  
        if (new Date().getTime() - first < 3000) {
          plus.runtime.quit();//表示退出app
        } else {
          alertMsg("再按一次退出应用");//自定义的弹窗
          first = new Date().getTime();
        } */
     
      MessageBox.confirm('确定要退出程序吗？','操作提醒',{
        confirmButtonText: '退出',
        cancelButtonText: '取消'
      },
      ).then(() => {
        plus.runtime.quit()
      }).catch(() => {
        return
      })
	  
	  
	  
	  } else {
        history.go(-1)
      }
    }, false)
})





/* 
//自定义提示框
window.alertMsg = function (txt) {
        var alertFram = document.createElement("DIV");
        alertFram.id = "alertFram";
        alertFram.style.position = "fixed";
        alertFram.style.width = "100%";
        alertFram.style.textAlign = "center";
        alertFram.style.bottom = "10%";
        alertFram.style.zIndex = "10001";
        strHtml = " <span style=\"font-family: 微软雅黑;font-size:0.28rem;display:inline-block;background:#333;color:#fff;padding:0 0.3rem;line-height:.88rem;border-radius:0.1rem; \">" + txt + "</span>";
        alertFram.innerHTML = strHtml;
        document.body.appendChild(alertFram);
        setTimeout((function () {
            alertFram.style.display = "none";
        }), 2000)
}; */