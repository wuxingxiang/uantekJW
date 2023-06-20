/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};

    u.addErrorHtml = function(body) {
      // var html =
      // '<section id="errorDiv"><div class="emptyContent"><div class="emptyImage"></div><div class="hintText"></div>
      // </div></section>'
      var html = '<section id="errorDiv"><div class="errorContent"  onclick="loadError()"><div class="errorImage"></div><div class="hintText">加载失败</div></div></section>'
      $api.append(body, html);
    }

    u.touchstartF = function(event) {
  	    x = event.changedTouches[0].pageX;
  	    y = event.changedTouches[0].pageY;
  	    swipeX = true;
  	    swipeY = true;
  	};

    u.refreshDiv = function(e) {
      var wrapperDiv = $api.dom('.wrapper');
      if (wrapperDiv) {
        var containerDivs = $api.domAll('.container');
        for (var i = 0; i < containerDivs.length; i++) {
          containerDivs[i].style.WebkitTransform = "translateX(" + 0 + "px)";
          containerDivs[i].style.transition = "-webkit-transform 300ms ease-in-out";
        }
      }
    }

    u.touchmoveFWithLeft = function(event,e,left) {
  	    X = event.changedTouches[0].pageX;
  	    Y = event.changedTouches[0].pageY;
  	    // 左右滑动
  	    if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
  	        // 阻止事件冒泡
  					if (event.cancel == true) {
  						event.stopPropagation();
  					}

  	        if (X - x > 10) {
  						if (event.cancel == true) {
  							event.preventDefault();
  						}
  	            e.style.WebkitTransform = "translateX(" + 0 + "px)";
  	            e.style.transition = "-webkit-transform 300ms ease-in-out";
  	        }
  	        if (x - X > 10) {
  						if (event.cancel == true) {
  							event.preventDefault();
  						}

                var wrapperDiv = $api.dom('.wrapper');
                if (wrapperDiv) {
                  var containerDivs = $api.domAll('.container');
                  for (var i = 0; i < containerDivs.length; i++) {
                    if (containerDivs[i] != e) {
                      containerDivs[i].style.WebkitTransform = "translateX(" + 0 + "px)";
        	            containerDivs[i].style.transition = "-webkit-transform 300ms ease-in-out";
                    }
                  }
                }

                e.style.WebkitTransform = "translateX(" + left + "px)";
                e.style.transition = "-webkit-transform 300ms ease-in-out";

  	        }
  	        swipeY = false;
  	    }
  	    // 上下滑动
  	    if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
  	        swipeX = false;
  	    }
  	};

    u.touchmoveF = function(event,e) {
      u.touchmoveFWithLeft(event,e,-60);
    }

    u.toDelete = function(event,e) {

  	    var deleteL = document.querySelectorAll('.delete');
  	    var wrapper = document.querySelectorAll('.wrapper');
  	    for (var i = 0; i < wrapper.length; i++) {
  	        wrapper[i].style.transition = 'height 500ms';
  	        wrapper[i].style.webkitTransition = 'height 500ms';
  	        wrapper[i].style.overflow = 'hidden';
  	    }
  	    var deleteLB = e;

  	    var down = deleteLB.parentNode;
        down.remove();
  	}


/*end*/

    window.$slideDelete = u;

})(window);
