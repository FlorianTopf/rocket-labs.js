'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the scxApp base view for sellers
 */
scxApp.controller(
    'LoginCtrl',
    ['$scope', '$window', '$state', 'UserService',
        function ($scope, $window, $state, UserService) {
            var self = $scope.vm = this;
            self.form = {};
            self.submitted = false;

            self.loginUser = function (form) {
                self.submitted = true;
                if (form.$valid) {
                    // call service to submit data
                    UserService.login(self.form).then(
                        function (user) {
                            UserService.activeUser = user;
                            UserService.isSessionActive = true;
                            $state.go('scx.dashboard.widgets');
                        },
                        function (error) {
                            // error case is handled here
                            console.log(error.data);
                        }
                    );
                } else {
                    console.log('error');
                }
            };

            self.recoverPassword = function (form) {
                if (form.$valid) {
                    // call service to submit data
                    console.log(self.form);
                    $window.alert('Recover E-Mail sent');
                } else {
                    $window.alert('Error');
                }

            };
        }
    ]
);
