/* global $ */
'use strict';
(function ($) {
//main start
  //插件
  (function switcher(){
    //start
    $.fn.extend({
      switcherMhz: function () {
        $(this).find('.switcher-mhz').toggleClass('bg-color off');
      }
    });
    //end
  })();
  var eventSet = {
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
      var audio = document.querySelector('#media');
      audio.muted = !audio.muted;
      $('#audioStatus').switcherMhz();
      var audioStatus = audio.muted;
      $.cookie('audioStatus', audioStatus.toString(), {
        expires: 30,
        path: '/'
      });
    },
    keyboardEvents: function () {
      document.onkeydown = function (e) {
        switch (e.keyCode){
          case 77 :
            eventSet.setAudioPlayStatus(); break;
          case 67 :
            eventSet.changeColorTheme(); break;
        }
      };
    }
  };
  var userSet = {
    navSet: function navSet() {
      var $set = $('#setting');
      var $menu = $('.dropdown-mhz .dropdown-menu-mhz');
      $set.click(function () {
        $menu.toggleClass('hidden');
        $('#masker').toggleClass('masker');
      });
      $('#masker').click(function () {
        $menu.toggleClass('hidden');
        $(this).toggleClass('masker');
      });
      (function changeThemeAndSoundMute() {
        $('#audioStatus').click(function () {
          eventSet.setAudioPlayStatus();
        });
        $('#changeColorTheme').click(function () {
          eventSet.changeColorTheme();
        });
        (function cookieChcek() {
          if ($.cookie('colorVal')){
            var colorTheme = document.querySelector('.container-main');
            if ($.cookie('colorVal') !== 'true'){
              $('#changeColorTheme').switcherMhz();
              colorTheme.classList.remove('color-theme');
            }
          }
          if ($.cookie('audioStatus')){
            var audio = document.querySelector('#media audio');

            if ($.cookie('audioStatus') === 'true'){
              audio.muted = !audio.muted;
              $('#audioStatus').switcherMhz();
            }
          }
        })();

      })();
    }
  };
  function setCircle(circleNumber) {
    var container = document.querySelector('.container-main');
    var circleAll = document.createElement('div');
    (function initAmount(){
      var i = 0, circle;
      var randomCircleSize = 0;
      while (i < circleNumber){
          circle = document.createElement('div');
          randomCircleSize = Math.floor( Math.random() * 6) + 2;
          circle.style.width = randomCircleSize + 'px';
          circle.style.height = randomCircleSize + 'px';
          circle.classList.add('light-circle');
          circleAll.appendChild(circle);
          i++;
        }
      })();
    (function initPosition(){
      var circle = circleAll.querySelectorAll('.light-circle'),
        positionX = document.body.offsetWidth,
        positionY = document.body.offsetHeight;
      //初始化位置
      for ( var i = 0; i < circleNumber; i++ ){
        var initX = Math.floor(Math.random() * positionX + 100);
        circle[i].style.left = initX + 'px';
      }
      setTimeout(function () {
        for ( var j = 0; j < circleNumber; j++ ){
          var random = Math.random();
          var offSetX = Math.floor(Math.random() * positionX + ( -positionX * .62));  //粒子左右方向
          circle[j].style.transform = 'translate(' + offSetX + 'px,' + ( -positionY + 20) + 'px)'; // 粒子的动向步进
          circle[j].style.opacity = '0';
          circle[j].style.transitionDelay = Math.floor(random * 25 + 3) + 's'; //粒子延时
          circle[j].style.transitionDuration = Math.floor(random * 45 + 30) + 's';  //粒子总用时
        }
      }, 1000);
    })();
    container.appendChild(circleAll);
  }
  function storyAnimation() {
    var aLi = document.querySelectorAll('#storyBoard p'),
        count = 0,
        aLiLen = aLi.length;

    for ( var i = 0; i < aLiLen; i++ ){
        aLi[i].style.transitionDelay = count + 's';
        aLi[i].style.opacity = '1';
        count += .3;
      }
  }
  window.onload = function () {
    eventSet.keyboardEvents();
    storyAnimation();
  };
  (function runAnimation() {
    setCircle(50);
    setInterval(function () {
      setCircle(40);
    }, 65000);
  })();
  userSet.navSet();
//main end
})(jQuery);
