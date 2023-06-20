/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};
    var noMoreData = false;
    var LoadingNode ;

    u.addHtml = function(body,text) {
      var html =
      '<section id="emptyDiv">'+
         '<div class="emptyContent">'+
           '<div class="emptyImage"></div>'+
           '<div class="hintText">'+text+'</div>'+
         '</div>'+
      '</section>'+
      '<div id="noMoreView">没有更多了....</div>'+
      '<div class="Loading" id="Loading">加载中...</div>';

      $api.append(body, html);

      LoadingNode = $api.byId('Loading');
    }
    u.addLoadingNode = function() {
      LoadingNode = $api.byId('Loading');
    }

    u.loadListHeader = function() {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display="none";
      var noMoreDiv = $api.byId('noMoreView');
      noMoreDiv.style.display="none";
      noMoreData = true;
      LoadingNode.style.display="none";
    }

    u.loadError= function(itemList) {
      if (itemList && itemList.length > 0) {
        var emptyDiv = $api.byId('emptyDiv');
        emptyDiv.style.display="none";
      }else {
        var emptyDiv = $api.byId('emptyDiv');
        emptyDiv.style.display="flex";
        var noMoreDiv = $api.byId('noMoreView');
        noMoreDiv.style.display="none";
      }
      noMoreData = true;
      LoadingNode.style.display="none";
    }

    u.loadMoreHeader = function() {
      var noMoreDiv = $api.byId('noMoreView');
      noMoreDiv.style.display="none";
      noMoreData = true;
      LoadingNode.style.display = 'block';
    }

    u.loadSucceed = function() {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display="none";
      var noMoreDiv = $api.byId('noMoreView');
      noMoreDiv.style.display="none";
    }

    u.analysisData = function (data,itemList) {
      if (!data || data.length < 20) {
        var noMoreDiv = $api.byId('noMoreView');
        noMoreDiv.style.display="block";
        noMoreData = true;

        api.removeEventListener({
          name: 'scrolltobottom'
        });
      }else {
        noMoreData = false;
        api.addEventListener({
          name: 'scrolltobottom',
          extra: {
              threshold: 200
          }
        }, function(ret, err) {
          if (noMoreData == false) {
            loadMoreItemList();
          }
            //打开加载状态
        });

      }
      LoadingNode.style.display = 'none';

      if (itemList.length <= 0) {
        var emptyDiv = $api.byId('emptyDiv');
        emptyDiv.style.display="flex";
        var noMoreDiv = $api.byId('noMoreView');
        noMoreDiv.style.display="none";
        noMoreData = true;
      }else {
        var emptyDiv = $api.byId('emptyDiv');
        emptyDiv.style.display="none";
      }

      // if (itemList.length > 0) {
        var template = document.getElementById('template');
        var itemListDiv = document.getElementById('item_list');
        var Pagefn = doT.template(template.text);
        itemListDiv.innerHTML = Pagefn(itemList);
        //重新解析tapmode
        api.parseTapmode();
      // }
    }

/*end*/

    window.$upRefresh = u;

})(window);
