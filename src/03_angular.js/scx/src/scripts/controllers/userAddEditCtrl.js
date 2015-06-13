'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:UserAddCtrl
 * @description
 * # UserAddCtrl
 * Controller of the scxApp user add page
 */
scxApp.controller(
    'UserAddEditCtrl',
    ['$scope', '$state', '$stateParams', '$timeout', 'UserService',
        function ($scope, $state, $stateParams, $timeout, UserService) {
            var self = $scope.vm = this;
            self.roles =  UserService.getRoles();
            self.form = {};
            self.userId = null;
            self.submitted = false;
            self.success = false;

            self.submit = function (form) {
                self.submitted = true;
                if (self.userId === null) {
                    self.addUser(form);
                } else {
                    self.updateUser(self.userId, form);
                }
            };

            self.addUser = function (form) {
                if (form.$valid) {
                    // call service to submit data
                    UserService.addOne(self.form).then(
                        // returns the full updated user
                        function (user) {
                            console.log(user);
                            self.success = true;
                            $timeout(function () {
                                self.success = false;
                            }, 3000);
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                } else {
                    console.log(form.passwordConfirm.$error);
                }
            };

            self.updateUser = function (userId, form) {
                if (form.$valid) {
                    // call service to submit data
                    UserService.updateOne(userId, self.form).then(
                        // returns the full updated user
                        function (user) {
                            console.log(user);
                            self.success = true;
                            $timeout(function () {
                                self.success = false;
                            }, 3000);
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                } else {
                    console.log(form.passwordConfirm.$error);
                }
            };

            self.empty = function (item) {
                return (item.trim().length === 0);
            };

            var initialise = function (userId) {
                if (false === self.empty(userId)) {
                    self.userId = parseInt(userId);
                    UserService.getOneById(self.userId).then(
                        function (user) {
                            self.path = [
                                {name: 'User Setup', link: 'scx.user-setup'},
                                {name: 'Edit User', link: 'scx.user-add'}
                            ];
                            self.form = user;
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                } else {
                    self.path = [
                        {name: 'User Setup', link: 'scx.user-setup'},
                        {name: 'Add User', link: 'scx.user-add'}
                    ];
                }
            }

            // initialisation
            initialise($stateParams.id);

        }
    ]
);
