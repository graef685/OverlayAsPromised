(function ( $ ) {
    $.overlayAsPromised = function(config, onOpen, onClose) {
        var plugin = this;

        plugin.config = {
            selector:       '',
            closable:       true,
            startingDelay:  0,
            minDisplayTime: 0,
            maxDisplayTime: 0,
            width:          false,
            height:         false,
            maxWidth:       false,
            maxHeight:      false,
            top:            false,
            bottom:         false,
            left:           false,
            right:          false,
            className:      false,
            transition:     'elastic',
            speed:          350
        };

        plugin.init = function(init, onOpen, onClose) {
            plugin.config.selector       = init.selector != null ? init.selector : plugin.config.selector;
            plugin.config.closable       = init.closable != null ? init.closable : plugin.config.closable;
            plugin.config.startingDelay  = init.startingDelay != null ? init.startingDelay : plugin.config.startingDelay;
            plugin.config.minDisplayTime = init.minDisplayTime != null ? init.minDisplayTime : plugin.config.minDisplayTime;
            plugin.config.maxDisplayTime = init.maxDisplayTime != null ? init.maxDisplayTime : plugin.config.maxDisplayTime;
            plugin.config.width          = init.width != null ? init.width : plugin.config.width;
            plugin.config.height         = init.height != null ? init.height : plugin.config.height;
            plugin.config.maxWidth       = init.maxWidth != null ? init.maxWidth : plugin.config.maxWidth;
            plugin.config.maxHeight      = init.maxHeight != null ? init.maxHeight : plugin.config.maxHeight;
            plugin.config.top            = init.top != null ? init.top : plugin.config.top;
            plugin.config.bottom         = init.bottom != null ? init.bottom : plugin.config.bottom;
            plugin.config.left           = init.left != null ? init.left : plugin.config.left;
            plugin.config.right          = init.right != null ? init.right : plugin.config.right;
            plugin.config.className      = init.className != null ? init.className : plugin.config.className;
            plugin.config.transition     = init.transition != null ? init.transition : plugin.config.transition;
            plugin.config.speed          = init.speed != null ? init.speed : plugin.config.speed;
            plugin.overlay.onOpen        = onOpen != null ? onOpen : plugin.overlay.onOpen;
            plugin.overlay.onClose       = onClose != null ? onClose : plugin.overlay.onClose;
        };

        plugin.overlay = {
            open: function() {
                var start    = Date.now();
                var deferred = $.Deferred();

                setTimeout(function() {
                    $.colorbox({
                        inline:       true,
                        href:         $(plugin.config.selector),
                        initialWidth: 320,
                        open:         true,
                        content:      $(plugin.config.selector).html(),
                        closeButton:  plugin.config.closable,
                        overlayClose: plugin.config.closable,
                        escKey:		  plugin.config.closable,
                        fixed:        true,
                        width:        plugin.config.width,
                        height:       plugin.config.height,
                        maxWidth:     plugin.config.maxWidth,
                        maxHeight:    plugin.config.maxHeight,
                        top:          plugin.config.top,
                        bottom:       plugin.config.bottom,
                        left:         plugin.config.left,
                        right:        plugin.config.right,
                        className:    plugin.config.className,
                        transition:   plugin.config.transition,
                        speed:        plugin.config.speed,
                        onOpen:       function () {
                            return $(plugin.config.selector).show();
                        },
                        onClosed: function () {
                            plugin.overlay.onClose();
                            return $(plugin.config.selector).hide();
                        }
                    });

                    setTimeout(function() {
                        $.when(plugin.overlay.onOpen()).then(function(result) {
                            deferred.resolve(result);
                        });

                    }, plugin.config.startingDelay + plugin.config.minDisplayTime);

                    if(plugin.config.maxDisplayTime > 0) {
                        setInterval(function() {
                            if(start +
                                plugin.config.startingDelay +
                                plugin.config.maxDisplayTime < Date.now()) {
                                    return plugin.overlay.close();
                            }
                        }, 50);
                    }
                }, plugin.config.startingDelay);

                return deferred.promise();
            },

            close: function() {
                var deferred = $.Deferred();

                $.colorbox.close();

                $.when(plugin.overlay.onClose()).then(function(result) {
                    deferred.resolve(result);
                });

                return deferred.promise();
            },

            onOpen: function() {

            },

            onClose: function() {

            }
        };

        plugin.init(config, onOpen, onClose);

        return Object.create(plugin.overlay);
    };
}( jQuery ));
