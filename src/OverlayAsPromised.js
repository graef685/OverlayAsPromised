var OverlayAsPromised = {
    config: {
        selector:       '',
        permanent:      true,
        closable:       true,
        startingDelay:  0,
        minDisplayTime: 0,
        maxDisplayTime: 0,
        onOpen:         function() {},
        onClose:        function() {}
    },

    create: function(config) {
        this.init(config);

        return Object.create(this.overlay);
    },

    init: function(config) {
        this.config.selector       = config.selector != null ? config.selector : this.config.selector;
        this.config.permanent      = config.permanent != null ? config.permanent : this.config.permanent;
        this.config.closable       = config.closable != null ? config.closable : this.config.closable;
        this.config.startingDelay  = config.startingDelay != null ? config.startingDelay : this.config.startingDelay;
        this.config.minDisplayTime = config.minDisplayTime != null ? config.minDisplayTime : this.config.minDisplayTime;
        this.config.maxDisplayTime = config.maxDisplayTime != null ? config.maxDisplayTime : this.config.maxDisplayTime;
        this.config.onOpen         = config.onOpen != null ? config.onOpen : this.config.onOpen;
        this.config.onClose        = config.onClose != null ? config.onClose : this.config.onClose;
    },

    overlay: {
        open: function() {
            var start = Date.now();

            setTimeout(function() {
                $.colorbox({
                    inline:       true,
                    href:         $(OverlayAsPromised.config.selector),
                    initialWidth: 320,
                    open:         true,
                    content:      $(OverlayAsPromised.config.selector).html(),
                    closeButton:  OverlayAsPromised.config.closable,
                    overlayClose: OverlayAsPromised.config.closable,
                    escKey:		  OverlayAsPromised.config.closable,
                    fixed:        true,
                });



                setTimeout(function() {}, OverlayAsPromised.config.startingDelay + OverlayAsPromised.config.minDisplayTime);

                OverlayAsPromised.config.onOpen();

                if(OverlayAsPromised.config.maxDisplayTime > 0 && OverlayAsPromised.config.permanent === false) {
                    setInterval(function() {
                        if(start +
                            OverlayAsPromised.config.startingDelay +
                            OverlayAsPromised.config.maxDisplayTime < Date.now()) {
                                return OverlayAsPromised.overlay.close();
                        }
                    }, 50);
                }
            }, OverlayAsPromised.config.startingDelay);

            return $.when();
        },

        close: function() {
            $.colorbox.close();
            OverlayAsPromised.config.onClose()

            return $.when();
        }
    }
}

// $(document).ready(function() {
//     var overlay = OverlayAsPromised.create({
//         selector: '.test',
//         permanent: false,
//         minDisplayTime: 2000,
//         maxDisplayTime: 4000,
//         closable: false,
//         onOpen: function() {
//
//         }.bind(this)
//     });
//
//     overlay.open();
// });
