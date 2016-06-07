;(function($, undefined) {
  var toc = function(element,_opt){
        this.$el = $(element);
        contentNode=document.getElementById('content'),
        catalogueNode = document.getElementById('catalogue');
        this.initialized();
        this.contentNode = contentNode||document.body;      //内容节点
        this.catalogueNode = catalogueNode||document.body;          //目录节点
        //创建节点缓存
        this.cacheContent = document.createDocumentFragment();
        this.cacheCatalogue=document.createDocumentFragment();

        this.positionMap = {};
        this.positionList= [];
        this.initCatalogue();
        this.parseContent();
        this.bindEvent();
  };
// function CMakeCatalogue(){
        
//     }
  toc.prototype = {
    initialized : function(){
      this.settings = {};
      $.extend(this.settings, TT);
      this.settings.delegateEvents(this);//继承events事件
      this.setup();
      
    },
    events : {
    	'click #sidebarToggle' : 'sidebarToggle',
      'click .anchor-link' : 'anchorclick',
      'click .submenu > a' : 'submenuclick',
      // 'click #sidebar > a' : 'pclick'
    },
    setup : function(){
        // this.maketoc();
        var _t = this;
        var tmp = location.search;
            var pos = /pos=([-\w\d]+)/.exec(tmp);
            if(pos){
                pos = pos[1].toLowerCase();
            }

            window.onhashchange = function(){       //页内链接相互跳转交互
                if(location.hash.length<=1){
                    return;
                }

                setTimeout(function(){              
                    //根据hash定位
                    var target = document.getElementById(location.hash.replace('#',''));
                    target = target.parentNode;
                    var id = target.id;
                    if(/^src-cnt-/.test(id)){
                        _t.interAction(id.replace('toc-ttl','src-cnt'));
                        id = id.replace('src-cnt-','toc-ttl-');
                        turnHashPosition(id);
                        
                        var searchTmp = _t.calUrlSearch('');
                        if ('pushState' in history){
                            var searchUrl = location.href;
                            var key = searchUrl.indexOf('?');
                            searchUrl = searchUrl.substring(0,key);
                            history.replaceState(location.hash,'',searchUrl+searchTmp+location.hash);
                        }
                    }
                },20);
            };
        if(location.hash.length<1){     //无hash
                if(/(?:[a-zA-Z]+-)+([\d]+(?:-[\d]+){0,1})/.test(pos)){
                    pos = /(?:[a-zA-Z]+-)+([\d]+(?:-[\d]+){0,1})/.exec(pos);
                    $('#toc-ttl-'+pos[1]).click();   
                }                           
            }else{
                //根据hash定位
                var target = document.getElementById(location.hash.replace('#',''));
                target = target.parentNode;
                var id = target.id;
                if(/^src-cnt-/.test(id)){
                    id = id.replace('src-cnt-','toc-ttl-');
                }
                //$('#'+id).click();
                var tempHash = location.hash.replace('#','');
                for(var id in _t.positionMap){
                    if(_t.positionMap[id].id==tempHash){
                        $('body,html').animate({scrollTop:_t.positionMap[id]['pos']},200,'swing',function(){
                            _t.interAction(id.replace('toc-ttl','src-cnt'));
                        });
                        break;
                    }
                }
                // setTimeout(function(){
                //  turnHashPosition(id.replace('toc-ttl','src-cnt'));
                // },20);
                
            }
            
    }
    ,initCatalogue : function(){
        //目录标题
        var toctitle = document.createElement('div');
        toctitle.id = "toctitle";
        var header = document.createElement('h1');
        header.innerHTML = '目录';
        toctitle.appendChild(header);
        var span = document.createElement('span');
        span.id = 'toctoggle';
        span.innerHTML = '隐藏';
        toctitle.appendChild(span);
        this.cacheCatalogue.appendChild(toctitle);  
        //目录内容
        var toccnt = document.createElement('div');
        toccnt.id = 'toccnt'
        var ul = document.createElement('ul');
        toccnt.appendChild(ul); 
        this.cacheCatalogue.appendChild(toccnt);
        this.tarUl = ul;        //生成目录目标ul 
        this.curIndex = 0;
        this.curObj = {};       
    }

    ,parseContent : function(){     //解析内容模板
        var srcTitleH1 = this.contentNode.getElementsByTagName('h1')[0];
        if(srcTitleH1){
            // document.body.insertBefore(srcTitleH1,document.getElementById('content'));
            document.title = srcTitleH1.innerHTML + '_汉豆开发手册';
        }

        var srcTitleH2 = this.contentNode.getElementsByTagName('h2');
        var tarUl = this.tarUl;
        var len = srcTitleH2.length
        for(i=0;i<len;i++){             //遍历二级标题
            var srch2 = srcTitleH2[i];                      //源h2节点
            srch2.id = 'src-cnt-'+i;
            
            var targ = this.makeCatalogueUnit(i,this.parseCatalogueNode(srch2.innerHTML),'h2')
            var span = document.createElement('span');
            span.className = 'f-toggle f-toggle-plus';
            targ.insertBefore(span,targ.firstChild);

            tarUl.appendChild(targ);
            srch2.innerHTML = this.parseNode(srch2.innerHTML);
            this.positionList.push({
                'pos':parseInt(this.calHeight($('#'+srch2.id).offset().top)),
                'id' :srch2.id
            });
            
            
            var tardiv = document.createElement('div');
            tardiv.id = 'toc-cnt-'+i;
            tardiv.className = 'toc-cnt-list';
            tarUl.appendChild(tardiv);
            this.positionMap[srch2.id.replace('src-cnt','toc-ttl')] = {};
            this.positionMap[srch2.id.replace('src-cnt','toc-ttl')]['pos'] = parseInt(this.calHeight($('#'+srch2.id).offset().top));
            this.positionMap[srch2.id.replace('src-cnt','toc-ttl')]['id']  = this.calNodeId(srch2.innerHTML);
            // console.log('#'+srch2.id)
            // console.log($('#'+srch2.id).offset().top);

            var nextSibl = srch2;
            var j = 0;
            var k = 0;
            while(nextSibl){                //查找三/四级标题
                nextSibl = nextSibl.nextSibling;
                if(!nextSibl){
                    break;
                }else if(typeof nextSibl.tagName=='undefined'){
                    continue;
                }else if(nextSibl.tagName.toLowerCase()=='h2'){
                    break;
                }else if(nextSibl.tagName.toLowerCase()=='h3'){     //三级标题
                    var srch3 = nextSibl;
                    srch3.id = 'src-cnt-'+i+'-'+j;
                    targ = this.makeCatalogueUnit(i+'-'+j,this.parseCatalogueNode(srch3.innerHTML),'h3')    //左侧链接导航
                    tardiv.appendChild(targ);
                    srch3.innerHTML = this.parseNode(srch3.innerHTML);
                    j++;
                    this.positionList.push({
                        'pos':parseInt(this.calHeight($('#'+srch3.id).offset().top)),
                        'id' :srch3.id
                    });     
                    this.positionMap[srch3.id.replace('src-cnt','toc-ttl')] = {}; 
                    this.positionMap[srch3.id.replace('src-cnt','toc-ttl')]['pos'] = parseInt(this.calHeight($('#'+srch3.id).offset().top));            
                    this.positionMap[srch3.id.replace('src-cnt','toc-ttl')]['id']  = this.calNodeId(srch3.innerHTML);
                    k = 0;
                }else if(nextSibl.tagName.toLowerCase()=='h4'){     //四级标题
                    var srch4 = nextSibl;
                    srch4.id = 'src-cnt-'+i+'-'+(Math.max(j-1,0))+'-'+k;
                    srch4.innerHTML = this.parseNode(srch4.innerHTML);
                    k++;
                    this.positionList.push({
                        'pos':parseInt(this.calHeight($('#'+srch4.id).offset().top)),
                        'id' :srch4.id
                    });     
                    this.positionMap[srch4.id.replace('src-cnt','toc-ttl')] = {}; 
                    this.positionMap[srch4.id.replace('src-cnt','toc-ttl')]['pos'] = parseInt(this.calHeight($('#'+srch4.id).offset().top));            
                    this.positionMap[srch4.id.replace('src-cnt','toc-ttl')]['id']  = this.calNodeId(srch4.innerHTML);   
                }else if(nextSibl.tagName.toLowerCase()=='table'){
                    nextSibl.border=1;
                    //nextSibl.cellspacing=0;               
                }   
            }
        }       
        //console.log(this.positionMap);
        this.positionList.sort(function(a,b){
            return a.pos - b.pos;
        })
        //console.log(this.positionList);
        this.catalogueNode.appendChild(this.cacheCatalogue)
        $('.toc-cnt-list').hide();
        this.calInterAction()

    }

    ,calHeight : function(i){
            if(!(-[1,]))
                return i-120;
            return i-120;
    }

    ,parseNode : function(value){
        var _t = /(?:&gt;|&gt|>)(.*)(?:&lt;|&lt|<)\/[\w]+/.exec(value);
        if(_t){
            var id = /id=[\'\"]([^\'\"]+)[\'\"']/.exec(value);
            if(!id){
                id = /id=([^\'\"\s\>]+)/.exec(value);
            }
            if(id){
                id = id[1];
            }else{
                id = _t[1];
            }
            value = _t[1];

            return '<span id=\''+id+'\'>'+value+'</span>';
        }
        var tmp = value.split('#');
        if(tmp[1]){
            return '<span id=\''+tmp[1]+'\'>'+tmp[0]+'</span>';
        }
        return value;
    }

    ,calNodeId : function(value){
        var _t = /(?:&gt;|&gt|>)(.*)(?:&lt;|&lt|<)\/[\w]+/.exec(value);
        if(_t){
            var id = /id=[\'\"]{0,1}([^\'\">]+)(?:[\'\"']|>)/.exec(value);
            if(id){
                id = id[1];
            }else{
                id = '';
            }
            return id;
        }
        var tmp = value.split('#');
        if(tmp[1]){
            return tmp[1];
        }
        return "";
    }

    ,parseCatalogueNode : function(value){
        var _t = /(?:&gt;|&gt|>)(.*)(?:&lt;|&lt|<)\/[\w]+/.exec(value);
        if(_t){
            value = _t[1];
        }
        var tmp = value.split('#');
        if(tmp[1]){
            return tmp[0];
        }
        return value;
    }

    ,makeCatalogueUnit : function(id,value,nodeType){
        var li = document.createElement('li');
        li.id = 'toc-ttl-'+id;
        var tarh2 = document.createElement(nodeType);
        if(value.indexOf('#')>0){
            var tmp = value.split('#');
            if(tmp[1]){
                // var span = document.createElement('span');
                // span.id = tmp[0];
                // span.innerHTML = tmp[0];
                // tarh2.innerHTML = '';
                // tarh2.appendChild(span);
                tarh2.innerHTML = tmp[0];
            }else{
                tarh2.innerHTML = value;
            }
        }else{
            tarh2.innerHTML = value;                //目录h2节点
        }
        li.appendChild(tarh2)
        return li;
    }

    ,bindEvent : function(){
        var that = this;
        // window.onscroll : function(e){
        //  that.calInterAction();
        // }
        that.scrollTimer = null;
        dom.on(window, 'scroll', function(e) {
            that.calInterAction();  
            var tempHash = location.hash.replace('#','');       //ie8 直接在地址栏回车修复
            for(var id in that.positionMap){
                if(that.positionMap[id].id==tempHash){
                    break;  
                }
            }
            if(that.positionMap[id].id==tempHash && (!(-[1,])||window.msPerformance)){
                clearTimeout(that.scrollTimer);
                that.scrollTimer = setTimeout(function(){
                    var scrollTop;
                    if (typeof window.pageYOffset != 'undefined') { //pageYOffset指的是滚动条顶部到网页顶部的距离
                        scrollTop = window.pageYOffset;
                    } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                        scrollTop = document.documentElement.scrollTop;
                    } else if (typeof document.body != 'undefined') {
                        scrollTop = document.body.scrollTop;
                    }           
                    var pos = that.positionMap[id].pos; 
                    var delta = (pos-scrollTop);    
                    //console.log(delta);               
                    if(  (delta>-124&&delta<-116) ){
                        $('body,html').animate({scrollTop:pos},0,'swing',function(){});                         
                    }
                },50);

            }
            
                    
            
        });
        $('#toccnt li').click(function(e){
            var target = e.target;
            if(target.tagName.toLowerCase()=='span'){
                var result = /f-toggle-(\w+)$/.exec(target.className);
                if(!!result){
                    if(result[1]=='plus'){          //展开列表
                        target.className = 'f-toggle f-toggle-minus';
                        target.parentNode.nextSibling.style.display = 'block';
                    }else if(result[1]=='minus'){   //收拢列表
                        target.className = 'f-toggle f-toggle-plus';
                        target.parentNode.nextSibling.style.display = 'none';
                    }
                    e.stopPropagation();
                }
                return;
            }else if(target.tagName.toLowerCase()!='li'){
                target = target.parentNode;
            }
            if(target.tagName.toLowerCase()!='li')
                target = target.parentNode
            id = target.id;
            if(that.positionMap[id]){
                //console.log(that.positionMap[id])
                if ('pushState' in history){
                    var searchUrl = location.href;
                    var key = searchUrl.indexOf('?');
                    searchUrl = searchUrl.substring(0,key);
                    if(that.positionMap[id]['id']){
                        var searchTmp = that.calUrlSearch('');
                        history.replaceState(target.id,'',searchUrl+searchTmp+'#'+that.positionMap[id]['id']);
                    }else{
                        var searchTmp = that.calUrlSearch(id);
                        history.replaceState(target.id,'',searchUrl+searchTmp);
                    }
                    $('body,html').animate({scrollTop:that.positionMap[id]['pos']},200,'swing',function(){
                        that.interAction(id.replace('toc-ttl','src-cnt'));
                    }); 
                }else{
                    if(that.positionMap[id]['id']){
                        var tempHash = location.hash;
                        if(tempHash == ('#'+that.positionMap[id]['id'])){
                            return;
                        }
                        location.hash = ('#'+that.positionMap[id]['id']);
                    }else{
                        var tempHash = location.hash;
                        if(!tempHash||tempHash=='#'){
                            return;
                        }
                        location.hash = ('#');
                        $('body,html').animate({scrollTop:that.positionMap[id]['pos']},200,'swing',function(){
                            that.interAction(id.replace('toc-ttl','src-cnt'));
                        }); 
                    }                   
                }
                //console.log(that.positionMap[id])
            }   
        });
        window.onpopstate = function(event){
            if(location.hash.length>1){
                //根据hash定位
                try{
                    var target = document.getElementById(location.hash.replace('#',''));
                    target = target.parentNode;
                    var id = target.id;
                    if(/^src-cnt-/.test(id)){
                        id = id.replace('src-cnt-','toc-ttl-');
                    }
                    $('body,html').animate({scrollTop:that.positionMap[id]['pos']},300); 
                }catch(e){

                }
            }else{
                try{
                    var id = event.state;
                    document.getElementById(id).click();                
                }catch(e){

                }               
            }

        }
        // $('#toctoggle').click(function(){
        //  $('#toccnt').toggle(300)
        // });
    }

    ,calUrlSearch : function(id){
        var searchUrl = location.search.substr(1);
        searchUrl = searchUrl.split('&');
        var searchTmp = '?';
        for(var key=0;key<searchUrl.length;key++){
            if(searchUrl[key].indexOf('pos=')>=0){
                //searchTmp += 'pos='+id.replace('-ttl','')+'&';
            }else if(searchUrl[key]==''){

            }else{
                searchTmp += searchUrl[key]+'&'
            }
        }
        if(id!=''){
            searchTmp += 'pos='+id.replace('-ttl','');  
        }
        return searchTmp;
    }

    ,calInterAction : function(){
            var scrollTop;
            if (typeof window.pageYOffset != 'undefined') { //pageYOffset指的是滚动条顶部到网页顶部的距离
                scrollTop = window.pageYOffset;
            } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                scrollTop = document.documentElement.scrollTop;
            } else if (typeof document.body != 'undefined') {
                scrollTop = document.body.scrollTop;
            }

            this.curIndex = this.search(this.positionList,scrollTop+80);        //查找位置对应id
            this.curObj = this.positionList[this.curIndex];
            if(typeof this.curObj!='undefined'){
                if(/src-cnt-[\d]+-[\d]+-[\d]+/.test(this.curObj.id)){
                    var result = /(src-cnt-[\d]+-[\d]+)-[\d]+/.exec(this.curObj.id);
                    this.interAction(result[1]);
                }else{
                    this.interAction(this.curObj.id);
                }
            }else{
                this.interAction('src-cnt-0');
            }
    }

    //交互显示左侧标题
    ,interAction : function(id){
        $('#toccnt li').removeClass('f-sel');
        if(/^src-cnt-[\d]+$/.test(id)){             //一级标题
            $('.toc-cnt-list').hide();
            var nid = id.replace('src','toc');
            $('#'+nid).show();                      //显示子标题
            nid = id.replace('src-cnt','toc-ttl');
            $('#toccnt li').removeClass('f-hsel');
            $('#'+nid).addClass('f-sel');
            $('#'+nid).addClass('f-hsel');
            if(/^toc-ttl-\d+$/.test(nid)){      //一级标题加号减号变化
                $('.f-toggle').removeClass('f-toggle-minus');
                $('.f-toggle').addClass('f-toggle-plus');
                ($('#'+nid).children()[0]).className = 'f-toggle f-toggle-minus';
            }
        }else{
            $('.toc-cnt-list').hide();
            var nid = /^src-(cnt-[\d]+)-[\d]+$/.exec(id);
            if(!!nid){
                nid = 'toc-'+nid[1];        //二级标题
                var nid_type = 2;
            }else{
                var nid = /^src-(cnt-[\d]+)-[\d]+-[\d]+$/.exec(id);
                nid = 'toc-'+nid[1];
                var nid_type = 3;           //三级标题
            }
            $('#'+nid).show();                      //显示子标题列表
            $('#toccnt li').removeClass('f-hsel');
            nid = nid.replace('cnt','ttl');
            $('#'+nid).addClass('f-hsel');  
            //一级标题加号变减号
            $('.f-toggle').removeClass('f-toggle-minus');
            $('.f-toggle').addClass('f-toggle-plus');
            ($('#'+nid).children()[0]).className = 'f-toggle f-toggle-minus';

            nid = id.replace('src-cnt','toc-ttl');      //二级标题高亮
            if(nid_type==2){
                $('#'+nid).addClass('f-sel');   
            }else{
                nid = /(toc-ttl-[\d]+-[\d]+)/.exec(nid);
                nid = nid[0];
                $('#'+nid).addClass('f-sel');   
            }
        }

    }

    //二分查找
    ,search : function(array,value){
        var tmpArr = array.slice();
        var indexL=0, indexH=tmpArr.length-1, indexM = parseInt(indexH/2);
        while(indexL<indexH){
            indexM = parseInt((indexL+indexH)/2)
            if(value==tmpArr[indexM].pos){
                indexL = indexM;
                break;
            }else if(value<tmpArr[indexM].pos){
                indexH = indexM-1;
            }else if(value>tmpArr[indexM].pos){
                indexL = indexM+1;
            }
        }
        if(tmpArr[indexL].pos>value){
            return indexL-1;
        }else{
            return indexL;
        }
    },
    anchorclick : function(e){
        var _id = $(e.target).attr("link"),
            _top = $(_id).offset().top;
        $("html,body").animate({scrollTop: _top-80}, 1000);
    },
    sidebarToggle : function(){
        var text = $(this).html();
        if(text=="目录[-]"){
            $(this).html("目录[+]");
            $(this).attr({"title":"展开"});
        }else{
            $(this).html("目录[-]");
            $(this).attr({"title":"收起"});
        }
        $("#sidebar").toggle();
    },
    submenuclick : function(e)
    {
        e.preventDefault();
        var target = $(e.target),submenu = target.siblings('ul');
        var li = target.parents('li');
        var submenus = $('#sidebar li.submenu ul');
        var submenus_parents = $('#sidebar li.submenu');
        if(li.hasClass('open'))
        {
            if(($(window).width() > 768) || ($(window).width() < 479)) {
                submenu.slideUp();
            } else {
                submenu.fadeOut(250);
            }
            li.removeClass('open');
        } else 
        {
            if(($(window).width() > 768) || ($(window).width() < 479)) {
                submenus.slideUp();         
                submenu.slideDown();
            } else {
                submenus.fadeOut(250);          
                submenu.fadeIn(250);
            }
            submenus_parents.removeClass('open');       
            li.addClass('open');    
        }
    },
    close : function(){
        var submenus = $('#sidebar li.submenu ul');
        var submenus_parents = $('#sidebar li.submenu');
        submenus.fadeOut(250);
        submenus_parents.removeClass('open');   
    },
    maketoc : function(){
        $(".markdown-body").find("h2,h3,h4,h5,h6").each(function(i,item){
            var tag = $(item).get(0).localName,_id="wow"+i;
            $(item).attr("id",_id);
            var tag_tpl = '<li><a class="new'+tag+' anchor-link" onclick="return false;" href="#" link="#wow'+i+'">'+" · "+$(this).text()+'</a></li>';
            if (tag=='h3'){
                var pnode = $("#sidebar li:last-child");
                var h2parent = pnode.find('ul');
                if (h2parent.length>0){
                    h2parent.append(tag_tpl);
                }
                else{
                    pnode.addClass('submenu');
                    pnode.append('<ul>'+tag_tpl+'</ul>');  
                }
                  
            }
            else if (tag=='h2'){
                $("#sidebar").append(tag_tpl);
            }
            $(".newh2").css("margin-left",0);
            $(".newh3").css("margin-left",20);
            $(".newh4").css("margin-left",40);
            $(".newh5").css("margin-left",60);
            $(".newh6").css("margin-left",80);
        });
        this.close();
    },

    reset1 : function(options){
    	
    },

  };

   //自定义jQuery组件
    $.fn.toc = function (option) {
       
      return this.each(function(input_field) {
            
      var $this = $(this)
            , data = $this.data('toc')
            , options = typeof option == 'object' && option
          if (!data) $this.data('toc', (data = new toc(this, options)))
          else{
            data['reset'](options);
          }
          if (typeof option == 'string') data[option]();
          }); 
    };
    $(document).ready(
        function(){
            // $(document.body).toc();
        }  
    );
    
    /**
 * mkcatalogue
 * 
 * 生成目录
 */

var dom = {
    on: function(node, type, callback) {
        if (node.addEventListener) {
            node.addEventListener(type, callback);
        } else if (node.attachEvent) {
            node.attachEvent('on'+type, callback);
        } else {
            node['on'+type] = callback;
        }
    }
};

//var isIE8 = platform.name === 'IE' && platform.version === '8.0';


    

    
    $(document).ready(function($) {
        //生成目录
            //非ie8的语法高亮
            var _t = null;      //new CMakeCatalogue

            // _t = new CMakeCatalogue(document.getElementById('content'),document.getElementById('catalogue'));
            _t = $(document.body).toc();
            

            //顶部导航
            $('.m-inner-item').on('mouseenter',function(e){
                var target = e.target;
                $('.m-hover span').removeClass('f-hover');
                $('#'+target.id).addClass('f-hover');
                $('#'+target.id).parent().next('.m-drop-list').addClass('f-hover');
            });
            $('.m-inner-item').on('mouseleave',function(e){
                $('.m-hover span').removeClass('f-hover');
                $('.m-drop-list').removeClass('f-hover');
            });

            var md = location.search;
            if(/doc=([\w+])/.test(md)){
                var result = /doc=([^_&]+)/.exec(md);
                md = result[1].toLowerCase();
                $('#dev-'+md).addClass('f-active'); 
            }else{
                var result = /md=([\w]+)/.exec(md);
                md = result[1].toLowerCase();
                $('#dev-'+md).addClass('f-active');             
            }


            

            function turnHashPosition(id){  
                var scrollTop;
                // if (typeof window.pageYOffset != 'undefined') { //pageYOffset指的是滚动条顶部到网页顶部的距离
                //  scrollTop = window.pageYOffset;
                // } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                //  scrollTop = document.documentElement.scrollTop;
                // } else if (typeof document.body != 'undefined') {
                //  scrollTop = document.body.scrollTop;
                // }
                // //console.log(scrollTop)
                // scrollTop = parseInt(scrollTop)-120;
                scrollTop = _t.positionMap[id].pos;
                $('body,html').animate({scrollTop:scrollTop},200,'swing',function(){
                    if(!!id){
                        _t.interAction(id.replace('toc-ttl','src-cnt'));
                    }
                }); 
            };
            $('#catshow').click(function(_event){
                $('#catalogue').addClass('show');
                $('#catmask').show();
                $('#catshow').hide();
                _event.stopPropagation();
            })
            $('#catmask').click(hideMask);
            $(document).click(hideMask);
            function hideMask(){
                $('#catalogue').removeClass('show');
                $('#catmask').hide();
                $('#catshow').show();
            }       
    });
    
})(window.jQuery);