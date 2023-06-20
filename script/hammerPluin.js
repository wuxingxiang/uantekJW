    var reqAnimationFrame = (function () {
        return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
            window.setTimeout(callback,1000 / 60);//1000 / 60
        };
    })();

    var log = null;
    var el=document.querySelector("#imageDiv");//获取你想要放大的图片<img>标签id
	//var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);//居中
   // var  START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);
  	var START_X =0;//后来发现，出现位置设为0才居中
	  var START_Y=0;
    var ticking = false;
    var transform;
    var timer;
    var mc = new Hammer.Manager(el);

    var currentX = 0;
    var currentY = 0;

    var height    = 0;
    var width     = 0;
    var boxHeight = 0;
    var boxWidth  = 0;

    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    mc.add(new Hammer.Tap());

    mc.on("panstart panmove panend", onPan);//拖动事件
   // mc.on("rotatestart rotatemove", onRotate);//旋转事件
    mc.on("pinchstart pinchmove pinchend", onPinch);//放大缩小事件
    mc.on("swipe", onSwipe);
    mc.on("tap", onTap);//单击
    mc.on("doubletap", onDoubleTap);//双击

    mc.on("hammer.input", function(ev) {
        // if(ev.isFinal) {//判断是否离开，或者事件结束
        //     //resetElement();//�ָ�
        // 	START_X=transform.translate.x;//把当前拖动到的坐标赋值给中间变量
		    //   START_Y=transform.translate.y;
        // }
    });

    function resetElement() {
        el.className = 'animate';
        transform = {
            translate: { x: START_X, y: START_Y },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
        requestElementUpdate();
    }

    function updateElementTransform() {

      height = el.offsetHeight;
      width  = el.offsetWidth;
      boxWidth  = width;
      boxHeight = $api.dom('body').offsetHeight;
      var parentNode  = el.parentNode;
      if (parentNode) {
        boxHeight = parentNode.offsetHeight;
      }

      if (transform.scale*width > boxWidth) {
        if (transform.translate.x > (transform.scale*width -boxWidth)/2) {
          transform.translate.x = (transform.scale*width - boxWidth)/2;
        }

        if (transform.translate.x < (boxWidth - transform.scale*width)/2 ) {
          transform.translate.x = (boxWidth - transform.scale*width)/2;
        }
      }

      // console.log('scale=='+transform.scale);
      //
      // console.log('offsetTop=='+transform.translate.y);
      // console.log('boxHeight=='+boxHeight);
      // console.log('imgHeight=='+height*transform.scale);
      //
      //
      // console.log('offsetLeft='+transform.translate.x);
      // console.log('width=='+width);
      // console.log('imgWidth=='+transform.scale*width);

      if (transform.scale*height > boxHeight) {
        if (transform.translate.y > (transform.scale*height -boxHeight)/2) {
          transform.translate.y = (transform.scale*height - boxHeight)/2;
        }

        if (transform.translate.y < (boxHeight - transform.scale*height)/2 ) {
          transform.translate.y = (boxHeight - transform.scale*height)/2;
        }
      }else {
        transform.translate.y = 0;
      }

      var value = [
                    'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
                    'scale(' + transform.scale + ', ' + transform.scale + ')',
                    'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
      ];

      console.log(JSON.stringify(value));
      value = value.join(" ");
      el.textContent = value;
      el.style.webkitTransform = value;
      el.style.mozTransform = value;
      el.style.transform = value;
      ticking = false;
    }

    function requestElementUpdate() {
        if(!ticking) {
            reqAnimationFrame(updateElementTransform);
            ticking = true;
        }
    }

    function logEvent(str) {
        //log.insertBefore(document.createTextNode(str +"\n"), log.firstChild);
    }

    function onPan(ev) {
      if(ev.type == 'panend') {
        START_Y = transform.translate.x;
        START_Y = transform.translate.y;
      }

      var canMoveY = (transform.scale*height -boxHeight)/2 > (START_Y + ev.deltaY) && (START_Y + ev.deltaY) > (boxHeight-transform.scale*height)/2;

      if (height*transform.scale > boxHeight && canMoveY) {
        transform.translate.y = START_Y + ev.deltaY;
      }

      var canMoveX = (transform.scale*width -boxWidth)/2 > (START_X + ev.deltaX) && (START_X + ev.deltaX) > (boxWidth-transform.scale*width)/2;

      if (width*transform.scale > boxWidth && canMoveX) {
        transform.translate.x = START_X + ev.deltaX;
      }

      console.log('ev=='+JSON.stringify(ev));

      console.log('translate_x=='+transform.translate.y);
      console.log('translate_y=='+transform.translate.y);

      console.log('boxHeight=='+boxHeight);
      console.log('boxWidth =='+boxWidth);

      console.log('imageWidth =='+width*transform.scale);
      console.log('imgHeight  =='+height*transform.scale);

      console.log('deltaX =='+(START_X + ev.deltaX));
      console.log('deltaY =='+(START_X + ev.deltaY));

      el.className = '';

      requestElementUpdate();
      logEvent(ev.type);
    }

    var initScale = 1;
    function onPinch(ev) {
        if(ev.type == 'pinchstart') {
          initScale = transform.scale || 1;
        }
        el.className = '';
        if(ev.type == 'pinchend') {
          if (initScale * ev.scale < 1 ) {
            transform.translate.x = 0;
            transform.translate.y = 0;
            transform.rx = 1;
            setTimeout(function () {
                resetElement();
            }, 100);
          }
          // START_X = 0;
          // START_Y = 0;
        }

        transform.scale = initScale * ev.scale;
        requestElementUpdate();
        logEvent(ev.type);
    }

    function refreshTransform() {
      transform.scale = 1;
      requestElementUpdate();
    }

    var initAngle = 0;
    function onRotate(ev) {
        if(ev.type == 'rotatestart') {
            initAngle = transform.angle || 0;
        }
        el.className = '';
        transform.rz = 1;
        transform.angle = initAngle + ev.rotation;
        requestElementUpdate();
        logEvent(ev.type);
    }

    function onSwipe(ev) {
      return;
        // var angle = 50;
        var angle = 0;
        transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
        transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 300);
        requestElementUpdate();
        logEvent(ev.type);
    }

    var simpleTap = true;
    var firstTap  = true;
    function onTap(ev) {
      simpleTap = true;
      if (firstTap == false) {
        return;
      }
      setTimeout(function () {
        if (simpleTap == true) {
          analyzeTapData(ev);
        }
        firstTap = true;
      }, 500);

      firstTap = false;
      return;

        transform.rx = 1;
        transform.angle = 0;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 200);
        requestElementUpdate();
        logEvent(ev.type);
    }

    function analyzeTapData(ev) {
      setTapPoint(ev,function (hiddenLeft,hiddenTop,tapPointX,tapPointY) {
        var scaleX = (tapPointX/transform.scale/width).toFixed(2);
        var scaleY = (tapPointY/transform.scale/height).toFixed(2);

        var tapScrPoint_x = ev.center.x.toFixed(2);
        var tapScrPoint_y = ev.center.y.toFixed(2);

        api.execScript({
            frameName: 'InputBadnessPart',
            script: 'productTap('+scaleX+','+scaleY+','+tapScrPoint_x+','+tapScrPoint_y+');'
        });
      });
    }

    function onDoubleTap(ev) {
      simpleTap = false;

      setTapPoint(ev,function (hiddenLeft,hiddenTop,tapPointX,tapPointY) {
        var scaleX = tapPointX/transform.scale/width;
        var scaleY = tapPointY/transform.scale/height;

        transform.scale = 2;
        requestElementUpdate();

        var currentHiddenLeft = (transform.scale*width-width)/2-transform.translate.x;
        var currentHiddenTop = (transform.scale*height-boxHeight)/2-transform.translate.y;

        var currentTapX = scaleX*transform.scale*width -currentHiddenLeft;
        var currentTapY = scaleY*transform.scale*height - currentHiddenTop;

        transform.translate.x = transform.translate.x + width/2-currentTapX;
        transform.translate.y = transform.translate.y + boxHeight/2-currentTapY;

        requestElementUpdate();

        logEvent(ev.type);
      });

      return;
        transform.rx = 1;
        transform.angle = 0;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 350);
        requestElementUpdate();
        logEvent(ev.type);
    }

    function setTapPoint(ev,callback) {
      var objTop  = getOffsetTop(el);//对象x位置
      var objLeft = getOffsetLeft(el);//对象y位置

      var hiddenLeft = (transform.scale*width-boxWidth)/2-transform.translate.x;
      var tapPointX = ev.center.x - objLeft + hiddenLeft;

      var hiddenTop = (transform.scale*height-boxHeight)/2-transform.translate.y;
      var tapPointY = ev.center.y - objTop + hiddenTop;

      callback(hiddenLeft,hiddenTop,tapPointX,tapPointY);
      console.log('ev=='+JSON.stringify(ev));

      console.log('translate_x=='+transform.translate.y);
      console.log('translate_y=='+transform.translate.y);

      console.log('boxHeight=='+boxHeight);
      console.log('boxWidth =='+boxWidth);

      console.log('imageWidth =='+width*transform.scale);
      console.log('imgHeight  =='+height*transform.scale);

      console.log('tapPointX =='+tapPointX);
      console.log('tapPointY =='+tapPointY);

    }

    function getOffsetTop(obj){
      var tmp = 0;
      var val = obj.offsetParent;
      while(val != null){
          tmp += val.offsetTop;
          val = val.offsetParent;
      }
      return tmp;
    }

    function getOffsetLeft(obj){
        var tmp = 0;
        var val = obj.offsetParent;
        while(val != null){
            tmp += val.offsetLeft;
            val = val.offsetParent;
        }
        return tmp;
    }

    resetElement();
