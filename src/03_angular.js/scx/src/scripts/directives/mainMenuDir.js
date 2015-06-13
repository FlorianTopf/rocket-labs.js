'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:mainMenuDir
 * @description
 * # mainMenuDir
 */
scxApp.directive('mainMenuDir',
    ['templateBaseUrl', function (templateBaseUrl) {
        return {
            templateUrl: templateBaseUrl + 'mainMenuDir.html',
            restrict: 'E',
            scope: true,
            replace: false,
            link: function ($scope, $element, $attrs) {
                // add dom actions here
            }
        };
    }]
);
