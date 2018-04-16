var OverlayAsPromised = {
    config: {
        selector:       '',
        permanent:      true,
        closable:       true,
        startingDelay:  0,
        minDisplayTime: 0,
        maxDisplayTime: 0
    },

    create: function(config, onOpen, onClose) {
        this.init(config, onOpen, onClose);

        return Object.create(this.overlay);
    },

    init: function(config, onOpen, onClose) {
        this.config.selector       = config.selector != null ? config.selector : this.config.selector;
        this.config.permanent      = config.permanent != null ? config.permanent : this.config.permanent;
        this.config.closable       = config.closable != null ? config.closable : this.config.closable;
        this.config.startingDelay  = config.startingDelay != null ? config.startingDelay : this.config.startingDelay;
        this.config.minDisplayTime = config.minDisplayTime != null ? config.minDisplayTime : this.config.minDisplayTime;
        this.config.maxDisplayTime = config.maxDisplayTime != null ? config.maxDisplayTime : this.config.maxDisplayTime;
        this.overlay.onOpen        = onOpen != null ? onOpen : this.overlay.onOpen;
        this.overlay.onClose       = onClose != null ? onClose : this.overlay.onClose;
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
                    onOpen:       function () {
                        return $(OverlayAsPromised.config.selector).show();
                    },
                    onClose: function () {
                        return $(OverlayAsPromised.config.selector).hide();
                    }
                });

                setTimeout(function() {
                    OverlayAsPromised.overlay.onOpen();
                }, OverlayAsPromised.config.startingDelay + OverlayAsPromised.config.minDisplayTime);

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
            OverlayAsPromised.overlay.onClose();

            return $.when();
        },

        onOpen: function() {

        },

        onClose: function() {

        }
    }
};
