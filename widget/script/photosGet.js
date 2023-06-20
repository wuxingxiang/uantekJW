/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};

    var number =9;
    var photoBrowser;

    u.addPhotoHtml = function(body,imageNode) {
      var width = $api.offset(imageNode).w/4;

      var appType = api.getGlobalData({
          key: 'APPTYPE'
      });
      if (appType == 'UNPDA') {
        width = 100;
      }

      var html =
      '<script id="Template" type="text/x-dot-template">'+
        '{{~it:value:index}}'+
          '<div class="image_box_parent" tapmode onclick="previewImage({{=index}})" style="height:'+width+'px;width:'+width+'px;">'+
            '<div class="image_box">'+
              '<img src="{{=value.thumbPath}}" alt="">'+
            '</div>'+
            '<div tapmode class="imgae_delete" onclick="deleteImage({{=index}})"></div>'+
          '</div>'+
        '{{~}}'+
        '{{? it && it.length < 9}}'+
           '<div class="image_box_parent" id="addBtn" onclick="addPhoto()" style="height:'+width+'px;width:'+width+'px;">'+
               '<div class="image_box">'+
                 '<img src="../image/common/album_btn.png" alt="">'+
               '</div>'+
           '</div>'+
        '{{?}}'+
      '</script>';
      $api.append(body, html);
      var pictures = [];
      refreshImageView(pictures);
    }

    function refreshImageView(images) {
      var template = document.getElementById('Template');
      var Pagefn = doT.template(template.text);

      var imageNode = $api.byId('imagesView_take');
      imageNode.innerHTML = Pagefn(images);
      api.parseTapmode();
    }

    u.setImageNumber = function(setNumber) {
      number = setNumber;
    }

    u.addShowPhotoHtml = function(body,node) {
      if (!node) {
        return;
      }

      var width = $api.offset(node).w/4;

      var appType = api.getGlobalData({
          key: 'APPTYPE'
      });
      if (appType == 'UNPDA') {
        width = 100;
      }

      var html =
      '<script id="Template_show" type="text/x-dot-template">'+
          '{{~it:value:index}}'+
             '<div class="image_box_parent" tapmode onclick="previewImage_show({{=index}})" style="height:'+width+'px;width:'+width+'px;">'+
               '<div class="image_box">'+
                 '<img data-url="{{=value.FilePath}}"  src="../image/common/photo_default.png"  onload="fnLoadimage(this)">'+
                 '<div class="loadingGif">'+
                   '<img class="" src="../image/load_image.gif">'+
                 '</div>'+
               '</div>'+
             '</div>'+
          '{{~}}'+
      '</script>';
      $api.append(body, html);
    }
    u.refreshImageView_Show = function(images) {

      if (images && images.length > 0) {
        images.forEach(function (val ,index ,arr) {
          val.FilePath = $requst.getMainUrl()+ 'main/file/show/'+val.FileId;
          console.log(val.FilePath);
        });
      }

      var template = document.getElementById('Template_show');
      var Pagefn = doT.template(template.text);

      var imageNode = $api.byId('imagesView_show');
      imageNode.innerHTML = Pagefn(images);
      api.parseTapmode();
    }

    u.pickPhoto = function(pictures) {
      $util.confirmPer('photos',function(flag) {
        if (flag == true) {
          pickPhotoFc(pictures);
        }else {
          api.hideProgress();
          api.alert({
            msg:'请在权限管理处打开相册权限'
          });
        }
      });
    }

    function pickPhotoFc(pictures) {
      var systemType = api.systemType;
      if (systemType == 'ios') {
        var privacy = api.require('privacy');
        privacy.photos(function(ret, err) {
            if (ret.status) {

            } else {
              api.toast({
                  msg: '请打开app相册权限',
                  duration: 1000,
                  location: 'middle'
              });
              return;
            }
        });
      }
      if (pictures.length >= number) {
       api.toast({
           msg: '最多只能选择'+number+'张图片',
           duration: 1000,
           location: 'middle'
       });
        return;
      }

      var images = $api.domAll('#image_lists .image_box_parent');
      // var UIMediaScanner = api.require('UIMediaScanner');

      var selectCount = number - pictures.length;
      if (selectCount <= 0) {
        selectCount= 0;
      }

      // if (true) {
      //   var UIAlbumBrowser = api.require('UIAlbumBrowser');
      //   UIAlbumBrowser.open({
      //       max: selectCount,
      //       styles: {
      //           bg: '#fff',
      //           mark: {
      //               icon: '',
      //               position: 'bottom_left',
      //               size: 30
      //           },
      //           nav: {
      //               bg: 'rgba(0,0,0,0.6)',
      //               titleColor: '#fff',
      //               titleSize: 18,
      //               cancelColor: '#fff',
      //               cancelSize: 16,
      //               finishColor: '#fff',
      //               finishSize: 16
      //           }
      //       },
      //       rotation: true
      //   }, function(ret) {

      //       // if (ret) {
      //       //     alert(JSON.stringify(ret));
      //       // }
      //       if (ret.list) {
      //         for (var i = 0; i < ret.list.length; i++) {
      //           // 重新解析tapmode
      //           api.parseTapmode();
      //           var obj = {
      //             'FileId':'',
      //             'FileLink':ret.list[i].path,
      //             'FilePath':ret.list[i].path,
      //             'thumbPath':ret.list[i].thumbPath
      //           }
      //           pictures.push(obj);
      //         }

      //         refreshImageView(pictures);
      //       }
      //       console.log(JSON.stringify(ret));
      //   });
      // }else {

        var photoSelect = api.require('photoSelect');
        photoSelect.openAblum({
            permitnum: number-pictures.length,
        }, function(ret, err) {
            if (ret&& ret.selectpic && ret.selectpic.length > 0) {
              for (var i = 0; i < ret.selectpic.length; i++) {
                // 重新解析tapmode
                api.parseTapmode();
                var obj = {
                  'FileId':'',
                  'FileLink':ret.selectpic[i],
                  'FilePath':ret.selectpic[i],
                  'thumbPath':ret.selectpic[i],
                }
                pictures.push(obj);
              }

              refreshImageView(pictures);
            } else {
              api.toast({
                msg: '未选择图片',
                duration: 1000,
                location: 'middle'
              });
            }
        });
        return;
        UIMediaScanner.open({
            type: 'picture',
            column: 4,
            classify: true,
            showBrowser:true,
            showPreview:true,
            max: number-pictures.length,
            sort: {
                key: 'time',
                order: 'desc'
            },
            texts: {
                stateText: '已选择'+pictures.length +'项',
                cancelText: '取消',
                finishText: '完成'
            },
            styles: {
                bg: '#fff',
                mark: {
                    icon: '',
                    position: 'bottom_left',
                    size: 30
                },
                nav: {
                    bg: '#eee',
                    stateColor: '#000',
                    stateSize: 18,
                    cancelBg: 'rgba(0,0,0,0)',
                    cancelColor: '#000',
                    cancelSize: 18,
                    finishBg: 'rgba(0,0,0,0)',
                    finishColor: '#000',
                    finishSize: 18
                }
            },
            scrollToBottom: {
                intervalTime: -1,
                anim: true
            },
            exchange: true,
            rotation: true
        }, function(ret) {
          // alert(666);
          setTimeout(function () {
            if (ret.eventType == 'confirm') {

              if (ret.list.length > 0) {
                for (var i = 0; i < ret.list.length; i++) {
                  // 重新解析tapmode
                  api.parseTapmode();
                  var obj = {
                    'FileId':'',
                    'FileLink':ret.list[i].path,
                    'FilePath':ret.list[i].path,
                    'thumbPath':ret.list[i].thumbPath,
                    FilePath:''
                  }
                  pictures.push(obj);
                }

                refreshImageView(pictures);
              }
            }
          }, 200);
        });
      // }
    }

    function transImagePath(UIAlbumBrowser,pictures,images) {
      images.forEach(function (val, index ,arr) {
        UIAlbumBrowser.transPath({
            path: val.path
        }, function(ret, err) {
            if (ret) {
              // 重新解析tapmode
              api.parseTapmode();
              var obj = {
                'FileId':'',
                'FileLink':ret.path,
                'FilePath':ret.path,
                'thumbPath':val.thumbPath,
                FilePath:''
              }
              pictures.push(obj);
              refreshImageView(pictures);
            } else {
              api.toast({
                  msg: '选取失败',
                  duration: 1500,
                  location: 'middle'
              });
            }
        });
      });
    }


    u.fillImages = function(pictures) {
      var addBtnDiv = $api.byId('addBtn');
      var template = document.getElementById('Template');
      var pagefn = doT.template(template.text);

      var html = '';
      for (var i = 0; i < pictures.length; i++) {
        // 重新解析tapmode
        api.parseTapmode();
        html = html + pagefn(pictures[i]);
      }

      $api.before(addBtnDiv,html);
      if (pictures && pictures.length >= number) {
        $api.remove(addBtnDiv);
      }
    }


    u.takePhoto = function(pictures) {

      $util.confirmPer('camera',function(flag) {
        if (flag == true) {
          takePhotoFc(pictures);
        }else {
          api.hideProgress();
          api.alert({
            msg:'请在权限管理处打开相机权限'
          });
        }
      });
    }

    function takePhotoFc(pictures) {
      var systemType = api.systemType;
      if (systemType == 'ios') {
        var privacy = api.require('privacy');
        privacy.camera(function(ret, err) {
            if (ret.status) {
            } else {
              api.toast({
                  msg: '请打开app相机权限',
                  duration: 1000,
                  location: 'middle'
              });
              return;
            }
        });
      }
      if (pictures.length >= number) {
       api.toast({
           msg: '最多只能选择'+number+'张图片',
           duration: 1500,
           location: 'middle'
       });
        return;
      }

      api.getPicture({
        sourceType: 'camera',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 50,
        targetWidth: 1200,
        targetHeight: 1200,
        saveToPhotoAlbum: true
      }, function(ret, err) {
        setTimeout(function () {
          if (ret && ret.data) {
            var addBtnDiv = $api.byId('addBtn');
            var template = document.getElementById('Template');
            var pagefn = doT.template(template.text);
            // 重新解析tapmode
            api.parseTapmode();
            var obj = {
              'FileId':'',
              'FileLink':ret.data,
              'FilePath':ret.data,
              'thumbPath':ret.data,
            }

            pictures.push(obj);
            refreshImageView(pictures);
          } else {
            api.toast({
                msg: '拍摄失败',
                duration: 1500,
                location: 'middle'
            });
          }
        }, 200);

      });
    }

    u.deleteImage = function(pictures,index) {
      event.stopPropagation();
      if (pictures.length > index) {
        pictures.splice(index,1);
      }

      refreshImageView(pictures);
    }

    u.showPicture = function(pictures) {
      this.refreshImageView_Show(pictures);
    }

    u.previewImage = function(pictures,index) {
      var imagePaths = [];
      for (var i = 0; i < pictures.length; i++) {
        imagePaths.push(pictures[i].FilePath);
      }

      previewImageIndex(index,imagePaths);
    }

    function previewImageIndex(index,images) {
      if (api.systemType == 'ios') {
        if (!photoBrowser) {
          photoBrowser = api.require('photoBrowser');
        }
      console.log(JSON.stringify(images));
        photoBrowser.open({
            images: images,
            activeIndex:index,
            placeholderImg: '../image/common/photo_default.png',
            bgColor: '#fff'
        }, function(ret, err) {
            if (ret) {
              if (ret.eventType == 'click') {
                photoBrowser.close();
              }
            }
        });
      }else {
        var imageBrowser = api.require('imageBrowser');
        imageBrowser.openImages({
          imageUrls: images,
          showList:false,
          activeIndex:index
        });
      }
    }

    u.pickPhotoCallBack = function(choosedNum,maxNum,callBack) {

      $util.confirmPer('photos',function(flag) {
        if (flag == true) {
          pickPhotoCallBackFc(choosedNum,maxNum,callBack);
        }else {
          api.hideProgress();
          api.alert({
            msg:'请在权限管理处打开相册权限'
          });
        }
      });


    }

    function pickPhotoCallBackFc(choosedNum,maxNum,callBack) {
      var systemType = api.systemType;
      if (systemType == 'ios') {
        var privacy = api.require('privacy');
        privacy.photos(function(ret, err) {
            if (ret.status) {

            } else {
              api.toast({
                  msg: '请打开app相册权限',
                  duration: 1000,
                  location: 'middle'
              });
              return;
            }
        });
      }

      // var UIAlbumBrowser = api.require('UIAlbumBrowser');
      // UIAlbumBrowser.requestAlbumPermissions({
      // }, function(ret, err) {
      //     if (ret) {
      //         alert(JSON.stringify(ret));
      //     } else {
      //         alert(JSON.stringify(err));
      //     }
      // });

//       api.getPicture({
//     sourceType: 'library',
//     encodingType: 'jpg',
//     mediaValue: 'pic',
//     destinationType: 'url',
//     allowEdit: true,
//     quality: 50,
//     targetWidth: 100,
//     targetHeight: 100,
//     saveToPhotoAlbum: false
// }, function(ret, err) {
//     if (ret) {
//         alert(JSON.stringify(ret));
//     } else {
//         alert(JSON.stringify(err));
//     }
// });

// return;
      if (api.systemType == 'ios') {
        var UIAlbumBrowser = api.require('UIAlbumBrowser');
        UIAlbumBrowser.open({
            max: maxNum-choosedNum,
            classify:false,
            styles: {
                bg: '#fff',
                mark: {
                    icon: '',
                    position: 'bottom_left',
                    size: 20
                },
                nav: {
                    bg: 'rgba(0,0,0,0.6)',
                    titleColor: '#fff',
                    titleSize: 18,
                    cancelColor: '#fff',
                    cancelSize: 16,
                    finishColor: '#fff',
                    finishSize: 16
                }
            },
            rotation: true
        }, function(ret) {
            // if (ret) {
            //     alert(JSON.stringify(ret));
            // }
            console.log(JSON.stringify(ret));
            console.log(12222);

            if (ret.eventType == 'confirm') {
              if (ret.list && ret.list.length > 0) {
                callBack(ret.list,null);
              } else {
                callBack(null,err);
              }
            }
        });
      }else {
        var UIMediaScanner = api.require('UIMediaScanner');
        UIMediaScanner.open({
            type: 'picture',
            column: 3,
            classify: true,
            showBrowser:true,
            showPreview:true,
            max: maxNum-choosedNum,
            sort: {
                key: 'time',
                order: 'desc'
            },
            texts: {
                stateText: '已选择'+choosedNum +'项',
                cancelText: '取消',
                finishText: '完成'
            },
            styles: {
                bg: '#fff',
                mark: {
                    icon: '',
                    position: 'bottom_left',
                    size: 20
                },
                nav: {
                    bg: '#eee',
                    stateColor: '#000',
                    stateSize: 18,
                    cancelBg: 'rgba(0,0,0,0)',
                    cancelColor: '#000',
                    cancelSize: 18,
                    finishBg: 'rgba(0,0,0,0)',
                    finishColor: '#000',
                    finishSize: 18
                }
            },
            scrollToBottom: {
                intervalTime: -1,
                anim: true
            },
            exchange: true,
            rotation: true
        }, function(ret) {

            if (ret.eventType == 'confirm') {
              if (ret.list) {
                callBack(ret.list,null);
              } else {
                callBack(null,err);
              }
            }
        });
      }

    }

    u.takePhotoCallBack = function(callBack) {
      $util.confirmPer('camera',function(flag) {
        if (flag == true) {
          takeCallBack(callBack);
        }else {
          api.hideProgress();
          api.alert({
            msg:'请在权限管理处打开相机权限'
          });
        }
      });
    }

    function takeCallBack(callBack) {
      var systemType = api.systemType;
      if (systemType == 'ios') {
        var privacy = api.require('privacy');
        privacy.camera(function(ret, err) {
            if (ret.status) {
            } else {
              api.toast({
                  msg: '请打开app相机权限',
                  duration: 1000,
                  location: 'middle'
              });
              return;
            }
        });
      }

      api.getPicture({
        sourceType: 'camera',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 50,
        targetWidth: 1200,
        targetHeight: 1200,
        saveToPhotoAlbum: true
      }, function(ret, err) {
        console.log(JSON.stringify(ret));

        if (ret) {
          callBack(ret.data,null);
        } else {
          callBack(null,err);
        }
      });
    }


    u.openPhotoBrowser = function (name,frameName,imageList,index) {
      if (!photoBrowser) {
        photoBrowser = api.require('photoBrowser');
      }
      photoBrowser.open({
          images: imageList,
          activeIndex:index,
          mode: 2,
          placeholderImg: '../image/common/photo_default.png',
          bgColor: '#fff'
      }, function(ret, err) {
          if (ret) {
            if (ret.eventType == 'show') {
              api.openFrame({
                name: 'photoCtrol',
                url: 'photoCtrol_frame.html',
                pageParam: {
                    name: name,
                    frameName:frameName
                },
                rect: {
                  x: 0,
                  y:0,
                  w: 'auto',
                  h: 64
                }
              });
            }
            if (ret.eventType == 'longPress') {
              api.actionSheet({
                  cancelTitle: '取消',
                  buttons: ['保存图片']
              }, function(ret, err){
                  if( ret ){
                    // UserInfoSet
                    if (ret.buttonIndex == 1) {
                      u.saveImageToAlbum();
                    }
                  }
              });
            }
          }
      });
    }

    u.closePhotoBrowser = function () {
      photoBrowser.close();
    }

    u.saveImageToAlbum = function () {
      photoBrowser.getIndex(function(ret, err) {
        if (ret) {
          var index = ret.index;
          photoBrowser.getImage({
              index: index
          }, function(subRet, suberr) {
              if (subRet) {
                  var imagePath = subRet.path;
                  api.saveMediaToAlbum({
                      path: imagePath
                  }, function(saveret, saveerr) {
                      if (saveret && saveret.status) {
                        api.toast({
                            msg: '图片保存成功',
                            duration: 1500,
                            location: 'middle'
                        });
                      } else {
                        api.toast({
                            msg: '保存失败',
                            duration: 1500,
                            location: 'middle'
                        });
                      }
                  });
              } else {
                api.toast({
                    msg: '保存失败',
                    duration: 1500,
                    location: 'middle'
                });
              }
          });
        }else {
          api.toast({
              msg: '保存失败',
              duration: 1500,
              location: 'middle'
          });
        }
      });
    }

    u.updataPhotosCallBack = function(Module,pictures,callBack) {

      if (!pictures || pictures.length <= 0) {
        callBack(true);
        return;
      }
      api.showProgress({
        title: '图片上传中...',
        modal: true
      });

      var PromiseArr = new Array();
      var hasUploadAll = true;

      for (var i = 0; i < pictures.length; i++) {
        var imageModel = pictures[i];
        if (imageModel.FileId)
        {
          continue;
        }

        var PsFun = new Promise(function(resolve, reject) {
          uploadFile(Module,0,0,'.jpg',imageModel,
            function (ret,err) {
              if (!ret){
                hasUploadAll = false;
              }
              resolve(imageModel.FileId)
            }
          );
        });
        PromiseArr.push(PsFun);
      }

      if (PromiseArr.length > 0) {
        Promise.all(PromiseArr).then(function(results) {
          if (hasUploadAll == true) {
            callback(true);
          }else {
            callback(false);
          }
          api.hideProgress();
          console.log(results) // ["p1 data", ""p2 data""]
        });
      }else {
        api.hideProgress();
        callback(true);
      }
    }

/*end*/

    window.$photosGet = u;

})(window);
