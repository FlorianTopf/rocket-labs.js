'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the scxApp main view
 * Navigation and placeholder for content
 */
scxApp.controller(
    'IndexCtrl',
    ['$scope', '$state', 'UserService',
        function ($scope, $state, UserService) {
            $scope.vm = this;

            // this is made accessible to child scopes (navigation)
            $scope.logoutUser = function () {
                UserService.logout().then(
                    function (success) {
                        console.log(success);
                        UserService.isSessionActive = false;
                        $state.go('login');
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };
        }
    ]
);
