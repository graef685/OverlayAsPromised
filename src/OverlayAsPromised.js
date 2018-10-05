(function ( $ ) {
    $.overlayAsPromised = function(config, onOpen, onClose) {
        var plugin = this;

        plugin.config = {
            selector:       '',
            permanent:      true,
            closable:       true,
            startingDelay:  0,
            minDisplayTime: 0,
            maxDisplayTime: 0
        };

        plugin.init = function(init, onOpen, onClose) {
            plugin.config.selector       = init.selector != null ? init.selector : plugin.config.selector;
            plugin.config.permanent      = init.permanent != null ? init.permanent : plugin.config.permanent;
            plugin.config.closable       = init.closable != null ? init.closable : plugin.config.closable;
            plugin.config.startingDelay  = init.startingDelay != null ? init.startingDelay : plugin.config.startingDelay;
            plugin.config.minDisplayTime = init.minDisplayTime != null ? init.minDisplayTime : plugin.config.minDisplayTime;
            plugin.config.maxDisplayTime = init.maxDisplayTime != null ? init.maxDisplayTime : plugin.config.maxDisplayTime;
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

                    if(plugin.config.maxDisplayTime > 0 && plugin.config.permanent === false) {
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
