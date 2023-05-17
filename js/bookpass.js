// JavaScript Document
$(function() {
    const baseUrl = "https://wowma.jp/itemlist?categ_id=96";

    // 読み込み処理
    $(function(){
        createUrl();
    });

    // 最低、最高価格、並び順変更
    $(".create-url").change(function(){
        createUrl();
    });

    // 移動ボタン
    $("#openUrl").click(function(){
        createUrl();
        // windowを開く
//        window.open('https://yahoo.co.jp', '_blank');
        window.open($("#url").val(), '_blank');
    });

    function createUrl() {
        let url = baseUrl;
        let clow = $("#clow").val();
        let hlow = $("#hlow").val();
        let sort1 = $("#sort1").val();
        
        // 最低価格
        if (clow) {
            url+= "&clow=" + clow;
        }
        // 最高価格
        if (hlow) {
            url+= "&hlow=" + hlow;
        }
        // 並び順
        if (sort1) {
            url+= "&sort1=" + sort1;
        }
        $("#url").val(url);
     }
});