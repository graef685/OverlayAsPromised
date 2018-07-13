$(document).ready(function() {
    var overlay = $.overlayAsPromised({
        selector: '.test',
        permanent: true,
        closable: true
    }, function() {
        console.log("it's working");
    });

    overlay.open();
});
