$(document).ready(function() {
    $.colorbox({
        inline:       true,
        href:         $('.test'),
        initialWidth: 320,
        open:         true,
        content:      $('.test').html(),
        closeButton:  false,
        overlayClose: true,
        escKey:		  false,
        fixed:        true,
    });
});
