import Element from "./Helpers/element";
import Event from "./Helpers/event";

export function ready() {
    return Event.ready.apply(this, arguments);
}

export function addEventListener() {
    return Event.addEventListener.apply(this, arguments);
}

export function removeEventListener() {
    return Event.removeEventListener.apply(this, arguments);
}

export function invoke() {
    return Event.invoke.apply(this, arguments);
}

export function listen() {
    return Event.listen.apply(this, arguments);
}

export function delegate() {
    return Event.delegate.apply(this, arguments);
}

export function getTarget() {
    return Event.getTarget.apply(this, arguments);
}

export function preventDefault() {
    return Event.preventDefault.apply(this, arguments);
}

export function triggerEvent() {
    return Event.triggerEvent.apply(this, arguments);
}

// Elements
export function find() {
    return Element.find.apply(this, arguments);
}

export function hasClass() {
    return Element.hasClass.apply(this, arguments);
}

export function addClass() {
    return Element.addClass.apply(this, arguments);
}

export function removeClass() {
    return Element.removeClass.apply(this, arguments);
}

export function toggleClass() {
    return Element.toggleClass.apply(this, arguments);
}

export function siblings() {
    return Element.siblings.apply(this, arguments);
}

export function findSibling() {
    return Element.findSibling.apply(this, arguments);
}

export function hasCollection() {
    return Element.hasCollection.apply(this, arguments);
}

export function findParent() {
    return Element.findParent.apply(this, arguments);
}

export function isNodeList() {
    return Element.isNodeList.apply(this, arguments);
}

export function nextElementSibling() {
    return Element.nextElementSibling.apply(this, arguments);
}

export function previousElementSibling() {
    return Element.previousElementSibling.apply(this, arguments);
}

export function getAttributes() {
    return Element.getAttributes.apply(this, arguments);
}

export function scrollTo() {
    return Element.scrollTo.apply(this, arguments);
}

export function getCoords() {
    return Element.getCoords.apply(this, arguments);
}

export function prepend() {
    return Element.prepend.apply(this, arguments);
}

export function wrapElement() {
    return Element.wrapElement.apply(this, arguments);
}

export function createElem() {
    return Element.createElem.apply(this, arguments);
}
