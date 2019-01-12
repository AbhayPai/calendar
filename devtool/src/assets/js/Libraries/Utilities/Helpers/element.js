export default (function () {
    var Element = {};

    /**
     * Has class
     *
     * @param node el A DOM node element
     * @param string className
     *
     * @return boolean
     */
    Element.hasClass = function (el, className) {
        if (el) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                return !!el.className.match(new RegExp('(\\s|^)' + className +
                    '(\\s|$)'));
            }
        }
    };

    /**
     * Add class
     *
     * @param node el A DOM node element
     * @param string className
     */
    Element.addClass = function (el, className) {
        if (el) {
            if (el.classList) {
                el.classList.add(className);
            } else if (!Element.hasClass(el, className)) {
                el.className += " " + className;
            }
        }
    };

    /**
     * Remove class
     *
     * @param node el A DOM node element
     * @param string className
     */
    Element.removeClass = function (el, className) {
        if (el && Element.hasClass(el, className)) {
            if (el && el.classList) {
                el.classList.remove(className);
            } else if (Element.hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        }
    };

    /**
     * Toggle class
     *
     * @param node el A DOM node element
     * @param string className
     */
    Element.toggleClass = function (el, className) {
        if (el) {
            if (el.classList) {
                el.classList.toggle(className);
            } else {
                var classes = el.className.split(' ');
                var existingIndex = -1;
                for (var i = classes.length; i--;) {
                    if (classes[i] === className) {
                        existingIndex = i;
                    }
                }

                if (existingIndex >= 0) {
                    classes.splice(existingIndex, 1);
                } else {
                    classes.push(className);
                }

                el.className = classes.join(' ');
            }
        }
    };

    /**
     * Element siblings
     *
     * @param node el A DOM node element
     *
     * @return node
     */
    Element.siblings = function (el) {
        var siblings = el.parentNode.children;
        var elementSiblings = [];

        for (var i = 0, len = siblings.length; i < len; i++) {
            if (siblings[i].nodeType === 1) {
                elementSiblings.push(siblings[i]);
            }
        }

        for (i = elementSiblings.length; i--;) {
            if (elementSiblings[i] === el) {
                elementSiblings.splice(i, 1);
                break;
            }
        }

        return elementSiblings;
    };

    /**
     * Find siblings
     *
     * @param node el A DOM node element
     * @param string selector
     *
     * @return node
     */
    Element.findSibling = function (el, selector) {
        var all = document.querySelectorAll(selector);
        var sibling = Element.siblings(el);

        for (var i = 0; i < sibling.length; i++) {
            if (Element.hasCollection(all, sibling[i])) {
                return sibling[i];
            }
        }
    };

    /**
     * Find parent
     *
     * @param node el A DOM node element
     * @param string className
     * @param int ceil The ceil
     *
     * @return node
     */
    Element.findParent = function (el, selector, ceil) {
        var all = document.querySelectorAll(selector);
        var cur = el.parentNode;
        var limit = 0;

        if (typeof ceil === 'undefined') {
            ceil = 10;
        }

        while (limit < ceil && cur && !Element.hasCollection(all, cur)) {
            // keep going up until you find a match
            limit += 1;
            cur = cur.parentNode; // go up
        }

        return cur; // will return null if not found
    };

    /**
     * Has collection
     *
     * @return boolean
     */
    Element.hasCollection = function (a, b) {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] === b) {
                return true;
            }
        }

        return false;
    };

    /**
     * Checks if element is a node list
     *
     * @param node el A DOM node element
     *
     * @return boolean
     */
    Element.isNodeList = function (el) {
        var string = Object.prototype.toString.call(el),
            webkit = NodeList.prototype.isPrototypeOf(el),
            ie;

        ie = typeof el === 'object' &&
            !(typeof el.tagName !== 'undefined' && el.tagName === 'SELECT') &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(string) &&
            (typeof el.length === 'number') &&
            (el.length === 0 || (typeof el[0] === "object" &&
                el[0].nodeType > 0));

        return ie || webkit;
    };

    /**
     * Gets the next element sibling
     *
     * @param node el A DOM node element
     *
     * @return node
     */
    Element.nextElementSibling = function (el) {
        do {
            el = el.nextSibling;
        } while (el && el.nodeType !== 1);

        return el;
    };

    /**
     * Gets the previous element sibling
     *
     * @param node el A DOM node element
     *
     * @return node
     */
    Element.previousElementSibling = function (el) {
        do {
            el = el.previousSibling;
        } while (el && el.nodeType !== 1);

        return el;
    };

    /**
     * Gets all attributes of an object
     *
     * @param node el A DOM node element
     *
     * @return object
     */
    Element.getAttributes = function (el) {
        var attributes = {};

        for (var att, i = 0, atts = el.attributes, n = atts.length;
            i < n; i++) {
            att = atts[i];
            attributes[att.nodeName] = att.nodeValue;
        }

        return attributes;
    };

    /**
     * Gets the previous element sibling
     *
     * @param node el A DOM node element
     * @param int duration
     */
    Element.scrollTo = function (el, duration) {
        if (duration < 0) {
            return;
        }

        var y = function (el) {
            var y = el.offsetTop;
            var node = el;

            while (node.offsetParent && node.offsetParent !== document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }

            return y;
        };

        var to = y(el);

        var scrollTop = document.body.scrollTop +
            document.documentElement.scrollTop;
        var difference = to - scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function () {
            scrollTop = scrollTop + perTick;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;

            if (scrollTop === to) {
                return;
            }

            Element.scrollTo(el, duration - 10);
        }, 10);
    };

    /**
     * Get top and left position of element relative to browser window
     *
     * @param node element to get the position
     *
     * @return object left and top position
     */
    Element.getCoords = function (el) {
        var box = el.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft ||
            body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    };

    /**
     * Insert at the very first of the parent element
     *
     * @param tag parent tag where the element will be inserted to
     * @param el element that will be inserted to the parent tag
     *
     */
    Element.prepend = function prepend(parent, el) {
        var x = document.querySelectorAll(parent)[0];
        x.insertBefore(el, x.children[0]);
    };

    /**
     * Wrap element
     *
     * @param Node el the element to be wrapped
     * @param String tag the tag name of the wrapper
     * @param String className class name of the wrapper
     *
     */
    Element.wrapElement = function (el, tag, className) {
        if (el) {
            var wrapper = document.createElement(tag || "div");

            if (className) {
                Element.addClass(wrapper, className);
            }

            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
        }
    };

    /**
     * Create Elem with className
     *
     * @param String tagName HTML tags
     * @param String className
     * @param Node parent insert automatically created tag inside this element
     * if provided
     *
     */
    Element.createElem = function (tagName, className, parent) {
        var element = document.createElement(tagName);

        if (className) {
            Element.addClass(element, className);
        }

        if (parent) {
            parent.appendChild(element);
        }

        return element;
    };

    return Element;
})();
