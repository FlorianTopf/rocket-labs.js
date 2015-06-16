'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:SellerSetupCtrl
 * @description
 * # SellerSetupCtrl
 * Controller of the scxApp seller setup page
 */
scxApp.controller(
    'SellerSetupCtrl',
    ['$scope', 'DataTableService', 'SellerService',
        function ($scope, DataTableService, SellerService) {
            var self = $scope.vm = this;
            self.path = [{ name: 'Seller Setup', link: 'scx.seller-setup' }];

            self.sellerTableHdrs = ['ID', 'E-Mail', 'Name', 'Seller Name', 'Active', ''];
            self.sellerTableOpts = DataTableService.getOptions();
            self.sellerTableColDefs = DataTableService.getColumnDefs(6, [6]);

            SellerService.get().then(
                function (sellers) {
                    self.sellers = sellers;
                },
                function (error) {
                    // error case is handled here
                }
            );

            self.deleteSeller = function () {
                return confirm('Are you sure?');
            };
        }
    ]
);
