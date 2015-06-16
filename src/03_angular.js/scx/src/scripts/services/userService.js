'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:UserService
 * @description
 * # UserService
 */
scxApp.service('UserService',
    ['$q', '$resource', 'apiBaseUrl',
        function ($q, $resource, apiBaseUrl) {
            var self = this;

            var roles = [
                { id: 1, name: 'Maintenance' },
                { id: 2, name: 'Administrator' },
                { id: 3, name: 'Seller' }
            ];

            // defines if a session is active
            self.isSessionActive = false;
            // saves logged in user
            self.activeUser = null;

            // TODO save the current page of users to save requests
            // TODO we should check also current offset to be sure
            self.users = [];

            self.setUsers = function (users) {
                self.users = users;
            };

            self.getRoles = function () {
                return roles;
            };

            self.getRoleNameById = function (id) {
                var local = this;
                local.role = null;
                self.getRoles().forEach(function (role) {
                    if (role.id === id) {
                        local.role = role.name;
                    }
                });
                return local.role
            };

            self.login = function (credentials) {
                var session = $resource(
                    apiBaseUrl + 'sessions'
                ).save(credentials);
                return session.$promise;
            };

            self.logout = function () {
                var session = $resource(
                    apiBaseUrl + 'sessions'
                ).delete();
                return session.$promise;
            };

            self.getAll = function () {
                var users = $resource(
                    apiBaseUrl + 'users'
                ).query();
                return users.$promise;
            };

            self.getOneById = function (userId) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' }
                ).get({ id: userId });
                return user.$promise;
            };

            self.addOne = function (newUser) {
                var user = $resource(
                    apiBaseUrl + 'users'
                ).save(newUser);
                return user.$promise;
            };

            self.deleteOne = function (userId) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' }
                ).delete({ id: userId });
                return user.$promise;
            };

            self.updateStatusOne = function (userId, status) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' },
                    { 'update': { method: 'PATCH' }}
                ).update({ id: userId }, { active: status });
                return user.$promise;
            };

            self.updateOne = function (userId, updateUser) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' },
                    { 'update': { method: 'PUT' }}
                ).update({ id: userId }, updateUser);
                return user.$promise;
            };
        }
    ]
);
