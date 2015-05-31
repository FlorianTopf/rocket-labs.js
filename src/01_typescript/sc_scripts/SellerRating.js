var App = (function () {
    var services = {
        SellerRatingKpiSelection: {}
    };
    return {
        services: services
    };
})();
var JQuery = {};
var SellerRatingKpiSelection = (function () {
    function SellerRatingKpiSelection($element, options) {
        this.events = {
            selected: 'sellerRatingKpiSelected',
            unselected: 'sellerRatingKpiUnselected'
        };
        this.defaultOptions = {
            connectedSelectlist: {
                selWrapper: '.connected-selectlists',
                options: {}
            },
            kpiIdDataAttribute: 'data-sellerrating-kpi',
            sortableAnimationSpeed: 0
        };
        this.element = $element;
        this.options = options;
        this.initialize();
    }
    SellerRatingKpiSelection.prototype.initialize = function () {
    };
    return SellerRatingKpiSelection;
})();
(function ($) {
    var app = this;
    var className = 'SellerRatingKpiSelection';
    app.services[className] = function ($element, options) {
        return new SellerRatingKpiSelection($element, options);
    };
}).call(App, JQuery);
