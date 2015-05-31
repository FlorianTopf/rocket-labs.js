// this is how the App looks right now
var App = (function () {
	var services = {
		SellerRatingKpiSelection: {}
	}

	return { 
		services: services
	};
})();
// just mocking JQuery for the moment
var JQuery = {};

// a try to implement an services as a class
class SellerRatingKpiSelection {
	private element: any;
	private options: string[];

	private events: Object = {
       	selected: 'sellerRatingKpiSelected',
        unselected: 'sellerRatingKpiUnselected'
    };

    private defaultOptions: Object = {
            connectedSelectlist: {
                selWrapper: '.connected-selectlists',
                options: {}
            },
            kpiIdDataAttribute: 'data-sellerrating-kpi',
            sortableAnimationSpeed: 0
    };

	public constructor($element, options) {
		this.element = $element;
		this.options = options;
		this.initialize();
	}

	private initialize() {

	}

}

// we might need to keep this structure
(function($) {
	var app = this;
	var className = 'SellerRatingKpiSelection';

	// inject a function which creates the service to the app
	app.services[className] = function ($element, options) {
		return new SellerRatingKpiSelection($element, options);
    };

}).call(App, JQuery);
