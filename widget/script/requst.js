
// // 测试环境
// var mainUrl = "http://47.106.88.165:18811/";
// var MQTTHost = "tcp://47.106.88.165:7102";

// // 正式环境
// var mainUrl = "http://frp.ywapi.com:18811/";
// var MQTTHost = "tcp://172.18.22.10:7102";

// //车间
var mainUrl  = "http://172.18.22.10:18811/";
var MQTTHost = "tcp://172.18.22.10:7102";

var new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "api.js");// 在这里引入了a.js
document.body.appendChild(new_element);

(function (window) {
  var u = {};
  u.mainUrl = mainUrl;
  u.MQTTHost = MQTTHost;
  window.$requst = u;
})(window);

function getMainUrl() {
  var mainUrlObj = $api.getStorage('mainUrlJW');
  if (mainUrlObj) {
    mainUrl = mainUrlObj.mainUrl;
  }

  return mainUrl;
}

function setMainUrl(Url) {
  mainUrl = Url;
}

function setMQTTUrl(Url) {
  MQTTHost = Url;
}

function getMQTTUrl() {
  var mainUrlObj = $api.getStorage('mainUrlJW');
  if (mainUrlObj) {
    MQTTHost = mainUrlObj.HostUrl;
  }

  return MQTTHost;
}



//各种请求
/**
 * 登录
 */
function UserLogin(parDic, successCallback, failCallback) {
  postRequst('main/user/login', parDic, true, false, successCallback, failCallback);
}

// --username	用户名
// --password	密码MD5(原始密码)
// token	token
// loginMark	登录设备标识
// 	{"data":"{'username':'system','password':'e10adc3949ba59abbe56e057f20f883e'}","loginMark":"android","token":""}

/**
 * 登录--手机验证码
 */
function Codelogin(parDic, successCallback, failCallback) {
  postRequst('codelogin', parDic, true, false, successCallback, failCallback);
}

// loginMark
// data
// -- mobilephone		手机号
// -- code		验证码

/**
 * 注册
 */
function Register(parDic, successCallback, failCallback) {
  postRequst('register', parDic, true, false, successCallback, failCallback);
}

// token
// loginMark
// data
// --mobilephone		手机号码
// --code		验证码
// --password		密码

/**
 * 个人资料设置
 */
function Userinfoget(parUrl, successCallback, failCallback) {
  baseRequst('main/user/UserInfoGet', parUrl, 'GET', true, true, successCallback, failCallback);
}


/**
 * 绑卡
 */
function BindICNo(parUrl, successCallback, failCallback) {
  baseRequst('main/user/BindICNo', parUrl, 'post', true, true, successCallback, failCallback);
}


/**
 * 绑卡
 */
function userListGet(parUrl, successCallback, failCallback) {
  baseRequst('main/user/userListGet', parUrl, 'GET', true, true, successCallback, failCallback);
}



//  data	字符串
// token	token
// loginMark	登录设备标识

/**
 * 获取头像
 */
function Avatar(parUrl, successCallback, failCallback) {
  getRequst('avatar', parUrl, true, successCallback, failCallback);
}

//  data	字符串
// token	token
// loginMark	登录设备标识

/**
 * 修改密码
 */
function Modifypw(parDic, successCallback, failCallback) {
  postRequst('main/user/modifypw', parDic, true, true, successCallback, failCallback);
}

// --newpassword	新密码MD5（密码）
// --oldpassword	原密码MD5（密码）
// token	token
// loginMark	设备信息标识

/**
 * 我的-绑定手机
 */
function bindPhone(parDic, successCallback, failCallback) {
  postRequst('user/bind', parDic, true, true, successCallback, failCallback);
}

// data
// --phoneNo	手机
// --pin	验证
// --type	类型 3 绑定手机
// token	token
// loginMark	设备信息标识

/**
 * 我的-获取验证码
 */
function Validcode(parDic, successCallback, failCallback) {
  postRequst('validcode', parDic, true, true, successCallback, failCallback);
}

// token	token
// loginMark	设备信息标识
// data
// --phoneNo	手机
// --type	类型 3 绑定手机
// token	token
// loginMark	设备信息标识

/**
 * 个人资料设置
 */
function UserInfoSet(parDic, successCallback, failCallback) {
  postRequst('userinfoset', parDic, false, true, successCallback, failCallback);
}

// --userId	用户ID
// --realName	真实姓名
// --nickName	呢称
// --headIcon	头像
// --gender	性别
// --idCard	身份证号
// --mobile	手机号
// --telephone	电话
// --email	电子邮箱
// --oICQ	QQ
// --weChat	微信
// token	token
// loginMark	登录设备标识

/**
 * 首页菜单
 */
function HomeMenuListGet(parDic, successCallback, failCallback) {
  baseRequst('QMSDesk/homeMenuListGet', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 首页菜单
 */
function Padlist(parDic, flag, successCallback, failCallback) {
  baseRequst('main/app/padlist', parDic, 'GET', flag, true, successCallback, failCallback);
}

/**
 * 首页菜单
 */
function Phonelist(parDic, flag, successCallback, failCallback) {
  baseRequst('main/app/phonelist', parDic, 'GET', flag, true, successCallback, failCallback);
}

/**
 * 获取不良Code
 */
function Getdefectcodelist(parUrl, successCallback, failCallback) {
  getRequstBase('QMS/getdefectcodelist', parUrl, true, true, successCallback, failCallback);
}

/**
 * 获取设备信息
 */
function GetEqpInfo(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetEqpInfo', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 获取设备信息
 */
function GetOrderInfo(parDic, successCallback, failCallback) {
  baseRequst('MES/GetOrderInfo', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
  * 获取当前产线的工单信息
*/
function GetFacilityOrder(parDic, successCallback, failCallback) {
  baseRequst('MES/GetFacilityOrder', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
  * 检查任务查看
*/
function GetCheckResultList(parDic, successCallback, failCallback) {
  baseRequst('MES/GetCheckResultList', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
  * 检查任务查看 -- 新增
*/
function GetCheckList(parDic, successCallback, failCallback) {
  baseRequst('MES/GetCheckList', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
  * 检查任务履历
*/
function GetCheckResultItemList(parDic, successCallback, failCallback) {
  baseRequst('MES/GetCheckResultItemList', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取工单录入历史记录
 */
function Postworkorderfinishhist(parDic, successCallback, failCallback) {
  baseRequst('MES/postworkorderfinishhist', parDic, 'post', true, true, successCallback, failCallback);
}

//  输入参数均为：{"EqpId":"009837ff-4c10-4d80-8a86-413e725c6f8e","PageNum":"1","PageSize":"10"}


/**
 * 检查任务执行
 */
function PostCheckResult(parDic, successCallback, failCallback) {
  baseRequst('MES/PostCheckResult', parDic, 'post', true, true, successCallback, failCallback);
}

// --WorkOrderNo	string	工单
// --TaskId	string	检查任务ID
// --CheckResult	string	检查结果（OK/NG）
// --CheckValue	int 	检查值
// --CheckUser	string	检查人
// --CheckTime	datetime	检查时间
// --Description	string	描述


/**
 * 工单换线/换型
 */
function PostOrderChangeFacility(parDic, successCallback, failCallback) {
  baseRequst('MES/PostOrderChangeFacility', parDic, 'post', true, true, successCallback, failCallback);
}

// --WorkOrderNo	string	工单
// --FacilityId	string	产线
// --Operator	string	操作者


/**
 * 工程工单切换任务完成
 */
function PostOrderProcessChange(parDic, successCallback, failCallback) {
  baseRequst('MES/PostOrderProcessChange', parDic, 'post', true, true, successCallback, failCallback);
}

// --FacilityId	string	产线
// --ProcessId	string	工程
// --Operator	string	操作者


/**
 * 工程工单切换任务取消
 */
function PostProcessCancle(parDic, successCallback, failCallback) {
  baseRequst('MES/PostProcessCancle', parDic, 'post', true, true, successCallback, failCallback);
}

// --FacilityId	string	产线
// --ProcessId	string	工程
// --Operator	string	操作者



/**
 * 产线/产线工程/工程设备 在工换型状态列表
 */
function GetFacilityProcessEquipment(parDic, successCallback, failCallback) {
  baseRequst('MES/GetFacilityProcessEquipment', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取设备已投入工单
 */
function Postworkorderbyeqpid(parDic, successCallback, failCallback) {
  baseRequst('MES/postworkorderbyeqpid', parDic, 'post', true, true, successCallback, failCallback);
}

//  输入参数均为：{"EqpId":"009837ff-4c10-4d80-8a86-413e725c6f8e","PageNum":"1","PageSize":"10"}

/**
 * 物流员权限确认
 */
function PostLogisticsAuthority(parDic, successCallback, failCallback) {
  baseRequst('MES/PostLogisticsAuthority', parDic, 'post', true, true, successCallback, failCallback);
}

// -- Account
// -- Password


/**
 * 每日数据
 */
function YieldStatement(parUrl, successCallback, failCallback) {
  getRequstBase('QMSDesk/yieldStatement', parUrl, true, false, successCallback, failCallback);
}

/**
 * WORST10
 */
function Worst10Get(parUrl, successCallback, failCallback) {
  getRequstBase('QMSDesk/Worst10Get', parUrl, true, true, successCallback, failCallback);
}

/**
 * 每周数据报表
 */
function RecentData(parUrl, successCallback, failCallback) {
  getRequstBase('QMSDesk/recentData', parUrl, true, false, successCallback, failCallback);
}

/**
 * 阅读消息
 */
function CommomOptionList(parDic, loadShow, successCallback, failCallback) {
  postRequst('QMSDesk/commomOptionList', parDic, loadShow, true, successCallback, failCallback);

}
// --Id		消息Id

/**
 * 客户列表
 */
function UserDetail(parUrl, successCallback, failCallback) {
  getRequstBase('main/user/userDetail', parUrl, true, true, successCallback, failCallback);
}

/**
  * 获取工单列表
  */
function orderListGet(parDic, successCallback, failCallback) {
  baseRequst('MES/Getorderslist', parDic, 'post', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);

}

// --OrderNo		工单No
// --StartTime		开始时间
// --EndTime		完成时间
// --ProcessId		工序
// --ProductId		产品
// --PageNum		
// --PageSize		


/**
  * 备件信息
  */
function SparePartInfo(parUrl, successCallback, failCallback) {
  baseRequst('Spare/SparePartInfo', parUrl, 'GET', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}

/**
  * 备件入库
  */
function SpareInStock(parDic, successCallback, failCallback) {
  baseRequst('Spare/SpareInStock', parDic, 'post', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}


/**
  * 备件操作
  */
function SpareOperation(parDic, successCallback, failCallback) {
  baseRequst('Spare/SpareOperation', parDic, 'post', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}


/**
  * 备件操作履历
  */
function SpareOperationHist(parDic, successCallback, failCallback) {
  baseRequst('Spare/SpareOperationHist', parDic, 'GET', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}


/**
  * 备件出库
  */
function SpareOutStock(parDic, successCallback, failCallback) {
  baseRequst('Spare/SpareOutStock', parDic, 'post', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}



/**
  * 设备获取备件信息
  */
function EquipmentSpareTypeList(parDic, successCallback, failCallback) {
  baseRequst('Spare/EquipmentSpareTypeList', parDic, 'GET', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}

/**
  * 备件库存
  */
function SpareStockListGet(parDic, successCallback, failCallback) {
  baseRequst('Spare/SpareStockList', parDic, 'GET', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}


/**
  * 备件入库履历
  */
function SpareStockInHist(parDic, successCallback, failCallback) {
  baseRequst('Spare/SpareStockInHist', parDic, 'GET', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}

/**
  * 备件出库履历
  */
function SpareStockOutHist(parDic, successCallback, failCallback) {
  baseRequst('Spare/SpareStockOutHist', parDic, 'GET', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}

/**
  * 获取工单列表
  */
function WorkorderListInfoGet(parDic, successCallback, failCallback) {
  baseRequst('MES/WorkorderListInfoGet', parDic, 'GET', true, true, successCallback, failCallback);
  // postRequst('MES/getorderslist',parDic,true,true,successCallback,failCallback);
}

/**
  * 获取工单列表--修理
  */
function Getorderslistrepair(parDic, successCallback, failCallback) {
  baseRequst('MES/Getorderslistrepair', parDic, 'post', true, true, successCallback, failCallback);

}

// --OrderNo		工单No
// --StartTime		开始时间
// --EndTime		完成时间
// --ProcessId		工序
// --ProductId		产品

/**
 * 工单投入
 */
function PostOrderInput(parDic, successCallback, failCallback) {
  baseRequst('MES/PostOrderInput', parDic, 'post', true, true, successCallback, failCallback);
}

// --EqpId		投入的设备Id
// --OperatorId		操作员
// --OrderNo		工单No
// --Desc		备注


/**
 * 工单完成
 */
function PostOrderFinish(parDic, successCallback, failCallback) {
  postRequst('MES/PostOrderFinish', parDic, true, true, successCallback, failCallback);
}

// --CompleteQry		完成数
// --OperatorId		操作员
// --OrderNo		工单
// --EqpId		设备

/**
 * 工单预报工列表
 */
function GetPostOrderPending(parDic, successCallback, failCallback) {
  baseRequst('MES/GetPostOrderPending', parDic, 'post', true, true, successCallback, failCallback);

}

// --CompleteQry		完成数
// --OperatorId		操作员
// --OrderNo		工单
// --EqpId		设备

/**
 * 工单确认报工
 */
function PostOrderComfirm(parDic, successCallback, failCallback) {
  baseRequst('MES/PostOrderComfirm', parDic, 'post', true, true, successCallback, failCallback);
}

// --CompleteQry		完成数
// --OperatorId		操作员
// --OrderNo		工单
// --EqpId		设备


/**
 * 根据班别获取设备产量
 */
function AutoProductionByShift(parDic, successCallback, failCallback) {
  baseRequst('MES/postEqpAutoProductionByShift', parDic, 'post', true, true, successCallback, failCallback);
}

// EqpId
// ShiftId

/**
 * 获取设备列表
 */
function GetEqplist(parDic, successCallback, failCallback) {
  //  baseRequst('Eqp/GetEqplist',parDic,'post',true,true,successCallback,failCallback);

  postRequst('Eqp/GetEqplist', parDic, true, true, successCallback, failCallback);
}

// --EqpType		设备类型
// --LineId		线别
// --ProcessId		工序


/**
 * 推送
 */
function PostEqpControlNotice(parDic, successCallback, failCallback) {
   baseRequst('Eqp/PostEqpControlNotice',parDic,'post',true,true,successCallback,failCallback);
}


/**
 * 获取选择列表列表
 */
function GetSeletItemList(parUrl, successCallback, failCallback) {
  //  getRequstBase('main/getselectitemlist',parUrl,true,true,successCallback,failCallback);

  baseRequst('/main/GetSelectItemList', parUrl, 'GET', true, true, successCallback, failCallback);

}

/**
* 获取班别信息
*/
function GetMap(parUrl, successCallback, failCallback) {
  baseRequst('main/datasource/map', parUrl, 'GET', true, true, successCallback, failCallback);
}

// --itemType		Operator操作员/Default故障类型/Product机型/Process工序

/**
 * 获取设备点检信息
 */
function GetEqpPMTaskInfo(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetEqpPMTaskInfo', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取设备点检列表
 */
function GetEqpCheckList(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetEqpCheckList', parDic, 'post', true, true, successCallback, failCallback);

}

// --EqpType
// --LineId
// --ProcessId


/**
 * 设备报修
 */
function PostEqpRepairsSubmit(parDic, successCallback, failCallback) {
  postRequst('Eqp/PostEqpRepairsSubmit', parDic, true, true, successCallback, failCallback);
}


// --eqpId		设备ID
// --faultId		故障类型
// --faultContent		故障说明
// --urgentLevel		紧急程度
// --imageList	list
// ----FilePath
// ----FileId


/**
 * 点检项目列表
 */
function GetEqpCheckItemList(parUrl, successCallback, failCallback) {

  baseRequst('/Eqp/GetEqpCheckItemList', parUrl, 'GET', true, true, successCallback, failCallback);

}

// --EqpId

/**
 * 提交点检结果
 */
function PostSpotCheckResult(parDic, successCallback, failCallback) {
  baseRequst('Eqp/PostSpotCheckResult', parDic, 'post', true, true, successCallback, failCallback);
}
// --EqpId		设备ID
// --Result		点检结果
// --CheckItems	List	点检项目列表
// ----checkItemId
// ----checkItemName
// ----checkResualt
// ----checkDesc

/**
 * 获取工单内全部箱号数据
 */
function PackingLabelGet(parDic, successCallback, failCallback) {
  baseRequst('PK/PackingLabelGet', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 获取当班完成数
 */
function ShiftFinishGet(parUrl, successCallback, failCallback) {
  baseRequst('PK/ShiftFinishGet', parUrl, 'GET', false, true, successCallback, failCallback);
}

/**
 * 装配完成 - 内箱
 */
function InnerboxPacking(parDic, successCallback, failCallback) {
  baseRequst('PK/InnerboxPacking', parDic, 'post', true, true, successCallback, failCallback);
}

// --WorkorderNo	string	工单号码
// --FacilityId	string	产线Id
// --InnerboxBarcode	string	内箱条码
// --BaseQty	int	满箱数量
// --CurrentQty	int	当前箱数量

/**
 * 装配完成 - 卡板
 */
function PalletPacking(parDic, successCallback, failCallback) {
  baseRequst('PK/PalletPacking', parDic, 'post', true, true, successCallback, failCallback);
}

// --WorkorderNo	string	工单号码
// --FacilityId	string	产线Id
// --PalletBarcode	string	卡板条码
// --InnerboxBarcodes	string[]	外箱条码数组
// --PalletBaseQty	int	满卡板标准数量
// --CurrentQty	int	当前卡板数量


/**
 * 生成包装标签
 */
function GeneratePackingBarcode(parDic, successCallback, failCallback) {
  baseRequst('PK/GeneratePackingBarcode', parDic, 'post', true, true, successCallback, failCallback);
}
// --WorkorderNo
// --FacilityId
// --ShiftTimeId

/**
 * 获取未完成的卡板列表
 */
function GetPalletList(parDic, loadShow, successCallback, failCallback) {
  baseRequst('PK/GetPalletList', parDic, 'post', loadShow, true, successCallback, failCallback);
}
// --WorkorderNo


/**
 * 获取完成的卡板列表
 */
function GetFinishPalletList(parDic, loadShow, successCallback, failCallback) {
  baseRequst('PK/GetFinishPalletList', parDic, 'post', loadShow, true, successCallback, failCallback);
}
// --WorkorderNo


/**
 * 卡板包装箱删除
 */
function InnerboxPackingDelete(parDic, successCallback, failCallback) {
  baseRequst('PK/InnerboxPackingDelete', parDic, 'post', true, true, successCallback, failCallback);
}
// --PalletBarcode
// --BoxBarcode


/**
 * 获取并生成卡板标签(卡板）
 */
function PalletLabelGet(parDic, successCallback, failCallback) {
  baseRequst('PK/PalletLabelGet', parDic, 'post', true, true, successCallback, failCallback);
}
// --Barcode

/**
 * 获取未完成卡板内箱列表
 */
function PalletPackingGet(parDic, loadShow, successCallback, failCallback) {
  baseRequst('PK/PalletPackingGet', parDic, 'post', loadShow, true, successCallback, failCallback);
}
// --Barcode



/**
 * 设备维修列表
 */
function GetEqpRepairList(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetEqpRepairList', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 设备维修
 */
function PostEqpRepairs(parDic, successCallback, failCallback) {
  postRequst('Eqp/PostEqpRepairs', parDic, true, true, successCallback, failCallback);
}


/**
 * 报修确认
 */
function ConfirmEqpRepair(parDic, successCallback, failCallback) {
  baseRequst('Eqp/ConfirmEqpRepair', parDic, 'post', true, true, successCallback, failCallback);
}

// State 、------ Reject / Agree
// Content
// RepairId

/**
 * 报修详情
 */
function GetEqpRepairInfo(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetEqpRepairInfo', parDic, 'GET', true, true, successCallback, failCallback);
}

// RepairId


/**
 * 设备保养列表
 */
function GetMaintainList(parDic, successCallback, failCallback) {
  baseRequst('Eqp/getMaintainList', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 设备保养详情
 */
function GetMaintainInfo(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetMaintainInfo', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 保养设备
 */
function PostMaintainEqpSubmit(parDic, successCallback, failCallback) {
  postRequst('Eqp/PostMaintainEqpSubmit', parDic, true, true, successCallback, failCallback);
}

// --eqpId
// --MaintainList	List
// ----MaintainItemName
// ----MaintainItemId
// ----MaintainItemContent
// --imageList	list
// ----FilePath
// ----FileId

/**
 * 获取巡检列表
 */
function PostInspectionList(parDic, successCallback, failCallback) {
  baseRequst('QMS/PostInspectionList', parDic, 'Post', true, true, successCallback, failCallback);
}


/**
 * 备件类型
 */
function GetSpareTypeList(parDic, successCallback, failCallback) {
  baseRequst('ERP/SpareType/GetSpareTypeList', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 不良完成
 */
function postDefectComplete(parDic, successCallback, failCallback) {
  baseRequst('QMS/postDefectComplete', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 不良录入提交
 */
function postDefectReceive(parDic, successCallback, failCallback) {
  baseRequst('QMS/postDefectReceive', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 设备上锁
 */
function PostEqpControlUnLock(parDic, successCallback, failCallback) {
  baseRequst('Eqp/PostEqpControlUnLock', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 设备解锁
 */
function PostEqpControlLock(parDic, successCallback, failCallback) {
  baseRequst('Eqp/PostEqpControlLock', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 设备解锁
 */
function PostEqpControlMode(parDic, successCallback, failCallback) {
  baseRequst('Eqp/PostEqpControlMode', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 设备状态获取
 */
function GetEqpStateList(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetEqpStateList', parDic, 'GET', true, true, successCallback, failCallback);
}




// --eqpId

/**
 * 设备刀具模具更换
 */
function PostToolChange(parDic, successCallback, failCallback) {
  baseRequst('Eqp/PostToolChange', parDic, 'post', true, true, successCallback, failCallback);

}

// --OperationTypeChange更换/Uninstall卸载/Install安装
// --ToolList    // "	List
// ----ToolId


/**
 * 获取所有刀具/模具
 */
function GetToolList(parDic, successCallback, failCallback) {
  baseRequst('Eqp/GetToolList', parDic, 'post', true, true, successCallback, failCallback);

}

// --ToolType

/**
 * 获取所有刀具/模具
 */
function GetMessagelist(parDic, successCallback, failCallback) {
  baseRequst('main/user/postmessagelist', parDic, 'post', true, true, successCallback, failCallback);

}

/**
* 刀具申请
*/
function ForKnifeApply(parDic, successCallback, failCallback) {
  baseRequst('eqp/ForKnifeApply', parDic, 'post', true, true, successCallback, failCallback);
}

/**
* 申请列表
*/
function GetKnifeApplyList(parDic, successCallback, failCallback) {
  baseRequst('eqp/GetKnifeApplyList', parDic, 'post', true, true, successCallback, failCallback);
}

/**
* 领取列表
*/
function GetDeliveryList(parDic, successCallback, failCallback) {
  baseRequst('eqp/GetDeliveryList', parDic, 'post', true, true, successCallback, failCallback);
}

/**
* 刀具列表
*/
function GetKnifeList(parDic, successCallback, failCallback) {
  baseRequst('eqp/GetKnifeList', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 消息已读取
 */
function PostMessageRead(parDic, successCallback, failCallback) {
  baseRequst('main/user/postreadmessage', parDic, 'post', false, true, successCallback, failCallback);

}
//  --MessageID
//  --Flag



/**
 * 修理-不良信息
 */
function Postdefectbyorderno(parDic, successCallback, failCallback) {
  baseRequst('QMS/postdefectbyorderno', parDic, 'post', true, true, successCallback, failCallback);
}
// --OrderNo
// --EqpId


/**
 * 修理提交
 */
function Postrepairsubmit(parDic, successCallback, failCallback) {
  baseRequst('QMS/postrepairsubmit', parDic, 'post', true, true, successCallback, failCallback);

}
//  --MessageID
//  --Flag

/**
 * 修理履历
 */
function Getrepairedlistbyorderno(parDic, successCallback, failCallback) {
  baseRequst('QMS/getrepairedlistbyorderno', parDic, 'GET', true, true, successCallback, failCallback);
}
//  --MessageID
//  --Flag


/**
 * 巡检/首检履历
 */
function Postinsphistlist(parDic, successCallback, failCallback) {
  baseRequst('QMS/postinsphistlist', parDic, 'post', true, true, successCallback, failCallback);

}
//  --MessageID
//  --Flag

/**
 * 巡检/首检履历详情
 */
function Getinsphistitemlist(parDic, successCallback, failCallback) {
  baseRequst('QMS/getinsphistitemlist', parDic, 'GET', true, true, successCallback, failCallback);

}
//  --MessageID
//  --Flag


/**
 * 物料待检
 */
function GetPreinspectionList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetPreinspectionList', parDic, 'post', true, true, successCallback, failCallback);

}
//  --MessageID
//  --Flag

/**
 * 物料待接收列表
 */
function GetPurOutOrderList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetPurOutOrderList', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize
// --PageNum
// --Type
// --PoNum


/**
 * 获取SN列表
 */
function GetBatchSNList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetBatchSNList', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 物料待接收
 */
function PreinspectionSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/PreinspectionSubmit', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 物料履历
 */
function ConsumableProductLog(parDic, successCallback, failCallback) {
  baseRequst('main/wms/ConsumableProductLog', parDic, 'GET', true, true, successCallback, failCallback);
}

// BarCode 物料SN

/**
 * 库存
 */
function GetInStock(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetInStock', parDic, 'post', true, true, successCallback, failCallback);
}

// WarehouseId		仓库
// BinCode		储位
// ConsumableProduct		物料
// SN		SN

/**
 * 库存
 */
function PostInStockList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/PostInStockList', parDic, 'post', true, true, successCallback, failCallback);
}

// WarehouseId		仓库
// BinCode		储位
// ConsumableProduct		物料
// SN		SN


/**
 * LOT投入之镭射修阻
 */
function LotInputLRM(parDic, successCallback, failCallback) {
  baseRequst('MES/LotInputLRM', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * LOT投入之其他
 */
function LotInput(parDic, successCallback, failCallback) {
  baseRequst('MES/LotInput', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * LOT投入完成
 */
function LotFinish(parDic, successCallback, failCallback) {
  baseRequst('MES/LotFinish', parDic, 'post', true, true, successCallback, failCallback);
}



/**
 * 首件任务查询
 */
function GetFirstInspTaskList(parDic, successCallback, failCallback) {
  baseRequst('MES/GetFirstInspTaskList', parDic, 'GET', true, true, successCallback, failCallback);
}

// --WorkOrder
// --EquipmentId

/**
 * 首件投入
 */
function PostFirstInspInput(parDic, successCallback, failCallback) {
  baseRequst('MES/PostFirstInspInput', parDic, 'post', true, true, successCallback, failCallback);
}
// --WorkOrder
// --EquipmentId
// --LotName
// --FirstInspTaskId


/**
 * 通过SN或接收单号获取接收信息
 */
function GetPreGodownEntryByNo(parUrl, successCallback, failCallback) {
  baseRequst('main/wms/GetPreGodownEntryByNo', parUrl, 'GET', true, true, successCallback, failCallback);
}

/**
 *  产品列表
 */
function getProductList(parUrl, successCallback, failCallback) {
  baseRequst('MasterData/getProductList', parUrl, 'post', true, true, successCallback, failCallback);
}


/**
 * 调拨明细
 */
function GetWarehouseAllocateSNList(parUrl, successCallback, failCallback) {
  baseRequst('main/wms/GetWarehouseAllocateSNList', parUrl, 'GET', true, true, successCallback, failCallback);
}


/**
 * 调拨列表
 */
function GetWarehouseAllocateList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetWarehouseAllocateList', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize	int	
// --PageNum	int	
// --StartTime		入库时间
// --EndTime		入库时间
// --AllocateNo		调拨编码
// --Status		调拨状态Code（selectlistCode = AllocateStatus）

/**
 * 调拨提交
 */
function WarehouseAllocateSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/WarehouseAllocateSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --AllocateId		调拨请求Id
// --BinCode		目标库位编码
// --LabelList		批号列表
// ----LabelNo		批号
// ----Qty		数量


/**
 * 调拨详情
 */
function GetWarehouseAllocateInfo(parUrl, successCallback, failCallback) {
  baseRequst('main/wms/GetWarehouseAllocateInfo', parUrl, 'GET', true, true, successCallback, failCallback);
}

/**
 * 调拨SN检查
 */
function CheckWarehouseAllocateSN(parDic, successCallback, failCallback) {
  baseRequst('main/wms/CheckWarehouseAllocateSN', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 拆分/分包SN提交
 */
function SplitSNSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SplitSNSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --ParentSN		父SN
// --SubSNList		拆分SN列表
// ----LabelNo		SN
// ----Qty		数量
// ----SortNo		序号


/**
 * 拆分/分包SN获取
 */
function SplitSNCreateList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SplitSNCreateList', parDic, 'post', true, true, successCallback, failCallback);
}

// --ParentSN		父SN
// --SubSNList		拆分SN列表
// ----LabelNo		SN
// ----Qty		数量
// ----SortNo		序号


/**
 * 待入库列表
 */
function GetPreGodownEntryList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetPreGodownEntryList', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 待入库列表
 */
function GetPreGodownEntrySNList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetPreGodownEntrySNList', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 已入库列表
 */
function GetGodownEntryList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetGodownEntryList', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize	int	
// --PageNum	int	
// --StartTime		入库时间
// --EndTime		入库时间
// --PoNum		订单号
// --WarehouseId		仓库Id
// --MtrlCodeName		物料名称
// --VendorCode		供应商编码

/**
 * 物料入库
 */
function GodownEntrySubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GodownEntrySubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --PreinspectionId		接收Id
// --WarehouseId		仓库Id
// --BinCode		库位编码
// --LabelList		批号列表
// ----LabelNo		批号
// ----Qty		数量

/**
 * 上架提交
 */
function ShelvesSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/ShelvesSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --WarehouseId		仓库Id
// --BinCode		库位编码
// --LabelList		批号列表
// ----LabelNo		批号
// ----Qty		数量

/**
 * 移库提交
 */
function WarehouseMoveSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/WarehouseMoveSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --WarehouseId		目标仓库Id
// --BinCode		目标库位编码
// --LabelList		批号列表
// ----LabelNo		批号
// ----Qty		数量

/**
 * 物料超期
 */
function GetOverdue(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetOverdue', parDic, 'post', true, true, successCallback, failCallback);
}
// OverStatus	string	状态,overdue为过期，否则是将过期
// --PageSize	int	
// '--PageNum	int	

/**
 * 仓库储位
 */
function GetWarehouseBin(parUrl, successCallback, failCallback) {
  baseRequst('main/wms/GetWarehouseBin', parUrl, 'GET', true, true, successCallback, failCallback);
}


/**
 * 备料列表
 */
function GetWorkOrderListK(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/GetWorkOrderList', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize	int	
// --PageNum	int	
// --StartTime		工单创建时间
// --EndTime		  工单创建时间
// --WorkOrderNo  工单编码

/**
 * 获取工单物料列表
 */
function GetMtrlListForWorkOrder(parUrl, successCallback, failCallback) {
  baseRequst('main/kitting/GetMtrlListForWorkOrder', parUrl, 'GET', true, true, successCallback, failCallback);
}
// data		工单/制令单


/**
 * 获取工单,可能多个工单
 */
function GetMtrlListForWorkOrderMultiple(parUrl, successCallback, failCallback) {
  baseRequst('main/kitting/GetMtrlListForWorkOrderMultiple', parUrl, 'GET', true, true, successCallback, failCallback);
}
// data		工单/制令单

/**
 * 获取工单物料列表
 */
function GetMtrlListForKitting(parUrl, successCallback, failCallback) {
  baseRequst('main/kitting/GetMtrlListForKitting', parUrl, 'GET', true, true, successCallback, failCallback);
}
// data		工单/制令单




/**
 * 获取工单已备料列表
 */
function GetKittingListForWorkOrder(parUrl, successCallback, failCallback) {
  baseRequst('main/kitting/GetKittingListForWorkOrder', parUrl, 'GET', true, true, successCallback, failCallback);
}
// data		工单/制令单

/**
 * 备料提交
 */
function KittingSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/KittingSubmit', parDic, 'post', true, true, successCallback, failCallback);
}
// --WorkOrderNo		工单
// --LabelNo		SN

/**
 * 备料删除SN
 */
function DeleteSN(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/DeleteSN', parDic, 'post', true, true, successCallback, failCallback);
}
// --WorkOrderNo		工单
// --LabelNo		SN

/**
 * 手动完成备料
 */
function FinishKitting(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/FinishKitting', parDic, 'post', true, true, successCallback, failCallback);
}

// --WorkOrderNo


/**
 * 领料出库，列表查询
 */
function GetKittingFinishList(parUrl, successCallback, failCallback) {
  baseRequst('main/kitting/GetKittingFinishList', parUrl, 'GET', true, true, successCallback, failCallback);
}
// --StartTime
// --EndTime
// --PageSize
// --PageNum
// --WorkOrderNo
// --WarehouseId

/**
 * 领料出库提交
 */
function PostPickingSave(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/PostPickingSave', parDic, 'post', true, true, successCallback, failCallback);
}

// data
// --Id

/**
 * 获取QMS 基础信息
 */
function Details(parUrl, successCallback, failCallback) {
  baseRequst('main/dataitem/details', parUrl, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取AQL 的抽样数/允收/拒收值
 */
function Getaqlinfo(parUrl, successCallback, failCallback) {
  baseRequst('QMS/getaqlinfo', parUrl, 'GET', true, true, successCallback, failCallback);
}
// --AQLStandard		AQL 水准 L1，L2，L3，LS1，LS2，LS3，LS4
// --Sampling		抽样水准，0.65，1.0
// --Qty		入库数

/**
 * 获取IQC等待列表
 */
function GetIQCWaitList(parDic, successCallback, failCallback) {
  baseRequst('QMS/GetIQCWaitList', parDic, 'GET', true, true, successCallback, failCallback);
}
// --StartTime		开始时间
// --EndTime		结束时间
// --VendorName		供应商名
// --Pono		订单号
// --PageSize		每页大小
// --PageNo		页码


/**
 * 获取IQC 检查规格
 */
function Getiqcinspstandard(parDic, successCallback, failCallback) {
  baseRequst('QMS/getiqcinspstandard', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * QMS IQC 开始
 */
function PostIQCStart(parDic, successCallback, failCallback) {
  baseRequst('QMS/PostIQCStart', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 获取IQC 报告履历
 */
function GetIQCReportHist(parDic, successCallback, failCallback) {
  baseRequst('QMS/GetIQCReportHist', parDic, 'GET', true, true, successCallback, failCallback);
}

// --StartDate		开始时间
// --EndDate		结束时间
// --ConsumableOrderNo		订单号
// --CheckResult		IQC 检查结果： OK：1 NG：0  
// --PageSize		每页大小
// --PageNo		页码

/**
 * 获取IQC 报告详情
 */
function Getiqcreportdetail(parDic, successCallback, failCallback) {
  baseRequst('QMS/getiqcreportdetail', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 提交IQC 检查结果
 */
function Postiqcinspsubmit(parDic, successCallback, failCallback) {
  baseRequst('QMS/postiqcinspsubmit', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 获取IQC规格书图片
 */
function PreviewFile(parUrl, successCallback, failCallback) {
  baseRequst('main/file/PreviewFile', parUrl, 'GET', true, true, successCallback, failCallback);
}


/**
 * 盘点任务列表
 */
function GetTaskList(parDic, successCallback, failCallback) {
  baseRequst('main/inventory/GetTaskList', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize		
// --PageNum		
// --StartTime		
// --EndTime		
// --WarehouseId		仓库
// --TaskStatus		状态 （InvStatus）

/**
 * 未盘点明细列表
 */
function GetNoInvItemList(parDic, successCallback, failCallback) {
  baseRequst('main/inventory/GetNoInvItemList', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize
// --PageNum
// --InvTaskId


/**
 * 初次盘点明细列表
 */
function GetFirstInvItemList(parDic, successCallback, failCallback) {
  baseRequst('main/inventory/GetFirstInvItemList', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize
// --PageNum
// --InvTaskId

/**
 * 初次盘点任务详情
 */
function GetTaskInfo(parUrl, successCallback, failCallback) {
  baseRequst('main/inventory/GetTaskInfo', parUrl, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取储位 信息
 */
function GetBinInfo(parUrl, successCallback, failCallback) {
  baseRequst('main/wms/GetBinInfo', parUrl, 'GET', true, true, successCallback, failCallback);
}


/**
 * 初次盘点提交
 */
function InventoryFirstSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/inventory/InventoryFirstSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --PageSize
// --PageNum
// --InvTaskId


/**
 * 成品/半成品入库列表
 */
function ProductEntryList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/ProductEntryList', parDic, 'post', true, true, successCallback, failCallback);
}
// --PageSize
// --PageNum
// --StartTime
// --EndTime
// --BinId
// --WarehouseId

/**
 * 成品入库提交
 */
function ProductEntrySubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/ProductEntrySubmit', parDic, 'post', true, true, successCallback, failCallback);
}
// --PalletBoxNo
// --WarehouseId
// --BinCode

/**
 * 获取工单列表
 */
function GetWorkOrderList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetWorkOrderList', parDic, 'post', true, true, successCallback, failCallback);
}
// --WorkOrderNo

/**
 * 获取半成品SN列表
 */
function CreateHalfProductSNList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/CreateHalfProductSNList', parDic, 'post', true, true, successCallback, failCallback);
}

// --WorkOrderNo
// --EntryQty
// --BoxQty

/**
 * 半成品入库提交
 */
function HalfProductEntrySubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/HalfProductEntrySubmit', parDic, 'post', true, true, successCallback, failCallback);
}
// --WorkOrderNo
// --WarehouseId
// --BinCode
// --LabelList
// ----LabelNo
// ----Qty

/**
 * 获取卡板箱信息
 */
function GetLotMasterInfo(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetLotMasterInfo', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * LOTCARD查询
 */
function GetLotData(parUrl, successCallback, failCallback) {
  baseRequst('MES/GetLotData', parUrl, 'GET', true, true, successCallback, failCallback);
}

/**
 * LOT信息
 */
function GetLotInfo(parUrl, successCallback, failCallback) {
  baseRequst('MES/GetLotInfo', parUrl, 'GET', true, true, successCallback, failCallback);
}

/**
 * 成品出库列表(购销单列表)
 */
function SalesOrderList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SalesOrderList', parDic, 'post', true, true, successCallback, failCallback);
}
// --PageNum
// --PageSize
// --StartTime
// --EndTime
// --SONo

/**
 * 成品出库履历(购销单出库列表)
 */
function SalesOrderOutgoingList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SalesOrderOutgoingList', parDic, 'post', true, true, successCallback, failCallback);
}
// --PageNum
// --PageSize
// --StartTime
// --EndTime
// --SONo


/**
 * 成品出库提交(购销单出库提交)---暂时废弃
 */
function SalesOrderOutgoingSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SalesOrderOutgoingSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --SONo
// --ItemNo
// --PalletBoxNo
// --LabelList
// ----LabelNo
// ----Qty


/**
 * 成品出库提交(购销单出库提交)
 */
function SalesOrderOutgoingSave(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SalesOrderOutgoingSave', parDic, 'post', true, true, successCallback, failCallback);
}

// "SONo": "230-20220310011", 
// "ItemNo": "0016"


/**
 * 成品出库删除
 */
function SalesOrderOutgoingDeleteSN(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SalesOrderOutgoingDeleteSN', parDic, 'post', true, true, successCallback, failCallback);
}
// "SONo": "230-20220310011",  
// "ItemNo": "0016", 
// "PalletBoxNo": "SZ220607KA0012" 

/**
 * 成品出库扫描
 */
function SalesOrderOutgoingScanSN(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SalesOrderOutgoingScanSN', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 成品出库已扫描列表获取
 */
function GetSalesOrderOutgoingKittingList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetSalesOrderOutgoingKittingList', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 获取销货单的备料列表
 */
function SalesOrderDetailList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/SalesOrderDetailList', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * 其他入库Code 获取
 */
function GetOtherStorageCode(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetOtherStorageCode', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取其他入库的入库履历
 */
function GetOtherStorageList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetOtherStorageList', parDic, 'GET', true, true, successCallback, failCallback);
}
// --StartDate		开始时间
// --EndDate		结束时间
// --PageSize		每页数据量
// --PageNum		页码
// --WarehouseId		仓库
// --ConsumableCode		物料代码
// --PoNo		单号
// --InputType		入库类型

/**
 * 其他入库获取物料的信息
 */
function GetOtherStorageConsumable(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetOtherStorageConsumable', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 其他入库生产批号SN列表
 */
function PostOtherStorageCreateLabelNo(parDic, successCallback, failCallback) {
  baseRequst('main/wms/PostOtherStorageCreateLabelNo', parDic, 'post', true, true, successCallback, failCallback);
}

// --PoNum		其他入库Code 获取
// --ItemNo		物料Code
// --TotalQty		入库总数
// --PackageNum		包装数

/**
 * 其他入库提交
 */
function PostOtherStorageSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/PostOtherStorageSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

/**
 * 其他入库SN信息
 */
function GetOtherOutgoinSN(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetOtherOutgoinSN', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取其他出库的入库履历
 */
function GetOtherOutgoinSearch(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetOtherOutgoinSearch', parDic, 'GET', true, true, successCallback, failCallback);
}
// "StartDate": "", //开始时间
// "EndDate": "", //结束时间
// "PageSize": "20", //每页数据条数
// "PageNum": "1", //页码
// "WarehouseId": "", //仓库
// "ConsumableCode": "", //物料Code
// "PoNo": "", //关联单号
// "OutStockType": "", //出库类型
// "Status": "", //状态
// "SN": "" //物料Label SN

/**
 * 其他出库提交
 */
function PostOtherOutgoinSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/PostOtherOutgoinSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// "Code": "", 
// "WarehouseId": "08c6b891-96ac-4db3-9d5f-be6c33d1dafb", 
// "OutStockType": "Defect",  
// "RelCode": "dfsfdsfdsf", 
// "Description": "gfdgd", 
// "ToVendorId": "", 
// "ToDepartmentId": "",  
// "ItemList":



/**
 * FQC/OQC根据工单获取对应的模板信息
 */
function GetFQCReportTemp(parDic, successCallback, failCallback) {
  baseRequst('QMS/GetFQCReportTemp', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 获取FQC报告履历
 */
function GetFQCReportHist(parDic, successCallback, failCallback) {
  baseRequst('QMS/GetFQCReportHist', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 获取FQC报告详情
 */
function GetFQCReportInfo(parDic, successCallback, failCallback) {
  baseRequst('QMS/GetFQCReportInfo', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 获取对应得ERP订单信息
 */
function GetFQCRerportErpList(parDic, successCallback, failCallback) {
  baseRequst('QMS/GetFQCRerportErpList', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 提交FQCReport数据
 */
function SubmitFQCReport(parDic, successCallback, failCallback) {
  baseRequst('QMS/SubmitFQCReport', parDic, 'post', true, true, successCallback, failCallback);
}


/**
 * B2B 标签扫描获取信息
 */
function GetB2BBarcodeInfo(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetB2BBarcodeInfo', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * B2B 标签入库保存
 */
function PostB2BBarcodeListSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/wms/PostB2BBarcodeListSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// --WarehouseId		
// --WarehouseCode		
// --BinId		
// --BinCode		
// --ItemList		Barcode 列表
// ----OrderNo		订单号
// ----QCQty		IQC 合格数量入库
// ----MtrlCode		物料代码
// ----SN		barcode


/**
 * B2B 入库履历
 */
function GetB2BStockHistList(parDic, successCallback, failCallback) {
  baseRequst('main/wms/GetB2BStockHistList', parDic, 'GET', true, true, successCallback, failCallback);
}
// --StartDate		开始时间
// --EndDate		结束时间
// --PageSize		每页数据量
// --PageNum		页码
// --WarehouseId		仓库
// --ConsumableCode		物料代码
// --PoNo		单号
// --InputType		入库类型：B2B

/**
 * 获取补料单列表
 */
function GetSupplementRequestList(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/GetSupplementRequestList', parDic, 'GET', true, true, successCallback, failCallback);
}

// "StartTime":"2022-06-01",
// "EndTime":"2022-09-01",
// "WorkOrderNo":"",
// "PageSize":"20",
// "PageNum":"1",
// "Type":"WorkLoss"

/**
 * 获取补料工单信息
 */
function GetSupplementWorkOrderInfo(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/GetSupplementWorkOrderInfo', parDic, 'GET', true, true, successCallback, failCallback);
}


/**
 * 返工画面获取返工单信息
 */
function GetReworkOrder(parDic, successCallback, failCallback) {
  baseRequst('PK/GetReworkOrder', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 返工查询需要返工的工单
 */
function GetWorkorderForRework(parDic, successCallback, failCallback) {
  baseRequst('PK/GetWorkorderForRework', parDic, 'GET', true, true, successCallback, failCallback);
}

/**
 * 查询返工列表
 */
function GetReworkSearch(parDic, successCallback, failCallback) {
  baseRequst('PK/GetReworkSearch', parDic, 'GET', true, true, successCallback, failCallback);
}
// {"StartDate":"2022-06-07",
// "EndDate":"2022-10-09",
// "WorkorderNo":"",
// "FacilityId":"",
// "PageSize":"20","PageNo":"1"}

/**
 * 返工提交申请
 */
function PostReworkApply(parDic, successCallback, failCallback) {
  baseRequst('PK/PostReworkApply', parDic, 'post', true, true, successCallback, failCallback);
}

// "WorkOrderNo": "513-22050900839-0010-2080", 
// "ReworkType": "RT_OQC", 
// "PlanReworkDay": "2022-09-28",  
// "LotList":


/**
 * 返工完成提交
 */
function PostReworkFinish(parDic, successCallback, failCallback) {
  baseRequst('PK/PostReworkFinish', parDic, 'post', true, true, successCallback, failCallback);
}

// "WorkOrderNo": "513-22050900839-0010-2080", 
// "ReworkType": "RT_OQC", 
// "PlanReworkDay": "2022-09-28",  
// "LotList":



/**
 * 获取补料工单的物料列表
 */
function GetSupplementConsumable(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/GetSupplementConsumable', parDic, 'GET', true, true, successCallback, failCallback);
}

// "Type":"1",
// "WorkOrderNo":"510-22031400078-0010-8000-1"
// "ConsumableCode":"","Qty":"2"

/**
 * 补料单提交
 */
function PostSupplementRequestSubmit(parDic, successCallback, failCallback) {
  baseRequst('main/kitting/PostSupplementRequestSubmit', parDic, 'post', true, true, successCallback, failCallback);
}

// "WorkOrderNo": "5103-22031400015-0010-8000", 
// "ReasonType": "WorkLoss", 
//  "WarehouseId": "", 
// "FacilityId": "", 
// "Description": "不良损耗", 
// "ItemList": 

/**
 * 强制更新
 */
function SystemVersionGet(parDic, successCallback, failCallback) {
  baseRequst('main/checkversion', parDic, 'post', false, true, successCallback, failCallback);
}


/**
 * OSS秘钥
 */
function STSToken(parDic, successCallback, failCallback) {
  postRequst('STSToken', parDic, false, true, successCallback, failCallback);
}

// 个推ClientID			ClientId
// 客户端类型：PC，Android，IOS			DeviceType
// IP地址			Ip
// MAC 物理地址			MacAddress
// IMEI，苹果没有则用GUID			IMEI
// 手机品牌			Brand
// 手机操作系统版本			OSVersion
// 手机分辨率			ScreenResolution
// APP 手机端的版本			AppVersion


function startLoad() {
  api.showProgress({
    title: '加载中...',
    modal: true
  });
}

function stopLoad() {
  api.hideProgress();
  api.refreshHeaderLoadDone();
}

function getRequst(url_port, url_parameter, needToken, successCallback, failCallback) {
  getRequstBase(url_port, url_parameter, needToken, true, successCallback, failCallback);
}

function getRequstBase(url_port, url_parameter, needToken, showProgress, successCallback, failCallback) {

  var token = '';
  if (needToken == true) {
    var userInfo = $api.getStorage('userInfoJW');
    if (userInfo) {
      token = userInfo.token;
    }
  }
  if (showProgress) {
    api.showProgress({
      title: '加载中...',
      modal: true
    });
  }
  var mark = api.getGlobalData({
    key: 'Mark'
  });

  if (!mark) {
    $api.rmStorage('userInfoJW');
    api.sendEvent({
      name: 'loginOut',
      extra: {
      }
    });
    return;
  }

  console.log(getMainUrl() + url_port + '?loginMark=' + mark + '&token=' + token + url_parameter);

  $.ajax({
    url: getMainUrl() + url_port + '?loginMark=' + mark + '&token=' + token + url_parameter,
    type: "get",
    dataType: "json",
    timeout: 40000,
    success: function (data, textStatus, jqxhr) {
      api.hideProgress();
      setTimeout(function () {
        api.refreshHeaderLoadDone();
      }, 300);

      console.log(JSON.stringify(data));
      console.log(JSON.stringify(textStatus));
      console.log(JSON.stringify(jqxhr));

      // data = JSON.parse(data);
      successCallback(data);

      if (data.code == 410) {
        $api.rmStorage('userInfoJW');
        api.sendEvent({
          name: 'loginOut',
          extra: {
          }
        });
      }
    },
    error: function (jqxhr, textStatus, error) {
      console.log(JSON.stringify(jqxhr));

      api.hideProgress();
      api.refreshHeaderLoadDone();
      if (typeof failCallback == "function") {
        failCallback(error);
      }
    }
  });
}

function postRequst(url_port, parameterDic, loadShow, needToken, successCallback, failCallback) {
  var token = '';
  if (needToken == true) {
    var userInfo = $api.getStorage('userInfoJW');
    if (userInfo) {
      token = userInfo.token;
    }
  }

  if (loadShow) {
    startLoad();
  }

  var mark = api.getGlobalData({
    key: 'Mark'
  });

  if (!mark) {
    $api.rmStorage('userInfoJW');
    api.sendEvent({
      name: 'loginOut',
      extra: {
      }
    });
    return;
  }

  var tempDic = {
    loginMark: mark,
    token: token,
    data: parameterDic
  }

  var parDic = {};
  parDic.body = tempDic;
  console.log(getMainUrl() + url_port + "====" + JSON.stringify(tempDic));
  $.ajax({
    url: getMainUrl() + url_port,
    data: JSON.stringify(tempDic),
    contentType: "application/json; charset=UTF-8",
    type: "post",
    dataType: "json",
    timeout: 40000,
    success: function (data, textStatus, jqxhr) {
      stopLoad();
      setTimeout(function () {
        api.refreshHeaderLoadDone();
      }, 300);

      console.log(url_port + '=====' + JSON.stringify(data));
      successCallback(data);

      if (data.code == 410) {
        $api.rmStorage('userInfoJW');
        api.sendEvent({
          name: 'loginOut',
          extra: {
          }
        });
      }
    },
    error: function (jqxhr, textStatus, error) {
      api.refreshHeaderLoadDone();
      if (typeof failCallback == "function") {
        failCallback(error);
      }
      stopLoad();
    }
  });
  return;


  console.log(JSON.stringify(tempDic));

  api.ajax({
    url: getMainUrl() + url_port,
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      body: tempDic
    }
  }, function (ret, err) {
    if (loadShow) {
      stopLoad();
    }

    console.log(url_port + '=====' + JSON.stringify(ret));

    if (ret) {
      successCallback(ret);
      if (ret.code == 410) {
        $api.rmStorage('userInfoJW');
        api.sendEvent({
          name: 'loginOut',
          extra: {
          }
        });
      }
    } else {
      console.log(JSON.stringify(err));
      failCallback(err);
    }
  });
}

function baseRequst(url_port, parDic, method, loadShow, needToken, successCallback, failCallback) {
  var token = '';
  if (needToken == true) {
    var userInfo = $api.getStorage('userInfoJW');
    if (userInfo) {
      token = userInfo.token;
    }
  }

  // if (setLoadStatus(true,url_port)) {
  //   return;
  // };

  if (loadShow) {
    startLoad();
  }

  var mark = api.getGlobalData({
    key: 'Mark'
  });

  if (!mark) {
    $api.rmStorage('userInfoJW');
    api.sendEvent({
      name: 'loginOut',
      extra: {
      }
    });
    return;
  }

  if (url_port == 'MES/LotInputLRM' || url_port == 'MES/LotInput' || url_port == 'MES/LotFinish' || url_port == 'Eqp/PostEqpControlNotice') {
    mark = 'android7d3c031c-ae16-47b5-89da-7236bce6fe36';
    token = '0219f075-c706-4404-8706-463270082a91';
  }

  var tempDic = {
    loginMark: mark,
    token: token,
    data: parDic
  }

  // if ('/main/GetSelectItemList' == url_port) {
  //   if (method == 'GET' || method == 'get') {
  //     if (parDic && $util.isObject(parDic)) {
  //       parDic.loginMark = mark;
  //       parDic.token = token;
  //       tempDic = parDic;
  //     } else {
  //       tempDic = {
  //         loginMark: mark,
  //         token: token
  //       }
  //     }
  //   } else {
  //     tempDic = {
  //       loginMark: mark,
  //       token: token,
  //       data: parDic
  //     }
  //     tempDic = JSON.stringify(tempDic);
  //   }
  // }else{
  if (method == 'GET' || method == 'get') {
    if ($util.isObject(parDic)) {
      tempDic.data = JSON.stringify(parDic);
      console.log(url_port + '=====' + JSON.stringify(parDic) + '//loginMark=' + mark + '//token=' + token);
    } else {
      console.log(url_port + '=====' + JSON.stringify(tempDic));
    }
  } else {
    tempDic = JSON.stringify(tempDic);
    console.log(url_port + '=====' + tempDic);
  }
  // }

  $.ajax({
    url: getMainUrl() + url_port,
    data: tempDic,
    type: method,
    dataType: "json",
    timeout: 30000,
    contentType: 'application/json; charset=utf-8',
    // contentType: "application/json",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data, textStatus, jqxhr) {
      stopLoad();
      setTimeout(function () {
        api.refreshHeaderLoadDone();
      }, 300);

      console.log(url_port + '=====' + JSON.stringify(data));
      if (data.code == 410) {
        $api.rmStorage('userInfoJW');
        api.sendEvent({
          name: 'loginOut',
          extra: {
          }
        });
      }

      successCallback(data);
      // setLoadStatus(false,url_port);
    },
    error: function (jqxhr, textStatus, error) {
      console.log(url_port + '=====' + JSON.stringify(error));

      api.refreshHeaderLoadDone();
      if (typeof failCallback == "function") {
        failCallback(error);
      }
      stopLoad();
      // setLoadStatus(false,url_port);
    }
  });
}

function setLoadStatus(flag, url_port) {
  var loadModel = null;
  loadingList.forEach(function (val, index) {
    if (val.loadPath == url_port) {
      loadModel = val;
      return false;
    }
  });

  if (loadModel) {
    if (loadModel.isLoading && flag == true) {
      return true;
    }
    loadModel.isLoading = flag;
  } else {
    loadingList.push({
      loadPath: url_port,
      isLoading: flag
    });
  }

  return false;
}

function postRequstShowLoading(url_port, parameterDic, needToken, showProgress, successCallback, failCallback) {
  var token = '';
  if (needToken == true) {
    var userInfo = $api.getStorage('userInfoJW');
    if (userInfo) {
      token = userInfo.token;
    }
  }

  if (showProgress) {
    startLoad();
  }

  api.ajax({
    url: getMainUrl() + url_port,
    method: 'post',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "AppKey": "HHWIOS2017",
      "Authorization": token
    },
    data: {
      body: parameterDic
    }
  }, function (ret, err) {
    if (showProgress) {
      stopLoad();
    }
    if (ret) {
      successCallback(ret);
      if (ret.Code == 410) {
        $api.rmStorage('userInfoJW');
        api.sendEvent({
          name: 'loginOut',
          extra: {
          }
        });
      }
    } else {
      console.log(JSON.stringify(err));
      failCallback(err);
    }
  });
}

var req;

function uploadFileToLocatServer(pictures, Module, callback) {

  api.showProgress({
    title: '图片上传中...',
    modal: true
  });

  if (pictures.length <= 0) {
    stopLoad();
    callback(true);
    return;
  }

  var PromiseArr = new Array;
  var formData = new FormData();
  pictures.forEach(function (fileModel, index, arr) {
    if (fileModel.FileId) {
      return false;
    }

    var PsFun = new Promise(function (resolve, reject) {
      imgTransformToBase64(fileModel.FileLink, function (base64) {

        var guId = getGuid();
        var fileName = guId + '.jpg';
        fileModel.FileName = fileName;

        // fileModel.FileId = guId;
        if (base64) {
          var myFile = dataURLTransformToFile(base64, fileName);
          formData.append("file", myFile, myFile.name);
        }

        resolve(fileName)
      });
    });
    PromiseArr.push(PsFun);
  });

  if (PromiseArr.length > 0) {
    Promise.all(PromiseArr).then(function (results) {
      uploadFileCalBack(pictures, formData, Module, callback);
      console.log(results) // ["p1 data", ""p2 data""]
    });
  } else {
    stopLoad();
    callback(true);
  }
}

function uploadFileCalBack(pictures, formData, Module, callBack) {
  var token = '';
  var userInfo = $api.getStorage('userInfoJW');
  if (userInfo) {
    token = userInfo.token;
  }

  var mark = api.getGlobalData({
    key: 'Mark'
  });

  var parDic = {
    Module: 'EQM',
    SortCode: 0
  }

  formData.append("loginMark", mark);
  formData.append("token", token);
  formData.append("data", Module);

  console.log(JSON.stringify(parDic) + '222');

  if (req != null) {
    req.abort();
  }

  var url_port = 'main/file/upload';
  req = $.ajax({
    url: getMainUrl() + url_port,
    type: "post",
    data: formData,
    processData: false, // 告诉jQuery不要去处理发送的数据
    contentType: false,
    dataType: "json",
    mimeType: "multipart/form-data",
    success: function (ret) {
      console.log(JSON.stringify(ret));
      if (ret.code == 200) {
        var tempArr = ret.data;
        if (tempArr.length) {
          pictures.forEach(function (val, index, arr) {
            for (var i = 0; i < tempArr.length; i++) {
              if (val.FileName == tempArr[i].Value) {
                val.FileId = tempArr[i].Key;
                break;
              }
            }
          });

          if (tempArr.length == pictures.length) {
            callBack(true);
          } else {
            callBack(false);
          }
        } else {
          callBack(false);
        }
      } else {
        callBack(false);
      }

      stopLoad();
    },
    error: function (data) {
      callBack(false);
      stopLoad();
      console.log('err==' + JSON.stringify(data));
    }
  });
}

// ===============图片上传相关=====================
/**
 * 将图片转换为Base64
 */
function imgTransformToBase64(url, callBack) {
  var img = new Image();
  img.src = url;
  img.crossOrigin = 'Anonymous';
  var width = 1600;
  img.onload = function () {

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
    console.log(getImgSize(base64));
    // 回调函数返回base64的值
    canvas = null;

    callBack(base64);
  }
}

function getImgSize(base64url) {
  if (!base64url || base64url.length < 30) {
    return 0;
  }
  //获取base64图片大小，返回KB数字
  var str = base64url.replace('data:image/jpeg;base64,', '');//这里根据自己上传图片的格式进行相应修改

  var strLength = str.length;
  var fileLength = parseInt(strLength - (strLength / 8) * 2);

  // 由字节转换为KB
  var size = "";
  size = (fileLength / 1024).toFixed(2);
  return parseInt(size);
}

/**
 * 将base64转换为文件
 */
function dataURLTransformToFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * 获取guId
 */
function getGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
