'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the scxApp news widget
 */
scxApp.controller(
    'NewsCtrl',
    ['$scope', 'NewsService',
        function ($scope, NewsService) {
            var self = $scope.vm = this;
            self.name = 'News from Seller Center';

            NewsService.get().then(
                function (news) {
                    self.news = news;
                },
                function (error) {
                    // error case is handled here
                }
            );
        }
    ]
);
