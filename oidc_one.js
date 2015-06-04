///#source 1 1 iife-start.js
(function () {

    angular
        .module('OidcLib', ['angular-rsa', 'angular-CryptoJS', 'angular-jws']);

    angular
        .module('OidcLib')
        .factory('OidcService', OidcService);

    function OidcService (rsaService, KJUR) {

        // globals
        var _promiseFactory;
        var _httpRequest;


        ///#source 1 1 es6-promise-2.0.0.min.js
        (function () {
            "use strict";
            function ht (n) {
                return typeof n == "function" || typeof n == "object" && n !== null
            }

            function a (n) {
                return typeof n == "function"
            }

            function ct (n) {
                return typeof n == "object" && n !== null
            }

            function tt () {
            }

            function vt () {
                return function () {
                    process.nextTick(v)
                }
            }

            function yt () {
                var n = 0, i = new rt(v), t = document.createTextNode("");
                return i.observe(t, {characterData: !0}), function () {
                    t.data = n = ++n % 2
                }
            }

            function pt () {
                var n = new MessageChannel;
                return n.port1.onmessage = v, function () {
                    n.port2.postMessage(0)
                }
            }

            function wt () {
                return function () {
                    setTimeout(v, 1)
                }
            }

            function v () {
                for (var t, i, n = 0; n < s; n += 2)t = f[n], i = f[n + 1], t(i), f[n] = undefined, f[n + 1] = undefined;
                s = 0
            }

            function h () {
            }

            function bt () {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function kt () {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function dt (n) {
                try {
                    return n.then
                } catch (t) {
                    return y.error = t, y
                }
            }

            function gt (n, t, i, r) {
                try {
                    n.call(t, i, r)
                } catch (u) {
                    return u
                }
            }

            function ni (i, r, u) {
                l(function (i) {
                    var f = !1, e = gt(u, r, function (n) {
                        f || (f = !0, r !== n ? c(i, n) : t(i, n))
                    }, function (t) {
                        f || (f = !0, n(i, t))
                    }, "Settle: " + (i._label || " unknown promise"));
                    !f && e && (f = !0, n(i, e))
                }, i)
            }

            function ti (i, u) {
                u._state === r ? t(i, u._result) : i._state === o ? n(i, u._result) : p(u, undefined, function (n) {
                    c(i, n)
                }, function (t) {
                    n(i, t)
                })
            }

            function ii (i, r) {
                if (r.constructor === i.constructor)ti(i, r); else {
                    var u = dt(r);
                    u === y ? n(i, y.error) : u === undefined ? t(i, r) : a(u) ? ni(i, r, u) : t(i, r)
                }
            }

            function c (i, r) {
                i === r ? n(i, bt()) : ht(r) ? ii(i, r) : t(i, r)
            }

            function ri (n) {
                n._onerror && n._onerror(n._result);
                d(n)
            }

            function t (n, t) {
                n._state === e && (n._result = t, n._state = r, n._subscribers.length === 0 || l(d, n))
            }

            function n (n, t) {
                n._state === e && (n._state = o, n._result = t, l(ri, n))
            }

            function p (n, t, i, u) {
                var f = n._subscribers, e = f.length;
                n._onerror = null;
                f[e] = t;
                f[e + r] = i;
                f[e + o] = u;
                e === 0 && n._state && l(d, n)
            }

            function d (n) {
                var i = n._subscribers, e = n._state, r, u, f, t;
                if (i.length !== 0) {
                    for (f = n._result, t = 0; t < i.length; t += 3)r = i[t], u = i[t + e], r ? et(e, r, u, f) : u(f);
                    n._subscribers.length = 0
                }
            }

            function ft () {
                this.error = null
            }

            function ui (n, t) {
                try {
                    return n(t)
                } catch (i) {
                    return w.error = i, w
                }
            }

            function et (i, u, f, s) {
                var v = a(f), h, y, l, p;
                if (v) {
                    if (h = ui(f, s), h === w ? (p = !0, y = h.error, h = null) : l = !0, u === h) {
                        n(u, kt());
                        return
                    }
                } else h = s, l = !0;
                u._state !== e || (v && l ? c(u, h) : p ? n(u, y) : i === r ? t(u, h) : i === o && n(u, h))
            }

            function fi (t, i) {
                try {
                    i(function (n) {
                        c(t, n)
                    }, function (i) {
                        n(t, i)
                    })
                } catch (r) {
                    n(t, r)
                }
            }

            function i (i, r, u, f) {
                this._instanceConstructor = i;
                this.promise = new i(h, f);
                this._abortOnReject = u;
                this._validateInput(r) ? (this._input = r, this.length = r.length, this._remaining = r.length, this._init(), this.length === 0 ? t(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), this._remaining === 0 && t(this.promise, this._result))) : n(this.promise, this._validationError())
            }

            function li () {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
            }

            function ai () {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
            }

            function u (n, t) {
                this._id = ci++;
                this._label = t;
                this._state = undefined;
                this._result = undefined;
                this._subscribers = [];
                h !== n && (a(n) || li(), this instanceof u || ai(), fi(this, n))
            }

            var nt, k, lt, f, ut, w, ot, g, st, b;
            nt = Array.isArray ? Array.isArray : function (n) {
                return Object.prototype.toString.call(n) === "[object Array]"
            };
            k = nt;
            lt = Date.now || function () {
                        return (new Date).getTime()
                    };
            var vi = Object.create || function (n) {
                        if (arguments.length > 1)throw new Error("Second argument not supported");
                        if (typeof n != "object")throw new TypeError("Argument must be an object");
                        return tt.prototype = n, new tt
                    }, s = 0, l = function (n, t) {
                f[s] = n;
                f[s + 1] = t;
                s += 2;
                s === 2 && ut()
            }, it = typeof window != "undefined" ? window : {}, rt = it.MutationObserver || it.WebKitMutationObserver, at = typeof Uint8ClampedArray != "undefined" && typeof importScripts != "undefined" && typeof MessageChannel != "undefined";
            f = new Array(1e3);
            ut = typeof process != "undefined" && {}.toString.call(process) === "[object process]" ? vt() : rt ? yt() : at ? pt() : wt();
            var e = void 0, r = 1, o = 2, y = new ft;
            w = new ft;
            i.prototype._validateInput = function (n) {
                return k(n)
            };
            i.prototype._validationError = function () {
                return new Error("Array Methods must be provided an Array")
            };
            i.prototype._init = function () {
                this._result = new Array(this.length)
            };
            ot = i;
            i.prototype._enumerate = function () {
                for (var t = this.length, i = this.promise, r = this._input, n = 0; i._state === e && n < t; n++)this._eachEntry(r[n], n)
            };
            i.prototype._eachEntry = function (n, t) {
                var i = this._instanceConstructor;
                ct(n) ? n.constructor === i && n._state !== e ? (n._onerror = null, this._settledAt(n._state, t, n._result)) : this._willSettleAt(i.resolve(n), t) : (this._remaining--, this._result[t] = this._makeResult(r, t, n))
            };
            i.prototype._settledAt = function (i, r, u) {
                var f = this.promise;
                f._state === e && (this._remaining--, this._abortOnReject && i === o ? n(f, u) : this._result[r] = this._makeResult(i, r, u));
                this._remaining === 0 && t(f, this._result)
            };
            i.prototype._makeResult = function (n, t, i) {
                return i
            };
            i.prototype._willSettleAt = function (n, t) {
                var i = this;
                p(n, undefined, function (n) {
                    i._settledAt(r, t, n)
                }, function (n) {
                    i._settledAt(o, t, n)
                })
            };
            var ei = function (n, t) {
                return new ot(this, n, !0, t).promise
            }, oi = function (t, i) {
                function s (n) {
                    c(r, n)
                }

                function l (t) {
                    n(r, t)
                }

                var f = this, r = new f(h, i), o, u;
                if (!k(t))return n(r, new TypeError("You must pass an array to race.")), r;
                for (o = t.length, u = 0; r._state === e && u < o; u++)p(f.resolve(t[u]), undefined, s, l);
                return r
            }, si = function (n, t) {
                var r = this, i;
                return n && typeof n == "object" && n.constructor === r ? n : (i = new r(h, t), c(i, n), i)
            }, hi = function (t, i) {
                var u = this, r = new u(h, i);
                return n(r, t), r
            }, ci = 0;
            g = u;
            u.all = ei;
            u.race = oi;
            u.resolve = si;
            u.reject = hi;
            u.prototype = {
                constructor: u, then: function (n, t, i) {
                    var f = this, u = f._state, e, s, c;
                    return u === r && !n || u === o && !t ? this : (f._onerror = null, e = new this.constructor(h, i), s = f._result, u ? (c = arguments[u - 1], l(function () {
                        et(u, e, c, s)
                    })) : p(f, e, n, t), e)
                }, "catch": function (n, t) {
                    return this.then(null, n, t)
                }
            };
            st = function () {
                var n, t;
                n = typeof global != "undefined" ? global : typeof window != "undefined" && window.document ? window : self;
                t = "Promise"in n && "resolve"in n.Promise && "reject"in n.Promise && "all"in n.Promise && "race"in n.Promise && function () {
                            var t;
                            return new n.Promise(function (n) {
                                t = n
                            }), a(t)
                        }();
                t || (n.Promise = g)
            };
            b = {Promise: g, polyfill: st};
            typeof define == "function" && define.amd ? define(function () {
                return b
            }) : typeof module != "undefined" && module.exports ? module.exports = b : typeof this != "undefined" && (this.ES6Promise = b);
            window.Promise = window.Promise || this.ES6Promise.Promise
        }).call(this);
        ///#source 1 1 defaultHttpRequest.js
        /**
         * @constructor
         */
        function DefaultHttpRequest () {

            /**
             * @name _promiseFactory
             * @type DefaultPromiseFactory
             */

            /**
             * @param {XMLHttpRequest} xhr
             * @param {object.<string, string>} headers
             */
            function setHeaders (xhr, headers) {
                var keys = Object.keys(headers);

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var value = headers[key];

                    xhr.setRequestHeader(key, value);
                }
            }

            /**
             * @param {string} url
             * @param {{ headers: object.<string, string> }} [config]
             * @returns {Promise}
             */
            this.getJSON = function (url, config) {
                return _promiseFactory.create(function (resolve, reject) {

                    try {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url);
                        xhr.responseType = "json";

                        if (config) {
                            if (config.headers) {
                                setHeaders(xhr, config.headers);
                            }
                        }

                        xhr.onload = function () {
                            try {
                                if (xhr.status === 200) {
                                    var response = xhr.response;
                                    if (typeof response === "string") {
                                        response = JSON.parse(response);
                                    }
                                    resolve(response);
                                }
                                else {
                                    reject(Error(xhr.statusText + "(" + xhr.status + ")"));
                                }
                            }
                            catch (err) {
                                reject(err);
                            }
                        };

                        xhr.onerror = function () {
                            reject(Error("Network error"));
                        };

                        xhr.send();
                    }
                    catch (err) {
                        return reject(err);
                    }
                });
            };
        }

        _httpRequest = new DefaultHttpRequest();

        ///#source 1 1 defaultPromiseFactory.js
        /**
         * @constructor
         * @param {Promise} promise
         */
        function DefaultPromise (promise) {

            /**
             * @param {function(*):*} successCallback
             * @param {function(*):*} errorCallback
             * @returns {DefaultPromise}
             */
            this.then = function (successCallback, errorCallback) {
                var childPromise = promise.then(successCallback, errorCallback);

                return new DefaultPromise(childPromise);
            };

            /**
             *
             * @param {function(*):*} errorCallback
             * @returns {DefaultPromise}
             */
            this.catch = function (errorCallback) {
                var childPromise = promise.catch(errorCallback);

                return new DefaultPromise(childPromise);
            };
        }

        /**
         * @constructor
         */
        function DefaultPromiseFactory () {

            this.resolve = function (value) {
                return new DefaultPromise(Promise.resolve(value));
            };

            this.reject = function (reason) {
                return new DefaultPromise(Promise.reject(reason));
            };

            /**
             * @param {function(resolve:function, reject:function)} callback
             * @returns {DefaultPromise}
             */
            this.create = function (callback) {
                return new DefaultPromise(new Promise(callback));
            };
        }

        _promiseFactory = new DefaultPromiseFactory();
        ///#source 1 1 oidcclient.js
        /// <reference path="es6-promise-2.0.0.js" />
        /*
         * Copyright 2014 Dominick Baier, Brock Allen
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */

        function log () {
            //var param = [].join.call(arguments);
            //console.log(param);
        }

        function copy (obj, target) {
            target = target || {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    target[key] = obj[key];
                }
            }
            return target;
        }

        function rand () {
            return ((Date.now() + Math.random()) * Math.random()).toString().replace(".", "");
        }

        function error (message) {
            return _promiseFactory.reject(Error(message));
        }

        function parseOidcResult (queryString) {
            log("parseOidcResult");

            queryString = queryString || location.hash;

            var idx = queryString.lastIndexOf("#");
            if (idx >= 0) {
                queryString = queryString.substr(idx + 1);
            }

            var params = {},
                    regex = /([^&=]+)=([^&]*)/g,
                    m;

            var counter = 0;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                if (counter++ > 50) {
                    return {
                        error: "Response exceeded expected number of parameters"
                    };
                }
            }

            for (var prop in params) {
                return params;
            }
        }

        function getJson (url, token) {
            log("getJson", url);

            var config = {};

            if (token) {
                config.headers = {"Authorization": "Bearer " + token};
            }

            return _httpRequest.getJSON(url, config);
        }

        function OidcClient (settings) {
            this._settings = settings || {};

            if (!this._settings.request_state_key) {
                this._settings.request_state_key = "OidcClient.request_state";
            }

            if (!this._settings.request_state_store) {
                this._settings.request_state_store = window.localStorage;
            }

            if (typeof this._settings.load_user_profile === 'undefined') {
                this._settings.load_user_profile = true;
            }

            if (typeof this._settings.filter_protocol_claims === 'undefined') {
                this._settings.filter_protocol_claims = true;
            }

            if (this._settings.authority && this._settings.authority.indexOf('.well-known/openid-configuration') < 0) {
                if (this._settings.authority[this._settings.authority.length - 1] !== '/') {
                    this._settings.authority += '/';
                }
                this._settings.authority += '.well-known/openid-configuration';
            }

            if (!this._settings.response_type) {
                this._settings.response_type = "id_token token";
            }

            Object.defineProperty(this, "isOidc", {
                get: function () {
                    if (this._settings.response_type) {
                        var result = this._settings.response_type.split(/\s+/g).filter(function (item) {
                            return item === "id_token";
                        });
                        return !!(result[0]);
                    }
                    return false;
                }
            });

            Object.defineProperty(this, "isOAuth", {
                get: function () {
                    if (this._settings.response_type) {
                        var result = this._settings.response_type.split(/\s+/g).filter(function (item) {
                            return item === "token";
                        });
                        return !!(result[0]);
                    }
                    return false;
                }
            });
        }

        OidcClient.prototype.loadMetadataAsync = function () {
            log("OidcClient.loadMetadataAsync");

            var settings = this._settings;

            if (settings.metadata) {
                return _promiseFactory.resolve(settings.metadata);
            }

            if (!settings.authority) {
                return error("No authority configured");
            }

            return getJson(settings.authority)
                    .then(function (metadata) {
                        settings.metadata = metadata;
                        return metadata;
                    }, function (err) {
                        return error("Failed to load metadata (" + err.message + ")");
                    });
        };

        OidcClient.prototype.loadX509SigningKeyAsync = function () {
            log("OidcClient.loadX509SigningKeyAsync");

            var settings = this._settings;

            function getKeyAsync (jwks) {
                if (!jwks.keys || !jwks.keys.length) {
                    return error("Signing keys empty");
                }

                var key = jwks.keys[0];
                if (key.kty !== "RSA") {
                    return error("Signing key not RSA");
                }

                if (!key.x5c || !key.x5c.length) {
                    return error("RSA keys empty");
                }

                return _promiseFactory.resolve(key.x5c[0]);
            }

            if (settings.jwks) {
                return getKeyAsync(settings.jwks);
            }

            return this.loadMetadataAsync().then(function (metadata) {
                if (!metadata.jwks_uri) {
                    return error("Metadata does not contain jwks_uri");
                }

                return getJson(metadata.jwks_uri).then(function (jwks) {
                    settings.jwks = jwks;
                    return getKeyAsync(jwks);
                }, function (err) {
                    return error("Failed to load signing keys (" + err.message + ")");
                });
            });
        };

        OidcClient.prototype.loadUserProfile = function (access_token) {
            log("OidcClient.loadUserProfile");

            return this.loadMetadataAsync().then(function (metadata) {

                if (!metadata.userinfo_endpoint) {
                    return _promiseFactory.reject(Error("Metadata does not contain userinfo_endpoint"));
                }

                return getJson(metadata.userinfo_endpoint, access_token);
            });
        }

        OidcClient.prototype.loadAuthorizationEndpoint = function () {
            log("OidcClient.loadAuthorizationEndpoint");

            if (this._settings.authorization_endpoint) {
                return _promiseFactory.resolve(this._settings.authorization_endpoint);
            }

            if (!this._settings.authority) {
                return error("No authorization_endpoint configured");
            }

            return this.loadMetadataAsync().then(function (metadata) {
                if (!metadata.authorization_endpoint) {
                    return error("Metadata does not contain authorization_endpoint");
                }

                return metadata.authorization_endpoint;
            });
        };

        OidcClient.prototype.createTokenRequestAsync = function () {
            log("OidcClient.createTokenRequestAsync");

            var client = this;
            var settings = client._settings;

            return client.loadAuthorizationEndpoint().then(function (authorization_endpoint) {

                var state = rand();
                var url = authorization_endpoint + "?state=" + encodeURIComponent(state);

                if (client.isOidc) {
                    var nonce = rand();
                    url += "&nonce=" + encodeURIComponent(nonce);
                }

                var required = ["client_id", "redirect_uri", "response_type", "scope"];
                required.forEach(function (key) {
                    var value = settings[key];
                    if (value) {
                        url += "&" + key + "=" + encodeURIComponent(value);
                    }
                });

                var optional = ["prompt", "display", "max_age", "ui_locales", "id_token_hint", "login_hint", "acr_values"];
                optional.forEach(function (key) {
                    var value = settings[key];
                    if (value) {
                        url += "&" + key + "=" + encodeURIComponent(value);
                    }
                });

                var request_state = {
                    oidc: client.isOidc,
                    oauth: client.isOAuth,
                    state: state
                };

                if (nonce) {
                    request_state["nonce"] = nonce;
                }

                settings.request_state_store.setItem(settings.request_state_key, JSON.stringify(request_state));

                return {
                    request_state: request_state,
                    url: url
                };
            });
        }

        OidcClient.prototype.createLogoutRequestAsync = function (id_token_hint) {
            log("OidcClient.createLogoutRequestAsync");

            var settings = this._settings;
            return this.loadMetadataAsync().then(function (metadata) {
                if (!metadata.end_session_endpoint) {
                    return error("No end_session_endpoint in metadata");
                }

                var url = metadata.end_session_endpoint;
                if (id_token_hint && settings.post_logout_redirect_uri) {
                    url += "?post_logout_redirect_uri=" + encodeURIComponent(settings.post_logout_redirect_uri);
                    url += "&id_token_hint=" + encodeURIComponent(id_token_hint);
                }
                return url;
            });
        }

        OidcClient.prototype.validateIdTokenAsync = function (id_token, nonce, access_token) {
            log("OidcClient.validateIdTokenAsync");

            var client = this;
            var settings = client._settings;

            return client.loadX509SigningKeyAsync().then(function (cert) {

                var jws = new KJUR.jws.JWS();
                if (jws.verifyJWSByPemX509Cert(id_token, cert)) {
                    var id_token_contents = JSON.parse(jws.parsedJWS.payloadS);

                    if (nonce !== id_token_contents.nonce) {
                        return error("Invalid nonce");
                    }

                    return client.loadMetadataAsync().then(function (metadata) {

                        if (id_token_contents.iss !== metadata.issuer) {
                            return error("Invalid issuer");
                        }

                        if (id_token_contents.aud !== settings.client_id) {
                            return error("Invalid audience");
                        }

                        var now = parseInt(Date.now() / 1000);

                        // accept tokens issues up to 5 mins ago
                        var diff = now - id_token_contents.iat;
                        if (diff > (5 * 60)) {
                            return error("Token issued too long ago");
                        }

                        if (id_token_contents.exp < now) {
                            return error("Token expired");
                        }

                        if (access_token && settings.load_user_profile) {
                            // if we have an access token, then call user info endpoint
                            return client.loadUserProfile(access_token, id_token_contents).then(function (profile) {
                                return copy(profile, id_token_contents);
                            });
                        }
                        else {
                            // no access token, so we have all our claims
                            return id_token_contents;
                        }

                    });
                }
                else {
                    return error("JWT failed to validate");
                }

            });

        };

        OidcClient.prototype.validateAccessTokenAsync = function (id_token_contents, access_token) {
            log("OidcClient.validateAccessTokenAsync");

            if (!id_token_contents.at_hash) {
                return error("No at_hash in id_token");
            }

            var hash = KJUR.crypto.Util.sha256(access_token);
            var left = hash.substr(0, hash.length / 2);
            var left_b64u = rsaService.hextob64u(left);

            if (left_b64u !== id_token_contents.at_hash) {
                return error("at_hash failed to validate");
            }

            return _promiseFactory.resolve();
        };

        OidcClient.prototype.validateIdTokenAndAccessTokenAsync = function (id_token, nonce, access_token) {
            log("OidcClient.validateIdTokenAndAccessTokenAsync");

            var client = this;

            return client.validateIdTokenAsync(id_token, nonce, access_token).then(function (id_token_contents) {

                return client.validateAccessTokenAsync(id_token_contents, access_token).then(function () {

                    return id_token_contents;

                });

            });
        }

        OidcClient.prototype.processResponseAsync = function (queryString) {
            log("OidcClient.processResponseAsync");

            var client = this;
            var settings = client._settings;

            var request_state = settings.request_state_store.getItem(settings.request_state_key);
            settings.request_state_store.removeItem(settings.request_state_key);

            if (!request_state) {
                return error("No request state loaded");
            }

            request_state = JSON.parse(request_state);
            if (!request_state) {
                return error("No request state loaded");
            }

            if (!request_state.state) {
                return error("No state loaded");
            }

            var result = parseOidcResult(queryString);
            if (!result) {
                return error("No OIDC response");
            }

            if (result.error) {
                return error(result.error);
            }

            if (result.state !== request_state.state) {
                return error("Invalid state");
            }

            if (request_state.oidc) {
                if (!result.id_token) {
                    return error("No identity token");
                }

                if (!request_state.nonce) {
                    return error("No nonce loaded");
                }
            }

            if (request_state.oauth) {
                if (!result.access_token) {
                    return error("No access token");
                }

                if (result.token_type !== "Bearer") {
                    return error("Invalid token type");
                }

                if (!result.expires_in) {
                    return error("No token expiration");
                }
            }

            var promise = _promiseFactory.resolve();
            if (request_state.oidc && request_state.oauth) {
                promise = client.validateIdTokenAndAccessTokenAsync(result.id_token, request_state.nonce, result.access_token);
            }
            else if (request_state.oidc) {
                promise = client.validateIdTokenAsync(result.id_token, request_state.nonce);
            }

            return promise.then(function (profile) {
                if (profile && settings.filter_protocol_claims) {
                    var remove = ["nonce", "at_hash", "iat", "nbf", "exp", "aud", "iss", "idp"];
                    remove.forEach(function (key) {
                        delete profile[key];
                    });
                }

                return {
                    profile: profile,
                    id_token: result.id_token,
                    access_token: result.access_token,
                    expires_in: result.expires_in,
                    scope: result.scope,
                    session_state: result.session_state
                };
            });
        }

        ///#source 1 1 token-manager.js
        /// <reference path="es6-promise-2.0.0.js" />
        /// <reference path="oidcclient.js" />
        /*
         * Copyright 2014 Dominick Baier, Brock Allen
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */

        /**
         * @type {DefaultHttpRequest}
         * @private
         */
        var _httpRequest = new DefaultHttpRequest();

        /**
         * @type {DefaultPromiseFactory}
         * @private
         */
        var _promiseFactory = new DefaultPromiseFactory();

        function Token (other) {
            if (other) {
                this.profile = other.profile;
                this.id_token = other.id_token;
                this.access_token = other.access_token;
                if (other.access_token) {
                    this.expires_at = parseInt(other.expires_at);
                }
                else if (other.id_token) {
                    this.expires_at = other.profile.exp;
                }
                else {
                    throw Error("Either access_token or id_token required.");
                }
                this.scopes = (other.scope || "").split(" ");
                this.session_state = other.session_state;
            }
            else {
                this.expires_at = 0;
            }

            Object.defineProperty(this, "expired", {
                get: function () {
                    var now = parseInt(Date.now() / 1000);
                    return this.expires_at < now;
                }
            });

            Object.defineProperty(this, "expires_in", {
                get: function () {
                    var now = parseInt(Date.now() / 1000);
                    return this.expires_at - now;
                }
            });
        }

        Token.fromResponse = function (response) {
            if (response.access_token) {
                var now = parseInt(Date.now() / 1000);
                response.expires_at = now + parseInt(response.expires_in);
            }
            return new Token(response);
        }

        Token.fromJSON = function (json) {
            if (json) {
                try {
                    var obj = JSON.parse(json);
                    return new Token(obj);
                }
                catch (e) {
                }
            }
            return new Token(null);
        }

        Token.prototype.toJSON = function () {
            return JSON.stringify({
                profile: this.profile,
                id_token: this.id_token,
                access_token: this.access_token,
                expires_at: this.expires_at,
                scope: this.scopes.join(" "),
                session_state: this.session_state
            });
        }

        function FrameLoader (url) {
            this.url = url;
        }

        FrameLoader.prototype.loadAsync = function (url) {
            url = url || this.url;

            if (!url) {
                return _promiseFactory.reject("No url provided");
            }

            return _promiseFactory.create(function (resolve, reject) {
                var frame = window.document.createElement("iframe");
                frame.style.display = "none";
                frame.src = url;

                function cleanup () {
                    window.removeEventListener("message", message, false);
                    if (handle) {
                        window.clearTimeout(handle);
                    }
                    handle = null;
                    window.document.body.removeChild(frame);
                }

                function cancel (e) {
                    cleanup();
                    reject();
                }

                function message (e) {
                    if (handle && e.origin === location.protocol + "//" + location.host && e.source == frame.contentWindow) {
                        cleanup();
                        resolve(e.data);
                    }
                }

                var handle = window.setTimeout(cancel, 5000);
                window.addEventListener("message", message, false);
                window.document.body.appendChild(frame);
            });
        }

        function loadToken (mgr) {
            mgr._token = null;
            if (mgr._settings.persist) {
                var tokenJson = mgr._settings.store.getItem(mgr._settings.persistKey);
                if (tokenJson) {
                    var token = Token.fromJSON(tokenJson);
                    if (!token.expired) {
                        mgr._token = token;
                    }
                }
            }
        }

        function configureTokenExpiring (mgr) {

            function callback () {
                handle = null;
                mgr._callTokenExpiring();
            }

            var handle = null;

            function cancel () {
                if (handle) {
                    window.clearTimeout(handle);
                    handle = null;
                }
            }

            function setup (duration) {
                handle = window.setTimeout(callback, duration * 1000);
            }

            function configure () {
                cancel();

                if (!mgr.expired) {
                    var duration = mgr.expires_in;
                    if (duration > 60) {
                        setup(duration - 60);
                    }
                    else {
                        callback();
                    }
                }
            }

            configure();

            mgr.addOnTokenObtained(configure);
            mgr.addOnTokenRemoved(cancel);
        }

        function configureAutoRenewToken (mgr) {

            if (mgr._settings.silent_redirect_uri && mgr._settings.silent_renew) {

                mgr.addOnTokenExpiring(function () {
                    mgr.renewTokenSilentAsync().catch(function (e) {
                        mgr._callSilentTokenRenewFailed();
                        console.error(e.message || e);
                    });
                });

            }
        }

        function configureTokenExpired (mgr) {

            function callback () {
                handle = null;

                if (mgr._token) {
                    mgr.saveToken(null);
                }

                mgr._callTokenExpired();
            }

            var handle = null;

            function cancel () {
                if (handle) {
                    window.clearTimeout(handle);
                    handle = null;
                }
            }

            function setup (duration) {
                handle = window.setTimeout(callback, duration * 1000);
            }

            function configure () {
                cancel();
                if (mgr.expires_in > 0) {
                    // register 1 second beyond expiration so we don't get into edge conditions for expiration
                    setup(mgr.expires_in + 1);
                }
            }

            configure();

            mgr.addOnTokenObtained(configure);
            mgr.addOnTokenRemoved(cancel);
        }

        function TokenManager (settings) {
            this._settings = settings || {};

            this._settings.persist = this._settings.persist || true;
            this._settings.store = this._settings.store || window.localStorage;
            this._settings.persistKey = this._settings.persistKey || "TokenManager.token";

            this.oidcClient = new OidcClient(this._settings);

            this._callbacks = {
                tokenRemovedCallbacks: [],
                tokenExpiringCallbacks: [],
                tokenExpiredCallbacks: [],
                tokenObtainedCallbacks: [],
                silentTokenRenewFailedCallbacks: []
            };

            Object.defineProperty(this, "profile", {
                get: function () {
                    if (this._token) {
                        return this._token.profile;
                    }
                }
            });
            Object.defineProperty(this, "id_token", {
                get: function () {
                    if (this._token) {
                        return this._token.id_token;
                    }
                }
            });
            Object.defineProperty(this, "access_token", {
                get: function () {
                    if (this._token && !this._token.expired) {
                        return this._token.access_token;
                    }
                }
            });
            Object.defineProperty(this, "expired", {
                get: function () {
                    if (this._token) {
                        return this._token.expired;
                    }
                    return true;
                }
            });
            Object.defineProperty(this, "expires_in", {
                get: function () {
                    if (this._token) {
                        return this._token.expires_in;
                    }
                    return 0;
                }
            });
            Object.defineProperty(this, "expires_at", {
                get: function () {
                    if (this._token) {
                        return this._token.expires_at;
                    }
                    return 0;
                }
            });
            Object.defineProperty(this, "scopes", {
                get: function () {
                    if (this._token) {
                        return [].concat(this._token.scopes);
                    }
                    return [];
                }
            });
            Object.defineProperty(this, "session_state", {
                get: function () {
                    if (this._token) {
                        return this._token.session_state;
                    }
                }
            });

            var mgr = this;
            loadToken(mgr);
            window.addEventListener("storage", function (e) {
                if (e.key === mgr._settings.persistKey) {
                    loadToken(mgr);

                    if (mgr._token) {
                        mgr._callTokenObtained();
                    }
                    else {
                        mgr._callTokenRemoved();
                    }
                }
            });
            configureTokenExpired(mgr);
            configureAutoRenewToken(mgr);

            // delay this so consuming apps can register for callbacks first
            window.setTimeout(function () {
                configureTokenExpiring(mgr);
            }, 0);
        }

        /**
         * @param {{ create:function(successCallback:function(), errorCallback:function()):Promise, resolve:function(value:*):Promise, reject:function():Promise}} promiseFactory
         */
        TokenManager.setPromiseFactory = function (promiseFactory) {
            _promiseFactory = promiseFactory;
        };

        /**
         * @param {{getJSON:function(url:string, config:{ headers: object.<string, string> })}} httpRequest
         */
        TokenManager.setHttpRequest = function (httpRequest) {
            if ((typeof httpRequest !== 'object') || (typeof httpRequest.getJSON !== 'function')) {
                throw Error('The provided value is not a valid http request.');
            }

            _httpRequest = httpRequest;
        };

        TokenManager.prototype._callTokenRemoved = function () {
            this._callbacks.tokenRemovedCallbacks.forEach(function (cb) {
                cb();
            });
        }

        TokenManager.prototype._callTokenExpiring = function () {
            this._callbacks.tokenExpiringCallbacks.forEach(function (cb) {
                cb();
            });
        }

        TokenManager.prototype._callTokenExpired = function () {
            this._callbacks.tokenExpiredCallbacks.forEach(function (cb) {
                cb();
            });
        }

        TokenManager.prototype._callTokenObtained = function () {
            this._callbacks.tokenObtainedCallbacks.forEach(function (cb) {
                cb();
            });
        }

        TokenManager.prototype._callSilentTokenRenewFailed = function () {
            this._callbacks.silentTokenRenewFailedCallbacks.forEach(function (cb) {
                cb();
            });
        }

        TokenManager.prototype.saveToken = function (token) {
            if (token && !(token instanceof Token)) {
                token = Token.fromResponse(token);
            }

            this._token = token;

            if (this._settings.persist && !this.expired) {
                this._settings.store.setItem(this._settings.persistKey, token.toJSON());
            }
            else {
                this._settings.store.removeItem(this._settings.persistKey);
            }

            if (token) {
                this._callTokenObtained();
            }
            else {
                this._callTokenRemoved();
            }
        }

        TokenManager.prototype.addOnTokenRemoved = function (cb) {
            this._callbacks.tokenRemovedCallbacks.push(cb);
        }

        TokenManager.prototype.addOnTokenObtained = function (cb) {
            this._callbacks.tokenObtainedCallbacks.push(cb);
        }

        TokenManager.prototype.addOnTokenExpiring = function (cb) {
            this._callbacks.tokenExpiringCallbacks.push(cb);
        }

        TokenManager.prototype.addOnTokenExpired = function (cb) {
            this._callbacks.tokenExpiredCallbacks.push(cb);
        }

        TokenManager.prototype.addOnSilentTokenRenewFailed = function (cb) {
            this._callbacks.silentTokenRenewFailedCallbacks.push(cb);
        }

        TokenManager.prototype.removeToken = function () {
            this.saveToken(null);
        }

        TokenManager.prototype.redirectForToken = function () {
            var oidc = this.oidcClient;
            oidc.createTokenRequestAsync().then(function (request) {
                window.location = request.url;
            }, function (err) {
                console.error("TokenManager.redirectForToken error: " + (err && err.message || err || ""));
            });
        }

        TokenManager.prototype.redirectForLogout = function () {
            var mgr = this;
            mgr.oidcClient.createLogoutRequestAsync(mgr.id_token).then(function (url) {
                mgr.removeToken();
                window.location = url;
            }, function (err) {
                console.error("TokenManager.redirectForLogout error: " + (err && err.message || err || ""));
            });
        }

        TokenManager.prototype.processTokenCallbackAsync = function (queryString) {
            var mgr = this;
            return mgr.oidcClient.processResponseAsync(queryString).then(function (token) {
                mgr.saveToken(token);
            });
        }

        TokenManager.prototype.renewTokenSilentAsync = function () {
            var mgr = this;

            if (!mgr._settings.silent_redirect_uri) {
                return _promiseFactory.reject("silent_redirect_uri not configured");
            }

            var settings = copy(mgr._settings);
            settings.redirect_uri = settings.silent_redirect_uri;
            settings.prompt = "none";

            var oidc = new OidcClient(settings);
            return oidc.createTokenRequestAsync().then(function (request) {
                var frame = new FrameLoader(request.url);
                return frame.loadAsync().then(function (hash) {
                    return oidc.processResponseAsync(hash).then(function (token) {
                        mgr.saveToken(token);
                    });
                });
            });
        }

        TokenManager.prototype.processTokenCallbackSilent = function (hash) {
            if (window.top && window !== window.top) {
                var hash = hash || window.location.hash;
                if (hash) {
                    window.top.postMessage(hash, location.protocol + "//" + location.host);
                }
            }
        }

        ///#source 1 1 iife-end.js
        // exports
        //window.OidcClient = OidcClient;
        //window.OidcTokenManager = TokenManager;

        return {
            OidcClient : OidcClient,
            OidcTokenManager : TokenManager
        };

    }

})();
