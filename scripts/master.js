$(document).ready(function () {

    // Form Labels Interaction

    // IN
    /* $('.input').focusin(function () {
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
    }); */

    // Off Canevas
/*
    var burger = $('#burger');
    var offCanevas = $('.off-canevas');
    var links = $('#mobile-nav a');
    burger.click(function () {
        offCanevas.toggleClass('visible');
    });
    links.click(function () {
        offCanevas.toggleClass('visible');
    })
*/

    var ornements = {
        "sets": [{
                blue: './img/ornements/form-travaux-1-bleu.svg',
                white: './img/ornements/form-travaux-1-blanc.svg'
            },
            {
                blue: './img/ornements/form-travaux-2-bleu.svg',
                white: './img/ornements/form-travaux-2-blanc.svg'
            },
            {
                blue: './img/ornements/form-travaux-3-bleu.svg',
                white: './img/ornements/form-travaux-3-blanc.svg'
            },
            {
                blue: './img/ornements/form-travaux-4-bleu.svg',
                white: './img/ornements/form-travaux-4-blanc.svg'
            }
        ]
    }

    var picBg = {
        portrait: './img/ornements/form-photographie-portrait-bleu.svg',
        paysage: './img/ornements/form-photographie-paysage-bleu.svg'
    }

    var shadows = {
        works: './img/ornements/dropshadow-travaux.svg',
        chartes: './img/ornements/dropshadow-charte.svg'
    }
    
    // Works Display

    var wGrid = $('#work-grid');

    var worksData = $.getJSON("./data/works.json", function (data) {
    //var worksData = $.getJSON("https://api.myjson.com/bins/1d6xww", function (data) {

        for (i = (data.works.length)-1; i > -1; i--) {

            var set = Math.floor(Math.random() * 4);
            var ornBlue = ornements.sets[set].blue;
            var ornWhite = ornements.sets[set].white;

            var wId = data.works[i].id;
            var wTitle = data.works[i].title;
            var wSubTitle = data.works[i].subTitle;
            var wUrl = data.works[i].url;

            wGrid.append("<div w-id='" + wId + "' class='project-wrapper'></div>");
            var wWrapper = $("[w-id=" + i + "]");

            wWrapper.append("<div class='work-visual-wrapper'></div>");
            var wVisualWrapper = wWrapper.find('.work-visual-wrapper');

            wVisualWrapper.append("<div class='work-shadow'><img src='" + shadows.works + "' alt='background-ornement'></div>");
            wVisualWrapper.append("<div class='work-visual-blue'><img src='" + ornBlue + "' alt='background-ornement'></div>");
            wVisualWrapper.append("<div class='work-visual-white'><img src='" + ornWhite + "' alt='shadow-ornement'></div>");
            
            wWrapper.append("<div class='work-content-wrapper'></div>");
            var wConWrapper = wWrapper.find('.work-content-wrapper');
            
            wConWrapper.append("<h3>" + wTitle + "</h3>");
            wConWrapper.append("<p>" + wSubTitle + "</p>");
            wConWrapper.append("<div class='work-logo-wrapper'><img src='" + wUrl + "' alt='" + wTitle + "'></div>");
        }

    }).done(function (data) {

        var titleDisplay = $("#charte-title");
        var color1Display = $("#charte-color1");
        var color2Display = $("#charte-color2");
        var color3Display = $("#charte-color3");
        var colorVisualWrapper = $('.color-visual-wrapper');
        var logoDisplay = $("#logo-charte");
        var fontDisplay = $("#fonts");
        var maquetteDisplay = $("#maquette");

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

        var projectWrapper = $('.project-wrapper').click(function () {

            voidWork();

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

        var returnWork = $('.return-work').click(function () {
            voidWork();
        });
    });

    var lastPhoto = $('#home-last-photo');

    var photosData = $.getJSON("./data/photos.json", function (data2) {
    //var photosData = $.getJSON("https://api.myjson.com/bins/e0ly8", function (data2) {

        var pLast = (data2.photos.length)-1;
        var pId = data2.photos[pLast].id;
        var pTitle = data2.photos[pLast].title;
        var pUrl = data2.photos[pLast].url;
        var pFormat = data2.photos[pLast].format;

        lastPhoto.append("<div class='last-photo-wrapper'></div>");
        var wrapper = $("[p-id=" + pLast + "]");
        
        if (pFormat == 'paysage') {
            wrapper.append("<div class='photo-visual-paysage'><img src='" + picBg.paysage + "' alt='background-ornement'></div>");
        } else {
            wrapper.append("<div class='photo-visual-portrait'><img src='" + picBg.portrait + "' alt='background-ornement'></div>");
        }

        wrapper.append("<div class='last-photo-content-wrapper'></div>");
        var lastPhotoContent = wrapper.find('.last-photo-content-wrapper');

        lastPhotoContent.append("<div class='home-photo-wrapper'><img src='" + pUrl + "' alt='" + pTitle + "'>");
        lastPhotoContent.append("<div class='home-photo-info'><h3>" + pTitle + "</h3></div>");

    }).done(function (data2) {

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

        var returnWork = $('.return-photo').click(function () {
            voidPhoto();
        });
    });
});