'use strict';

/**
 * @ngdoc function
 * @name scxApp.model:NewsItem
 * @description
 * # NewsItem
 */
function NewsItem(title, description, ago, icon) {
    var self = this;

    self.title = title;
    self.description = description;
    self.ago = ago;
    self.icon = 'notification-icon fa ' + icon;
}
