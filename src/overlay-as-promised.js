(function($) {
    $.fn.overlayAsPromised = function(config, onOpen, onClose) {
        var colorbox;
        var self      = this;
        var intervals = [];
        var plugin    = {
            config: {}
        };
        
        var defaults = {
            closable:       true,
            closeButton:    false,
            closeLabel:     'Close',
            closeClass:     '',
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
            speed:          350,
            fixed:          false,
            fitScreen:      false,
            autoResize:     false
        };

        plugin.init = function(config, onOpen, onClose) {
            plugin.config          = $.extend(true, {}, defaults, config);
            plugin.overlay.onOpen  = onOpen  != null ? onOpen  : plugin.overlay.onOpen;
            plugin.overlay.onClose = onClose != null ? onClose : plugin.overlay.onClose;
            
            if(plugin.config.autoResize === true) {
                plugin.observe();
            }

            if(plugin.config.closeButton === true && self.find('#overlay_close_container').length < 1) {
                self.append($('<div id="overlay_close_container" class="overlay-close-container"><button class="overlay-close-button ' + plugin.config.closeClass + '">' + plugin.config.closeLabel + '</button></div>'));

                if(plugin.config.fitScreen === true) {
                    $('.overlay-close-container').addClass('overlay-bottom-fixed');

                    self.css('width', '100%');
                    self.css('height', '100%');
                }

                $('#colorbox').on('click', '.overlay-close-button', function() {
                    plugin.overlay.close();
                });
            }
        };

        plugin.clearIntervals = function() {
            intervals.forEach(function(interval) {
                clearInterval(interval);
            });
        };

        plugin.observe = function() {
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

            if(!MutationObserver) return;

            var observer = new MutationObserver(function(mutations, observer) {
                $(colorbox).colorbox.resize();
            });

            observer.observe(self[0], {
                subtree:   true,
                childList: true
            });
        };

        plugin.overlay = {
            open: function() {
                var start    = Date.now();
                var deferred = $.Deferred();

                setTimeout(function() {
                    colorbox = $.colorbox({
                        inline:       true,
                        href:         self,
                        initialWidth: 320,
                        open:         true,
                        content:      self.html(),
                        closeButton:  plugin.config.closable,
                        overlayClose: plugin.config.closable,
                        escKey:		  plugin.config.closable,
                        fixed:        plugin.config.fixed,
                        width:        plugin.config.fitScreen === true ? window.innerWidth : plugin.config.width,
                        height:       plugin.config.fitScreen === true ? window.innerHeight : plugin.config.height,
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
                            return self.show();
                        },
                        onClosed: function () {
                            plugin.clearIntervals();
                            plugin.overlay.onClose();
                            return self.hide();
                        }
                    });

                    setTimeout(function() {
                        $.when(plugin.overlay.onOpen()).then(function(result) {
                            deferred.resolve(result);
                        });

                    }, plugin.config.startingDelay + plugin.config.minDisplayTime);

                    if(plugin.config.maxDisplayTime > 0) {
                        intervals.push(setInterval(function() {
                            if(start +
                                plugin.config.startingDelay +
                                plugin.config.maxDisplayTime < Date.now()) {
                                    return plugin.overlay.close();
                            }
                        }, 50));
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

            resize: function() {
                $(colorbox).colorbox.resize();
            },

            onOpen:  function() {},
            onClose: function() {}
        };

        plugin.init(config, onOpen, onClose);

        return Object.create(plugin.overlay);
    };
}(jQuery));
