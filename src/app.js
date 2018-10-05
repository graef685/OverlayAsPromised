$(document).ready(function() {
    var overlay = $.overlayAsPromised({
        selector: '.test',
        closable: true,
    }, function() {
        return "it's working";
    });

    overlay.open().then(function(value) {
        console.log(value);
    });
});
