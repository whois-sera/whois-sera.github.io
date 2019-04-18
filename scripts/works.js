$(document).ready(function () {

    // Find Block For Insert

    var modalWork = $('#modal-work');

    var worksHomeContainer = $('#work-grid');
    var workContainer = $('#work-container');

    // Works Grid HomePage

    var shards = [
        "./img/ornements/shard_work1.svg",
        "./img/ornements/shard_work4.svg"
    ]

    function WorksHomeWrapper(id, title, subTitle, logo) {

        this.wHW = $('<div>').addClass('work-home-wrapper').attr('w-id', id);

        this.wHWC = $('<div>').addClass('work-home-wrapper-content');

        this.wH3 = $('<h3>').append(title);
        this.wP = $('<p>').append(subTitle);
        this.wLogo = $('<div>').addClass('logo');
        this.wLogoImg = $('<img>').attr({
            src: logo,
            alt: title
        });

        var randShard = Math.floor((Math.random() * 2));

        this.wShard = $('<div>').addClass('work-shard');
        this.wShardImg = $('<img>').attr({
            src: shards[randShard],
            alt: 'work shard'
        })

        this.build = build;

        function build() {
            this.wShard.append(this.wShardImg);
            this.wLogo.append(this.wLogoImg);
            this.wHWC.append(this.wH3, this.wP, this.wLogo, this.wShard);
            this.wHW.append(this.wHWC);
        }
    }

    // Clicked Work Modal

    function WorksWrapper(title, logo, colors, fonts, maquette) {

        this.wW = $('<div>').addClass('work-wrapper');
        this.wH3 = $('<h3>').append(title);
        this.wColors = $('<div>').addClass('colors');

        for (wwI = 0; wwI < colors.length; wwI++) {

            var wColor = $('<div>').addClass('color');
            var wColorForme = $('<div>').addClass('color-shape'); // append svg and get color
            var wColorSvg = "<svg xmlns='http://www.w3.org/2000/svg' fill='" + colors[wwI] + "' width='150' height='108.504' viewBox='0 0 150 108.504'><path id='Tracé_118' data-name='Tracé 118' d='M1820.941,268.934l-89.286,43.809,32.143,64.695,117.857-26.489Z' transform='translate(-1731.656 -268.934)'/></svg>"
            var wColorCode = $('<p>').append(colors[wwI]);

            wColorForme.append(wColorSvg);
            wColor.append(wColorForme, wColorCode);
            this.wColors.append(wColor);
        }

        this.wLogo = $('<div>').addClass('logo');
        this.wLogoImg = $('<img>').attr({
            src: logo,
            alt: title
        });

        this.wFonts = $('<div>').addClass('fonts');
        this.wFontShow = 'abcdefghijklmnopqrstuvwxyz<br>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>123456789';

        for (wwI = 0; wwI < fonts.length; wwI++) {

            var font = $('<div>').addClass('font');
            var fTitle = $('<p>').addClass('title').attr('cFont', fonts[wwI]).append(fonts[wwI]);
            var fP = $('<p>').attr('cFont', fonts[wwI]).append(this.wFontShow);

            font.append(fTitle, fP);
            this.wFonts.append(font);
        }

        this.wMaquette = $('<div>').addClass('maquette');
        this.wMaquetteImg = $('<img>').attr({
            src: maquette,
            alt: title
        });

        this.build = build;

        function build() {
            this.wLogo.append(this.wLogoImg);
            this.wMaquette.append(this.wMaquetteImg);
            this.wW.append(this.wH3, this.wColors, this.wLogo, this.wLogo, this.wFonts, this.wMaquette);
        }
    }

    // Works Display

    var worksData = $.getJSON("./data/works.json", function (data) {
    //var worksData = $.getJSON("https://api.myjson.com/bins/19t2n8", function (data) {

        for (i = (data.works.length) - 1; i > -1; i--) {

            var wId = data.works[i].id;
            var wTitle = data.works[i].title;
            var wSubTitle = data.works[i].subTitle;
            var wLogo = data.works[i].logo;

            var newWork = new WorksHomeWrapper(wId, wTitle, wSubTitle, wLogo);

            newWork.build();

            worksHomeContainer.append(newWork.wHW);

        }

    }).done(function (data) {

        var oneWork = $('.work-home-wrapper').click(function () {

            voidWork();

            var wId = $(this).attr('w-id');

            var wTitle = data.works[wId].title;
            var wLogo = data.works[wId].logo;
            var wColors = data.works[wId].colors;
            var wFonts = data.works[wId].fonts;
            var wMaquette = data.works[wId].maquette;

            var clickedWork = new WorksWrapper(wTitle, wLogo, wColors, wFonts, wMaquette);
            clickedWork.build();
            workContainer.append(clickedWork.wW);

            modalWork.toggleClass('visible');
        });
    });

    var closeWork = $('#close-work');

    closeWork.click(function () {
        modalWork.toggleClass('visible');
        voidWork();
    });

    function voidWork () {
        workContainer.html('');
    }
});