'use strict';


//正式环境
var appServer= "http://47.106.88.165:8201/";
// var appServer = "http://gsctest.ywapi.com:8001/gsc/";

var mainUrl = "http://47.106.88.165:8201/";


// 正式环境
var OSSPath= 'https://gscimihome.oss-cn-shenzhen.aliyuncs.com/'
// 测试环境
// var OSSPath= 'https://gscimihometest.oss-cn-shenzhen.aliyuncs.com/'

function addScript(){
  var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src','../script/requst.js');
	document.getElementsByTagName('head')[0].appendChild(script);
  // document.write("<script src='../script/requst.js'></script>");
}


var regionStr = 'oss-cn-shenzhen';

// var urllib = OSS.urllib;
// var Buffer = OSS.Buffer;
// var OSS = OSS.Wrapper;
// var STS = OSS.STS;

var loadTime = 0;
var hasAddRequst = false;

var progress = function (p) {
  console.log(p);
  return function (done) {
    var bar = document.getElementById('progress-bar');
    bar.style.width = Math.floor(p * 100) + '%';
    bar.innerHTML = Math.floor(p * 100) + '%';
    done();
  }
};

function uploadFile (callBack) {
  loadTime = 0;
  requstToken(callBack);
};

function requstToken(callBack) {
  var STSToken = $api.getStorage('STSToken');
  if (STSToken != undefined && STSToken && STSToken.AccessKeyId && STSToken.AccessKeyId.length > 0 && jugeTime(STSToken.Expiration)) {
    console.log('STSToken=='+JSON.stringify(STSToken));

    callBack(STSToken);
  }else {
    console.log('请求OSS密钥');
    var token = '';
    if ($api.getStorage('userInfoQMS')) {
      token = $api.getStorage('userInfoQMS').token;
    }
    var mark = api.getGlobalData({
      key: 'Mark'
    });
    if (!mark) {
      mark = 'android'
    }
    var tempDic = {
      loginMark:mark,
      token:token,
    }
    api.ajax({
        url: appServer+'STSToken',
        method: 'post',
        headers: {
            "Accept"      :"application/json",
            "Content-Type":"application/json",
            "AppKey"      :"HHWExchangeWeChat2017",
        },
        data: {
          body:tempDic
        }
    }, function(ret, err) {
      console.log(JSON.stringify(ret));
        if (ret.code == 200) {
          $api.setStorage('STSToken', ret.data);
          callBack(ret.data)
        } else {
          if (loadTime < 1) {
            loadTime++;
            requstToken(callBack);
          }else {
            callBack('');
          }
        }
    });
  }
}

  function creatOssClient(Module,width,height,suffix,fileModel,callBack) {
    var ossData = $api.getStorage('STSToken');

    var client = new OSS.Wrapper({
      region: regionStr,
      accessKeyId: ossData.AccessKeyId,
      accessKeySecret: ossData.AccessKeySecret,
      stsToken: ossData.SecurityToken,
      bucket: ossData.Bucket
    });

    getImgToBase64(fileModel.FileLink,function(data,imageW,imageH){
      var myFile = dataURLtoFile(data,'tempModule');
      var fileName = Module +'/'+ guid()+suffix;
      client.multipartUpload(fileName, myFile).then(function (result) {
        if (result.res.status == 200) {
          fileModel.FileId = guid();
          fileModel.FilePath = OSSPath+fileName;
          callBack(result, '');
        }else {
          console.log('codeErr=='+JSON.stringify(result));
          if (loadTime < 1) {
            loadTime++;
            $api.rmStorage('STSToken');
            requstToken(function(STSToken){
              if (STSToken) {
                creatOssClient(Module,width,height,suffix,fileModel,callBack);
              }else {
                callBack('', err);
              }
            });
          }else {
            callBack('', err);
          }
        }
      }).catch(function (err) {
          api.hideProgress();
          console.log('err=='+JSON.stringify(err));
          if (loadTime < 1) {
            loadTime++;
            $api.rmStorage('STSToken');
            requstToken(function(STSToken){
              if (STSToken) {
                creatOssClient(Module,width,height,suffix,fileModel,callBack);
              }else {
                callBack('', err);
              }
            });
          }else {
            callBack('', err);
          }
        });
    });
  }

  function OssClientUpLoad(client,file,Module,width,height,suffix,fileModel,ossData,callBack) {

    var guId = guid();
    var fileName = Module +'/'+ guId+suffix;
    client.multipartUpload(fileName, file).then(function (result) {
      console.log(JSON.stringify(result));
      if (result.res.status == 200) {
        fileModel.FileId = guId;
        fileModel.FilePath = OSSPath+fileName;

        callBack(result, '');
        // locality(fileName,imageW,imageH,Module,ossData.Bucket,fileModel,callBack);
      }else {
        if (loadTime < 1) {
          loadTime++;
          $api.rmStorage('STSToken');
          requstToken(callBack);
        }else {
          callBack('', err);
        }
      }
    });
  }

  function locality (fileName,height,width,tempModule,bucket,fileModel,callBack) {
    console.log(fileName);
    var companyId = '';
    if ($api.getStorage('userInfoQMS')) {
      companyId = $api.getStorage('userInfoQMS').CompanyId;
    }
    api.ajax({
        url: appServer+'CallbackFailRemedy',
        method: 'post',
        headers: {
            "Accept"      :"application/json",
            "Content-Type":"application/json",
            "AppKey"      :"HHWIOS2017"
        },
        data: {
          body:{
            FileId:fileName,
            Module:tempModule,
            FileExt:'jpg',
            FileType:'OriginalPicture',
            Width:width,
            Height:height,
            Bucket:bucket,
            CompanyId:companyId
          }
        }
    }, function(ret, err) {
        if (ret) {
          fileModel.FileId = ret.info;
          fileModel.imagePath = OSSPath+fileName;
          console.log(JSON.stringify(ret));
        }
        callBack(ret, err);
    });
  }

  function getImgToBase64(url,callback){//将图片转换为Base64

      var img = new Image();
      img.src = url;
      img.crossOrigin = 'Anonymous';
      var width = 800;

      img.onload = function(){
          var that = this;
          // 默认按比例压缩
          var w = that.width,
              h = that.height,
              scale = w / h;
          w = width;
          h = width / scale;
          var quality = 0.8;  // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);

          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64,h,w);
          canvas = null;
      }
  }

  function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }


  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
 }

 function jugeTime(Expiration) {
   var timestamp = Date.parse(new Date());

   console.log('Expiration=='+Expiration);
   console.log('timestamp=='+timestamp);

   if (Expiration > 0 && ((Expiration-timestamp) / 1000 > 10)) {
     return true;
   }

   return false;
 }
