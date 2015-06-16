'use strict';

/**
 * @ngdoc function
 * @name scxApp.model:widgetItem
 * @description
 * # widgetItem
 */
function WidgetItem(name, amount, style, url) {
    var self = this;

    self.name = name;
    self.amount = amount;
    self.style = 'badge badge-'+ style;
    self.url = url;
}
