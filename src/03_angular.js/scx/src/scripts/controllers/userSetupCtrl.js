'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:UserSetupCtrl
 * @description
 * # UserSetupCtrl
 * Controller of the scxApp user setup page
 */
scxApp.controller(
    'UserSetupCtrl',
    ['$scope', '$window', 'DataTableService', 'UserService',
        function ($scope, $window, DataTableService, UserService) {
            var self = $scope.vm = this;
            self.path = [{ name: 'User Setup', link: 'scx.user-setup' }];

            self.userTableHdrs = ['ID', 'E-Mail', 'Name', 'Role', 'Active', '', ''];
            self.userTableOpts = DataTableService.getOptions();
            self.userTableColDefs = DataTableService.getColumnDefs(7, [6, 7]);

            self.updateUserStatus = function (user) {
                UserService.updateStatusOne(user.id, user.active).then(
                    // returns the full updated user
                    function (user) {
                        console.log(user);
                    },
                    function (error) {
                        // error case is handled here
                    }
                );
            };

            self.deleteUser = function (user) {
                if (confirm('Are you sure?')) {
                    UserService.deleteOne(user.id).then(
                        // returns the full updated user
                        function (success) {
                            console.log(success);
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                    // just for the moment
                    initialise();
                }
            };

            self.changeUserPassword = function () {
                return confirm('Are you sure?');
            };

            var initialise = function () {
                UserService.getAll().then(
                    function (users) {
                        self.users = users;
                        UserService.setUsers(users);
                    },
                    function (error) {
                        // error case is handled here
                    }
                );
            };

            // initialisation
            initialise();
        }
    ]
);
