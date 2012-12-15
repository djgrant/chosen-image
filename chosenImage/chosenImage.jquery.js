;;(function($) {

    $.fn.chosenImage = function(options) {

        return this.each(function() {

            var $select = $(this),
                imgMap  = {};

            // 1. Retrieve img-src from data attribute and build object of image sources for each list item
            $select.find('option').filter(function(){
                return $(this).text();
            }).each(function(i) {
                    var imgSrc   = $(this).attr('data-img-src');
                    imgMap[i]    = imgSrc;
            });


            // 2. Execute chosen plugin
            $select.chosen(options);

            var  chzn      = '#' + $select.attr('id') + '_chzn',
                $chzn      = $(chzn).addClass('chznImage-container');


            // 3. Style lis with image sources
            $chzn.find('.chzn-results li').each(function(i) {
                $(this).css(cssObj(imgMap[i]));
            });


            // 4. Change image on chosen selected element when form changes
            $select.change(function() {
                var imgSrc = ($select.find('option:selected').attr('data-img-src')) 
                                ? $select.find('option:selected').attr('data-img-src') : '';
                $chzn.find('.chzn-single span').css(cssObj(imgSrc));
            });

            $select.trigger('change');


            // Utilties
            function cssObj(imgSrc) {
                if(imgSrc) {
                    return {
                        'background-image': 'url(' + imgSrc + ')',
                        'background-repeat': 'no-repeat'
                    }
                } else {
                    return {
                        'background-image': 'none'
                    }
                }
            }
        });
    }

})(jQuery);
