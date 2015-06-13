'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:pageHeaderDir
 * @description
 * # pageHeaderDir
 */
scxApp.directive('pageHeaderDir',
    ['templateBaseUrl', function (templateBaseUrl) {
        return {
            templateUrl: templateBaseUrl + 'pageHeaderDir.html',
            transclude: true,
            restrict: 'EA',
            scope: {
                path: "=",
                icon: "@"
            },
            replace: false,
            link: function ($scope, $element, $attrs) {
                // add dom actions here
            }
        };
    }]
);