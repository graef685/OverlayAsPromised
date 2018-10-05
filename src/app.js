$(document).ready(function() {
    var overlay = $.overlayAsPromised({
        selector: '.test',
        permanent: true,
        closable: true
    }, function() {
        return "it's working";
    });

    overlay.open().then(function(value) {
        console.log(value);
    });
});
