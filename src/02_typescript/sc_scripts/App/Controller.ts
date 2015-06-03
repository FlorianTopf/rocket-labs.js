module sc {
    export interface ControllerOptions {
    }

    export interface ControllerInterface {
        new (options: ControllerOptions);
    }

    export class Controller {
        constructor(options: ControllerOptions) {
        }
    }
}
