import * as Utility from 'LibrariesPath/Utilities/Utility';

export default function BaseController() {
    this.registerController = function(controller) {
        window.App = window.App || {};

        if (!controller || Object.getOwnPropertyNames(controller).length <= 0) {
            return;
        }

        if (controller.preprocess) {
            controller.preprocess(controller);
        }

        if (controller.render) {
            controller.render(controller);
        }

        Utility.addEventListener(document, 'readystatechange', function() {
            if (document.readyState === 'complete' && controller.ready) {
                controller.ready(controller);
            }
        });
    };
}
