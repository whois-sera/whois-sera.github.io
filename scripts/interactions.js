$(document).ready(function () {

     // Form Labels Interactions

     // IN

     $('.input').focusin(function () {

         var inputId = $(this).attr('id');
         var labels = $('label');

         for (i = 0; i < labels.length; i++) {

             if (labels.eq(i).attr('for') == inputId) {

                 labels.eq(i).addClass('translate');
             }
         }
     });

     // OUT

     $('.input').focusout(function () {

         if ($(this).val() == '') {

             var inputId = $(this).attr('id');
             var labels = $('label');

             for (i = 0; i < labels.length; i++) {

                 if (labels.eq(i).attr('for') == inputId) {

                     labels.eq(i).removeClass('translate');
                 }
             }
         }
     });

     // Off Canevas

     var burger = $('#burger');
     var offCanvas = $('#off-canvas');
     var links = $('#off-canvas a');
     var close = $('#close-canvas');

     burger.click(function () {
         offCanvas.toggleClass('visible');
         burger.toggleClass('hide');
     });

     links.click(function () {
         offCanvas.toggleClass('visible');
         burger.toggleClass('hide');
     })

     close.click(function () {
         offCanvas.toggleClass('visible');
         burger.toggleClass('hide');
     })
})