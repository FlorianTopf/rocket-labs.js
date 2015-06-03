module sc {
    export interface ServiceInterface {
        new (element: JQuery, options: any);
    }

    export class Service {
        protected element: JQuery = null;
        protected options: any = {};
        protected defaultOptions: any = {};

        constructor(element: JQuery = null, options: any = {}) {
            this.element = element;
            this.options = this.mergeOptions(options);

            this.initialize();
        }

        protected initialize(): void {
        }

        protected mergeOptions(options: any): any {
            return $.extend(true, {}, this.defaultOptions, options);
        }
    }
}
