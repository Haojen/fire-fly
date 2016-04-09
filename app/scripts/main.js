/* global $ */
'use strict';
(function ($) {
//匿名函数开始
  (function(){
    //start
    $.fn.extend({
      switcherMhz: function () {
        $(this).find('.switcher-mhz').toggleClass('bg-color off');
      }
    });
    //end
  })();

  var keyAndMouseEvents = {
    changeColorTheme: function () {
      var colorTheme = document.querySelector('div.container-main');
      colorTheme.classList.toggle('color-theme');
      $('#changeColorTheme').switcherMhz();
      var colorCookieVal = $(colorTheme).hasClass('color-theme');
      if (!colorCookieVal){
        colorTheme.style.transition = 'background 1.6s';
      }
      $.cookie('colorVal', colorCookieVal.toString(), {
        expires: 30,
        path: '/'
      });
    },
    setAudioPlayStatus: function () {
      var audio = document.querySelector('#media audio');
      audio.muted = !audio.muted;
      $('#audioStatus').switcherMhz();
      var audioStatus = audio.muted;
      $.cookie('audioStatus', audioStatus.toString(), {
        expires: 30,
        path: '/'
      });
    }
  };

  /*
  * createCricle函数说明:
  *   生成指定数量的光圈
  *   cricleNumber 用来指定粒子数量
  *   positionY 為TRUE開啟隨機bottom值
  * */
  function createCricle( number, positionY) {
    var whileCount = number,
        i = 0,
        container = document.querySelector('.container-main'),
        div,
        random = 0,
        randomY = 0,
        onOff = false,
        divParent = document.createElement('div');
        divParent.className = 'cricleParent';
      if (positionY ){
        onOff = true;
      }else{
        onOff = false;
      }
    for ( ; i < whileCount; i++ ){
      random = Math.floor(Math.random() * 6) + 2; //掌握粒子大小范围
      // console.log(random); //测试粒子大小
      div = document.createElement('div');
      if (onOff){
        randomY = Math.floor(Math.random() * 400 + 1);
        div.style.bottom = randomY + 'px';
      }
      div.style.width = random + 'px';
      div.style.height = random + 'px';
      div.classList.add('light-cricle');
      divParent.appendChild(div);
    }
    container.appendChild(divParent);
  }

  /*思路
  * 需要获取创建的光圈数量, 从而给不同的光圈指定位置
  * 遍历光圈,给每一个光圈指定随机的 left值
  * 功能
  * 随机移动
  * */
  function getMove() {
    var i = 0,
        div = document.querySelectorAll('.light-cricle'),
        divLen = div.length,
        initX,
        bodyOffsetWidth = document.body.offsetWidth,
        bodyOffsetHight = document.body.offsetHeight;
    //初始化位置
    for ( ; i < divLen; i++ ){
      initX = Math.floor(Math.random() * bodyOffsetWidth + 100);
      div[i].style.left = initX + 'px';
    }
    //随机核心
    setTimeout(function () {
      for ( var j = 0; j < divLen; j++ ){
        var random = Math.random();
        var offSetX = Math.floor(Math.random() * bodyOffsetWidth + ( -bodyOffsetHight * .8));  //粒子左右方向
        div[j].style.transform = 'translate(' + offSetX + 'px,' + ( -bodyOffsetHight + 20) + 'px)'; // 粒子的动向步进
        div[j].style.opacity = '0'; // 粒子透明度
        div[j].style.transitionDelay = Math.floor(random * 25 + 3) + 's'; //粒子延时
        div[j].style.transitionDuration = Math.floor(random * 30 + 15) + 's';  //粒子总用时
      }
    }, 1000);
  }

  /*
  * 主标题移动
  * 页面加载后,自动从高位置降低位置,
  * 过程中加上动画
  * 传入两个参数, obj 代表移动的对象
  * time 动画时间
  * */
  function titleMove() {
    var title = document.querySelector('#title');
    title.style.transform = 'translate(0,2em)';
    title.style.opacity = 1;
  }

  /*
  *  用来给文字添加渐变效果
  *
  * */
  function storyEffect() {
    var aLi = document.querySelectorAll('#storyBoard li'),
      count = 0,
      i = 0,
      aLiLen = aLi.length;
    for ( ; i < aLiLen; i++ ){
        aLi[i].style.transitionDelay = count + 's';
        aLi[i].style.opacity = '1';
        count += 0.45;
      }
  }

  /*
  * 键盘事件
  * 下一个古诗
  * 上一个古诗
  * 停止音乐,播放音乐
  * 需要帮助? shift+?
  * 切换主题 theme
  * */
  document.onkeydown = function (e) {
    switch (e.keyCode){
      case 77 :
           keyAndMouseEvents.setAudioPlayStatus();

        break;
      case 67 :
           keyAndMouseEvents.changeColorTheme();

            break;
      default :
            // console.log(e.keyCode)
    }
  };
  (function () {
    createCricle(40);
    createCricle(40, true);
    getMove();
    setInterval(function () {
      $('.cricleParent').remove();
      createCricle(80);
      getMove();
    }, 65000);
    //nav setting
    (function () {
      var $set = $('#setting'),
          $menu = $('.dropdown-mhz .dropdown-menu-mhz');
      $set.click(function () {
        $menu.toggleClass('hidden');
        $('#masker').toggleClass('masker');
      });
      $('#masker').click(function () {
        $menu.toggleClass('hidden');
        $(this).toggleClass('masker');
      });
    })();
    //nav inside click
    (function () {
      $('#audioStatus').click(function () {
        keyAndMouseEvents.setAudioPlayStatus();
      });
      $('#changeColorTheme').click(function () {
        keyAndMouseEvents.changeColorTheme();
      });
      (function () {
        if ($.cookie('colorVal')){
          var colorTheme = document.querySelector('div.container-main');

          if ($.cookie('colorVal') === 'true'){
            colorTheme.classList.add('color-theme');
            $('#changeColorTheme').switcherMhz();
          } else {
            colorTheme.classList.remove('color-theme');
          }
        }
      })();

      (function () {
        if ($.cookie('audioStatus')){
          var audio = document.querySelector('#media audio');
          if ($.cookie('audioStatus') === 'true'){
            audio.muted = true;
            $('#audioStatus').switcherMhz();
          }else{
            audio.muted = false;
          }
        }
      })();
    })();

    })();
  window.onload = function () {
    titleMove();
    storyEffect();
  };
//匿名函数结束
})(jQuery);
