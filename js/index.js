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
        // おまけ機能
        let adjustmentAmount = parseInt($("#adjustmentAmount").val()); 
        let creditPercent = parseFloat($("#creditPercent").val());
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
        // おまけ機能を初期化
        if (isNaN(adjustmentAmount)) adjustmentAmount = 0;
        if (isNaN(creditPercent)) creditPercent = 0;

        // 計算
        // ポイント合計
        let getPoint = 0;
        if (taxIncluded == 1) {
            getPoint = Math.floor(productAmount / 100 * pointSitePercent);
        } else {
            getPoint = Math.floor(productAmount / 110 * pointSitePercent);
        }
        let totalPoint = givesPoint + getPoint;
        // 実価格
        const actualPrice = productAmount - couponAmount - adjustmentAmount;
        // 利益額
        const profitAmount = sellAmount + totalPoint - actualPrice;
        // 利益率
        const profitRate = (profitAmount / actualPrice * 100).toFixed(2);
        // 結果
        let str = '<div>利益額は<strong class="text-danger">' + profitAmount.toLocaleString() + '円</strong>です。</div>';
        str+= '<div>利益率は<strong class="text-danger">' + profitRate + '％</strong>です。</div>';
        str+= '<div><small>購入金額' + actualPrice.toLocaleString() + '円に対し、獲得予定ポイントの合計は' + totalPoint.toLocaleString() + 'Pです。</small></div>';
        str+= '<div><small>※ポイントサイトの獲得予定ポイントは' + getPoint.toLocaleString() + 'Pです。</small></div>';
        str+= '<div class="h6">';
        str+= '<div><span class="badge bg-secondary">内訳</span></div>';
        str+= '商品価格：' + productAmount.toLocaleString() + '円<br>';
        str+= 'クーポン値引き：' + couponAmount.toLocaleString() + '円<br>';
        str+= '購入額：' + actualPrice.toLocaleString() + '円<br>';
        str+= '売却額：' + sellAmount.toLocaleString() + '円<br>';
        str+= 'ペイマポイント：' + givesPoint.toLocaleString() + 'P<br>';
        str+= 'ポイントサイト：' + getPoint.toLocaleString() + 'P<br>';
        str+= '利益額：' + profitAmount.toLocaleString() + '円<br>';
        str+= '利益率：' + profitRate + '％<br>';
        str+= '</div">';
        $('#calcResult').html(str);

        // 入力チェック
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
        };
    });
});