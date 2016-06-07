/**
 * Created by fengge on 16/3/25.
 */
!(function($){
    var connection = new RTCMultiConnection(roomid,{uid:uid});
    connection.socketURL = !!domain ? domain : 'https://192.168.51.96:9999/';
    //connection.socketURL = 'https://123.56.69.34:9999/';
    //connection.socketURL = 'https://rtc.tuturead.com/';
    connection.socketMessageEvent = 'RTCMultiConnection-Message';
    connection.enableFileSharing = false;
    //video
    if(typeof webkitMediaStream !== 'undefined') {
        connection.attachStreams.push(new webkitMediaStream());
    }
    else if(typeof MediaStream !== 'undefined'){
        connection.attachStreams.push(new MediaStream());
    }
    else {
        console.error('Neither Chrome nor Firefox. This demo may NOT work.');
    }
    connection.dontCaptureUserMedia = true;
    connection.maxParticipantsAllowed = 1;//设置房间最大人数
    connection.leaveOnPageUnload = true;
    connection.autoCloseEntireSession = true;
    connection.session = {
        data: true,
        audio: true,
        video: true,
        onway: true
    };

    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    };

    connection.onUserStatusChanged = function (event) {
        if (event.status == 'online') {
            console.log(event.userid + ": online");
        }
        console.log('tt');
        if (event.status == 'offline') {
            console.log(event.userid + ": offline");
        }
        console.log("当前人数: " + connection.getAllParticipants().length + "event : onUserStatusChanged");
    };

    connection.onopen = function (event) {
        console.log(event.userid + ": 已经连接");
        if (CanvasDesigner.pointsLength <= 0) {
            // make sure that remote user gets all drawings synced.
            setTimeout(function () {
                connection.send('plz-sync-points');
            }, 1000);
        }
        console.log("当前人数: " + connection.getAllParticipants().length + " event: onopen");
    };

    connection.onclose = connection.onerror = connection.onleave = function () {
        console.log("退出 : "+event);
        console.log("当前人数: " + connection.getAllParticipants().length + " event: onclose");
        if(!!roomid && !!event && event.type == "close"){
            var userid = event.userid,
                Ajax = "";
            if(!!Ajax){
                Ajax.abort();
            }
            Ajax = Tool.ajax("/exit_room",{"roomid": roomid, "userid": userid}, function(res){
                if(!!res && res.code == 1){
                    //alert(userid+"退出成功");
                    console.log(userid+"退出成功");
                }else{
                    alert(res.msg);
                }
            }, function(e){
                console.log(e);
            });
        }
    };

    connection.onmessage = function (event) {
        if (event.data === 'plz-sync-points') {
            CanvasDesigner.sync();
            return;
        }
        CanvasDesigner.syncData(event.data);
    };

    window.connection = connection;

    var exitRoom = function(){
        if(!!roomid && !!uid && uid != roomid){
           var Ajax = "";
           if(!!Ajax){
               Ajax.abort();
           }
            Ajax = Tool.ajax("/exit_room",{"roomid": roomid, "userid": uid}, function(res){
                if(!!res && res.code == 1){
                    //alert(userid+"退出成功");
                    console.log(uid+"退出成功");
                }else{
                    alert(res.msg);
                }
            }, function(e){
                console.log(e);
            }, "post", false);
        }
    }

    var createRoom = function(roomid) {
        //创建房间
        //roomid = !!roomid ? roomid : getRandom();//随机roomid
        if (!roomid.length) return alert('room is null');
        //this.disabled = true;
        return connection.open(roomid);
        //return connection.openOrJoin(roomid);
    }

    var joinRoom = function(roomid){
        var join_back = connection.join(roomid,{isOneWay:false});
        //console.log("join_back:"+join_back);
        if(!!join_back && typeof join_back == "object"){
            var Ajax = "";
            if(!!Ajax){
                Ajax.abort();
            }
            Ajax = Tool.ajax("/join_member",{"roomid":roomid}, function(res){
                if(!!res && res.code == 1){
                    //alert("加入成功");
                    console.log("加入成功");
                }else if(res.code == 5001){
                    window.location.href = "/teacherlist";
                }else{
                    alert(res.msg);
                }
            }, function(e){
                console.log(e);
            });
        }
        return join_back;
    }

    $("#force_exit").on("click", function(){
        //强制退出成功
        if(mode == "s" && !!roomid){
            connection.disconnectWith(roomid, function(){
                console.log(uid+" : 强制退出成功");
            });
            connection.disconnect();
        }
    });

    $("#test_count").on("click", function(){
        console.log("房间人数: "+connection.getAllParticipants());
        console.log("该房间人数: "+connection.getAllParticipants(roomid));
    });

    window.addEventListener("beforeunload", function(){
        //学生退出房间
        exitRoom();
        if(window.event.returnValue = ''){
            //exitRoom();
        }
    });

    /**
     * video  显示视频
     */
    connection.videosLocalContainer = document.getElementById('videos-local-container');
    connection.videosRemoteContainer = document.getElementById('videos-remote-container');
    connection.onstream = function(event) {
        if(!event.stream.getAudioTracks().length && !event.stream.getVideoTracks().length) {
            return;
        }
        console.log(event.blobURL);
        var video = event.mediaElement;
        if(event.type == 'local'){
            //video.muted = false;
            //video.volume = 1;
            //video.autoplay = true;
            video.controls = false;
            //video.play();
            console.dirxml("本地流",video);
            connection.videosLocalContainer.appendChild(video);
        }else{
            //video.muted = false;
            //video.volume = 1;
            //video.autoplay = true;
            video.controls = false;
            //video.play();
            console.dirxml("远程流",video);
            setTimeout(function(){
                connection.videosRemoteContainer.appendChild(video);
            },500);
        }
    };
    /*
     * video 切换画板和视频   老是更改同学跟着变
     */
//    connection.video_btn = document.getElementById('video-btn');//切换按钮video
//    connection.drawboard_btn = document.getElementById('draw-btn');//切换按钮白板
//    connection.socketCustomEvent = connection.channel;
//    connection.all_content = document.getElementById('content_container');
//    setTimeout(function (){
//    	var socket = connection.getSocket();
//    },1000);
//	// listen custom messages from server
//    socket.on('cerefreververferfweqdq', function(message) {
//		if(message.customMessage == 'onclickvideobtn'){
//    		connection.all_content.className='content video-full';
//    	}else{
//    		connection.all_content.className='content';
//    	}
//    });
//	// send custom messages to server
//    connection.video_btn.onclick = function() {
//    	if(mode == "t"){
//    		var customMessage = 'onclickvideobtn';
//            socket.emit('cerefreververferfweqdq', {
//                sender: connection.userid,
//                customMessage: customMessage
//            });
//    	}
//        connection.all_content.className='content video-full';
//    }
//    // send custom messages to server
//    connection.drawboard_btn.onclick = function() {
//    	if(mode == "t"){
//    		var customMessage = 'onclickdrawboardbtn';
//            socket.emit('cerefreververferfweqdq', {
//                sender: connection.userid,
//                customMessage: customMessage
//            });
//    	}
//        connection.all_content.className='content';
//    }
    
    
    var openStream = function(){
        //connection.dontCaptureUserMedia = false;
        //if(connection.attachStreams.length) {
        //    connection.getAllParticipants().forEach(function(p) {
        //        connection.attachStreams.forEach(function(stream) {
        //            connection.peers[p].peer.removeStream(stream);
        //        });
        //    });
        //    connection.attachStreams = [];
        //    //connection.observers.all();
        //}
        connection.addStream(connection.session);
        //connection.addStream({
        //    oneway: true,
        //    audio: true,
        //    video: true
        //});
    }
    
    window.onload = function() {
        !!FastClick && FastClick.attach(document.body);
        var result = false;
        if (mode == "t" && !!roomid) {
            //老师创建房间
            result = createRoom(roomid);
        } else if (mode == "s" && !!roomid) {
            //student join room
            //var del_user = connection.deletePeer(roomid);
            //connection.disconnectWith(uid);
            result = joinRoom(roomid);
        }
        openStream();//加载视频流
    };

})(window.jQuery);