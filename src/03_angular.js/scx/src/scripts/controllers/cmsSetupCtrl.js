'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:CmsSetupCtrl
 * @description
 * # CmsSetupCtrl
 * Controller of the scxApp cms setup page
 */
scxApp.controller(
    'CmsSetupCtrl',
    ['$scope',
        function ($scope) {
            var self = $scope.vm = this;
            self.path = [{name: 'CMS Setup', link: 'scx.cms-setup'}];
        }
    ]
);
