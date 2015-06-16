'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:widgetDir
 * @description
 * # widgetDir
 */
scxApp.directive('widgetDir',
    ['templateBaseUrl',
        function (templateBaseUrl) {
            return {
                templateUrl: templateBaseUrl + 'widgetDir.html',
                transclude: true,
                restrict: 'E',
                scope: true,
                replace: false,
                link: function ($scope, $element, $attrs) {
                    // add dom actions here
                }

            };
        }
    ]
);
