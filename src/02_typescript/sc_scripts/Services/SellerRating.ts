// a try to implement an services as a class
module sc {
    export module sellerRating {
        export class KpiSelection extends sc.Service {
            static Events = {
                selected: 'sellerRatingKpiSelected',
                unselected: 'sellerRatingKpiUnselected'
            };

            protected defaultOptions: Object = {
                connectedSelectlist: {
                    selWrapper: '.connected-selectlists',
                    options: {}
                },
                kpiIdDataAttribute: 'data-sellerrating-kpi',
                sortableAnimationSpeed: 0
            };

            protected initialize() {
            }
        }
    }

    // this is "legacy" way - we would have to keep it for a while
    App.registerService(sellerRating.KpiSelection, 'SellerRatingKpiSelection');
}
