var sc;
(function (sc) {
    var App;
    (function (App) {
        App.cfg = {
            vendorPrefix: 'App_',
            selElementsToClose: '.chart-popover',
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
        function registerService(service, name) {
            this.services[name] = service;
        }
        App.registerService = registerService;
    })(App = sc.App || (sc.App = {}));
})(sc || (sc = {}));
var sc;
(function (sc) {
    var Application = (function () {
        function Application() {
            this.controllers = [];
            this.tools = [];
            this.features = [];
            this.helpers = [];
            this.services = [];
            this.runningController = null;
            this.store = {};
            this.profiler = {
                isActive: false,
                $el: null
            };
            this.browserFeatures = {
                localStorage: false
            };
        }
        Application.prototype.init = function () {
            var _this = this;
            this.detectBrowserFeatures();
            var $doc = $(document);
            $doc.ajaxError(function (e, xhr, settings, exception) {
            });
            $doc.ajaxSuccess(function (e, xhr, settings) {
                if (xhr.responseJSON && _this.profiler.isActive) {
                }
            });
            this.profiler.$el = $(Application.cfg.selProfiler);
            this.profiler.isActive = this.profiler.$el.length > 0;
            $('header').click(function () {
                $(Application.cfg.selElementsToClose).hide();
            });
        };
        Application.prototype.detectBrowserFeatures = function () {
            this.browserFeatures.localStorage = this.supportsLocalStorage();
        };
        Application.prototype.supportsLocalStorage = function () {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            }
            catch (e) {
                return false;
            }
        };
        Application.prototype.runController = function () {
            var ctrlName = $('body').data('ctrl');
            if (!ctrlName) {
                return;
            }
            if (!this.controllers[ctrlName]) {
                throw 'No JS controller found: ' + ctrlName;
            }
            var ctrl = this.controllers[ctrlName], options = this.getStore('controllerOptions');
            this.runningController = new ctrl(options);
        };
        Application.prototype.getStore = function (key) {
            return (key)
                ? this.store[key] || {}
                : this.store || {};
        };
        Application.prototype.getTranslation = function (key) {
            var translations = this.getStore('generalTranslations');
            return translations[key] || {};
        };
        Application.cfg = {
            vendorPrefix: 'App_',
            selElementsToClose: '.chart-popover',
            selProfiler: '#ajax-profiler-block',
            modalAutoSelector: '.modal-auto'
        };
        return Application;
    })();
    sc.App2 = new Application();
})(sc || (sc = {}));
/// <reference path="../../05_modules/lib/jquery/jquery.d.ts" />
var sc;
(function (sc) {
    var Controller = (function () {
        function Controller(options) {
        }
        return Controller;
    })();
    sc.Controller = Controller;
})(sc || (sc = {}));
var sc;
(function (sc) {
    var Service = (function () {
        function Service(element, options) {
            if (element === void 0) { element = null; }
            if (options === void 0) { options = {}; }
            this.element = null;
            this.options = {};
            this.defaultOptions = {};
            this.element = element;
            this.options = this.mergeOptions(options);
            this.initialize();
        }
        Service.prototype.initialize = function () {
        };
        Service.prototype.mergeOptions = function (options) {
            return $.extend(true, {}, this.defaultOptions, options);
        };
        return Service;
    })();
    sc.Service = Service;
})(sc || (sc = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var sc;
(function (sc) {
    var sellerRating;
    (function (sellerRating) {
        var KpiSelection = (function (_super) {
            __extends(KpiSelection, _super);
            function KpiSelection() {
                _super.apply(this, arguments);
                this.defaultOptions = {
                    connectedSelectlist: {
                        selWrapper: '.connected-selectlists',
                        options: {}
                    },
                    kpiIdDataAttribute: 'data-sellerrating-kpi',
                    sortableAnimationSpeed: 0
                };
            }
            KpiSelection.prototype.initialize = function () {
            };
            KpiSelection.Events = {
                selected: 'sellerRatingKpiSelected',
                unselected: 'sellerRatingKpiUnselected'
            };
            return KpiSelection;
        })(sc.Service);
        sellerRating.KpiSelection = KpiSelection;
    })(sellerRating = sc.sellerRating || (sc.sellerRating = {}));
    sc.App.registerService(sellerRating.KpiSelection, 'SellerRatingKpiSelection');
})(sc || (sc = {}));
