'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the scxApp orders widget
 */
scxApp.controller(
    'OrdersCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Orders';
            var subTitle = 'See all pending orders';
            var color = 'info';
            var icon = 'fa-shopping-cart';

            StatisticsService.getOrders().then(function(orders) {
                $scope.vm = new Widget(title, subTitle, orders, color, icon);
            });
        }
    ]
);
