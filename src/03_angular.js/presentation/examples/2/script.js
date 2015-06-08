(function () {

    var productModule = angular.module('SellerCenter_Product', []);

    productModule.controller('MainCtrl', function() {
        this.name = 'Bar';
    });

    productModule.controller('ChildCtrl', function() {
        this.name = 'Child';
    });

    productModule.controller('SecondChildCtrl', function($scope) {
        $scope.name = 'SecondChild';
    });

    productModule.controller('SecondCtrl', function($scope) {
        $scope.name = 'Foo';
    });

})();