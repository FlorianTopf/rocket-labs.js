/// <reference path="../05_modules/lib/jquery/jquery.d.ts" />
var sc;
(function (sc) {
    var Controller = (function () {
        function Controller(options) {
        }
        return Controller;
    })();
    sc.Controller = Controller;
    var App;
    (function (App) {
        App.cfg = {
            vendorPrefix: 'App_',
            setElementsToClose: '.chart-popover',
            selProfiler: '#ajax-profiler-block',
            modalAutoSelector: '.modal-auto'
        };
        App.controllers = [];
        App.tools = [];
        App.features = [];
        App.helpers = [];
        App.services = [];
        App.runningController = null;
        App.store = {};
        App.profiler = {
            isActive: false,
            $el: null
        };
        App.browserFeatures = {
            localStorage: false
        };
        function init() {
            var _this = this;
            detectBrowserFeatures();
            var $doc = $(document);
            $doc.ajaxError(function (e, xhr, settings, exception) {
            });
            $doc.ajaxSuccess(function (e, xhr, settings) {
                if (xhr.responseJSON && _this.profiler.isActive) {
                }
            });
            this.profiler.$el = $(this.cfg.selProfiler);
            this.profiler.isActive = this.profiler.$el.length > 0;
            $('header').click(function () {
                $(_this.cfg.selElementsToClose).hide();
            });
            bindDoubleClickPrevention();
        }
        App.init = init;
        function detectBrowserFeatures() {
            this.browserFeatures.localStorage = supportsLocalStorage();
        }
        function supportsLocalStorage() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            }
            catch (e) {
                return false;
            }
        }
        function bindDoubleClickPrevention() {
        }
        function imitateJson() {
        }
        function runController() {
            var ctrlName = $('body').data('ctrl');
            if (!ctrlName) {
                return;
            }
            if (!this.controllers[ctrlName]) {
                throw 'No JS controller found: ' + ctrlName;
            }
            var ctrl = this.controllers[ctrlName], options = this.getStore('controllerOptions');
            this.runningController = new ctrl(options);
        }
        App.runController = runController;
        function getStore(key) {
            return (key)
                ? this.store[key] || {}
                : this.store || {};
        }
        App.getStore = getStore;
        function getTranslation(key) {
            var translations = this.getStore('generalTranslations');
            return translations[key] || {};
        }
        App.getTranslation = getTranslation;
    })(App = sc.App || (sc.App = {}));
})(sc || (sc = {}));
