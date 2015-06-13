'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:StatisticsService
 * @description
 * # ProductsService
 */
scxApp.service('StatisticsService',
    ['$q',
        function ($q) {
            var self = this;

            var products = [
                new WidgetItem('Indonesia', 14, 'info', '#id-products'),
                new WidgetItem('Malaysia', 7, 'warning', '#my-products'),
                new WidgetItem('Thailand', 11, 'danger', '#th-products'),
                new WidgetItem('Singapore', 5, 'success', '#sp-products')
            ];

            var orders = [
                new WidgetItem('Indonesia', 14, 'info', '#id-products'),
                new WidgetItem('Malaysia', 7, 'warning', '#my-products'),
                new WidgetItem('Thailand', 11, 'danger', '#th-products'),
                new WidgetItem('Singapore', 5, 'success', '#sp-products')
            ];

            var reports = [
                { name: 'Indonesia', url: '#id-reports' },
                { name: 'Malaysia', url: '#my-reports' },
                { name: 'Thailand', url: '#th-reports' },
                { name: 'Singapore', url: '#sp-reports' }
            ];

            var status = [
                { name: 'Indonesia', url: '#id-status' },
                { name: 'Malaysia', url: '#my-status' },
                { name: 'Thailand', url: '#th-status' },
                { name: 'Singapore', url: '#sp-status' }
            ];

            self.getProducts = function () {
                var defer = $q.defer();
                defer.resolve(products);
                return defer.promise;
            };

            self.getOrders = function () {
                var defer = $q.defer();
                defer.resolve(orders);
                return defer.promise;
            };

            self.getReports = function () {
                var defer = $q.defer();
                defer.resolve(reports);
                return defer.promise;
            };

            self.getStatus = function () {
                var defer = $q.defer();
                defer.resolve(status);
                return defer.promise;
            }
        }
    ]
);
