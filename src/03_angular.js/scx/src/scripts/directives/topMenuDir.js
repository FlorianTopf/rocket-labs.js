'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:topMenuDir
 * @description
 * # topMenuDir
 */
scxApp.directive('topMenuDir',
    ['templateBaseUrl', '$timeout',
        function (templateBaseUrl, $timeout) {
            function topMenuCtrl($scope, $element, $attrs) {
                var self = $scope.vm = this;
                self.windowWith = null;

                // watching the window width to remove menu classes
                $scope.$watch('windowWidth', function (newVal, oldVal) {
                    self.windowWidth = newVal;
                    $timeout(function () {
                        console.log(newVal);
                        if (newVal < 768) {
                            angular.element('body').removeClass('mmc');
                        } else {
                            angular.element('body').removeClass('mme');
                        }

                    });
                });

                // toggle menu with classes and window width
                self.toggleMainMenu = function () {
                    var bodyClasses = angular.element('body').attr('class');
                    if ((bodyClasses.indexOf('mmc') === -1) && (self.windowWidth > 767)) {
                        angular.element('body').addClass('mmc');
                    } else if ((bodyClasses.indexOf('mme') === -1) && (self.windowWidth < 768)) {
                        angular.element('body').addClass('mme');
                    } else {
                        angular.element('body').removeClass('mmc');
                        angular.element('body').removeClass('mme');
                    }
                };
            }

            return {
                templateUrl: templateBaseUrl + 'topMenuDir.html',
                transclude: true,
                restrict: 'E',
                scope: true,
                replace: false,
                controller: topMenuCtrl
            };
        }
    ]
);
