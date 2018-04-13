
var IntelliOverlay = {
    /**
     * config attributes
     */
    config: {
        selector:        "",
        STARTING_DELAY:  0,
        CLOSING_TIMEOUT: 2000,
        appointed:       true
    },

    /**
     * timeout attributes
     */
    time:       0,
    intervalId: 0,

    /**
     * creates a new instance
     *
     * @param selector
     * @param STARTING_DELAY
     * @param CLOSING_TIMEOUT
     * @param onOpen
     * @param onClose
     *
     * @returns Object
     */
    create: function (selector, STARTING_DELAY, CLOSING_TIMEOUT, appointed, onOpen, onClose) {
        this.init(selector, STARTING_DELAY, CLOSING_TIMEOUT, appointed, onOpen, onClose);

        return Object.create(this.overlay);
    },

    /**
     * initializes config and event listeners
     *
     * @param selector
     * @param STARTING_DELAY
     * @param CLOSING_TIMEOUT
     * @param onOpen
     * @param onClose
     */
    init: function (selector, STARTING_DELAY, CLOSING_TIMEOUT, appointed, onOpen, onClose) {
        IntelliOverlay.time                   = 0;
        IntelliOverlay.config.selector        = selector !== undefined ? selector : "";
        IntelliOverlay.config.STARTING_DELAY  = STARTING_DELAY !== undefined ? STARTING_DELAY : 0;
        IntelliOverlay.config.CLOSING_TIMEOUT = CLOSING_TIMEOUT !== undefined ? CLOSING_TIMEOUT : 2000;
        IntelliOverlay.config.appointed       = appointed !== undefined ? appointed : true;
        IntelliOverlay.onOpen                 = onOpen !== undefined ? onOpen : IntelliOverlay.onOpen;
        IntelliOverlay.onClose                = onClose !== undefined ? onClose : IntelliOverlay.onClose;

        return;
    },

    /**
     * starting delay function
     *
     * @returns Promise
     */
    delay: function() {
        var deferred = $.Deferred();

        $.when(IntelliOverlay.onOpen()).then(function() {
            if(IntelliOverlay.config.appointed === true) return;

            return deferred.reject();
        });

        setTimeout(function() {
            return deferred.resolve();
        }, IntelliOverlay.config.STARTING_DELAY);

        return deferred.promise();
    },

    /**
     * closing timeout function
     */
    timeout: function() {
        this.time = Date.now();

        IntelliOverlay.intervalId = setInterval(function () {
            if(IntelliOverlay.time === 0) return;

            if (IntelliOverlay.time + IntelliOverlay.config.CLOSING_TIMEOUT < Date.now()) {
                IntelliOverlay.overlay.close();
            }
        }, 50);

        return;
    },

    /**
     * on open event listener
     *
     * @returns Promise
     */
    onOpen:  function() {
        var deferred = $.Deferred();

        deferred.reject();

        return deferred.promise();
    },

    /**
     * on close event listener
     *
     * @returns Promise
     */
    onClose: function() {
        var deferred = $.Deferred();

        deferred.reject();

        return deferred.promise();
    },

    /**
     * close interface for event listeners
     *
     * @returns {*}
     */
    close: function() {
        return IntelliOverlay.overlay.close();
    },

    /**
     * overlay main object
     */
    overlay: {
        /**
         * opens overlay
         *
         * @returns {*}
         */
        open: function () {
            if(typeof IntelliOverlay.onOpen !== "function")               return;
            if(typeof IntelliOverlay.onClose !== "function")              return;
            if(typeof IntelliOverlay.config.selector !== "string")        return IntelliOverlay.onClose();
            if(typeof IntelliOverlay.config.STARTING_DELAY !== "number")  return IntelliOverlay.onClose();
            if(typeof IntelliOverlay.config.CLOSING_TIMEOUT !== "number") return IntelliOverlay.onClose();
            if(IntelliOverlay.config.selector.length === 0)               return IntelliOverlay.onOpen();

            IntelliOverlay.time = Date.now();

            return $.when(IntelliOverlay.delay()).fail(function() {
                return IntelliOverlay.overlay.close();
            }).then(function() {
                $(IntelliOverlay.config.selector).show();

                return $.colorbox({
                    inline:       true,
                    href:         IntelliOverlay.config.selector,
                    initialWidth: 320,
                    open:         true,
                    content:      $(IntelliOverlay.config.selector).html(),
                    closeButton:  false,
                    overlayClose: false,
                    escKey:		  false,
                    fixed:        true,
                    onOpen:       function () {
                        if(IntelliOverlay.config.CLOSING_TIMEOUT > 0) return IntelliOverlay.timeout();

                        return IntelliOverlay.overlay.close();
                    },
                    onCleanup: function () {
                        return $(IntelliOverlay.config.selector).hide();
                    }
                });
            });
        },
        /**
         * closes overlay
         *
         * @returns {*}
         */
        close: function () {
            if (IntelliOverlay.intervalId !== 0) {
                clearInterval(IntelliOverlay.intervalId);

                IntelliOverlay.intervalId = 0;
            }

            IntelliOverlay.time = 0;

            $.colorbox.close();

            return IntelliOverlay.onClose();
        }
    }
};
