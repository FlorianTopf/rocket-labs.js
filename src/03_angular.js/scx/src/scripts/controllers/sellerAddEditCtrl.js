'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:SellerAddCtrl
 * @description
 * # SellerAddCtrl
 * Controller of the scxApp user add page
 */
scxApp.controller(
    'SellerAddEditCtrl',
    ['$scope', '$state', '$stateParams', 'SellerService', 'CountryService',
        function ($scope,  $state, $stateParams, SellerService, CountryService) {
            var self = $scope.vm = this;
            self.form = {};

            SellerService.get().then(
                function(sellers) {
                    self.sellers = sellers;
                },
                function (error) {
                    // error case is handled here
                }
            );

            CountryService.get().then(
                function(countries) {
                    self.countries = countries
                },
                function (error) {
                    // error case is handled here
                }
            );

            self.submit = function(form) {
                if (form.$valid) {
                    // call service to submit data
                    console.log(self.form);
                } else {
                    console.log('error');
                }
            };

            self.empty = function (item) {
                return (item.trim().length === 0);
            };

            if (false === self.empty($stateParams.id)) {
                SellerService.getOneById(parseInt($stateParams.id)).then(
                    function (user) {
                        self.path = [
                            { name: 'Seller Setup', link: 'scx.seller-setup' },
                            { name: 'Edit Seller', link: 'scx.seller-add' }
                        ];
                        self.form = user;
                    },
                    function (error) {
                        // error case is handled here
                    }
                );
            } else {
                self.path = [
                    { name: 'Seller Setup', link: 'scx.seller-setup' },
                    { name: 'Add Seller', link: 'scx.seller-add' }
                ];
            }
        }
    ]
);
