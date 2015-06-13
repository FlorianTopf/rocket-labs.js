'use strict';

/**
 * @ngdoc overview
 * @name scxApp
 * @description
 * # scxApp
 *
 * Main module of the application.
 */
var scxApp = angular.module(
    'scxApp',
    [
        'ui.router',
        'uiSwitch',
        'validation.match',
        'datatables',
        'datatables.bootstrap',
        'ngSanitize',
        'ngResource'
    ]
);

scxApp.constant('viewBaseUrl', 'scripts/views/');
scxApp.constant('templateBaseUrl', 'scripts/views/templates/');
scxApp.constant('apiBaseUrl', 'frontend-api/');

scxApp.run(['$rootScope', '$window', function ($rootScope, $window) {
    $rootScope.windowWidth = $window.outerWidth;
    angular.element($window).bind('resize', function () {
        $rootScope.windowWidth = $window.outerWidth;
        $rootScope.$apply('windowWidth');
    })
}]);

scxApp.config(['$stateProvider', '$urlRouterProvider', 'viewBaseUrl',
        function ($stateProvider, $urlRouterProvider, viewBaseUrl) {
            $urlRouterProvider.otherwise('/login');

            // TODO we need to check on page reload if a session exists
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: viewBaseUrl + 'login.html',
                controller: 'LoginCtrl'
            }).state('recover', {
                url: '/recover',
                templateUrl: viewBaseUrl + 'recover.html',
                controller: 'LoginCtrl'
            }).state('scx', {
                abstract: true,
                templateUrl: viewBaseUrl + 'index.html',
                controller: 'IndexCtrl'
            }).state('scx.dashboard', {
                abstract: true,
                templateUrl: viewBaseUrl + 'dashboard.html',
                resolve: {
                    session: function (UserService, $state, $timeout) {
                        if (UserService.isSessionActive) {
                            console.log('SUCCESS');
                        } else {
                            $timeout($state.transitionTo('login'));
                        }
                    }
                },
                controller: 'DashboardCtrl'
            }).state('scx.dashboard.widgets', {
                url: '/dashboard',
                views: {
                    products: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'ProductsCtrl'
                    },
                    orders: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'OrdersCtrl'
                    },
                    reports: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'ReportsCtrl'
                    },
                    status: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'StatusCtrl'
                    },
                    news: {
                        templateUrl: viewBaseUrl + 'news.html',
                        controller: 'NewsCtrl'
                    }
                }
            }).state('scx.user-setup', {
                url: '/user-setup',
                templateUrl: viewBaseUrl + 'userSetup.html',
                controller: 'UserSetupCtrl'
            }).state('scx.user-add', {
                url: '/user-add/:id',
                templateUrl: viewBaseUrl + 'userAddEdit.html',
                controller: 'UserAddEditCtrl'
            }).state('scx.seller-setup', {
                url: '/seller-setup',
                templateUrl: viewBaseUrl + 'sellerSetup.html',
                controller: 'SellerSetupCtrl'
            }).state('scx.seller-add', {
                url: '/seller-add/:id',
                templateUrl: viewBaseUrl + 'sellerAddEdit.html',
                controller: 'SellerAddEditCtrl'
            }).state('scx.cms-setup', {
                url: '/cms-setup',
                templateUrl: viewBaseUrl + 'cmsSetup.html',
                controller: 'CmsSetupCtrl'
            });
        }
    ]
);
