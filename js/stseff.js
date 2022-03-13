if (typeof _STNS != "undefined" && _STNS.EFFECT && !_STNS.EFFECT.CEffActive) {
    with(_STNS.EFFECT) {
        _STNS.EFFECT.CEffActive = _STNS.Class(_STNS.EFFECT.CEffect);
        CEffActive.register("EFFECT/CEffect>CEffActive");
        CEffActive.construct = function(as) {
            this._tTid = 0;
            this._iOpc = 0;
            this._iGid = -1;
            this._iStat = -1;
            if (!this.fvAnalyzeParams) {
                this._iStat = -2;
                return false;
            }
            this.fvAnalyzeParams();
            this.iStartOpc = this.aParams["StartOpc"] ? this.aParams["StartOpc"] : 0;
            this.iStopOpc = this.aParams["StopOpc"] ? this.aParams["StopOpc"] : 100;
            this.iDuration = this.aParams["Duration"] ? this.aParams["Duration"] : 1;
            this.iRate = this.aParams["Rate"] ? this.aParams["Rate"] : 30;
            this.iPerOpc = Math.ceil(Math.abs(this.iStopOpc - this.iStartOpc) / (this.iRate * this.iDuration));
            this.iPerOpc = this.iStopOpc > this.iStartOpc ? this.iPerOpc : this.iPerOpc * -1;
            this.iDt = Math.floor(1000 / this.iRate);
            with(_STNS.EFFECT.CEffActive) {
                this.fbSet = fbSet;
                this.fbDel = fbDel;
                this.fbApply = fbApply;
                this.fbPlay = fbPlay;
                this.fbStop = fbStop;
                this.fbSetStyle = fbSetStyle;
                this.fbShow = fbShow;
            }
        };
        CEffActive.fbSet = function() {
            if (this._iStat == -2) {
                return false;
            }
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin),
                n;
            if (!e) {
                return false;
            }
            if (this._iGid == -1) {
                n = _r.EFFECT.CEffActive._aGlobal.length;
                _r.EFFECT.CEffActive._aGlobal.push(this);
                this._iGid = n;
            }
            this._iStat = 0;
            return true;
        };
        CEffActive.fbDel = function() {
            this.fbStop();
            this._iStat = -1;
            _STNS.EFFECT.CEffActive._aGlobal[this._iGid] = null;
            this._iGid = -1;
            return true;
        };
        CEffActive.fbApply = function() {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
            if (!e) {
                return false;
            }
            e.style.filter = "Alpha(Opacity=" + this.iStartOpc + ")";
            e.style.opacity = this.iStartOpc / 100;
            if (!_r.EFFECT.CEffActive._aGlobal[this._iGid]) {
                _r.EFFECT.CEffActive._aGlobal[this._iGid] = this;
            }
            this._iStat = 1;
            return true;
        };
        CEffActive.fbPlay = function() {
            if (this._iStat != 1) {
                return false;
            }
            this._iStat = 2;
            this.fbShow();
            return true;
        };
        CEffActive.fbStop = function() {
            if (this._iStat > 0) {
                clearTimeout(this._tTid);
                e = _STNS.fdmGetEleById(this.sDmId, this.dmWin);
                e.style.filter = "Alpha(Opacity=" + this.iStopOpc + ")";
                e.style.opacity = this.iStopOpc / 100;
                this._iStat = 0;
            }
            return true;
        };
        CEffActive.fbSetStyle = function(s) {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                var ss = _r.foCss2Style(s),
                    i;
                for (i in ss) {
                    try {
                        e.style[i] = ss[i];
                    } catch (e) {}
                }
            }
            return true;
        };
        CEffActive._aGlobal = [];
        CEffActive.fbShow = function() {
            if (this._iStat != 2) {
                return;
            }
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
            var dd;
            if (_r.bIsIE) {
                dd = e.filters.alpha.opacity;
            } else {
                dd = e.style.opacity * 100;
            }
            if (typeof dd != "number") {
                dd = this.iStartOpc;
            }
            if (this.iPerOpc > 0 ? dd >= this.iStopOpc : dd <= this.iStopOpc) {
                e.style.filter = "Alpha(Opacity=" + this.iStopOpc + ")";
                e.style.opacity = this.iStopOpc / 100;
                this._iStat = 0;
            } else {
                e.style.filter = "Alpha(Opacity=" + (dd + this.iPerOpc) + ")";
                e.style.opacity = (dd + this.iPerOpc) / 100;
                this._tTid = setTimeout("_STNS.EFFECT.CEffActive._aGlobal[" + this._iGid + "].fbShow()", this.iDt);
            }
        };
    }
}
if (typeof _STNS != "undefined" && _STNS.EFFECT && _STNS.bIsIE && !_STNS.EFFECT.CEffIE) {
    with(_STNS.EFFECT) {
        _STNS.EFFECT.CEffIE = _STNS.Class(_STNS.EFFECT.CEffect);
        CEffIE.register("EFFECT/CEffect>CEffIE");
        CEffIE.construct = function(as) {
            this.iFid = as[4] ? parseInt(as[4]) : -1;
            this.sfName = "";
            this.iDur = as[3] || -1;
            this.sBak = "";
            this._iOid = -1;
            this._iStat = -1;
            this._iGid = -1;
            with(_STNS.EFFECT.CEffIE) {
                this.fiGetStat = fiGetStat;
                this.fbSet = fbSet;
                this.fbDel = fbDel;
                this.fbApply = fbApply;
                this.fbPlay = fbPlay;
                this.fbStop = fbStop;
                this.fbSetStyle = fbSetStyle;
            }
        };
        CEffIE._aGlobal = [];
        CEffIE.fiGetStat = function() {
            var _r = _STNS,
                e;
            if (this._iStat == -1) {
                return -1;
            }
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                return e.status;
            } else {
                return this._iStat;
            }
        };
        CEffIE.fbSet = function() {
            var _r = _STNS,
                e, s, fs = [],
                i = 0,
                bak, n;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                if (this.sName && _STNS.oNav.version >= 5.5) {
                    s = this.sfName = this.sName;
                } else {
                    if (_STNS.oNav.version < 5.5 && this.iFid >= 0 && this.iFid < 24 && this.iDur != -1) {
                        s = this.sfName = "revealTrans(Transition=" + this.iFid + ",Duration=" + this.iDur / 1000 + ")";
                    } else {
                        return false;
                    }
                }
                bak = e.style.filter;
                if (bak) {
                    var re = /[\w:\.]+\([^;\)]+\)/g;
                    fs = bak.match(re);
                }
                if (this._iGid == -1) {
                    n = _r.EFFECT.CEffIE._aGlobal.length;
                    _r.EFFECT.CEffIE._aGlobal.push(this);
                    this._iGid = n;
                }
                if (!fs) {
                    fs = [];
                }
                for (i = 0; i < fs.length; i++) {
                    if (fs[i] == this.sfName) {
                        this._iOid = i;
                        return true;
                    }
                }
                this._iOid = i;
                e.style.filter = (bak ? bak + " " : "") + s;
            }
            this.iStat = 0;
            return true;
        };
        CEffIE.fbDel = function() {
            var _r = _STNS,
                e, s, fs = [],
                bak, i, f = 1,
                t;
            this.fbStop();
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                t = _STNS.EFFECT.CEffIE._aGlobal;
                t[this._iGid] = null;
                for (i = 0; i < t.length; i++) {
                    if (t[i] && t[i].sDmId == this.sDmId && t[i].dmWin == this.dmWin && t[i]._iOid == this._iOid) {
                        f = 0;
                    }
                }
                if (!f) {
                    return true;
                }
                bak = e.style.filter;
                if (bak) {
                    var re = /[\w:\.]+\([^;\)]+\)/g;
                    fs = bak.match(re);
                }
                for (i = 0; i < fs.length; i++) {
                    if (fs[i] == this.sfName) {
                        fs[i] = "";
                    }
                }
                e.style.filter = fs.length ? fs.join(" ") : "";
                for (i = 0; i < t.length; i++) {
                    if (t[i] && t[i].sDmId == this.sDmId && t[i].dmWin == this.dmWin && t[i]._iOid > this._iOid) {
                        t[i]._iOid--;
                    }
                }
            }
            this._iStat = -1;
            return true;
        };
        CEffIE.fbApply = function() {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                if (e.filters[this._iOid]) {
                    e.filters[this._iOid].apply();
                }
            }
            this._iStat = 1;
            return true;
        };
        CEffIE.fbPlay = function() {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                if (e.filters[this._iOid]) {
                    e.filters[this._iOid].play();
                }
            }
            this._iStat = 2;
            return true;
        };
        CEffIE.fbStop = function() {
            var _r = _STNS,
                e;
            if (this.iStat > -1) {
                if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                    if (e.filters[this._iOid] && e.filters[this._iOid].status) {
                        e.filters[this._iOid].stop();
                    }
                }
                this._iStat = 0;
            }
            return true;
        };
        CEffIE.fbSetStyle = function(s) {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                var ss = _r.foCss2Style(s),
                    i;
                for (i in ss) {
                    try {
                        e.style[i] = ss[i];
                    } catch (e) {}
                }
            }
            return true;
        };
    }
}
if (typeof _STNS != "undefined" && _STNS.EFFECT && !_STNS.EFFECT.CEffOpen) {
    with(_STNS.EFFECT) {
        _STNS.EFFECT.CEffOpen = _STNS.Class(_STNS.EFFECT.CEffect);
        CEffOpen.register("EFFECT/CEffect>CEffOpen");
        CEffOpen.construct = function(as) {
            this._tTid = 0;
            this._iGid = -1;
            this._iStat = -1;
            if (!this.fvAnalyzeParams) {
                this._iStat = -2;
                return false;
            }
            this.fvAnalyzeParams();
            this.iDuration = this.aParams["Duration"] || 1;
            this.iRate = this.aParams["Rate"] || 30;
            this.iDt = Math.floor(1000 / this.iRate);
            this.iPerS = 5;
            this.iStartHeight = -1;
            this.iStopHeight = -1;
            this.iStartWidth = -1;
            this.iStopWidth = -1;
            this._iS = -1;
            this.sDirection = this.aParams["Direction"] || "Down";
            with(_STNS.EFFECT.CEffOpen) {
                this.fbSet = fbSet;
                this.fbDel = fbDel;
                this.fbApply = fbApply;
                this.fbPlay = fbPlay;
                this.fbStop = fbStop;
                this.fbSetStyle = fbSetStyle;
                this.fbShow = fbShow;
            }
        };
        CEffOpen.fbSet = function() {
            if (this._iStat == -2) {
                return false;
            }
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin),
                n;
            if (!e) {
                return false;
            }
            if (this._iGid == -1) {
                n = _r.EFFECT.CEffOpen._aGlobal.length;
                _r.EFFECT.CEffOpen._aGlobal.push(this);
                this._iGid = n;
            }
            this._iStat = 0;
            return true;
        };
        CEffOpen.fbDel = function() {
            this.fbStop();
            this._iStat = -1;
            _STNS.EFFECT.CEffOpen._aGlobal[this._iGid] = null;
            this._iGid = -1;
            return true;
        };
        CEffOpen.fbApply = function() {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
            if (!e) {
                return false;
            }
            try {
                e.parentNode.style.height = e.parentNode.scrollHeight + "px";
            } catch (ee) {}
            switch (this.sDirection) {
                case "Down":
                    e.parentNode.vAlign = "top";
                    this.iStartHeight = 0;
                    break;
                case "Up":
                    e.parentNode.vAlign = "bottom";
                    this.iStartHeight = 0;
                    break;
                case "Middle":
                    e.parentNode.vAlign = "middle";
                    this.iStartHeight = 0;
                    break;
                case "Left":
                    e.parentNode.Align = "left";
                    this.iStartHeight = 0;
                    break;
                case "Right":
                    e.parentNode.vAlign = "right";
                    this.iStartHeight = 0;
                    break;
                case "Center":
                    e.parentNode.vAlign = "center";
                    this.iStartHeight = 0;
                    break;
            }
            this.iStartWidth = e.scrollLeft;
            if (!_r.EFFECT.CEffOpen._aGlobal[this._iGid]) {
                _r.EFFECT.CEffOpen._aGlobal[this._iGid] = this;
            }
            this._iStat = 1;
            return true;
        };
        CEffOpen.fbPlay = function() {
            if (this._iStat != 1) {
                return false;
            }
            e = _STNS.fdmGetEleById(this.sDmId, this.dmWin);
            if (!e) {
                return false;
            }
            this.iStopHeight = e.parentNode.offsetHeight;
            e.style.height = this.iStartHeight + "px";
            this.iPerS = Math.ceil(Math.abs(this.iStopHeight - this.iStartHeight) / (this.iRate * this.iDuration));
            this.fbShow();
            this._iStat = 2;
            return true;
        };
        CEffOpen.fbStop = function() {
            if (this._iStat > 0) {
                clearTimeout(this._tTid);
                e = _STNS.fdmGetEleById(this.sDmId, this.dmWin);
                switch (this.sDirection) {
                    case "Left":
                        e.scrollLeft = this.iStopWidth;
                        break;
                    case "Right":
                        e.scrollLeft = this.iStopWidth;
                        break;
                    case "Up":
                    case "Middle":
                    case "Down":
                        e.style.height = this.iStopHeight + "px";
                        break;
                }
                this._iStat = 0;
            }
            return true;
        };
        CEffOpen.fbSetStyle = function(s) {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                var ss = _r.foCss2Style(s),
                    i;
                for (i in ss) {
                    try {
                        e.style[i] = ss[i];
                    } catch (ee) {}
                }
            }
            return true;
        };
        CEffOpen._aGlobal = [];
        CEffOpen.fbShow = function() {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
            switch (this.sDirection) {
                case "Up":
                case "Middle":
                case "Down":
                    this._iS = parseInt(e.style.height.replace("px", ""));
                    break;
            }
            switch (this.sDirection) {
                case "Up":
                case "Middle":
                case "Down":
                    this._iS += this.iPerS;
                    if (this._iS >= this.iStopHeight) {
                        this.fbStop();
                    } else {
                        e.style.height = this._iS + "px";
                        this._tTid = setTimeout("_STNS.EFFECT.CEffOpen._aGlobal[" + this._iGid + "].fbShow()", this.iDt);
                    }
                    break;
            }
        };
    }
}
if (typeof _STNS != "undefined" && _STNS.EFFECT && _STNS.bIsIE && !_STNS.EFFECT.CEffRandomIE) {
    with(_STNS.EFFECT) {
        _STNS.EFFECT.CEffRandomIE = _STNS.Class(_STNS.EFFECT.CEffect);
        CEffRandomIE.register("EFFECT/CEffect>CEffRandomIE");
        CEffRandomIE.construct = function(as) {
            this.sfName = "";
            if (!this.fvAnalyzeParams) {
                this._iStat = -2;
                return false;
            }
            this.fvAnalyzeParams();
            this.iDuration = this.aParams["Duration"] ? this.aParams["Duration"] : 1;
            this.iRate = this.aParams["Rate"] ? this.aParams["Rate"] : 30;
            this.sBak = "";
            this._iOid = 0;
            this._iStat = -1;
            this._iGid = -1;
            this.fls = new Array();
            with(this) {
                fls[0] = ".Blinds(Duration=" + this.iDuration + ")";
                fls[1] = ".Barn(orientation=vertical,Duration=" + this.iDuration + ")";
                fls[2] = ".Barn(orientation=horizontal,Duration=" + this.iDuration + ")";
                fls[3] = ".Barn(orientation=vertical,motion=in,Duration=" + this.iDuration + ")";
                fls[4] = ".Barn(orientation=horizontal motion=in,Duration=" + this.iDuration + ")";
                fls[5] = ".CheckerBoard(direction=left, squaresX=20, squaresY=20,Duration=" + this.iDuration + ")";
                fls[6] = ".CheckerBoard(direction=right, squaresX=20, squaresY=20,Duration=" + this.iDuration + ")";
                fls[7] = ".CheckerBoard(direction=up, squaresX=20, squaresY=20,Duration=" + this.iDuration + ")";
                fls[8] = ".CheckerBoard(direction=down, squaresX=20, squaresY=20,Duration=" + this.iDuration + ")";
                fls[9] = ".Inset(Duration=" + this.iDuration + ")";
                fls[10] = ".Iris(IrisStyle=cross,Duration=" + this.iDuration + ")";
                fls[11] = ".Iris(IrisStyle=SQUARE,Duration=" + this.iDuration + ")";
                fls[12] = ".Iris(sProperties,Duration=" + this.iDuration + ")";
                fls[13] = ".Iris(IrisStyle=PLUS,Duration=" + this.iDuration + ")";
                fls[14] = ".Iris(IrisStyle=STAR";
                fls[15] = ".Iris(IrisStyle=DIAMOND,Duration=" + this.iDuration + ")";
                fls[16] = ".Iris(IrisStyle=circle,Duration=" + this.iDuration + ")";
                fls[17] = ".Pixelate(Duration=" + this.iDuration + ")";
                fls[18] = ".RandomBars(Duration=" + this.iDuration + ")";
                fls[19] = ".RandomDissolve(Duration=" + this.iDuration + ")";
                fls[20] = ".RadialWipe(wipeStyle=clock,Duration=" + this.iDuration + ")";
                fls[21] = ".RadialWipe(wipeStyle=radial,Duration=" + this.iDuration + ")";
                fls[22] = ".RadialWipe(wipeStyle=wedge,Duration=" + this.iDuration + ")";
                fls[23] = ".RadialWipe(wipeStyle=wedge,Duration=" + this.iDuration + ")";
                fls[24] = ".Slide(bands=5,slideStyle='push',Duration=" + this.iDuration + ")";
                fls[25] = ".Slide(bands=10,SlideStyle=swap,Duration=" + this.iDuration + ")";
                fls[26] = ".Slide(bands=10,SlideStyle=hide,Duration=" + this.iDuration + ")";
                fls[27] = ".Spiral(SProperties,Duration=" + this.iDuration + ")";
                fls[28] = ".Strips(motion=rightdown,Duration=" + this.iDuration + ")";
                fls[29] = ".Strips(motion=leftdown,Duration=" + this.iDuration + ")";
                fls[30] = ".Strips(motion=rightup,Duration=" + this.iDuration + ")";
                fls[31] = ".Strips(motion=leftup,Duration=" + this.iDuration + ")";
                fls[32] = ".Stretch(StretchStyle=SPIN,Duration=" + this.iDuration + ")";
                fls[33] = ".Stretch(stretchstyle='push',Duration=" + this.iDuration + ")";
                fls[34] = ".Wheel(spokes=8,Duration=" + this.iDuration + ")";
                fls[35] = ".Wipe(GradientSize=.50, wipeStyle=0, motion='forward',Duration=" + this.iDuration + ")";
                fls[36] = ".Wipe(GradientSize=.50, wipeStyle=1, motion='forward',Duration=" + this.iDuration + ")";
                fls[37] = ".Wipe(GradientSize=.50, wipeStyle=0, motion='reverse',Duration=" + this.iDuration + ")";
                fls[38] = ".Wipe(GradientSize=.50, wipeStyle=1, motion='reverse',Duration=" + this.iDuration + ")";
                fls[39] = ".Zigzag(Duration=" + this.iDuration + ")";
            }
            with(_STNS.EFFECT.CEffRandomIE) {
                this.fiGetStat = fiGetStat;
                this.fbSet = fbSet;
                this.fbDel = fbDel;
                this.fbApply = fbApply;
                this.fbPlay = fbPlay;
                this.fbStop = fbStop;
                this.fbSetStyle = fbSetStyle;
            }
        };
        CEffRandomIE._aGlobal = [];
        CEffRandomIE.fiGetStat = function() {
            var _r = _STNS,
                e;
            if (this._iStat == -1) {
                return -1;
            }
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                return e.status;
            } else {
                return this._iStat;
            }
        };
        CEffRandomIE.fbSet = function() {
            if (this._iStat == -2) {
                return false;
            }
            var _r = _STNS,
                e, s, fs = [],
                i = 0,
                bak, n;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                s = this.sfName = "revealTrans(Transition=23,Duration=" + this.iDuration + ",)";
                bak = e.style.filter;
                if (bak) {
                    var re = /[\w:\.]+\([^;\)]+\)/g;
                    fs = bak.match(re);
                }
                if (this._iGid == -1) {
                    n = _r.EFFECT.CEffRandomIE._aGlobal.length;
                    _r.EFFECT.CEffRandomIE._aGlobal.push(this);
                    this._iGid = n;
                }
                if (!fs) {
                    fs = [];
                }
                for (i = 0; i < fs.length; i++) {
                    if (fs[i] == this.sfName) {
                        this._iOid = i;
                        return true;
                    }
                }
                this._iOid = i;
                e.style.filter = (bak ? bak + " " : "") + s;
            }
            this.iStat = 0;
            return true;
        };
        CEffRandomIE.fbDel = function() {
            var _r = _STNS,
                e, s, fs = [],
                bak, i, f = 1,
                t;
            this.fbStop();
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                t = _STNS.EFFECT.CEffRandomIE._aGlobal;
                t[this._iGid] = null;
                for (i = 0; i < t.length; i++) {
                    if (t[i] && t[i].sDmId == this.sDmId && t[i].dmWin == this.dmWin && t[i]._iOid == this._iOid) {
                        f = 0;
                    }
                }
                if (!f) {
                    return true;
                }
                bak = e.style.filter;
                if (bak) {
                    var re = /[\w:\.]+\([^;\)]+\)/g;
                    fs = bak.match(re);
                }
                if (!fs) {
                    fs = [];
                }
                for (i = 0; i < fs.length; i++) {
                    if (fs[i] == this.sfName) {
                        fs[i] = "";
                    }
                }
                e.style.filter = fs.length ? fs.join(" ") : "";
                for (i = 0; i < t.length; i++) {
                    if (t[i] && t[i].sDmId == this.sDmId && t[i].dmWin == this.dmWin && t[i]._iOid > this._iOid) {
                        t[i]._iOid--;
                    }
                }
            }
            this._iStat = -1;
            return true;
        };
        CEffRandomIE.fbApply = function() {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                var s;
                if (_STNS.oNav.version > 5.5) {
                    s = "progid:DXImageTransform.Microsoft" + this.fls[parseInt(Math.random() * 40)];
                } else {
                    s = "revealTrans(Transition=23,Duration=" + this.iDuration + ")";
                }
                e.style.filter = e.style.filter.replace(this.sfName, s);
                this.sfName = s;
                e.filters[this._iOid].apply();
            }
            this._iStat = 1;
            return true;
        };
        CEffRandomIE.fbPlay = function() {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                e.filters[this._iOid].play();
            }
            this._iStat = 2;
            return true;
        };
        CEffRandomIE.fbStop = function() {
            var _r = _STNS,
                e;
            if (this.iStat > -1) {
                if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                    if (e.filters[this._iOid].status) {
                        e.filters[this._iOid].stop();
                    }
                }
                this._iStat = 0;
            }
            return true;
        };
        CEffRandomIE.fbSetStyle = function(s) {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                var ss = _r.foCss2Style(s),
                    i;
                for (i in ss) {
                    try {
                        e.style[i] = ss[i];
                    } catch (e) {}
                }
            }
            return true;
        };
    }
}
if (typeof _STNS != "undefined" && _STNS.EFFECT && !_STNS.EFFECT.CEffRect) {
    with(_STNS.EFFECT) {
        _STNS.EFFECT.CEffRect = _STNS.Class(_STNS.EFFECT.CEffect);
        CEffRect.register("EFFECT/CEffect>CEffRect");
        CEffRect.construct = function(as) {
            this._tTid = 0;
            this._bShow = 0;
            this._iFms = 12;
            this._iDt = 50;
            this._iDx = 0;
            this._iDy = 0;
            this._iDsx = 0;
            this._iDsy = 0;
            this._iX = 0;
            this._iY = 0;
            this._iSX = -1;
            this._iSY = -1;
            this._iGid = -1;
            this._iCurWid = 0;
            this._iCurHei = 0;
            this.iDur = as[3];
            this._sBdStyle = "solid";
            this._iBdWid = 1;
            this._sBdClr = "#999999";
            with(_STNS.EFFECT.CEffRect) {
                this.fbSet = fbSet;
                this.fbDel = fbDel;
                this.fbApply = fbApply;
                this.fbPlay = fbPlay;
                this.fbStop = fbStop;
                this.fbSetStyle = fbSetStyle;
                this.fbShow = fbShow;
                this.fbHide = fbHide;
            }
            if (as[4]) {
                this.fbSetStyle(as[4]);
            }
        };
        CEffRect.fbSet = function() {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin),
                n;
            if (!e) {
                return false;
            }
            if (this._iGid == -1) {
                n = _r.EFFECT.CEffRect._aGlobal.length;
                _r.EFFECT.CEffRect._aGlobal.push(this);
                this._iGid = n;
            }
            s = "<div style=" + "'position:absolute;left:0px;top:0px;z-index:1000;font-size:1pt;line-height:1pt;display:none;background:transparent;'" + " id='stEffR_" + this._iGid + "'>" + "</div>";
            _STNS.fbInsHTML(this.dmWin.document.body, "afterBegin", s);
            this._iStat = 0;
            return true;
        };
        CEffRect.fbDel = function() {
            this.fbStop();
            this._iStat = -1;
            _STNS.EFFECT.CEffRect._aGlobal[this._iGid] = null;
            return true;
        };
        CEffRect.fbApply = function() {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
            if (!e) {
                return false;
            }
            this._iCurWid = _r.fiGetEleWid(e);
            this._iCurHei = _r.fiGetEleHei(e);
            this._iDt = Math.floor(this.iDur / this._iFms);
            this._iDx = Math.round(this._iCurWid / this._iFms);
            this._iDy = Math.round(this._iCurHei / this._iFms);
            e = _r.fdmGetEleById("stEffR_" + this._iGid, this.dmWin);
            e.style.borderStyle = this._sBdStyle;
            e.style.borderWidth = this._iBdWid + "px";
            e.style.borderColor = this._sBdClr;
            if (!_r.EFFECT.CEffRect._aGlobal[this._iGid]) {
                _r.EFFECT.CEffRect._aGlobal[this._iGid] = this;
            }
            this._iStat = 1;
            return true;
        };
        CEffRect.fbPlay = function() {
            if (this._iStat != 1) {
                return false;
            }
            if (this._bShow) {
                this.fbShow();
            } else {
                this.fbHide();
            }
            this._iStat = 2;
            return true;
        };
        CEffRect.fbStop = function() {
            if (this._iStat > 0) {
                clearTimeout(this._tTid);
                var e = _STNS.fdmGetEleById("stEffR_" + this._iGid, this.dmWin);
                e.style.display = "none";
                e = _STNS.fdmGetEleById(this.sDmId, this.dmWin);
                e.style.left = this._iX + "px";
                e.style.top = this._iY + "px";
                if (this._bShow) {
                    e.style.visibility = "visible";
                } else {
                    e.style.visibility = "hidden";
                }
                this._iStat = 0;
            }
            return true;
        };
        CEffRect.fbSetStyle = function(s) {
            var _r = _STNS,
                ss;
            ss = _r.foCss2Style(s);
            if (ss["visibility"] == "hidden") {
                this._bShow = 0;
            } else {
                if (ss["visibility"] == "visible") {
                    this._bShow = 1;
                }
            }
            if (ss["left"]) {
                this._iX = parseInt(ss["left"]);
            }
            if (ss["top"]) {
                this._iY = parseInt(ss["top"]);
            }
            if (ss["borderStyle"]) {
                this._sBdStyle = ss["borderStyle"];
            }
            if (ss["borderWidth"]) {
                this._iBdWid = parseInt(ss["borderWidth"]);
            }
            if (ss["borderColor"]) {
                this._sBdClr = ss["borderColor"];
            }
            if (ss["_stStartX"]) {
                this._iSX = parseInt(ss["_stStartX"]);
            } else {
                this._iSX = this._iX + this._iCurWid / 2;
            }
            if (ss["_stStartY"]) {
                this._iSY = parseInt(ss["_stStartY"]);
            } else {
                this._iSY = this._iY + this._iCurHei / 2;
            }
            this._iDsx = Math.floor((this._iSX - this._iX) / this._iFms);
            this._iDsy = Math.floor((this._iSY - this._iY) / this._iFms);
        };
        CEffRect._aGlobal = [];
        CEffRect.fbShow = function(t) {
            var _r = _STNS,
                e = _r.fdmGetEleById("stEffR_" + this._iGid, this.dmWin);
            if (!t) {
                t = 0;
            }
            if (t >= this._iFms) {
                e.style.display = "none";
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
                e.style.left = this._iX + "px";
                e.style.top = this._iY + "px";
                e.style.visibility = "visible";
                this._iStat = 0;
                return true;
            } else {
                e.style.width = t * this._iDx + "px";
                e.style.height = t * this._iDy + "px";
                e.style.left = this._iSX - t * this._iDsx + "px";
                e.style.top = this._iSY - t * this._iDsy + "px";
                this._tTid = setTimeout("_STNS.EFFECT.CEffRect._aGlobal[" + this._iGid + "].fbShow(" + (++t) + ")", this._iDt);
            }
            e.style.display = "block";
        };
        CEffRect.fbHide = function(t) {
            var _r = _STNS,
                e = _r.fdmGetEleById("stEffR_" + this._iGid, this.dmWin);
            if (!t) {
                _r.fdmGetEleById(this.sDmId, this.dmWin).style.visibility = "hidden";
                t = 0;
            }
            if (t >= this._iFms) {
                e.style.display = "none";
                this._iStat = 0;
                return true;
            } else {
                e.style.width = Math.max(1, this._iCurWid - t * this._iDx) + "px";
                e.style.height = Math.max(1, this._iCurHei - t * this._iDy) + "px";
                e.style.left = this._iX + t * this._iDsx + "px";
                e.style.top = this._iY + t * this._iDsy + "px";
                this._tTid = setTimeout("_STNS.EFFECT.CEffRect._aGlobal[" + this._iGid + "].fbHide(" + (++t) + ")", this._iDt);
            }
            e.style.display = "block";
        };
    }
}
if (typeof _STNS != "undefined" && _STNS.EFFECT && !_STNS.EFFECT.CEffScroll) {
    with(_STNS.EFFECT) {
        _STNS.EFFECT.CEffScroll = _STNS.Class(_STNS.EFFECT.CEffect);
        CEffScroll.register("EFFECT/CEffect>CEffScroll");
        CEffScroll.construct = function(as) {
            this._tTid = 0;
            this._iGid = -1;
            this._iStat = -1;
            if (!this.fvAnalyzeParams) {
                this._iStat = -2;
                return false;
            }
            this.fvAnalyzeParams();
            this.iDuration = this.aParams["Duration"] ? this.aParams["Duration"] : 1;
            this.iRate = this.aParams["Rate"] ? this.aParams["Rate"] : 24;
            this.iDt = Math.floor(1000 / this.iRate);
            this.iPerSP = 5;
            this.iStartTop = -1;
            this.iStopTop = -1;
            this.iStartLeft = -1;
            this.iStopLeft = -1;
            this._iSP = -1;
            this.sDirection = "";
            this._timer = 0;
            with(_STNS.EFFECT.CEffScroll) {
                this.fbSet = fbSet;
                this.fbDel = fbDel;
                this.fbApply = fbApply;
                this.fbPlay = fbPlay;
                this.fbStop = fbStop;
                this.fbSetStyle = fbSetStyle;
                this.fbShow = fbShow;
                this.fvSetParams = fvSetParams;
            }
        };
        CEffScroll.fvSetParams = function(tp, stp) {
            if (tp == "H") {
                this.iStopTop = -1;
                this.iStopLeft = stp;
            } else {
                this.iStopLeft = -1;
                this.iStopTop = stp;
            }
        };
        CEffScroll.fbSet = function() {
            if (this._iStat == -2) {
                return false;
            }
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin),
                n;
            if (!e) {
                return false;
            }
            if (this._iGid == -1) {
                n = _r.EFFECT.CEffScroll._aGlobal.length;
                _r.EFFECT.CEffScroll._aGlobal.push(this);
                this._iGid = n;
            }
            this._iStat = 0;
            return true;
        };
        CEffScroll.fbDel = function() {
            this.fbStop();
            this._iStat = -1;
            _STNS.EFFECT.CEffScroll._aGlobal[this._iGid] = null;
            this._iGid = -1;
            return true;
        };
        CEffScroll.fbApply = function() {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
            if (!e) {
                return false;
            }
            this.iStartTop = e.scrollTop;
            this.iStartLeft = e.scrollLeft;
            if (!_r.EFFECT.CEffScroll._aGlobal[this._iGid]) {
                _r.EFFECT.CEffScroll._aGlobal[this._iGid] = this;
            }
            this._iStat = 1;
            return true;
        };
        CEffScroll.fbPlay = function() {
            if (this._iStat != 1) {
                return false;
            }
            var e = _STNS.fdmGetEleById(this.sDmId, this.dmWin);
            if (!e) {
                return false;
            }
            if (this.iStopTop == -1) {
                this.iStopTop = e.scrollTop;
            }
            if (this.iStopLeft == -1) {
                this.iStopLeft = e.scrollLeft;
            }
            e.scrollTop = this.iStartTop;
            e.scrollLeft = this.iStartLeft;
            if (this.iStopTop != -1 && this.iStartTop > this.iStopTop) {
                this.sDirection = "Down";
                this.iPerSP = Math.ceil(Math.abs(this.iStopTop - this.iStartTop) / (this.iRate * this.iDuration));
            } else {
                if (this.iStopTop != -1 && this.iStartTop < this.iStopTop) {
                    this.sDirection = "Up";
                    this.iPerSP = Math.ceil(Math.abs(this.iStopTop - this.iStartTop) / (this.iRate * this.iDuration));
                }
            }
            if (this.iStopLeft != -1 && this.iStartLeft > this.iStopLeft) {
                this.sDirection = "Right";
                this.iPerSP = Math.ceil(Math.abs(this.iStopLeft - this.iStartLeft) / (this.iRate * this.iDuration));
            } else {
                if (this.iStopLeft != -1 && this.iStartLeft < this.iStopLeft) {
                    this.sDirection = "Left";
                    this.iPerSP = Math.ceil(Math.abs(this.iStopLeft - this.iStartLeft) / (this.iRate * this.iDuration));
                }
            }
            if (this.sDirection == "") {
                this.sDirection = "Left";
            }
            this._iStat = 2;
            try {
                _GreyJS.DEBUG.write("effect run at " + this._timer);
            } catch (e) {}
            this.fbShow();
            return true;
        };
        CEffScroll.fbStop = function() {
            if (this._iStat > 0) {
                clearTimeout(this._tTid);
                var e = _STNS.fdmGetEleById(this.sDmId, this.dmWin);
                switch (this.sDirection) {
                    case "Left":
                        e.scrollLeft = this.iStopLeft;
                        break;
                    case "Right":
                        e.scrollLeft = this.iStopLeft;
                        break;
                    case "Up":
                        e.scrollTop = this.iStopTop;
                        break;
                    case "Down":
                        e.scrollTop = this.iStopTop;
                        break;
                }
                this._iStat = 0;
                try {
                    this.fvFinishEffect();
                } catch (te) {}
            }
            return true;
        };
        CEffScroll.fbSetStyle = function(s) {
            var _r = _STNS,
                e;
            if (e = _r.fdmGetEleById(this.sDmId, this.dmWin)) {
                var ss = _r.foCss2Style(s),
                    i;
                for (i in ss) {
                    try {
                        e.style[i] = ss[i];
                    } catch (te) {}
                }
            }
            return true;
        };
        CEffScroll._aGlobal = [];
        CEffScroll.fbShow = function() {
            var _r = _STNS,
                e = _r.fdmGetEleById(this.sDmId, this.dmWin);
            switch (this.sDirection) {
                case "Left":
                    this._iSP = e.scrollLeft;
                    break;
                case "Right":
                    this._iSP = e.scrollLeft;
                    break;
                case "Up":
                    this._iSP = e.scrollTop;
                    break;
                case "Down":
                    this._iSP = e.scrollTop;
                    break;
            }
            if (typeof this._iSP != "number") {
                this._iSP = this.iStartSP;
            }
            switch (this.sDirection) {
                case "Left":
                    this._iSP += this.iPerSP;
                    if (this._iSP >= this.iStopLeft) {
                        this.fbStop();
                    } else {
                        e.scrollLeft = this._iSP;
                        this._tTid = setTimeout("_STNS.EFFECT.CEffScroll._aGlobal[" + this._iGid + "].fbShow()", this.iDt);
                    }
                    break;
                case "Right":
                    this._iSP -= this.iPerSP;
                    if (this._iSP <= this.iStopLeft) {
                        this.fbStop();
                    } else {
                        e.scrollLeft = this._iSP;
                        this._tTid = setTimeout("_STNS.EFFECT.CEffScroll._aGlobal[" + this._iGid + "].fbShow()", this.iDt);
                    }
                    break;
                case "Up":
                    this._iSP += this.iPerSP;
                    if (this._iSP >= this.iStopTop) {
                        this.fbStop();
                    } else {
                        e.scrollTop = this._iSP;
                        this._tTid = setTimeout("_STNS.EFFECT.CEffScroll._aGlobal[" + this._iGid + "].fbShow()", this.iDt);
                    }
                    break;
                case "Down":
                    this._iSP -= this.iPerSP;
                    if (this._iSP <= this.iStopTop) {
                        this.fbStop();
                    } else {
                        e.scrollTop = this._iSP;
                        this._tTid = setTimeout("_STNS.EFFECT.CEffScroll._aGlobal[" + this._iGid + "].fbShow()", this.iDt);
                    }
                    break;
            }
        };
    }
}