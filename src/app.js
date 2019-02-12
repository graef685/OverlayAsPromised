$(document).ready(function() {
    var overlay = $('.test').overlayAsPromised({
        closable: true,
    }, function() {
        return "it's working";
    }, function() {
        console.log("closed");
    });

    overlay.open().then(function(value) {
        console.log(value);
    });
});
