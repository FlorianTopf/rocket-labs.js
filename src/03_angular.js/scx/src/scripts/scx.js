'use strict';

/**
 * @ngdoc overview
 * @name scxApp
 * @description
 * # scxApp
 *
 * Main module of the application.
 */
var scxApp = angular.module(
    'scxApp',
    [
        'ui.router',
        'uiSwitch',
        'validation.match',
        'datatables',
        'datatables.bootstrap',
        'ngSanitize',
        'ngResource'
    ]
);

scxApp.constant('viewBaseUrl', 'scripts/views/');
scxApp.constant('templateBaseUrl', 'scripts/views/templates/');
scxApp.constant('apiBaseUrl', 'frontend-api/');

scxApp.run(['$rootScope', '$window', function ($rootScope, $window) {
    $rootScope.windowWidth = $window.outerWidth;
    angular.element($window).bind('resize', function () {
        $rootScope.windowWidth = $window.outerWidth;
        $rootScope.$apply('windowWidth');
    })
}]);

scxApp.config(['$stateProvider', '$urlRouterProvider', 'viewBaseUrl',
        function ($stateProvider, $urlRouterProvider, viewBaseUrl) {
            $urlRouterProvider.otherwise('/login');

            // TODO we need to check on page reload if a session exists
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: viewBaseUrl + 'login.html',
                controller: 'LoginCtrl'
            }).state('recover', {
                url: '/recover',
                templateUrl: viewBaseUrl + 'recover.html',
                controller: 'LoginCtrl'
            }).state('scx', {
                abstract: true,
                templateUrl: viewBaseUrl + 'index.html',
                controller: 'IndexCtrl'
            }).state('scx.dashboard', {
                abstract: true,
                templateUrl: viewBaseUrl + 'dashboard.html',
                resolve: {
                    session: function (UserService, $state, $timeout) {
                        if (UserService.isSessionActive) {
                            console.log('SUCCESS');
                        } else {
                            $timeout($state.transitionTo('login'));
                        }
                    }
                },
                controller: 'DashboardCtrl'
            }).state('scx.dashboard.widgets', {
                url: '/dashboard',
                views: {
                    products: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'ProductsCtrl'
                    },
                    orders: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'OrdersCtrl'
                    },
                    reports: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'ReportsCtrl'
                    },
                    status: {
                        template: '<widget-dir></widget-dir>',
                        controller: 'StatusCtrl'
                    },
                    news: {
                        templateUrl: viewBaseUrl + 'news.html',
                        controller: 'NewsCtrl'
                    }
                }
            }).state('scx.user-setup', {
                url: '/user-setup',
                templateUrl: viewBaseUrl + 'userSetup.html',
                controller: 'UserSetupCtrl'
            }).state('scx.user-add', {
                url: '/user-add/:id',
                templateUrl: viewBaseUrl + 'userAddEdit.html',
                controller: 'UserAddEditCtrl'
            }).state('scx.seller-setup', {
                url: '/seller-setup',
                templateUrl: viewBaseUrl + 'sellerSetup.html',
                controller: 'SellerSetupCtrl'
            }).state('scx.seller-add', {
                url: '/seller-add/:id',
                templateUrl: viewBaseUrl + 'sellerAddEdit.html',
                controller: 'SellerAddEditCtrl'
            }).state('scx.cms-setup', {
                url: '/cms-setup',
                templateUrl: viewBaseUrl + 'cmsSetup.html',
                controller: 'CmsSetupCtrl'
            });
        }
    ]
);

'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:mainMenuDir
 * @description
 * # mainMenuDir
 */
scxApp.directive('mainMenuDir',
    ['templateBaseUrl', function (templateBaseUrl) {
        return {
            templateUrl: templateBaseUrl + 'mainMenuDir.html',
            restrict: 'E',
            scope: true,
            replace: false,
            link: function ($scope, $element, $attrs) {
                // add dom actions here
            }
        };
    }]
);

'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:pageHeaderDir
 * @description
 * # pageHeaderDir
 */
scxApp.directive('pageHeaderDir',
    ['templateBaseUrl', function (templateBaseUrl) {
        return {
            templateUrl: templateBaseUrl + 'pageHeaderDir.html',
            transclude: true,
            restrict: 'EA',
            scope: {
                path: "=",
                icon: "@"
            },
            replace: false,
            link: function ($scope, $element, $attrs) {
                // add dom actions here
            }
        };
    }]
);
'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:topMenuDir
 * @description
 * # topMenuDir
 */
scxApp.directive('topMenuDir',
    ['templateBaseUrl', '$timeout',
        function (templateBaseUrl, $timeout) {
            function topMenuCtrl($scope, $element, $attrs) {
                var self = $scope.vm = this;
                self.windowWith = null;

                // watching the window width to remove menu classes
                $scope.$watch('windowWidth', function (newVal, oldVal) {
                    self.windowWidth = newVal;
                    $timeout(function () {
                        console.log(newVal);
                        if (newVal < 768) {
                            angular.element('body').removeClass('mmc');
                        } else {
                            angular.element('body').removeClass('mme');
                        }

                    });
                });

                // toggle menu with classes and window width
                self.toggleMainMenu = function () {
                    var bodyClasses = angular.element('body').attr('class');
                    if ((bodyClasses.indexOf('mmc') === -1) && (self.windowWidth > 767)) {
                        angular.element('body').addClass('mmc');
                    } else if ((bodyClasses.indexOf('mme') === -1) && (self.windowWidth < 768)) {
                        angular.element('body').addClass('mme');
                    } else {
                        angular.element('body').removeClass('mmc');
                        angular.element('body').removeClass('mme');
                    }
                };
            }

            return {
                templateUrl: templateBaseUrl + 'topMenuDir.html',
                transclude: true,
                restrict: 'E',
                scope: true,
                replace: false,
                controller: topMenuCtrl
            };
        }
    ]
);

'use strict';

/**
 * @ngdoc directive
 * @name scxApp.directive:widgetDir
 * @description
 * # widgetDir
 */
scxApp.directive('widgetDir',
    ['templateBaseUrl',
        function (templateBaseUrl) {
            return {
                templateUrl: templateBaseUrl + 'widgetDir.html',
                transclude: true,
                restrict: 'E',
                scope: true,
                replace: false,
                link: function ($scope, $element, $attrs) {
                    // add dom actions here
                }

            };
        }
    ]
);

'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:CountryService
 * @description
 * # CountryService
 */
scxApp.factory('CountryService',
    ['$q',
        function ($q) {
            return {
                get: function () {
                    var defer = $q.defer();
                    defer.resolve([
                        {
                            code: 'AF',
                            name: 'Afghanistan'
                        }, {
                            code: 'AL',
                            name: 'Albania'
                        }, {
                            code: 'DZ',
                            name: 'Algeria'
                        }, {
                            code: 'AS',
                            name: 'American Samoa'
                        }, {
                            code: 'AD',
                            name: 'Andorre'
                        }, {
                            code: 'AO',
                            name: 'Angola'
                        }, {
                            code: 'AI',
                            name: 'Anguilla'
                        }, {
                            code: 'AQ',
                            name: 'Antarctica'
                        }, {
                            code: 'AG',
                            name: 'Antigua and Barbuda'
                        }, {
                            code: 'AR',
                            name: 'Argentina'
                        }, {
                            code: 'AM',
                            name: 'Armenia'
                        }, {
                            code: 'AW',
                            name: 'Aruba'
                        }, {
                            code: 'AU',
                            name: 'Australia'
                        }, {
                            code: 'AT',
                            name: 'Austria'
                        }, {
                            code: 'AZ',
                            name: 'Azerbaijan'
                        }, {
                            code: 'BS',
                            name: 'Bahamas'
                        }, {
                            code: 'BH',
                            name: 'Bahrain'
                        }, {
                            code: 'BD',
                            name: 'Bangladesh'
                        }, {
                            code: 'BB',
                            name: 'Barbade'
                        }, {
                            code: 'BY',
                            name: 'Belarus'
                        }, {
                            code: 'BE',
                            name: 'Belgium'
                        }, {
                            code: 'BZ',
                            name: 'Belize'
                        }, {
                            code: 'BJ',
                            name: 'Benin'
                        }, {
                            code: 'BM',
                            name: 'Bermuda'
                        }, {
                            code: 'BT',
                            name: 'Bhutan'
                        }, {
                            code: 'BO',
                            name: 'Bolivia'
                        }, {
                            code: 'BQ',
                            name: 'Bonaire, Sint Eustatius and Saba'
                        }, {
                            code: 'BA',
                            name: 'Bosnia and Herzegovina'
                        }, {
                            code: 'BW',
                            name: 'Botswana'
                        }, {
                            code: 'BV',
                            name: 'Bouvet Island'
                        }, {
                            code: 'BR',
                            name: 'Brazil'
                        }, {
                            code: 'IO',
                            name: 'British Indian Ocean Territory'
                        }, {
                            code: 'VG',
                            name: 'British Virgin Islands'
                        }, {
                            code: 'BN',
                            name: 'Brunei'
                        }, {
                            code: 'BG',
                            name: 'Bulgaria'
                        }, {
                            code: 'BF',
                            name: 'Burkina Faso'
                        }, {
                            code: 'BI',
                            name: 'Burundi'
                        }, {
                            code: 'KH',
                            name: 'Cambodia'
                        }, {
                            code: 'CM',
                            name: 'Cameroon'
                        }, {
                            code: 'CA',
                            name: 'Canada'
                        }, {
                            code: 'CV',
                            name: 'Cape Verde'
                        }, {
                            code: 'KY',
                            name: 'Cayman Islands'
                        }, {
                            code: 'CF',
                            name: 'Central African Republic'
                        }, {
                            code: 'TD',
                            name: 'Chad'
                        }, {
                            code: 'CL',
                            name: 'Chile'
                        }, {
                            code: 'CN',
                            name: 'China'
                        }, {
                            code: 'CX',
                            name: 'Christmas Island'
                        }, {
                            code: 'CC',
                            name: 'Cocos (Keeling) Islands'
                        }, {
                            code: 'CO',
                            name: 'Colombia'
                        }, {
                            code: 'KM',
                            name: 'Comoros'
                        }, {
                            code: 'CG',
                            name: 'Congo'
                        }, {
                            code: 'CD',
                            name: 'Congo (Dem. Rep.)'
                        }, {
                            code: 'CK',
                            name: 'Cook Islands'
                        }, {
                            code: 'CR',
                            name: 'Costa Rica'
                        }, {
                            code: 'ME',
                            name: 'Crna Gora'
                        }, {
                            code: 'HR',
                            name: 'Croatia'
                        }, {
                            code: 'CU',
                            name: 'Cuba'
                        }, {
                            code: 'CW',
                            name: 'Curaçao'
                        }, {
                            code: 'CY',
                            name: 'Cyprus'
                        }, {
                            code: 'CZ',
                            name: 'Czech Republic'
                        }, {
                            code: 'CI',
                            name: "Côte D'Ivoire"
                        }, {
                            code: 'DK',
                            name: 'Denmark'
                        }, {
                            code: 'DJ',
                            name: 'Djibouti'
                        }, {
                            code: 'DM',
                            name: 'Dominica'
                        }, {
                            code: 'DO',
                            name: 'Dominican Republic'
                        }, {
                            code: 'TL',
                            name: 'East Timor'
                        }, {
                            code: 'EC',
                            name: 'Ecuador'
                        }, {
                            code: 'EG',
                            name: 'Egypt'
                        }, {
                            code: 'SV',
                            name: 'El Salvador'
                        }, {
                            code: 'GQ',
                            name: 'Equatorial Guinea'
                        }, {
                            code: 'ER',
                            name: 'Eritrea'
                        }, {
                            code: 'EE',
                            name: 'Estonia'
                        }, {
                            code: 'ET',
                            name: 'Ethiopia'
                        }, {
                            code: 'FK',
                            name: 'Falkland Islands'
                        }, {
                            code: 'FO',
                            name: 'Faroe Islands'
                        }, {
                            code: 'FJ',
                            name: 'Fiji'
                        }, {
                            code: 'FI',
                            name: 'Finland'
                        }, {
                            code: 'FR',
                            name: 'France'
                        }, {
                            code: 'GF',
                            name: 'French Guiana'
                        }, {
                            code: 'PF',
                            name: 'French Polynesia'
                        }, {
                            code: 'TF',
                            name: 'French Southern Territories'
                        }, {
                            code: 'GA',
                            name: 'Gabon'
                        }, {
                            code: 'GM',
                            name: 'Gambia'
                        }, {
                            code: 'GE',
                            name: 'Georgia'
                        }, {
                            code: 'DE',
                            name: 'Germany'
                        }, {
                            code: 'GH',
                            name: 'Ghana'
                        }, {
                            code: 'GI',
                            name: 'Gibraltar'
                        }, {
                            code: 'GR',
                            name: 'Greece'
                        }, {
                            code: 'GL',
                            name: 'Greenland'
                        }, {
                            code: 'GD',
                            name: 'Grenada'
                        }, {
                            code: 'GP',
                            name: 'Guadeloupe'
                        }, {
                            code: 'GU',
                            name: 'Guam'
                        }, {
                            code: 'GT',
                            name: 'Guatemala'
                        }, {
                            code: 'GG',
                            name: 'Guernsey and Alderney'
                        }, {
                            code: 'GN',
                            name: 'Guinea'
                        }, {
                            code: 'GW',
                            name: 'Guinea-Bissau'
                        }, {
                            code: 'GY',
                            name: 'Guyana'
                        }, {
                            code: 'HT',
                            name: 'Haiti'
                        }, {
                            code: 'HM',
                            name: 'Heard and McDonald Islands'
                        }, {
                            code: 'HN',
                            name: 'Honduras'
                        }, {
                            code: 'HK',
                            name: 'Hong Kong'
                        }, {
                            code: 'HU',
                            name: 'Hungary'
                        }, {
                            code: 'IS',
                            name: 'Iceland'
                        }, {
                            code: 'IN',
                            name: 'India'
                        }, {
                            code: 'ID',
                            name: 'Indonesia'
                        }, {
                            code: 'IR',
                            name: 'Iran'
                        }, {
                            code: 'IQ',
                            name: 'Iraq'
                        }, {
                            code: 'IE',
                            name: 'Ireland'
                        }, {
                            code: 'IM',
                            name: 'Isle of Man'
                        }, {
                            code: 'IL',
                            name: 'Israel'
                        }, {
                            code: 'IT',
                            name: 'Italy'
                        }, {
                            code: 'JM',
                            name: 'Jamaica'
                        }, {
                            code: 'JP',
                            name: 'Japan'
                        }, {
                            code: 'JE',
                            name: 'Jersey'
                        }, {
                            code: 'JO',
                            name: 'Jordan'
                        }, {
                            code: 'KZ',
                            name: 'Kazakhstan'
                        }, {
                            code: 'KE',
                            name: 'Kenya'
                        }, {
                            code: 'KI',
                            name: 'Kiribati'
                        }, {
                            code: 'KP',
                            name: 'Korea (North)'
                        }, {
                            code: 'KR',
                            name: 'Korea (South)'
                        }, {
                            code: 'KW',
                            name: 'Kuwait'
                        }, {
                            code: 'KG',
                            name: 'Kyrgyzstan'
                        }, {
                            code: 'LA',
                            name: 'Laos'
                        }, {
                            code: 'LV',
                            name: 'Latvia'
                        }, {
                            code: 'LB',
                            name: 'Lebanon'
                        }, {
                            code: 'LS',
                            name: 'Lesotho'
                        }, {
                            code: 'LR',
                            name: 'Liberia'
                        }, {
                            code: 'LY',
                            name: 'Libya'
                        }, {
                            code: 'LI',
                            name: 'Liechtenstein'
                        }, {
                            code: 'LT',
                            name: 'Lithuania'
                        }, {
                            code: 'LU',
                            name: 'Luxembourg'
                        }, {
                            code: 'MO',
                            name: 'Macao'
                        }, {
                            code: 'MK',
                            name: 'Macedonia'
                        }, {
                            code: 'MG',
                            name: 'Madagascar'
                        }, {
                            code: 'MW',
                            name: 'Malawi'
                        }, {
                            code: 'MY',
                            name: 'Malaysia'
                        }, {
                            code: 'MV',
                            name: 'Maldives'
                        }, {
                            code: 'ML',
                            name: 'Mali'
                        }, {
                            code: 'MT',
                            name: 'Malta'
                        }, {
                            code: 'MH',
                            name: 'Marshall Islands'
                        }, {
                            code: 'MQ',
                            name: 'Martinique'
                        }, {
                            code: 'MR',
                            name: 'Mauritania'
                        }, {
                            code: 'MU',
                            name: 'Mauritius'
                        }, {
                            code: 'YT',
                            name: 'Mayotte'
                        }, {
                            code: 'MX',
                            name: 'Mexico'
                        }, {
                            code: 'FM',
                            name: 'Micronesia'
                        }, {
                            code: 'MD',
                            name: 'Moldova'
                        }, {
                            code: 'MC',
                            name: 'Monaco'
                        }, {
                            code: 'MN',
                            name: 'Mongolia'
                        }, {
                            code: 'MS',
                            name: 'Montserrat'
                        }, {
                            code: 'MA',
                            name: 'Morocco'
                        }, {
                            code: 'MZ',
                            name: 'Mozambique'
                        }, {
                            code: 'MM',
                            name: 'Myanmar'
                        }, {
                            code: 'NA',
                            name: 'Namibia'
                        }, {
                            code: 'NR',
                            name: 'Nauru'
                        }, {
                            code: 'NP',
                            name: 'Nepal'
                        }, {
                            code: 'NL',
                            name: 'Netherlands'
                        }, {
                            code: 'AN',
                            name: 'Netherlands Antilles'
                        }, {
                            code: 'NC',
                            name: 'New Caledonia'
                        }, {
                            code: 'NZ',
                            name: 'New Zealand'
                        }, {
                            code: 'NI',
                            name: 'Nicaragua'
                        }, {
                            code: 'NE',
                            name: 'Niger'
                        }, {
                            code: 'NG',
                            name: 'Nigeria'
                        }, {
                            code: 'NU',
                            name: 'Niue'
                        }, {
                            code: 'NF',
                            name: 'Norfolk Island'
                        }, {
                            code: 'MP',
                            name: 'Northern Mariana Islands'
                        }, {
                            code: 'NO',
                            name: 'Norway'
                        }, {
                            code: 'OM',
                            name: 'Oman'
                        }, {
                            code: 'PK',
                            name: 'Pakistan'
                        }, {
                            code: 'PW',
                            name: 'Palau'
                        }, {
                            code: 'PS',
                            name: 'Palestine'
                        }, {
                            code: 'PA',
                            name: 'Panama'
                        }, {
                            code: 'PG',
                            name: 'Papua New Guinea'
                        }, {
                            code: 'PY',
                            name: 'Paraguay'
                        }, {
                            code: 'PE',
                            name: 'Peru'
                        }, {
                            code: 'PH',
                            name: 'Philippines'
                        }, {
                            code: 'PN',
                            name: 'Pitcairn'
                        }, {
                            code: 'PL',
                            name: 'Poland'
                        }, {
                            code: 'PT',
                            name: 'Portugal'
                        }, {
                            code: 'PR',
                            name: 'Puerto Rico'
                        }, {
                            code: 'QA',
                            name: 'Qatar'
                        }, {
                            code: 'RO',
                            name: 'Romania'
                        }, {
                            code: 'RU',
                            name: 'Russia'
                        }, {
                            code: 'RW',
                            name: 'Rwanda'
                        }, {
                            code: 'RE',
                            name: 'Réunion'
                        }, {
                            code: 'BL',
                            name: 'Saint Barthélemy'
                        }, {
                            code: 'SH',
                            name: 'Saint Helena'
                        }, {
                            code: 'KN',
                            name: 'Saint Kitts and Nevis'
                        }, {
                            code: 'LC',
                            name: 'Saint Lucia'
                        }, {
                            code: 'MF',
                            name: 'Saint Martin'
                        }, {
                            code: 'PM',
                            name: 'Saint Pierre and Miquelon'
                        }, {
                            code: 'VC',
                            name: 'Saint Vincent and the Grenadines'
                        }, {
                            code: 'WS',
                            name: 'Samoa'
                        }, {
                            code: 'SM',
                            name: 'San Marino'
                        }, {
                            code: 'SA',
                            name: 'Saudi Arabia'
                        }, {
                            code: 'SN',
                            name: 'Senegal'
                        }, {
                            code: 'RS',
                            name: 'Serbia'
                        }, {
                            code: 'SC',
                            name: 'Seychelles'
                        }, {
                            code: 'SL',
                            name: 'Sierra Leone'
                        }, {
                            code: 'SG',
                            name: 'Singapore'
                        }, {
                            code: 'SX',
                            name: 'Sint Maarten'
                        }, {
                            code: 'SK',
                            name: 'Slovakia'
                        }, {
                            code: 'SI',
                            name: 'Slovenia'
                        }, {
                            code: 'SB',
                            name: 'Solomon Islands'
                        }, {
                            code: 'SO',
                            name: 'Somalia'
                        }, {
                            code: 'ZA',
                            name: 'South Africa'
                        }, {
                            code: 'GS',
                            name: 'South Georgia and the South Sandwich Islands'
                        }, {
                            code: 'SS',
                            name: 'South Sudan'
                        }, {
                            code: 'ES',
                            name: 'Spain'
                        }, {
                            code: 'LK',
                            name: 'Sri Lanka'
                        }, {
                            code: 'SD',
                            name: 'Sudan'
                        }, {
                            code: 'SR',
                            name: 'Suriname'
                        }, {
                            code: 'SJ',
                            name: 'Svalbard and Jan Mayen'
                        }, {
                            code: 'SZ',
                            name: 'Swaziland'
                        }, {
                            code: 'SE',
                            name: 'Sweden'
                        }, {
                            code: 'CH',
                            name: 'Switzerland'
                        }, {
                            code: 'SY',
                            name: 'Syria'
                        }, {
                            code: 'ST',
                            name: 'São Tomé and Príncipe'
                        }, {
                            code: 'TW',
                            name: 'Taiwan'
                        }, {
                            code: 'TJ',
                            name: 'Tajikistan'
                        }, {
                            code: 'TZ',
                            name: 'Tanzania'
                        }, {
                            code: 'TH',
                            name: 'Thailand'
                        }, {
                            code: 'TG',
                            name: 'Togo'
                        }, {
                            code: 'TK',
                            name: 'Tokelau'
                        }, {
                            code: 'TO',
                            name: 'Tonga'
                        }, {
                            code: 'TT',
                            name: 'Trinidad and Tobago'
                        }, {
                            code: 'TN',
                            name: 'Tunisia'
                        }, {
                            code: 'TR',
                            name: 'Turkey'
                        }, {
                            code: 'TM',
                            name: 'Turkmenistan'
                        }, {
                            code: 'TC',
                            name: 'Turks and Caicos Islands'
                        }, {
                            code: 'TV',
                            name: 'Tuvalu'
                        }, {
                            code: 'UG',
                            name: 'Uganda'
                        }, {
                            code: 'UA',
                            name: 'Ukraine'
                        }, {
                            code: 'AE',
                            name: 'United Arab Emirates'
                        }, {
                            code: 'GB',
                            name: 'United Kingdom'
                        }, {
                            code: 'UM',
                            name: 'United States Minor Outlying Islands'
                        }, {
                            code: 'US',
                            name: 'United States of America'
                        }, {
                            code: 'UY',
                            name: 'Uruguay'
                        }, {
                            code: 'UZ',
                            name: 'Uzbekistan'
                        }, {
                            code: 'VU',
                            name: 'Vanuatu'
                        }, {
                            code: 'VA',
                            name: 'Vatican City'
                        }, {
                            code: 'VE',
                            name: 'Venezuela'
                        }, {
                            code: 'VN',
                            name: 'Vietnam'
                        }, {
                            code: 'VI',
                            name: 'Virgin Islands of the United States'
                        }, {
                            code: 'WF',
                            name: 'Wallis and Futuna'
                        }, {
                            code: 'EH',
                            name: 'Western Sahara'
                        }, {
                            code: 'YE',
                            name: 'Yemen'
                        }, {
                            code: 'ZM',
                            name: 'Zambia'
                        }, {
                            code: 'ZW',
                            name: 'Zimbabwe'
                        }, {
                            code: 'AX',
                            name: 'Åland Islands'
                        }
                    ]);

                    return defer.promise;
                }
            }
        }
    ]
);

'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:DataTableService
 * @description
 * # DataTableService
 */
scxApp.factory('DataTableService',
    ['DTOptionsBuilder', 'DTColumnDefBuilder',
        function (DTOptionsBuilder, DTColumnDefBuilder) {
            return {
                getOptions: function () {
                    return DTOptionsBuilder.newOptions()
                        .withPaginationType('full_numbers')
                        .withDisplayLength(10)
                        .withBootstrap()
                        .withLanguage({
                            sLengthMenu: "Per page: _MENU_",
                            sSearch: ""
                        })
                        .withDOM(
                            "<'table-header clearfix'<'table-caption'>" +
                            "<'DT-lf-right'<'DT-per-page'l><'DT-search'f>>r>" +
                            "t" + "<'table-footer clearfix'<'DT-label'i><'DT-pagination'p>>"
                        );
                },
                getColumnDefs: function (columns, notSortable) {
                    var columnDefinitions = [];

                    for (var i = 1; i <= columns; i++) {
                        if (notSortable.indexOf(i) === -1) {
                            columnDefinitions.push(
                                new DTColumnDefBuilder.newColumnDef(i-1)
                            );
                        } else {
                            columnDefinitions.push(
                                new DTColumnDefBuilder.newColumnDef(i-1).notSortable()
                            );
                        }
                    }

                    return columnDefinitions;
                }
            }
        }
    ]
);

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

'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:StatisticsService
 * @description
 * # ProductsService
 */
scxApp.service('StatisticsService',
    ['$q',
        function ($q) {
            var self = this;

            var products = [
                new WidgetItem('Indonesia', 14, 'info', '#id-products'),
                new WidgetItem('Malaysia', 7, 'warning', '#my-products'),
                new WidgetItem('Thailand', 11, 'danger', '#th-products'),
                new WidgetItem('Singapore', 5, 'success', '#sp-products')
            ];

            var orders = [
                new WidgetItem('Indonesia', 14, 'info', '#id-products'),
                new WidgetItem('Malaysia', 7, 'warning', '#my-products'),
                new WidgetItem('Thailand', 11, 'danger', '#th-products'),
                new WidgetItem('Singapore', 5, 'success', '#sp-products')
            ];

            var reports = [
                { name: 'Indonesia', url: '#id-reports' },
                { name: 'Malaysia', url: '#my-reports' },
                { name: 'Thailand', url: '#th-reports' },
                { name: 'Singapore', url: '#sp-reports' }
            ];

            var status = [
                { name: 'Indonesia', url: '#id-status' },
                { name: 'Malaysia', url: '#my-status' },
                { name: 'Thailand', url: '#th-status' },
                { name: 'Singapore', url: '#sp-status' }
            ];

            self.getProducts = function () {
                var defer = $q.defer();
                defer.resolve(products);
                return defer.promise;
            };

            self.getOrders = function () {
                var defer = $q.defer();
                defer.resolve(orders);
                return defer.promise;
            };

            self.getReports = function () {
                var defer = $q.defer();
                defer.resolve(reports);
                return defer.promise;
            };

            self.getStatus = function () {
                var defer = $q.defer();
                defer.resolve(status);
                return defer.promise;
            }
        }
    ]
);

'use strict';

/**
 * @ngdoc service
 * @name scxApp.service:UserService
 * @description
 * # UserService
 */
scxApp.service('UserService',
    ['$q', '$resource', 'apiBaseUrl',
        function ($q, $resource, apiBaseUrl) {
            var self = this;

            var roles = [
                { id: 1, name: 'Maintenance' },
                { id: 2, name: 'Administrator' },
                { id: 3, name: 'Seller' }
            ];

            // defines if a session is active
            self.isSessionActive = false;
            // saves logged in user
            self.activeUser = null;

            // TODO save the current page of users to save requests
            // TODO we should check also current offset to be sure
            self.users = [];

            self.setUsers = function (users) {
                self.users = users;
            };

            self.getRoles = function () {
                return roles;
            };

            self.getRoleNameById = function (id) {
                var local = this;
                local.role = null;
                self.getRoles().forEach(function (role) {
                    if (role.id === id) {
                        local.role = role.name;
                    }
                });
                return local.role
            };

            self.login = function (credentials) {
                var session = $resource(
                    apiBaseUrl + 'sessions'
                ).save(credentials);
                return session.$promise;
            };

            self.logout = function () {
                var session = $resource(
                    apiBaseUrl + 'sessions'
                ).delete();
                return session.$promise;
            };

            self.getAll = function () {
                var users = $resource(
                    apiBaseUrl + 'users'
                ).query();
                return users.$promise;
            };

            self.getOneById = function (userId) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' }
                ).get({ id: userId });
                return user.$promise;
            };

            self.addOne = function (newUser) {
                var user = $resource(
                    apiBaseUrl + 'users'
                ).save(newUser);
                return user.$promise;
            };

            self.deleteOne = function (userId) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' }
                ).delete({ id: userId });
                return user.$promise;
            };

            self.updateStatusOne = function (userId, status) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' },
                    { 'update': { method: 'PATCH' }}
                ).update({ id: userId }, { active: status });
                return user.$promise;
            };

            self.updateOne = function (userId, updateUser) {
                var user = $resource(
                    apiBaseUrl + 'users/:id',
                    { id: '@id' },
                    { 'update': { method: 'PUT' }}
                ).update({ id: userId }, updateUser);
                return user.$promise;
            };
        }
    ]
);

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

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:CmsSetupCtrl
 * @description
 * # CmsSetupCtrl
 * Controller of the scxApp cms setup page
 */
scxApp.controller(
    'CmsSetupCtrl',
    ['$scope',
        function ($scope) {
            var self = $scope.vm = this;
            self.path = [{name: 'CMS Setup', link: 'scx.cms-setup'}];
        }
    ]
);

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the scxApp dashboard overview
 */
scxApp.controller(
    'DashboardCtrl',
    ['$scope',
        function ($scope) {
            var self = $scope.vm = this;
            self.path = [{ name: 'Dashboard', link: 'scx.dashboard.widgets' }];
        }
    ]
);

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the scxApp main view
 * Navigation and placeholder for content
 */
scxApp.controller(
    'IndexCtrl',
    ['$scope', '$state', 'UserService',
        function ($scope, $state, UserService) {
            $scope.vm = this;

            // this is made accessible to child scopes (navigation)
            $scope.logoutUser = function () {
                UserService.logout().then(
                    function (success) {
                        console.log(success);
                        UserService.isSessionActive = false;
                        $state.go('login');
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };
        }
    ]
);

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the scxApp base view for sellers
 */
scxApp.controller(
    'LoginCtrl',
    ['$scope', '$window', '$state', 'UserService',
        function ($scope, $window, $state, UserService) {
            var self = $scope.vm = this;
            self.form = {};
            self.submitted = false;

            self.loginUser = function (form) {
                self.submitted = true;
                if (form.$valid) {
                    // call service to submit data
                    UserService.login(self.form).then(
                        function (user) {
                            UserService.activeUser = user;
                            UserService.isSessionActive = true;
                            $state.go('scx.dashboard.widgets');
                        },
                        function (error) {
                            // error case is handled here
                            console.log(error.data);
                        }
                    );
                } else {
                    console.log('error');
                }
            };

            self.recoverPassword = function (form) {
                if (form.$valid) {
                    // call service to submit data
                    console.log(self.form);
                    $window.alert('Recover E-Mail sent');
                } else {
                    $window.alert('Error');
                }

            };
        }
    ]
);

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

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the scxApp orders widget
 */
scxApp.controller(
    'OrdersCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Orders';
            var subTitle = 'See all pending orders';
            var color = 'info';
            var icon = 'fa-shopping-cart';

            StatisticsService.getOrders().then(function(orders) {
                $scope.vm = new Widget(title, subTitle, orders, color, icon);
            });
        }
    ]
);

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the scxApp products widget
 */
scxApp.controller(
    'ProductsCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Products';
            var subTitle = 'See all live products';
            var color = 'success';
            var icon = 'fa-gift';

            StatisticsService.getProducts().then(function (products) {
                $scope.vm = new Widget(title, subTitle, products, color, icon);
            });
        }
    ]
);

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the scxApp reports widget
 */
scxApp.controller(
    'ReportsCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Reports';
            var subTitle = 'See all reports';
            var color = 'purple';
            var icon = 'fa-bar-chart-o';

            StatisticsService.getReports().then(function(reports) {
                $scope.vm = new Widget(title, subTitle, reports, color, icon);
            });
        }
    ]
);

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

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:ProductsCtrl
 * @description
 * # StatusCtrl
 * Controller of the scxApp status widget
 */
scxApp.controller(
    'StatusCtrl',
    ['$scope', 'StatisticsService',
        function ($scope, StatisticsService) {
            var title = 'Country Navigation';
            var subTitle = 'Connected Seller Center instances';
            var color = 'danger';
            var icon = 'fa-exclamation-triangle';

            StatisticsService.getStatus().then(function(status) {
                $scope.vm = new Widget(title, subTitle, status, color, icon);
            });
        }
    ]
);

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:UserAddCtrl
 * @description
 * # UserAddCtrl
 * Controller of the scxApp user add page
 */
scxApp.controller(
    'UserAddEditCtrl',
    ['$scope', '$state', '$stateParams', '$timeout', 'UserService',
        function ($scope, $state, $stateParams, $timeout, UserService) {
            var self = $scope.vm = this;
            self.roles =  UserService.getRoles();
            self.form = {};
            self.userId = null;
            self.submitted = false;
            self.success = false;

            self.submit = function (form) {
                self.submitted = true;
                if (self.userId === null) {
                    self.addUser(form);
                } else {
                    self.updateUser(self.userId, form);
                }
            };

            self.addUser = function (form) {
                if (form.$valid) {
                    // call service to submit data
                    UserService.addOne(self.form).then(
                        // returns the full updated user
                        function (user) {
                            console.log(user);
                            self.success = true;
                            $timeout(function () {
                                self.success = false;
                            }, 3000);
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                } else {
                    console.log(form.passwordConfirm.$error);
                }
            };

            self.updateUser = function (userId, form) {
                if (form.$valid) {
                    // call service to submit data
                    UserService.updateOne(userId, self.form).then(
                        // returns the full updated user
                        function (user) {
                            console.log(user);
                            self.success = true;
                            $timeout(function () {
                                self.success = false;
                            }, 3000);
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                } else {
                    console.log(form.passwordConfirm.$error);
                }
            };

            self.empty = function (item) {
                return (item.trim().length === 0);
            };

            var initialise = function (userId) {
                if (false === self.empty(userId)) {
                    self.userId = parseInt(userId);
                    UserService.getOneById(self.userId).then(
                        function (user) {
                            self.path = [
                                {name: 'User Setup', link: 'scx.user-setup'},
                                {name: 'Edit User', link: 'scx.user-add'}
                            ];
                            self.form = user;
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                } else {
                    self.path = [
                        {name: 'User Setup', link: 'scx.user-setup'},
                        {name: 'Add User', link: 'scx.user-add'}
                    ];
                }
            }

            // initialisation
            initialise($stateParams.id);

        }
    ]
);

'use strict';

/**
 * @ngdoc function
 * @name scxApp.controller:UserSetupCtrl
 * @description
 * # UserSetupCtrl
 * Controller of the scxApp user setup page
 */
scxApp.controller(
    'UserSetupCtrl',
    ['$scope', '$window', 'DataTableService', 'UserService',
        function ($scope, $window, DataTableService, UserService) {
            var self = $scope.vm = this;
            self.path = [{ name: 'User Setup', link: 'scx.user-setup' }];

            self.userTableHdrs = ['ID', 'E-Mail', 'Name', 'Role', 'Active', '', ''];
            self.userTableOpts = DataTableService.getOptions();
            self.userTableColDefs = DataTableService.getColumnDefs(7, [6, 7]);

            self.updateUserStatus = function (user) {
                UserService.updateStatusOne(user.id, user.active).then(
                    // returns the full updated user
                    function (user) {
                        console.log(user);
                    },
                    function (error) {
                        // error case is handled here
                    }
                );
            };

            self.deleteUser = function (user) {
                if (confirm('Are you sure?')) {
                    UserService.deleteOne(user.id).then(
                        // returns the full updated user
                        function (success) {
                            console.log(success);
                        },
                        function (error) {
                            // error case is handled here
                        }
                    );
                    // just for the moment
                    initialise();
                }
            };

            self.changeUserPassword = function () {
                return confirm('Are you sure?');
            };

            var initialise = function () {
                UserService.getAll().then(
                    function (users) {
                        self.users = users;
                        UserService.setUsers(users);
                    },
                    function (error) {
                        // error case is handled here
                    }
                );
            };

            // initialisation
            initialise();
        }
    ]
);
