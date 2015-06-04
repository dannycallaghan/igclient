(function () {

    angular
        .module('angular-jws', []);

    angular
        .module('angular-jws')
        .factory('KJUR', KJUR);


    function KJUR (rsaService) {

        var jsonParse = function () {
            function r (n, t, r) {
                return t ? i[t] : String.fromCharCode(parseInt(r, 16))
            }

            var n = new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))', "g"), t = new RegExp("\\\\(?:([^u])|u(.{4}))", "g"), i = {
                '"': '"',
                "/": "/",
                "\\": "\\",
                b: "\b",
                f: "\f",
                n: "\n",
                r: "\r",
                t: "\t"
            }, u = new String(""), f = "\\", o = {"{": Object, "[": Array}, e = Object.hasOwnProperty;
            return function (i, o) {
                var y = i.match(n), a, l = y[0], p = !1, h, c, v, b, s, w;
                for ("{" === l ? a = {} : "[" === l ? a = [] : (a = [], p = !0), c = [a], v = 1 - p, b = y.length; v < b; ++v) {
                    l = y[v];
                    switch (l.charCodeAt(0)) {
                        default:
                            s = c[0];
                            s[h || s.length] = +l;
                            h = void 0;
                            break;
                        case 34:
                            if (l = l.substring(1, l.length - 1), l.indexOf(f) !== -1 && (l = l.replace(t, r)), s = c[0], !h)if (s instanceof Array)h = s.length; else {
                                h = l || u;
                                break
                            }
                            s[h] = l;
                            h = void 0;
                            break;
                        case 91:
                            s = c[0];
                            c.unshift(s[h || s.length] = []);
                            h = void 0;
                            break;
                        case 93:
                            c.shift();
                            break;
                        case 102:
                            s = c[0];
                            s[h || s.length] = !1;
                            h = void 0;
                            break;
                        case 110:
                            s = c[0];
                            s[h || s.length] = null;
                            h = void 0;
                            break;
                        case 116:
                            s = c[0];
                            s[h || s.length] = !0;
                            h = void 0;
                            break;
                        case 123:
                            s = c[0];
                            c.unshift(s[h || s.length] = {});
                            h = void 0;
                            break;
                        case 125:
                            c.shift()
                    }
                }
                if (p) {
                    if (c.length !== 1)throw new Error;
                    a = a[0]
                } else if (c.length)throw new Error;
                return o && (w = function (n, t) {
                    var i = n[t], r, u, f, s;
                    if (i && typeof i == "object") {
                        r = null;
                        for (u in i)e.call(i, u) && i !== n && (f = w(i, u), f !== void 0 ? i[u] = f : (r || (r = []), r.push(u)));
                        if (r)for (s = r.length; --s >= 0;)delete i[r[s]]
                    }
                    return o.call(n, t, i)
                }, a = w({"": a}, "")), a
            }
        }();

        ///#source 1 1 jws-3.0.min.js
        typeof KJUR != "undefined" && KJUR || (KJUR = {});
        typeof KJUR.jws != "undefined" && KJUR.jws || (KJUR.jws = {});
        KJUR.jws.JWS = function () {
            function n (n, t) {
                return rsaService.utf8tob64u(n) + "." + rsaService.utf8tob64u(t)
            }

            function t (n) {
                var t = n.alg, i = "";
                if (t != "RS256" && t != "RS512" && t != "PS256" && t != "PS512")throw"JWS signature algorithm not supported: " + t;
                return t.substr(2) == "256" && (i = "sha256"), t.substr(2) == "512" && (i = "sha512"), i
            }

            function i (n) {
                return t(jsonParse(n))
            }

            function r (n, t, r, u, f, e) {
                var o = new rsaService.RSAKey, s, h;
                return o.setPrivate(u, f, e), s = i(n), h = o.signString(r, s), h
            }

            function u (n, r, u, f, e) {
                var o = null, s;
                return o = typeof e == "undefined" ? i(n) : t(e), s = e.alg.substr(0, 2) == "PS", f.hashAndSign ? rsaService.b64tob64u(f.hashAndSign(o, u, "binary", "base64", s)) : s ? rsaService.hextob64u(f.signStringPSS(u, o)) : rsaService.hextob64u(f.signString(u, o))
            }

            function f (n, t, r, u) {
                var f = new rsaService.RSAKey, e, o;
                return f.readPrivateKeyFromPEMString(u), e = i(n), o = f.signString(r, e), o
            }

            this.parseJWS = function (n, t) {
                var f, o, i, s;
                if (this.parsedJWS === undefined || !t && this.parsedJWS.sigvalH === undefined) {
                    if (n.match(/^([^.]+)\.([^.]+)\.([^.]+)$/) == null)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";
                    var r = RegExp.$1, u = RegExp.$2, e = RegExp.$3, h = r + "." + u;
                    if (this.parsedJWS = {}, this.parsedJWS.headB64U = r, this.parsedJWS.payloadB64U = u, this.parsedJWS.sigvalB64U = e, this.parsedJWS.si = h, t || (f = rsaService.b64utohex(e), o = rsaService.parseBigInt(f, 16), this.parsedJWS.sigvalH = f, this.parsedJWS.sigvalBI = o), i = rsaService.b64utoutf8(r), s = rsaService.b64utoutf8(u), this.parsedJWS.headS = i, this.parsedJWS.payloadS = s, !KJUR.jws.JWS.isSafeJSONString(i, this.parsedJWS, "headP"))throw"malformed JSON string for JWS Head: " + i;
                }
            };
            this.verifyJWSByNE = function (n, t, i) {
                return this.parseJWS(n), rsaService._rsasign_verifySignatureWithArgs(this.parsedJWS.si, this.parsedJWS.sigvalBI, t, i)
            };
            this.verifyJWSByKey = function (n, i) {
                this.parseJWS(n);
                var r = t(this.parsedJWS.headP), u = this.parsedJWS.headP.alg.substr(0, 2) == "PS";
                return i.hashAndVerify ? i.hashAndVerify(r, new Buffer(this.parsedJWS.si, "utf8").toString("base64"), rsaService.b64utob64(this.parsedJWS.sigvalB64U), "base64", u) : u ? i.verifyStringPSS(this.parsedJWS.si, this.parsedJWS.sigvalH, r) : i.verifyString(this.parsedJWS.si, this.parsedJWS.sigvalH)
            };
            this.verifyJWSByPemX509Cert = function (n, t) {
                this.parseJWS(n);
                var i = new rsaService.X509;
                return i.readCertPEM(t), i.subjectPublicKeyRSA.verifyString(this.parsedJWS.si, this.parsedJWS.sigvalH)
            };
            this.generateJWSByNED = function (t, i, u, f, e) {
                if (!KJUR.jws.JWS.isSafeJSONString(t))throw"JWS Head is not safe JSON string: " + t;
                var o = n(t, i), h = r(t, i, o, u, f, e), s = rsaService.hextob64u(h);
                return this.parsedJWS = {}, this.parsedJWS.headB64U = o.split(".")[0], this.parsedJWS.payloadB64U = o.split(".")[1], this.parsedJWS.sigvalB64U = s, o + "." + s
            };
            this.generateJWSByKey = function (t, i, r) {
                var o = {}, f, e;
                if (!KJUR.jws.JWS.isSafeJSONString(t, o, "headP"))throw"JWS Head is not safe JSON string: " + t;
                return f = n(t, i), e = u(t, i, f, r, o.headP), this.parsedJWS = {}, this.parsedJWS.headB64U = f.split(".")[0], this.parsedJWS.payloadB64U = f.split(".")[1], this.parsedJWS.sigvalB64U = e, f + "." + e
            };
            this.generateJWSByP1PrvKey = function (t, i, r) {
                if (!KJUR.jws.JWS.isSafeJSONString(t))throw"JWS Head is not safe JSON string: " + t;
                var u = n(t, i), o = f(t, i, u, r), e = rsaService.hextob64u(o);
                return this.parsedJWS = {}, this.parsedJWS.headB64U = u.split(".")[0], this.parsedJWS.payloadB64U = u.split(".")[1], this.parsedJWS.sigvalB64U = e, u + "." + e
            }
        };
        KJUR.jws.JWS.sign = function (n, t, i, r, u) {
            var s = KJUR.jws.JWS, o, f, l, e, a;
            if (!s.isSafeJSONString(t))throw"JWS Head is not safe JSON string: " + sHead;
            if (o = s.readSafeJSONString(t), (n == "" || n == null) && o.alg !== undefined && (n = o.alg), n != "" && n != null && o.alg === undefined && (o.alg = n, t = JSON.stringify(o)), f = null, s.jwsalg2sigalg[n] === undefined)throw"unsupported alg name: " + n; else f = s.jwsalg2sigalg[n];
            var v = rsaService.utf8tob64u(t), y = rsaService.utf8tob64u(i), h = v + "." + y, c = "";
            if (f.substr(0, 4) == "Hmac") {
                if (r === undefined)throw"hexadecimal key shall be specified for HMAC";
                l = new KJUR.crypto.Mac({alg: f, pass: rsaService.hextorstr(r)});
                l.updateString(h);
                c = l.doFinal()
            } else f.indexOf("withECDSA") != -1 ? (e = new KJUR.crypto.Signature({alg: f}), e.init(r, u), e.updateString(h), hASN1Sig = e.sign(), c = KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig)) : f != "none" && (e = new KJUR.crypto.Signature({alg: f}), e.init(r, u), e.updateString(h), c = e.sign());
            return a = rsaService.hextob64u(c), h + "." + a
        };
        KJUR.jws.JWS.verify = function (n, t) {
            var f = KJUR.jws.JWS, u = n.split("."), a = u[0], v = u[1], e = a + "." + v, o = rsaService.b64utohex(u[2]), s = f.readSafeJSONString(rsaService.b64utoutf8(u[0])), h = null, i, c, l, r;
            if (s.alg === undefined)throw"algorithm not specified in header"; else h = s.alg;
            if (i = null, f.jwsalg2sigalg[s.alg] === undefined)throw"unsupported alg name: " + h; else i = f.jwsalg2sigalg[h];
            if (i == "none")return !0;
            if (i.substr(0, 4) == "Hmac") {
                if (t === undefined)throw"hexadecimal key shall be specified for HMAC";
                return c = new KJUR.crypto.Mac({
                    alg: i,
                    pass: rsaService.hextorstr(t)
                }), c.updateString(e), hSig2 = c.doFinal(), o == hSig2
            }
            if (i.indexOf("withECDSA") != -1) {
                l = null;
                try {
                    l = KJUR.crypto.ECDSA.concatSigToASN1Sig(o)
                } catch (y) {
                    return !1
                }
                return r = new KJUR.crypto.Signature({alg: i}), r.init(t), r.updateString(e), r.verify(l)
            }
            return r = new KJUR.crypto.Signature({alg: i}), r.init(t), r.updateString(e), r.verify(o)
        };
        KJUR.jws.JWS.jwsalg2sigalg = {
            HS256: "HmacSHA256",
            HS512: "HmacSHA512",
            RS256: "SHA256withRSA",
            RS384: "SHA384withRSA",
            RS512: "SHA512withRSA",
            ES256: "SHA256withECDSA",
            ES384: "SHA384withECDSA",
            PS256: "SHA256withRSAandMGF1",
            PS384: "SHA384withRSAandMGF1",
            PS512: "SHA512withRSAandMGF1",
            none: "none"
        };
        KJUR.jws.JWS.isSafeJSONString = function (n, t, i) {
            var r = null;
            console.log('n', n);
            try {
                return (r = jsonParse(n), typeof r != "object") ? 0 : r.constructor === Array ? 0 : (t && (t[i] = r), 1)
            } catch (u) {
                return 0
            }
        };
        KJUR.jws.JWS.readSafeJSONString = function (n) {
            var t = null;
            console.log('n', n);
            try {
                return (t = jsonParse(n), typeof t != "object") ? null : t.constructor === Array ? null : t
            } catch (i) {
                return null
            }
        };
        KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function (n) {
            if (n.match(/^[^.]+\.[^.]+\.([^.]+)$/) == null)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";
            return RegExp.$1
        };
        KJUR.jws.IntDate = function () {
        };
        KJUR.jws.IntDate.get = function (n) {
            if (n == "now")return KJUR.jws.IntDate.getNow();
            if (n == "now + 1hour")return KJUR.jws.IntDate.getNow() + 3600;
            if (n == "now + 1day")return KJUR.jws.IntDate.getNow() + 86400;
            if (n == "now + 1month")return KJUR.jws.IntDate.getNow() + 2592e3;
            if (n == "now + 1year")return KJUR.jws.IntDate.getNow() + 31536e3;
            if (n.match(/Z$/))return KJUR.jws.IntDate.getZulu(n);
            if (n.match(/^[0-9]+$/))return parseInt(n);
            throw"unsupported format: " + n;
        };
        KJUR.jws.IntDate.getZulu = function (n) {
            if (a = n.match(/(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)Z/)) {
                var t = parseInt(RegExp.$1), i = parseInt(RegExp.$2) - 1, r = parseInt(RegExp.$3), u = parseInt(RegExp.$4), f = parseInt(RegExp.$5), e = parseInt(RegExp.$6), o = new Date(Date.UTC(t, i, r, u, f, e));
                return ~~(o / 1e3)
            }
            throw"unsupported format: " + n;
        };
        KJUR.jws.IntDate.getNow = function () {
            return ~~(new Date / 1e3)
        };
        KJUR.jws.IntDate.intDate2UTCString = function (n) {
            var t = new Date(n * 1e3);
            return t.toUTCString()
        };
        KJUR.jws.IntDate.intDate2Zulu = function (n) {
            var t = new Date(n * 1e3), i = ("0000" + t.getUTCFullYear()).slice(-4), r = ("00" + (t.getUTCMonth() + 1)).slice(-2), u = ("00" + t.getUTCDate()).slice(-2), f = ("00" + t.getUTCHours()).slice(-2), e = ("00" + t.getUTCMinutes()).slice(-2), o = ("00" + t.getUTCSeconds()).slice(-2);
            return i + r + u + f + e + o + "Z"
        };

        return KJUR;

    }



})();