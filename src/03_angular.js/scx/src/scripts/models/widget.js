'use strict';

/**
 * @ngdoc function
 * @name scxApp.model:widget
 * @description
 * # widget
 */
function Widget(title, subTitle, items, color, icon) {
    var self = this;

    self.title = title;
    self.subTitle = subTitle;
    self.items = items;

    self.styles = {
        widget: 'panel panel-' + color + ' panel-dark widget-profile',
        icon: 'fa ' + icon,
        listGroup: 'list-group-item list-group-item-' + color
    };

    self.getTotalAmount = function () {
        var total = 0;
        angular.forEach(self.items, function (value) {
            if (value.amount) {
                total += value.amount;
            } else {
                total++;
            }

        });
        return total;
    }
}
