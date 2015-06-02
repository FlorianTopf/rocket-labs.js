/// <reference path="../05_modules/jquery.d.ts" />

module sc {
    export interface ControllerOptions {
    }

    interface ControllerInterface {
        new (options: ControllerOptions);
    }

    export class Controller {
        constructor(options: ControllerOptions) {
        }
    }

    export interface ToolInterface {
    }

    export interface FeatureInterface {
    }

    export interface HelperInterface {
    }

    export interface ServiceInterface {
    }

    export module App {
        export var cfg = {
            vendorPrefix: 'App_',
            setElementsToClose: '.chart-popover',
            selProfiler: '#ajax-profiler-block',
            modalAutoSelector: '.modal-auto'
        };

        // we might not need this anymore
        export var controllers: ControllerInterface[] = [];
        export var tools: ToolInterface[] = [];
        export var features: FeatureInterface[] = [];
        export var helpers: HelperInterface[] = [];
        export var services: ServiceInterface[] = [];

        export var runningController: Controller = null;
        export var store = {};

        export var profiler: {isActive: boolean; $el: JQuery} = {
            isActive: false,
            $el: null
        };

        export var browserFeatures: {localStorage: boolean} = {
            localStorage: false
        };

        export function init(): void {
            detectBrowserFeatures();

            // set global AJAX handlers
            let $doc = $(document);
            $doc.ajaxError(
                (e: JQueryEventObject, xhr: JQueryXHR, settings: JQueryAjaxSettings, exception: any): void => {
                    //this.Helper.jsonResponseError(xhr);
                }
            );

            $doc.ajaxSuccess(
                (e: JQueryEventObject, xhr: JQueryXHR, settings: JQueryAjaxSettings): void => {
                    if (xhr.responseJSON && this.profiler.isActive) {
                        //this.Helper.showProfilerData(xhr.responseJSON);
                    }
                }
            );

            // set profiler
            this.profiler.$el = $(this.cfg.selProfiler);
            this.profiler.isActive = this.profiler.$el.length > 0;

            $('header').click(() => {
                $(this.cfg.selElementsToClose).hide();
            });

            // Display modal dialog if exists
            //$(this.cfg.modalAutoSelector).modal();

            //this.Helper.dynamicIframeHeight();

            //this.Helper.collapsibleAlert();

            bindDoubleClickPrevention();
        }

        function detectBrowserFeatures(): void {
            //imitateJson();
            this.browserFeatures.localStorage = supportsLocalStorage();
        }

        /**
         * taken from http://diveintohtml5.info/storage.html
         */
        function supportsLocalStorage(): boolean {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }

        function bindDoubleClickPrevention(): void {
            /*
            $('body').on('click', '.double-click-prevention', function() {
                //get all click events from object and remove them
                let events = $._data(this, "events");

                if (undefined != events && undefined != events.click) {
                    let clickEvents = events.click.slice(),
                        $element = $(this);

                    $element.off('click');

                    //and assign them back them after cooldown period
                    window.setTimeout(function() {
                        clickEvents.forEach(function (e: JQueryEventObject) {
                            $element.on("click", e.handler)
                        });
                    }, 1000);
                }
            });
             */
        }

        /**
         * taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
         */
        function imitateJson(): void {
            //if (window.JSON !== undefined) {
            //    return;
            //}
            //
            //window.JSON = {
            //    parse: function (sJSON: string) {
            //        return eval("(" + sJSON + ")");
            //    },
            //    stringify: function (vContent) {
            //        if (vContent instanceof Object) {
            //            var sOutput = "";
            //            if (vContent.constructor === Array) {
            //                for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
            //                return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
            //            }
            //            if (vContent.toString !== Object.prototype.toString) {
            //                return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\"";
            //            }
            //            for (var sProp in vContent) {
            //                sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
            //            }
            //            return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
            //        }
            //        return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
            //    }
            //};
        }

        export function runController() {
            let ctrlName = $('body').data('ctrl');

            if (!ctrlName) {
                return;
            }

            if (!this.controllers[ctrlName]) {
                throw 'No JS controller found: ' + ctrlName;
            }

            let ctrl = this.controllers[ctrlName],
                options: ControllerOptions = this.getStore('controllerOptions');

            this.runningController = new ctrl(options);
        }

        export function getStore(key: string): string {
            return (key)
                ? this.store[key] || {}
                : this.store || {};
        }

        export function getTranslation(key: string) {
            let translations = this.getStore('generalTranslations');

            return translations[key] || {};
        }
    }
}
