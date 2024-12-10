sap.ui.define([
    "sap/ui/core/mvc/Controller",

    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, Filter, FilterOperator, JSONModel, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {
            var that = this;

            this.getOwnerComponent().getRouter().getRoute("TargetView1");

            // Initialize models
           
            //    this._initOrdersModel();
            //Create JSON Model with URL
            var oModel = new sap.ui.model.json.JSONModel();

            

            //sending request
            //API endpoint for API sandbox 
            oModel.loadData("https://customer-order-management-app-quick-cheetah-ql.cfapps.us10-001.hana.ondemand.com/api/external/sap-hana-odata/sales-order-srv");

            //You can assign the created data model to a View and UI5 controls can be bound to it. Please refer documentation available at the below link for more information.
            //https://sapui5.hana.ondemand.com/#docs/guide/96804e3315ff440aa0a50fd290805116.html#loio96804e3315ff440aa0a50fd290805116

            //The below code snippet for printing on the console is for testing/demonstration purpose only. This must not be done in real UI5 applications.
            oModel.attachRequestCompleted(function (oEvent, that) {
                var oData = oEvent.getSource().oData;
                oModel.setData(oData?.d?.results);
            });

            this.getView().setModel(oModel, "oModel");
            
        },
        onPress:function(){
            this.getOwnerComponent().getRouter().navTo("CustomerDetails");
    },
    onPress1:function(){
        this.getOwnerComponent().getRouter().navTo("CustomerOrderDetails");
}

    });
});