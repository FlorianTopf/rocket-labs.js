'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the scxApp reports widget
 */
scxApp.controller(
    'ReportsCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Reports';
            var subTitle = 'See all reports';
            var color = 'purple';
            var icon = 'fa-bar-chart-o';

            StatisticsService.getReports().then(function(reports) {
                $scope.vm = new Widget(title, subTitle, reports, color, icon);
            });
        }
    ]
);
