
var ctx, thisImage;

// $()//網站載入後要做的事放這個括號內
$(function(){
    console.log("main.js loaded");
    $("#myVideo").attr("src","./src/test1.mp4");
    $("#playBtn").on("click", function(){
        console.log("Play button clicked");
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));  //設定音量初值
        $("#progressBar")[0].max = $("#myVideo")[0].duration;  //設定bar的最大值
        // ($("#myVideo")[0].duration=影片總長度(秒))
        if ($("#myVideo")[0].paused) {
            $("#myVideo")[0].play();
            $("#playBtn").text("Pause");
        }
        else {
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
    });
    $("#fullBtn").on("click", function(){
        console.log("Fullscreen button clicked");
        // $("#myVideo")[0].webkitEnterFullscreen();

        //不同的瀏覽器要call不同的API
        if ($("#myVideo")[0].requestFullscreen) {
            $("#myVideo")[0].requestFullscreen();
        } else if ($("#myVideo")[0].mozRequestFullScreen) { // Firefox
            $("#myVideo")[0].mozRequestFullScreen();
        } else if ($("#myVideo")[0].webkitRequestFullscreen) { // Chrome, Safari and Opera
            $("#myVideo")[0].webkitRequestFullscreen();
        } else if ($("#myVideo")[0].msRequestFullscreen) { // IE/Edge
            $("#myVideo")[0].msRequestFullscreen();
        }
    });

    //get by ID
    $("#lowerVolumeBtn").on("click", downVolume);  //減音量
    $("#higherVolumeBtn").on("click", upVolume);  //加音量
    $("#myVideo").on("timeupdate", updateProgress);  //目前播放到哪/總秒數
    $("#progressBar").on("change", changeProgress); //拉bar改播放位置(點2下)

    //get by type
    $("[type='date']").on("change", showDate); //日期時間
    ctx = $("#myCanvas")[0].getContext("2d");//建立一個2d畫框


    //改背景色get by type
    $("[type='color']").on("change", changeBgColor);

    //完成進度條 get by type
    $("[type='checkbox']").on("change", updateListSum);

    //取得地理位置 get by ID
    $("#getLocaltion").on("click", getLocation);  //減音量

});

//取得地理位置------------------------start-------------
function getLocation(){
    if(navigator.geolocation == undefined){
        alert("Fail to get location!!");
        return;
    }
    let settings = {
        enableHighAccuracy:true
    };
    navigator.geolocation.getCurrentPosition(result, error, settings);
}

function result(position){
    console.log(position);
    let thisCoords = position.coords;
    console.log(`Location:${thisCoords.latitude},${thisCoords.longitude}`);
    //開一個視窗，google　map
    //window.open(`https://www.google.com/maps/place/${thisCoords.latitude},${thisCoords.longitude}`,'win3');
}

function error(err){
    alert(err);
}
//取得地理位置------------------------end-------------

//完成進度條 - 計算多少個完成，完成要加刪除線
function updateListSum(){
    let hasChecked = 0;
    $("[type='checkbox']").each(function(){
        if ($(this).is(":checked")) {
            hasChecked++;
            //加刪除線
            $(this).next("span").css("text-decoration","line-through");
        }
        else{
            //不加刪除線
            $(this).next("span").css("text-decoration","none");
        }
    });
    console.log("Checked: " + hasChecked);
    $("meter").attr("max", $("[type='checkbox']").length);
    $("meter").attr("value", hasChecked);
}

function changeBgColor(){
    //更改背景顏色
    $("html").css("background-color", this.value);
}

function showDate(){//日期顯示器
    console.log("Date changed");
    // var date = $("[type='date']").val();
    // console.log(date);
    console.log(this.value);
    var thisDate = this.value;
    thisDate = thisDate.replace(/-/g, "");  //取代-成""=刪除-
    thisImage = new Image(); //建立圖片物件
    thisImage.src = "./src/flipClockNumbers.png";

    thisImage.onload = function(){
        for(var x=0; x<thisDate.length;x++){
            //以日期的每個數字截圖並放到對應位置
            // 參數：(圖片,開始結取x,開始結取y,截取x長度,截取y長度,放置點位置x,放置點位置y,縮放寬,縮放長)
            ctx.drawImage(thisImage, thisDate[x]*80, 0, 90, 130, 60*x, 0, 60, 100);
        }
    }

/** 相關補充
14:00 講師：Ryan Chung sprite sheet
14:02 講師：Ryan Chung html5 canvas game tutorial
14:02 講師：Ryan Chung https://www.freecodecamp.org/news/javascript-game-tutorial-stick-hero-with-html-canvas/
14:04 講師：Ryan Chung https://codepen.io/HunorMarton/pen/xxOMQKg
*/

}

function downVolume(){
    console.log("Lower volume button clicked");
    var myVideo = $("#myVideo")[0];
    if (myVideo.volume == 0) {
    }else if (myVideo.volume < 0.1) {
        myVideo.volume = 0;
    }else {
        myVideo.volume -= 0.1;
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
}

function upVolume(){
    console.log("Higher volume button clicked");
    var myVideo = $("#myVideo")[0];
    if (myVideo.volume == 1) {
    }else if (myVideo.volume > 0.9) {
        myVideo.volume = 1;
    }else {
        myVideo.volume += 0.1;
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
}

function updateProgress(){
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));
    $("#timeDisplay").append(`/${Math.floor($("#myVideo")[0].duration)}秒`);
    //使用jQuery的val()方法來設定進度條的值
    // $("#progressBar").val($("#myVideo")[0].currentTime);
    //使用原生JavaScript的方式來設定進度條的值
    $("#progressBar")[0].value = $("#myVideo")[0].currentTime;
}

function changeProgress(){
    console.log("Change progress bar");
    var myVideo = $("#myVideo")[0];
    myVideo.currentTime = $("#progressBar")[0].value;
}



//相關video資料
//測試範例
//11:33 講師：Ryan Chung https://www.w3.org/2010/Talks/1117-html5-plh/mediaevents.html
//w3c完整說明手冊
//11:34 講師：Ryan Chung https://www.w3.org/TR/2011/WD-html5-20110113/video.html#video


