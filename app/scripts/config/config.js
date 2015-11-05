"use strict";

angular.module('config', [])

.constant('CONFIG', (function() {
    return {
        CONSTANTS: {
            PROTOCOL: 'http',
            HOST: 'alcoholways.com',
            PATH: '',
            PORT: 8888
        },
        STORAGE: {
            PREFIX: 'wineApp'
        },
        ORDER_STATUS: {
            //2为代付款，3为代发货，4为已发货，5为交易完成，空值为全部
            WAIT_PAY: 2,
            WAIT_SEND: 3,
            WAIT_RECV: 4,
            COMPLETE: 5
        },
        PAYMENT: {
            alipay: {
                partner: '2088021262873586',
                seller_id: 'jiulvvip@163.com',
                private_key: '6su4zgfy2hybrq1euzr0d17j5inj2zgn',
                locked: false,
                debug: false
            }
        },
        DRTYPE: 0, //用户类型1：达人，0：普通
        API: {
            URL: {
                PROTOCOL: 'http',
                HOST: 'alcoholways.com', //'alcoholways.com',
                PATH: 'api',
                PORT: '8080'
            },
            isMobile: false,
            PLATFORM: 'android',
            /*URL: {
                PROTOCOL: 'http',
                HOST: 'alcoholways.com', //'alcoholways.com',
                PATH: 'api',
                PORT: '8080'
            },
            isMobile:true,
            PLATFORM:'android',
            */
            login: 'user/login', //post,{username,password}
            hotSell: 'winerec/page', //获取热卖产品信息 get,{offset,fetchSize},分页信息,userId:代表达人的推荐
            hotdr: 'userMember/getRecommendDaren', //获取最热达人，offset,fetchSize 直接返回的是一个数组
            ad: 'ads/listAll', //获取首页的广告信息，method:get
            daren: 'q/daren', //达人列表或者搜索 method:get(offset,fetchSize,goble_search(关键词))
            wine: 'q/wine', // 红酒列表或者搜索 method:get(offset,fetchSize,goble_search(关键词))
            jz: 'q/merchant', // 酒庄列表或者搜索 method:get(offset,fetchSize,goble_search(关键词))
            drinfo: 'userMember/getByUserId', // 获取达人明细，get方式
            drlv: 'userMember/getMyLevelWithType', //  参数 userId，type'，get方式
            drcomment: 'comment/getMasterComment', //?offset=0&fetchSize=6&userId=759a6fc2282a45b8b123c7d1f897d6b8        jzdetail:'merchant/getByUserId',//获取酒庄基本信息,userId, get方式
            addcomment: 'comment/materComment', //post 参数darenId,content
            drblog: '/blog/listLatestRec', //获取达人代言（博客）api 参数userId,offset,fetchSize
            jztj: 'winerec/queryByShop', //参数 shopId(userId)，offset，fetchSize
            jzinfo: 'merchant/getByUserId', //获取酒庄基本信息，id
            jzad: 'mads/adsList', //获取酒庄自己的广告图 参数uid 实际上就是shopId,offset,fetchSize
            jzwinelist: 'wine/itemWines', //获取酒庄的红酒列表 shopId,offset,fetchSize
            winedetail: 'wine/getWineDetail', //获取 红酒详情 api/wine/getWineDetail 参数 id，返回值 card 红酒身份证信息、rate汇率信息、merchant关联酒庄信息，wine红酒信息，sendWine 如果这瓶酒有参与买就送活动这个有值，activitySetMealList 如果有套餐这个有值
            winecomment: 'wine/getWineComment', //获取红酒的相关评论 id,offset,fetchSize
            focus: 'userCollect/collect', //收藏、关注 api/userCollect/collect 参数id（目标的id），type（3表示关注达人，2表示酒庄，1表示红酒），userId，darenUserId（如果是某个达人分享出去使普通会员关注的，需要带这个达人的id，如果没有置为空字符串） post方式
            accountorder: 'order/listOnlyOrder', //参数userId，type（2为代付款，3为代发货，4为已发货，5为交易完成，空值为全部），offset，fetchSize
            mytest: 'wine4test/listWineTest', //我的试酒，参数offset,fetchSize
            myapply: 'wine4test/listMyApply', // 获取已参加试酒列表 参数userId,offset,fetchSize
            mytrack: 'userTrack/list', //获取我的足迹 userId (post方式)
            myfund: 'workOrder/listOrder', //获取我的维权列表  参数 userId,offset,fetchSize
            myfocus: 'userCollect/list', //关注类表，参数 userId,type(1红酒,2店铺,3达人),offset,fetchSize
            wineseq: 'wine/listBySeq', //产品排序，参数type（表示倒叙类型，sales销量、price价格），spec（红酒品种，all表示全部，传入品种id按品种过滤）,offset,fetchSize
            winereommend: 'winerec/save', //红酒推荐，post：wineId，merchantId，picUrl,userId,labels,其中wineId从wine4test/listWineTest 获取 
            orderinfo: 'order/orderInfo', // 参数orderId 可多个id用逗号隔开
            createorder: 'order/createOrder', //创建订单，无套餐
            updateorder: 'order/updateStatus', //更新订单状态
            delorder: 'order/delete', //删除订单
            orderaddr: 'order/saveOrderAddr', // 参数addId,orderId 关联收货地址
            applytest: 'wine4test/saveWineApply', //申请试酒,参数testId,userId post方式
            addresslist: 'userAddress/list', //收货地址列表，userId
            addressinfo: 'userAddress/get', // 参数id
            addressupdate: 'userAddress/save', //参数id post
            addressdel: 'userAddress/del', // 参数id post
            updateuser: 'userMember/modify', //更改用户信息,
            register: 'user/register', //注册接口  参数name，password post
            checkname: 'user/checkName', // 参数name post
            checkphone: 'user/checkPhone', // 参数name post
            getcheckcode: 'sms/getValid', // phone get
            query4testwine: 'wine/queryForDarenWine', //试酒选择，参数darenId,offset,fetchSize 
            updatepwd: 'user/updatePassword', //修改密码 参数 userId,oldPassword,newPassword post
            mymission: 'job/task', // type(new 最新，mine 我的),platUserId,offset,fetchSize'
            getmission: 'job/save', // jobId,PlatUserId（第一个p是大写）,status(固定为0)
            endmission: 'job/end', // jobId,PlatUserId（第一个p是大写）,status(固定为0)
            updateheadpic: 'user/setHeadPic', //修改头像，参数headPic，userId post方式
            myrecommand: 'winerec/page', // userId,offset,fetchSize
            myrepresent: 'blog/list', // userId,offset,fetchSize
            delmyrecommand: 'winerec/delete', //参数id post方式
            delmyrepresent: 'blog/delete', //参数id post方式
            savemyrepresent: 'blog/save', //userId,merchantId,msg,labels,picUrl,
            query4jz: 'merchant/queryForDarenMerchant', // 参数darenId,offset,fetchSize
            mysale: 'daren/salesrecord/listByDaren' //我的提成，param darenId,offset,fetchSize
        },
        getBaseApiURL: function() {
            return this.API.URL.PROTOCOL + '://' + this.API.URL.HOST + ':' + this.API.URL.PORT + '/' + this.API.URL.PATH + '/';
        },
        getResourceURL: function() {
            return this.CONSTANTS.PROTOCOL + '://' + this.CONSTANTS.HOST + ':' + this.CONSTANTS.PORT + this.CONSTANTS.PATH;
        }
    }
})());
