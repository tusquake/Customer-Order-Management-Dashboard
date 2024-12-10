sap.ui.define([
    "sap/ui/core/mvc/Controller",

    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, Filter, FilterOperator, JSONModel, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("project2.controller.CustomerOrderDetails", {
        onInit: function () {
            var that = this;

            this.getOwnerComponent().getRouter().getRoute("CustomerOrderDetails");

           
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


        /*initOrdersModel: function () {
            this.getView().setModel(new JSONModel({
                orders: []
            }), "ordersModel");
        },*/

        onSearchCustomer: function (oEvent) {

            // Get the value from the search field
            var sQuery = oEvent.getSource().getValue();

            // Get the list binding
            var oList = this.byId("customerList");
            var oBinding = oList.getBinding("items");

            // Apply filter
            if (sQuery) {
                var oFilter = new Filter("PurchaseOrderByCustomer", FilterOperator.Contains, sQuery);
                oBinding.filter([oFilter]);
            } else {
                oBinding.filter([]);
            }
            // Fetch customer details
            /*  $.ajax({
                  url: `/get-customer-by-id/{id}`,
                  method: "GET",
                  success: (customerData) => {
                      customerModel.setProperty("/customerDetails", customerData);
                      this._fetchCustomerOrders(customerId);
                  },
                  error: () => {
                      MessageBox.error("Customer not found");
                  }
              });*/

        },

        onRefresh: function () {
            window.location.reload();
        },

        // _fetchCustomerOrders: function (customerId) {
        //     var oTable = this.byId("customerList");
        //     oTable.getBinding("items").filter(new Filter("PurchaseOrderByCustomer", FilterOperator.EQ, customerId));
        // },
        onSelectionChange: function (oEvent) {
            var sOrderId = oEvent.getSource().getSelectedItem().getBindingContext("oModel").getProperty("SalesOrder");
            this.getOwnerComponent().getRouter()
                .navTo("orderDetails",
                    { orderId: sOrderId });
        },
        onNavBack:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
    }

    });
});