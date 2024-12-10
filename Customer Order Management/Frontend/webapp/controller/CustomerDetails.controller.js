sap.ui.define([
    "sap/ui/core/mvc/Controller",

    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, Filter, FilterOperator, JSONModel, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("project2.controller.CustomerDetails", {
        onInit: function () {
            var that = this;

            this.getOwnerComponent().getRouter().getRoute("CustomerDetails");

            this._fetchAllCustomerDetails();
        },
        

        /*initOrdersModel: function () {
            this.getView().setModel(new JSONModel({
                orders: []
            }), "ordersModel");
        },*/

        onCustomerIdChange: function (oEvent) {
            var customerId = oEvent.getSource().getValue();
            // console.log(customerId);
            
            if (customerId) {
                this._fetchCustomerDetails(customerId);
                // this._fetchCustomerOrders(customerId);
            }else{
                this._fetchAllCustomerDetails();
            }
        },
        _fetchCustomerDetails: function (customerId) {
            var that = this;
            let m = new sap.ui.model.json.JSONModel();
            $.ajax({
                url: "https://customer-order-management-app-quick-cheetah-ql.cfapps.us10-001.hana.ondemand.com/api/v1/Customer/get-customer-by-id/" + customerId,  // Spring Boot API endpoint
                method: "GET",
                success: function (data) {
                    console.log(data);
                    // Update the view model with customer details
                    let localModel = that.getView().getModel("modele")
                    localModel.setProperty("/tabData", data)
                    // m.setData(data);




                }

            });
            this.getView().setModel(m, "modele");

        },

        _fetchAllCustomerDetails: function () {
            var that = this;
            let m = new sap.ui.model.json.JSONModel();
            $.ajax({
                url: "https://customer-order-management-app-quick-cheetah-ql.cfapps.us10-001.hana.ondemand.com/api/v1/Customer/get-all-customers",  // Spring Boot API endpoint
                method: "GET",
                success: function (data) {
                    console.log(data);
                    // Update the view model with customer details

                    // let localModel = that.getView().getModel("modele")
                    // localModel.setProperty("/tabData", data)
                    m.setData(data);




                }

    });
    this.getView().setModel(m, "modele");
},


        onRefresh: function () {
            window.location.reload();
        },

        // _fetchCustomerOrders: function (customerId) {
        //     var oTable = this.byId("customerList");
        //     oTable.getBinding("items").filter(new Filter("PurchaseOrderByCustomer", FilterOperator.EQ, customerId));
        // },


        onF4HelpPress: function () {
            if (!this._dialog) {
                this._dialog = sap.ui.xmlfragment(this.getView().getId(), "project2.view.CustomerDataFragment", this);
                this.getView().addDependent(this._dialog);
            }
            this._dialog.open();
        },
        onClose: function () {
            this._dialog.close();
        },
        onSubmit: function () {
            // Retrieve customer data from the dialog inputs

            // var customerId = this.getView().byId("inputId").getValue();

            var customerName = this.getView().byId("inputName").getValue();
            var customerEmail = this.getView().byId("inputEmail").getValue();
            var customerPhone = this.getView().byId("inputPhone").getValue();
            var customerAddress = this.getView().byId("inputAddress").getValue();
            var customerCity = this.getView().byId("inputCity").getValue();
            var customerPincode = this.getView().byId("inputPincode").getValue();
            var customerState = this.getView().byId("inputState").getValue();
            var customerCountry = this.getView().byId("inputCountry").getValue();

            // Prepare data for POST request
            var jsonData = {
                // customerId: customerId,
                customerName: customerName,
                email: customerEmail,
                phoneNumber: customerPhone,
                address: customerAddress,
                city: customerCity,
                pinCode: customerPincode,
                state: customerState,
                country: customerCountry
            };

            console.log(jsonData)

            // Check if all the required fields are filled (costCenter, amount, description, date, employee)


            // if (!costCent || !amt || !desc || !date || !emp) {
            //     alert("Please fill all the fields.");
            //     return;  // Exit the function if fields are not filled
            // }

            // Add the fields to the jsonData for posting (you can add this data as needed)


            // Example: Prepare the data for POST request (using fetch, XMLHttpRequest, etc.)
            fetch("https://customer-order-management-app-quick-cheetah-ql.cfapps.us10-001.hana.ondemand.com/api/v1/Customer/add-customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonData)  // Send the data as a JSON object
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response (success)
                    MessageBox.success("Data submitted successfully:", data);
                    MessageToast.show("Customer details submitted successfully.");
                    this._clearInputFields();

                })
                .catch(error => {
                    // Handle any errors during the request
                    MessageBox.error("Error submitting data:", error);
                    MessageToast.show("An error occurred while submitting the data.");
                });
        },

        _clearInputFields: function() {
            // Clear all input fields in the dialog
            this.getView().byId("inputName").setValue("");
            this.getView().byId("inputEmail").setValue("");
            this.getView().byId("inputPhone").setValue("");
            this.getView().byId("inputAddress").setValue("");
            this.getView().byId("inputCity").setValue("");
            this.getView().byId("inputPincode").setValue("");
            this.getView().byId("inputState").setValue("");
            this.getView().byId("inputCountry").setValue("");
        }
,





      
        onNavBack:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
    }

    });
});