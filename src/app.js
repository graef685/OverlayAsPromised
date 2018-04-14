$(document).ready(function() {
    var overlay = OverlayAsPromised.create({
        selector: '.test',
        permanent: true,
        closable: true,
        onOpen: function() {

        }.bind(this)
    });

    overlay.open();
});
