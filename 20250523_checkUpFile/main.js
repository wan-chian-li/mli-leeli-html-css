const legalVideoFormats = [
    "mp4","flv","avi","mov","mkv","mpeg","3gp","wmv"
];

const videoLimit = {
    min:60,
    max:90
};

window.URL = window.URL || window.webkitURL;

$(function(){
    $("#inputFile").change(function(e){
        $("table").empty();
        $("table").append("<tr><th>檢核項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
        processFile(e.target.files);
    });
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);
});

function processFile(files){
    let thisVideo = files[0]; //只看第一個檔案
    // debugger;  //配合瀏覽器使用，用於debug的停下位置
    $("table").append(
        $(`<tr><td colspan="4">影片名稱：${thisVideo.name}</td></tr>`)
        .css("background-color","yellow"));
    $("table").append( //動態項目產生，檢測結果先不寫
        '<tr><td>影片長度</td><td>須介於60~90秒</td>' + 
        '<td id="thisDuration"></td>' + 
        '<td id="thisDurationResult"></td></tr>'
    );
    $("table").append( //動態項目產生，檢測結果先不寫
        '<tr><td>影片格式</td>'+
        `<td>${legalVideoFormats.join('/').toUpperCase()}</td>` +
        `<td id="thisFormat">${thisVideo.type}</td>` +
        '<td id="thisFormatResult"></td></tr>'
    );
    // video/mp4 => ["video","mp4"]
    //檔案格式檢查，結果寫入相對的檢測結果
    let thisFileType = thisVideo.type.split("/");
    if(thisFileType[0]=="video"){
        if(legalVideoFormats.indexOf(thisFileType[1])!=-1){
            $("#thisFormatResult").text("O").css("color","green");
        }else{
            $("#thisFormatResult").text("X").css("color", "red");
        }
    }else{
        $("#thisFormatResult").text("非影片格式").css("color","red");
    }
    //動態項目產生，檢測結果先不寫
    $("table").append(
        '<tr><td>影片解析度</td><td>720p(1280*720)以上</td>' +
        '<td id="thisResolution"></td>' +
        '<td id="thisResolutionResult"></td></tr>'
    );

    //影片長度、解析度檢查，結果寫入相對的檢測結果
    let videoElement = document.createElement('video');  //背影產生一個video元件，用於檢查長度及解析度
    videoElement.preload = 'metadata';
    videoElement.onloadedmetadata = function(){
        // debugger;
        thisVideo.duration = videoElement.duration;  //影片長度(秒)
        thisVideo.videoWidth = videoElement.videoWidth;  //解析度-長
        thisVideo.videoHeight = videoElement.videoHeight;  //解析度-高
        $("#thisDuration").text(thisVideo.duration);
        $("#thisResolution").text(thisVideo.videoWidth+"*"+thisVideo.videoHeight);
        if(thisVideo.duration>=videoLimit.min && thisVideo.duration<=videoLimit.max){
            $("#thisDurationResult").text("O").css("color","green");
        }else{
            $("#thisDurationResult").text("X").css("color", "red");
        }

        if(thisVideo.videoWidth>=1280 && thisVideo.videoHeight>=720){
            $("#thisResolutionResult").text("O").css("color", "green");
        }else{
            $("#thisResolutionResult").text("X").css("color", "red");
        }

    };
    videoElement.src = URL.createObjectURL(thisVideo);
}

function dragenter(){
    $("#dropbox").css("border","5px solid blue");
    $("#dropbox").text("丟下去！");
}

function dragleave(){
    $("#dropbox").css("border", "5px dashed black");
    $("#dropbox").text("可以按下下方按鈕或拖拉檔案至此處");
}

function dragover(e){
    e.preventDefault();
}

function drop(e){
    e.preventDefault();
    // debugger;
    let files = e.originalEvent.dataTransfer.files;
    if(files.length == 0){
        return false;
    }
    $("table").empty();
    $("table").append("<tr><th>檢核項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
    processFile(files);
    dragleave();
}

