'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the scxApp dashboard overview
 */
scxApp.controller(
    'DashboardCtrl',
    ['$scope',
        function ($scope) {
            var self = $scope.vm = this;
            self.path = [{ name: 'Dashboard', link: 'scx.dashboard.widgets' }];
        }
    ]
);
