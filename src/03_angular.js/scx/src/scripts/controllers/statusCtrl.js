'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:ProductsCtrl
 * @description
 * # StatusCtrl
 * Controller of the scxApp status widget
 */
scxApp.controller(
    'StatusCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Country Navigation';
            var subTitle = 'Connected Seller Center instances';
            var color = 'danger';
            var icon = 'fa-exclamation-triangle';

            StatisticsService.getStatus().then(function(status) {
                $scope.vm = new Widget(title, subTitle, status, color, icon);
            });
        }
    ]
);
