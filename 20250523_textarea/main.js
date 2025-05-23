$(function(){
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);
});

function dragenter(){
    $("#dropbox").css("background-color","red");
    $("#dropbox").text("Drop it!");
}

function dragleave(){
    $("#dropbox").css("background-color", "blue");
    $("#dropbox").text("Come here.");
}

function dragover(e){
    // browser, please don't open or force download it.
    e.preventDefault();
}

function drop(e){
    e.preventDefault();
    // debugger;
    let files = e.originalEvent.dataTransfer.files;
    if(files.length == 0){
        return false;
    }
    convert(files[0]);
}

function convert(file){
    // debugger;
    if(!file.type.match(/text.*/)){
        alert("請拖放文字檔");
        dragleave();
        return false;
    }
    let reader = new FileReader();

    reader.onloadend = function(){
        let s = reader.result;
        let s_array = s.split(",");
        $("#preview").append(s+'\n');
        $("#preview").append("=========\n");
        for(let x=0;x<s_array.length;x++){
            $("#preview").append(`${x+1} : ${s_array[x]}\n`);
        }
        
    };

    reader.readAsText(file);

}