
(function($) {

    var form, errors, is_form_ok;

    $.fn.enableValidation = function() {
        if(this.prop("tagName") != 'FORM'){
            if(console && console.log) console.log("Element is not a FORM.");
            return false;
        }

        form = this;
        form.attr('novalidate', 'novalidate').on('submit', onSubmit);
        errors = $('div.errors', form);
    }

    function onSubmit(e){
        is_form_ok = true;
        errors.html('');

        $('*[data-validation]', form).removeClass('error').each(validateField);

        if(!is_form_ok){
            e.preventDefault();
        }
    }

    function validateField(index, node){
        var elem  = $(node);
        var is_ok = isValidField(elem, elem.data('validation'));

        if(!is_ok){
            is_form_ok = false;
            elem.addClass('error');
            var errorMsg = $('<p>').text( elem.data('error-msg') )
            errors.append(errorMsg)
        }
    }

    function isValidField(elem, rule){
        if('not-empty' == rule){
            return elem.val() != '';
        }else if('email' == rule){
            return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/.test(elem.val());
        }else if('repeat' == rule){
            return elem.val() == $(elem.data('repeat-field')).val();
        }else if('telephone' == rule){
            return elem.val() != '';
        }else if('select' == rule){
            return elem.val() != '';
        }else if('checkbox' == rule){
            return elem.is(':checked');
        }
        return true;
    }

}( jQuery ));




$(function () {

    if( $('.key-benefits').length ){

        $('.key-benefits').on('click', '.nav a', function(e){
            e.preventDefault();
            var me = $(this);
            me.parent().addClass('selected').siblings().removeClass('selected')
            var id = me.attr('href');

            $('.key-benefits .content > div').hide();
            $('.key-benefits .content > div').filter(id).show();
        });

        $('.key-benefits .content > div').hide();
        $('.key-benefits .nav a').eq(0).trigger('click');

    }


    if( $('.faqs').length ){

        $('.faqs').on('click', 'h4', function(e){
            var me = $(this);
            if(me.hasClass('open')){
                me.removeClass('open').next().slideUp(150);
            }else{
                me.addClass('open').next().slideDown(150);
            }
        }).find('> div').hide();

    }


    if( $('.news-list').length ){

        var allItems  = $('.news-list .news-item');
        var numItems  = allItems.length;
        var maxItems  = $('.news-list').data('max-items');
        var moreItems = $('.news-list').data('more-items');

        if(numItems > maxItems){
            allItems.filter(':gt('+(maxItems-1)+')').parent().hide();
            $('.news-list .load-more').removeClass('hidden').on('click', 'span', function(){
                var n = $('.news-list .news-item').filter(':hidden:lt('+moreItems+')').parent().slideDown(150);

                if(allItems.filter(':hidden').length == 0){
                    $('.news-list .load-more').addClass('hidden');
                }
            });
        }

    }


    if( $('form[data-validate="true"]').length ){
        $('form[data-validate="true"]').enableValidation();
    }


});


