// JavaScript Document
$(function() {
    $("#buttonCalc").click(function(){
        // 値取得
        const productAmount = parseInt($("#productAmount").val());
        const sellAmount = parseInt($("#sellAmount").val());
        const couponAmount = parseInt($("#couponAmount").val());
        const givesPoint = parseInt($("#givesPoint").val());
        const pointSitePercent = parseFloat($("#pointSitePercent").val());
        const taxIncluded = $('input:radio[name="taxIncluded"]:checked').val();
        let errMessage = "";

        // フォームの初期化
        $('#calcResult').removeClass();
        $('#calcResult').text('');

        // 入力チェック
        validate();
        if (errMessage !== "") {
            $('#calcResult').addClass('text-danger');
            $('#calcResult').text(errMessage);
            return;
        };

        // 計算
        // ポイント合計
//        const totalPoint = givesPoint + Math.floor(productAmount / 100 * pointSitePercent);
        let totalPoint = 0;
        if (taxIncluded == 1) {
            totalPoint = givesPoint + Math.floor(productAmount / 100 * pointSitePercent);
        } else {
            totalPoint = givesPoint + Math.floor(productAmount / 110 * pointSitePercent);
        }
        // 実価格
        const actualPrice = productAmount - couponAmount;
        // 利益額
        const profitAmount = sellAmount + totalPoint - actualPrice;
        // 利益率
        const profitRate = (profitAmount / actualPrice * 100).toFixed(2);
        // 結果
        let str = '<div>利益額は<strong>' + profitAmount + '円</strong>です。</div>';
        str+= '<div>利益率は<strong>' + profitRate + '％</strong>です。</div>';
        $('#calcResult').html(str);


        console.log("data:" + errMessage);

        function validate(){
            // 商品価格
            if (isNaN(productAmount)) {
                errMessage = "商品価格を数値で入力してください";
                return;
            };
            // 売却額
            if (isNaN(sellAmount)) {
                errMessage = "売却金額を数値で入力してください";
                return;
            };
            // クーポン額
            if (isNaN(couponAmount)) {
                errMessage = "クーポン額を数値で入力してください";
                return;
            };
            // 付与ポイント
            if (isNaN(givesPoint)) {
                errMessage = "付与ポイントを数値で入力してください";
                return;
            };
            // ポイントサイト
            if (isNaN(pointSitePercent)) {
                errMessage = "商品価格を数値で入力してください";
                return;
            };

            console.log("f:" + productAmount);
        };
    });
});