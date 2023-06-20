/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function (window) {
  var u = {};
  var noMoreData = false;
  var LoadingNode;

  u.addHtml = function (body, text) {
    var html =
      '<section id="emptyDiv">' +
      '<div class="emptyContent">' +
      '<div class="emptyImage"></div>' +
      '<div class="hintText">' + text + '</div>' +
      '</div>' +
      '</section>'
    $api.append(body, html);
  }

  u.loadListHeader = function () {
    var emptyDiv = $api.byId('emptyDiv');
    emptyDiv.style.display = "none";
  }

  u.analysisData = function (data, itemList) {
    if (itemList.length <= 0) {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display = "flex";
    } else {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display = "none";
    }

    var template = document.getElementById('template');
    var itemListDiv = document.getElementById('item_list');
    var Pagefn = doT.template(template.text);
    itemListDiv.innerHTML = Pagefn(itemList);
    //重新解析tapmode
    api.parseTapmode();
  }

  u.analysisDataAndNode = function (templateNode, itemList) {
    if (itemList.length <= 0) {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display = "flex";
    } else {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display = "none";
    }

    var template = document.getElementById(templateNode);
    var itemListDiv = document.getElementById('item_list');
    var Pagefn = doT.template(template.text);
    itemListDiv.innerHTML = Pagefn(itemList);
    //重新解析tapmode
    api.parseTapmode();
  }

  u.loadError = function (itemList) {
    if (itemList && itemList.length > 0) {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display = "none";
    } else {
      var emptyDiv = $api.byId('emptyDiv');
      emptyDiv.style.display = "flex";
    }
  }

  /*end*/

  window.$upRefresh = u;

})(window);
