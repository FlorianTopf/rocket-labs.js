'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the scxApp products widget
 */
scxApp.controller(
    'ProductsCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Products';
            var subTitle = 'See all live products';
            var color = 'success';
            var icon = 'fa-gift';

            StatisticsService.getProducts().then(function (products) {
                $scope.vm = new Widget(title, subTitle, products, color, icon);
            });
        }
    ]
);
