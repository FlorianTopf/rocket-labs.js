'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:NewsService
 * @description
 * # NewsService
 */
scxApp.service('NewsService',
    ['$q', '$sce',
        function ($q, $sce) {
            var self = this;

            var news = [
                new NewsItem(
                    'SYSTEM',
                    $sce.trustAsHtml(
                        '<strong>Error 500</strong>: Syntax error in index.php at line <strong>461</strong>.'
                    ),
                    '12h ago',
                    'fa-hdd-o bg-danger'
                ),
                new NewsItem(
                    'STORE',
                    $sce.trustAsHtml(
                        'You have <strong>9</strong> new orders.'
                    ),
                    '12h ago',
                    'fa-truck bg-info'
                ),
                new NewsItem(
                    'CRON DAEMON',
                    $sce.trustAsHtml(
                        'Job <strong>"Clean DB"</strong> has been completed.'
                    ),
                    '12h ago',
                    'fa-clock-o bg-default'
                ),
                new NewsItem(
                    'SYSTEM',
                    $sce.trustAsHtml(
                        'Server <strong>up</strong>'
                    ),
                    '12h ago',
                    'fa-hdd-o bg-success'
                ),
                new NewsItem(
                    'SYSTEM',
                    $sce.trustAsHtml(
                        '<strong>Warning</strong>: Processor load <strong>92%</strong>.'
                    ),
                    '12h ago',
                    'fa-hdd-o bg-warning'
                ),
                new NewsItem(
                    'SYSTEM',
                    $sce.trustAsHtml(
                        '<strong>Error 500</strong>: Syntax error in index.php at line <strong>461</strong>.'
                    ),
                    '12h ago',
                    'fa-hdd-o bg-danger'
                ),
                new NewsItem(
                    'STORE',
                    $sce.trustAsHtml(
                        'You have <strong>9</strong> new orders.'
                    ),
                    '12h ago',
                    'fa-truck bg-info'
                )
            ];

            self.get = function () {
                var defer = $q.defer();
                defer.resolve(news);
                return defer.promise;
            };
        }
    ]
);
