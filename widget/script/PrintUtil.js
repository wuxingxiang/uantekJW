/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function (window) {
  var u = {};

  u.printBoxTally = function (OrderModel, boxModel) {
    var BoxStr = '';
    BoxStr += "BOX 11,17,547,383,3\r\n";
    BoxStr += "BAR 13,330, 533, 3\r\n";
    BoxStr += "BAR 13,283, 533, 3\r\n";

    BoxStr += "BAR 13,226, 533, 3\r\n";
    BoxStr += "BAR 13,163, 533, 3\r\n";
    BoxStr += "BAR 220,115, 326, 3\r\n";

    BoxStr += "BAR 220,67, 326, 3\r\n";
    BoxStr += "BAR 463,21, 3, 310\r\n";

    BoxStr += "BAR 390,115, 3, 48\r\n";
    BoxStr += "BAR 271,283, 3, 48\r\n";
    BoxStr += "BAR 183,283, 3, 48\r\n";
    BoxStr += "BAR 219,20, 3, 142\r\n";

    var QRStr = "QRCODE 54,28,M,6,A,0,M2,\"" + boxModel.SN + "\"\r\n";
    var params = {
      BoxStr: BoxStr,
      QRStr: QRStr,
      TitleList: [{
        PointX: 524,
        PointY: 306,
        Size: 1,
        Font: 'FONT001',
        Title: 'P/N',
        Break: 20
      },
      {
        PointX: 246,
        PointY: 306,
        Size: 1,
        Font: 'FONT001',
        Title: 'Qty',
        Break: 20
      },
      {
        PointX: 530,
        PointY: 90,
        Size: 1,
        Font: 'FONT001',
        Title: 'Date',
        Break: 10
      },
      {
        PointX: 530,
        PointY: 138,
        Size: 1,
        Font: 'FONT001',
        Title: 'Line#',
        Break: 10
      },
      {
        PointX: 530,
        PointY: 255,
        Size: 1,
        Font: 'FONT001',
        Title: 'Desc.',
        Break: 30
      },
      {
        PointX: 530,
        PointY: 195,
        Size: 1,
        Font: 'FONT001',
        Title: 'Spec.',
        Break: 30
      },
      {
        PointX: 519,
        PointY: 40,
        Size: 1,
        Font: 'FONT001',
        Title: 'SN',
        Break: 10
      }],

      ContentList: [{
        PointX: 430,
        PointY: 305,
        Size: 1,
        Font: 'FONT003',
        Content: OrderModel.ProductCode.trim(),
        Break: 10
      },
      {
        PointX: 160,
        PointY: 305,
        Size: 1,
        Font: 'FONT003',
        Content: boxModel.Qty + ' PCS',
        Break: 10
      },
      {
        PointX: 385,
        PointY: 90,
        Size: 1,
        Font: 'FONT001',
        Content: OrderModel.InnerboxPackingDateCode,
        Break: 20
      },
      {
        PointX: 435,
        PointY: 138,
        Size: 1,
        Font: 'FONT001',
        Content: boxModel.SN.length > 6 ? boxModel.SN.substr(-6, 1) : '',
        Break: 20
      },
      {
        PointX: 380,
        PointY: 138,
        Size: 1,
        Font: 'FONT001',
        Content: OrderModel.Weight ? 'WT ' + OrderModel.Weight : '',
        Break: 20
      },
      {
        PointX: 450,
        PointY: 255,
        Size: 1,
        Font: 'FONT001',
        Content: OrderModel.ProductDesc ? OrderModel.ProductDesc : '',
        Break: 28
      },
      {
        PointX: 450,
        PointY: 195,
        Size: 1,
        Font: 'FONT001',
        Content: OrderModel.ProductSpec ? OrderModel.ProductSpec : '',
        Break: 28
      },
      {
        PointX: 420,
        PointY: 42,
        Size: 1,
        Font: 'FONT001',
        Content: boxModel.SN,
        Break: 20
      }],
      TallyTitle: {
        PointX: 524,
        PointY: 358,
        Size: 1,
        Font: 'FONT002',
        Content: 'Joy Industrial(Shenzhen)Co.,LTD',
        Break: 36
      }
    };
    return params;
  }

  u.printPalletTally = function (OrderModel, palletNo,BoxQty) {
    var BoxStr = '';
    BoxStr += "BAR 18,339, 534, 3\r\n";
    BoxStr += "BAR 18,329, 533, 8\r\n";
    var QRStr = "QRCODE 42,163,M,7,A,0,M2,\"" + palletNo + "\"\r\n";
    var DescY = 124;
    if (OrderModel.ProductDesc && OrderModel.ProductDesc.length > 30) {
      DescY = 124-16;
    }

    var SpecY = 60;
    if (OrderModel.ProductSpec && OrderModel.ProductSpec.length > 28) {
      SpecY = 60-16;
    }
    
    var params = {
      BoxStr: BoxStr,
      QRStr: QRStr,
      TitleList: [{
        PointX: 485,
        PointY: 294,
        Size: 1,
        Font: 'FONT001',
        Title: 'P/N:',
        Break: 20
      },
      {
        PointX: 496,
        PointY: 255,
        Size: 1,
        Font: 'FONT001',
        Title: 'Date:',
        Break: 20
      },
      {
        PointX: 521,
        PointY: 213,
        Size: 1,
        Font: 'FONT001',
        Title: 'BoxQty:',
        Break: 10
      },
      {
        PointX: 544,
        PointY: 168,
        Size: 1,
        Font: 'FONT001',
        Title: 'PalletNo:',
        Break: 10
      },
      {
        PointX: 496,
        PointY: 125,
        Size: 1,
        Font: 'FONT001',
        Title: 'Desc:',
        Break: 30
      },
      {
        PointX: 496,
        PointY: 60,
        Size: 1,
        Font: 'FONT001',
        Title: 'Spec:',
        Break: 30
      }],

      ContentList: [{
        PointX: 429,
        PointY: 294,
        Size: 1,
        Font: 'FONT003',
        Content: OrderModel.ProductCode?OrderModel.ProductCode.trim():'',
        Break: 10
      },
      {
        PointX: 429,
        PointY: 255,
        Size: 1,
        Font: 'FONT001',
        Content: OrderModel.InnerboxPackingDateCode?OrderModel.InnerboxPackingDateCode.trim():"",
        Break: 20
      },
      {
        PointX: 429,
        PointY: 214,
        Size: 1,
        Font: 'FONT003',
        Content: BoxQty,
        Break: 10
      },
      {
        PointX: 429,
        PointY: 168,
        Size: 1,
        Font: 'FONT001',
        Content: palletNo,
        Break: 20
      },
      {
        PointX: 429,
        PointY: DescY,
        Size: 1,
        Font: 'FONT001',
        Content: OrderModel.ProductDesc ? OrderModel.ProductDesc : '',
        Break: 30
      },
      {
        PointX: 429,
        PointY: SpecY,
        Size: 1,
        Font: 'FONT001',
        Content: OrderModel.ProductSpec ? OrderModel.ProductSpec : '',
        Break: 28
      }],
      TallyTitle: {
        PointX: 530,
        PointY: 365,
        Size: 1,
        Font: 'FONT002',
        Content: 'Joy Industrial(Shenzhen)Co.,LTD',
        Break: 36
      }
    };
    return params;
  }

  u.printMaterialTally = function (MaterialModel) {
    var BoxStr = '';
    BoxStr += "BOX 17,17,540,373,3\r\n";

    BoxStr += "BAR 18,373, 523, 3\r\n";
    BoxStr += "BAR 163,333, 377, 3\r\n";
    BoxStr += "BAR 163,293, 377, 3\r\n";
    BoxStr += "BAR 18,253, 523, 3\r\n";
    BoxStr += "BAR 18,195, 523, 3\r\n";
    BoxStr += "BAR 18,137, 523, 3\r\n";
    BoxStr += "BAR 18,97, 523, 3\r\n";
    BoxStr += "BAR 18,57, 523, 3\r\n";

    BoxStr += "BAR 460,17, 3, 360\r\n";
    BoxStr += "BAR 336,293, 3, 40\r\n";
    BoxStr += "BAR 268,293, 3, 40\r\n";
    BoxStr += "BAR 162,253, 3, 121\r\n";
    BoxStr += "BAR 255,19, 3, 120\r\n";
    BoxStr += "BAR 168,19, 3, 120\r\n";

    var QRStr = "QRCODE 40,28,M,6,A,0,M2,\"" + MaterialModel.SN + "\"\r\n";

    var MtrNY = 236;
    if (MaterialModel.MtrlName && MaterialModel.MtrlName.length > 30) {
      MtrNY = 221
    }

    var ModelY = 180;
    if (MaterialModel.Model && MaterialModel.Model.length > 30) {
      ModelY = 165
    }

    var params = {
      BoxStr: BoxStr,
      QRStr: QRStr,
      TitleList: [{
        PointX: 528,
        PointY: 364,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '單號',
        Break: 20
      },
      {
        PointX: 528,
        PointY: 324,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '數量',
        Break: 20
      },
      {
        PointX: 327,
        PointY: 324,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '庫別',
        Break: 10
      },
      {
        PointX: 528,
        PointY: 280,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '品號',
        Break: 10
      },
      {
        PointX: 528,
        PointY: 236,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '品名',
        Break: 30
      },
      {
        PointX: 528,
        PointY: 180,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '規格',
        Break: 30
      },
      {
        PointX: 524,
        PointY: 130,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: 'SN',
        Break: 10
      },
      {
        PointX: 246,
        PointY: 130,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '收貨人',
        Break: 10
      },
      {
        PointX: 528,
        PointY: 90,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '廠商',
        Break: 10
      },
      {
        PointX: 238,
        PointY: 90,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '日期',
        Break: 78
      },
      {
        PointX: 528,
        PointY: 52,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '批次',
        Break: 10
      },
      {
        PointX: 238,
        PointY: 52,
        Size: 1,
        Font: 'TSS24.BF2',
        Title: '箱號',
        Break: 10
      }],

      ContentList: [{
        PointX: 448,
        PointY: 364,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.OrderNo,
        Break: 30
      },
      {
        PointX: 448,
        PointY: 324,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.Qty,
        Break: 10
      },
      {
        PointX: 250,
        PointY: 324,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.WarehouseCode?MaterialModel.WarehouseCode.trim():'',
        Break: 10
      },
      {
        PointX: 448,
        PointY: 284,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.MtrlCode?MaterialModel.MtrlCode.trim():'',
        Break: 20
      },
      {
        PointX: 448,
        PointY: MtrNY,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.MtrlName?(MaterialModel.MtrlName.trim()).split(',').join('，'):'',
        Break: 30
      },
      {
        PointX: 448,
        PointY: ModelY,
        Size: 1,
        Font: 'TSS24.BF2',
        Content:MaterialModel.Model,
        Break:30
      },
      {
        PointX: 448,
        PointY: 130,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.SN,
        Break: 32
      },
      {
        PointX: 159,
        PointY: 130,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.Operator,
        Break: 32
      },
      {
        PointX: 448,
        PointY: 90,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.VendorShortName,
        Break: 32
      },
      {
        PointX: 159,
        PointY: 90,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.CreationTime,
        Break: 20
      },
      {
        PointX: 448,
        PointY: 52,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.Batch,
        Break: 20
      },
      {
        PointX: 110,
        PointY: 52,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: MaterialModel.serialNum,
        Break: 20
      }],
      QRModel:{
        PointX:39,
        PointY:260,
        ImgWidth:200,
        ShowWidth:110,
        QRType:'2D',
        Content:MaterialModel.SN
      },
      TallyTitle: {
        PointX: 530,
        PointY: 381,
        Size: 1,
        Font: 'TSS24.BF2',
        Content: '',
        Break: 36
      }
    };
    return params;
  }
  window.$PrintUtil = u;
})(window);
