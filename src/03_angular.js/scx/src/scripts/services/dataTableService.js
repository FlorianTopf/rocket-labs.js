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
