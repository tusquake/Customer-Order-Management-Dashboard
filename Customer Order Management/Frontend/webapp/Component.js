sap.ui.define([
    "sap/ui/core/UIComponent",
    "project2/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("project2.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // set the product feedback model
            this.setModel(models.createCommentsModel(), "productFeedback");

            // enable routing
            this.getRouter().initialize();
        }
    });
});