module sc {
    class Application {
        private static cfg = {
            vendorPrefix: 'App_',
            selElementsToClose: '.chart-popover',
            selProfiler: '#ajax-profiler-block',
            modalAutoSelector: '.modal-auto'
        };

        // we might not need this anymore
        public controllers: ControllerInterface[] = [];
        public tools: ToolInterface[] = [];
        public features: FeatureInterface[] = [];
        public helpers: HelperInterface[] = [];
        public services: ServiceInterface[] = [];

        public runningController: Controller = null;
        public store = {};

        public profiler: {isActive: boolean; $el: JQuery} = {
            isActive: false,
            $el: null
        };

        public browserFeatures: {localStorage: boolean} = {
            localStorage: false
        };

        public init(): void {
            this.detectBrowserFeatures();

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
            this.profiler.$el = $(Application.cfg.selProfiler);
            this.profiler.isActive = this.profiler.$el.length > 0;

            $('header').click(() => {
                $(Application.cfg.selElementsToClose).hide();
            });
        }

        private detectBrowserFeatures(): void {
            this.browserFeatures.localStorage = this.supportsLocalStorage();
        }

        /**
         * taken from http://diveintohtml5.info/storage.html
         */
        private supportsLocalStorage(): boolean {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }

        public runController(): void {
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

        public getStore(key: string): any {
            return (key)
                ? this.store[key] || {}
                : this.store || {};
        }

        public getTranslation(key: string): string {
            let translations = this.getStore('generalTranslations');

            return translations[key] || {};
        }
    }

    export var App2 = new Application();
}
