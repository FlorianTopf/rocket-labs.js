'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:SellerService
 * @description
 * # SellerService
 */
scxApp.service('SellerService',
    ['$q',
        function ($q) {
            var self = this;

            var sellers = [{
                "id": 860,
                "email": "florian.topf@rocket-internet.de",
                "name": "Florian Topf",
                "sellerName": "Flo's T-Shirts",
                "countryId": "DE",
                "active": true
            }, {
                "id": 870,
                "email": "pawel.czyzewski@rocket-internet.de",
                "name": "Pawel Czyzewski",
                "sellerName": "Pawel's Shoes",
                "countryId": "DE",
                "active": false
            }, {
                "id": 590,
                "email": "andrei.dantsiger@rocket-internet.de",
                "name": "Andrei Dantsiger",
                "sellerName": "Andrei's Hats",
                "countryId": "DE",
                "active": true
            }, {
                "id": 803,
                "email": "dan.petrescu@rocket-internet.de",
                "name": "Dan Petrescu",
                "sellerName": "Dan's Bikerwear",
                "countryId": "DE",
                "active": true
            }, {
                "id": 804,
                "email": "sarah.kraynick@rocket-internet.de",
                "name": "Sarah Kraynick",
                "sellerName": "Sarah's Sportswear",
                "countryId": "DE",
                "active": false
            }];

            self.get = function () {
                var defer = $q.defer();
                defer.resolve(sellers);
                return defer.promise;
            };

            self.getOneById = function(id) {
                var defer = $q.defer();
                var local = this;
                local.seller = {};
                sellers.forEach(function (seller) {
                    if (seller.id === id) {
                        local.seller = seller;
                    }
                });
                defer.resolve(local.seller);
                return defer.promise;
            };

            self.updateOne = function (seller) {
                var defer = $q.defer();
                var local = this;
                local.seller = seller;
                users.map(function (seller) {
                    if (local.seller.id === seller.id) {
                        return local.seller;
                    }
                });
                defer.resolve(local.seller);
                return defer.promise;
            };
        }
    ]
);
