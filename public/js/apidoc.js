(function($,Global,Util){
    var Apidoc = {
        init: function(){

        },

        bindEvent:function(){

            // 点击切换验证码
            $('body').on('click', '.captcha-img', function() {
                var $img = $(this),
                    _src = $img.data('src');
                $img.attr('src',_src + new Date().getTime());
            });
        }
    }

    $(function() {
        Apidoc.bindEvent();
    });
})(jQuery,GLOBAL,Util);