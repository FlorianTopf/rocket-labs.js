(function () {
    'use strict';

    var productModule = angular.module('SellerCenter_Product', []);

    var MyCtrl = function() {
        this.profiles = [
            {
                name: 'John Doe',
                photo: 'http://projects.nfstc.org/property_crimes/module04/images/pro_m04_t05.jpg',
                rating: 0,
                movies: [
                    'Top Gun',
                    'Last Samurai',
                    'Mission Impossible'
                ]
            },
            {
                name: 'John Doe 2',
                photo: 'http://projects.nfstc.org/property_crimes/module04/images/pro_m04_t05.jpg',
                rating: 2,
                movies: [
                    'Forrest Gump',
                    'Shawshank Redemption'
                ]
            }
        ];
    };

    productModule.controller('MainCtrl', MyCtrl);
})();