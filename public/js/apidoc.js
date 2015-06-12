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

            // 点击弹窗
            $('body').on('click','[rel="popup"]',function(){
                layer.alert("popup");
            });
        }
    }

    $(function() {
        Apidoc.bindEvent();
    });
})(jQuery,GLOBAL,Util);