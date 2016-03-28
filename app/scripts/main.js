(function ($) {
//匿名函数开始

  /*
  * createCricle函数说明:
  *   生成指定数量的光圈
  *   cricleNumber 用来指定粒子数量
  *   positionY 為TRUE開啟隨機bottom值
  * */
  function createCricle( number,positionY) {
    var whileCount = number,
        i = 0 ,
        container = document.querySelector('.container-main'),
        div,
        random = 0,
        randomY = 0,
        onOff  = false,
        divParent = document.createElement('div');
        divParent.className = 'cricleParent';
    positionY? onOff = true:onOff= false;
    for ( ;i<whileCount ;i++){
      random = Math.floor(Math.random() * 6)+ 2; //掌握粒子大小范围
      // console.log(random); //测试粒子大小
      div = document.createElement('div');
      if (onOff){
        randomY = Math.floor(Math.random()*400+1);
        div.style.bottom = randomY+'px';
      }
      div.style.width = random + 'px';
      div.style.height = random + 'px';
      div.classList.add('light-cricle');
      divParent.appendChild(div);
    }
    container.appendChild(divParent);
  }
  createCricle(40);
    createCricle(40,true);

  //自動粒子效果
  setInterval(function () {
    $(".cricleParent").remove();
    createCricle(80);
    getMove();
  },65000);
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
    for ( ;i<divLen ;i++ ){
      initX = Math.floor(Math.random()*bodyOffsetWidth+100);
      div[i].style.left = initX +'px';
    }
    //随机核心
    setTimeout(function () {
      for (var i =0; i<divLen;i++){
        var random = Math.random();
        var offSetX = Math.floor(Math.random()*bodyOffsetWidth+(-bodyOffsetHight*.8));  //粒子左右方向
        div[i].style.transform = 'translate('+offSetX+'px,'+ (-bodyOffsetHight+ 20) +'px)'; // 粒子的动向步进
        div[i].style.opacity = '0'; // 粒子透明度
        div[i].style.transitionDelay = Math.floor(random*25+3)+'s'; //粒子延时
        div[i].style.transitionDuration = Math.floor(random*30+15)+'s';  //粒子总用时
      }
    },1000);
  }

  /*
  * 主标题移动
  * 页面加载后,自动从高位置降低位置,
  * 过程中加上动画
  * 传入两个参数, obj 代表移动的对象
  * time 动画时间
  * */
  function titleMove(time) {
    var title = document.querySelector('#title');
    title.style.transitionDuration = time+'ms';
    title.style.transform ='translate(0,7em)';
    title.style.opacity = 12;
  }

  /*
  *  用来给文字添加渐变效果
  *
  * */
  function storyEffect() {
    var aLi = document.querySelectorAll('#storyBoard li'),
      count =2,i=0,
      aLiLen = aLi.length;
    for ( ; i<aLiLen ; i++){
        aLi[i].style.transitionDelay = count + 's';
        aLi[i].style.opacity = '0.82';
        count+=0.5;
      }
  }
  getMove();

  /*
  * 键盘事件
  * 下一个古诗
  * 上一个古诗
  * 停止音乐,播放音乐
  * 需要帮助? shift+?
  * 切换主题 theme
  * */
  document.onkeydown = function (e) {
    if (e.keyCode === 77){
        var audio = document.querySelector('#media audio');
        audio.muted = !audio.muted;
    }
  };

  window.onload = function () {
    titleMove(3000);
    storyEffect();
  };
//匿名函数结束
})(jQuery);
