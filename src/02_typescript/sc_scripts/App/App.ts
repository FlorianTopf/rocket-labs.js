module sc {
    export module App {
        export var cfg = {
            vendorPrefix: 'App_',
            selElementsToClose: '.chart-popover',
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
        }

        function detectBrowserFeatures(): void {
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

        export function registerService(service: ServiceInterface, name: string) {
            this.services[name] = service;
        }
    }
}
