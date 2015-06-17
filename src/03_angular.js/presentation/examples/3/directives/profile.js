(function (){
    'use strict';

    var productModule = angular.module('SellerCenter_Product');

    productModule.directive('profile', function() {
        return {
            restrict: 'E',
            scope: {
                profile: '=values'
            },
            templateUrl: 'directives/profile.html',
            link: function($scope) {
                $scope.order = false;
                $scope.addVote = function() {
                    ++$scope.profile.rating;
                };
                $scope.addMovie = function(movie) {
                    $scope.profile.movies.push(movie);
                    $scope.newMovie = '';
                    $scope.addingMovie = false;
                };
            }
        };
    });

})();