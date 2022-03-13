if (typeof _STNS == "undefined") {
    if (!Array.prototype.push) {
        Array.prototype.push = function() {
            for (var i = 0; i < arguments.length; i++) {
                this[this.length] = arguments[i];
            }
            return this.length;
        };
    }
    if (!Array.prototype.pop) {
        Array.prototype.pop = function() {
            if (this.length) {
                var o = this[this.length - 1];
                this.length--;
                return o;
            }
        };
    }
    if (!Array.prototype.shift) {
        Array.prototype.shift = function() {
            if (this.length) {
                var o = this[0];
                for (var i = 0; i < this.length - 1; i++) {
                    this[i] = this[i + 1];
                }
                this.length--;
                return o;
            }
        };
    }
    if (!Function.prototype.call) {
        Function.prototype.call = function(_5) {
            var _5 = _5 || window;
            _5.__tmp = this;
            var _6 = _5.__tmp(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
            _5.__tmp = null;
            return _6;
        };
    }
    _STNS = {
        sVer: "3.0",
        bDebug: false,
        fvThrow: function(e) {},
        bBufImg: true,
        oImgs: {},
        fvBufImgs: function() {
            if (!_STNS.bBufImg) {
                return;
            }
            if (!_STNS.bLoaded) {
                var s = "";
                for (var i in _STNS.oImgs) {
                    if (_STNS.oImgs[i] != 2) {
                        s += _STNS.fsGetTag("div", "style=\"display:none\"", _STNS.fsGetImgTag(i, -1, -1));
                    }
                    _STNS.oImgs[i] = 2;
                }
                document.write(s);
            }
        },
        bIsIE: false,
        bIsMIE: false,
        bIsFX: false,
        bIsOP: false,
        bIsSF: false,
        bIsKQ: false,
        oNav: null,
        bRTL: false,
        sDocMd: null,
        sURL: window.location.href + "",
        sDIR: null,
        bLocal: false,
        fsGetDocMd: function(w) {
            var w = w || window;
            switch (w.document.compatMode) {
                case "QuirksMode":
                case "BackCompat":
                    return "quirks";
                case "CSS1Compat":
                    return "css1";
                default:
                    return document.compatMode;
            }
        },
        _foGetNav: function() {
            var _n = navigator,
                _u = _n.userAgent,
                _a = _n.appName,
                _p = _n.platform,
                n, v, p;
            if (/(Opera)[ \/]([\d\.]+)/.test(_u) || /(Netscape)\d*\/([\d\.]+)/.test(_u) || /(MSIE) ([\d\.]+)/.test(_u) || /(Chrome)\/([\d\.]+)/.test(_u) || /(Safari)\/([\d\.]+)/.test(_u) || /(Konqueror)\/([\d\.]+)/.test(_u) || /(Gecko)\/(\d+)/.test(_u)) {
                n = RegExp.$1.toLowerCase();
                v = RegExp.$2;
            } else {
                if (_a == "Netscape" && _n.appVersion.charAt(0) == "4") {
                    n = "netscape4";
                    v = parseFloat(_n.appVersion);
                } else {
                    n = "unknow";
                    v = 0;
                }
            }
            if (n == "netscape") {
                switch (_a) {
                    case "Microsoft Internet Explorer":
                        n = "msie";
                        v = /(MSIE) ([\d\.]+)/.exec(_u)[2];
                        break;
                    case "Netscape":
                        n = "gecko";
                        v = /(Gecko)\/(\d+)/.exec(_u)[2];
                }
            }
            if (/^(Win)/.test(_p) || /^(Mac)/.test(_p) || /^(SunOS)/.test(_p) || /^(Linux)/.test(_p) || /^(Unix)/.test(_p)) {
                p = RegExp.$1.toLowerCase();
            } else {
                p = _p;
            }
            return {
                name: n,
                version: v,
                platform: p
            };
        },
        fiGetCT: function(w) {
            var w = w || window;
            if (_STNS.bIsIE) {
                return (_STNS.fsGetDocMd(w) == "css1" ? w.document.documentElement : w.document.body).scrollTop;
            } else {
                return w.pageYOffset;
            }
        },
        fiGetCL: function(w) {
            var w = w || window;
            if (_STNS.bIsIE) {
                return (_STNS.fsGetDocMd(w) == "css1" ? w.document.documentElement : w.document.body).scrollLeft;
            } else {
                return w.pageXOffset;
            }
        },
        fiGetCW: function(w) {
            var w = w || window;
            if (_STNS.bIsIE) {
                return (_STNS.fsGetDocMd(w) == "css1" ? w.document.documentElement : w.document.body).clientWidth;
            } else {
                if (w.scrollbars && w.scrollbars.visible || w.innerHeight < document.documentElement.offsetHeight) {
                    return w.innerWidth - 20;
                }
            }
            return w.innerWidth;
        },
        fiGetCH: function(w) {
            var w = w || window;
            if (_STNS.bIsIE) {
                return (_STNS.fsGetDocMd(w) == "css1" ? w.document.documentElement : w.document.body).clientHeight;
            } else {
                if (w.scrollbars && w.scrollbars.visible || w.innerWidth < document.documentElement.offsetWidth) {
                    return w.innerHeight - 20;
                }
            }
            return w.innerHeight;
        },
        foGetMediaInfor: function(s) {
            _STNS.fvThrow(new Error("_STNS.runTime error:call foGetMediaInfor that has not been implemented"));
        },
        oLibs: {},
        sLibPth: "",
        fvInitLib: function() {
            var scs, sc, s, t, ls, pth;
            if (_STNS.bIsFX && !_STNS.faGetElesByTagName("body").length) {
                var hds = _STNS.faGetElesByTagName("head");
                sc = hds[0].lastChild;
            } else {
                scs = _STNS.faGetElesByTagName("script");
                sc = scs[scs.length - 1];
            }
            if (sc) {
                s = sc.src;
            }
            if (s) {
                _STNS.sLibPth = s.substr(0, s.lastIndexOf("/") + 1);
                t = _STNS.fcoGetAttribute(sc, "sothinkdebug");
                if (t == "true") {
                    pth = _STNS.fsGetAbsPth(_STNS.sLibPth + "debug/stdebug.js");
                    if (!_STNS.oLibs[pth]) {
                        _STNS.oLibs[pth] = {
                            state: 1,
                            defer: 0
                        };
                    }
                }
                t = _STNS.fcoGetAttribute(sc, "sothinklib");
                if (t) {
                    ls = t.split(";");
                    for (var i = 0; i < ls.length; i++) {
                        if (!ls[i]) {
                            continue;
                        }
                        if (!_STNS.fbIsFile(ls[i])) {
                            ls[i] += ".js";
                        }
                        pth = _STNS.fsGetAbsPth(_STNS.sLibPth + ls[i]);
                        if (_STNS.oLibs[pth]) {
                            continue;
                        }
                        _STNS.oLibs[pth] = {
                            state: 1,
                            defer: 0
                        };
                    }
                }
            } else {
                _STNS.fvThrow(new Error("_STNS.runTime error:can't get lib path"));
            }
        },
        fvInc: function(s, f) {
            if (!_STNS.oLibs[s]) {
                _STNS.oLibs[s] = {
                    state: 1,
                    defer: f
                };
            }
        },
        fvLoadLib: function() {
            var s = "";
            with(_STNS) {
                for (var i in oLibs) {
                    if (oLibs[i].state != 2) {
                        if (bLoaded) {
                            fbInsJs(i);
                        } else {
                            s += fsGetJsTag(i, oLibs[i].defer);
                        }
                        oLibs[i].state = 2;
                    }
                }
            }
            if (s) {
                document.write(s);
            }
        },
        bLoaded: false,
        _aLoads: [],
        fbAddLoad: function(f) {
            if (!_STNS.bLoaded && typeof f == "function") {
                return _STNS._aLoads.push(f);
            } else {
                if (_STNS.bLoaded) {
                    _STNS.fvThrow(new Error("_STNS.runTime error:Page has been loaded!"));
                } else {
                    _STNS.fvThrow(new Error("_STNS.runTime error:Not a function is pushed into onload event!"));
                }
            }
            return false;
        },
        _fvOnload: function() {
            with(_STNS) {
                if (bLoaded) {
                    return;
                }
                bLoaded = true;
                for (var j = 0; j < _aLoads.length; j++) {
                    _aLoads[j]();
                }
            }
        },
        _fvInitOnload: function() {
            if (_STNS.bIsIE && window.attachEvent) {
                window.attachEvent("onload", _STNS._fvOnload);
            } else {
                if (_STNS.oNav.name != "konqueror" && window.addEventListener) {
                    window.addEventListener("load", _STNS._fvOnload, false);
                } else {
                    if (!window.onload || window.onload.toString() != _STNS._fvOnload.toString()) {
                        if (typeof window.onload == "function") {
                            _STNS.fbAddLoad(window.onload);
                        }
                        onload = _STNS._fvOnload;
                    }
                }
            }
        },
        _aCks: [],
        bCkPg: false,
        nCkTid: 0,
        nCkTime: 100,
        fvAddCk: function(f) {
            if (typeof f == "function") {
                with(_STNS) {
                    if (bCkPg) {
                        clearTimeout(nCkTid);
                        bCkPg = false;
                    }
                    _aCks.push(f);
                    if (bLoaded) {
                        _fvCkPg();
                    }
                }
            } else {
                _STNS.fvThrow(new Error("_STNS.runTime error:Not a function is pushed into check page event!"));
            }
            return false;
        },
        _fvCkPg: function() {
            with(_STNS) {
                if (_aCks.length) {
                    bCkPg = true;
                    for (var i = 0; i < _aCks.length; i++) {
                        _aCks[i]();
                    }
                    nCkTid = setTimeout("_STNS._fvCkPg()", nCkTime);
                } else {
                    bCkPg = false;
                }
            }
        },
        bShield: false,
        oDefCSS: {
            tb: "border-style:none;background-color:transparent;background-image:none;",
            tr: "border-style:none;background-color:transparent;background-image:none;",
            td: "border-style:none;background-color:transparent;background-image:none;",
            dv: "border-style:none;background-color:transparent;background-image:none;margin:0px;padding:0px;",
            a: "display:block;border-style:none;background-color:transparent;background-image:none;margin:0px;padding:0px;",
            hd: "display:none;",
            sp: "border-style:none;background-color:transparent;background-image:none;margin:0px;padding:0px;"
        },
        foCss2Obj: function(s) {
            var o = {},
                a, re = /([\w\-_]+):([^;]+)(;|$)/,
                ra;
            a = s.split(";");
            for (var i = 0; i < a.length; i++) {
                ra = re.exec(a[i]);
                if (ra) {
                    o[ra[1]] = ra[2];
                }
            }
            return o;
        },
        foCss2Style: function(s) {
            var cs = _STNS.foCss2Obj(s),
                re = /-([a-z])/,
                o = {},
                i, k, t;
            for (i in cs) {
                t = re.exec(i);
                if (t) {
                    k = i.replace("-" + t[1], t[1].toUpperCase());
                } else {
                    k = i;
                }
                o[k] = cs[i];
            }
            return o;
        },
        fsObj2Css: function(a) {
            var s = "";
            for (var i in a) {
                if (a[i] != null) {
                    s += i + ":" + a[i] + ";";
                }
            }
            return s;
        },
        fvCSSShield: function() {
            with(_STNS) {
                if (bLoaded) {
                    bShield = false;
                } else {
                    if (faGetElesByTagName("body") && faGetElesByTagName("body").length) {
                        bShield = false;
                    } else {
                        var i, s = "\n<style type='text/css'>\n";
                        for (i in oDefCSS) {
                            if (i == "a") {
                                s += ".sta:link,.sta:hover,.sta:active,.sta:visited";
                            } else {
                                s += ".st" + i;
                            }
                            s += "{" + oDefCSS[i] + "}\n";
                        }
                        s += "</style>";
                        bShield = true;
                        document.write(s);
                    }
                }
            }
        },
        fsReadCoki: function(n) {
            var i, cs = document.cookie.split("; ");
            for (i = 0; i < cs.length; i++) {
                if (!cs[i].indexOf(n + "=")) {
                    return cs[i].substr(n.length);
                }
            }
        },
        fvSaveCoki: function(n, v, t) {
            var s = n + "=" + v + "; ",
                d = new Date;
            if (!t || !v) {
                s += "expires=Fri, 31 Dec 1999 23:59:59 GMT; ";
            } else {
                s += "expires=" + ((new Date(d - 0 + t)).toGMTString()) + "; ";
            }
            s += "path=/; ";
            document.cookie = s;
        },
        ffGetFun: function(f) {
            if (typeof f == "function") {
                return f;
            } else {
                if (typeof f == "string" && window[f]) {
                    return window[f];
                }
            }
        },
        fbIsAbsPth: function(s) {
            var t = s.toLowerCase();
            return /^(#|\?|\/|[a-z]:|http:|https:|file:|ftp:|javascript:|vbscript:|mailto:|about:|gopher:|news:|res:|telnet:|view-source|wais:|rtsp:|mms:|outlook:)/.test(t);
        },
        fsGetAbsPth: function(ss) {
            var s = ss;
            if (!s) {
                return s;
            }
            var re, t;
            if (!s.indexOf("//")) {
                return s;
            }
            if (s.charAt(0) == "/") {
                re = /^(file:\/{2,}[^\/]+\/|http:\/\/[^\/]+\/|https:\/\/[^\/]+\/)/;
                if (re.exec(_STNS.sDIR)) {
                    s = RegExp.$1 + s.substr(1);
                } else {
                    return s;
                }
            } else {
                if (s == "#") {
                    if (_STNS.sURL.charAt(_STNS.sURL.length - 1) != "#") {
                        return _STNS.sURL + "#";
                    } else {
                        return _STNS.sURL;
                    }
                } else {
                    if (!_STNS.fbIsAbsPth(s)) {
                        s = _STNS.sDIR + s;
                    } else {
                        return s;
                    }
                }
            }
            while (s.indexOf("/./") > 0) {
                s = s.replace("/./", "/");
            }
            while ((t = s.indexOf("/../")) > 0) {
                var p1, p2;
                p1 = s.substr(0, t);
                p2 = s.substr(t).replace("/../", "");
                p1 = p1.substr(0, p1.lastIndexOf("/") + 1);
                s = p1 + p2;
            }
            return s;
        },
        fsGetImgTag: function(s, w, h, b, id, nw, nh) {
            if (!s || !w || !h) {
                return "";
            }
            if (nw && nh) {
                if (w == -1 && h == -1) {
                    w = nw, h = nh;
                } else {
                    if (w == -1 && h != -1) {
                        w = Math.floor(nw * h / nh);
                    } else {
                        if (w != -1 && h == -1) {
                            h = Math.floor(nh * w / nw);
                        }
                    }
                }
            }
            return "<img class='stimg' src=\"" + s + "\"" + (w == -1 ? "" : " width=" + w) + (h == -1 ? "" : " height=" + h) + " border=" + (b ? b : 0) + (id ? " id='" + id + "'" : "") + ">";
        },
        fsGetJsTag: function(s, f) {
            return "<script type='text/javascript' language='javascript1.2' src=\"" + s + "\"" + (f ? " DEFER" : "") + "></" + "script>";
        },
        fsGetTag: function(t, a, s) {
            return "<" + t + " " + a + ">" + (s ? s : "") + "</" + t + ">";
        },
        fbIsFile: function(s) {
            return /\w+\.\w+$/.test(s);
        },
        fbIsImg: function(s) {
            return /\.(gif|png|jpg|jpeg|bmp)$/.test(s.toLowerCase());
        },
        fsGetDIR: function(s) {
            var t = s.toLowerCase();
            if (!t.indexOf("file:/") || !t.indexOf("http://") || !t.indexOf("https://")) {
                return s.substr(0, s.lastIndexOf("/") + 1);
            } else {
                return "";
            }
        },
        fsGetHTMLEnti: function(s, f) {
            if (!s) {
                return "";
            }
            var re;
            re = /&/g;
            s = s.replace(re, "&amp;");
            if (!f) {
                re = / /g;
                s = s.replace(re, "&nbsp;");
            }
            re = /</g;
            s = s.replace(re, "&lt;");
            re = />/g;
            s = s.replace(re, "&gt;");
            re = /\"/g;
            s = s.replace(re, "&quot;");
            return s;
        },
        faJoinA: function(a, b) {
            var c = [],
                l = Math.max(a.length, b.length);
            for (var i = 0; i < l; i++) {
                if (a[i] == null) {
                    c[i] = b[i];
                } else {
                    c[i] = a[i];
                }
            }
            return c;
        },
        S64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@",
        fiTransX2D: function(n, m) {
            m = String(m).replace(/ /gi, "");
            if (m == "") {
                return 0;
            }
            var a = _STNS.S64.substr(0, n);
            if (eval("m.replace(/[" + a + "]/gi,'')") != "") {
                _STNS.fvThrow(new Error("_STNS.runTime error:Transform bad number from " + m + " to 10!"));
                return 0;
            }
            var t = 0,
                c = 1;
            for (var x = m.length - 1; x > -1; x--) {
                t += c * (a.indexOf(m.charAt(x)));
                c *= n;
            }
            return t;
        },
        fsTranD2X: function(n, m) {
            m = String(m).replace(/ /gi, "");
            if (m == "") {
                return 0;
            }
            if (parseInt(m) != m) {
                _STNS.fvThrow(new Error("_STNS.runTime error:Transform bad number from 10 to " + m + "!"));
                return "";
            }
            var t = "",
                a = _STNS.S64.substr(0, n);
            while (m != 0) {
                var b = m % n;
                t = a.charAt(b) + t;
                m = (m - b) / n;
            }
            if (!t) {
                t = "0";
            }
            return t;
        },
        faCP2PP: function(cp, w) {
            var t, l;
            with(_STNS) {
                t = fiGetCT(w);
                l = fiGetCL(w);
                return [cp[0] + l, cp[1] + t];
            }
        },
        faPP2CP: function(pp, w) {
            var t, l;
            with(_STNS) {
                t = fiGetCT(w);
                l = fiGetCL(w);
                return [pp[0] - l, pp[1] - t];
            }
        },
        fsGetLen: function(t, l, p, b, s, w) {
            var _r = _STNS,
                u;
            if (w == null) {
                w = true;
            }
            if (s == null) {
                s = true;
            }
            if (p == null) {
                p = 0;
            }
            if (b == null) {
                b = 0;
            }
            if (typeof l == "string") {
                u = /%|px|pt|em|ex|pc|in|cm|mm$/.exec(l);
            }
            if (u) {
                switch (u[0]) {
                    case "%":
                        return l;
                    default:
                        l = parseInt(l), u = u[0];
                }
            } else {
                l = parseInt(l);
                u = "px";
            }
            switch (t) {
                case "dv":
                    if (_r.sDocMd == "css1" || (!_r.bIsIE && !_r.bIsOP || (_r.bIsOP && parseInt(_r.oNav.version) >= 8))) {
                        return l - 2 * p - 2 * b + u;
                    }
                    break;
                case "tb":
                    if (_r.bIsMIE && !w && s) {
                        return l - 2 * b - 2 * p + u;
                    }
                    break;
                case "td":
                    if (_r.bIsSF) {
                        if (_r.sDocMd != "css1" || w) {
                            if (s) {
                                return l - 2 * b + u;
                            } else {
                                return l - 2 * p + u;
                            }
                        } else {
                            return l - 2 * p - 2 * b + u;
                        }
                    } else {
                        if (!_r.bIsMIE && (_r.sDocMd == "css1" || w)) {
                            return l - 2 * b - 2 * p + u;
                        }
                    }
                    break;
            }
            return l + u;
        },
        fdmGetEleById: function(id, w) {
            var w = w || window;
            with(_STNS) {
                if (bIsIE && parseFloat(oNav.version) < 9) {
                    var es = w.document.all(id);
                    if (es && es.length && !es.tagName) {
                        return es[0];
                    } else {
                        return es;
                    }
                } else {
                    return w.document.getElementById(id);
                }
            }
        },
        faGetElesByTagName: function(n, w) {
            var w = w || window;
            with(_STNS) {
                if (bIsIE) {
                    return w.document.all.tags(n);
                } else {
                    return w.document.getElementsByTagName(n);
                }
            }
        },
        faGetElesByCls: function(n, w) {
            var w = w || window;
            var i, a = [],
                el, els = _STNS.bIsIE ? w.document.all : w.document.getElementsByTagName("*");
            for (i = 0; el = els[i]; i++) {
                if (el.className == n) {
                    a.push(el);
                }
            }
            return a;
        },
        fdmGetFmByName: function(n, w) {
            var w = w || window;
            if (w.frames[t]) {
                return w.frames[t];
            } else {
                if (w.parent) {
                    return w.parent.frames[t];
                }
            }
        },
        fbIsPar: function(p, c) {
            if (_STNS.bIsIE) {
                return p.contains(c);
            } else {
                if (!p || !c) {
                    return false;
                }
                if (p == c) {
                    return true;
                }
                do {
                    if (c.parentNode) {
                        c = c.parentNode;
                    } else {
                        break;
                    }
                    if (p == c) {
                        return true;
                    }
                } while (c);
            }
            return false;
        },
        fbInsHTML: function(e, p, h) {
            if (_STNS.bIsIE) {
                return e.insertAdjacentHTML(p, h);
            } else {
                var d = e.ownerDocument,
                    t = d.createElement("span");
                t.innerHTML = h;
                switch (p) {
                    case "beforeBegin":
                        return e.parentNode.insertBefore(t, e);
                    case "afterBegin":
                        return e.insertBefore(t, e.firstChild);
                    case "beforeEnd":
                        return e.appendChild(t);
                    case "afterEnd":
                        if (e.nextSibling) {
                            return e.parentNode.insertBefore(t, e.nextSibling);
                        } else {
                            return e.parentNode.appendChild(t);
                        }
                }
            }
            return false;
        },
        fbInsEle: function(e, p, ne) {
            if (_STNS.bIsIE) {
                return e.insertAdjacentElement(p, ne);
            } else {
                switch (p) {
                    case "beforeBegin":
                        return e.parentNode.insertBefore(ne, e);
                    case "afterBegin":
                        return e.insertBefore(ne, e.firstChild);
                    case "beforeEnd":
                        return e.appendChild(ne);
                    case "afterEnd":
                        if (o.nextSibling) {
                            return e.parentNode.insertBefore(ne, e.nextSibling);
                        } else {
                            return e.parentNode.appendChild(ne);
                        }
                }
            }
        },
        fbDelEle: function(e) {
            var p = e.parentNode;
            return p.removeChild(e);
        },
        fbInsJs: function(s, l) {
            var l = l || "JavaScript";
            var hd = _STNS.faGetElesByTagName("HEAD");
            if (hd && hd[0]) {
                l = l.toLowerCase();
                var t = document.createElement("script");
                t.language = l;
                if (!l.indexOf("javascript") || !l.indexOf("jscript")) {
                    t.type = "text/javascript";
                }
                t.src = s;
                _STNS.fbInsEle(hd, "beforeEnd", t);
            }
        },
        fdmCreateXMLHttp: function() {
            var _9a;
            if (window.XMLHttpRequest) {
                _9a = new XMLHttpRequest();
            } else {
                var _9b = ["MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
                for (var n = 0; n < _9b.length; n++) {
                    try {
                        _9a = new ActiveXObject(_9b[n]);
                        break;
                    } catch (e) {
                        _9a = null;
                    }
                }
            }
            if (!_9a) {
                _9a = null;
                _STNS.fvThrow(new Error("Create XMLHttpRequest fail!"));
                return;
            }
            if (_9a.readyState == null) {
                _9a.readyState = 0;
                _9a.addEventListener("load", function() {
                    _9a.readyState = 4;
                    if (typeof _9a.onreadystatechange == "function") {
                        _9a.onreadystatechange();
                    }
                }, false);
            }
            return _9a;
        },
        fdmCreateXMLDoc: function() {
            var _9d;
            if (_STNS.bIsIE) {
                var _9e = ["Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument", "Microsoft.XMLDOM"];
                for (var n = 0; n < _9e.length; n++) {
                    try {
                        _9d = new ActiveXObject(_9e[n]);
                        break;
                    } catch (e) {}
                }
            } else {
                _9d = document.implementation.createDocument("", "", null);
            }
            if (!_9d) {
                _STNS.fvThrow(new Error("Create XMLDOMDocument fail!"));
                return;
            }
            return _9d;
        },
        faGetElePos: function(e) {
            if (!e) {
                return;
            }
            var x = y = bl = bt = 0;
            var v = _STNS.oNav.version,
                a = new Array(v, 523.12),
                sv = a.sort()[0] == 523.12;
            if (_STNS.bIsSF && sv) {
                var o = e.offsetParent ? e.offsetParent.offsetParent ? e.offsetParent.offsetParent.offsetParent ? e.offsetParent.offsetParent.offsetParent ? e.offsetParent.offsetParent.offsetParent.offsetParent ? e.offsetParent.offsetParent.offsetParent.offsetParent : null : null : null : null : null;
                while (o) {
                    if (o.tagName == "TABLE") {
                        bl = parseInt(_STNS.fsGetEleStyle(o, "borderLeftWidth"));
                        bt = parseInt(_STNS.fsGetEleStyle(o, "borderTopWidth"));
                        if (!isNaN(bl)) {
                            x += bl;
                        }
                        if (!isNaN(bt)) {
                            y += bt;
                        }
                    }
                    o = o.offsetParent;
                }
            }
            while (e) {
                x += e.offsetLeft;
                y += e.offsetTop;
                if ((_STNS.oNav.name == "konqueror" || _STNS.oNav.name == "safari") && e.style.position.toLowerCase() == "absolute") {
                    break;
                }
                switch (e.tagName) {
                    case "TD":
                        if (_STNS.bIsIE || (_STNS.bIsSF && sv) || (_STNS.bIsOP && _STNS.oNav.version < 9)) {
                            bl = parseInt(_STNS.fsGetEleStyle(e, "borderLeftWidth"));
                            bt = parseInt(_STNS.fsGetEleStyle(e, "borderTopWidth"));
                            if (!isNaN(bl)) {
                                x += bl;
                            }
                            if (!isNaN(bt)) {
                                y += bt;
                            }
                        }
                        break;
                }
                if (e.parentNode && e.parentNode.tagName == "DIV") {
                    var s = _STNS.fsGetEleStyle(e.parentNode, "overflow").toLowerCase();
                    var w = _STNS.fsGetEleStyle(e.parentNode, "width").toLowerCase();
                    if (s == "hidden" || s == "scroll" || s == "auto") {
                        x -= e.parentNode.scrollLeft;
                        y -= e.parentNode.scrollTop;
                    }
                    if (w && w != "auto") {
                        if ((_STNS.bIsFX && _STNS.oNav.version > 20060414 && s != "visible") || (_STNS.bIsIE && _STNS.oNav.version >= 5)) {
                            bl = parseInt(_STNS.fsGetEleStyle(e.parentNode, "borderLeftWidth"));
                            bt = parseInt(_STNS.fsGetEleStyle(e.parentNode, "borderTopWidth"));
                            if (!isNaN(bl)) {
                                x += bl;
                            }
                            if (!isNaN(bt)) {
                                y += bt;
                            }
                        }
                    }
                }
                if (e.parentNode && e.offsetParent && e.parentNode != e.offsetParent) {
                    if (e.offsetParent.tagName == "DIV") {
                        var s = _STNS.fsGetEleStyle(e.offsetParent, "overflow").toLowerCase();
                        var w = _STNS.fsGetEleStyle(e.offsetParent, "width").toLowerCase();
                        if (s == "hidden" || s == "scroll" || s == "auto") {
                            x -= e.offsetParent.scrollLeft;
                            y -= e.offsetParent.scrollTop;
                        }
                        if (w && w != "auto") {
                            if ((_STNS.bIsFX && _STNS.oNav.version > 20060414 && s != "visible") || (_STNS.bIsIE && _STNS.oNav.version >= 5)) {
                                bl = parseInt(_STNS.fsGetEleStyle(e.offsetParent, "borderLeftWidth"));
                                bt = parseInt(_STNS.fsGetEleStyle(e.offsetParent, "borderTopWidth"));
                                if (!isNaN(bl)) {
                                    x += bl;
                                }
                                if (!isNaN(bt)) {
                                    y += bt;
                                }
                            }
                        }
                    }
                }
                e = e.offsetParent;
            }
            return [x, y];
        },
        fiGetEleWid: function(e) {
            return e.offsetWidth;
        },
        fiGetEleHei: function(e) {
            return e.offsetHeight;
        },
        fsGetEleStyle: function(e, p) {
            if (!e || !p) {
                return;
            }
            if (_STNS.bIsIE) {
                return e.currentStyle[p];
            } else {
                if (_STNS.bIsFX || _STNS.bIsSF || _STNS.bIsOP) {
                    var w = e.ownerDocument.defaultView;
                    p = p.replace(/([A-Z])/g, "-$1");
                    return w.getComputedStyle(e, "").getPropertyValue(p.toLowerCase());
                } else {
                    return e.style[p];
                }
            }
        },
        fcoGetAttribute: function(e, a) {
            if (!e || !a) {
                return;
            }
            if (_STNS.bIsIE) {
                return e[a];
            } else {
                return e.getAttribute(a);
            }
        },
        fbFalse: function() {
            return false;
        },
        fbTrue: function() {
            return true;
        }
    };
    _STNS.Class = (function() {
        var _af = function() {
            var c = function(as) {
                if (_STNS.bIsIE) {
                    this._cls = this.constructor;
                } else {
                    this._cls = arguments.callee;
                }
                _b2.call(this, as);
            };
            _b3(c, arguments);
            c.register = _b4;
            c.toString = _b5;
            c.subclsOf = _b6;
            c.superclassOf = _b7;
            return c;
        };
        _af.toString = function() {
            return "[object Class]";
        };
        _af.getC = function(pth) {
            var _b9 = [];
            if (!_ba(pth, _b9) || !_bb[_b9[0]][_b9[1]]) {
                _STNS.fvThrow(new Error("Class get error: Class \"" + pth + "\" is not found"));
                return;
            }
            return _bb[_b9[0]][_b9[1]];
        };
        _af.getClsLst = function(o, pre) {
            var o = o || _bb,
                pre = pre || "/",
                sp, s = "";
            for (var i in o) {
                if (typeof o[i] == "object") {
                    sp = pre + i + "/";
                    s += _STNS.Class.getClsLst(o[i], sp);
                } else {
                    s += pre + i + "\n";
                }
            }
            return s;
        };
        var _b4 = function(pth) {
            var _c2 = [];
            if (!_ba(pth, _c2)) {
                _STNS.fvThrow(new Error("Class register error: Invalid class path:" + pth));
                return;
            }
            var pkg = _c2[0];
            var cn = _c2[1];
            if (pkg) {
                if (!_bb[pkg]) {
                    _bb[pkg] = {};
                }
                var _c5 = _bb[pkg][cn];
                if (_c5) {
                    _STNS.fvThrow(new Error("Class register error: Class \"" + pth + "\" already exists"));
                    return;
                }
                _bb[pkg][cn] = this;
            } else {
                var _c5 = _bb[cn];
                if (_c5) {
                    _STNS.fvThrow(new Error("Class register error: Class \"" + pth + "\" already exists"));
                    return;
                }
                _bb[cn] = this;
            }
            this._pkg = pkg;
            this._cn = cn;
        };
        var _bb = {};
        var _c6 = function(_c7, _c8) {
            if (typeof _c7 == "string") {
                _c7 = _STNS.Class.getC(_c7);
            }
            if (typeof _c8 == "string") {
                _c8 = _STNS.Class.getC(_c8);
            }
            if (typeof _c7 != "function" || typeof _c8 != "function") {
                return false;
            }
            if (!_c7._supers) {
                return false;
            }
            for (var i = 0; i < _c7._supers.length; i++) {
                if (_c7._supers[i] == _c8) {
                    return true;
                } else {
                    if (_c6(_c7._supers[i], _c8)) {
                        return true;
                    }
                }
            }
            return false;
        };
        var _b6 = function(cls) {
            return _c6(this, cls);
        };
        var _b7 = function(cls) {
            return _c6(cls, this);
        };
        var _ba = function(pth, _cd) {
            if (typeof pth != "string" || !pth) {
                return false;
            }
            var n = pth.lastIndexOf("/");
            if (n > -1) {
                _cd[0] = pth.substr(0, n);
                _cd[1] = pth.substr(n + 1);
            } else {
                _cd[0] = "";
                _cd[1] = pth;
            }
            return true;
        };
        var _b3 = function(c, as) {
            c._supers = [];
            for (var i = 0; i < as.length; i++) {
                var s = as[i];
                if (typeof s == "string") {
                    s = _STNS.Class.getC(s);
                }
                if (typeof s != "function") {
                    _STNS.fvThrow(new Error("Class create error: Invalid superclass: " + "args[" + i + "]"));
                    return;
                }
                c._supers.push(s);
            }
        };
        var _b2 = function(as) {
            var c = this._cls;
            for (var i = 0; i < c._supers.length; i++) {
                if (_STNS.bIsIE) {
                    this.constructor = c._supers[i];
                }
                c._supers[i].call(this, as);
            }
            if (_STNS.bIsIE) {
                this.constructor = c;
            }
            this._cls = c;
            this.toString = _d6;
            this.getClass = _d7;
            this.instanceOf = _d8;
            this.toConvert = _d9;
            if (c.construct) {
                c.construct.call(this, as);
            }
        };
        var _d9 = function(cls, as) {
            var c = this._cls;
            if (_c6(c, cls)) {
                var t = new cls;
                for (var i in this) {
                    if (typeof t[i] == "undefined") {
                        delete this[i];
                    }
                    if (cls[i]) {
                        this[i] = cls[i];
                    }
                }
            } else {
                if (_c6(cls, c)) {
                    var f = 0;
                    for (var i = 0; i < cls._supers.length; i++) {
                        if (_STNS.bIsIE) {
                            this.constructor = cls._supers[i];
                        }
                        if (cls._supers[i] != c) {
                            cls._supers[i].call(this, as);
                        } else {
                            f = 1;
                        }
                    }
                    if (!f) {
                        _STNS.fvThrow(new Error("_STNS.runTime error:Can't convert this instance;The class of instance must be the target class's direct superClass!"));
                        return;
                    }
                    if (_STNS.bIsIE) {
                        this.constructor = cls;
                    }
                    this._cls = cls;
                    if (cls.construct) {
                        cls.construct.call(this, as);
                    }
                } else {
                    _STNS.fvThrow(new Error("_STNS.runTime error:Can't convert this instance;The class of instance must be the target class's subClass or direct superClass!"));
                }
            }
        };
        var _d8 = function(c) {
            if (typeof c == "string") {
                c = _STNS.Class.getC(c);
            }
            if (typeof c !== "function") {
                return false;
            }
            return this._cls == c;
        };
        var _d7 = function() {
            return this._cls;
        };
        var _d6 = function() {
            if (this._cls._cn) {
                return "[object Object " + this._cls._pkg + "/" + this._cls._cn + "]";
            } else {
                return "[object Object Anonymous class]";
            }
        };
        var _b5 = function() {
            if (this._cn) {
                return "[object Class " + this._pkg + "/" + this._cn + "]";
            }
            return "[object Anonymous Class]";
        };
        return _af;
    })();
    with(_STNS) {
        sDocMd = fsGetDocMd();
        oNav = _foGetNav();
        bIsIE = oNav.name == "msie";
        bIsMIE = bIsIE && oNav.platform == "mac";
        bIsOP = oNav.name == "opera";
        bIsFX = oNav.name == "gecko";
        bIsSF = oNav.name == "safari";
        bIsKQ = oNav.name == "konqueror";
        sDIR = fsGetDIR(sURL);
        bLocal = !sURL.indexOf("file:");
        _fvInitOnload();
        fbAddLoad(_fvCkPg);
    }
}
_STNS.fvInitLib();
_STNS.fvLoadLib();
if (!_STNS.bShield) {
    _STNS.fvCSSShield();
}
if (typeof _STNS != "undefined" && !_STNS.UI) {
    _STNS.UI = {
        UNIUID: 0,
        DOMEVENTS: ["mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "click", "keypress", "keydown", "keyup", "dblclick"],
        foGetUIById: function(id) {
            var o;
            while (id) {
                if (o = _STNS.UI.oUIs[id]) {
                    return o;
                }
                id = id.substr(0, id.lastIndexOf("_"));
            }
        },
        fsGetUid: function() {
            this.iIdNo++;
            if (_STNS.UI.UNIUID) {
                return "stUI" + _STNS.UI.UNIUID + this.iIdNo;
            } else {
                if (window.name) {
                    return "stUI" + (_STNS.fsTranD2X(36, (new Date).getTime())) + this.iIdNo;
                } else {
                    return "stUI" + this.iIdNo;
                }
            }
        },
        iIdNo: 0,
        oUIs: {},
        fbDmEnt: function(e, o) {
            var oid = o.id,
                ob, r = -1;
            if (!oid) {
                return true;
            }
            if (ob = _STNS.UI.foGetUIById(oid)) {
                if (ob.fbGetEnt) {
                    r = ob.fbGetEnt(e, o);
                }
            }
            return r;
        },
        fsGetEnt: function(o, t, n, pre) {
            var s;
            if (n == null) {
                var n = "";
            }
            if (!pre) {
                var pre = "";
            }
            if (o._oEs[t + n] && o._oEs[t + n].length) {
                for (var i = 0; i < _STNS.UI.DOMEVENTS.length; i++) {
                    if (_STNS.UI.DOMEVENTS[i] == t) {
                        return "on" + t + "='return " + pre + "_STNS.UI.fbDmEnt(event,this)'";
                    }
                }
            }
            return "";
        }
    };
    with(_STNS.UI) {
        _STNS.UI.CUIObj = _STNS.Class();
        CUIObj.register("UI/CUIObj");
        CUIObj.construct = function() {
            this._oMs = {};
            this._oEs = {};
            this.oParent = null;
            this.sUid = _STNS.UI.fsGetUid();
            this.fbGetEnt = _STNS.fbTrue();
            with(_STNS.UI.CUIObj) {
                this.fvDestroy = fvDestroy;
                this.fvGetMsg = fvGetMsg;
                this.fbSetMsg = fbSetMsg;
                this.fbAttachEnt = fbAttachEnt;
                this.fbDetachEnt = fbDetachEnt;
                this.fbDetachAll = fbDetachAll;
                this.fbFireEnt = fbFireEnt;
                this.fbCheckEnt = fbCheckEnt;
                this.foClone = foClone;
            }
            _STNS.UI.oUIs[this.sUid] = this;
            this.sSelf = "_STNS.UI.oUIs['" + this.sUid + "']";
        };
        CUIObj.fvDestroy = function() {
            delete _STNS.UI.oUIs[this.sUid];
        };
        CUIObj.fvGetMsg = function(m, d) {
            var f, r = true;
            if (f = this._oMs[m]) {
                if (typeof f == "string") {
                    f = _STNS.ffGetFun(f);
                }
                if (f) {
                    r = f.call(this, d);
                }
            }
            if (r == true && this.oParent) {
                this.oParent.fvGetMsg(m, d);
            }
        };
        CUIObj.fbSetMsg = function(m, f) {
            if (typeof f != "function" && typeof f != "string") {
                _STNS.fvThrow(new Error("Attach invalid function to " + t + " message."));
                return false;
            }
            this._oMs[m] = f;
            return true;
        };
        CUIObj.fbCheckEnt = function(t) {
            if (this._oEs[t]) {
                return true;
            }
        };
        CUIObj.fbAttachEnt = function(t, f) {
            if (typeof f != "function" && typeof f != "string") {
                _STNS.fvThrow(new Error("Attach invalid function to " + t + " event."));
                return false;
            }
            if (this._oEs[t]) {
                for (var i = 0; i < this._oEs[t].length; i++) {
                    if (this._oEs[t][i] == f) {
                        return -1;
                    }
                }
                this._oEs[t].push(f);
            } else {
                this._oEs[t] = [f];
            }
            return true;
        };
        CUIObj.fbDetachEnt = function(t, f) {
            var i;
            if (this._oEs[t] && this._oEs[t].length) {
                for (i = 0; i < this._oEs[t].length; i++) {
                    if (this._oEs[t][i] == f) {
                        delete this._oEs[t][i];
                    }
                }
            }
        };
        CUIObj.fbDetachAll = function() {
            for (var i in this._oEs) {
                if (this._oEs[i].length) {
                    this._oEs[i].length = 0;
                }
                delete this._oEs[i];
            }
        };
        CUIObj.fbFireEnt = function(t, as) {
            var i, r = true,
                f, tmp;
            if (!this._oEs[t] || !this._oEs[t].length) {
                return -1;
            }
            for (i = 0; i < this._oEs[t].length; i++) {
                if (!this._oEs[t][i]) {
                    continue;
                }
                f = this._oEs[t][i];
                if (typeof f == "string") {
                    f = _STNS.ffGetFun(f);
                }
                if (f) {
                    tmp = f.call(this, as);
                    if (!tmp) {
                        r = tmp;
                    }
                }
            }
            return r;
        };
        CUIObj.foClone = function() {
            var o = {};
            for (var i in this) {
                o[i] = this[i];
            }
            o.sUid = _STNS.UI.fsGetUid();
            _STNS.UI.oUIs[o.sUid] = o;
            o.sSelf = "_STNS.UI.oUIs['" + o.sUid + "']";
            return o;
        };
    }
}
if (typeof _STNS != "undefined" && _STNS.UI && !_STNS.UI.CUIScroller) {
    with(_STNS.UI) {
        _STNS.UI.CUIScroller = _STNS.Class(_STNS.UI.CUIObj);
        CUIScroller.register("UI/CUIObj>CUIScroller");
        CUIScroller.construct = function() {
            this.___t = 0;
            this.sJsPth = "";
            this.iScMod = 1;
            this.iTyp = 0;
            this.iRowMinHei = -1;
            this.iScDelay = 1500;
            this.iScDir = 1;
            this._iScDir = 1;
            this._iNowScDir = 1;
            this.iScRate = 24;
            this.iScDist = 0;
            this.sScEff = 0;
            this.iEffTrans = 23;
            this.iEffSp = 1000;
            this.iMultiNum = 1;
            this.iCssMd = 0;
            this.iNid = 0;
            this.sId = 0;
            this.sVer = 0;
            this.sImgPth = 0;
            this.sLnkPre = 0;
            this.sBlank = 0;
            this.iMaxNO = 0;
            this.iCyc = 0;
            this.bAuto = 0;
            this.iSpeed = 10;
            this.sWid = 0;
            this.sHei = 0;
            this.sAlign = 0;
            this.iDPad = 0;
            this.iDSpc = 0;
            this.iIWid = 0;
            this.iIHei = 0;
            this.sIBdStyle = 0;
            this.iIBdWid = 0;
            this.sIBdClr = 0;
            this.sBgClr = 0;
            this.sBgImg = 0;
            this.sBgRep = 0;
            this.sBdStyle = 0;
            this.iBdWid = 0;
            this.sBdClr = 0;
            this.bImgBd = 0;
            this.aCorners = [];
            this.iCWH = 0;
            this.aBdBgImgs = [];
            this.aBdBgClrs = [];
            this.aBdBgReps = [];
            this.bRunEff = 1;
            this.sTipBdStyle = 0;
            this.iTipBdWid = 0;
            this.sTipBdClr = 0;
            this.bTipBdImg = 0;
            this.aTipCorners = [];
            this.iTipCWH = 0;
            this.aTipBdBgImgs = [];
            this.aTipBdBgClrs = [];
            this.aTipBdBgReps = [];
            this.aItems = [];
            this.bArr = 0;
            this.aLAEnImgs = [];
            this.aRAEnImgs = [];
            this.aLADisImgs = [];
            this.aRADisImgs = [];
            this.iLAImgWid = 0;
            this.iLAImgHei = 0;
            this.sLAAlign = 0;
            this.sLAVAlign = 0;
            this.iRAImgWid = 0;
            this.iRAImgHei = 0;
            this.sRAAlign = 0;
            this.sRAVAlign = 0;
            this.aTAEnImgs = [];
            this.aBAEnImgs = [];
            this.aTADisImgs = [];
            this.aBADisImgs = [];
            this.iTAImgWid = 0;
            this.iTAImgHei = 0;
            this.sTAAlign = 0;
            this.sTAVAlign = 0;
            this.iBAImgWid = 0;
            this.iBAImgHei = 0;
            this.sBAAlign = 0;
            this.sBAVAlign = 0;
            this.bTil = 0;
            this.iTTyp = 0;
            this.sTTxt = "";
            this.sTAlign = 0;
            this.sTFnt = 0;
            this.sTFntClr = 0;
            this.sTDeco = 0;
            this.sTBgClr = 0;
            this.sTBgImg = 0;
            this.sTBgRep = 0;
            this.bPause = 0;
            this.bPag = 0;
            this.aPBgClrs = [];
            this.aPFnts = [];
            this.aPFntClrs = [];
            this.aPDecos = [];
            this.iStat = 0;
            this.iDelaySh = 500;
            this.iDelayHd = 500;
            this.iScDur = 3000;
            this.iCurDur = 42;
            this._sMapStr = "";
            this._tTid = 0;
            this._tScTid = 0;
            this._iMaxDWid = 0;
            this._iMinDWid = 0;
            this._iAllWid = 0;
            this._iCurDWid = 0;
            this._iCurDHei = 0;
            this._iLWid = 0;
            this._iRWid = 0;
            this._iSelectP = 1;
            this._iSelectG = 1;
            this._iMaxPage = 1;
            this._bEnPag = [0, 0, 0, 0, 0];
            this._bEnPrevious = 0;
            this._bEnNext = 0;
            this._iIBdLen = 0;
            this._iBdLen = 0;
            this._iLMinWid = 0;
            this._iRMinWid = 0;
            this._iTMinHei = 0;
            this._iBMinHei = 0;
            this._iTMinWid = 0;
            this._iBMinWid = 0;
            this._iAllHei = 0;
            this._iMaxHei = 0;
            this._iMinHei = 0;
            this._iPageWid = 0;
            this._iPageHei = 0;
            this.oScEff = null;
            this.sPBgImg = "";
            this._iItemIndex = 0;
            this._aEffects = [];
            this._bIsRandomEff = false;
            this._bIsScrollEff = false;
            this._bImgOnly = false;
            this._bOverPause = false;
            this._tEffTid = 0;
            this._tResumePauseTid = 0;
            this.__bFirstAutoed = false;
            this._tTipHide = 0;
            this._iNowShowingTipId = 0;
            this._iLastStopedPage = 1;
            this._tReAuto = 0;
            this.sLineHeight = "";
            this.aPLineHeight = [];
            this._iDisableMax = 0;
            with(_STNS.UI.CUIScroller) {
                this.fsGetImg = fsGetImg;
                this.fsGetLnk = fsGetLnk;
                this.fvDestroy = fvDestroy;
                this.fsGetHTML = fsGetHTML;
                this.fbCreate = fbCreate;
                this.fbShow = fbShow;
                this.fsGetStyle = fsGetStyle;
                this.fbGetEnt = fbGetEnt;
                this.fbSetDisplay = fbSetDisplay;
                this.fbSetPag = fbSetPag;
                this.fbInit = fbInit;
                this.fbOverPag = fbOverPag;
                this.fbOutPag = fbOutPag;
                this.fbClickPag = fbClickPag;
                this.fbOverPrevious = fbOverPrevious;
                this.fbOutPrevious = fbOutPrevious;
                this.fbClickPrevious = fbClickPrevious;
                this.fbOverNext = fbOverNext;
                this.fbOutNext = fbOutNext;
                this.fbClickNext = fbClickNext;
                this.fbOverArrow = fbOverArrow;
                this.fbOutArrow = fbOutArrow;
                this.fbDownArrow = fbDownArrow;
                this.fbUpArrow = fbUpArrow;
                this.fbScroll = fbScroll;
                this.fbUpDate = fbUpDate;
                this.fbPageScroll = fbPageScroll;
                this.fbPauseScroll = fbPauseScroll;
                this.fbStartScroll = fbStartScroll;
                this.fbEndScroll = fbEndScroll;
                this.fsGetHotStr = fsGetHotStr;
                this.fbResumeScroll = fbResumeScroll;
                this.fbToPag = fbToPag;
                this.fb1XScroll = fb1XScroll;
                this.fb2XScroll = fb2XScroll;
                this.fb5XScroll = fb5XScroll;
                this.fiGetDir = fiGetDir;
                this.fbCanResume = fbCanResume;
                this.fvResumeDir = fvResumeDir;
                this.fbRe1XScroll = fbRe1XScroll;
                this.fiSetArrSt = fiSetArrSt;
                this.fsQuickEnt = fsQuickEnt;
                this.fsGetBGStyle = fsGetBGStyle;
                this.fsGetICStyle = fsGetICStyle;
                this.fsBlank = fsBlank;
                this.fbGetEff = fbGetEff;
                this.fiGetItemIndex = fiGetItemIndex;
                this.fvOverPause = function() {
                    clearTimeout(this._tReAuto);
                    this._bOverPause = true;
                };
                this.fvOutPause = function() {
                    if (this.bAuto) {
                        clearTimeout(this._tReAuto);
                        this._tReAuto = setTimeout(this.sSelf + "._bOverPause=false;" + this.sSelf + ".fbRe1XScroll();", (this.iScMod == 1 ? this.iScDelay : 100));
                    } else {
                        this._bOverPause = false;
                    }
                };
                this.fiGetFullPage = fiGetFullPage;
                this.fbAContainsB = fbAContainsB;
                this.fvSynHeight = fvSynHeight;
                this._bIsLoaded = false;
            }
        };
        CUIScroller.OVERLEFTARROW = 1;
        CUIScroller.ENABLELEFTARROW = 2;
        CUIScroller.OVERRIGHTARROW = 4;
        CUIScroller.ENABLERIGHTARROW = 8;
        CUIScroller.OVERPREVIOUS = 16;
        CUIScroller.OVERPAGINATION1 = 32;
        CUIScroller.OVERPAGINATION2 = 64;
        CUIScroller.OVERPAGINATION3 = 128;
        CUIScroller.OVERPAGINATION4 = 256;
        CUIScroller.OVERPAGINATION0 = 512;
        CUIScroller.OVERNEXT = 1024;
        CUIScroller.OVERDISPLAY = 2048;
        CUIScroller.SELECTED = 28672;
        CUIScroller.SELECTED_BIT = 12;
        CUIScroller.OVERTOPARROW = 32768;
        CUIScroller.ENABLETOPARROW = 65536;
        CUIScroller.OVERBOTTOMARROW = 131072;
        CUIScroller.ENABLEBOTTOMARROW = 262144;
        with(_STNS.UI.CUIScroller) {
            CUIScroller.MAXSTATE = OVERLEFTARROW | ENABLELEFTARROW | OVERRIGHTARROW | ENABLERIGHTARROW | OVERPREVIOUS | OVERPAGINATION1 | OVERPAGINATION2 | OVERPAGINATION3 | OVERPAGINATION4 | OVERPAGINATION0 | OVERNEXT | OVERDISPLAY | SELECTED | OVERTOPARROW | ENABLETOPARROW | OVERBOTTOMARROW | ENABLEBOTTOMARROW;
        }
        CUIScroller.fvDestroy = function() {
            for (var i = 0; i < this.aItems.length; i++) {
                this.aItems[i].fvDestroy();
            }
            _STNS.UI.CUIObj.fvDestroy.call(this);
        };
        CUIScroller.fbCreate = function() {
            _STNS.fvBufImgs();
            _STNS.fvInc(_STNS.fsGetAbsPth(this.sJsPth + "stseff.js"));
            _STNS.fvLoadLib();
            var s = "<script type='text/javascript'>" + this.sSelf + ".fbShow();" + "</script>";
            document.write(this.fsGetHTML() + s);
            return true;
        };
        CUIScroller.fbGetEff = function() {
            var _r = _STNS;
            try {
                this.oScEff.fbStop();
            } catch (ee) {}
            try {
                this.oScEff.fbDel();
            } catch (ee) {}
            if (this._bIsRandomEff) {
                this.oScEff = null;
                this.oScEff = _r.EFFECT.foGetEff(this._aEffects[parseInt(Math.random() * this._aEffects.length)], this.sUid + "_sc", window, this.iEffSp, this.iEffTrans);
            } else {
                this.oScEff = _STNS.EFFECT.foGetEff(this.sScEff, this.sUid + "_sc", window, this.iEffSp, this.iEffTrans);
            }
            if (this.oScEff) {
                if (!this.oScEff.fbSet()) {
                    this.oScEff.fbDel();
                    this.oScEff = 0;
                }
            }
            if (!this.oScEff) {
                return false;
            } else {
                if (this._bIsScrollEff) {
                    var ee = _r.fdmGetEleById(this.sUid + "_sc");
                    var sco = this;
                    if (this.iTyp) {
                        this.oScEff.fvFinishEffect = function() {
                            if (sco.iCyc == 1 && ee.scrollTop >= sco._iAllHei - sco.iDSpc) {
                                ee.scrollTop = 0;
                            }
                            sco.fbSetPag(1);
                        };
                    } else {
                        this.oScEff.fvFinishEffect = function() {
                            if (sco.iCyc == 1 && ee.scrollLeft >= sco._iAllWid - sco.iDSpc) {
                                ee.scrollLeft = 0;
                            }
                            sco.fbSetPag(1);
                        };
                    }
                }
                return true;
            }
        };
        CUIScroller.fbInit = function() {
            this._iScDir = this._iNowScDir = this.iScDir;
            var _r = _STNS,
                e, n, dw, _c = _r.UI.CUIScroller,
                tw;
            with(this) {
                if (iCyc == 1) {
                    this.iStat |= _c.ENABLERIGHTARROW | _c.ENABLELEFTARROW | _c.ENABLETOPARROW | _c.ENABLEBOTTOMARROW;
                } else {
                    if (this.iScDir == 1 || this.iScDir == 3) {
                        this.iStat |= _c.ENABLERIGHTARROW | _c.ENABLEBOTTOMARROW;
                    } else {
                        this.iStat |= _c.ENABLELEFTARROW | _c.ENABLETOPARROW;
                    }
                }
                iMaxNO = Math.min(iMaxNO, (iCyc == 1 ? this.aItems.length / 2 : this.aItems.length));
                n = iMaxNO ? iMaxNO : iCyc == 1 ? this.aItems.length / 2 : this.aItems.length / 2;
                if (iCssMd) {
                    e = _r.fdmGetEleById(sUid);
                    if (e) {
                        _iBdLen = _r.fsGetEleStyle(e, "borderLeftStyle") != "none" ? _r.fsGetEleStyle(e, "borderLeftWidth") : 0;
                        _iBdLen = _iBdLen ? parseInt(_iBdLen) : 0;
                    }
                    e = _r.fdmGetEleById(this.aItems[0].sUid + "_table");
                    if (e) {
                        _iIBdLen = _r.fsGetEleStyle(e, "borderLeftStyle") != "none" ? parseInt(_r.fsGetEleStyle(e, "borderLeftWidth")) : 0;
                        _iIBdLen = _iIBdLen ? parseInt(_iIBdLen) : 0;
                    }
                    e = _r.fdmGetEleById(sUid + "_arr0");
                    if (e) {
                        _iLMinWid = _r.fsGetEleStyle(e, "width");
                        _iLMinWid = _iLMinWid ? parseInt(_iLMinWid) : 0;
                    }
                    e = _r.fdmGetEleById(sUid + "_arr1");
                    if (e) {
                        _iRMinWid = _r.fsGetEleStyle(e, "width");
                        _iRMinWid = _iRMinWid ? parseInt(_iRMinWid) : 0;
                    }
                    e = _r.fdmGetEleById(sUid + "_arr2");
                    if (e) {
                        _iTMinHei = _r.fsGetEleStyle(e, "height");
                        _iTMinHei = _iTMinHei ? parseInt(_iTMinHei) : 0;
                        _iTMinWid = _r.fsGetEleStyle(e, "width");
                        _iTMinWid = _iTMinWid ? parseInt(_iTMinWid) : 0;
                    }
                    e = _r.fdmGetEleById(sUid + "_arr3");
                    if (e) {
                        _iBMinHei = _r.fsGetEleStyle(e, "height");
                        _iBMinHei = _iBMinHei ? parseInt(_iBMinHei) : 0;
                        _iBMinWid = _r.fsGetEleStyle(e, "width");
                        _iBMinWid = _iBMinWid ? parseInt(_iBMinWid) : 0;
                    }
                    e = _r.fdmGetEleById(sUid + "_limg");
                    if (e) {
                        _iLWid = _r.fsGetEleStyle(e, "width");
                        _iLWid = _iLWid ? parseInt(_iLWid) : 0;
                    }
                    e = _r.fdmGetEleById(sUid + "_rimg");
                    if (e) {
                        _iRWid = _r.fsGetEleStyle(e, "width");
                        _iRWid = _iRWid ? parseInt(_iRWid) : 0;
                    }
                    e = _r.fdmGetEleById(sUid + "_title_text");
                    if (e) {
                        e.style.lineHeight = _r.fsGetEleStyle(e, "fontSize");
                    }
                } else {
                    _iBdLen = iBdWid;
                    _iIBdLen = iIBdWid;
                    _iLMinWid = iLAImgWid;
                    _iRMinWid = iRAImgWid;
                    _iLWid = _iRWid = iCWH;
                    _iTMinHei = iTAImgHei;
                    _iBMinHei = iBAImgHei;
                    _iTMinWid = iTAImgWid;
                    _iBMinWid = iBAImgWid;
                }
                e = _r.fdmGetEleById(sUid + "_sc");
                if (!this.iTyp) {
                    dw = iIWid + 2 * iDPad + 2 * _iIBdLen + iDSpc;
                    _iAllWid = Math.ceil(this.aItems.length / 2 / this.iMultiNum) * dw + iDSpc;
                    _iMaxDWid = n * dw + iDSpc;
                    _iMinDWid = dw + iDSpc;
                    if (e) {
                        e.scrollLeft = 0;
                    }
                } else {
                    if (this.iTyp == 1) {
                        if (e) {
                            e.scrollTop = 0;
                        }
                    }
                }
                if (!fbSetDisplay()) {
                    return false;
                }
                if (!sScEff) {
                    sScEff = "none";
                }
                sScEff = sScEff.replace(/\&\#41\;{0,1}$/, ")");
                _bIsRandomEff = /^stEffect\(.Random\(/i.test(sScEff);
                _bIsScrollEff = /^stEffect\(.Scroll\(/i.test(sScEff);
                if (sScEff != "none") {
                    if (_bIsRandomEff) {
                        _aEffects = ["stEffect('Active(StartOpc=0,StopOpc=100,Duration=" + this.iEffSp / 1000 + ",Rate=30)')", "stEffect('Open(Duration=" + this.iEffSp / 1000 + ",Rate=30,Direction=Up)')", "stEffect('Open(Duration=" + this.iEffSp / 1000 + ",Rate=30,Direction=Down)')", "stEffect('Open(Duration=" + this.iEffSp / 1000 + ",Rate=30,Direction=Middle)')"];
                        if (_r.bIsIE) {
                            for (var i = 0; i < 40; i++) {
                                _aEffects.push("stEffect('RandomIE(Duration=" + this.iEffSp / 1000 + ")')");
                            }
                        }
                        oScEff = _STNS.EFFECT.foGetEff(_aEffects[parseInt(Math.random() * _aEffects.length)], this.sUid + "_sc", window, this.iEffSp, this.iEffTrans);
                        if (oScEff) {
                            if (!oScEff.fbSet()) {
                                oScEff.fbDel();
                                oScEff = 0;
                            }
                        }
                    } else {
                        this.fbGetEff();
                    }
                }
                var ee = e = _r.fdmGetEleById(this.sUid + "_sc");
                if (_bIsScrollEff && this.oScEff) {
                    var sco = this;
                    if (iTyp) {
                        this.oScEff.fvFinishEffect = function() {
                            if (sco.iCyc == 1 && ee.scrollTop >= sco._iAllHei) {
                                ee.scrollTop = 0;
                            }
                            sco.fbSetPag(1);
                        };
                    } else {
                        this.oScEff.fvFinishEffect = function() {
                            if (sco.iCyc == 1 && ee.scrollLeft >= sco._iAllWid - sco.iDSpc) {
                                ee.scrollLeft = 0;
                            }
                            sco.fbSetPag(1);
                        };
                    }
                }
                if (this.sWid.charAt(this.sWid.length - 1) == "%") {
                    var f = new Function(this.sSelf + ".___t=0;clearTimeout(" + this.sSelf + "._tTid);" + this.sSelf + "._tTid=setTimeout(\"" + this.sSelf + ".bPause=1;" + this.sSelf + ".fbSetDisplay();if(" + this.sSelf + ".bAuto)" + this.sSelf + ".bPause=0;\",50)");
                    if (_STNS.bIsIE) {
                        window.attachEvent("onresize", f);
                    } else {
                        if (_STNS.oNav.name != "konqueror" && window.addEventListener) {
                            window.addEventListener("resize", f, false);
                        }
                    }
                }
                if (this.iTyp || (_STNS.bIsOP && _STNS.oNav.version >= 9.5 && !this.iTyp)) {
                    var ff = new Function((_STNS.bIsOP && _STNS.oNav.version >= 9.5 ? this.sSelf + ".fbSetDisplay();" : this.sSelf + ".fbSetPag();"));
                    _STNS.fbAddLoad(ff);
                }
            }
            return true;
        };
        CUIScroller.fvSynHeight = function() {
            var _r = _STNS,
                tmp = 0;
            with(this) {
                for (var i = 0; i < aItems.length; i++) {
                    if (e = _r.fdmGetEleById(aItems[i].sUid + "_table")) {
                        tmp = Math.max(e.offsetHeight, tmp);
                    }
                }
                for (var i = 0; tmp && i < aItems.length; i++) {
                    if (e = _r.fdmGetEleById(aItems[i].sUid + "_table")) {
                        e.style.height = tmp + "px";
                    }
                }
            }
        };
        CUIScroller.fbSetDisplay = function() {
            var _r = _STNS,
                e, dw = vd = aw = sw = bw = oh = pw = 0,
                _c = _r.UI.CUIScroller,
                st = this.iStat,
                _11c = false;
            with(this) {
                e = _r.fdmGetEleById(sUid);
                e.style.width = _r.fsGetLen("tb", this.sWid, 0, (!this.bImgBd && this.iBdWid ? this.iBdWid : 0), 0);
                vd = parseInt(this.sHei);
                if (vd && vd > 0) {
                    if (e = _r.fdmGetEleById(sUid + "_tview")) {
                        if (!e.offsetHeight) {
                            return false;
                        }
                        vd -= e.offsetHeight;
                    }
                    bw = bImgBd ? _iLWid + _iRWid : 2 * _iBdLen;
                    vd -= bw;
                    if (vd < 1) {
                        vd = 1;
                    }
                    if (e = _r.fdmGetEleById(sUid + "_view")) {
                        e.style.height = vd + "px";
                    }
                }
                if (iTyp == 1) {
                    e = _r.fdmGetEleById(sUid);
                    if (!e.offsetHeight) {
                        return false;
                    }
                    var _11d = (iIWid > _iTMinWid && iIWid > _iBMinWid ? iIWid : (_iTMinWid > _iBMinWid ? _iTMinWid : _iBMinWid)) + iBdWid * 2 + _iLWid + _iRWid + iDPad * 2 + iIBdWid * 2 + iDSpc * 2;
                    if (e = _r.fdmGetEleById(sUid + "_pview")) {
                        _11d += e.offsetWidth;
                    }
                    e = _r.fdmGetEleById(sUid);
                    if ((_r.bIsFX ? e.childNodes[0] : e).offsetWidth < _11d) {
                        e.style.width = _11d + "px";
                    }
                    e = _r.fdmGetEleById(sUid + "_inner");
                    if (e) {
                        _iAllHei = (e.offsetHeight + iDSpc) / 2;
                    }
                    var _11e = e.offsetWidth - _iLWid - _iRWid;
                    if (e = _r.fdmGetEleById(sUid + "_pview")) {
                        _11e += e.offsetWidth;
                    }
                    vd = vd - _iTMinHei - _iBMinHei;
                    var _tah = _bah = 0;
                    if (vd > _iAllHei) {
                        var _ah = vd + _iTMinHei + _iBMinHei - _iAllHei;
                        if (_ah % 2 == 1) {
                            _ah -= 1;
                            vd = _iAllHei;
                            _11c = true;
                        } else {
                            vd = _iAllHei;
                        }
                        _tah = _bah = _ah / 2;
                    } else {
                        _tah = _iTMinHei;
                        _bah = _iBMinHei;
                    }
                    if (vd < 2 * iDSpc + 1) {
                        vd = 2 * iDSpc + 1;
                    }
                    if (e = _r.fdmGetEleById(sUid + "_vtop")) {
                        e.style.height = _tah + "px";
                    }
                    if (e = _r.fdmGetEleById(sUid + "_display")) {
                        e.style.height = (_11c ? vd + 1 : vd) + "px";
                    }
                    if (e = _r.fdmGetEleById(sUid + "_sc")) {
                        e.style.height = vd + "px";
                    }
                    if (e = _r.fdmGetEleById(sUid + "_vbottom")) {
                        e.style.height = _bah + "px";
                    }
                    _iCurDHei = vd;
                    _iPageHei = _iCurDHei;
                    if (_r.bIsSF || (_r.bIsIE && parseFloat(_r.oNav.version) < 6)) {
                        _r.fdmGetEleById(sUid + "_display").style.height = _r.fdmGetEleById(sUid + "_sc").style.height = vd + "px";
                    }
                    var _tt = 0;
                    for (var i = 0; i < this.aItems.length; i++) {
                        e = _r.fdmGetEleById(this.aItems[i].sUid);
                        if (e) {
                            this.aItems[i]._iCurHei = e.offsetHeight;
                        }
                        this.aItems[i]._iScrollToHei = _tt;
                        _tt += this.aItems[i]._iCurHei + this.iDSpc;
                    }
                    this._iMaxPage = Math.ceil((this._iAllHei - this.iDSpc) / this._iCurDHei);
                } else {
                    var _123 = true;
                    if (_123) {
                        _r.fdmGetEleById(sUid + "_display").style.width = _r.fdmGetEleById(sUid + "_sc").style.width = _r.fdmGetEleById(sUid + "_view").style.width = "1px";
                    }
                    e = _r.fdmGetEleById(sUid);
                    if (!e.offsetHeight) {
                        return false;
                    }
                    this.fvSynHeight();
                    aw = _iLMinWid + _iRMinWid;
                    bw = bImgBd ? _iLWid + _iRWid : 2 * _iBdLen;
                    dw = iIWid + 2 * iDPad + 2 * _iIBdLen + iDSpc;
                    var _11d = dw + aw + bw + iDSpc;
                    if ((e = _r.fdmGetEleById(sUid)) && (_STNS.bIsFX ? e.childNodes[0] : e).offsetWidth < _11d) {
                        e.style.width = _11d + "px";
                    }
                    if (this.sWid.charAt(this.sWid.length - 1) == "%") {
                        e = _r.fdmGetEleById(sUid);
                        if (_STNS.bIsFX) {
                            e = e.childNodes[0];
                        }
                        vd = e ? e.offsetWidth - aw - bw : _iMaxDWid + aw;
                    } else {
                        vd = parseInt(this.sWid);
                        if (isNaN(vd)) {
                            vd = _iMaxDWid + aw;
                        }
                        if (vd < (_iMinDWid + aw + bw + pw)) {
                            vd = _iMinDWid + aw;
                        }
                    }
                    var _sp = Math.floor((vd - aw - iDSpc) / dw);
                    if (_sp < 1) {
                        _sp = 1;
                    }
                    _iCurDWid = vd < _iMaxDWid + aw ? _sp * dw + iDSpc : _iMaxDWid;
                    _iPageWid = _iCurDWid - iDSpc;
                    if (_123) {
                        _r.fdmGetEleById(sUid + "_display").style.width = _iCurDWid + "px";
                        _r.fdmGetEleById(sUid + "_sc").style.width = _iCurDWid + "px";
                        e = _r.fdmGetEleById(sUid + "_view");
                        e.style.width = "100%";
                    }
                    if (_r.bIsIE && parseFloat(_r.oNav.version) < 6) {}
                    this._iMaxPage = Math.ceil((this._iAllWid - this.iDSpc) / (this._iCurDWid - this.iDSpc));
                }
                e = _r.fdmGetEleById(sUid);
                if (e && _r.bIsOP) {
                    e.style.display = "none";
                    e.style.display = "";
                }
                if ((e = _r.fdmGetEleById(sUid + "_vleft")) && _STNS.bIsOP && _STNS.oNav.version >= 9.5) {
                    var __c = _r.fsGetEleStyle(e, "backgroundColor");
                    e.style.backgroundColor = "#FF0000";
                    e.style.backgroundColor = __c;
                }
                e = _r.fdmGetEleById(sUid + "_sc");
                if (e) {
                    if (bAuto && iTyp == 0 && iScDir == 2) {
                        if (iScDist == 1) {
                            e.scrollLeft = this._iAllWid - (iIWid + 2 * iDPad + 2 * _iIBdLen + iDSpc);
                            this._iSelectP = this._iMaxPage;
                        } else {
                            e.scrollLeft = (this._iMaxPage - 1) * this._iPageWid;
                            this._iSelectP = this._iMaxPage;
                        }
                    }
                    if (bAuto && iTyp == 1 && iScDir == 4) {
                        if (iScDist == 1) {
                            e.scrollTop = aItems[aItems.length / 2 - 1]._iScrollToHei;
                        } else {
                            e.scrollTop = (this._iMaxPage - 1) * this._iPageHei;
                            this._iSelectP = this._iMaxPage;
                        }
                    }
                    if (iTyp == 0) {
                        sw = e.scrollLeft;
                        if (iScDist != 1 && sw + _iCurDWid >= _iAllWid) {
                            e.scrollLeft = sw = Math.ceil((_iAllWid - iDSpc) / (_iCurDWid - iDSpc) - 1) * (_iCurDWid - iDSpc);
                            if (iCyc != 1) {
                                st &= _c.MAXSTATE - _c.ENABLERIGHTARROW;
                            }
                        } else {
                            if (iScDist == 1 && sw + (iIWid + 2 * iDPad + 2 * _iIBdLen + iDSpc) >= _iAllWid) {
                                e.scrollLeft = sw = _iAllWid - (iIWid + 2 * iDPad + 2 * _iIBdLen + iDSpc);
                                if (iCyc != 1) {
                                    st &= _c.MAXSTATE - _c.ENABLERIGHTARROW;
                                }
                            } else {
                                st |= _c.ENABLERIGHTARROW;
                            }
                        }
                        if (sw <= 0 && iCyc != 1) {
                            st &= _c.MAXSTATE - _c.ENABLELEFTARROW;
                        } else {
                            st |= _c.ENABLELEFTARROW;
                        }
                    }
                    if (iTyp == 1) {
                        sw = e.scrollTop;
                        if (iScDist != 1 && sw + _iCurDHei >= _iAllHei) {
                            e.scrollTop = sw = Math.ceil((_iAllHei - iDSpc) / (_iCurDHei - iDSpc) - 1) * (_iCurDHei - iDSpc);
                            if (iCyc != 1) {
                                st &= _c.MAXSTATE - _c.ENABLEBOTTOMARROW;
                            }
                        } else {
                            if (iScDist == 1 && sw > aItems[aItems.length / 2 - 1]._iScrollToHei) {
                                e.scrollTop = aItems[aItems.length / 2 - 1]._iScrollToHei;
                                if (iCyc != 1) {
                                    st &= _c.MAXSTATE - _c.ENABLEBOTTOMARROW;
                                }
                            } else {
                                st |= _c.ENABLEBOTTOMARROW;
                            }
                        }
                        if (sw <= 0 && iCyc != 1) {
                            st &= _c.MAXSTATE - _c.ENABLETOPARROW;
                        } else {
                            st |= _c.ENABLETOPARROW;
                        }
                    }
                }
            }
            this.fbSetPag();
            this.fbUpDate(st);
            var max = this.iTyp ? this._iAllHei - this.iDSpc : this._iAllWid - this.iDSpc;
            if (this.iScDist == 1) {
                imod = (this.iTyp ? this.iIHei : this.iIWid) + this.iDSpc + this.iDPad * 2 + this.iIBdWid * 2;
            } else {
                imod = (this.iTyp ? this._iPageHei : this._iPageWid);
            }
            var lm = max % imod == 0 ? max - imod : max - max % imod;
            if (this.iScDist == 1 && this.iTyp) {
                lm = this.aItems[this.aItems.length / 2 - 1]._iScrollToHei;
            }
            this._iDisableMax = lm;
            return true;
        };
        CUIScroller.fbShow = function() {
            var _r = _STNS,
                e;
            if (this.fbInit()) {
                e = _r.fdmGetEleById(this.sUid);
                e.style.visibility = "visible";
                this.fvSynHeight();
                if (this.bAuto && !this.__bFirstAutoed) {
                    this.__bFirstAutoed = true;
                    if (this.iScMod == 1) {
                        setTimeout(this.sSelf + ".fbScroll(" + this.iSpeed + ");", this.iScDelay);
                    } else {
                        this.fbScroll(this.iSpeed);
                    }
                }
            } else {
                setTimeout(this.sSelf + ".fbShow()", 100);
            }
            return true;
        };
        CUIScroller.fiGetItemIndex = function(dir) {
            if (this.iTyp == 1) {
                var _r = _STNS,
                    e = _r.fdmGetEleById(this.sUid + "_sc"),
                    dw = e.scrollTop,
                    cur = 0,
                    _b;
                if (this._iAllHei <= this.iDSpc / 2) {
                    return false;
                }
                this._iItemIndex = this.aItems.length - 1;
                for (var i = 0; i < this.aItems.length; i++) {
                    _b = false;
                    if (dir == "RoD") {
                        if (dw <= this.aItems[i]._iScrollToHei) {
                            cur = i - 1;
                            _b = true;
                        }
                    } else {
                        if (dir == "LoU") {
                            if (dw < this.aItems[i]._iScrollToHei) {
                                cur = i - 1;
                                _b = true;
                            }
                        } else {
                            if (dw < this.aItems[i]._iScrollToHei) {
                                this._iItemIndex = i - 1;
                                _b = true;
                            }
                        }
                    }
                    if (_b) {
                        break;
                    }
                }
                this._iItemIndex = this._iItemIndex < 0 ? 0 : this._iItemIndex;
            }
            if (cur < 0) {
                cur = 0;
            }
            return cur;
        };
        CUIScroller.fiGetFullPage = function(dir) {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sUid + "_sc"),
                d = (this.iTyp ? e.scrollTop : e.scrollLeft),
                cur;
            with(this) {
                if (dir == "LoU") {
                    cur = Math.floor(d / (iTyp ? _iPageHei : _iPageWid)) + 1;
                } else {
                    cur = Math.ceil(d / (iTyp ? _iPageHei : _iPageWid));
                }
                if (cur < 1) {
                    cur = 1;
                }
            }
            return cur;
        };
        CUIScroller.fbSetPag = function(_136) {
            with(this) {
                var _r = _STNS,
                    e = _r.fdmGetEleById(sUid + "_sc"),
                    dw = iTyp ? e.scrollTop : e.scrollLeft;
                if (iTyp == 1 && this.iScDist == 1) {
                    this.fiGetItemIndex();
                }
                var max, cur, n, pa = [1, 1, 1, 1, 1],
                    ns = ps = 1,
                    st = this.iStat,
                    _c = _r.UI.CUIScroller;
                _bEnPag[0] = 0;
                _bEnPag[1] = 0;
                _bEnPag[2] = 0;
                _bEnPag[3] = 0;
                _bEnPag[4] = 0;
                _bEnPrevious = 0;
                _bEnNext = 0;
                max = this._iMaxPage;
                cur = Math.ceil((dw + (iTyp ? _iCurDHei : _iCurDWid) / 2) / (iTyp ? _iPageHei : _iPageWid));
                if (cur == max) {
                    if (_136 && iCyc != 1) {
                        st &= _c.MAXSTATE - (iTyp == 0 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW);
                    }
                }
                if (cur > max) {
                    cur = max;
                }
                _iSelectP = cur;
                if (!this.bPag) {
                    return true;
                }
                if (bAuto && (iScDir == 2 || iScDir == 4)) {
                    cur = max + 1 - cur;
                    if (cur < 1) {
                        cur = 1;
                    }
                    if (cur > max) {
                        cur = max;
                    }
                }
                n = Math.floor(cur / 5);
                if (!(cur % 5)) {
                    n--;
                }
                for (var i = 0; i < 5; i++) {
                    e = _r.fdmGetEleById(sUid + "_p" + i);
                    if (i == (cur % 5)) {
                        e.innerHTML = n * 5 + (i || 5);
                    } else {
                        if (n * 5 + (i || 5) <= max) {
                            e.innerHTML = n * 5 + (i || 5);
                        } else {
                            e.innerHTML = "";
                            pa[i] = 0;
                        }
                    }
                    if (this.iCssMd) {
                        if (!e.innerHTML) {
                            s = _r.bShield ? "sttd" : "";
                            ts = "sothinkBackgroundColor";
                            s += (s ? " " : "") + ts;
                            e.parentNode.className = s;
                        } else {
                            var _142 = st & _c["OVERPAGINATION" + i],
                                _143 = (e.innerHTML == cur + "" ? 2 : 0);
                            s = _r.bShield ? "sta" : "";
                            ts = aPFnts[_142 ? 1 + _143 : 0 + _143];
                            if (ts && s.indexOf(ts) == -1) {
                                s += (s ? " " : "") + ts;
                            }
                            ts = aPFntClrs[_142 ? 1 + _143 : 0 + _143];
                            if (ts && s.indexOf(ts) == -1) {
                                s += (s ? " " : "") + ts;
                            }
                            ts = aPDecos[_142 ? 1 + _143 : 0 + _143];
                            if (ts && s.indexOf(ts) == -1) {
                                s += (s ? " " : "") + ts;
                            }
                            if (s) {
                                e.className = s;
                            }
                            s = _r.bShield ? "sttd" : "";
                            ts = aPBgClrs[_142 ? 1 + _143 : 0 + _143];
                            s += (s ? " " : "") + ts;
                            if (s) {
                                e.parentNode.className = s;
                            }
                        }
                    } else {
                        if (e.innerHTML == cur + "") {
                            e.style.font = aPFnts[2];
                            e.style.color = aPFntClrs[2];
                            e.style.textDecoration = aPDecos[2];
                            e.style.lineHeight = aPLineHeight[2];
                            e.parentNode.style.backgroundColor = aPBgClrs[2];
                        } else {
                            e.style.font = aPFnts[0];
                            e.style.color = aPFntClrs[0];
                            e.style.textDecoration = aPDecos[0];
                            e.style.lineHeight = aPLineHeight[0];
                            if (e.innerHTML) {
                                e.parentNode.style.backgroundColor = aPBgClrs[0];
                            } else {
                                e.parentNode.style.backgroundColor = "transparent";
                            }
                        }
                    }
                }
                e = _r.fdmGetEleById(sUid + "_previous");
                if (e) {
                    if (!n) {
                        e.innerHTML = "";
                        ps = 0;
                    } else {
                        e.innerHTML = iTyp ? "&#9650;" : "&lt;&lt;";
                    }
                }
                e = _r.fdmGetEleById(sUid + "_next");
                if (e) {
                    if (n * 5 + 5 >= max) {
                        e.innerHTML = "";
                        ns = 0;
                    } else {
                        e.innerHTML = iTyp ? "&#9660;" : "&gt;&gt;";
                    }
                }
                this.fbUpDate(st, 1);
                _bEnPag[0] = pa[0];
                _bEnPag[1] = pa[1];
                _bEnPag[2] = pa[2];
                _bEnPag[3] = pa[3];
                _bEnPag[4] = pa[4];
                _bEnPrevious = ps;
                _bEnNext = ns;
            }
            return true;
        };
        CUIScroller.fbUpDate = function(st, f) {
            var d = this.iStat ^ st,
                _r = _STNS,
                _c = _r.UI.CUIScroller,
                k = -1,
                e;
            with(this) {
                if (bPag && (f || ((this.iStat & _c.SELECTED) >>> _c.SELECTED_BIT) != (this._iSelectP % 5))) {
                    var pg;
                    if (this.bAuto && (this.iScDir == 2 || this.iScDir == 4)) {
                        max = this._iMaxPage;
                        pg = max - this._iSelectP + 1;
                    } else {
                        pg = this._iSelectP;
                    }
                    k = pg % 5;
                    st &= _c.MAXSTATE - _c.SELECTED;
                    st |= k << _c.SELECTED_BIT;
                }
                if (iCssMd) {
                    var s = "",
                        ts;
                    if (bArr && (e = _r.fdmGetEleById(this.sUid + (!iTyp ? "_arr0img" : "_arr2img")))) {
                        s = _r.bShield ? "stdv" : "";
                        if (!iTyp) {
                            ts = st & _c.ENABLELEFTARROW ? aLAEnImgs[st & _c.OVERLEFTARROW ? 1 : 0] : aLADisImgs[st & _c.OVERLEFTARROW ? 1 : 0];
                        } else {
                            if (iTyp == 1) {
                                ts = st & _c.ENABLETOPARROW ? aTAEnImgs[st & _c.OVERTOPARROW ? 1 : 0] : aTADisImgs[st & _c.OVERTOPARROW ? 1 : 0];
                            }
                        }
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        ts = iTyp ? iTAImgWid : iLAImgWid;
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        ts = iTyp ? iTAImgHei : iLAImgHei;
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        if (s) {
                            e.className = s;
                        }
                    }
                    s = "";
                    if (bArr && (e = _r.fdmGetEleById(this.sUid + (!iTyp ? "_arr1img" : "_arr3img")))) {
                        s = _r.bShield ? "stdv" : "";
                        if (!iTyp) {
                            ts = st & _c.ENABLERIGHTARROW ? aRAEnImgs[st & _c.OVERRIGHTARROW ? 1 : 0] : aRADisImgs[st & _c.OVERRIGHTARROW ? 1 : 0];
                        } else {
                            if (iTyp == 1) {
                                ts = st & _c.ENABLEBOTTOMARROW ? aBAEnImgs[st & _c.OVERBOTTOMARROW ? 1 : 0] : aBADisImgs[st & _c.OVERBOTTOMARROW ? 1 : 0];
                            }
                        }
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        ts = iTyp ? iBAImgWid : iRAImgWid;
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        ts = iTyp ? iBAImgHei : iRAImgHei;
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        if (s) {
                            e.className = s;
                        }
                    }
                    s = "";
                    if (k != -1) {
                        if (f && (e = _r.fdmGetEleById(this.sUid + "_previous"))) {
                            if (!e.innerHTML) {
                                s = _r.bShield ? "sttd" : "";
                                ts = "sothinkBackgroundColor";
                                s += (s ? " " : "") + ts;
                                e.parentNode.className = s;
                            } else {
                                s = _r.bShield ? "sta" : "";
                                ts = aPFnts[st & _c.OVERPREVIOUS ? 1 : 0];
                                if (ts && s.indexOf(ts) == -1) {
                                    s += (s ? " " : "") + ts;
                                }
                                ts = aPFntClrs[st & _c.OVERPREVIOUS ? 1 : 0];
                                if (ts && s.indexOf(ts) == -1) {
                                    s += (s ? " " : "") + ts;
                                }
                                ts = aPDecos[st & _c.OVERPREVIOUS ? 1 : 0];
                                if (ts && s.indexOf(ts) == -1) {
                                    s += (s ? " " : "") + ts;
                                }
                                if (s) {
                                    e.className = s;
                                }
                                s = _r.bShield ? "sttd" : "";
                                ts = aPBgClrs[st & _c.OVERPREVIOUS ? 1 : 0];
                                s += (s ? " " : "") + ts;
                                if (s) {
                                    e.parentNode.className = s;
                                }
                            }
                        }
                        if (f && (e = _r.fdmGetEleById(this.sUid + "_next"))) {
                            if (!e.innerHTML) {
                                s = _r.bShield ? "sttd" : "";
                                ts = "sothinkBackgroundColor";
                                s += (s ? " " : "") + ts;
                                e.parentNode.className = s;
                            } else {
                                s = _r.bShield ? "sta" : "";
                                ts = aPFnts[st & _c.OVERNEXT ? 1 : 0];
                                if (ts && s.indexOf(ts) == -1) {
                                    s += (s ? " " : "") + ts;
                                }
                                ts = aPFntClrs[st & _c.OVERNEXT ? 1 : 0];
                                if (ts && s.indexOf(ts) == -1) {
                                    s += (s ? " " : "") + ts;
                                }
                                ts = aPDecos[st & _c.OVERNEXT ? 1 : 0];
                                if (ts && s.indexOf(ts) == -1) {
                                    s += (s ? " " : "") + ts;
                                }
                                if (s) {
                                    e.className = s;
                                }
                                s = _r.bShield ? "sttd" : "";
                                ts = aPBgClrs[st & _c.OVERNEXT ? 1 : 0];
                                s += (s ? " " : "") + ts;
                                if (s) {
                                    e.parentNode.className = s;
                                }
                            }
                        }
                    }
                } else {
                    if (bArr && ((d & _c.ENABLELEFTARROW) || (d & _c.OVERLEFTARROW) || (d & _c.ENABLETOPARROW) || (d & _c.OVERTOPARROW))) {
                        e = _r.fdmGetEleById(this.sUid + (!iTyp ? "_arr0img" : "_arr2img"));
                        if (e) {
                            if (iTyp) {
                                e.style.backgroundImage = "url(" + (st & _c.ENABLETOPARROW ? aTAEnImgs[st & _c.OVERTOPARROW ? 1 : 0] : aTADisImgs[st & _c.OVERTOPARROW ? 1 : 0]) + ")";
                            } else {
                                e.style.backgroundImage = "url(" + (st & _c.ENABLELEFTARROW ? aLAEnImgs[st & _c.OVERLEFTARROW ? 1 : 0] : aLADisImgs[st & _c.OVERLEFTARROW ? 1 : 0]) + ")";
                            }
                        }
                    }
                    if (bArr && ((d & _c.ENABLERIGHTARROW) || (d & _c.OVERRIGHTARROW) || (d & _c.ENABLEBOTTOMARROW) || (d & _c.OVERBOTTOMARROW))) {
                        e = _r.fdmGetEleById(this.sUid + (!iTyp ? "_arr1img" : "_arr3img"));
                        if (e) {
                            if (iTyp) {
                                e.style.backgroundImage = "url(" + (st & _c.ENABLEBOTTOMARROW ? aBAEnImgs[st & _c.OVERBOTTOMARROW ? 1 : 0] : aBADisImgs[st & _c.OVERBOTTOMARROW ? 1 : 0]) + ")";
                            } else {
                                e.style.backgroundImage = "url(" + (st & _c.ENABLERIGHTARROW ? aRAEnImgs[st & _c.OVERRIGHTARROW ? 1 : 0] : aRADisImgs[st & _c.OVERRIGHTARROW ? 1 : 0]) + ")";
                            }
                        }
                    }
                    if (bPag) {
                        if (f || (d & _c.OVERPREVIOUS)) {
                            e = _r.fdmGetEleById(this.sUid + "_previous");
                            if (e) {
                                if (!e.innerHTML) {
                                    e.parentNode.style.backgroundColor = "transparent";
                                } else {
                                    e.style.font = aPFnts[st & _c.OVERPREVIOUS ? 1 : 0];
                                    e.style.lineHeight = aPLineHeight[st & _c.OVERPREVIOUS ? 1 : 0];
                                    e.style.color = aPFntClrs[st & _c.OVERPREVIOUS ? 1 : 0];
                                    e.style.fontStyle = "normal";
                                    e.parentNode.style.backgroundColor = aPBgClrs[st & _c.OVERPREVIOUS ? 1 : 0];
                                }
                            }
                        }
                        var _opw;
                        if (f || (d & _c.OVERNEXT)) {
                            e = _r.fdmGetEleById(this.sUid + "_next");
                            if (e) {
                                if (!e.innerHTML) {
                                    e.parentNode.style.backgroundColor = "transparent";
                                } else {
                                    e.style.font = aPFnts[st & _c.OVERNEXT ? 1 : 0];
                                    e.style.lineHeight = aPLineHeight[st & _c.OVERNEXT ? 1 : 0];
                                    e.style.color = aPFntClrs[st & _c.OVERNEXT ? 1 : 0];
                                    e.style.fontStyle = "normal";
                                    e.parentNode.style.backgroundColor = aPBgClrs[st & _c.OVERNEXT ? 1 : 0];
                                }
                            }
                        }
                    }
                }
            }
            this.iStat = st;
            return true;
        };
        CUIScroller.fsGetStyle = function(t, c, f, o) {
            var s = "",
                _r = _STNS,
                tmp = "";
            if (this.iCssMd) {
                if (o) {
                    for (var i in o) {
                        if (!o[i] || typeof o[i] != "string") {
                            _r.fvThrow("Get style className error:[" + this.sUid + "]" + i + " is NULL or not a string!");
                        } else {
                            if (tmp.indexOf(o[i]) == -1) {
                                tmp += o[i] + " ";
                            }
                        }
                    }
                }
                tmp = tmp.substr(0, tmp.length - 1);
                if (_r.oDefCSS[t] || tmp) {
                    s = " class='";
                    if (_r.oDefCSS[t]) {
                        s += "st" + t + (tmp ? " " + tmp : "");
                    } else {
                        if (tmp) {
                            s += tmp;
                        }
                    }
                    s += "'";
                }
                if (c) {
                    s += " style=\"" + c + "\"";
                }
            } else {
                if (_r.bShield && !f) {
                    if (_r.oDefCSS[t]) {
                        s = " class='st" + t + "'";
                    }
                    if (o) {
                        for (var i in o) {
                            if (o[i] != null) {
                                switch (i) {
                                    case "background-image":
                                        tmp += i + ":url(" + o[i] + ");";
                                        break;
                                    case "cursor":
                                        if (_r.fbIsFile(o[i])) {
                                            tmp += i + ":url(" + o[i] + ") auto;";
                                        } else {
                                            tmp += i + ":" + o[i] + " auto;";
                                        }
                                        break;
                                    default:
                                        tmp += i + ":" + o[i] + (isNaN(o[i]) ? "" : "px") + ";";
                                }
                            }
                        }
                    }
                    if (c) {
                        tmp += c;
                    }
                    if (tmp) {
                        s += " style=\"" + tmp + "\"";
                    }
                } else {
                    var a = c ? _r.foCss2Obj(c) : {},
                        b = _r.oDefCSS[t] ? _r.foCss2Obj(_r.oDefCSS[t]) : {};
                    if (o) {
                        for (var i in o) {
                            if (o[i] != null && typeof a[i] == "undefined") {
                                switch (i) {
                                    case "background-image":
                                        a[i] = "url(" + o[i] + ")";
                                        break;
                                    case "cursor":
                                        if (_r.fbIsFile(o[i])) {
                                            a[i] = "url(" + o[i] + ") auto";
                                        } else {
                                            a[i] = o[i] + " auto";
                                        }
                                        break;
                                    default:
                                        a[i] = o[i] + (isNaN(o[i]) ? "" : "px");
                                }
                            }
                        }
                    }
                    for (var i in b) {
                        if (typeof a[i] == "undefined") {
                            a[i] = b[i];
                        }
                    }
                    tmp += _r.fsObj2Css(a);
                    if (tmp) {
                        s += " style=\"" + tmp + "\"";
                    }
                }
            }
            return s;
        };
        CUIScroller.fsQuickEnt = function(o, ents, it) {
            var _u = _STNS.UI;
            l = ents.length, s = "";
            for (var i = 0; i < l; i++) {
                s += " " + _u.fsGetEnt(o, ents[i], it);
            }
            return s;
        };
        CUIScroller.fsGetHTML = function() {
            var is = "",
                _r = _STNS,
                n, _ts = new Array(this.iMultiNum),
                i, s = "";
            for (i = 0; i < this.aItems.length; i++) {
                s += this.aItems[i].sTxt;
            }
            this._bImgOnly = s == "" ? true : false;
            s = "";
            for (var i = 0; i < _ts.length; i++) {
                _ts[i] = "";
            }
            if (this.iTyp == 1) {
                for (var i = 0; i < this.aItems.length; i++) {
                    if (i % this.iMultiNum == 0 || this.iCyc == 1 && i == this.aItems.length / 2 - 1) {
                        is += "<tr>";
                    }
                    is += this.aItems[i].fsGetHTML();
                }
            } else {
                for (var i = 0; i < this.aItems.length; i++) {
                    if (this.iCyc == 1 && i == this.aItems.length / 2 - 1) {
                        _ts[i % this.iMultiNum] += this.aItems[i].fsGetHTML();
                        if (this.iMultiNum > 1) {
                            for (var t = 0; t < this.iMultiNum - this.aItems.length / 2 % this.iMultiNum; t++) {
                                _ts[(i + t + 1) % this.iMultiNum] += "<td>";
                            }
                        }
                    } else {
                        if (this.iCyc == 1 && i > this.aItems.length / 2 - 1) {
                            var t = this.iMultiNum - this.aItems.length / 2 % this.iMultiNum;
                            _ts[(i + t) % this.iMultiNum] += this.aItems[i].fsGetHTML();
                        } else {
                            _ts[i % this.iMultiNum] += this.aItems[i].fsGetHTML();
                        }
                    }
                }
                is = "<tr>" + _ts.join("<tr>");
            }
            with(this) {
                s = "<table id='" + sUid + "' cellpadding=0 cellspacing=0 " + (sAlign && sAlign != "left" ? " align='" + sAlign + "' " : "") + " width=" + _r.fsGetLen("tb", sWid, 0, !bImgBd && iBdWid ? iBdWid : 0, 0) + (sHei ? " height='" + _r.fsGetLen("tb", sHei, 0, !bImgBd && iBdWid ? iBdWid : 0, 0, 0) + "'" : "") + fsGetStyle("tb", "visibility:hidden;", 0, {
                    "border-style": (!bImgBd && sBdStyle ? sBdStyle : null),
                    "border-width": (!bImgBd && iBdWid ? iBdWid : null),
                    "border-color": (!bImgBd && sBdClr ? sBdClr : null)
                }) + ">" + (bImgBd ? "<tr " + fsGetStyle("tr") + ">" + "<td " + fsGetICStyle(0) + "></td>" + "<td" + (bPag && iTyp ? "" : "") + fsGetBGStyle("td", 0, 0, [aBdBgClrs[0], aBdBgImgs[0], aBdBgReps[0]]) + "></td>" + "<td " + fsGetICStyle(1) + "></td>" + "</tr>" : "") + (bTil || (bPag && !iTyp) ? ("<tr " + fsGetStyle("tr") + ">" + (bImgBd ? "<td" + fsGetBGStyle("td", 0, 0, [aBdBgClrs[3], aBdBgImgs[3], aBdBgReps[3]]) + " rowspan=2>" + fsBlank("limg") + "</td>" : "") + "<td id='" + sUid + "_td_TaP' " + (bPag && iTyp ? "" : "") + " align='center' width='100%' " + (bTil && (sTBgClr != "transparent" || sTBgImg !== "") ? fsGetBGStyle("td", 0, 0, [sTBgClr, sTBgImg, sTBgRep]) : "") + ">" + "<table width='100%' id='" + sUid + "_tview' cellpadding=3 cellspacing=0 border=0 " + fsGetStyle("tb") + ">" + "<tr " + fsGetStyle("tr") + ">" + "<td nowrap width=100% align='" + sTAlign + "' " + fsGetStyle("td", (iCssMd || !sTFnt ? "" : "line-height:" + sLineHeight + ";"), 0, {
                    "font": (sTFnt || null),
                    "color": (sTFntClr || null),
                    "text-decoration": (sTDeco || null)
                }) + " id='" + sUid + "_title_text'>" + (sTTxt ? sTTxt : "&nbsp;") + "</td>") : "");
                if (bPag && !iTyp) {
                    s += "<td align=right " + fsGetStyle("td") + ">" + "<table border=0 align=right cellpadding=3 cellspacing=4 id='" + sUid + "_pview'" + this.fsQuickEnt(this, ["mouseover", "mouseout", "click"], "pview") + "><tr>" + "<td " + fsGetStyle("td") + "><a " + fsGetStyle("a", "font-style:normal;text-decoration:none;" + (iCssMd || !aPFnts[0] ? "" : "line-height:" + aPLineHeight[0] + ";"), 0, {
                        "font": (aPFnts[0] || null),
                        "color": (aPFntClrs[0] || null)
                    }) + " href=# id='" + this.sUid + "_previous'" + this.fsQuickEnt(this, ["click"], "previous") + "></a></td>";
                    var __s = "";
                    for (var i = 1; i < 6; i++) {
                        __s += "<td " + this.fsGetStyle("td") + "><a " + this.fsGetStyle("a", "" + (this.iCssMd || !this.aPFnts[0] ? "" : "line-height:" + this.aPLineHeight[0] + ";"), 0, {
                            "font": (this.aPFnts[0] || null),
                            "color": (this.aPFntClrs[0] || null),
                            "text-decoration": (this.aPDecos[0] || null)
                        }) + " href='#' id='" + this.sUid + "_p" + i % 5 + "'" + this.fsQuickEnt(this, ["click"], "page") + ">&nbsp;</a></td>";
                    }
                    s += __s;
                    s += "<td " + fsGetStyle("td") + "><a " + fsGetStyle("a", "font-style:normal;text-decoration:none;" + (iCssMd || !aPFnts[0] ? "" : "line-height:" + aPLineHeight[0] + ";"), 0, {
                        "font": aPFnts[0] || null,
                        "color": aPFntClrs[0] || null
                    }) + " href='#' id='" + this.sUid + "_next'" + this.fsQuickEnt(this, ["click"], "next") + "></a></td></tr></table></td>";
                }
                s += (bTil || (bPag && !iTyp) ? "</tr></table>" + "</td>" + (bImgBd ? "<td" + fsGetBGStyle("td", 0, 0, [aBdBgClrs[1], aBdBgImgs[1], aBdBgReps[1]]) + " rowspan=2>" + fsBlank("rimg") + "</td>" : "") + "</tr>" : "") + "<tr" + fsGetStyle("tr") + ">" + (!bTil && (!(bPag && !iTyp)) && bImgBd ? "<td" + fsGetBGStyle("td", 0, 0, [aBdBgClrs[3], aBdBgImgs[3], aBdBgReps[3]]) + ">" + fsBlank("limg2") + "</td>" : "") + "<td width=100% align=center valign='top' " + fsGetBGStyle("td", 0, 0, [sBgClr, sBgImg, sBgRep]) + ">" + "<table width=100% border=0 cellpadding=0 cellspacing=0 id='" + this.sUid + "_main'" + fsGetStyle("tb") + ">" + "<tr " + fsGetStyle("tr") + "><td align=center valign='top' width=100% " + fsGetStyle("td") + ">" + "<table width=100% " + fsGetStyle("tb") + " cellpadding=0 cellspacing=0 border=0 align='center' id='" + this.sUid + "_view'>" + ((!bArr || iTyp) ? "" : "<tr " + fsGetStyle("tr") + ">" + "<td align='" + sLAAlign + "' valign='" + sLAVAlign + "'  id='" + sUid + "_vleft' " + fsGetStyle("td") + ">" + "<a " + fsGetStyle("a", "display:block;", 0, {
                    "width": iLAImgWid || null,
                    "height": iLAImgHei || null
                }) + " href='#' id='" + sUid + "_arr0'" + this.fsQuickEnt(this, ["mouseover", "mouseout", "mousedown", "mouseup", "click"], "arrow") + "><div " + fsGetStyle("dv", "font-size:1px;background-repeat:no-repeat;" + (_r.bIsIE ? "cursor:hand;" : ""), 0, {
                    "background-image": (iCyc == 1 || iScDir == 2 ? aLAEnImgs[0] || null : aLADisImgs[0] || null),
                    "width": iLAImgWid || null,
                    "height": iLAImgHei || null
                }) + " id='" + this.sUid + "_arr0img'></div></a>" + "</td>") + (bArr && iTyp ? "<tr " + fsGetStyle("tr") + "><td align='" + sTAAlign + "' valign='" + sTAVAlign + "' " + fsGetStyle("td") + " id='" + sUid + "_vtop' " + (iTyp == 1 ? "width=100%" : "") + ">" + "<a " + fsGetStyle("a", "display:block;", 0, {
                    "width": iTAImgWid || null,
                    "height": iTAImgHei || null
                }) + " href='#' id='" + sUid + "_arr2'" + this.fsQuickEnt(this, ["mouseover", "mouseout", "mousedown", "mouseup", "click"], "arrow") + "><div " + fsGetStyle("dv", "font-size:1px;background-position: center;background-repeat:no-repeat;" + (_r.bIsIE ? "cursor:hand;" : ""), 0, {
                    "background-image": (iCyc == 1 || iScDir == 4 ? aTAEnImgs[0] || null : aTADisImgs[0] || null),
                    "width": iTAImgWid || null,
                    "height": iTAImgHei || null
                }) + " id='" + this.sUid + "_arr2img'></div></a>" + "</td>" : "") + (bArr && iTyp ? "<tr " + fsGetStyle("tr") + ">" : "") + "<td " + fsGetStyle("td") + " align=center id='" + sUid + "_display'>" + "<div " + fsGetStyle("dv", (this.iTyp ? "height:1px;" : "width:1px;") + "overflow:hidden;") + " id='" + sUid + "_sc'" + this.fsQuickEnt(this, ["mouseover", "mouseout"], "display") + " align=left>" + "<table id='" + this.sUid + "_inner' width=100% cellpadding=0 cellspacing=" + iDSpc + " " + fsGetStyle("tb") + ">" + is + "</table>" + "</div> " + "</td>" + (bArr && iTyp ? "</tr>" : "") + ((!bArr || iTyp) ? "" : "<td align='" + sRAAlign + "' valign='" + sRAVAlign + "' " + fsGetStyle("td") + "  id='" + sUid + "_vright'>" + "<a " + fsGetStyle("a", "display:block;", 0, {
                    "width": iRAImgWid || null,
                    "height": iRAImgHei || null
                }) + " href='#' id='" + sUid + "_arr1'" + this.fsQuickEnt(this, ["mouseover", "mouseout", "mousedown", "mouseup", "click"], "arrow") + "><div " + fsGetStyle("dv", "font-size:1px;background-repeat:no-repeat;" + (_r.bIsIE ? "cursor:hand;" : ""), 0, {
                    "background-image": (iCyc == 1 || iScDir == 1 ? aRAEnImgs[0] || null : aRADisImgs[0] || null),
                    "width": iRAImgWid || null,
                    "height": iRAImgHei || null
                }) + " id='" + this.sUid + "_arr1img'></div></a>" + "</td></tr>") + (bArr && iTyp ? "<tr " + fsGetStyle("tr") + "><td align='" + sBAAlign + "' valign='" + sBAVAlign + "' " + fsGetStyle("td") + "  id='" + sUid + "_vbottom'>" + "<a " + fsGetStyle("a", "display:block;", 0, {
                    "width": iBAImgWid || null,
                    "height": iBAImgHei || null
                }) + " href='#' id='" + sUid + "_arr3' " + this.fsQuickEnt(this, ["mouseover", "mouseout", "mousedown", "mouseup", "click"], "arrow") + "><div " + fsGetStyle("dv", "font-size:1px;background-position: center;background-repeat:no-repeat;" + (_r.bIsIE ? "cursor:hand;" : ""), 0, {
                    "background-image": (iCyc == 1 || iScDir == 3 ? aBAEnImgs[0] || null : aBADisImgs[0] || null),
                    "width": iBAImgWid || null,
                    "height": iBAImgHei || null
                }) + " id='" + this.sUid + "_arr3img'></div></a>" + "</td></tr>" : "") + "</table>" + "</td>" + (bPag && iTyp ? "<td valign='top' " + fsGetStyle("td") + ">" + "<table align='right' cellpadding=2 cellspacing=2 border=0 id='" + sUid + "_pview'" + fsGetStyle("tb") + " " + this.fsQuickEnt(this, ["mouseover", "mouseout", "click"], "pview") + ">" + "<tr><td align='center'" + fsGetStyle("td") + "><a " + fsGetStyle("a", "font-style:normal;text-decoration:none;display:block;", 0, {
                    "font": aPFnts[0] || null,
                    "color": aPFntClrs[0] || null
                }) + " href='#' id='" + this.sUid + "_previous'" + this.fsQuickEnt(this, ["click"], "previous") + "></a></td></tr>" : "");
                if (bPag && iTyp) {
                    var __s = "";
                    for (var i = 1; i < 6; i++) {
                        __s += "<tr><td align='center'" + fsGetStyle("td") + "><a " + fsGetStyle("a", "display:block;" + (iCssMd || !aPFnts[0] ? "" : "line-height:" + aPLineHeight[0] + ";"), 0, {
                            "font": aPFnts[0] || null,
                            "color": aPFntClrs[0] || null,
                            "text-decoration": aPDecos[0] || null
                        }) + " href='#' id='" + this.sUid + "_p" + i % 5 + "'" + this.fsQuickEnt(this, ["click"], "page") + "></a></td></tr>";
                    }
                    s += __s;
                    s += "<tr><td align='center'" + fsGetStyle("td") + "><a " + fsGetStyle("a", "font-style:normal;text-decoration:none;display:block;" + (iCssMd || !aPFnts[0] ? "" : "line-height:" + aPLineHeight[0] + ";"), 0, {
                        "font": aPFnts[0] || null,
                        "color": aPFntClrs[0] || null
                    }) + " href='#' id='" + this.sUid + "_next'" + this.fsQuickEnt(this, ["click"], "next") + "></a></td></tr>" + "<tr><td " + fsGetStyle("td", "visibility:hidden;" + (iCssMd || !aPFnts[0] ? "" : "line-height:" + aPLineHeight[0] + ";"), 0, {
                        "font": aPFnts[0] || null
                    }) + ">00</td></tr>" + "</table></td>";
                }
                s += "</tr></table></td>";
                s += (!bTil && (!(bPag && !iTyp)) && bImgBd ? "<td" + fsGetBGStyle("td", 0, 0, [aBdBgClrs[1], aBdBgImgs[1], aBdBgReps[1]]) + ">" + fsBlank("rimg2") + "</td>" : "") + "</tr>" + (bImgBd ? "<tr " + fsGetStyle("tr") + ">" + "<td " + fsGetICStyle(3) + "></td>" + "<td" + (bPag && iTyp ? "" : "") + fsGetBGStyle("td", 0, 0, [aBdBgClrs[2], aBdBgImgs[2], aBdBgReps[2]]) + "></td>" + "<td " + fsGetICStyle(2) + "></td>" + "</tr>" : "") + "</table>" + this._sMapStr;
            }
            return s;
        };
        CUIScroller.fsGetImg = function(s) {
            if (!s) {
                return "";
            }
            if (!_STNS.fbIsAbsPth(s)) {
                s = this.sImgPth + s;
            }
            if (s && _STNS.bBufImg) {
                var p = _STNS.fsGetAbsPth(s);
                if (!_STNS.oImgs[p]) {
                    _STNS.oImgs[p] = 1;
                }
            }
            return s;
        };
        CUIScroller.fsGetLnk = function(l) {
            if (!l) {
                return "#_nolink";
            }
            if (!_STNS.fbIsAbsPth(l)) {
                l = this.sLnkPre + l;
            }
            if (!l.toLowerCase().indexOf("javascript:")) {
                l += ";void(0)";
            }
            l = _STNS.fsGetAbsPth(l);
            return l;
        };
        CUIScroller.fbGetEnt = function(e, o) {
            var et = e.type || e,
                oid = o.id,
                _r = _STNS,
                _c = _r.UI.CUIScroller;
            with(this) {
                switch (et) {
                    case "mouseover":
                        if (!o._ov && ((_r.bIsIE && e.srcElement && _r.fbIsPar(o, e.srcElement)) || (!_r.bIsIE && e.target && _r.fbIsPar(o, e.target)))) {
                            o._ov = 1;
                            switch (oid) {
                                case sUid + "_previous":
                                    return fbFireEnt("mouseoverprevious");
                                case sUid + "_p1":
                                case sUid + "_p2":
                                case sUid + "_p3":
                                case sUid + "_p4":
                                case sUid + "_p0":
                                    return fbFireEnt("mouseoverpage", oid);
                                case sUid + "_next":
                                    return fbFireEnt("mouseovernext");
                                case sUid + "_arr0":
                                case sUid + "_arr1":
                                case sUid + "_arr2":
                                case sUid + "_arr3":
                                    return fbFireEnt("mouseoverarrow", oid);
                                case sUid + "_sc":
                                    return fbFireEnt("mouseoverdisplay");
                                case sUid + "_pview":
                                    return fbFireEnt("mouseoverpview", oid);
                            }
                        }
                        break;
                    case "mouseout":
                        if (o._ov && ((_r.bIsIE && (!e.toElement || !_r.fbIsPar(o, e.toElement))) || !_r.bIsIE && (!e.relatedTarget || !_r.fbIsPar(o, e.relatedTarget)))) {
                            o._ov = 0;
                            switch (oid) {
                                case sUid + "_previous":
                                    return fbFireEnt("mouseoutprevious");
                                case sUid + "_p1":
                                case sUid + "_p2":
                                case sUid + "_p3":
                                case sUid + "_p4":
                                case sUid + "_p0":
                                    return fbFireEnt("mouseoutpage", oid);
                                case sUid + "_next":
                                    return fbFireEnt("mouseoutnext");
                                case sUid + "_arr0":
                                case sUid + "_arr1":
                                case sUid + "_arr2":
                                case sUid + "_arr3":
                                    return fbFireEnt("mouseoutarrow", oid);
                                case sUid + "_sc":
                                    return fbFireEnt("mouseoutdisplay");
                                case sUid + "_pview":
                                    return fbFireEnt("mouseoutpview", oid);
                            }
                        }
                        break;
                    case "click":
                        switch (oid) {
                            case sUid + "_previous":
                                return fbFireEnt("clickprevious");
                            case sUid + "_p1":
                            case sUid + "_p2":
                            case sUid + "_p3":
                            case sUid + "_p4":
                            case sUid + "_p0":
                                return fbFireEnt("clickpage", oid);
                            case sUid + "_next":
                                return fbFireEnt("clicknext");
                            case sUid + "_arr0":
                            case sUid + "_arr1":
                            case sUid + "_arr2":
                            case sUid + "_arr3":
                                return fbFireEnt("clickarrow", oid);
                        }
                        break;
                    case "mousedown":
                        switch (oid) {
                            case sUid + "_arr0":
                            case sUid + "_arr1":
                            case sUid + "_arr2":
                            case sUid + "_arr3":
                                return fbFireEnt("mousedownarrow", oid);
                        }
                        break;
                    case "mouseup":
                        switch (oid) {
                            case sUid + "_arr0":
                            case sUid + "_arr1":
                            case sUid + "_arr2":
                            case sUid + "_arr3":
                                return fbFireEnt("mouseuparrow", oid);
                        }
                        break;
                    default:
                        return fbFireEnt(et);
                }
            }
            return true;
        };
        CUIScroller.fbOverPag = function(id) {
            return false;
            var _r = _STNS,
                i = parseInt(id.substr(this.sUid.length + 2)),
                e, st = this.iStat;
            if (this._bEnPag[i]) {
                st |= _r.UI.CUIScroller["OVERPAGITION" + i];
                this.fbUpDate(st);
            }
            return true;
        };
        CUIScroller.fbOutPag = function(id) {
            return false;
            var _r = _STNS,
                i = parseInt(id.substr(this.sUid.length + 2)),
                e, st = this.iStat;
            if (this._bEnPag[i]) {
                st &= _r.UI.CUIScroller.MAXSTATE - _r.UI.CUIScroller["OVERPAGINATION" + i];
                this.fbUpDate(st);
            }
            return true;
        };
        CUIScroller.fbClickPag = function(id) {
            var _r = _STNS,
                i = parseInt(id.substr(this.sUid.length + 2)),
                e, l, st = this.iStat,
                _c = _r.UI.CUIScroller,
                _bsp = false;
            if (this._bEnPag[i]) {
                e = _r.fdmGetEleById(id);
                if (e) {
                    i = parseInt(e.innerHTML);
                    if (this._iSelectP < i) {
                        this._iScDir = this.iTyp ? 3 : 1;
                    } else {
                        if (this._iSelectP > i) {
                            this._iScDir = this.iTyp ? 4 : 2;
                        }
                    }
                    this._iSelectP = i;
                    e = _r.fdmGetEleById(this.sUid + "_sc");
                    if (this._bIsScrollEff && this.oScEff && this.oScEff.fiGetStat() == 2) {
                        this.oScEff.fbStop();
                        _bsp = true;
                    }
                    if (this.bAuto && (this.iScDir == 2 || this.iScDir == 4)) {
                        i = this._iMaxPage - i + 1;
                    }
                    if (e) {
                        if (this.iScMod == 1) {
                            this.fbToPag(i);
                        } else {
                            if (this.iTyp) {
                                var dd = (i - 1) * this._iPageHei;
                                if (this.iCyc != 1) {
                                    if (dd >= this._iDisableMax) {
                                        if (this.bAuto && this.iCyc == 2) {
                                            this._iScDir = this._iNowScDir = 4;
                                        }
                                        dd = this._iDisableMax;
                                        st &= _c.MAXSTATE - _c.ENABLEBOTTOMARROW;
                                    } else {
                                        st |= _c.ENABLEBOTTOMARROW;
                                    }
                                    if (dd <= 0) {
                                        if (this.bAuto && this.iCyc == 2) {
                                            this._iScDir = this._iNowScDir = 3;
                                        }
                                        dd = 0;
                                        st &= _c.MAXSTATE - _c.ENABLETOPARROW;
                                    } else {
                                        st |= _c.ENABLETOPARROW;
                                    }
                                }
                                e.scrollTop = dd;
                            } else {
                                var dd = (i - 1) * this._iPageWid;
                                if (this.iCyc != 1) {
                                    if (dd >= this._iDisableMax) {
                                        if (this.bAuto && this.iCyc == 2) {
                                            this._iScDir = this._iNowScDir = 2;
                                        }
                                        dd = this._iDisableMax;
                                        st &= _c.MAXSTATE - _c.ENABLERIGHTARROW;
                                    } else {
                                        st |= _c.ENABLERIGHTARROW;
                                    }
                                    if (dd <= 0) {
                                        if (this.bAuto && this.iCyc == 2) {
                                            this._iScDir = this._iNowScDir = 1;
                                        }
                                        dd = 0;
                                        st &= _c.MAXSTATE - _c.ENABLELEFTARROW;
                                    } else {
                                        st |= _c.ENABLELEFTARROW;
                                    }
                                }
                                e.scrollLeft = dd;
                            }
                            this.fbSetPag();
                            this.fbUpDate(st);
                        }
                    }
                }
            }
            return false;
        };
        CUIScroller.fbToPag = function(i) {
            if (i > this._iMaxPage) {
                i = this._iMaxPage;
            }
            if (i < 1) {
                i = 1;
            }
            this._iSelectP = i;
            var _r = _STNS,
                st = this.iStat,
                _c = _r.UI.CUIScroller,
                e = _r.fdmGetEleById(this.sUid + "_sc");
            if (!e) {
                return false;
            }
            if (!this.oScEff) {
                this.fbGetEff();
            }
            try {
                this.oScEff.fbStop();
            } catch (ee) {}
            if (!this.iTyp) {
                var dd = (i - 1) * this._iPageWid;
                var _188 = Math.ceil((this._iAllWid - this.iDSpc) / this._iPageWid);
                if (this._bIsScrollEff && this.oScEff && this._iScDir == 1 && i == 1 && this.iCyc == 1) {
                    dd = this._iAllWid - this.iDSpc;
                }
                if (this._bIsScrollEff && this.oScEff && this._iScDir == 2 && this.iCyc == 1 && i == _188) {
                    e.scrollLeft = this._iAllWid - this.iDSpc;
                    dd = (_188 - 1) * this._iPageWid;
                }
                if (this.iCyc != 1) {
                    if (dd >= this._iDisableMax) {
                        this._iSelectP = this._iMaxPage;
                        if (this.bAuto && this.iCyc == 2) {
                            this._iScDir = 2;
                            this._iNowScDir = 2;
                        }
                        dd = this._iDisableMax;
                        st &= _c.MAXSTATE - _c.ENABLERIGHTARROW;
                    } else {
                        st |= _c.ENABLERIGHTARROW;
                    }
                    if (dd <= 0) {
                        st &= _c.MAXSTATE - _c.ENABLELEFTARROW;
                    } else {
                        st |= _c.ENABLELEFTARROW;
                    }
                    this.fbUpDate(st);
                }
                if (e) {
                    if (this._bIsRandomEff) {
                        try {
                            this.oScEff.fbDel();
                        } catch (ee) {}
                        this.oScEff = null;
                        this.oScEff = _r.EFFECT.foGetEff(this._aEffects[parseInt(Math.random() * this._aEffects.length)], this.sUid + "_sc", window, this.iEffSp, this.iEffTrans);
                        if (this.oScEff) {
                            if (!this.oScEff.fbSet()) {
                                this.oScEff.fbDel();
                                this.oScEff = 0;
                            }
                        }
                    }
                    if (this.oScEff) {
                        this.oScEff.fbApply();
                        if (this._bIsScrollEff) {
                            this.oScEff.fvSetParams("H", dd);
                        } else {
                            e.scrollLeft = dd;
                        }
                        this.oScEff.fbPlay();
                    } else {
                        e.scrollLeft = dd;
                    }
                }
            } else {
                var dd = (i - 1) * this._iPageHei;
                if (this._bIsScrollEff && this.oScEff && this._iScDir == 4 && this.iCyc == 1 && i == this._iMaxPage) {
                    e.scrollTop = this._iAllHei;
                }
                if (this.iCyc != 1) {
                    if (dd >= this._iDisableMax) {
                        this._iSelectP = this._iMaxPage;
                        if (this.bAuto && this.iCyc == 2) {
                            this._iScDir = 4;
                            this._iNowScDir = 4;
                        }
                        dd = this._iDisableMax;
                        st &= _c.MAXSTATE - _c.ENABLEBOTTOMARROW;
                    } else {
                        st |= _c.ENABLEBOTTOMARROW;
                    }
                    if (dd <= 0) {
                        st &= _c.MAXSTATE - _c.ENABLETOPARROW;
                    } else {
                        st |= _c.ENABLETOPARROW;
                    }
                    this.fbUpDate(st);
                }
                if (e) {
                    if (this._bIsRandomEff) {
                        try {
                            this.oScEff.fbStop();
                        } catch (ee) {}
                        try {
                            this.oScEff.fbDel();
                        } catch (ee) {}
                        this.oScEff = null;
                        this.oScEff = _r.EFFECT.foGetEff(this._aEffects[parseInt(Math.random() * this._aEffects.length)], this.sUid + "_sc", window);
                        if (this.oScEff) {
                            if (!this.oScEff.fbSet()) {
                                this.oScEff.fbDel();
                                this.oScEff = 0;
                            }
                        }
                    }
                    if (this.oScEff) {
                        this.oScEff.fbApply();
                        if (this._bIsScrollEff) {
                            if (this._iScDir == 3 && i == 1 && this.iCyc == 1) {
                                dd = this._iAllHei;
                            }
                            this.oScEff.fvSetParams("V", dd);
                        } else {
                            e.scrollTop = dd;
                        }
                        this.oScEff.fbPlay();
                    } else {
                        e.scrollTop = dd;
                    }
                }
            }
            if ((!this._bIsScrollEff) || (!this.oScEff)) {
                this.fbSetPag();
            }
            return true;
        };
        CUIScroller.fbOverPrevious = function() {
            var _r = _STNS,
                e, st = this.iStat;
            if (this._bEnPrevious) {
                e = _r.fdmGetEleById(this.sUid + "_previous");
                if (e) {
                    if (!e.innerHTML) {
                        return true;
                    }
                    st |= _r.UI.CUIScroller.OVERPREVIOUS;
                }
                this.fbUpDate(st);
            }
            return true;
        };
        CUIScroller.fbOutPrevious = function() {
            var _r = _STNS,
                e, st = this.iStat;
            if (this._bEnPrevious) {
                e = _r.fdmGetEleById(this.sUid + "_previous");
                if (e) {
                    if (!e.innerHTML) {
                        return true;
                    }
                    st &= _r.UI.CUIScroller.MAXSTATE - _r.UI.CUIScroller.OVERPREVIOUS;
                }
                this.fbUpDate(st);
            }
            return true;
        };
        CUIScroller.fbClickPrevious = function() {
            var _r = _STNS,
                e, l, dd, _c = _r.UI.CUIScroller,
                st = this.iStat,
                _tpn, ep;
            if (this._bEnPrevious) {
                e = _r.fdmGetEleById(this.sUid + "_sc");
                if (e) {
                    if (this.iScDir == 2 || this.iScDir == 4) {
                        ep = _r.fdmGetEleById(this.sUid + "_p1");
                        if (!ep) {
                            return false;
                        }
                        _tpn = parseInt(ep.innerHTML) - 1;
                        _tpn = this._iMaxPage + 1 - _tpn;
                    } else {
                        ep = _r.fdmGetEleById(this.sUid + "_p1");
                        if (!ep) {
                            return false;
                        }
                        _tpn = parseInt(ep.innerHTML) - 1;
                    }
                    if (_tpn < 1) {
                        _tpn = 1;
                    }
                    if (this.iTyp) {
                        dd = (_tpn - 1) * this._iPageHei;
                        if (this.iScMod == 1 && this.iScDist == 2) {
                            this.fbToPag(_tpn);
                        } else {
                            if (this.iCyc != 1) {
                                if (dd >= this._iDisableMax) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 4;
                                    }
                                    dd = this._iDisableMax;
                                    st &= _c.MAXSTATE - _c.ENABLEBOTTOMARROW;
                                } else {
                                    st |= _c.ENABLEBOTTOMARROW;
                                }
                                if (dd <= 0) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 3;
                                    }
                                    dd = 0;
                                    st &= _c.MAXSTATE - _c.ENABLETOPARROW;
                                } else {
                                    st |= _c.ENABLETOPARROW;
                                }
                            }
                            e.scrollTop = dd;
                        }
                    } else {
                        dd = (_tpn - 1) * this._iPageWid;
                        if (this.iScMod == 1 && this.iScDist == 2) {
                            this.fbToPag(_tpn);
                        } else {
                            if (this.iCyc != 1) {
                                if (dd >= this._iDisableMax) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 2;
                                    }
                                    dd = this._iDisableMax;
                                    st &= _c.MAXSTATE - _c.ENABLERIGHTARROW;
                                } else {
                                    st |= _c.ENABLERIGHTARROW;
                                }
                                if (dd <= 0) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 1;
                                    }
                                    dd = 0;
                                    st &= _c.MAXSTATE - _c.ENABLELEFTARROW;
                                } else {
                                    st |= _c.ENABLELEFTARROW;
                                }
                            }
                            e.scrollLeft = dd;
                        }
                    }
                    this.fbUpDate(st);
                    this.fbSetPag();
                }
            }
            return false;
        };
        CUIScroller.fbOverNext = function() {
            var _r = _STNS,
                e, st = this.iStat;
            if (this._bEnNext) {
                e = _r.fdmGetEleById(this.sUid + "_next");
                if (e) {
                    if (!e.innerHTML) {
                        return true;
                    }
                    st |= _r.UI.CUIScroller.OVERNEXT;
                }
                this.fbUpDate(st);
            }
            return true;
        };
        CUIScroller.fbOutNext = function() {
            var _r = _STNS,
                e, st = this.iStat;
            if (this._bEnNext) {
                e = _r.fdmGetEleById(this.sUid + "_next");
                if (e) {
                    if (!e.innerHTML) {
                        return true;
                    }
                    st &= _r.UI.CUIScroller.MAXSTATE - _r.UI.CUIScroller.OVERNEXT;
                }
                this.fbUpDate(st);
            }
            return true;
        };
        CUIScroller.fbClickNext = function() {
            var _r = _STNS,
                e, l, dd, _c = _r.UI.CUIScroller,
                st = this.iStat,
                _tpn, ep;
            if (this._bEnNext) {
                e = _r.fdmGetEleById(this.sUid + "_sc");
                if (e) {
                    if (this.iScDir == 2 || this.iScDir == 4) {
                        ep = _r.fdmGetEleById(this.sUid + "_p0");
                        if (!ep) {
                            return false;
                        }
                        _tpn = parseInt(ep.innerHTML) + 1;
                        _tpn = this._iMaxPage + 1 - _tpn;
                    } else {
                        ep = _r.fdmGetEleById(this.sUid + "_p0");
                        if (!ep) {
                            return false;
                        }
                        _tpn = parseInt(ep.innerHTML) + 1;
                    }
                    if (_tpn < 1) {
                        _tpn = 1;
                    }
                    if (this.iTyp) {
                        dd = (_tpn - 1) * this._iPageHei;
                        if (this.iScMod == 1 && this.iScDist == 2) {
                            this.fbToPag(_tpn);
                        } else {
                            if (this.iCyc != 1) {
                                if (dd >= this._iDisableMax) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 4;
                                    }
                                    dd = this._iDisableMax;
                                    st &= _c.MAXSTATE - _c.ENABLEBOTTOMARROW;
                                } else {
                                    st |= _c.ENABLEBOTTOMARROW;
                                }
                                if (dd <= 0) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 3;
                                    }
                                    dd = 0;
                                    st &= _c.MAXSTATE - _c.ENABLETOPARROW;
                                } else {
                                    st |= _c.ENABLETOPARROW;
                                }
                            }
                            e.scrollTop = dd;
                        }
                    } else {
                        dd = (_tpn - 1) * this._iPageWid;
                        if (this.iScMod == 1 && this.iScDist == 2) {
                            this.fbToPag(_tpn);
                        } else {
                            if (this.iCyc != 1) {
                                if (dd >= this._iDisableMax) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 2;
                                    }
                                    dd = this._iDisableMax;
                                    st &= _c.MAXSTATE - _c.ENABLERIGHTARROW;
                                } else {
                                    st |= _c.ENABLERIGHTARROW;
                                }
                                if (dd <= 0) {
                                    if (this.bAuto && this.iCyc == 2) {
                                        this._iScDir = this._iNowScDir = 1;
                                    }
                                    dd = 0;
                                    st &= _c.MAXSTATE - _c.ENABLELEFTARROW;
                                } else {
                                    st |= _c.ENABLELEFTARROW;
                                }
                            }
                            e.scrollLeft = dd;
                        }
                    }
                    this.fbUpDate(st);
                    this.fbSetPag();
                }
            }
            return false;
        };
        CUIScroller.fiSetArrSt = function(st, tp, id) {
            var _c = _STNS.UI.CUIScroller;
            switch (id) {
                case this.sUid + "_arr0":
                    return tp == "over" ? st |= _c.OVERLEFTARROW : st &= _c.MAXSTATE - _c.OVERLEFTARROW;
                case this.sUid + "_arr1":
                    return tp == "over" ? st |= _c.OVERRIGHTARROW : st &= _c.MAXSTATE - _c.OVERRIGHTARROW;
                case this.sUid + "_arr2":
                    return tp == "over" ? st |= _c.OVERTOPARROW : st &= _c.MAXSTATE - _c.OVERTOPARROW;
                case this.sUid + "_arr3":
                    return tp == "over" ? st |= _c.OVERBOTTOMARROW : st &= _c.MAXSTATE - _c.OVERBOTTOMARROW;
            }
        };
        CUIScroller.fbOverArrow = function(id) {
            this.bPause = 0;
            this.fbUpDate(this.fiSetArrSt(this.iStat, "over", id));
            return true;
        };
        CUIScroller.fbOutArrow = function(id) {
            this.fbUpDate(this.fiSetArrSt(this.iStat, "out", id));
            return true;
        };
        CUIScroller.fiGetDir = function(id) {
            if (id == this.sUid + "_arr1") {
                this._iScDir = 1;
            } else {
                if (id == this.sUid + "_arr0") {
                    this._iScDir = 2;
                } else {
                    if (id == this.sUid + "_arr3") {
                        this._iScDir = 3;
                    } else {
                        if (id == this.sUid + "_arr2") {
                            this._iScDir = 4;
                        }
                    }
                }
            }
            return this._iScDir;
        };
        CUIScroller.fvResumeDir = function() {
            this._iScDir = this._iNowScDir;
        };
        CUIScroller.fbStartScroll = function(id) {
            this.fiGetDir(id);
            this.fbScroll(2 * this.iSpeed);
            return true;
        };
        CUIScroller.fbRe1XScroll = function(id) {
            if (this.oScEff && this.oScEff.fiGetStat() == 2) {
                this.oScEff.fbStop();
            }
            this.fvResumeDir();
            this.fbResumeScroll();
            this.fbScroll(this.iSpeed);
            return true;
        };
        CUIScroller.fb1XScroll = function(id) {
            this.fiGetDir(id);
            this.fbScroll(this.iSpeed);
            return true;
        };
        CUIScroller.fb2XScroll = function(id) {
            this.fiGetDir(id);
            this.fbScroll(this.iSpeed * 2);
            return true;
        };
        CUIScroller.fb5XScroll = function(id) {
            this.fiGetDir(id);
            this.fbScroll(this.iSpeed * 5);
            return true;
        };
        CUIScroller.fbEndScroll = function(id) {
            if (this.bAuto) {
                this.fbScroll(this.iSpeed);
            } else {
                this.fbScroll(0);
            }
            return true;
        };
        CUIScroller.fbDownArrow = function(id) {
            this.fiGetDir(id);
            return false;
        };
        CUIScroller.fbUpArrow = function(id) {
            this.fiGetDir(id);
            return true;
        };
        CUIScroller.fbCanResume = function(s) {
            var _r = _STNS,
                _c = _r.UI.CUIScroller,
                st = this.iStat;
            if (this._tEffTid || st & _c.OVERLEFTARROW && !(st & _c.ENABLELEFTARROW) || st & _c.OVERRIGHTARROW && !(st & _c.ENABLERIGHTARROW) || st & _c.OVERTOPARROW && !(st & _c.ENABLETOPARROW) || st & _c.OVERBOTTOMARROW && !(st & _c.ENABLEBOTTOMARROW) || (this.bAuto && s == this.iSpeed && (st & _c.OVERRIGHTARROW || st & _c.OVERLEFTARROW || st & _c.OVERTOPARROW || st & _c.OVERBOTTOMARROW))) {
                return false;
            } else {
                return true;
            }
        };
        CUIScroller.fbScroll = function(s) {
            var _r = _STNS,
                e, dd, _c = _r.UI.CUIScroller,
                st = this.iStat,
                d = this._iScDir,
                _1bf = false,
                _iSt = this.iScDelay,
                _1c1 = "";
            clearTimeout(this._tScTid);
            if (!d || !s || this.bPause || this._bOverPause || (this.oScEff && this.oScEff.fiGetStat() == 2) || !this.fbCanResume(s) || this._iNowShowingTipId) {
                this._tScTid = setTimeout(this.sSelf + ".fbScroll(" + s + ")", this.iCurDur);
                return false;
            }
            e = _r.fdmGetEleById(this.sUid + "_sc");
            if (!e) {
                return false;
            }
            var _1c2 = (d == 1 || d == 2),
                dd = _1c2 ? e.scrollLeft : e.scrollTop,
                imod, max, _1c5, _1c6 = true;
            max = _1c2 ? this._iAllWid - this.iDSpc : this._iAllHei - this.iDSpc;
            _1c5 = _1c2 ? this._iPageWid : this._iPageHei;
            if (this.iScDist == 1) {
                imod = (_1c2 ? this.iIWid : this.iIHei) + this.iDSpc + this.iDPad * 2 + this.iIBdWid * 2;
            } else {
                if (this.iScDist == 2) {
                    imod = _1c5;
                } else {
                    imod = 1;
                }
            }
            var lm = max % _1c5 == 0 ? max - _1c5 : max - max % _1c5,
                ii;
            if (this.iScDist == 1 && _1c2) {
                lm = max - imod;
            }
            if (this.iScDist == 1 && !_1c2) {
                lm = this.aItems[this.aItems.length / 2 - 1]._iScrollToHei;
            }
            var __p = this._iSelectP;
            if (d == 1 || d == 3) {
                if (this.iCyc != 1 && dd >= lm) {
                    _1c2 ? e.scrollLeft = lm : e.scrollTop = lm;
                    if (this.iScDist == 1) {
                        this.fiGetItemIndex();
                    }
                    st &= _c.MAXSTATE - (_1c2 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW);
                    this.fbUpDate(st);
                    this.fbPauseScroll();
                    if (this.iCyc == 2) {
                        this._iScDir = this._iNowScDir = _1c2 ? 2 : 4;
                        if (this.iScDist == 0) {
                            _iSt = 1500;
                        }
                        this._tResumePauseTid = setTimeout(this.sSelf + ".fbResumeScroll()", _iSt);
                        this._tScTid = setTimeout(this.sSelf + ".fbScroll(" + s + ")", this.iCurDur);
                    }
                    return;
                }
                if (this.iScMod == 1 && this.iScDist == 2) {
                    dd = (this._iSelectP) * _1c5;
                    this._iSelectP += 1;
                    if (this.iCyc == 1 && dd >= max) {
                        dd = 0;
                        this._iSelectP = 1;
                    }
                    this.fbPauseScroll();
                    this.fbToPag(this._iSelectP);
                    this._tEffTid = setTimeout(this.sSelf + "._tEffTid=0;" + this.sSelf + ".fbResumeScroll();" + this.sSelf + ".fbScroll(" + s + ")", this.iEffSp + this.iScDelay + 100);
                } else {
                    if (this.iCyc == 1 && dd + s >= max) {
                        dd = 0;
                        if (this.iScDist == 1 || this.iScDist == 2) {
                            _1bf = true;
                        }
                        if (this.iScDist == 1) {
                            this._iItemIndex = 0;
                        }
                    } else {
                        dd += s;
                        if (this.iScDist == 1 || this.iScDist == 2) {
                            if (this.iScDist == 2 && d == 3) {
                                var _now = this.fiGetFullPage("LoU");
                                var _to = _now + 1;
                                var _1cc = (_to - 1) * this._iPageHei;
                                if (_to > this._iMaxPage) {
                                    _1cc = this._iAllHei;
                                }
                                if (dd >= _1cc) {
                                    dd = _1cc;
                                    _1bf = true;
                                    if (_to > this._iMaxPage) {
                                        _to = this.iCyc == 1 ? 1 : this._iMaxPage;
                                    }
                                } else {
                                    _1bf = false;
                                }
                            } else {
                                if (this.iScDist == 1 && d == 3) {
                                    var _now = this.fiGetItemIndex("LoU");
                                    var _1cc = 0;
                                    if (_now >= this.aItems.length) {
                                        _1cc = this._iAllHei;
                                    } else {
                                        _1cc = this.aItems[_now + 1]._iScrollToHei;
                                    }
                                    if (dd >= _1cc) {
                                        dd = _1cc;
                                        _1bf = true;
                                    } else {
                                        _1bf = false;
                                    }
                                } else {
                                    ii = dd % imod;
                                    if (ii < s) {
                                        if (this.iScDist == 1 && d == 3) {
                                            this._iItemIndex++;
                                            dd = imod;
                                        } else {
                                            dd -= ii;
                                        }
                                        _1bf = true;
                                    }
                                }
                            }
                        }
                        if (this.iCyc != 1 && dd >= lm) {
                            dd = lm;
                            st &= _c.MAXSTATE - (_1c2 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW);
                            this.fbUpDate(st);
                            if (this.iCyc == 0) {
                                _1c6 = false;
                            }
                            if (this.iCyc == 2) {
                                this._iScDir = this._iNowScDir = _1c2 ? 2 : 4;
                                if (this.iScDist == 0) {
                                    _iSt = 1500;
                                }
                            }
                            if (this.iScDist == 1) {
                                this.fiGetItemIndex();
                            }
                            _1bf = true;
                        }
                        if (this.iCyc != 1 && !(this.iStat & (_1c2 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW))) {
                            this.fbUpDate(st |= (_1c2 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW));
                        }
                    }
                    _1c2 ? e.scrollLeft = dd : e.scrollTop = dd;
                    if (_1bf) {
                        this.fbPauseScroll();
                        if (this.fbCanResume(s) && _1c6) {
                            this._tResumePauseTid = setTimeout(this.sSelf + ".fbResumeScroll()", _iSt);
                        }
                    }
                    if (_1c2 ? (dd >= (__p - 1) * this._iPageWid + this._iPageWid / 2 || dd <= (__p - 1) * this._iPageWid - this._iPageWid / 2) : ((dd >= (__p - 1) * this._iPageHei + (this._iCurDHei - this.iDSpc) / 2) || (dd <= (__p - 1) * this._iPageHei - this._iCurDHei / 2))) {
                        this.fbSetPag();
                    }
                }
            } else {
                if (this.iScMod == 1 && this.iScDist == 2) {
                    var _p = this._iSelectP;
                    dd = (this._iSelectP - 2) * _1c5;
                    this._iSelectP -= 1;
                    if (this.iCyc != 1 && dd < 0) {
                        this._iSelectP = 1;
                        if (this.iCyc == 2) {
                            this._iScDir = this._iNowScDir = _1c2 ? 1 : 3;
                            this.fbScroll(s);
                        }
                        return;
                    } else {
                        if (this.iCyc == 1 && dd < 0) {
                            this._iSelectP = Math.ceil(max / _1c5);
                        }
                    }
                    this.fbPauseScroll();
                    this._tEffTid = setTimeout(this.sSelf + "._tEffTid=0;" + this.sSelf + ".fbResumeScroll();" + this.sSelf + ".fbScroll(" + s + ")", this.iEffSp + this.iScDelay);
                    this.fbToPag(this._iSelectP);
                } else {
                    if (this.iCyc != 1 && dd - s <= 0) {
                        dd = 0;
                        st &= _c.MAXSTATE - (_1c2 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW);
                        this.fbUpDate(st);
                        if (this.iCyc == 0) {
                            _1c6 = false;
                        }
                        if (this.iCyc == 2) {
                            this._iScDir = this._iNowScDir = _1c2 ? 1 : 3;
                            if (this.iScDist == 0) {
                                _iSt = 1500;
                            }
                        }
                        _1bf = true;
                    } else {
                        if (this.iCyc == 1 && dd - s <= 0) {
                            dd = max;
                            if (this.iScDist == 1 || this.iScDist == 2) {
                                _1bf = true;
                                _1c1 = "_STNS.fdmGetEleById('" + this.sUid + "_sc')." + (_1c2 ? "scrollLeft" : "scrollTop") + "=" + dd + ";";
                                dd = 0;
                            }
                        } else {
                            st |= (_1c2 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW);
                            dd -= s;
                            if (this.iScDist == 1 || this.iScDist == 2) {
                                if (this.iScDist == 2 && d == 4) {
                                    var _now = this.fiGetFullPage();
                                    var _to = _now - 1;
                                    if (dd <= (_to) * this._iPageHei) {
                                        dd = (_to) * this._iPageHei;
                                        _1bf = true;
                                        if (_to < 1) {
                                            _to = this.iCyc == 1 ? this._iMaxPage : 1;
                                        }
                                    }
                                } else {
                                    if (this.iScDist == 1 && d == 4) {
                                        var _now = this.fiGetItemIndex("RoD");
                                        var _1cc = 0;
                                        if (_now >= this.aItems.length) {
                                            _1cc = this._iAllHei;
                                        } else {
                                            _1cc = this.aItems[_now]._iScrollToHei;
                                        }
                                        if (dd <= _1cc) {
                                            dd = _1cc;
                                            _1bf = true;
                                        } else {
                                            _1bf = false;
                                        }
                                    } else {
                                        ii = dd % imod;
                                        if (ii < s) {
                                            _1bf = true;
                                            if (this.iScDist == 1 && d == 4) {
                                                dd = imod;
                                                this._iItemIndex--;
                                                if (this._iItemIndex < 0) {
                                                    this._iItemIndex = 0;
                                                }
                                            } else {
                                                dd -= ii;
                                            }
                                            if (this.iCyc == 1 && dd <= 0) {
                                                if (this.iScDist == 1 || this.iScDist == 2) {
                                                    dd = max;
                                                    _1c1 = "_STNS.fdmGetEleById('" + this.sUid + "_sc')." + (_1c2 ? "scrollLeft" : "scrollTop") + "=" + dd + ";";
                                                    dd = 0;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    _1c2 ? e.scrollLeft = dd : e.scrollTop = dd;
                    if (this.iCyc != 1 && dd <= 0) {
                        dd = lm;
                        st &= _c.MAXSTATE - (_1c2 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW);
                        this.fbUpDate(st);
                        if (this.iCyc == 0) {
                            _1c6 = false;
                        }
                        if (this.iCyc == 2) {
                            this._iScDir = this._iNowScDir = _1c2 ? 1 : 3;
                            if (this.iScDist == 0) {
                                _iSt = 1500;
                            }
                        }
                        if (this.iScDist == 1) {
                            this.fiGetItemIndex();
                        }
                        _1bf = true;
                    }
                    st |= (_1c2 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW);
                    this.fbUpDate(st);
                    if (_1c2 ? (dd > (__p - 1) * this._iPageWid + this._iPageWid / 2 || e.scrollLeft < (__p - 1) * this._iPageWid - this._iPageWid / 2) : ((dd > (__p - 1) * this._iPageHei + (this._iCurDHei - this.iDSpc) / 2) || (dd < (__p - 1) * this._iPageHei - this._iCurDHei / 2))) {
                        this.fbSetPag();
                    }
                    if (_1bf) {
                        this.fbPauseScroll();
                        if (this.fbCanResume(s)) {
                            this._tResumePauseTid = setTimeout(_1c1 + this.sSelf + ".fbResumeScroll();", _iSt);
                        }
                    }
                }
            }
            if (_1c6) {
                this._tScTid = setTimeout(this.sSelf + ".fbScroll(" + s + ")", this.iCurDur);
            }
            return true;
        };
        CUIScroller.fbPageScroll = function(id) {
            var __p = this._iSelectP,
                _r = _STNS,
                ds, dd, sc, f = 1,
                d = 1,
                _c = _r.UI.CUIScroller,
                dw, _1d8 = false;
            st = this.iStat, e = _r.fdmGetEleById(this.sUid + "_sc");
            clearTimeout(this._tScTid);
            if (!e) {
                return false;
            }
            d = this.fiGetDir(id);
            if (d == 1 && (!(this.iStat & _c.ENABLERIGHTARROW)) || d == 2 && (!(this.iStat & _c.ENABLELEFTARROW)) || d == 3 && (!(this.iStat & _c.ENABLEBOTTOMARROW)) || d == 4 && (!(this.iStat & _c.ENABLETOPARROW))) {
                return;
            }
            var _1d9 = (d == 1 || d == 2);
            dd = _1d9 ? e.scrollLeft : e.scrollTop;
            var imod, max, _1dc;
            max = (_1d9 ? this._iAllWid : this._iAllHei) - this.iDSpc;
            _1dc = (_1d9 ? this._iPageWid : this._iPageHei);
            if (this.iScDist == 1) {
                imod = (_1d9 ? this.iIWid : this.iIHei) + this.iDSpc + this.iDPad * 2 + this.iIBdWid * 2;
            } else {
                if (this.iScDist == 2) {
                    imod = _1dc;
                } else {
                    imod = 1;
                }
            }
            var lm = max % _1dc == 0 ? max - _1dc : max - max % _1dc,
                ii, tmp;
            if (this.iScDist == 1 && _1d9) {
                lm = max - imod;
            }
            if (this.iScDist == 1 && !_1d9) {
                lm = this.aItems[this.aItems.length / 2 - 1]._iScrollToHei;
            }
            if (d == 1 || d == 3) {
                if (this.iCyc != 1 && dd >= lm) {
                    if (this.iCyc == 2) {
                        this._iScDir = this._iNowScDir = _1d9 ? 2 : 4;
                    }
                    _1d9 ? e.scrollLeft = lm : e.scrollTop = lm;
                    st &= _c.MAXSTATE - (_1d9 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW);
                    this.fbUpDate(st);
                    return;
                }
                if (this.iScMod == 1 && this.iScDist == 2) {
                    this._iSelectP = (this.iCyc == 1 && (dd + _1dc) >= max) ? 1 : this._iSelectP + 1;
                    if (this._iSelectP > this._iMaxPage) {
                        this._iSelectP = this._iMaxPage;
                    }
                    this.fbToPag(this._iSelectP);
                } else {
                    if (this.iCyc == 1 && dd >= max) {
                        dd = 0;
                        _1d8 = true;
                    } else {
                        dd += this.iSpeed;
                        if (this.iScDist == 1 && d == 3) {
                            var _now = this.fiGetItemIndex("LoU");
                            var _1e1 = 0;
                            if (_now >= this.aItems.length) {
                                _1e1 = this._iAllHei;
                            } else {
                                _1e1 = this.aItems[_now + 1]._iScrollToHei;
                            }
                            if (dd >= _1e1) {
                                dd = _1e1;
                            } else {
                                _1d8 = true;
                            }
                        } else {
                            if (this.iScDist == 2 && d == 3) {
                                var _now = this.fiGetFullPage("LoU");
                                var _to = _now + 1;
                                var _1e1 = (_to - 1) * this._iPageHei;
                                if (_to > this._iMaxPage) {
                                    _1e1 = this._iAllHei;
                                }
                                if (dd >= _1e1) {
                                    dd = _1e1;
                                    _1d8 = false;
                                    if (_to > this._iMaxPage) {
                                        _to = this.iCyc == 1 ? 1 : this._iMaxPage;
                                    }
                                } else {
                                    _1d8 = true;
                                }
                            } else {
                                ii = dd % imod;
                                if (ii < this.iSpeed) {
                                    dd -= ii;
                                }
                                if (dd < max && ii >= this.iSpeed) {
                                    _1d8 = true;
                                } else {
                                    _1d8 = false;
                                }
                            }
                        }
                        tmp = dd;
                        if (this.iCyc != 1 && dd >= lm) {
                            this._iSelectP = this._iMaxPage;
                            if (this.iCyc == 2) {
                                this._iScDir = this._iNowScDir = _1d9 ? 2 : 4;
                            }
                            dd = lm;
                            st &= _c.MAXSTATE - (_1d9 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW);
                            this.fbUpDate(st);
                        }
                        if (this.iCyc == 1 && dd >= max) {
                            this._iSelectP = 1;
                            dd = 0;
                            this._iItemIndex = 0;
                        }
                        if (!(this.iStat & (_1d9 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW))) {
                            this.fbUpDate(st | (_1d9 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW));
                        }
                    }
                    _1d9 ? e.scrollLeft = dd : e.scrollTop = dd;
                }
            } else {
                if (this.iCyc != 1 && dd <= 0) {
                    this._iSelectP = 1;
                    if (this.iCyc == 2) {
                        this._iScDir = this._iNowScDir = _1d9 ? 1 : 3;
                    }
                    _1d9 ? e.scrollLeft = 0 : e.scrollTop = 0;
                    st &= _c.MAXSTATE - (_1d9 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW);
                    this.fbUpDate(st);
                    return;
                }
                if (this.iScMod == 1 && this.iScDist == 2) {
                    this._iSelectP = (this.iCyc == 1 && dd <= 0) ? Math.ceil(max / _1dc) : this._iSelectP - 1;
                    if (this._iSelectP < 1) {
                        this._iSelectP = 1;
                    }
                    this.fbToPag(this._iSelectP);
                } else {
                    if (this.iCyc == 1 && dd <= 0) {
                        dd = max;
                        _1d8 = true;
                    } else {
                        dd -= this.iSpeed;
                        if (this.iScDist == 2 && d == 4) {
                            var _now = this.fiGetFullPage("RoD");
                            var _to = _now - 1;
                            if (dd <= (_to) * this._iPageHei) {
                                dd = (_to) * this._iPageHei;
                                _1d8 = false;
                                if (_to < 1) {
                                    _to = this.iCyc == 1 ? this._iMaxPage : 1;
                                }
                            } else {
                                _1d8 = true;
                            }
                        } else {
                            if (this.iScDist == 1 && d == 4) {
                                var _now = this.fiGetItemIndex("RoD");
                                var _1e1 = 0;
                                if (_now >= this.aItems.length) {
                                    _1e1 = this._iAllHei;
                                } else {
                                    _1e1 = this.aItems[_now]._iScrollToHei;
                                }
                                if (dd <= _1e1) {
                                    dd = _1e1;
                                } else {
                                    _1d8 = true;
                                }
                            } else {
                                ii = dd % imod;
                                if (ii < this.iSpeed) {
                                    dd -= ii;
                                }
                                if (dd > 0 && ii >= this.iSpeed) {
                                    _1d8 = true;
                                }
                            }
                        }
                        tmp = dd;
                        if (this.iCyc != 1 && dd <= 0) {
                            this._iSelectP = 1;
                            if (this.iCyc == 2) {
                                this._iScDir = this._iNowScDir = _1d9 ? 1 : 3;
                            }
                            dd = 0;
                            this.fbSetPag();
                            st &= _c.MAXSTATE - (_1d9 ? _c.ENABLELEFTARROW : _c.ENABLETOPARROW);
                            this.fbUpDate(st);
                        }
                        if (this.iCyc == 1 && dd <= 0) {
                            dd = 0;
                        }
                        if (!(this.iStat & (_1d9 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW))) {
                            this.fbUpDate(st | (_1d9 ? _c.ENABLERIGHTARROW : _c.ENABLEBOTTOMARROW));
                        }
                    }
                    _1d9 ? e.scrollLeft = dd : e.scrollTop = dd;
                }
            }
            if (_1d9 ? (dd > (__p - 1) * this._iPageWid + this._iPageWid / 2 || dd < (__p - 1) * this._iPageWid - this._iPageWid / 2) : ((dd > (__p - 1) * (this._iCurDHei - this.iDSpc) + (this._iCurDHei - this.iDSpc) / 2) || (dd < (__p - 1) * (this._iCurDHei - this.iDSpc) - this._iCurDHei / 2))) {
                this.fbSetPag();
            }
            if (_1d8) {
                this._tScTid = setTimeout(this.sSelf + ".fbPageScroll('" + id + "')", this.iCurDur);
            }
            return false;
        };
        CUIScroller.fbPauseScroll = function() {
            clearTimeout(this._tResumePauseTid);
            this.bPause = true;
            return true;
        };
        CUIScroller.fbResumeScroll = function() {
            this.bPause = false;
            return true;
        };
        CUIScroller.fsGetHotStr = function(s, c, h, t, a, o, n) {
            return "<area" + " id=\"" + o.sUid + "_hot" + n + "\"" + (s ? " shape='" + s + "'" : "") + (c ? " coords='" + c + "'" : "") + (h ? " href=\"" + h.replace(/\"/g, "&quot;") + "\"" : "") + (t ? " target=\"" + t + "\"" : "") + (a ? " alt=\"" + a.replace(/\"/g, "&quot;") + "\" title=\"" + a.replace(/\"/g, "&quot;") + "\"" : "") + (!_STNS.bIsIE || (_STNS.bIsIE && _STNS.oNav.version < 6) ? this.fsQuickEnt(o, ["mouseover", "mouseout"], "image") : "") + "/>";
        };
        CUIScroller.fsGetBGStyle = function(node, a, b, o) {
            return this.fsGetStyle(node, a, b, {
                "background-color": o[0] || null,
                "background-image": o[1] || null,
                "background-repeat": o[2] || null
            });
        };
        CUIScroller.fsGetICStyle = function(i) {
            return this.fsGetStyle("td", "background-repeat:no-repeat;", 0, {
                "background-image": this.aCorners[i] || null,
                "width": this.iCWH || null,
                "height": this.iCWH || null
            });
        };
        CUIScroller.fsBlank = function(id) {
            with(this) {
                return "<img src=\"" + sBlank + "\" id='" + sUid + "_" + id + "' " + fsGetStyle("img", "", 0, {
                    "width": iCWH || null
                }) + ">";
            }
        };
        CUIScroller.fbAContainsB = function(A, B) {
            if (A.contains) {
                if (A.contains(B)) {
                    return true;
                } else {
                    return false;
                }
            }
            if (B == A) {
                return true;
            }
            while (B = B.parentNode) {
                if (B == A) {
                    return true;
                }
            }
            return false;
        };
        _STNS.UI.CUIScrollerItem = _STNS.Class(_STNS.UI.CUIObj);
        CUIScrollerItem.register("UI/CUIObj>CUIScrollerItem");
        CUIScrollerItem.construct = function() {
            this.bDisable = 0;
            this.oParSc = 0;
            this.iWid = 0;
            this.iHei = 0;
            this.iNid = 0;
            this.sId = 0;
            this.iTyp = 0;
            this.sTxt = 0;
            this.sLnk = 0;
            this.sTar = 0;
            this.sImg = 0;
            this.sImgMap = 0;
            this.iImgWid = 0;
            this.iImgHei = 0;
            this.sBgClr = 0;
            this.aFnts = [];
            this.aFntClrs = [];
            this.aDecos = [];
            this.sBdStyle = 0;
            this.iBdWid = 0;
            this.sBdClr = 0;
            this.oTip = 0;
            this.iStat = 0;
            this.sAlign = 0;
            this.sVAlign = 0;
            this._tTid = 0;
            this._iCurHei = 0;
            this._iScrollToHei = 0;
            with(_STNS.UI.CUIScrollerItem) {
                this.fsGetHTML = fsGetHTML;
                this.fvDestroy = fvDestroy;
                this.fbGetEnt = fbGetEnt;
                this.fbShowTip = fbShowTip;
                this.fbHideTip = fbHideTip;
                this.fbSetOver = fbSetOver;
                this.fbSetOut = fbSetOut;
                this.fbUpDate = fbUpDate;
                this.fbOpenLnk = fbOpenLnk;
                this.foClone = foClone;
            }
        };
        CUIScrollerItem.CUR_FONT = 1;
        CUIScrollerItem.FONT_BIT = 0;
        CUIScrollerItem.CUR_COLOR = 2;
        CUIScrollerItem.COLOR_BIT = 1;
        CUIScrollerItem.CUR_DECORATION = 4;
        CUIScrollerItem.DECORATION_BIT = 2;
        CUIScrollerItem.OVERTEXTSTYLE = CUIScrollerItem.CUR_FONT | CUIScrollerItem.CUR_COLOR | CUIScrollerItem.CUR_DECORATION;
        CUIScrollerItem.MOUSEOVERIMAGE = 8;
        CUIScrollerItem.MOUSEOVERTEXT = 16;
        with(CUIScrollerItem) {
            CUIScrollerItem.MAXSTATE = CUR_FONT | CUR_COLOR | CUR_DECORATION | MOUSEOVERIMAGE | MOUSEOVERTEXT;
        }
        CUIScrollerItem.fsGetHTML = function() {
            var s, _r = _STNS,
                sc = this.oParSc,
                _c = _r.UI.CUIScrollerItem;
            with(this) {
                if (sc.iTyp) {
                    s = "<td  id='" + this.sUid + "' valign='top'" + sc.fsGetStyle("td", (bDisable ? "visibility:hidden;" : "")) + "><table border=0 id='" + this.sUid + "_table' cellspacing=0 cellpadding=" + sc.iDPad + (sc.iRowMinHei > 0 ? " height=" + sc.iRowMinHei : "") + sc.fsGetStyle("tb", "width:100%;table-layout:fixed;", 0, {
                        "border-style": sBdStyle || null,
                        "border-width": iBdWid || null,
                        "border-color": sBdClr || null,
                        "background-color": sBgClr || null
                    }) + "><tr " + sc.fsGetStyle("tr") + "><td " + sc.fsGetStyle("td", "overflow:hidden;") + (sImg ? " align=center" : " align=" + sAlign) + " valign=top>" + (sImg && iHei ? (sLnk != "#_nolink" && !sImgMap ? "<a " + sc.fsGetStyle("a", (sc._bImgOnly ? "" : "float:left;") + "font-size:1px;width:" + iWid + "px;text-align:center;height:" + iHei + "px;") + " href=\"" + (sLnk == "#_nolink" ? "#" : sLnk.replace(/\"/g, "&quot;")) + "\" target='" + sTar + "' id='" + sUid + "_area'>" : "<div " + sc.fsGetStyle("dv", (sc._bImgOnly ? "" : "float:left;") + "font-size:1px;width:" + iWid + "px;text-align:center;height:" + iHei + "px;") + " id='" + sUid + "_area'>") + "<img border=0 id='" + sUid + "_img' src=\"" + sImg + "\"" + (_r.bIsIE && sLnk != "#_nolink" && !sImgMap ? " style='cursor:hand;'" : "") + " width=" + iImgWid + " height=" + iImgHei + " " + (sImgMap ? "usemap='#" + sImgMap + "' " : "") + _r.UI.fsGetEnt(this, "mouseover", "image") + " " + _r.UI.fsGetEnt(this, "mouseout", "image") + " " + _r.UI.fsGetEnt(this, "click") + ">" + (sLnk != "#_nolink" && !sImgMap ? "</a>" : "</div>") : "") + (sTxt ? (iTyp || sLnk == "#_nolink" ? "" : "<a " + sc.fsGetStyle("a", "display:block;text-decoration:none;") + " href=\"" + sLnk.replace(/\"/g, "&quot;") + "\" target='" + sTar + "'>") + "<div" + sc.fsGetStyle("dv", "padding:1px 0px;" + (_r.bIsIE && !iTyp && sLnk && sLnk != "#_nolink" ? "cursor:hand;" : "") + (sAlign ? "text-align:" + sAlign + ";" : "") + (_r.bIsIE ? "text-overflow:clip;" : ""), 0, {
                        "width": (sImg && iHei ? null : (iWid || null)),
                        "font": aFnts[(iStat & _c.CUR_FONT) >>> _c.FONT_BIT] || null,
                        "color": aFntClrs[(iStat & _c.CUR_COLOR) >>> _c.COLOR_BIT] || null,
                        "text-decoration": aDecos[(iStat & _c.CUR_DECORATION) >>> _c.DECORATION_BIT] || null
                    }) + " id='" + this.sUid + "_txt' " + _r.UI.fsGetEnt(this, "mouseover", "text") + " " + _r.UI.fsGetEnt(this, "mouseout", "text") + ">" + sTxt + "</div>" + (iTyp || sLnk == "#_nolink" ? "" : "</a>") : "") + (!sImg && !sTxt ? "<img border=0 src=\"" + sc.sBlank + "\" height='1' width='" + iWid + "'>" : "") + "</td></tr></table></td>";
                } else {
                    s = "<td id='" + this.sUid + "' valign='top'" + sc.fsGetStyle("td", (bDisable ? "visibility:hidden;" : "")) + "><table id='" + this.sUid + "_table'" + (sc.iRowMinHei > 0 ? " height=" + sc.iRowMinHei : "") + " border=0 cellspacing=0 cellpadding=" + sc.iDPad + sc.fsGetStyle("tb", "width:100%;", 0, {
                        "border-style": sBdStyle || null,
                        "border-width": iBdWid || null,
                        "border-color": sBdClr || null,
                        "background-color": sBgClr || null
                    }) + "><tr " + sc.fsGetStyle("tr") + "><td " + sc.fsGetStyle("td", "overflow:hidden;") + (sImg ? " align=center" : " align=" + sAlign) + " valign=top>" + (sImg && iHei ? (sLnk != "#_nolink" && !sImgMap ? "<a " + sc.fsGetStyle("a", "display:block;font-size:1px;width:" + iWid + "px;text-align:center;padding:" + Math.max(0, (iHei - iImgHei) / 2) + "px 0px;") + " href=\"" + (sLnk == "#_nolink" ? "#" : sLnk.replace(/\"/g, "&quot;")) + "\" target='" + sTar + "' id='" + sUid + "_area'>" : "<div " + sc.fsGetStyle("dv", "font-size:1px;width:" + iWid + "px;text-align:center;padding:" + Math.max(0, (iHei - iImgHei) / 2) + "px 0px;") + " id='" + sUid + "_area'>") + "<img id='" + sUid + "_img' src=\"" + sImg + "\"" + (_r.bIsIE && sLnk != "#_nolink" && !sImgMap ? " style='cursor:hand'" : "") + " width=" + iImgWid + " height=" + iImgHei + " border=0 " + (sImgMap ? "usemap='#" + sImgMap + "' " : "") + _r.UI.fsGetEnt(this, "mouseover", "image") + " " + _r.UI.fsGetEnt(this, "mouseout", "image") + " " + _r.UI.fsGetEnt(this, "click") + ">" + (sLnk != "#_nolink" && !sImgMap ? "</a>" : "</div>") : "") + (sTxt ? (iTyp || sLnk == "#_nolink" ? "" + "" : "<a " + sc.fsGetStyle("a", "display:block;text-decoration:none;") + " href=\"" + sLnk.replace(/\"/g, "&quot;") + "\" target='" + sTar + "'>") + "<div " + sc.fsGetStyle("dv", (iWid ? "width:" + iWid + "px;" : "") + "padding:1px 0px;" + (_r.bIsIE && !iTyp && sLnk && sLnk != "#_nolink" ? "cursor:hand;" : "") + "overflow:hidden;" + (sAlign ? "text-align:" + sAlign + ";" : ""), 0, {
                        "font": aFnts[(iStat & _c.CUR_FONT) >>> _c.FONT_BIT] || null,
                        "color": aFntClrs[(iStat & _c.CUR_COLOR) >>> _c.COLOR_BIT] || null,
                        "text-decoration": aDecos[(iStat & _c.CUR_DECORATION) >>> _c.DECORATION_BIT] || null
                    }) + " id='" + this.sUid + "_txt' " + _r.UI.fsGetEnt(this, "mouseover", "text") + _r.UI.fsGetEnt(this, "mouseout", "text") + ">" + sTxt + "</div>" + (iTyp || sLnk == "#_nolink" ? "" : "</a>") : "") + (!sImg && !sTxt ? "<img src=\"" + sc.sBlank + "\" height='1' width='" + iWid + "'>" : "") + "</td></tr></table></td>";
                }
            }
            return s;
        };
        CUIScrollerItem.fvDestroy = function() {
            if (this.oTip) {
                this.oTip.fvDestroy();
            }
            _STNS.UI.CUIObj.fvDestroy.call(this);
        };
        CUIScrollerItem.fbGetEnt = function(e, o) {
            var et = e.type || e,
                oid = o.id,
                _r = _STNS,
                _c = _r.UI.CUIScrollerItem,
                _eRo, _eTo = e.srcElement || e.target;
            with(this) {
                switch (et) {
                    case "mouseover":
                        _eRo = e.fromElement || e.relatedTarget;
                        while (_eRo && _eRo.nodeType != 1) {
                            _eRo = _eRo.parentNode;
                        }
                        if (_eRo && _eRo.id && (!oid.indexOf(this.sUid + "_hot") && _eRo.id == this.sUid + "_img" || oid == this.sUid + "_img" && !_eRo.id.indexOf(this.sUid + "_hot"))) {
                            return true;
                        }
                        if (oid == this.sUid + "_txt") {
                            this.iStat |= _c.MOUSEOVERTEXT;
                            return fbFireEnt("mouseovertext");
                        } else {
                            if (oid == this.sUid + "_img" || !oid.indexOf(this.sUid + "_hot")) {
                                this.iStat |= _c.MOUSEOVERIMAGE;
                                return fbFireEnt("mouseoverimage");
                            }
                        }
                        break;
                    case "mouseout":
                        _eRo = e.toElement || e.relatedTarget;
                        while (_eRo && _eRo.nodeType != 1) {
                            _eRo = _eRo.parentNode;
                        }
                        if (_eRo && _eRo.id && (!oid.indexOf(this.sUid + "_hot") && _eRo.id == this.sUid + "_img" || oid == this.sUid + "_img" && !_eRo.id.indexOf(this.sUid + "_hot") || _r.bIsFX && _r.oNav.version >= 1.5 && _r.oNav.version < 3 && this.oTip && (oid == this.sUid + "_img" || !oid.indexOf(this.sUid + "_hot")) && (typeof this.oTip.sShEff == "object") && _eRo.id == "stEffR_" + this.oTip.sShEff._iGid)) {
                            return true;
                        }
                        if (_r.bIsOP && _r.oNav.version < 9.5 && (!_eRo || _eRo && this.oTip && this.oTip.iTyp == 2 && (oid == this.sUid + "_img" || !oid.indexOf(this.sUid + "_hot")) && (_eRo.tagName == "BODY" || _eRo.tagName == "IFRAME"))) {
                            return true;
                        }
                        if (oid == this.sUid + "_txt") {
                            this.iStat &= _c.MAXSTATE - _c.MOUSEOVERTEXT;
                            return fbFireEnt("mouseouttext");
                        } else {
                            if (oid == this.sUid + "_img" || !oid.indexOf(this.sUid + "_hot")) {
                                this.iStat &= _c.MAXSTATE - _c.MOUSEOVERIMAGE;
                                return fbFireEnt("mouseoutimage");
                            }
                        }
                        break;
                    default:
                        return fbFireEnt(et);
                }
            }
            return true;
        };
        CUIScrollerItem.fbShowTip = function() {
            var _r = _STNS;
            if (!this.oTip) {
                return -1;
            }
            return this.oTip.fbShow(this.oParSc.iDelaySh);
        };
        CUIScrollerItem.fbHideTip = function() {
            if (!this.oTip) {
                return -1;
            }
            return this.oTip.fbHide(this.oParSc.iDelayHd);
        };
        CUIScrollerItem.fbSetOver = function() {
            var _r = _STNS,
                e, _c = _r.UI.CUIScrollerItem,
                st = this.iStat;
            st |= _c.OVERTEXTSTYLE;
            this.fbUpDate(st);
            return true;
        };
        CUIScrollerItem.fbSetOut = function() {
            var _r = _STNS,
                e, _c = _r.UI.CUIScrollerItem,
                st = this.iStat;
            st &= _c.MAXSTATE - _c.OVERTEXTSTYLE;
            this.fbUpDate(st);
            return true;
        };
        CUIScrollerItem.fbUpDate = function(st) {
            var d = this.iStat ^ st,
                _r = _STNS,
                _c = _r.UI.CUIScrollerItem,
                sc = this.oParSc;
            e = _r.fdmGetEleById(this.sUid + "_txt");
            if (e) {
                with(this) {
                    if (sc.iCssMd) {
                        var s = _r.bShield ? "stdv" : "",
                            ts;
                        ts = aFnts[(st & _c.CUR_FONT) >>> _c.FONT_BIT];
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        ts = aFntClrs[(st & _c.CUR_COLOR) >>> _c.COLOR_BIT];
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        ts = aDecos[(st & _c.CUR_DECORATION) >>> _c.DECORATION_BIT];
                        if (ts && s.indexOf(ts) == -1) {
                            s += (s ? " " : "") + ts;
                        }
                        if (s) {
                            e.className = s;
                        }
                    } else {
                        if ((d & _c.CUR_FONT) && aFnts[(iStat & _c.CUR_FONT) >>> _c.FONT_BIT] != aFnts[(st & _c.CUR_FONT) >>> _c.FONT_BIT]) {
                            e.style.font = aFnts[(st & _c.CUR_FONT) >>> _c.FONT_BIT];
                        }
                        if ((d & _c.CUR_COLOR) && aFntClrs[(iStat & _c.CUR_COLOR) >>> _c.COLOR_BIT] != aFntClrs[(st & _c.CUR_COLOR) >>> _c.COLOR_BIT]) {
                            e.style.color = aFntClrs[(st & _c.CUR_COLOR) >>> _c.COLOR_BIT];
                        }
                        if ((d & _c.CUR_DECORATION) && aDecos[(iStat & _c.CUR_DECORATION) >>> _c.DECORATION_BIT] != aDecos[(st & _c.CUR_DECORATION) >>> _c.DECORATION_BIT]) {
                            e.style.textDecoration = aDecos[(st & _c.CUR_DECORATION) >>> _c.DECORATION_BIT];
                        }
                    }
                }
            }
            this.iStat = st;
            return true;
        };
        CUIScrollerItem.fbOpenLnk = function() {
            if (_STNS.bIsIE && this.sLnk != "#_nolink" && parseInt(_STNS.oNav.version) < 5.5) {
                var e = _STNS.fdmGetEleById(this.sUid + "_area");
                if (e) {
                    e.click();
                }
            }
            return true;
        };
        CUIScrollerItem.foClone = function() {
            var o = {};
            for (var i in this) {
                o[i] = this[i];
            }
            o.sUid = _STNS.UI.fsGetUid();
            _STNS.UI.oUIs[o.sUid] = o;
            o.sSelf = "_STNS.UI.oUIs['" + o.sUid + "']";
            if (o.oTip) {
                o.oTip = o.oTip.foClone();
            }
            return o;
        };
        _STNS.UI.CUIScrollerTip = _STNS.Class(_STNS.UI.CUIObj);
        CUIScrollerTip.register("UI/CUIObj>CUIScrollerTip");
        CUIScrollerTip.construct = function() {
            this.iTyp = 0;
            this.sTxt = 0;
            this.sShEff = 0;
            this.sHdEff = 0;
            this.iEffDur = 0;
            this.iDirect = 0;
            this.aOffset = [0, 0];
            this.sAlign = 0;
            this.sVAlign = 0;
            this.oParItem = 0;
            this.sId = 0;
            this.iWid = 0;
            this.iHei = 0;
            this.sFnt = 0;
            this.sFntClr = 0;
            this.sDeco = 0;
            this.sBgClr = 0;
            this.sBgImg = 0;
            this.sBgRep = 0;
            this.sBdStyle = 0;
            this.iBdWid = 0;
            this.sBdClr = 0;
            this.bImgBd = 0;
            this.aCorners = [];
            this.iCWH = 0;
            this.aBdBgImgs = [];
            this.aBdBgClrs = [];
            this.aBdBgReps = [];
            this.iStat = 0;
            this.bShInit = 0;
            this.bHdInit = 0;
            this.sLineHeight = "";
            with(_STNS.UI.CUIScrollerTip) {
                this.fsGetHTML = fsGetHTML;
                this.fvDestroy = fvDestroy;
                this.fbCreate = fbCreate;
                this.fbShow = fbShow;
                this.fbHide = fbHide;
                this.fbOnShow = fbOnShow;
                this.fbOnHide = fbOnHide;
                this.faGetXY = faGetXY;
                this.fbGetEnt = fbGetEnt;
                this.fbSetOver = fbSetOver;
                this.fbSetOut = fbSetOut;
                this.foClone = foClone;
            }
        };
        CUIScrollerTip.SHOW = 1;
        CUIScrollerTip.MOUSEOVER = 2;
        with(CUIScrollerTip) {
            CUIScrollerTip.MAXSTATE = SHOW | MOUSEOVER;
        }
        CUIScrollerTip.fvDestroy = function() {
            if (typeof this.sShEff == "object") {
                this.sShEff.fbStop();
                this.sShEff.fbDel();
            }
            if (typeof this.sHdEff == "object") {
                this.sHdEff.fbStop();
                this.sHdEff.fbDel();
            }
            _STNS.UI.CUIObj.fvDestroy.call(this);
        };
        CUIScrollerTip.fsGetHTML = function() {
            var it = this.oParItem,
                sc = it.oParSc,
                s, _r = _STNS,
                _t = this;
            var _216 = function(i) {
                return sc.fsGetStyle("td", "font-size:" + (_r.bIsFX && _r.oNav.version >= 3 ? "0" : "1") + "px;line-height:0px;", 0, {
                    "background-image": _t.aCorners[i] || null,
                    "width": _t.iCWH || null,
                    "height": _t.iCWH || null
                });
            };
            var _218 = function() {
                return "<img border=0 src=\"" + sc.sBlank + "\" " + sc.fsGetStyle("img", 0, 0, {
                    "width": _t.iCWH || null,
                    "height": _t.iCWH || null
                }) + ">";
            };
            with(this) {
                s = "<div id='" + this.sUid + "' " + sc.fsGetStyle("dv", "visibility:hidden;position:absolute;left:0px;top:-9999px;z-index:1010;") + " " + _r.UI.fsGetEnt(this, "mouseover") + " " + _r.UI.fsGetEnt(this, "mouseout") + " " + _r.UI.fsGetEnt(this, "mouseenter") + ">" + "<table border=0 cellpadding=0 cellspacing=0 id='" + this.sUid + "_tb' width='" + iWid + "' height='" + iHei + "' " + sc.fsGetStyle("tb", 0, 0, {
                    "background-color": (bImgBd ? null : sBgClr || null),
                    "background-image": (bImgBd ? null : sBgImg || null),
                    "background-repeat": (bImgBd ? null : sBgRep || null),
                    "border-style": (!bImgBd && sBdStyle ? sBdStyle : null),
                    "border-width": (!bImgBd && iBdWid ? iBdWid : null),
                    "border-color": (!bImgBd && sBdClr ? sBdClr : null)
                }) + ">" + (bImgBd ? "<tr " + sc.fsGetStyle("tr") + ">" + "<td id='" + this.sUid + "_tlt' " + _216(0) + ">" + _218() + "</td>" + "<td " + sc.fsGetStyle("td", "font-size:" + (_r.bIsFX && _r.oNav.version >= 3 ? "0" : "1") + "px;line-height:0px;", 0, {
                    "background-color": aBdBgClrs[0] || null,
                    "background-image": aBdBgImgs[0] || null,
                    "background-repeat": aBdBgReps[0] || null
                }) + ">" + _218() + "</td>" + "<td " + _216(1) + ">" + _218() + "</td>" + "</tr>" + "<tr " + sc.fsGetStyle("tr") + ">" + "<td " + sc.fsGetStyle("td", "font-size:1px;line-height:0px;", 0, {
                    "background-color": aBdBgClrs[3] || null,
                    "background-image": aBdBgImgs[3] || null,
                    "background-repeat": aBdBgReps[3] || null
                }) + ">" + _218() + "</td>" : "") + "<td nowrap " + sc.fsGetStyle("td", (this.iTyp == 2 ? "background-color:#FFFFFF;background-image:url(" + sc.sBlank + ");" : "") + "white-space:nowrap;" + (_r.bIsIE ? "word-break:keep-all;" : "") + (sc.iCssMd || !sFnt ? "" : "line-height:" + sLineHeight + ";"), 0, {
                    "background-color": sBgClr || null,
                    "background-image": sBgImg || null,
                    "background-repeat": sBgRep || null,
                    "font": sFnt || null,
                    "color": sFntClr || null,
                    "text-decoration": sDeco || null
                }) + " valign='" + sVAlign + "' align='" + sAlign + "' id='" + sUid + "_txt'>" + sTxt + "</td>" + (bImgBd ? "<td " + sc.fsGetStyle("td", "font-size:1px;line-height:0px;", 0, {
                    "background-color": aBdBgClrs[1] || null,
                    "background-image": aBdBgImgs[1] || null,
                    "background-repeat": aBdBgReps[1] || null
                }) + ">" + _218() + "</td>" + "</tr>" + "<tr " + sc.fsGetStyle("tr") + ">" + "<td " + _216(3) + ">" + _218() + "</td>" + "<td " + sc.fsGetStyle("td", "font-size:1px;line-height:0px;", 0, {
                    "background-color": aBdBgClrs[2] || null,
                    "background-image": aBdBgImgs[2] || null,
                    "background-repeat": aBdBgReps[2] || null
                }) + ">" + _218() + "</td>" + "<td id='" + this.sUid + "_trb' " + _216(2) + ">" + _218() + "</td>" + "</tr>" : "") + "</table>" + "</div>";
            }
            return s;
        };
        CUIScrollerTip.fbShow = function(d) {
            var _r = _STNS,
                _c = _r.UI.CUIScrollerTip,
                s = this.iStat & _c.SHOW;
            clearTimeout(this._tTid);
            if (s) {
                return true;
            } else {
                if (!d) {
                    return this.fbOnShow();
                } else {
                    if (d) {
                        this._tTid = setTimeout(this.sSelf + ".fbShow()", d);
                    }
                }
            }
            return true;
        };
        CUIScrollerTip.fbOnShow = function() {
            var _r = _STNS,
                _c = _r.UI.CUIScrollerTip,
                ii = this.oParItem,
                sc = ii.oParSc,
                e, t, w = window,
                sp;
            if (sc._iNowShowingTipId != this.sUid) {
                if (sc._iNowShowingTipId) {
                    _STNS.UI.oUIs[sc._iNowShowingTipId].fbOnHide();
                }
                sc._iNowShowingTipId = this.sUid;
            }
            if (!(e = _r.fdmGetEleById(this.sUid))) {
                if (this.fbCreate()) {
                    this.bShInit = false;
                    this.bHdInit = false;
                    if ((_r.bIsIE || this.iTyp == 2) && (this.iHei > 0 || this.iWid > 0)) {
                        e = _r.fdmGetEleById(this.sUid + "_txt");
                        if (e) {
                            if (this.iHei > 0) {
                                var th = 0,
                                    bh = 0;
                                if (this.bImgBd) {
                                    th = _r.fdmGetEleById(this.sUid + "_tlt").style.height || _r.fsGetEleStyle(_r.fdmGetEleById(this.sUid + "_tlt"), "height");
                                    bh = _r.fdmGetEleById(this.sUid + "_trb").style.height || _r.fsGetEleStyle(_r.fdmGetEleById(this.sUid + "_trb"), "height");
                                } else {
                                    th = bh = _r.fdmGetEleById(this.sUid + "_tb").style.borderWidth || _r.fsGetEleStyle(_r.fdmGetEleById(this.sUid + "_tb"), "borderWidth");
                                }
                                th = th ? parseInt(th) : 0;
                                bh = bh ? parseInt(bh) : 0;
                                if (!th) {
                                    th = 0;
                                }
                                if (!bh) {
                                    bh = 0;
                                }
                                if (this.iTyp == 2) {
                                    e.childNodes[0].height = (this.iHei - th - bh);
                                }
                                e.style.height = (this.iHei - th - bh) + "px";
                                _r.fdmGetEleById(this.sUid + "_tb").style.height = (this.iHei) + "px";
                            }
                            if (this.iWid > 0) {
                                var lw = 0,
                                    rw = 0;
                                if (this.bImgBd) {
                                    lw = _r.fdmGetEleById(this.sUid + "_tlt").style.width || _r.fsGetEleStyle(_r.fdmGetEleById(this.sUid + "_tlt"), "width");
                                    rw = _r.fdmGetEleById(this.sUid + "_trb").style.width || _r.fsGetEleStyle(_r.fdmGetEleById(this.sUid + "_trb"), "width");
                                } else {
                                    lw = rw = _r.fdmGetEleById(this.sUid + "_tb").style.width || _r.fsGetEleStyle(_r.fdmGetEleById(this.sUid + "_tb"), "borderWidth");
                                }
                                lw = lw ? parseInt(lw) : 0;
                                rw = rw ? parseInt(rw) : 0;
                                if (!lw) {
                                    lw = 0;
                                }
                                if (!rw) {
                                    rw = 0;
                                }
                                if (this.iTyp == 2) {
                                    e.childNodes[0].width = (this.iWid - lw - rw);
                                }
                                e.style.width = (this.iWid - lw - rw) + "px";
                                _r.fdmGetEleById(this.sUid + "_tb").style.width = (this.iWid) + "px";
                            }
                        }
                    }
                    e = _r.fdmGetEleById(this.sUid);
                }
            }
            if (e) {
                t = _r.fdmGetEleById(ii.sUid + "_area");
                if (t) {
                    sp = _r.faGetElePos(t);
                    sp[0] = sp[0] + sc.iIWid / 2;
                    sp[1] = sp[1] + sc.iIWid / 2;
                }
                if (this.bHdInit && this.sHdEff && typeof this.sHdEff == "object" && _STNS.EFFECT) {
                    this.sHdEff.fbStop();
                }
                var pos = this.faGetXY(1);
                if (sc.bRunEff && this.sShEff && typeof this.sShEff == "string" && _STNS.EFFECT) {
                    var flt = _STNS.EFFECT.foGetEff(this.sShEff, this.sUid, w, this.iEffDur, this.iShEff);
                    if (flt) {
                        this.sShEff = flt;
                        if (this.sShEff.fbSet()) {
                            this.sShEff.fbApply();
                            this.sShEff.fbSetStyle("left:" + pos[0] + "px;top:" + pos[1] + "px;visibility:visible;" + (sp ? "_stStartX:" + sp[0] + "px;_stStartY:" + sp[1] + "px;" : ""));
                            this.sShEff.fbPlay();
                            this.iStat |= _c.SHOW;
                            this.bShInit = true;
                            return true;
                        } else {
                            this.sShEff.fbDel();
                            this.sShEff = "";
                        }
                    }
                } else {
                    if (sc.bRunEff && typeof this.sShEff == "object") {
                        var tf = true;
                        if (this.sShEff.dmWin != w || !this.bShInit) {
                            tf = this.sShEff.fbSet();
                            if (tf) {
                                this.bShInit = true;
                            }
                        }
                        if (tf) {
                            this.sShEff.fbApply();
                            this.sShEff.fbSetStyle("left:" + pos[0] + "px;top:" + pos[1] + "px;visibility:visible;" + (sp ? "_stStartX:" + sp[0] + "px;_stStartY:" + sp[1] + "px;" : ""));
                            this.sShEff.fbPlay();
                            this.iStat |= _c.SHOW;
                            return true;
                        }
                    }
                }
                e.style.left = pos[0] + "px";
                e.style.top = pos[1] + "px";
                e.style.visibility = "visible";
            }
            this.iStat |= _c.SHOW;
            return true;
        };
        CUIScrollerTip.faGetXY = function(f) {
            var _r = _STNS,
                _c = _r.UI.CUIScrollerTip,
                pi = this.oParItem,
                sc = pi.oParSc,
                e, w = window,
                ip, iw = ih = 0,
                pw, ph, x, y, cl = _r.fiGetCL(w),
                ct = _r.fiGetCT(w),
                cw = _r.fiGetCW(w),
                ch = _r.fiGetCH(w);
            if (pi && (e = _r.fdmGetEleById(pi.sUid))) {
                ip = _r.faGetElePos(e);
                if (_r.bIsSF) {
                    ih = _r.fiGetEleHei(e);
                    iw = _r.fiGetEleWid(e);
                    if (sc.iRowMinHei > ih) {
                        ih = sc.iRowMinHei;
                    }
                } else {
                    iw = _r.fiGetEleWid(e);
                    ih = _r.fiGetEleHei(e);
                }
            } else {
                ip = [0, 0];
            }
            e = _r.fdmGetEleById(this.sUid, w);
            if (e) {
                pw = _r.fiGetEleWid(e);
                ph = _r.fiGetEleHei(e);
            } else {
                return [0, 0];
            }
            if (sc.iTyp) {
                x = ip[0];
            } else {
                x = ip[0] + iw / 2 - pw / 2;
            }
            y = ip[1] + ih;
            x += this.aOffset[0];
            y += this.aOffset[1];
            if (f) {
                if (x < cl) {
                    x = cl;
                }
                if (y < ct) {
                    y = ct;
                }
                if (x + pw > cl + cw) {
                    x = cw + cl - pw;
                }
                if (y + ph > ct + ch) {
                    y = ct + ch - ph;
                }
            }
            return [x, y];
        };
        CUIScrollerTip.fbHide = function(d) {
            var _r = _STNS,
                _c = _r.UI.CUIScrollerTip,
                s = this.iStat & _c.SHOW;
            clearTimeout(this._tTid);
            if (!s) {
                return true;
            } else {
                if (!d) {
                    return this.fbOnHide();
                } else {
                    if (d) {
                        this._tTid = setTimeout(this.sSelf + ".fbHide()", d);
                    }
                }
            }
            return true;
        };
        CUIScrollerTip.fbOnHide = function() {
            var _r = _STNS,
                _c = _r.UI.CUIScrollerTip,
                e, i, sc = this.oParItem.oParSc,
                w = window;
            if (sc._iNowShowingTipId == this.sUid) {
                sc._iNowShowingTipId = 0;
            }
            if (!(this.iStat & _c.SHOW)) {
                return true;
            }
            if (e = _r.fdmGetEleById(this.sUid, w)) {
                if (this.bShInit && this.sShEff && typeof this.sShEff == "object" && _STNS.EFFECT) {
                    this.sShEff.fbStop();
                }
                var pos = this.faGetXY(1);
                if (sc.bRunEff && this.sHdEff && typeof this.sHdEff == "string" && _STNS.EFFECT) {
                    var flt = _STNS.EFFECT.foGetEff(this.sHdEff, this.sUid, w, this.iEffDur, this.iHdEff);
                    if (flt) {
                        this.sHdEff = flt;
                        if (this.sHdEff.fbSet()) {
                            this.sHdEff.fbApply();
                            this.sHdEff.fbSetStyle("left:" + pos[0] + "px;top:" + pos[1] + "px;visibility:hidden;");
                            this.sHdEff.fbPlay();
                            this.iStat &= _c.MAXSTATE - _c.SHOW;
                            this.bHdInit = true;
                            return true;
                        } else {
                            this.sHdEff.fbDel();
                            this.sHdEff = "";
                        }
                    }
                } else {
                    if (sc.bRunEff && typeof this.sHdEff == "object") {
                        var tf = true;
                        if (this.sHdEff.dmWin != w || !this.bHdInit) {
                            tf = this.sHdEff.fbSet();
                            if (tf) {
                                this.bHdInit = true;
                            }
                        }
                        if (tf) {
                            this.sHdEff.fbApply();
                            this.sHdEff.fbSetStyle("left:" + pos[0] + "px;top:" + pos[1] + "px;visibility:hidden;");
                            this.sHdEff.fbPlay();
                            this.iStat &= _c.MAXSTATE - _c.SHOW;
                            return true;
                        }
                    }
                }
                e.style.visibility = "hidden";
            }
            this.iStat &= _c.MAXSTATE - _c.SHOW;
            return true;
        };
        CUIScrollerTip.fbCreate = function() {
            try {
                _STNS.fbInsHTML(document.body, "afterBegin", this.fsGetHTML());
                return true;
            } catch (ee) {}
            return false;
        };
        CUIScrollerTip.fbGetEnt = function(e, o) {
            var et = e.type || e,
                oid = o.id,
                _r = _STNS,
                _c = _r.UI.CUIScrollerTip,
                _eRo, _eTo = e.srcElement || e.target;
            with(this) {
                switch (et) {
                    case "mouseover":
                    case "mouseenter":
                        return fbFireEnt("mouseover");
                        break;
                    case "mouseout":
                        return fbFireEnt("mouseout");
                        break;
                    default:
                        return fbFireEnt(et);
                }
            }
            return true;
        };
        CUIScrollerTip.fbSetOver = function() {
            var _r = _STNS,
                _c = _r.UI.CUIScrollerTip;
            this.iStat |= _c.MOUSEOVER;
            return this.fbShow(this.oParItem.oParSc.iDelaySh);
        };
        CUIScrollerTip.fbSetOut = function() {
            var _r = _STNS,
                _c = _r.UI.CUIScrollerTip;
            this.iStat &= _c.MAXSTATE - _c.MOUSEOVER;
            return this.fbHide(this.oParItem.oParSc.iDelayHd);
        };
        CUIScrollerTip.foClone = function() {
            var o = {};
            for (var i in this) {
                o[i] = this[i];
            }
            o.sUid = _STNS.UI.fsGetUid();
            _STNS.UI.oUIs[o.sUid] = o;
            o.sSelf = "_STNS.UI.oUIs['" + o.sUid + "']";
            return o;
        };
    }
    if (!_STNS._aStData) {
        _STNS._aStData = [];
    }

    function sts_bs(id, a, c) {
        var jsp, ss, jsr;
        if (document.getElementsByTagName) {
            ss = document.getElementsByTagName("script");
        } else {
            if (document.all.tags) {
                ss = document.all.tags("script");
            }
        }
        for (var j = 0; j < ss.length; j++) {
            jsr = ss[j].src;
            if (jsr && jsr.indexOf("stscode.js") != -1) {
                jsp = jsr.substring(0, jsr.indexOf("stscode.js"));
                break;
            }
        }
        if (jsp == null) {
            jsp = _STNS.sLibPth;
        }
        var sc, _r = _STNS,
            n = _r._aStData.length;
        sc = _r._aStData[n] = new _r.UI.CUIScroller;
        with(sc) {
            sJsPth = jsp;
            iNid = n;
            sId = id;
            sVer = a[0];
            sImgPth = a[1] ? a[1].charAt(a[1].length - 1) != "/" ? a[1] + "/" : a[1] : "";
            sLnkPre = a[2] ? a[2].charAt(a[2].length - 1) != "/" ? a[2] + "/" : a[2] : "";
            sBlank = iCssMd ? a[3] : fsGetImg(a[3]);
            iMaxNO = a[4];
            iCyc = a[5];
            bAuto = a[6];
            iSpeed = a[7];
            sWid = a[8];
            if (sWid == "") {
                sWid = "100%";
            }
            sAlign = a[9];
            iDPad = a[10];
            iDSpc = a[11];
            iIWid = a[12];
            iIHei = a[13];
            iScMod = a[14];
            if (a.length > 15) {
                sHei = a[15];
                iCssMd = a[16];
                iTyp = a[17];
                if (iTyp == 1) {
                    iDSpc = 0;
                }
                iRowMinHei = a[18];
                iScDelay = a[19];
                iScDir = a[20];
                if (!bAuto) {
                    iScDir = (iTyp == 1 ? 3 : 1);
                }
                iScRate = a[21];
                iCurDur = Math.round(1000 / iScRate);
                iScDist = a[22];
                sScEff = a[23];
                iEffTrans = a[24];
                iEffSp = (110 - a[25]) * 10;
                iMultiNum = a.length > 26 ? a[26] : 1;
            }
            if (a[23] == null) {
                iScMod = 0;
            }
            sIBdStyle = iCssMd ? sId + c[0] : c[0];
            iIBdWid = sIBdStyle && sIBdStyle != "none" ? iCssMd ? sId + c[1] : c[1] : 0;
            if (!iIBdWid) {
                sIBdStyle = "none";
            }
            sIBdClr = iCssMd ? sId + c[2] : c[2];
            sBgClr = iCssMd ? sId + c[3] : c[3];
            sBgImg = iCssMd ? sId + c[4] : fsGetImg(c[4]);
            sBgRep = iCssMd ? sId + c[5] : c[5];
            if (bAuto) {
                fbAttachEnt("mouseoverdisplay", fvOverPause);
                fbAttachEnt("mouseoutdisplay", fvOutPause);
            }
        }
        sc.__open = true;
        return sc;
    }

    function sts_ai(id, a, c, paid, psid) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        if (paid) {
            for (var i = 0; i < sc.aItems.length; i++) {
                if (sc.aItems[i].sId == paid) {
                    a = _r.faJoinA(a, sc.aItems[i].__aas);
                    break;
                }
            }
        }
        if (psid) {
            for (var i = 0; i < sc.aItems.length; i++) {
                if (sc.aItems[i].sId == psid) {
                    c = _r.faJoinA(c, sc.aItems[i].__ass);
                    break;
                }
            }
        }
        var n = sc.aItems.length,
            it;
        it = sc.aItems[n] = new _STNS.UI.CUIScrollerItem;
        with(it) {
            iNid = n;
            oParSc = sc;
            sId = id;
            iTyp = a[0];
            sTxt = !a[0] ? _r.fsGetHTMLEnti(a[1], 1).replace(/\r?\n/g, "<br>") : a[1];
            sLnk = sc.fsGetLnk(a[2]);
            sTar = a[3];
            sImg = sc.fsGetImg(a[4]);
            iImgWid = a[5];
            iImgHei = a[6];
            sAlign = a[7];
            _iCurHei = _iScrollToHei = iImgHei;
            sBgClr = sc.iCssMd ? sc.sId + c[0] + id : c[0];
            aFnts[0] = sc.iCssMd ? sc.sId + c[1] + id : c[1];
            aFntClrs[0] = sc.iCssMd ? sc.sId + c[2] + id : c[2];
            aDecos[0] = sc.iCssMd ? sc.sId + c[3] + id : c[3];
            aFnts[1] = sc.iCssMd ? sc.sId + c[4] + id : c[4];
            aFntClrs[1] = sc.iCssMd ? sc.sId + c[5] + id : c[5];
            aDecos[1] = sc.iCssMd ? sc.sId + c[6] + id : c[6];
            iWid = sc.iIWid;
            iHei = sc.iIHei;
            sBdStyle = sc.sIBdStyle;
            iBdWid = sc.iIBdWid;
            sBdClr = sc.sIBdClr;
            fbAttachEnt("mouseoverimage", fbShowTip);
            fbAttachEnt("mouseovertext", fbSetOver);
            fbAttachEnt("mouseoutimage", fbHideTip);
            fbAttachEnt("mouseouttext", fbSetOut);
            fbAttachEnt("click", fbOpenLnk);
        }
        it.__aas = a;
        it.__ass = c;
        return it;
    }

    function sts_map(id, hs, pid) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        if (pid) {
            for (var i = 0; i < sc.aItems.length; i++) {
                if (sc.aItems[i].sImgMap && sc.aItems[i].sId == pid) {
                    for (var j = 0; j < hs.length; j++) {
                        if (sc.aItems[i].__ams[j]) {
                            hs[j] = _r.faJoinA(hs[j], sc.aItems[i].__ams[j]);
                        }
                    }
                    break;
                }
            }
        }
        var it = sc.aItems[sc.aItems.length - 1],
            s = "";
        if (it && it.sImg) {
            for (var i = 0; i < hs.length; i++) {
                it.sImgMap = it.sUid + "_map";
                s += sc.fsGetHotStr(hs[i][0], hs[i][1], sc.fsGetLnk(hs[i][2]), hs[i][3], hs[i][4], it, i);
            }
            if (s) {
                sc._sMapStr += "<map name='" + it.sUid + "_map' id='" + it.sUid + "_map'>" + s + "</map>";
            }
        }
        it.__ams = hs;
    }

    function sts_tip(id, a, c, paid, psid) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        if (paid) {
            for (var i = 0; i < sc.aItems.length; i++) {
                if (sc.aItems[i].oTip && sc.aItems[i].sId == paid) {
                    a = _r.faJoinA(a, sc.aItems[i].__atas);
                    break;
                }
            }
        }
        if (psid) {
            for (var i = 0; i < sc.aItems.length; i++) {
                if (sc.aItems[i].oTip && sc.aItems[i].sId == psid) {
                    c = _r.faJoinA(c, sc.aItems[i].__atss);
                    break;
                }
            }
        }
        var it = sc.aItems[sc.aItems.length - 1],
            tp;
        if (!it.oTip) {
            tp = it.oTip = new _STNS.UI.CUIScrollerTip;
            with(tp) {
                oParItem = it;
                iTyp = a[0];
                if (!a[0]) {
                    sTxt = _r.fsGetHTMLEnti(a[1]).replace(/\r\n/g, "<br>");
                } else {
                    if (a[0] == 1) {
                        sTxt = a[1];
                    } else {
                        if (a[0] == 2) {
                            sTxt = "<iframe src=\"" + a[1] + "\" width='1' height='1' frameborder=0></iframe>";
                        }
                    }
                }
                sShEff = a[2];
                sHdEff = a[3];
                iEffDur = (110 - a[4]) * 10;
                iDirect = a[5];
                aOffset[0] = a[6];
                aOffset[1] = a[7];
                sVAlign = a[8];
                sAlign = a[9];
                iWid = a[10];
                iHei = a[11];
                sFnt = sc.iCssMd ? sc.sId + c[0] + id : c[0];
                if (!sc.iCssMd) {
                    sLineHeight = sFnt.replace(/.*(^|\s)(\d+[\w\%]+)(\s|$).*/, "$2");
                }
                sFntClr = sc.iCssMd ? sc.sId + c[1] + id : c[1];
                sDeco = sc.iCssMd ? sc.sId + c[2] + id : c[2];
                sBgClr = sc.iCssMd ? sc.sId + c[3] + id : c[3];
                sBgImg = sc.iCssMd ? sc.sId + c[4] + id : sc.fsGetImg(c[4]);
                sBgRep = sc.iCssMd ? sc.sId + c[5] + id : c[5];
                sBdStyle = sc.sTipBdStyle;
                iBdWid = sc.iTipBdWid;
                sBdClr = sc.sTipBdClr;
                bImgBd = sc.bTipBdImg;
                aCorners[0] = sc.aTipCorners[0];
                aCorners[1] = sc.aTipCorners[1];
                aCorners[2] = sc.aTipCorners[2];
                aCorners[3] = sc.aTipCorners[3];
                iCWH = sc.iTipCWH;
                aBdBgImgs[0] = sc.aTipBdBgImgs[0];
                aBdBgImgs[1] = sc.aTipBdBgImgs[1];
                aBdBgImgs[2] = sc.aTipBdBgImgs[2];
                aBdBgImgs[3] = sc.aTipBdBgImgs[3];
                aBdBgClrs[0] = sc.aTipBdBgClrs[0];
                aBdBgClrs[1] = sc.aTipBdBgClrs[1];
                aBdBgClrs[2] = sc.aTipBdBgClrs[2];
                aBdBgClrs[3] = sc.aTipBdBgClrs[3];
                aBdBgReps[0] = sc.aTipBdBgReps[0];
                aBdBgReps[1] = sc.aTipBdBgReps[1];
                aBdBgReps[2] = sc.aTipBdBgReps[2];
                aBdBgReps[3] = sc.aTipBdBgReps[3];
                fbAttachEnt("mouseover", fbSetOver);
                fbAttachEnt("mouseout", fbSetOut);
            }
        }
        it.__atas = a;
        it.__atss = c;
        return tp;
    }

    function sts_til(a, c) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        with(sc) {
            bTil = 1;
            iTTyp = a[0];
            sTTxt = !a[0] ? _r.fsGetHTMLEnti(a[1]).replace(/\r\n/g, "<br>") : a[1];
            sTAlign = a[2];
            sTFnt = iCssMd ? sId + c[0] : c[0];
            if (!iCssMd) {
                sLineHeight = sTFnt.replace(/.*(^|\s)(\d+[\w\%]+)(\s|$).*/, "$2");
            }
            sTFntClr = iCssMd ? sId + c[1] : c[1];
            sTDeco = iCssMd ? sId + c[2] : c[2];
            sTBgClr = iCssMd ? sId + c[3] : c[3];
            sTBgImg = iCssMd ? sId + c[4] : fsGetImg(c[4]);
            sTBgRep = iCssMd ? sId + c[5] : c[5];
        }
    }

    function sts_pag(c) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        with(sc) {
            bPag = 1;
            aPBgClrs[0] = iCssMd ? sId + c[0] : c[0];
            aPFnts[0] = iCssMd ? sId + c[1] : c[1];
            if (!iCssMd) {
                aPLineHeight[0] = aPFnts[0].replace(/.*(^|\s)(\d+[\w\%]+)(\s|$).*/, "$2");
            }
            aPFntClrs[0] = iCssMd ? sId + c[2] : c[2];
            aPDecos[0] = iCssMd ? sId + c[3] : c[3];
            aPBgClrs[1] = iCssMd ? sId + c[4] : c[4];
            aPFnts[1] = iCssMd ? sId + c[5] : c[5];
            if (!iCssMd) {
                aPLineHeight[1] = aPFnts[1].replace(/.*(^|\s)(\d+[\w\%]+)(\s|$).*/, "$2");
            }
            aPFntClrs[1] = iCssMd ? sId + c[6] : c[6];
            aPDecos[1] = iCssMd ? sId + c[7] : c[7];
            aPBgClrs[2] = iCssMd ? sId + c[8] : c[8];
            aPFnts[2] = iCssMd ? sId + c[9] : c[9];
            if (!iCssMd) {
                aPLineHeight[2] = aPFnts[2].replace(/.*(^|\s)(\d+[\w\%]+)(\s|$).*/, "$2");
            }
            aPFntClrs[2] = iCssMd ? sId + c[10] : c[10];
            aPDecos[2] = iCssMd ? sId + c[11] : c[11];
            aPBgClrs[3] = iCssMd ? sId + c[12] : c[12];
            aPFnts[3] = iCssMd ? sId + c[13] : c[13];
            if (!iCssMd) {
                aPLineHeight[3] = aPFnts[3].replace(/.*(^|\s)(\d+[\w\%]+)(\s|$).*/, "$2");
            }
            aPFntClrs[3] = iCssMd ? sId + c[14] : c[14];
            aPDecos[3] = iCssMd ? sId + c[15] : c[15];
            sPBgImg = iCssMd ? sId + c[16] : c[16];
            fbAttachEnt("mouseoverpage", fbOverPag);
            fbAttachEnt("mouseoutpage", fbOutPag);
            fbAttachEnt("clickpage", fbClickPag);
            fbAttachEnt("mouseoverprevious", fbOverPrevious);
            fbAttachEnt("mouseoutprevious", fbOutPrevious);
            fbAttachEnt("clickprevious", fbClickPrevious);
            fbAttachEnt("mouseovernext", fbOverNext);
            fbAttachEnt("mouseoutnext", fbOutNext);
            fbAttachEnt("clicknext", fbClickNext);
            fbAttachEnt("mouseoverpview", fvOverPause);
            fbAttachEnt("mouseoutpview", fvOutPause);
        }
    }

    function sts_sca(a, c) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        with(sc) {
            bArr = 1;
            if (!sc.iTyp) {
                sLAAlign = a[0];
                sLAVAlign = a[1];
                sRAAlign = a[2];
                sRAVAlign = a[3];
                aLAEnImgs[0] = iCssMd ? sId + c[0] : fsGetImg(c[0]);
                aLAEnImgs[1] = iCssMd ? sId + c[1] : fsGetImg(c[1]);
                aLADisImgs[0] = aLADisImgs[1] = iCssMd ? sId + c[2] : fsGetImg(c[2]);
                iLAImgWid = iCssMd ? sId + c[3] : c[3];
                iLAImgHei = iCssMd ? sId + c[4] : c[4];
                aRAEnImgs[0] = iCssMd ? sId + c[5] : fsGetImg(c[5]);
                aRAEnImgs[1] = iCssMd ? sId + c[6] : fsGetImg(c[6]);
                aRADisImgs[0] = aRADisImgs[1] = iCssMd ? sId + c[7] : fsGetImg(c[7]);
                iRAImgWid = iCssMd ? sId + c[8] : c[8];
                iRAImgHei = iCssMd ? sId + c[9] : c[9];
            } else {
                sTAAlign = a[0];
                sTAVAlign = a[1];
                sBAAlign = a[2];
                sBAVAlign = a[3];
                aTAEnImgs[0] = iCssMd ? sId + c[0] : fsGetImg(c[0]);
                aTAEnImgs[1] = iCssMd ? sId + c[1] : fsGetImg(c[1]);
                aTADisImgs[0] = aTADisImgs[1] = iCssMd ? sId + c[2] : fsGetImg(c[2]);
                iTAImgWid = iCssMd ? sId + c[3] : c[3];
                iTAImgHei = iCssMd ? sId + c[4] : c[4];
                aBAEnImgs[0] = iCssMd ? sId + c[5] : fsGetImg(c[5]);
                aBAEnImgs[1] = iCssMd ? sId + c[6] : fsGetImg(c[6]);
                aBADisImgs[0] = aBADisImgs[1] = iCssMd ? sId + c[7] : fsGetImg(c[7]);
                iBAImgWid = iCssMd ? sId + c[8] : c[8];
                iBAImgHei = iCssMd ? sId + c[9] : c[9];
            }
            this.fbOverArrow = fbOverArrow;
            this.fbOutArrow = fbOutArrow;
            this.fbDownArrow = fbDownArrow;
            this.fbUpArrow = fbUpArrow;
            if ((iScDist == 1 || iScDist == 2)) {
                fbAttachEnt("mouseoverarrow", fbOverArrow);
                fbAttachEnt("mouseoutarrow", fbOutArrow);
                fbAttachEnt("clickarrow", fbPageScroll);
                fbAttachEnt("clickarrow", _STNS.fbFalse);
                fbAttachEnt("mouseoverarrow", fvOverPause);
                fbAttachEnt("mouseoutarrow", fvOutPause);
            } else {
                if (iScDist == 0) {
                    fbAttachEnt("mouseoverarrow", fbOverArrow);
                    fbAttachEnt("mouseoutarrow", fbOutArrow);
                    fbAttachEnt("mousedownarrow", fb5XScroll);
                    fbAttachEnt("mouseuparrow", fbUpArrow);
                    fbAttachEnt("clickarrow", _STNS.fbFalse);
                    if (bAuto) {
                        fbAttachEnt("mouseoutarrow", fbRe1XScroll);
                        fbAttachEnt("mouseuparrow", fb1XScroll);
                    } else {
                        fbAttachEnt("mouseoverarrow", fbResumeScroll);
                        fbAttachEnt("mouseoverarrow", fb1XScroll);
                        fbAttachEnt("mouseoutarrow", fbPauseScroll);
                        fbAttachEnt("mouseuparrow", fb1XScroll);
                    }
                } else {
                    fbAttachEnt("mouseoverarrow", fbOverArrow);
                    fbAttachEnt("mouseoverarrow", fbStartScroll);
                    fbAttachEnt("mouseoutarrow", fbOutArrow);
                    fbAttachEnt("mouseoutarrow", fbEndScroll);
                    fbAttachEnt("mousedownarrow", fbDownArrow);
                    fbAttachEnt("mouseuparrow", fbUpArrow);
                    fbAttachEnt("clickarrow", _STNS.fbFalse);
                }
            }
        }
    }

    function sts_sbd(a, c) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        with(sc) {
            bImgBd = a[0];
            sBdStyle = iCssMd ? sId + c[0] : c[0];
            iBdWid = sBdStyle && sBdStyle != "none" ? (iCssMd ? sId + c[1] : c[1]) : 0;
            if (!iBdWid) {
                sBdStyle = "none";
            }
            sBdClr = iCssMd ? sId + c[2] : c[2];
            if (c.length > 3) {
                iCWH = iCssMd ? sId + c[3] : c[3];
                if (!iCWH) {
                    iCWH = 0;
                }
                aCorners[0] = iCssMd ? sId + c[4] : fsGetImg(c[4]);
                aCorners[1] = iCssMd ? sId + c[5] : fsGetImg(c[5]);
                aCorners[2] = iCssMd ? sId + c[6] : fsGetImg(c[6]);
                aCorners[3] = iCssMd ? sId + c[7] : fsGetImg(c[7]);
                aBdBgClrs[0] = iCssMd ? sId + c[8] : c[8];
                aBdBgImgs[0] = iCssMd ? sId + c[9] : fsGetImg(c[9]);
                aBdBgReps[0] = iCssMd ? sId + c[10] : c[10];
                aBdBgClrs[1] = iCssMd ? sId + c[11] : c[11];
                aBdBgImgs[1] = iCssMd ? sId + c[12] : fsGetImg(c[12]);
                aBdBgReps[1] = iCssMd ? sId + c[13] : c[13];
                aBdBgClrs[2] = iCssMd ? sId + c[14] : c[14];
                aBdBgImgs[2] = iCssMd ? sId + c[15] : fsGetImg(c[15]);
                aBdBgReps[2] = iCssMd ? sId + c[16] : c[16];
                aBdBgClrs[3] = iCssMd ? sId + c[17] : c[17];
                aBdBgImgs[3] = iCssMd ? sId + c[18] : fsGetImg(c[18]);
                aBdBgReps[3] = iCssMd ? sId + c[19] : c[19];
                if (!iCssMd && iCWH) {
                    iBdWid = 0;
                }
            }
        }
    }

    function sts_tbd(a, c) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1];
        if (!sc || !sc.__open) {
            return;
        }
        with(sc) {
            bTipBdImg = a[0];
            sTipBdStyle = iCssMd ? sId + c[0] : c[0];
            iTipBdWid = sTipBdStyle != "none" ? iCssMd ? sId + c[1] : c[1] : 0;
            if (!iTipBdWid) {
                sTipBdStyle = "none";
            }
            sTipBdClr = iCssMd ? sId + c[2] : c[2];
            iTipCWH = iCssMd ? sId + c[3] : c[3];
            aTipCorners[0] = iCssMd ? sId + c[4] : fsGetImg(c[4]);
            aTipCorners[1] = iCssMd ? sId + c[5] : fsGetImg(c[5]);
            aTipCorners[2] = iCssMd ? sId + c[6] : fsGetImg(c[6]);
            aTipCorners[3] = iCssMd ? sId + c[7] : fsGetImg(c[7]);
            aTipBdBgClrs[0] = iCssMd ? sId + c[8] : c[8];
            aTipBdBgImgs[0] = iCssMd ? sId + c[9] : fsGetImg(c[9]);
            aTipBdBgReps[0] = iCssMd ? sId + c[10] : c[10];
            aTipBdBgClrs[1] = iCssMd ? sId + c[11] : c[11];
            aTipBdBgImgs[1] = iCssMd ? sId + c[12] : fsGetImg(c[12]);
            aTipBdBgReps[1] = iCssMd ? sId + c[13] : c[13];
            aTipBdBgClrs[2] = iCssMd ? sId + c[14] : c[14];
            aTipBdBgImgs[2] = iCssMd ? sId + c[15] : fsGetImg(c[15]);
            aTipBdBgReps[2] = iCssMd ? sId + c[16] : c[16];
            aTipBdBgClrs[3] = iCssMd ? sId + c[17] : c[17];
            aTipBdBgImgs[3] = iCssMd ? sId + c[18] : fsGetImg(c[18]);
            aTipBdBgReps[3] = iCssMd ? sId + c[19] : c[19];
        }
    }

    function sts_es(a) {
        var _r = _STNS,
            sc = _r._aStData[_r._aStData.length - 1],
            n = sc.aItems.length;
        if (!sc || !sc.__open) {
            return;
        }
        if (n) {
            for (var i = 0; i < n; i++) {
                var it = sc.aItems[i].foClone();
                if (it.oTip) {
                    it.oTip.oParItem = it;
                }
                if (sc.iCyc != 1) {
                    it.bDisable = true;
                }
                it.iNid = n + i;
                sc.aItems.push(it);
                if (it.__ams) {
                    sts_map(0, it.__ams);
                }
            }
            n = sc.aItems.length;
            for (var i = 0; i < n; i++) {
                delete sc.aItems[i].__aas;
                delete sc.aItems[i].__ass;
                delete sc.aItems[i].__atas;
                delete sc.aItems[i].__atss;
                delete sc.aItems[i].__ams;
            }
            delete sc.__open;
            sc.fbCreate();
        } else {
            _STNS._aStData.pop();
            sc.fvDestroy();
        }
    }
}
if (typeof _STNS != "undefined" && !_STNS.EFFECT) {
    _STNS.EFFECT = {
        foGetEff: function(s, id, w, d, o) {
            if (!s) {
                return 0;
            }
            if (/^stEffect\(.Open/i.test(s) && _STNS.bIsIE) {
                var dir = s.replace(/^.*[\(\,]Direction\=(\w+)[\)\,].*$/i, "$1");
                var d = s.replace(/^.*[\(\,]Duration\=([\d.]+)[\)\,].*$/i, "$1");
                d = (d == s ? 1 : parseFloat(d));
                if (dir == "Down" || dir == s) {
                    s = "progid:DXImageTransform.Microsoft.Zigzag(GridSizeX=16,GridSizeY=16,enabled=0,Duration=" + d + ")";
                    d *= 1000;
                    o = 5;
                }
                if (dir == "Middle") {
                    s = "progid:DXImageTransform.Microsoft.Barn(orientation=horizontal,motion=out,enabled=0,Duration=" + d + ")";
                    d *= 1000;
                    o = 16;
                }
            }
            if (/^stEffect\(.Active/i.test(s) && _STNS.bIsIE) {
                var d = s.replace(/^.*[\(\,]Duration\=([\d.]+)[\)\,].*$/i, "$1");
                if (d == s) {
                    d = (dd == s ? 1 : parseFloat(d));
                }
                s = "progid:DXImageTransform.Microsoft.Fade(overlap=.5,enabled=0,Duration=" + d + ")";
                d *= 1000;
                o = 12;
            }
            var t = s.toLowerCase(),
                c;
            if ((!t.indexOf("progid:") || !t.indexOf("revealtrans")) && _STNS.EFFECT["CEffIE"]) {
                return new _STNS.EFFECT["CEffIE"]([s, id, w, d, o]);
            } else {
                if (!s.indexOf("stEffect")) {
                    s = s.substring(10, s.length - 2);
                    var cn = "CEff" + s.charAt(0).toUpperCase() + s.substr(1).replace(/^(.*)\(.*$/, "$1");
                    if (_STNS.EFFECT[cn]) {
                        return new _STNS.EFFECT[cn]([s, id, w, d, o]);
                    }
                } else {
                    return 0;
                }
            }
        }
    };
    with(_STNS.EFFECT) {
        _STNS.EFFECT.CEffect = _STNS.Class();
        CEffect.register("EFFECT/CEffect");
        CEffect.construct = function(as) {
            this._iStat = -1;
            this.sName = as[0];
            this.sDmId = as[1];
            this.dmWin = as[2] || window;
            with(_STNS.EFFECT.CEffect) {
                this.fiGetStat = fiGetStat;
                this.sGetParam = sGetParam;
                this.fbSet = _STNS.fbFalse;
                this.fbDel = _STNS.fbFalse;
                this.fbApply = _STNS.fbFalse;
                this.fbPlay = _STNS.fbFalse;
                this.fbStop = _STNS.fbFalse;
                this.fbSetStyle = _STNS.fbFalse;
                this.fvAnalyzeParams = fvAnalyzeParams;
            }
            this.aParams = new Array();
            this.sParams = as[0].replace(/^.*\((.*)\).*$/, "$1");
            if (this.sParams == as[0]) {
                this.sParams = "";
            }
        };
        CEffect.fiGetStat = function() {
            return this._iStat;
        };
        CEffect.sGetParam = function(s) {
            var b = this.sName.replace(new RegExp("^.*[\\(\\,]" + s + "\\=(\\d+)[\\,\\)].*$", "i"), "$1");
            return this.sName == b ? "" : b;
        };
        CEffect.fvAnalyzeParams = function() {
            var ta = this.sParams.split(",");
            var a;
            for (var i = 0; i < ta.length; i++) {
                a = ta[i].split("=");
                a[1] = /^\d+$/.test(a[1]) ? parseInt(a[1]) : (/^\d*\.\d+$/.test(a[1]) ? parseFloat(a[1]) : a[1]);
                this.aParams[a[0]] = typeof(a[1]) != "string" ? a[1] : this._cls[a[1]] || a[1];
            }
        };
    }
}