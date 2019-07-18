$(document).ready(function() {
    var overlay = $('.test').overlayAsPromised({
        closable: true
    }, function() {
        return "it's working";
    }, function() {
        console.log("closed");
    });

    $('input#open-overlay').click(function() {
        overlay.open().then(function(value) {
            console.log(value);
        });
    });

    $('input#resize-overlay').click(function() {
        overlay.resize();
    });

     $('input#add-content').click(function() {
         $('.test').append('<div style="height: 100px; background-color: #ff0000"></div>');
     });
});
