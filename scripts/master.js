$(document).ready(function () {

    // Form Labels Interaction ********************

    // IN
    $('.input').focusin(function () {
        var name = $(this).attr('id');
        var labels = $('label');
        for (i = 0; i < labels.length; i++) {
            if (labels.eq(i).attr('for') == name) {
                labels.eq(i).addClass('translate');
            }
        }
    });

    // OUT
    $('.input').focusout(function () {
        if ($(this).val() == '') {
            var name = $(this).attr('id');
            var labels = $('label');
            for (i = 0; i < labels.length; i++) {
                if (labels.eq(i).attr('for') == name) {
                    labels.eq(i).removeClass('translate');
                }
            }
        }
    });

    // Off Canevas ********************

    var burger = $('#burger');
    var offCanvas = $('#off-canvas');
    var links = $('#off-canvas a');
    var close = $('#close');
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

    // Objects for Ornement ********************

    var wOrnement = './img/ornements/form_work_final.svg'

    var picBg = {
        portrait: './img/ornements/form-photographie-portrait-bleu.svg',
        paysage: './img/ornements/form-photographie-paysage-bleu.svg'
    }

    var shadows = {
        works: './img/ornements/dropshadow-travaux.svg',
        chartes: './img/ornements/dropshadow-charte.svg'
    }
    
    // Modules

    var site = $('.site-wrapper');

    // Works Display ********************

    var wGrid = $('#work-grid');

    var worksData = $.getJSON("./data/works.json", function (data) {
    //var worksData = $.getJSON("https://api.myjson.com/bins/1d6xww", function (data) {

        for (i = (data.works.length)-1; i > -1; i--) {

            var wId = data.works[i].id;
            var wTitle = data.works[i].title;
            var wSubTitle = data.works[i].subTitle;
            var wUrl = data.works[i].url;

            wGrid.append("<div w-id='" + wId + "' class='project-wrapper'></div>");
            var wWrapper = $("[w-id=" + i + "]");

            wWrapper.append("<div class='work-content-wrapper'></div>");
            var wConWrapper = wWrapper.find('.work-content-wrapper');
            
            wConWrapper.append("<h3>" + wTitle + "</h3>");
            wConWrapper.append("<p>" + wSubTitle + "</p>");
            wConWrapper.append("<div class='work-logo-wrapper'><img src='" + wUrl + "' alt='" + wTitle + "'></div>");

            wWrapper.append("<div class='work-visual-wrapper'></div>");
            var wVisualWrapper = wWrapper.find('.work-visual-wrapper');

            wVisualWrapper.append("<div class='work-visual'><img src='" + wOrnement + "' alt='background-ornement'></div>");
            wVisualWrapper.append("<div class='work-shadow'><img src='" + shadows.works + "' alt='background-ornement'></div>");
            
        }

    }).done(function (data) {

        // Display Control
        var modalWork = $('#modal-window-work');
        var returnWork = $('#return-work');
        var modalLinksWork = modalWork.find('.modal-nav a');

        // Content wrappers
        var titleDisplay = $("#charte-title");
        var color1Display = $("#charte-color1");
        var color2Display = $("#charte-color2");
        var color3Display = $("#charte-color3");
        var colorVisualWrapper = $('.color-visual-wrapper');
        var logoDisplay = $("#logo-charte");
        var fontDisplay = $("#fonts");
        var maquetteDisplay = $("#maquette");

        // Void section
        function voidWork() {

            titleDisplay.html('');
            colorVisualWrapper.html('');
            color1Display.find('.code-wrapper').html('');
            color2Display.find('.code-wrapper').html('');
            color3Display.find('.code-wrapper').html('');
            logoDisplay.html('');
            fontDisplay.html('');
            maquetteDisplay.html('');
        }

        returnWork.click(function () {
            voidWork();
            site.addClass('display');
            modalWork.removeClass('display');
        });

        modalLinksWork.click(function () {
            voidWork();
            site.addClass('display');
            modalWork.removeClass('display');
        });


        var projectWrapper = $('.project-wrapper').click(function () {

            voidWork();

            site.removeClass('display');
            modalWork.addClass('display');

            var wId = $(this).attr('w-id');
            var wTitle = data.works[wId].title;
            var wTrl = data.works[wId].url;
            var wCode1 = data.works[wId].color1;
            var wCode2 = data.works[wId].color2;
            var wCode3 = data.works[wId].color3;
            var wFonts = data.works[wId].fonts;
            var wJpg = data.works[wId].maquette;

            maquetteDisplay.append("<div class='work-maquette-wrapper'><img src='" + wJpg + "' alt='" + wTitle + "'></div>");
            titleDisplay.append(wTitle);

            var colorVisualWrapper = $('.color-visual-wrapper');
            colorVisualWrapper.append("<svg class='charte-color' xmlns='http://www.w3.org/2000/svg' width='100' height='72.336' viewBox='0 0 100 72.336'><path id='Tracé_118' data-name='Tracé 118' d='M1791.18,268.934l-59.524,29.206,21.429,43.13,78.571-17.659Z' transform='translate(-1731.656 -268.934)'/></svg>");
            colorVisualWrapper.append("<svg class='charte-shadow' xmlns='http://www.w3.org/2000/svg' width='90' height='39.247' viewBox='0 0 90 39.247'><path id='Tracé_118' data-name='Tracé 118' d='M1767.37,268.934l-35.714,3.734,12.857,5.513,47.143-2.257Z' transform='translate(-1716.655 -253.934)' fill='#393939' opacity='0.25'/></svg>");

            color1Display.find('.charte-color').css('fill', wCode1);
            color2Display.find('.charte-color').css('fill', wCode2);
            color3Display.find('.charte-color').css({ 'fill': wCode3, 'strok': '#DEDEDE'});

            color1Display.find('.code-wrapper').append("<p>" + wCode1 + "</p>");
            color2Display.find('.code-wrapper').append("<p>" + wCode2 + "</p>");
            color3Display.find('.code-wrapper').append("<p>" + wCode3 + "</p>");

            logoDisplay.append("<div class='logo-wrapper'><img src='" + wTrl + "' alt='" + wTitle + "'></div>");

            for (j = 0; j < wFonts.length; j++) {
                fontDisplay.append("<div class='font " + wFonts[j] + "'><p class='font-title'>" + wFonts[j] + "</p><p class='font-p'>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789</p></div>");
            }

        });
    });

    var lastPhoto = $('#home-last-photo');

    var photosData = $.getJSON("./data/photos.json", function (data2) {
    //var photosData = $.getJSON("https://api.myjson.com/bins/e0ly8", function (data2) {

        var pLast = (data2.photos.length)-1;
        var pTitle = data2.photos[pLast].title;
        var pUrl = data2.photos[pLast].url;
        var pFormat = data2.photos[pLast].format;

        lastPhoto.append("<div class='last-photo-wrapper'></div>");
        var wrapper = $(".last-photo-wrapper");
        
        if (pFormat == 'paysage') {
            wrapper.append("<div class='photo-visual-paysage'><img src='" + picBg.paysage + "' alt='background-ornement'></div>");
            wrapper.append("<div class='last-photo-content-wrapper paysage'></div>");
        } else {
            wrapper.append("<div class='photo-visual-portrait'><img src='" + picBg.portrait + "' alt='background-ornement'></div>");
            wrapper.append("<div class='last-photo-content-wrapper portrait'></div>");
        }

        var lastPhotoContent = wrapper.find('.last-photo-content-wrapper');

        lastPhotoContent.append("<div class='home-photo-wrapper'><img src='" + pUrl + "' alt='" + pTitle + "'>");
        lastPhotoContent.append("<div class='home-photo-info'><h3>" + pTitle + "</h3></div>");

    }).done(function (data2) {

        var modalPhoto = $('#modal-window-photo');
        var returnPhoto = $('#return-photo');
        var modalLinksPhoto = modalPhoto.find('.modal-nav a');
        var photoAcces = $('.last-photo-content-wrapper');

        var photoGrid = $('#photo-grid');

        var pLast = (data2.photos.length)-1;

        var photoTitle = $('#photo-title');
        var pVisualWrapper = $('#photo-visual-wrapper');
        var photo = $('#photo');
        var lieu = $('#lieu');
        var date = $('#date');
        var apn = $('#apn');

        function voidPhoto() {
            photoTitle.html('');
            pVisualWrapper.html('');
            photo.html('');
            lieu.html('');
            date.html('');
            apn.html('');
        }

        photoAcces.click(function () {
            site.removeClass('display');
            modalPhoto.addClass('display');
        })

        modalLinksPhoto.click(function () {
            voidPhoto();
            site.addClass('display');
            modalPhoto.removeClass('display');
        });

        returnPhoto.click(function () {
            voidPhoto();
            site.addClass('display');
            modalPhoto.removeClass('display');
        });

        for (k = (data2.photos.length)-1; k > -1; k--) {
            var pId = data2.photos[k].id;
            var pUrl = data2.photos[k].url;
            var pTitle = data2.photos[k].title;
            
            photoGrid.append("<div class='grid-photo-wrapper' p-id='" + pId + "'><img src='" + pUrl + "' alt='" + pTitle + "'></div>");
        }

        function displayPhoto (photoId = pLast) {

            voidPhoto();

            var pTitle = data2.photos[photoId].title;
            var pFormat = data2.photos[photoId].format;
            var pUrl = data2.photos[photoId].url;
            var pPlace = data2.photos[photoId].place;
            var pDate = data2.photos[photoId].date;
            var pApn = data2.photos[photoId].apn;
            
            photoTitle.append(pTitle);
    
            if (pFormat == 'paysage') {
                pVisualWrapper.append("<div class='ornement photo-ornement-paysage'><img src='" + picBg.paysage + "' alt='background-ornement'></div>");
            } else {
                pVisualWrapper.append("<div class='ornement photo-ornement-portrait'><img src='" + picBg.portrait + "' alt='background-ornement'></div>");
            }
    
            photo.append("<img src='" + pUrl + "' alt='" + pTitle + "'>");
            lieu.append(pPlace);
            date.append(pDate);
            apn.append(pApn);
        }

        displayPhoto();

        var gridPhotoWrapper = $('.grid-photo-wrapper').click(function () {
            var displayId = $(this).attr('p-id');
            console.log(displayId);
            displayPhoto(displayId);
        });
    });
});