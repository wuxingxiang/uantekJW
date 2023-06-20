/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};
    var noMoreData = false;
    var LoadingNode ;

    u.addErrorHtml = function(body) {
      // var html =
      // '<section id="errorDiv"><div class="emptyContent"><div class="emptyImage"></div><div class="hintText"></div>
      // </div></section>'
      var html = '<section id="errorDiv"><div class="errorContent"  onclick="loadError()"><div class="errorImage"></div><div class="hintText">加载失败</div></div></section>'
      $api.append(body, html);
    }

    u.addRefresh = function(callBack) {

      api.setRefreshHeaderInfo({
          visible: true,
          loadingImg: 'widget://image/refresh.png',
          bgColor: '#fff',
          textColor: '#8c9098',
          textDown: '下拉刷新...',
          textUp: '松开刷新...',
          showTime: true
      }, function(ret, err){
        callBack(ret, err);
      });
    }



    u.loadSucceed = function() {
      var emptyDiv = $api.byId('errorDiv');
      emptyDiv.style.display="none";
    }

    u.loadError= function() {

      var itemListView = $api.byId('item_list');
      if (itemListView) {
        itemListView.innerHTML = '';
      }
      var emptyDiv = $api.byId('errorDiv');
      emptyDiv.style.display="flex";
    }

    u.fnLoadimage= function(el) {
      u.fnLoadimageFit(el,false);
    }

    u.fnLoadimageFit= function(el,flag) {
      var imagePath = $api.attr(el,'data-url');
      if (imagePath == undefined || !imagePath || imagePath == null) {
        imagePath = '';

        var parentDiv = el.parentNode;
        if (parentDiv) {
          var loadingDiv = $api.dom(parentDiv, '.loadingGif');
          if (loadingDiv) {
            loadingDiv.style.display = 'none';
          }
        }
        return;
      }


      api.imageCache({
        url:imagePath
      }, function(ret, err) {
        var parentDiv = el.parentNode;
        var loadingDiv = $api.dom(parentDiv, '.loadingGif');

        if (ret) {
          var img = new Image();
          if (img.complete) {
            var height = img.height;
            var width = img.width;
            fillImage(width,height,parentDiv,flag);
            setTimeout(function () {
              $api.attr(el, 'src', ret.url);
            }, 200);

            if (loadingDiv) {
              if (loadingDiv) {
                $api.remove(loadingDiv);
              }
            }
          } else {
            img.onload = function () {
              var height = img.height;
              var width = img.width;
              fillImage(width,height,parentDiv,flag);
              setTimeout(function () {
                $api.attr(el, 'src', ret.url);
              }, 200);

              if (loadingDiv) {
                if (loadingDiv) {
                  $api.remove(loadingDiv);
                }
              }
              // var canvas = document.createElement('canvas')
              // canvas.width = width;
              // canvas.height = height;
              // var context = canvas.getContext('2d')
              // context.drawImage('image', 0, 0, img.width, img.height)
              // var url = canvas.toDataURL('image/png')  // 图片转为base64格式
              //
              // console.log(url);
              //
              // var a = document.createElement('a')
              // var e = new MouseEvent('click')
              // a.download = '下载图片'
              // a.href = url
              // a.dispatchEvent(e)

            };
          };

          img.src = imagePath;

        }else {
          if (loadingDiv) {
            if (loadingDiv) {
              $api.remove(loadingDiv);
            }
          }

          $api.attr(el, 'src', '../image/common/photo_default.png');
        }
        $api.removeAttr(el, 'data-url');
     });

     setTimeout(function () {
       var parentDiv = el.parentNode;
       if (parentDiv) {
         var loadingDiv = $api.dom(parentDiv, '.loadingGif');
         if (loadingDiv) {
           $api.remove(loadingDiv);
         }
       }
     }, 2500);
    }

    function fillImage(width,height,parentDiv,flag) {
      if ($api.hasCls(parentDiv,'image_box')) {
        $api.removeCls(parentDiv, 'image_box');
      }

      if (width > height == !flag) {
        if ($api.hasCls(parentDiv,'image_box_W')) {
          $api.removeCls(parentDiv, 'image_box_W');
        }
        if (!$api.hasCls(parentDiv,'image_box_H')) {
          $api.addCls(parentDiv, 'image_box_H');
        }
      }else {
        if ($api.hasCls(parentDiv,'image_box_H')) {
          $api.removeCls(parentDiv, 'image_box_H');
        }

        if (!$api.hasCls(parentDiv,'image_box_W')) {
          $api.addCls(parentDiv, 'image_box_W');
        }
      }

      // if ($api.hasCls(parentDiv,'image_box')) {
      //   $api.removeCls(parentDiv, 'image_box');
      // }
    }

/*end*/

    window.$showErrorDiv = u;

})(window);
