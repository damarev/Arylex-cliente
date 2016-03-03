
(function($) {

    /**
     * Redimensiona gráfico de columnas
     * @param {Number[4]} pcts - Porcentajes de las 4 barras. Ej: [8,24,15,53]
     */
    $.fn.graphCols = function(pcts) {
        setColPct(this, '.col-A', pcts[0]);
        setColPct(this, '.col-B', pcts[1]);
        setColPct(this, '.col-C', pcts[2]);
        setColPct(this, '.col-D', pcts[3]);
    }

    function setColPct(context, selector, pct){
        context.children(selector).css('width', pct+'%').find('.bar > span').contents().first().replaceWith(pct);
    }

    /**
     * Setea tooltips en grafico coordenadas
     * @param {Number[4]} values - Porcentajes de las 4 barras. Ej: [8,24,15,53]
     */
    $.fn.graphCoords = function(texts) {
        setBoxTooltip(this, '.box-A', texts[0]);
        setBoxTooltip(this, '.box-B', texts[1]);
        setBoxTooltip(this, '.box-C', texts[2]);
        setBoxTooltip(this, '.box-D', texts[3]);
    }

    function setBoxTooltip(context, selector, contents){
        context.find(selector).find('.tooltip-box').html(contents);
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

});


