/* 文件包含
 *
 *
 *   Date.prototype.format
 *   String.prototype.format
 *   medium.Util 
 *   medium.Share
 *   jQuery Templates Plugin 1.0.0pre
 *   jQuery Cookie Plugin
 *   jQuery nano
 *   jQuery mousewhell
 */

/**
 * [format description]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
;Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));
 return format;
};

;Date.prototype.cnformat = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
  
    str=str.replace(/MM/,this.getMonth()>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
    str=str.replace(/M/g,this.getMonth()+1);   
  
    str=str.replace(/w|W/g,Week[this.getDay()]);   
  
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
  
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
  
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
  
    return str;   
};

;String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined){
                 var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};
Array.prototype.baoremove = function(dx) {
    if (isNaN(dx) || dx >= this.length) {
        return false;
    }
    this.splice(dx, 1);
};
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
/**
 * [remove description]
 * var emp = ['abs','dsf','sdf','fd']
 * emp.remove('fd');
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
  
Array.prototype.add   =   function(str)   {   
    
  return   this[this.length]= (str);   
};
Array.prototype.clear   =   function(str)   {   
    
  return   this.length = 0;
} ;     

  
Array.prototype.hasItem   =   function(str)   {   
    for(var   i   =   0;   i   <   this.length;   i++)   {   
        if(this[i]   ==   str)   {   
        return   true;   
        }   
    }   
return   false;   
};
;var medium = medium || {};
;(function($){
	medium.Util = {
		// parse a date in yyyy-mm-dd format(格式化后日期转换成日期)
		parseDate : function(input) {
		  var parts = input.match(/(\d+)/g);
		  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
		  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
		},
	     /**
	     * 获取图片Url
	     */
	    getImageUrl : function(rid, w, h, cut) {
	      return TT_CONFIG.URL_CONSTANTS.RC_UPYUN_HTTP + rid+'';
	      var _w = w || 78,
	        _h = h || 78,
	        _qz = '', ds,
	        _other = arguments && arguments[4] ? arguments[4] : '',
	        rex = /\d/g, drs;
	      if (!rid) return;
	      cut = cut || 4;
	      ds = rid.match(rex);
	      _qz = (parseInt(ds[0]))%10;
	      drs = ['http://file-', _qz,TT_CONFIG.URL_CONSTANTS.GET_RCROOT_URL+'rc/getcuttedpicture?rid=', rid];
	      _h = _h == 'auto' ? '' : '&h=' + _h;
	      cut = cut == 'none' ? '' : '&cut=' + cut;
	      if (arguments[1] !== 'Y') {
	        drs = drs.concat(['&w=', _w, _h, cut, _other]);
	      }
	      return drs.join('');
	    },
	    
	 	/**
	 	 * 检查用户名是否合法
	 	 */
	    verifyNickName : function(name)
	 	{
	 		var reg = /([\^|~!@#$%&*()`=+:,.;?<>]|[\s]\[|\]|\\|\/|\'|\·|\~|\～|\"|\，|\。|\《|\》|\？|\；|\：|\’|\”|\！|\【|\】|\{|\｛|\｝|\}|\、|\＆|\……|\％|\￥|\＃|\＠|\×|\（|\）|\s)/ig;  //非法字符
	 		return !reg.test(name);
	 	},
        getUsericon : function (icon){
            var strRegex = "^((https|http)?://)";
            var re=new RegExp(strRegex);
            return !!icon && !re.test(icon) ? TT_CONFIG.URL_CONSTANTS.RC_UPYUN_HTTP + icon+'!wh120' : icon;
        },
        /**
         * 过滤特殊字符
         */
        replaceHtmlTag : function(value) {
            if(typeof value === "undefined" || !value) return "";
            return value.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
        },

        //检查中英文字符长度
        strlen : function(str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                //单字节加1
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    len++;
                }
                else {
                    len += 2;
                }
            }
            return len;
        },
        //截取字符串，中文算2个字符
		cut_str : function(str, len){
        	var char_length = 0;
        	for (var i = 0; i < str.length; i++){
            	var son_str = str.charAt(i);
            	encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            	if (char_length >= len){
                	var sub_len = char_length == len ? i+1 : i;
                	return str.substr(0, sub_len);
                	break;
            	}
        	}
    	},
		//设置光标位置_el要设置的节点 _start位置（数字）
    	setCaret : function(_el,_start){
			var range = document.createRange();
        	var sel = window.getSelection();
        	try{
        		range.setStart(_el.get(0).childNodes[0], _start);
            	range.collapse(true);
            	sel.removeAllRanges();
            	sel.addRange(range);
			}
        	catch(e){
        		console.log(e);
        	}
    	},
	    validateEmail : function(text){
	    	  var bl = false;
	          var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//验证Mail的正则表达式,^[a-zA-Z0-9_-]:开头必须为字母,下划线,数字,
	          if (!!reg.test(text))
	          {
	              bl = true;
	          } 
	          return bl;
	    },
	    
        randomChar : function(l){
            var x="1234567890abcdefghijklmnopqrstuvwxyz";
            var tmp="";
            for(var i=0;i<l;i++) {
            tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
            }
            return tmp;
        },
        isURL : function (str_url){
            var re = new RegExp("((^http)|(^https)|(^ftp)|(^rtsp)|(^mms)):\/\/(\\w)+\.(\\w)+");
            if (re.test(str_url)){
                return (true); 
            }else{ 
                return (false); 
            }
        },
        generate_random_id : function(prefix) {
              var string;
              string = prefix + this.generate_random_char() + this.generate_random_char() + this.generate_random_char();
              while ($("#" + string).length > 0) {
                string += this.generate_random_char();
              }
              return string;
        },
        generate_random_char : function() {
              var chars, newchar, rand;
              chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
              rand = Math.floor(Math.random() * chars.length);
              return newchar = chars.substring(rand, rand + 1);
        },
        qrwechat_make : function(qrtype,uid,_img,identity,bid){
            // var qrtype= _type == 0 ? ;
            // var res=window.confirm('您确定要制作uid='+uid+'的用户名片吗？');
            if (!!_img) {
                _img.attr('src', '/assets/img/loader1.gif');
            }
            var identity = typeof identity == "undefined" ? "" : identity;
            bid = typeof bid =="undefined" ? TT_CONFIG.hdbid : bid;
            $.ajax({
                url: '/mpwx/wxmessage/userqrcreate',
                data: {
                    uid: uid,
                    qrtype: qrtype,
                    identity : identity,
                    bid: bid
                },
                dataType: 'json',
                type: 'POST',
                success: function(res) {
                    //node.remove();
                    console.log(uid + '名片制作成功。');
                    console.log(res);
                    var qrurl = res.data.qrurl,
                        icon = medium.Util.getUsericon(res.data.icon);
                    var qrsrc = '/ttcode/gzh?qrurl=' + encodeURIComponent(qrurl) + '&logo=' + encodeURIComponent(icon);
                    // window.location = '/mng/user';;
                    if (!!_img) {
                        _img.attr('src', qrsrc);
                    }
                },
                error: function() {
                    // console.log('名片制作失败。');
                }
            });
        },
        /**
         * 过滤特殊字符
         */
        replaceHtmlTag : function  (value) {
            return value.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
        },
        formatAuthor : function(content){
            //将多行合并成一行
            content = content.replace(/\r|\n|\r\n/g, '\n');
            content = content.replace(/\n{2,}/g, '\n\n');
            //将/n换成<br>
            var carr = content.split('\n');
            // content = content.replace(/\n/ig, '<br />');
            return carr;
        },
        /**
         * 格式化文本
         */
        formatTextArea : function (content) {
            if (!content) return '';
            //过滤特殊字符
            content = this.replaceHtmlTag(content);
            //将多行合并成一行
            content = content.replace(/\r|\n|\r\n/g, '\n');
            content = content.replace(/\n{2,}/g, '\n\n');
            //将/n换成<br>
            content = content.replace(/\n/ig, '<br />');

            return content;
        },
        /**
         * 格式化消息文本
         * @param  {String} content 消息体
         */
        formatContent : function (content) {
            if (!content) return '';
            //过滤特殊字符
            content = this.replaceHtmlTag(content);
            //将@{}格式的字符串解析成@+name
            content = replaceUidToName(content);
            //解析换行符 6行
            // content = newReplaceValueRN(content);
            //解析URL
            content = replaceUrl(content);
            //解析#
            content = transitionTopicValue(content);
            //将@+name格式的字符串解析成可点击的@+name
            content = repaceNameToNode(content);
            //解析*
            content = replaceMH(content);
            //解析表情
            content = transitionImage(content);
            //解析特殊字符
            content = replaceSpecialStr(content);

            content = content.replace(/\n/ig, '<br />');

            curUrls = [];

            return content;
        },
        GetFirstStr : function(strOriginal,strSymbol)
        {
            var strPlace=strOriginal.indexOf(strSymbol);
            if (strPlace!=-1)
                strOriginal=strOriginal.substring(0,strPlace);
            return strOriginal;
        },
        GetLastStr  : function(strOriginal,strSymbol)
        {
            var strPlace=strOriginal.lastIndexOf(strSymbol)+strSymbol.length;
            strOriginal=strOriginal.substring(strPlace);
            return strOriginal;
        },
        GetLastFirstStr  : function(strOriginal,strSymbol)
        {
            var strPlace=strOriginal.lastIndexOf(strSymbol);
            if (strPlace!=-1)
                strOriginal=strOriginal.substring(0,strPlace);
            return strOriginal;
        },
        GetTwoMiddleFirstStr    : function(strOriginal,strFirst,strLast)
        {
            strOriginal=this.GetFirstStr(strOriginal,strLast);
            strOriginal=this.GetLastStr(strOriginal,strFirst);
            return strOriginal;
        },
        GetTwoMiddleAllStr    : function(strOriginal,strFirst,strLast,blnHead)
        {
            if (blnHead==null) blnHead = false;
            var strPlace=strOriginal.indexOf(strFirst)+strFirst.length;
            strOriginal=strOriginal.substring(strPlace);
            strPlace=strOriginal.lastIndexOf(strLast);
            strOriginal=strOriginal.substring(0,strPlace);
            if (strOriginal!=""){
                if (blnHead) {strOriginal = strFirst + strOriginal + strLast;}
            }
            
            return strOriginal;
        },
        replaceAll : function( strOriginal,strSrc, strReplace ){
            return strOriginal.replace( new RegExp( strSrc,"g" ), strReplace);
        },

        GetIndexArray   : function(strArray,strOriginal)
        {
            var arrayIndex = -1;
            for(i=0;i<strArray.length;i++)
            {
                if (strArray[i]==strOriginal)
                {
                    arrayIndex = i;
                    break;
                }
            }
            return arrayIndex;
        },
        GetArrayValue   : function(strOriginal,strSymbol,strIndex)
        {
            var strArray = new Array();
            strArray = strOriginal.split(strSymbol);
            return strArray[strIndex] ;
        },
        GetArray    : function(strOriginal,strSymbol)
        {
            var strArray = new Array();
            strArray = strOriginal.split(strSymbol);
            return strArray;
        },
        GetIndexValue   : function(strArray,strIndex)
        {
            return strArray[strIndex] ;
        },
        GetOriginal_SymbolCount : function (strOriginal,strSymbol)
        {
            var arrayTemp = strOriginal.split(strSymbol)   
            return arrayTemp.length;
        },
        RegularUrl  : function(url,key,value)
        {
            var fragPos = url.lastIndexOf("#");
            var fragment="";
            if(fragPos > -1)
            {
                fragment = url.substring(fragPos);
                url = url.substring(0,fragPos);
            }
            var querystart = url.indexOf("?");
            if(querystart < 0  )
            {
                url +="?"+key+"="+value;
            }
            else    if (querystart==url.length-1)
            {
                url +=key+"="+value;
            }
            else
            {
                var Re = new RegExp(key+"=[^\\s&#]*","gi"); 
                if (Re.test(url))
                url=url.replace(Re,key+"="+value);
                else
                url += "&"+key+"="+value;
            }
            return url+fragment;
        } ,
        /**
         * [get_popover_placement description]
         * popover 弹窗位置
         * @param  {[type]} tip     [description]
         * @param  {[type]} element [description]
         * @return {[type]}         [description]
         */
        get_popover_placement: function(tip, element) {
            var $element, above, actualHeight, actualWidth, below, boundBottom, boundLeft, boundRight, boundTop, elementAbove, elementBelow, elementLeft, elementRight, isWithinBounds, left, pos, right;
            isWithinBounds = function(elementPosition) {
              return boundTop < elementPosition.top && boundLeft < elementPosition.left && boundRight > (elementPosition.left + actualWidth) && boundBottom > (elementPosition.top + actualHeight);
            };
            $element = $(element);
            pos = $.extend({}, $element.offset(), {
              width: element.offsetWidth,
              height: element.offsetHeight
            });
            console.log($element,pos);
            actualWidth = 330;
            actualHeight = 390;
            boundTop = $(document).scrollTop();
            boundLeft = $(document).scrollLeft();
            boundRight = boundLeft + $(document).width();
            boundBottom = boundTop + $(document).height();
            elementAbove = {
              top: pos.top - actualHeight,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            elementBelow = {
              top: pos.top + pos.height,
              left: pos.left + pos.width / 2 - actualWidth / 2
            };
            elementLeft = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left - actualWidth
            };
            elementRight = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left + pos.width
            };
            elementBottomRight = {
              top: pos.top + pos.height,
              left: pos.left + pos.width / 2 - (actualWidth * 0.8)
            };
            elementBottomLeft = {
              top: pos.top + pos.height,
              left: pos.left + pos.width / 2 - (actualWidth * 0.2)
            };
            elementTopRight = {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - (actualWidth * 0.8)
            };
            elementTopLeft = {
              top: pos.top - actualHeight,
              left: pos.left + pos.width / 2 - (actualWidth * 0.2)
            };
            above       = isWithinBounds(elementAbove);
            below       = isWithinBounds(elementBelow);
            left        = isWithinBounds(elementLeft);
            right       = isWithinBounds(elementRight);
            bottomRight = isWithinBounds(elementBottomRight);
            bottomLeft  = isWithinBounds(elementBottomLeft);
            topRight    = isWithinBounds(elementTopRight);
            topLeft     = isWithinBounds(elementTopLeft);

            if (above) {
                return "top";
            } else if (topRight) {
                return "top-right";
            } else if (topLeft) {
                return "top-left";
            }

            else if (below) {
                return "bottom";
            } else if (bottomRight) {
                return "bottom-right";
            } else if (bottomLeft) {
                return "bottom-left";
            }

            else if(left) {
                return "left";
            } else if(right) {
                return "right";
            } else {
                // default
                return "bottom";
            }
              
        } 
	};
    medium.Share = {
        remove_sharetag : function(str){
        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        str = str.replace(/　/g,'');//去除中文空格
        str = str.replace(/(^\s*)|(\s*$)/g, ""); ;
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
        return str;
        },
        // share begin
        mb_strcut : function(str, maxlength, dot) {
            var len = 0;
            var res = '';
            str = this.remove_sharetag(str);
            var dot = !dot ? '...' : '';
            if (typeof page_charset == 'undefined') {
                page_charset = document.characterset;
            }
            maxlength = maxlength - dot.length;
            for ( var i = 0; i < str.length; i++) {
                len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (page_charset == 'utf-8' ? 3 : 2) : 1;
                if (len > maxlength) {
                    res += dot;
                    break;
                }
                res += str.substr(i, 1);
            }
            return res;
        },
        qqweibo : function(evt){
            var node = $(evt.target);
            var opt = this.getShareParam(node);
            var _title = '我正在tuturead阅读《'+opt.title+'》',_title = this.mb_strcut(_title+opt.summary,140),w=700,h=680;
            var _pic = !!opt.pic ? '&pic='+encodeURIComponent(opt.pic) :  '&pic='+encodeURIComponent(this.sitesharelogo);
            
            // var qqUrl = 'http://share.v.t.qq.com/index.php?c=share&a=index'
            //     +'&title='+encodeURIComponent(_title)+'&url='+encodeURIComponent(opt.url)
            //     +'&site='+encodeURIComponent('yasongju.tthuakan.com')
            //     +_pic;

            // this.opurl(qqUrl,'qqweibo',w,h);
        },
        sitesharelogo : 'http://www.tuturead.com/assets/img/logo-icon_75.png',
        tieba : function(opt){
            if (!!opt.summary){
                opt.summary = this.remove_sharetag(opt.summary);
            }
            var _title = '【'+opt.title+'】',_title = this.mb_strcut(_title+opt.summary,240),w=620,h=450;
            var _pic = !!opt.pic ? '&pic='+encodeURIComponent(TT_CONFIG.URL_CONSTANTS.RC_UPYUN_HTTP+opt.pic) : '&pic='+encodeURIComponent(this.sitesharelogo);
            var sinaUrl = 'http://tieba.baidu.com/f/commit/share/openShareApi?url='+encodeURIComponent(opt.url)
                +'&appkey='+TT_CONFIG.CONSTANTS.WEIBO_APPID
                +'&source=bshare'
                +'&retcode=0'
                +_pic
                +'&title='+encodeURIComponent(_title)+'(发表于:@吐吐网)'
                +'&appkey=&ralateUid=&dpc=1&state=1';
            // console.log(opt,111);    
            this.opurl(sinaUrl,'sinaweibo',w,h);
        },
        sinaweibo : function(opt){
            if (!!opt.summary){
                opt.summary = this.remove_sharetag(opt.summary);
            }
            var _title = '【'+opt.title+'】',_title = this.mb_strcut(_title+opt.summary,240),w=620,h=450;
            var _pic = !!opt.pic ? '&pic='+encodeURIComponent(TT_CONFIG.URL_CONSTANTS.RC_UPYUN_HTTP+opt.pic) : '&pic='+encodeURIComponent(this.sitesharelogo);
            var sinaUrl = 'http://service.weibo.com/share/share.php?url='+encodeURIComponent(opt.url)
                +'&appkey='+TT_CONFIG.CONSTANTS.WEIBO_APPID
                +'&source=bshare'
                +'&retcode=0'
                +_pic
                +'&title='+encodeURIComponent(_title)+'(发表于:@吐吐网)'
                +'&appkey=&ralateUid=&dpc=1&state=1';
            // console.log(opt,111);    
            this.opurl(sinaUrl,'sinaweibo',w,h);
            
        },
        douban : function(evt) {
            var node = $(evt.target);
            var opt = this.getShareParam(node);
            var _title = '我正在tuturead阅读《'+opt.title+'》。',_title = this.mb_strcut(_title,140),
            s1=window.getSelection,s2=document.getSelection,
            s3=document.selection,s=s1?s1():s2?s2():s3?s3.createRange().text:'',
            w=450,h=330;
            var _pic = !!opt.pic ? '&image='+encodeURIComponent(opt.pic) :  '&image='+encodeURIComponent(this.sitesharelogo);
            var _summary = this.mb_strcut(opt.summary,240);
            var doubanUrl = 'http://www.douban.com/recommend/?url='+encodeURIComponent(opt.url)
                +'&title='+encodeURIComponent(_title)
                +'&sel='+encodeURIComponent(_summary)
                +_pic
                +'&v=1';
                // +'&name='+encodeURIComponent(_summary)//encodeURIComponent(this.mb_strcut(opt.summary,140))
                // +'&text='+encodeURIComponent(_summary)
                

            this.opurl(doubanUrl,'douban',w,h);
        },
        opurl : function(r,name,w,h){
            var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
            var android = ( navigator.userAgent.match(/(android)/g) ? true : false );//
            if (iOS || android){
                var link = document.createElement('a');
                link.setAttribute("href", r);
                link.setAttribute("target", "_blank");

                var dispatch = document.createEvent("HTMLEvents");
                dispatch.initEvent("click", true, true);
                link.dispatchEvent(dispatch);
            }
            else{
                var x=function(){if(!window.open(r,name,'toolbar=0,resizable=1,scrollbars=yes,status=1,width='+w+',height='+h+',left='+(screen.width-w)/2+',top='+(screen.height-h)/2))location.href=r+'&r=1'};
                if(/Firefox/.test(navigator.userAgent)){setTimeout(x,0)}else{x()}
            }
        },
        
        weixin : function(node,opt){//node,_url,_css,_logo
            var _opts = $.extend({}, {container:'#screen-content'}, opt);
            // var _opts = {container:'#screen-content',url:_url,laycss:_css,logo:_logo};
            node.weixinpanel(_opts);//
        },
    };
    /**
     * 解析链接
     */
    var curUrls = [];
    function replaceUrl (value) {
       var reg = /(((https|http|ftp|rtsp|mms)?:\/\/)|(www\.))([0-9a-zA-Z\.\?\=\&\:\/_\-\#\,\;\%\@\!\+\|]+)/ig;
       var ms = value.match(reg);

       if(ms) {
           var _ms = unique(ms),
               ml  = _ms.length
               md = {};
           for(var i=0; i<ml; ++i) {
              var m = _ms[i],
                  _reg = new RegExp(m, 'gi');

              if (md[m]) return;
              md[m] = m;
              curUrls.push(m);

              var t = '<a class="btn-link" href="' + ((m.indexOf("http") != 0 && m.indexOf("https") != 0 && m.indexOf("ftp") != 0 && m.indexOf("mms") != 0) ? "http://" + m : m) + '" target="_blank">' + m + '</a>';
              value = value.replace(m, t);
           }
       }
       return value;
    };
    var uidUsers = {};
    function replaceUidToName (value, v) {
        if(!value) return value;

        var users = getUserInValue() || [],
            html = "", ul = users.length;

        for(var i=0; i<ul; ++i) {
            var user = users[i];
            user = user.replace("@", "");

            var _uo = eval("(" + user + ")");

            html = '<span class="anchor" node-type="showOSMessage" data="' + _uo.uid + '"><a class="btn-link" href="javascript:;">@' + _uo.name + '</a></span> ';//' + base_path + 'homeim/' + _uo.uid + '

            if(!v) {
                if(!uidUsers["@" + _uo.name + " "]) uidUsers["@" + _uo.name + " "] = html;
                html = '@' + _uo.name + ' ';

                // html = repaceNameToNode(html);
            }

            value = value.replace("@" + user, html);
        }

        function getUserInValue()
        {
            var reg = /(\@\{[^\@\s\{]+\}{1})/ig;
            return value.match(reg);
        }

        return value;
    };
    /**
     * 将内容中的@+name转换为可点击的@
     */
    function repaceNameToNode (value) {
        var reg = /(\@[^\#\@\￥\%\^\&\*\(\)\+\{\}\[\]\|\:\;\"\'\<\>\?\/\,\!\~\`\ ]+ {1})/ig,
            matchs = value.match(reg);

        if(matchs && matchs.length > 0) {
            var ml = matchs.length;
            for(var i=0; i<ml; ++i) {
                var match = matchs[i];

                if(/ $/.test(match)) {
                    match = match.replace(/ {2,}$/, ' ');
                } else {
                    value = value.replace(match, match + ' ');
                    match += ' ';
                }

                var html = uidUsers[match] || match;
                value = value.replace(match, html);
            }
        }

        return value;
    };

    /**
     * 将文字转换为表情
     */
    function transitionImage (message) {
        var reg = /(\[[^\[\#\@\*\]]*\])/ig,
            matchs = message.match(reg),
            ml = (matchs && matchs.length) || 0;

        for(var i=0; i<ml; ++i) {
            var _m = matchs[i],
                image = _transitionImage(_m);
            message = message.replace(_m, image);
        }

        function _transitionImage(bq) {
            var bqData = TT.Util.RC_FACE, bl = bqData.length, image = bq;
            for(var i=0; i<bl; ++i) {
                var bqd = bqData[i], face = bqd.key;
                if(bq != face) continue;

                var url = bqd.wurlg;
                image = '<img style="display:inline;" width="22" height="22" src="' + url + '" />';
                break;
            }
            return image;
        }
        return message;
    };

    /**
     * 高级功能 替换米号
     */
    function replaceMH (value) {
        var r = /([\*\×][^\*\#\@\n\[\]\×]+[\*\×])/ig,
            ms = value.match(r) || [],
            ml = ms.length, v = '';

        for(var i=0; i<ml; ++i) {
            var _v = ms[i], wz = '';
            wz = _v.replace(/[\*\×]/g, '');

            wz = '<b style="font-weight:bold;">' + wz + '</b>';

            value = value.replace(_v, wz);
        }
        return value;
    };

    /**
     * 解析 ！！解析为加粗//解析为斜体--解析为删除线
     */
    function replaceSpecialStr (value) {
        //匹配&号
        var reg = /(\&[^\\\&\<\>\#\@\n\[\]\;\.\,\(\)\$]+\&)/ig;
        matchs = value.match(reg),
        ml = (matchs && matchs.length) || 0;

        for(var i=0; i<ml; ++i) {
            var _m = matchs[i],
                urls = curUrls.join('');

            if (urls.indexOf(_m) > -1) continue;

            var topic = transition(_m);
            value = value.replace(new RegExp(_m, 'g'), topic);
        }

        function transition(t) {
            var _t = t.replace(/\&/g, '');

            if($.trim(_t) == '') return t;
            return '<span style="color:red;">' + _t + '</span>';
        }

        return value;
    };
    function parseBrTag (value) {
        value = value.replace(/\r|\n|\r\n/g, '\n');//.replace(/\\/ig, '')
        value = value.replace(/\n{2,}/g, '\n\n');
        return value;
    };

    function newReplaceValueRN (value) {
        value = $.trim(value) + ' ';
        //合并多行为一行
        value = parseBrTag(value);
        var varr = value.split(/\n/), hl = varr.length,
            mnode = '<span><span style="font-weight:bold;"> ...</span><br /><span class="more btn-link" data-action-type="openMessage" style="margin-left:0;font-size:12px;">展开此信息»</span></span>';

        if (hl > 6) {
            value = '<div style="max-height:92px;_height:92px;overflow:hidden;">' + value + '</div>' + mnode;
        };

        return value;
    }

    function replaceValueRN (value) {
        value = $.trim(value) + ' ';
        //合并多行为一行
        value = parseBrTag(value);
        var varr = value.split(/\n/), hl = varr.length,
            mnode = '<span><span style="font-weight:bold;"> ...</span><br /><span class="more btn-link" data-action-type="openMessage" style="margin-left:0;font-size:12px;">展开此信息»</span></span>';
        if(hl > 7) {
            var nvr = '', nvar = '';
            for(var i=0; i<hl; ++i) {
                if(i < 5) {
                    nvr += varr[i] + '\n';
                } else {
                    nvar += varr[i] + '\n';
                }
            }
            if(nvr.length < 260) {
                if (TT.$.trim(nvar) != '') {
                    value = nvr + '<span style="display:none;">' + nvar + '</span>' + mnode;
                } else {
                    value = value;
                }
            } else {
                var end = 200, position = getValuePosition(value, end);
                if(position && position.end) end = position.end;

                var q400 = value.substring(0, end), hv = value.substring(end);
                if (TT.$.trim(hv) != '') {
                    value = q400 + '<span style="display:none;">' + hv + '</span>' + mnode;
                } else {
                    value = q400;
                }
            }
        } else {
            if(value.length >= 260) {
                var end = 200, position = getValuePosition(value, end);
                if(position && position.end) end = position.end;

                var q400 = value.substring(0, end), hv = value.substring(end);

                if (TT.$.trim(hv) != '') {
                    value = q400 + '<span style="display:none;">' + hv + '</span>' + mnode;
                } else {
                    value = q400;
                }
            }
        }

        return value;
    };

    /**
     * 特殊字符的类型
     */
    function getValuePosition(value, num) {
        var regs = [/(\#[\u4e00-\u9fa5A-Za-z0-9]+\#)/i,
                    /(\&[^\\\&\<\>\#\@\n\[\]\;]+\&)/ig,
                    /(\@[^\#\@\￥\%\^\&\*\(\)\+\{\}\[\]\|\:\;\"\'\<\>\?\/\,\!\~\`\ ]+ {1})/ig,
                    /(\*[^\*\#\@\n\[\]]+\*)/ig,
                    /(((https|http|ftp|rtsp|mms)?:\/\/)|(www\.))([0-9a-zA-Z.?=&:\/_\-#,;%@!\+\|<>]+)/ig,
                    /(\[[^\[\#\@\*\]]*\])/ig],
            position = {}, rl = regs.length;

        topFor : for(var i=0; i<rl; ++i) {
            var reg = regs[i],
                matchs = value.match(reg),
                start = 0, end = 0;

            if(matchs && matchs.length > 0) {
                var ml = matchs.length;

                for(var j=0; j<ml; ++j) {
                    var f = matchs[j],
                        start = value.indexOf(f),
                        end = start + f.length;

                    if(i == 2 && !uidUsers[f]) continue;

                    if(start <= num && end > num) {
                        position.start = start;
                        position.end = end;

                        break topFor;
                    }
                }
            }
        }
        return position;
    }

    /**
     * 转换话题节点
     */
    function transitionTopicValue (message) {
        if(!message) return '';

        var reg = /(\#[\u4e00-\u9fa5A-Za-z0-9]+\#)/g;///(\#[^\#\@\.\%\^\&\*\(\)\+\{\}\[\]\|\:\;\"\'\<\>\?\/\,\!\~\`\s\-\_]+\#)/ig;///(\#[\w\u4E00-\u9FA5\_]*\#)/ig,
            matchs = message.match(reg),
            ml = (matchs && matchs.length) || 0;

        for(var i=0; i<ml; ++i) {
            var _m = matchs[i],
                topic = transition(_m);
            message = message.replace(new RegExp(_m, 'g'), topic);
        }

        function transition(t) {
            var _t = t.replace(/\#/g, '');
            if($.trim(_t) == '') return t;
            return '<a class="btn-link" href="javascript:;" data-topic="' + _t + '" node-type="messageTopicNode">#' + _t + '#</a>';
        }

        return message;
    };
})(window.jQuery);
;(function($){
    var weixinpanel = function(element,options){
    
        this.$el = $(element);
        this.options = $.extend({}, $.fn.weixinpanel.defaults, options);
        this.initialized();
    };
      
    weixinpanel.prototype = {
        initialized : function(){
            this.setup();
            this.settings = {};
            $.extend(this.settings, TT);
            this.settings.delegateEvents(this);//继承events事件
            if(this.options.isshow){
                this.show();
            }
            
        },
        events : {
            'click' : 'togglepop'
        },

        setup : function(){
            var options = this.options;
            this.popid =  (this.options.container) ? medium.Util.generate_random_id('popwx-') : 'popwx-';
            
            var html = $('#popweixin').tmpl({'id':this.popid,'url':encodeURIComponent(this.options.url),'laycss':this.options.laycss,'logo':this.options.logo,'qrtitle':this.options.qrtitle,'isdownqr':this.options.isdownqr,'isnamecard':this.options.isnamecard});
            $tip = $(html);
            this.placement = this.$el.attr('placement');

            if (typeof this.options.container == 'string'){
                this.options.container=$(this.options.container);
                if (this.options.container.length==0){
                    this.options.container=$('#container');
                }
            }
            this.options.container ? $tip.appendTo(this.options.container) : $tip.appendTo(this.$el);
            //this.$el.html(html);
            

            this.$popwx = $('#'+this.popid);
            this.$masker = $('#masker');
            var zIndex = parseInt(this.$masker.filter(function() {
                return $(this).css('z-index') != 'auto';
            }).first().css('z-index'))+50;
            // this.show();
            this.$popwx.delegate('[data-type="weixinclose"]', 'click', $.proxy(function(event) {
                this.hide();
            },this));
            this.$popwx.css({'z-index':zIndex});
        },
        togglepop : function(evt) {
            if (!this.$popwx.hasClass('fade')){
                console.log();
            
                var _callback = this.options.showcallback,
                _scope = this.options.showscope;
                if (TT.isFunction(_callback)) {
                    _callback.apply(_scope, arguments);
                };
                //_hmt.push(['_trackEvent', 'share', 'click', 'weixin']);
                
                this.show();
            }
            else{
                this.hide();
            }
        },
        show : function(){
            if (!!this.options.isnamecard){
                $img = this.$el;
                this.options.url = $img.attr('src');
                // _uid = $img.attr('uid');
                // _src = '/ttcode/gzh?wxqruid='+_uid;
                this.$popwx.find('[node-type="qrcode"]').attr('src',this.options.url);
            } 
            this.$popwx.show().addClass('fade in');
            if (!!this.placement && this.placement=='center'){
                this.$popwx.css({
                    "top": "50%","left": "50%",
                    "margin-top": function () {
                        return - ($(this).outerHeight() / 2);
                    },
                    'margin-left': function () {
                        return -($(this).outerWidth() / 2);
                    }
                });
            }
            setTimeout($.proxy(function(){
                $('html').off('click.weixin.data-api').on('click.weixin.data-api', $.proxy(function (e) {
                  if (!!e && ($(e.target).closest('[data-type="pop-weixin"]').length>0 || $(e.target).closest('[data-action="share-on-weixin"]').length>0)){
                    e.stopPropagation() ;
                  }
                  else{
                    this.hide();
                  }
                },this));
            },this),20);
        },
        hide : function(){
            $('html').off('click.weixin.data-api');
            this.$popwx.hide().removeClass('fade in');
        }
    };
    
    $.fn.weixinpanel = function (option) {
       
      return this.each(function(input_field) {
            
        var $this = $(this)
            , data = $this.data('weixinpanel')
            , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('weixinpanel', (data = new weixinpanel(this, options)))
            }
            else if(typeof option == 'object' && option){
                data['show']();
            }
            if (typeof option == 'string') data[option]();
          }); 
    };
    $.fn.weixinpanel.defaults = {url:'',content:'',heading:'',laycss:'',logo:'',qrtitle:'微信发送给好友/朋友圈','isdownqr':false,'isnamecard':false,'isshow':false};
    
})(window.jQuery);
/**
 * [description]
 * confirmpanel 
 * @author fugang
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;(function($){
	var confirmpanel = function(element,options){
    
        this.$el = $(element);
        this.options = $.extend({}, $.fn.confirmpanel.defaults, options);
        this.initialized();
    };
      
    confirmpanel.prototype = {
        initialized : function(){
            this.setup();
            this.settings = {};
            $.extend(this.settings, TT);
            this.settings.delegateEvents(this);//继承events事件
        },
        events : {
            'click [data-action="overlayconfirm"]' : 'overlayconfirm',
            'click [data-action="overlaycancel"]' : 'overlaycancel',
            'click [node-type="ajaxconfirm"]' : 'overlayclick'
        },
        setup : function(){
            var options = this.options;
            var html = $('#confirmbox').tmpl({'heading':options.heading,'body':options.body,'ok_text':options.ok_text});
            this.$el.html(html);
            this.$overlay = this.$el.find('[data-action-scope="overlay"]');
            this.$cfgDlg = this.$el.find('.overlay-dialog');
            this.show();
        },
        reset : function (options){
        	this.options = $.extend({}, $.fn.confirmpanel.defaults, options);
        	this.setup();
        },
        show : function() {
        	
            this.$overlay.show();
            this.$cfgDlg.show().modal('show').css({
                "top":"100px",
                // "margin-top": function () {
                //     return - (174);//$(this).outerHeight() / 2
                // },
                'margin-left': function () {
                    return -($(this).outerWidth() / 2);
                }
            });
        },
        hide : function(){
            this.$cfgDlg.modal('hide');
        },
        overlayclick : function(evt){
            if ($(evt.target).closest('.overlay-dialog').length>0){
                evt.stopPropagation();
                return;
            }
            this.$el.trigger('confirm.cancel');
            this.overlayclose();
            //this.$cfgDlg.modal('hide');
        },
        overlayclose : function(evt){
            this.hide();
            this.$overlay.hide();
            // $(evt.target).closest('[data-action-scope="overlay"]').remove();
        },
        overlayconfirm : function(evt){
            this.overlayclose(evt);
            this.$el.trigger('confirm.ok');
            evt.stopPropagation();
            return;
        },
        
        overlaycancel : function(evt){
            this.overlayclose(evt);
            this.$el.trigger('confirm.cancel');
            evt.stopPropagation();
            return;
        },
    };
    
    $.fn.confirmpanel = function (option) {
       
      return this.each(function(input_field) {
            
        var $this = $(this)
            , data = $this.data('confirmpanel')
            , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('confirmpanel', (data = new confirmpanel(this, options)))
            }
            else if(typeof option == 'object' && option){
                data['reset'](option);
            }
            if (typeof option == 'string') data[option]();
          }); 
    };
    $.fn.confirmpanel.defaults = {
        heading: '',
        body:'Body contents',
        callback : null,
        ok_text : '确认'
    };
	// $.fn.extend({
 //        //pass the options variable to the function
 //        confirmModal: function (options) {
 //    //        
 //            var context = $(this);
 //            $('#ajaxConfirm',this).click(function(evt){
 //            	if ($(evt.target).closest('.overlay-dialog').length>0){
 //            		evt.stopPropagation();
 //            		return;
 //            	}
 //            	$cfgDlg.modal('hide');
 //            });
            
 //            $('#confirmCancelBtn',this).click(function(evt){
 //                $cfgDlg.modal('hide');
 //                evt.stopPropagation();
 //                    return;
 //            });
            
 //            $('#confirmYesBtn',this).click(function(evt){
 //                if(options.callback!=null)
 //                    options.callback();
 //                $cfgDlg.modal('hide');
 //                evt.stopPropagation();
 //                    return;
 //            });
 //        }
 //    });
})(window.jQuery);
;(function(e) {
    var t, o, n = {
        className: "autosizejs",
        append: "",
        callback: !1
    },
    i = "hidden",
    s = "border-box",
    a = "lineHeight",
    l = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',
    r = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
    c = "oninput",
    h = "onpropertychange",
    p = e(l).data("autosize", !0)[0];
    p.style.lineHeight = "99px",
    "99px" === e(p).css(a) && r.push(a),
    p.style.lineHeight = "",
    e.fn.autosize = function(a) {
        return a = e.extend({},
        n, a || {}),
        p.parentNode !== document.body && (e(document.body).append(p), p.value = "\n\n\n", p.scrollTop = 9e4, t = p.scrollHeight === p.scrollTop + p.clientHeight),
        this.each(function() {
            function n() {
                o = b,
                p.className = a.className,
                e.each(r,
                function(e, t) {
                    p.style[t] = f.css(t)
                })
            }
            function l() {
                var e, s, l;
                if (o !== b && n(), !d) {
                    d = !0,
                    p.value = b.value + a.append,
                    p.style.overflowY = b.style.overflowY,
                    l = parseInt(b.style.height, 10),
                    p.style.width = Math.max(f.width(), 0) + "px",
                    t ? e = p.scrollHeight: (p.scrollTop = 0, p.scrollTop = 9e4, e = p.scrollTop);
                    var r = parseInt(f.css("maxHeight"), 10);
                    r = r && r > 0 ? r: 9e4,
                    e > r ? (e = r, s = "scroll") : u > e && (e = u),
                    e += x,
                    b.style.overflowY = s || i,
                    l !== e && (b.style.height = e + "px", w && a.callback.call(b)),
                    setTimeout(function() {
                        d = !1
                    },
                    1)
                }
            }
            var u, d, g, b = this,
            f = e(b),
            x = 0,
            w = e.isFunction(a.callback);
            f.data("autosize") || ((f.css("box-sizing") === s || f.css("-moz-box-sizing") === s || f.css("-webkit-box-sizing") === s) && (x = f.outerHeight() - f.height()), u = Math.max(parseInt(f.css("minHeight"), 10) - x, f.height()), g = "none" === f.css("resize") || "vertical" === f.css("resize") ? "none": "horizontal", f.css({
                overflow: i,
                overflowY: i,
                wordWrap: "break-word",
                resize: g
            }).data("autosize", !0), h in b ? c in b ? b[c] = b.onkeyup = l: b[h] = l: b[c] = l, e(window).on("resize",
            function() {
                d = !1,
                l()
            }), f.on("autosize",
            function() {
                d = !1,
                l()
            }), l())
        })
    }
})(window.jQuery || window.Zepto);
/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
;(function( jQuery, undefined ){
    var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

    function newTmplItem( options, parentItem, fn, data ) {
        // Returns a template item data structure for a new rendered instance of a template (a 'template item').
        // The content field is a hierarchical array of strings and nested items (to be
        // removed and replaced by nodes field of dom elements, once inserted in DOM).
        var newItem = {
            data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
            _wrap: parentItem ? parentItem._wrap : null,
            tmpl: null,
            parent: parentItem || null,
            nodes: [],
            calls: tiCalls,
            nest: tiNest,
            wrap: tiWrap,
            html: tiHtml,
            update: tiUpdate
        };
        if ( options ) {
            jQuery.extend( newItem, options, { nodes: [], parent: parentItem });
        }
        if ( fn ) {
            // Build the hierarchical content to be used during insertion into DOM
            newItem.tmpl = fn;
            newItem._ctnt = newItem._ctnt || newItem.tmpl( jQuery, newItem );
            newItem.key = ++itemKey;
            // Keep track of new template item, until it is stored as jQuery Data on DOM element
            (stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
        }
        return newItem;
    }

    // Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
            var ret = [], insert = jQuery( selector ), elems, i, l, tmplItems,
                parent = this.length === 1 && this[0].parentNode;

            appendToTmplItems = newTmplItems || {};
            if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
                insert[ original ]( this[0] );
                ret = this;
            } else {
                for ( i = 0, l = insert.length; i < l; i++ ) {
                    cloneIndex = i;
                    elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery( insert[i] )[ original ]( elems );
                    ret = ret.concat( elems );
                }
                cloneIndex = 0;
                ret = this.pushStack( ret, name, insert.selector );
            }
            tmplItems = appendToTmplItems;
            appendToTmplItems = null;
            jQuery.tmpl.complete( tmplItems );
            return ret;
        };
    });

    jQuery.fn.extend({
        // Use first wrapped element as template markup.
        // Return wrapped set of template items, obtained by rendering template against data.
        tmpl: function( data, options, parentItem ) {
            return jQuery.tmpl( this[0], data, options, parentItem );
        },

        // Find which rendered template item the first wrapped DOM element belongs to
        tmplItem: function() {
            return jQuery.tmplItem( this[0] );
        },

        // Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
        template: function( name ) {
            return jQuery.template( name, this[0] );
        },

        domManip: function( args, table, callback, options ) {
            if ( args[0] && jQuery.isArray( args[0] )) {
                var dmArgs = jQuery.makeArray( arguments ), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
                while ( i < elemsLength && !(tmplItem = jQuery.data( elems[i++], "tmplItem" ))) {}
                if ( tmplItem && cloneIndex ) {
                    dmArgs[2] = function( fragClone ) {
                        // Handler called by oldManip when rendered template has been inserted into DOM.
                        jQuery.tmpl.afterManip( this, fragClone, callback );
                    };
                }
                oldManip.apply( this, dmArgs );
            } else {
                oldManip.apply( this, arguments );
            }
            cloneIndex = 0;
            if ( !appendToTmplItems ) {
                jQuery.tmpl.complete( newTmplItems );
            }
            return this;
        }
    });

    jQuery.extend({
        // Return wrapped set of template items, obtained by rendering template against data.
        tmpl: function( tmpl, data, options, parentItem ) {
            var ret, topLevel = !parentItem;
            if ( topLevel ) {
                // This is a top-level tmpl call (not from a nested template using {{tmpl}})
                parentItem = topTmplItem;
                tmpl = jQuery.template[tmpl] || jQuery.template( null, tmpl );
                wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
            } else if ( !tmpl ) {
                // The template item is already associated with DOM - this is a refresh.
                // Re-evaluate rendered template for the parentItem
                tmpl = parentItem.tmpl;
                newTmplItems[parentItem.key] = parentItem;
                parentItem.nodes = [];
                if ( parentItem.wrapped ) {
                    updateWrapped( parentItem, parentItem.wrapped );
                }
                // Rebuild, without creating a new template item
                return jQuery( build( parentItem, null, parentItem.tmpl( jQuery, parentItem ) ));
            }
            if ( !tmpl ) {
                return []; // Could throw...
            }
            if ( typeof data === "function" ) {
                data = data.call( parentItem || {} );
            }
            if ( options && options.wrapped ) {
                updateWrapped( options, options.wrapped );
            }
            ret = jQuery.isArray( data ) ?
                jQuery.map( data, function( dataItem ) {
                    return dataItem ? newTmplItem( options, parentItem, tmpl, dataItem ) : null;
                }) :
                [ newTmplItem( options, parentItem, tmpl, data ) ];
            return topLevel ? jQuery( build( parentItem, null, ret ) ) : ret;
        },

        // Return rendered template item for an element.
        tmplItem: function( elem ) {
            var tmplItem;
            if ( elem instanceof jQuery ) {
                elem = elem[0];
            }
            while ( elem && elem.nodeType === 1 && !(tmplItem = jQuery.data( elem, "tmplItem" )) && (elem = elem.parentNode) ) {}
            return tmplItem || topTmplItem;
        },

        // Set:
        // Use $.template( name, tmpl ) to cache a named template,
        // where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
        // Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

        // Get:
        // Use $.template( name ) to access a cached template.
        // Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
        // will return the compiled template, without adding a name reference.
        // If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
        // to $.template( null, templateString )
        template: function( name, tmpl ) {
            if (tmpl) {
                // Compile template and associate with name
                if ( typeof tmpl === "string" ) {
                    // This is an HTML string being passed directly in.
                    tmpl = buildTmplFn( tmpl );
                } else if ( tmpl instanceof jQuery ) {
                    tmpl = tmpl[0] || {};
                }
                if ( tmpl.nodeType ) {
                    // If this is a template block, use cached copy, or generate tmpl function and cache.
                    tmpl = jQuery.data( tmpl, "tmpl" ) || jQuery.data( tmpl, "tmpl", buildTmplFn( tmpl.innerHTML ));
                    // Issue: In IE, if the container element is not a script block, the innerHTML will remove quotes from attribute values whenever the value does not include white space.
                    // This means that foo="${x}" will not work if the value of x includes white space: foo="${x}" -> foo=value of x.
                    // To correct this, include space in tag: foo="${ x }" -> foo="value of x"
                }
                return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
            }
            // Return named compiled template
            return name ? (typeof name !== "string" ? jQuery.template( null, name ):
                (jQuery.template[name] ||
                    // If not in map, and not containing at least on HTML tag, treat as a selector.
                    // (If integrated with core, use quickExpr.exec)
                    jQuery.template( null, htmlExpr.test( name ) ? name : jQuery( name )))) : null;
        },

        encode: function( text ) {
            // Do HTML encoding replacing < > & and ' and " by corresponding entities.
            return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
        }
    });

    jQuery.extend( jQuery.tmpl, {
        tag: {
            "tmpl": {
                _default: { $2: "null" },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
                // tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
                // This means that {{tmpl foo}} treats foo as a template (which IS a function).
                // Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
            },
            "wrap": {
                _default: { $2: "null" },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            "each": {
                _default: { $2: "$index, $value" },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: { $1: "true" },
                open: "}else if(($notnull_1) && $1a){"
            },
            "html": {
                // Unecoded expression evaluation.
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                // Encoded expression evaluation. Abbreviated form is ${}.
                _default: { $1: "$data" },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                // Comment tag. Skipped by parser
                open: ""
            }
        },

        // This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
        complete: function( items ) {
            newTmplItems = {};
        },

        // Call this from code which overrides domManip, or equivalent
        // Manage cloning/storing template items etc.
        afterManip: function afterManip( elem, fragClone, callback ) {
            // Provides cloned fragment ready for fixup prior to and after insertion into DOM
            var content = fragClone.nodeType === 11 ?
                jQuery.makeArray(fragClone.childNodes) :
                fragClone.nodeType === 1 ? [fragClone] : [];

            // Return fragment to original caller (e.g. append) for DOM insertion
            callback.call( elem, fragClone );

            // Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
            storeTmplItems( content );
            cloneIndex++;
        }
    });

    //========================== Private helper functions, used by code above ==========================

    function build( tmplItem, nested, content ) {
        // Convert hierarchical content into flat string array
        // and finally return array of fragments ready for DOM insertion
        var frag, ret = content ? jQuery.map( content, function( item ) {
            return (typeof item === "string") ?
                // Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
                (tmplItem.key ? item.replace( /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2" ) : item) :
                // This is a child template item. Build nested template.
                build( item, tmplItem, item._ctnt );
        }) :
        // If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}.
        tmplItem;
        if ( nested ) {
            return ret;
        }

        // top-level template
        ret = ret.join("");

        // Support templates which have initial or final text nodes, or consist only of text
        // Also support HTML entities within the HTML markup.
        ret.replace( /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function( all, before, middle, after) {
            frag = jQuery( middle ).get();

            storeTmplItems( frag );
            if ( before ) {
                frag = unencode( before ).concat(frag);
            }
            if ( after ) {
                frag = frag.concat(unencode( after ));
            }
        });
        return frag ? frag : unencode( ret );
    }

    function unencode( text ) {
        // Use createElement, since createTextNode will not render HTML entities correctly
        var el = document.createElement( "div" );
        el.innerHTML = text;
        return jQuery.makeArray(el.childNodes);
    }

    // Generate a reusable function that will serve to render a template against data
    function buildTmplFn( markup ) {
        return new Function("jQuery","$item",
            // Use the variable __ to hold a string array while building the compiled template. (See https://github.com/jquery/jquery-tmpl/issues#issue/10).
            "var $=jQuery,call,__=[],$data=$item.data;" +

            // Introduce the data as local variables using with(){}
            "with($data){__.push('" +

            // Convert the template into pure JavaScript
            jQuery.trim(markup)
                .replace( /([\\'])/g, "\\$1" )
                .replace( /[\r\t\n]/g, " " )
                .replace( /\$\{([^\}]*)\}/g, "{{= $1}}" )
                .replace( /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
                function( all, slash, type, fnargs, target, parens, args ) {
                    var tag = jQuery.tmpl.tag[ type ], def, expr, exprAutoFnDetect;
                    if ( !tag ) {
                        throw "Unknown template tag: " + type;
                    }
                    def = tag._default || [];
                    if ( parens && !/\w$/.test(target)) {
                        target += parens;
                        parens = "";
                    }
                    if ( target ) {
                        target = unescape( target );
                        args = args ? ("," + unescape( args ) + ")") : (parens ? ")" : "");
                        // Support for target being things like a.toLowerCase();
                        // In that case don't call with template item as 'this' pointer. Just evaluate...
                        expr = parens ? (target.indexOf(".") > -1 ? target + unescape( parens ) : ("(" + target + ").call($item" + args)) : target;
                        exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
                    } else {
                        exprAutoFnDetect = expr = def.$1 || "null";
                    }
                    fnargs = unescape( fnargs );
                    return "');" +
                        tag[ slash ? "close" : "open" ]
                            .split( "$notnull_1" ).join( target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true" )
                            .split( "$1a" ).join( exprAutoFnDetect )
                            .split( "$1" ).join( expr )
                            .split( "$2" ).join( fnargs || def.$2 || "" ) +
                        "__.push('";
                }) +
            "');}return __;"
        );
    }
    function updateWrapped( options, wrapped ) {
        // Build the wrapped content.
        options._wrap = build( options, true,
            // Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
            jQuery.isArray( wrapped ) ? wrapped : [htmlExpr.test( wrapped ) ? wrapped : jQuery( wrapped ).html()]
        ).join("");
    }

    function unescape( args ) {
        return args ? args.replace( /\\'/g, "'").replace(/\\\\/g, "\\" ) : null;
    }
    function outerHtml( elem ) {
        var div = document.createElement("div");
        div.appendChild( elem.cloneNode(true) );
        return div.innerHTML;
    }

    // Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
    function storeTmplItems( content ) {
        var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
        for ( i = 0, l = content.length; i < l; i++ ) {
            if ( (elem = content[i]).nodeType !== 1 ) {
                continue;
            }
            elems = elem.getElementsByTagName("*");
            for ( m = elems.length - 1; m >= 0; m-- ) {
                processItemKey( elems[m] );
            }
            processItemKey( elem );
        }
        function processItemKey( el ) {
            var pntKey, pntNode = el, pntItem, tmplItem, key;
            // Ensure that each rendered template inserted into the DOM has its own template item,
            if ( (key = el.getAttribute( tmplItmAtt ))) {
                while ( pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute( tmplItmAtt ))) { }
                if ( pntKey !== key ) {
                    // The next ancestor with a _tmplitem expando is on a different key than this one.
                    // So this is a top-level element within this template item
                    // Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
                    pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute( tmplItmAtt ) || 0)) : 0;
                    if ( !(tmplItem = newTmplItems[key]) ) {
                        // The item is for wrapped content, and was copied from the temporary parent wrappedItem.
                        tmplItem = wrappedItems[key];
                        tmplItem = newTmplItem( tmplItem, newTmplItems[pntNode]||wrappedItems[pntNode] );
                        tmplItem.key = ++itemKey;
                        newTmplItems[itemKey] = tmplItem;
                    }
                    if ( cloneIndex ) {
                        cloneTmplItem( key );
                    }
                }
                el.removeAttribute( tmplItmAtt );
            } else if ( cloneIndex && (tmplItem = jQuery.data( el, "tmplItem" )) ) {
                // This was a rendered element, cloned during append or appendTo etc.
                // TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
                cloneTmplItem( tmplItem.key );
                newTmplItems[tmplItem.key] = tmplItem;
                pntNode = jQuery.data( el.parentNode, "tmplItem" );
                pntNode = pntNode ? pntNode.key : 0;
            }
            if ( tmplItem ) {
                pntItem = tmplItem;
                // Find the template item of the parent element.
                // (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
                while ( pntItem && pntItem.key != pntNode ) {
                    // Add this element as a top-level node for this rendered template item, as well as for any
                    // ancestor items between this item and the item of its parent element
                    pntItem.nodes.push( el );
                    pntItem = pntItem.parent;
                }
                // Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
                delete tmplItem._ctnt;
                delete tmplItem._wrap;
                // Store template item as jQuery data on the element
                jQuery.data( el, "tmplItem", tmplItem );
            }
            function cloneTmplItem( key ) {
                key = key + keySuffix;
                tmplItem = newClonedItems[key] =
                    (newClonedItems[key] || newTmplItem( tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent ));
            }
        }
    }

    //---- Helper functions for template item ----

    function tiCalls( content, tmpl, data, options ) {
        if ( !content ) {
            return stack.pop();
        }
        stack.push({ _: content, tmpl: tmpl, item:this, data: data, options: options });
    }

    function tiNest( tmpl, data, options ) {
        // nested template, using {{tmpl}} tag
        return jQuery.tmpl( jQuery.template( tmpl ), data, options, this );
    }

    function tiWrap( call, wrapped ) {
        // nested template, using {{wrap}} tag
        var options = call.options || {};
        options.wrapped = wrapped;
        // Apply the template, which may incorporate wrapped content,
        return jQuery.tmpl( jQuery.template( call.tmpl ), call.data, options, call.item );
    }

    function tiHtml( filter, textOnly ) {
        var wrapped = this._wrap;
        return jQuery.map(
            jQuery( jQuery.isArray( wrapped ) ? wrapped.join("") : wrapped ).filter( filter || "*" ),
            function(e) {
                return textOnly ?
                    e.innerText || e.textContent :
                    e.outerHTML || outerHtml(e);
            });
    }

    function tiUpdate() {
        var coll = this.nodes;
        jQuery.tmpl( null, null, null, this).insertBefore( coll[0] );
        jQuery( coll ).remove();
    }
})( jQuery );

/**
     * 框架总控文件
     * @class
     * @name router
     */
    var _ttapp = function (){
        this.init();
    };
    
    _ttapp.prototype =/** @lends router.prototype */ {
        /**
         * 初始化框架
         */
        init : function(){
            this.addEvents();
        },
        /**
         * 验证URL跳转
         * @param link{string} 链接地址
         * @param evtType{string} 类型
         * @param _el{object} 节点
         */
        navigate : function (link,evtType,_el) {
            var that = this,args = Array.prototype.slice.call( arguments, 0 );

            this.loading(true);

            $( "#screen-content [data-original-title]" ).each(function( index ) {
              $(this).tooltip('destroy');
            });
            if(!!_el && _el == 'reload'){
                that.refresh(link,'',_el);//location.pathname
            }else{
                that.refresh(link,_el);//location.pathname
            }
        },

        /**
         * 业务分发中心
         * @param link {string} 链接地址
         * @param _el {object} 当前节点
         * @param calloperate
         */
        refresh : function(link,_el,calloperate){
            customEventHandler['stoppost']();//编辑器停止自动保存
            //针对页面刷新时的处理
            var evtType = null,args=[],link=link.toLowerCase(),that = this;
            //有包含多个路由时，需要加上其他条件
            var pmatch = link.match(/\/p\/(\w+)/);//p router for draft'post (no coll)
            var cmatch = link.match(/\/hc\/(\w+)/);//c router for collection'post
            var collmatch = link.match(/\/coll\/(\w+)/);//collection router
            var colleditmatch = link.match(/\/coll\/(\w+)\/settings/);//collection router
            //var newcollmatch = link.match(/\/newcollection/);//newcollection router
            var newcollmatch = link.match(/\/collection\/create_collection/);//newcollection router
            
            var newalbummusic = link.match(/\/newalbummusic/);//newAlbumMusic router
            var colllistmatch = link.match(/\/collections/);//collection/getCollections
            var newcolllldmatch = link.match(/\/newcollbylld\/(\w+)/);//collection/getCollections
            
            var editpostmatch = link.match(/(\/me\/newpost)|(\/me\/import)|(\/p\/(\w+)\/edit)/);//newpost or editdraft post router |(\/c\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/edit)
            var h5editpostmatch = link.match(/(\/h5\/newpost)|(\/h5\/pedit\/(\w+))|(\/wxoinfo\/(\w+)\/newpost)/);//newpost or editdraft post router |(\/c\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/edit)
            var editlldpostmatch = link.match(/(\/newlldpost)|(\/p\/(\w+)\/edit)|(\/c\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/edit)/);//newpost or editdraft post router
            
            var editlldmatch = link.match(/(\/clld\/(\w+)\/(\w+)\/edit)/);//lld for edit
            // var cmatch = link.match(/\/c\/(\w+)\/(\w+)\/(\w+)/);//c router //http://www.tt.me/c/d8cy8z/by77q6/1384138194742
            var usermatch = link.match(/\/post\/u\/(\w+)/);//post/u(已废弃)
            var mesetmatch = link.match(/\/me\/settings/);
            var registermatch = link.match(/\/user\/create_userinfo/);
            var rootmatch = link.match(/\/root\/(\w+)/);

            var pagematch = link.match(/(\/paged\/(\w+))|(\/me\/drafts)|(\/me\/drafts\/paged\/(\w+))/);
            var serializesmatch =  link.match(/\/me\/serialize/);//连载列表
            var serializepostmatch = link.match(/\/me\/serializepost/);//连载文章列表


            var scrollType = null;//me/privatepost
            if (link=='/' || pagematch || link.match(/\/paged\/(\w+)/) || link.match(/\/me\/privatepost/)){
                evtType = 'posts';//首页文章列表
                scrollType = 'posts_scroll';
            }
            //else if(link == '/more'){
            //  evtType = 'posts';//首页文章列表（未登录）
            //  scrollType = 'nologin_posts_scroll';
            //}else if(link == '/collandposts'){
            //  evtType = 'collandposts';//文章列表（按专集）
            //  scrollType = 'collandposts_scroll';
            //}
            else{
                if(rootmatch){
                    evtType = 'posts';//首页文章列表（未登录）
                    scrollType = 'posts_scroll';
                }
                if (newcollmatch){
                    evtType = 'newcollection';
                }
                if(newalbummusic){
                    evtType = 'newalbummusic';
                }
                if (mesetmatch){
                    evtType = 'mesettings';
                }
                if(registermatch){
                    evtType = 'registersuer';
                }
                if (colllistmatch){
                    evtType = 'collections';
                    scrollType = 'collections_scroll';
                }
                if(newcolllldmatch){
                    evtType = 'newcollbylld';
                }
                if (pmatch && !editpostmatch){
                    var cid = pmatch[1];
                    evtType = 'postdetail';//文章详情
                    scrollType = 'notes_scroll';
                }
                if (cmatch && !editpostmatch){
                    evtType = 'postdetail';//文章详情
                    scrollType = 'notes_scroll';
                }
                
                if (editpostmatch) {
                    var cid = editpostmatch[1];
                    var _import = link.match(/(\/me\/import)/);
                    
                    evtType = !!_import ? 'importpost' : 'editpost';
                }
                if (h5editpostmatch){
                    evtType = 'h5editpost';
                }
                if(editlldpostmatch){
                    var cid = editlldpostmatch[1];
                    evtType = 'editpost';
                }
                
                if(editlldmatch)
                {
                    var cid = editlldmatch[1];
                    evtType = 'editlld';
                }
                
                if (collmatch && !colleditmatch){
                    var cid = collmatch[1];
                    evtType = 'collectionposts';//专集posts列表
                    scrollType = 'collectionposts_scroll';
                }
                if (colleditmatch) {
                    var cid = colleditmatch[1];
                    evtType = 'editcollection';
                    args.push({cid:cid});
                }
                if (usermatch){
                    var uid = usermatch[2];
                    evtType = 'getperson';
                    scrollType = 'getperson_scroll';
                    //args.push({cid:cid});
                }
                if(serializesmatch){
                    evtType = "serializes";
                    scrollType = 'posts_scroll';
                }

                if(serializepostmatch){
                    evtType = "serializeposts";
                    scrollType = 'posts_scroll';
                }
            }
            var obj = {num : 1};
            var _href = !!_el && !!_el.attr('href') ? _el.attr('href') : window.location.pathname;
            
            $( "#screen-content [data-original-title]" ).each(function( index ) {
              $(this).tooltip({'container':'body'});
            });

            this.scrollType = scrollType;
            this.isLoadEnd = false;
            if (!!evtType){
                var fn = customEventHandler[evtType];
                if ($.isFunction(fn)) {
                    fn.apply(customEventHandler, args);
                }
            }
            window.setTimeout(function(){
                that.resize();
            },10);
        },

        /**
         * 进度条
         * @param f {boolean} 标志位
         */
        loading : function(f){
            f ? $(document.body).addClass('app-loading') : $(document.body).removeClass('app-loading');
        },

        /**
         * 全局蒙版提示层
         * @param _text {string}
         * @param _title {string}
         */
        alert : function(_text,_title){
            _title= (!!_title) ? _title : '';
            _text= (!_text) ? '意外错误。请重试或刷新页面。' :_text;
            var alertTpl = $('#alertbox').tmpl({title:_title,text:_text});
            
            if (!document.getElementById('ajaxError')){
                $(document.body).append(alertTpl);
            }
        },

        /**
         * 操作弹出提示
         * @param _phtml {string} 提示文案
         * @param type {boolean} 类型标志位 false:错误提示 true:成功
         */
        messageBox_tip : function(_phtml,type){
            if(!!_phtml){
                var message_style = !!type ? 'bg-green' : '';
                var tiphtml = '<div class="popover fade">'
                +   '<div class="popover-inner info-box '+message_style+'">'
                +   '   <span class="close" style="display:none;"><i class="icons icons-remove"></i></span>'
                +   '   <p>'+_phtml+'</p>   '
                +   '</div> '
                +'</div>';
                //var tiphtml = '<p class="butter-bar-message">'+_phtml+'</p>';
                $(document).find('div[node-type="transfei-tip"]').empty().append(tiphtml).fadeIn('1000',function(){
                    setTimeout(function(){
                      $(document).find('div[node-type="transfei-tip"]').fadeOut('fast');//slow
                    },4000);
                });
            }
        },

        messageBox_loading : function(_phtml,isvisible){
            if(!!_phtml){
                var message_style = 'bg-green';
                var tiphtml = '<div class="popover fade">'
                +   '<div class="popover-inner info-box '+message_style+'">'
                +   '   <span class="close" style="display:none;"><i class="icons icons-remove"></i></span>'
                +   '   <p>'+_phtml+'</p>   '
                +   '</div> '
                +'</div>';
                //var tiphtml = '<p class="butter-bar-message">'+_phtml+'</p>';
                
                $(document).find('div[node-type="transfei-tip"]').html(tiphtml);
                if (!isvisible){
                    setTimeout(function(){
                      $(document).find('div[node-type="transfei-tip"]').fadeOut('fast');//slow
                    },4000);
                }
                
            }
        },

        /**
         * 跳转
         * @param _href {string} 跳转地址
         * @param evtType {string | number} 类型
         * @param isreplace {string} 是否替换
         */
        redirect : function(_href,evtType,isreplace){
            var obj = {num : 1};
            if (!!isreplace && !!evtType){//替换当前url的history
                window.history.replaceState(obj, evtType, _href);//_type
                if (isreplace=='reload'){
                    window.location = _href;
                    //ttapp.navigate(_href,evtType,isreplace);
                    return;
                }
            }
            else if (!!evtType){
                window.history.pushState(obj, evtType, _href);//_type
            }
            window.location = _href;
        },
        showDLpage : function ()
        {   
            $('#screen-content').hide();
            $("#lowversion").show();
            $(".site-nav").hide();
            $("#download").remove();
        },

        /**
         * 核对浏览器
         * @returns {boolean}
         */
        chkbrowser : function(){
            var self = this;
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { // test for MSIE x.x
                // IE family
                var ieVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                if ( 9 > ieVersion ) {
                    self.showDLpage();
                    window.onerror=function(){};
                    return false;
                } 
            }
            return true; 
        },
        /**
         * 添加事件
         */
        addEvents : function(){
            var self = this;
            if (!self.chkbrowser()){return;}
            $(document).on('click','button[data-action],a[data-action],span[data-action],li[data-action]',function(e){
                var evtType=$(this).attr('data-action');
                
                if (evtType=="editpost"){
                    if(!!TT_CONFIG.user.type && TT_CONFIG.user.type !='0'){
                        
                    }else{
                        $('body').limitpublish({});
                        e.preventDefault();
                        return;
                        
                    }
                }

                
                var args    = Array.prototype.slice.call( arguments, 0 ),
                    fn      = customEventHandler[evtType];

                if ($.isFunction(fn)) {
                    fn.apply(customEventHandler, args);
                }
            });
            /**
             * 点击HOME图标
             * @event
             * @name router#open-nav
             * @param {Event} e 默认事件
             */
            $(document).delegate('[data-action="open-nav"]','click',function(evt){
                self.opennav(evt);
            });
            $(document).delegate('[data-action="back-nav"]','click',function(evt){
                self.backnav(evt);
            });
            //点击BODY关闭左侧层
            $(document).delegate('[note-type="site-nav-overlay"]','click',function(evt){
                self.closenav(evt);
            });
            $(document).delegate('#login-email [node-type="password-txt"]','keyup',function(evt){
                if (evt.which === 13 && $(this).val()!='') {
                    customEventHandler['signup']();
                }
            });
        },

        chgsina : function(){
            customEventHandler['chgsina']();
        },
        
        wblogin : function(_callback){
            customEventHandler['signinwithsina'](_callback);
        },
        
        upUserRtime : function(){
            $.ajax({
                url: '/user/updateNRtime',
                type: "POST",
                success: function(response) {
                    if(!!response && response.code == 1){
                        $('[node-type="notice-count"]').text(0).hide();
                    }else{
                    }
                }
            });
        },
        
        updateStatus : function(opt,_el){
            if(!!opt){
                if(opt.status == '2'){
                    $("#confirmDiv").confirmModal({
                        heading: '确认',
                        body: '拒绝邀请后，将不能在此专集内发表文章。',
                        callback: function () {
                            ttapp.updateStatusAjax(opt,_el);
                        }
                    });
                }else{
                    ttapp.updateStatusAjax(opt,_el);
                }
            }
        },
        
        updateStatusAjax : function(opt,_el){
            $.ajax({
                url: '/notification/updateStatus',
                type: "POST",
                data : opt,
                success: function(response) {
                    if(!!response && response.code == 1){
                        opt = response.data;
                        _el.trigger('notice-updateStatus',opt);
                    }else{
                        if(response.error == 3){
                            ttapp.alert('邀请已经失效');
                        }else if(response.error == 0){
                            ttapp.alert('邀请已接受');
                            $(_el).closest('div').empty().append('<span>&gt;&nbsp;已接受邀请</span>');
                        }
                    }
                }
            });
        },
        setnavref : function(_ref){
            $('[data-action="back-nav"]').data('refpage',_ref);
        },
        backnav : function(evt){
            evt.preventDefault && (evt.preventDefault(), evt.stopPropagation());
            var navnode = $('[data-action="back-nav"]');
            var _ref = navnode.data('refpage'),_url = navnode.attr('back-url');
            if (!!_url){
                window.history.replaceState({num : 1}, '', _url);
                location.href=_url;
                return;
            }
            if (!!_ref){
                //新建草稿 保存 草稿列表 
                //草稿编辑后，保存 ，返回
                //草稿编辑后，发表，已发布列表
                //编辑 后发表 ，已发表列表
                window.history.replaceState({num : 1}, '', document.referrer);
                location.href=document.referrer;
                // window.location = _ref;
            }
            else{
                window.history.back();  
            }
            
        },
        opennav : function(evt)
        {
            evt.preventDefault && (evt.preventDefault(), evt.stopPropagation());
            this.Xm = !0;
            $(document.body).addClass("site-nav-transition");
            $(document.body).removeClass("site-nav-new-activity");
            $(document.body).addClass("site-nav-drawer-open");
            if(!!TT_CONFIG.user.uid){
                this.upUserRtime();
            }
        },
        
        closenav : function(evt)
        {
            if(!this.xi && this.Xm) {
                var node = window.document.getElementById("container");
                //if(evt.target === node){
                    $(document.body).removeClass("site-nav-transition");
                //}
                $(document.body).removeClass("site-nav-drawer-open");
                this.Xm = !1;
                evt && evt.preventDefault()
            }
        },
        
        scroll : function(node)
        {
            var _scrollType = ttapp.scrollType;
            
            viewH =node.height(), contentH =node.get(0).scrollHeight, scrollTop =node.scrollTop();
            if (window.innerWidth <= 1000) {
                5 > node.scrollTop() ? $(document.body).removeClass("site-nav-hidden") : $(document.body).addClass("site-nav-hidden");
            }
            if(scrollTop/(contentH -viewH)>=0.95 && !ttapp.scrollaction && !ttapp.isLoadEnd){
                if (!!_scrollType){
                    ttapp.scrollaction = true;
                    var args = Array.prototype.slice.call( arguments, 0 );
                    var fn = customEventHandler[_scrollType];
                    if ($.isFunction(fn)) {
                        fn.apply(customEventHandler, args);
                    }
                }
            }
            if (this.scrollType=='notes_scroll'){
                if (!!ttapp.main.postdetail){
                    ttapp.main.postdetail.scroll(node);

                }
            }
        },
        
        resize : function(){
            var self = this;
            if (window.innerWidth <= 1000) {
                $('#screen-content').scroll(function(){
                    ttapp.scroll($(this));
                });
            }
            else{
                if (this.scrollType=='notes_scroll'){
                    $('#screen-content').scroll(function(){
                        ttapp.scroll($(this));
                    });
                }
                else{
                    $('.screen-scroll .wrapper').scroll(function(){
                        ttapp.scroll($(this));
                    });
                }
                
            }
        },
        
        supports_history_api : function (){ 
             return !!(window.history && history.pushState);
        } 
        
    };
    
    window.ttapp = new _ttapp();
/**
 * [description]
 * 
    var myurl=new medium.URL(window.location.href);
    myurl.remove("b"); //删除了b
    alert(myurl.get ("a"));//取参数a的值，这里得到1
    myurl.set("a",23); //修改a的值为23
    alert (myurl.url());
     
 * @param  {[type]} fg [description]
 * @return {[type]}    [description]
 */
var tturl = (function (fg) {
    var objURL = function (url) {
        this.ourl = url || window.location.href;
        this.href = ""; //?前面部分
        this.params = {}; //url参数对象
        this.jing = ""; //#及后面部分
        this.init();
    }
    //分析url,得到?前面存入this.href,参数解析为this.params对象，#号及后面存入this.jing
    objURL.prototype.init = function () {
        var str = this.ourl;
        var index = str.indexOf("#");
        if (index > 0) {
            this.jing = str.substr(index);
            str = str.substring(0, index);
        }
        index = str.indexOf("?");
        if (index > 0) {
            this.href = str.substring(0, index);
            str = str.substr(index + 1);
            var parts = str.split("&");
            for (var i = 0; i < parts.length; i++) {
                var kv = parts[i].split("=");
                this.params[kv[0]] = kv[1];
            }
        } else {
            this.href = this.ourl;
            this.params = {};
        }
    }
    //只是修改this.params
    objURL.prototype.set = function (key, val) {
        this.params[key] = val;
    }
    //只是设置this.params
    objURL.prototype.remove = function (key) {
        this.params[key] = undefined;
    }
    //根据三部分组成操作后的url
    objURL.prototype.url = function () {
        var strurl = this.href;
        var objps = []; //这里用数组组织,再做join操作
        for (var k in this.params) {
            if (this.params[k]) {
                objps.push(k + "=" + this.params[k]);
            }
        }
        if (objps.length > 0) {
            strurl += "?" + objps.join("&");
        }
        if (this.jing.length > 0) {
            strurl += this.jing;
        }
        return strurl;
    }
    //得到参数值
    objURL.prototype.get = function (key) {
        return this.params[key];
    }
    medium.URL = objURL;
    return fg;
}(medium||{}));
    
    
