(function () {

    'use strict';

    angular
        .module('MyApp', ['OidcLib']);

    angular
        .module('MyApp')
        .directive('identify', identify);

    function identify (OidcService) {
        return {
            restrict: 'AE',
            controllerAs: 'id',
            controller: controller//,
            //template: '<button class="btn btn-primary">Log In</button>'
        };

        function controller () {

            console.log('yes, this is the angular vesion');

            var id = this;

            var env = window.location.host.split("-")[0];
            var appName = (window.location.host.split(".")[0]).split("-")[1].toLowerCase();
            var clientId = "casemanagement.web.client";
            switch (appName) {
                case "casemanagement":
                    clientId = "casemanagement.web.client";
                    break;
                case "auditmanagement":
                    clientId = "auditmanagement.web.client";
                    break;
                case "admin":
                    clientId = "btadmin.web.client";
                    break;
            }

            //console.log("Environment=" + env + ", Application=" + appName + ", ClientId=" + clientId);

            var config = {
                authority: "https://"+env+"-login.blackthorngrc.com/core",
                client_id: clientId,
                redirect_uri: window.location.protocol + "//" + window.location.host + "/",
                post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",

                // these two will be done dynamically from the buttons clicked
                //response_type: "id_token token",
                //scope: "openid profile email read write",

                // we're not using these in this sample
                silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/silent_renew.html",
                //silent_renew: true,

                // this will allow all the OIDC protocol claims to vbe visible in the window. normally a client app
                // wouldn't care about them or want them taking up space
                filter_protocol_claims: false
            };

            console.log('config', config);

            var mgr = new OidcService.OidcTokenManager(config);

            mgr.addOnTokenObtained(function () {
                console.log("token obtained");
            });
            mgr.addOnTokenRemoved(function () {
                display("#response", { message: "Logged Out" });
                showTokens();
            });

            function display(selector, data) {
                if (data && typeof data === 'string') {
                    console.log(data);
                    data = JSON.parse(data);
                }
                if (data) {
                    data = JSON.stringify(data, null, 2);
                }
                document.querySelector(selector).textContent = data;
            }

            function showTokens() {
                display("#id-token", mgr.profile || "");
                display("#access-token", mgr.access_token && { access_token: mgr.access_token, expires_in: mgr.expires_in } || "");
                //checkSessionState();
            }
            showTokens();

            function handleCallback() {
                mgr.processTokenCallbackAsync().then(function () {
                    var hash = window.location.hash.substr(1);
                    var result = hash.split('&').reduce(function (result, item) {
                        var parts = item.split('=');
                        result[parts[0]] = parts[1];
                        return result;
                    }, {});
                    display("#response", result);

                    showTokens();
                }, function (error) {
                    display("#response", error.message && { error: error.message } || error);
                });
            }

            function authorize(scope, response_type) {
                console.log('scope', scope);
                console.log('response_type', response_type);
                config.scope = scope;
                config.response_type = response_type;
                mgr.redirectForToken();
            }

            function logout() {
                mgr.redirectForLogout();
            }

            function callApi() {
                var xhr = new XMLHttpRequest();
                xhr.onload = function (e) {
                    if (xhr.status >= 400) {
                        display("#ajax-result", {
                            status: xhr.status,
                            statusText: xhr.statusText,
                            wwwAuthenticate: xhr.getResponseHeader("WWW-Authenticate")
                        });
                    }
                    else {
                        display("#ajax-result", xhr.response);
                    }
                };
                xhr.onerror = function () {
                    if (xhr.status === 401) {
                        mgr.removeToken();
                        showTokens();
                    }

                    display("#ajax-result", {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        wwwAuthenticate: xhr.getResponseHeader("WWW-Authenticate")
                    });
                };
                xhr.open("GET", "https://"+env+"-cases.blackthorngrc.com/identity", true);
                xhr.setRequestHeader("Authorization", "Bearer " + mgr.access_token);
                xhr.send();
            }

            if (window.location.hash) {
                handleCallback();
            }

            [].forEach.call(document.querySelectorAll(".request"), function (button) {
                button.addEventListener("click", function () {
                    authorize(this.dataset["scope"], this.dataset["type"]);
                });
            });

            document.querySelector(".call").addEventListener("click", callApi, false);
            document.querySelector(".logout").addEventListener("click", logout, false);

        }
    }

})();