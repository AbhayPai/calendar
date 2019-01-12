import Element from './element';
export default (function () {
    var Event = {};

    /**
     * Executes a callback on document ready
     *
     * @param closure fn Custom callback
     */
    Event.ready = function (fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn, false);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState !== 'loading') {
                    fn();
                }
            });
        }
    };

    /**
     * Add event listener
     *
     * @param node el A DOM node element
     * @param string eventName The event name to bind to
     * @param closure handler The custom handler for this event
     */
    Event.addEventListener = function (el, eventName, handler) {
        if (el) {
            if (el.addEventListener) {
                el.addEventListener(eventName, handler, false);
            } else {
                el.attachEvent('on' + eventName, function () {
                    handler.call(el);
                });
            }
        }
    };

    /**
     * Invokes an event
     *
     * @param node el A DOM node element
     * @param string eventName The event name to bind to
     * @param mixed data TCustom data to be passed to this event
     */
    Event.invoke = function (el, eventName, data) {
        return Event.triggerEvent(el, eventName, data);
    };

    /**
     * Add event listener with event and target automatically resolved
     *
     * @param node el A DOM node element
     * @param string eventName The event name to bind to
     * @param closure handler The custom handler for this event
     */
    Event.listen = function (el, eventName, handler) {
        Event.addEventListener(el, eventName, function (event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;

            handler(e, target);
        });
    };

    /**
     * Delegate event listener using event delegation to a particular wrapper
     *
     * @param node el A DOM node element
     * @param string selector The string selector
     * @param string eventName The event name to bind to
     * @param closure handler The custom handler for this event
     */
    Event.delegate = function (el, selector, eventName, handler, bubble) {
        var item = el.querySelector(selector);

        Event.addEventListener(el, eventName, function (event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;

            if (bubble && target !== item) {
                target = Element.findParent(target, selector);
            }

            if (target === item) {
                handler.apply(e, target);
            }
        });
    };

    /**
     * Remove event listener
     *
     * @param node el A DOM node element
     * @param string eventName The event name to bind to
     * @param closure handler The custom handler for this event
     */
    Event.removeEventListener = function (el, eventName, handler) {
        if (el.removeEventListener) {
            el.removeEventListener(eventName, handler);
        } else {
            el.detachEvent('on' + eventName, handler);
        }
    };

    /**
     * Get element event target
     *
     * @param event
     * @param node target
     */
    Event.getTarget = function (event) {
        if (typeof event.target !== "undefined") {
            return event.target;
        } else {
            return event.srcElement;
        }
    };

    /**
     * Prevent default
     *
     * @param event
     */
    Event.preventDefault = function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };

    /**
     * Trigger an event
     *
     * @param node el A DOM node element
     * @param string eventName The event name to bind to
     * @param mixed data TCustom data to be passed to this event
     */
    Event.triggerEvent = function (el, eventName, data) {
        var event;

        if (document.createEvent) {
            // fire for modern browsers
            event = document.createEvent('HTMLEvents');

            event.customData = data;
            event.initEvent(eventName, true, false);

            el.dispatchEvent(event);
        } else {
            try {
                // fire for legacy browsers
                event = document.createEventObject();

                event.eventType = eventName;
                event.customData = data;

                el.fireEvent('on' + event.eventType, event);
            } catch (e) {
                // fire for IE 8 using the event normalizer polyfill
                // Damn you IE 8
                event = new CustomEvent(eventName);

                event.customData = data;

                el.dispatchEvent(event);
            }
        }
    };

    return Event;
})();
