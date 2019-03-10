// custom javascript for the standalone tips page

$(document).on('ready', function(evt) {

    var supports_html5_storage = function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    // record which category the user last clicked to keep that open on next
    // page load within a certain time frame, i.e. navigate back to find the
    // category they had just opened still open now.
    $('.accordion-group h3').on('click', function(evt) {
        if (supports_html5_storage()) {
            var now = new Date().getTime(); // store in milliseconds
            var $h3 = $(evt.target);
            var cssId = $h3.attr('data-target');
            localStorage['lastOpenedCategory'] = cssId;
            localStorage['lastOpenedCategoryTime'] = now;
        }
    });

    // if they already have a last opened category, open it up on page load
    if (supports_html5_storage() && localStorage['lastOpenedCategory'] && localStorage['lastOpenedCategoryTime']) {
        var now = new Date().getTime();
        var then = parseInt(localStorage['lastOpenedCategoryTime'], 10);
        var threshold = 1000*60*10; // milliseconds to minutes
        if ((now - then) < threshold) {
            // expand category
            $(localStorage['lastOpenedCategory']).collapse('show');
        }
    }

});

function toggleVideos(on) {
    if(on) $('iframe[orig_src]').each(function() { $(this).attr('src', $(this).attr('orig_src')); });
    else $('iframe').each(function() { $(this).attr('orig_src', $(this).attr('src')); $(this).attr('src', ''); });
}