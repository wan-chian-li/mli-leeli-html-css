$(function(){
    $("Button").on("click",function(){
        let rand_item=Math.floor(Math.random()*($("li").length));
        //alert("test click");
        //console.log(rand_item);
        $("h1").text($("li").eq(rand_item).text());
    });
});

// $(function(){
//     let item_count=$("li").length;
//     const rand_item_count=Array(item_count).fill(0);
//     for(let i=0;i<10000;i++){
//         let rand_item=Math.floor(Math.random()*(item_count));
//         rand_item_count[rand_item]++;
//     }
//     //console.log(rand_item_count);

//     let outString="";
//     for(let i=0;i<item_count;i++) {
//         outString+=$("li").eq(i).text()+"("+rand_item_count[i]+")<br>";
//     }
//     $("h1").html(outString);    
// });
