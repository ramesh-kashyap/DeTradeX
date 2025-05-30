(function() {
    if (typeof window > "u")
        return;
    var i, m = "ontouchstart"in window;
    document.createTouch || (document.createTouch = function(e, t, n, u, r, o, w) {
        return new a(t,n,{
            pageX: u,
            pageY: r,
            screenX: o,
            screenY: w,
            clientX: u - window.pageXOffset,
            clientY: r - window.pageYOffset
        },0,0)
    }
    ),
    document.createTouchList || (document.createTouchList = function() {
        for (var e = c(), t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return e.length = arguments.length,
        e
    }
    ),
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
    Element.prototype.closest || (Element.prototype.closest = function(e) {
        var t = this;
        do {
            if (t.matches(e))
                return t;
            t = t.parentElement || t.parentNode
        } while (t !== null && t.nodeType === 1);
        return null
    }
    );
    var a = function(t, n, u, r, o) {
        r = r || 0,
        o = o || 0,
        this.identifier = n,
        this.target = t,
        this.clientX = u.clientX + r,
        this.clientY = u.clientY + o,
        this.screenX = u.screenX + r,
        this.screenY = u.screenY + o,
        this.pageX = u.pageX + r,
        this.pageY = u.pageY + o
    };
    function c() {
        var e = [];
        return e.item = function(t) {
            return this[t] || null
        }
        ,
        e.identifiedTouch = function(t) {
            return this[t + 1] || null
        }
        ,
        e
    }
    var s = !1;
    function h(e) {
        return function(t) {
            t.type === "mousedown" && (s = !0),
            t.type === "mouseup" && (s = !1),
            !(t.type === "mousemove" && !s) && ((t.type === "mousedown" || !i || i && !i.dispatchEvent) && (i = t.target),
            i.closest("[data-no-touch-simulate]") == null && d(e, t),
            t.type === "mouseup" && (i = null))
        }
    }
    function d(e, t) {
        var n = document.createEvent("Event");
        n.initEvent(e, !0, !0),
        n.altKey = t.altKey,
        n.ctrlKey = t.ctrlKey,
        n.metaKey = t.metaKey,
        n.shiftKey = t.shiftKey,
        n.touches = l(t),
        n.targetTouches = l(t),
        n.changedTouches = f(t),
        i.dispatchEvent(n)
    }
    function f(e) {
        var t = c();
        return t.push(new a(i,1,e,0,0)),
        t
    }
    function l(e) {
        return e.type === "mouseup" ? c() : f(e)
    }
    function p() {
        window.addEventListener("mousedown", h("touchstart"), !0),
        window.addEventListener("mousemove", h("touchmove"), !0),
        window.addEventListener("mouseup", h("touchend"), !0)
    }
    p.multiTouchOffset = 75,
    m || new p
}
)();
