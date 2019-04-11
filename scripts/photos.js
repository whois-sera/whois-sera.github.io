$(document).ready(function () {

    // Find And Prepare Block For Insert

    var modalPhoto = $('#modal-photo');

    var photosHomeContainer = $('#photo-grid');

    var pSlider = $('<div>').addClass('uk-position-relative uk-visible-toggle uk-light').attr({
        'tabindex': "-1",
        'uk-slider': "sets: true"
    });

    var pSlierUl = $('<ul>').addClass('uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid');

    var goPrev = $('<a>').addClass('uk-position-center-left uk-position-small uk-hidden-hover').attr({
        'href': '#',
        'uk-slidenav-previous': '',
        'uk-slider-item': 'previous'
    });

    var goNext = $('<a>').addClass('uk-position-center-right uk-position-small uk-hidden-hover').attr({
        'href': '#',
        'uk-slidenav-next': '',
        'uk-slider-item': 'next'
    });

    var photoContainer = $('#photo-container');

    // Photo Grid HomePage

    function PhotosHomeWrapper(id, title, url) {

        this.pHW = $('<li>').addClass('photo-home-wrapper').attr('p-id', id);

        this.wPhoto = $('<img>').attr({
            src: url,
            alt: title
        });

        this.build = build;

        function build() {
            this.pHW.append(this.wPhoto);
        }
    }

    // Clicked Photo Modal

    function PhotoWrapper(title, place, date, apn, url) {

        this.pW = $('<div>').addClass('photo-wrapper');

        this.pTitle = $('<h3>').append(title);

        this.pWContent = $('<div>').addClass('photo-wrapper-content');

        this.pImg = $('<img>').attr({
            src: url,
            alt: title
        });

        this.pInfo = $('<div>').addClass('photo-info');

        this.pPlace = $('<h3>').append(place);

        this.pDate = $('<h3>').append(date);

        this.pApn = $('<h3>').append(apn);

        this.build = build;

        function build() {
            this.pInfo.append(this.pDate, this.pPlace, this.pApn);
            this.pWContent.append(this.pImg, this.pInfo);
            this.pW.append(this.pTitle, this.pWContent);
        }

    }

    // Photo Display

    var worksData = $.getJSON("./data/photos.json", function (data) {
    //var photoData = $.getJSON("https://api.myjson.com/bins/jkly8", function (data) {

        for (i = (data.photos.length) - 1; i > -1; i--) {

            var pId = data.photos[i].id;
            var pTitle = data.photos[i].title;
            var pUrl = data.photos[i].url;

            var newPhoto = new PhotosHomeWrapper(pId, pTitle, pUrl);
            newPhoto.build();
            pSlierUl.append(newPhoto.pHW);
        }

        pSlider.append(pSlierUl);
        pSlider.append(goPrev);
        pSlider.append(goNext);
        photosHomeContainer.append(pSlider);
        
    }).done(function (data) {

        var onePhoto = $('.photo-home-wrapper').click(function () {

            voidPhoto();

            var pId = $(this).attr('p-id');

            var pTitle = data.photos[pId].title;
            var pPlace = data.photos[pId].place;
            var pDate = data.photos[pId].date;
            var pApn = data.photos[pId].apn;
            var pUrl = data.photos[pId].url;

            var clickedPhoto = new PhotoWrapper(pTitle, pPlace, pDate, pApn, pUrl);
            clickedPhoto.build();
            photoContainer.append(clickedPhoto.pW);

            modalPhoto.toggleClass('visible');
        });
    });

    var closePhoto = $('#close-photo');

    closePhoto.click(function () {
        modalPhoto.toggleClass('visible');
        voidWork();
    });

    function voidPhoto() {
        photoContainer.html('');
    }
});