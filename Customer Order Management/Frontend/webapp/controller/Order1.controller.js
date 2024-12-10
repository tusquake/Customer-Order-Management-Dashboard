sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
   
], function(Controller, Filter, FilterOperator, MessageToast, MessageBox, JSONModel) {
    "use strict";
 
    return Controller.extend("project2.controller.View2", {
       
        onInit: function() {
            // Get the order ID from the route parameters
           
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("orderDetails").attachPatternMatched(this._onOrderMatched, this);
           
        },
 
        _onOrderMatched: function(oEvent) {
            // Get the order ID from the route parameters
            var sOrderId = oEvent.getParameter("arguments").orderId;
            // Store the orderId in the model or controller property
             this._orderId = sOrderId;  // Storing it in a controller property
            this._loadOrderDetails(sOrderId);
            this._loadFeedback(sOrderId);
            this._fetchCustomerDetails();
        },
 
        _loadOrderDetails: function(sOrderId) {
           
 
            // you can set up a filter for the table based on the SalesOrder ID
            var oTable = this.byId("orderItemsTable");
            oTable.getBinding("items").filter(new Filter("SalesOrder", FilterOperator.EQ, sOrderId));
 
        //       // After filtering, check the DeliveryStatus of the filtered items
        //       var aFilteredItems = oTable.getBinding("items").getContexts();
        //       var bIsFeedbackVisible = false;
 
        //       // Check if any of the filtered items have DeliveryStatus "C"
        //       aFilteredItems.forEach(function(oContext) {
        //           var sDeliveryStatus = oContext.getObject().DeliveryStatus;
        //           if (sDeliveryStatus === "C") {
        //               bIsFeedbackVisible = true;
        //           }
        //       });
 
        //       // Update the visibility property in the model
        //       var oModel = this.getView().getModel();
        //       oModel.setProperty("/isFeedbackVisible", bIsFeedbackVisible);
        //
        },
 
        _loadFeedback:function(sOrderId){
            var oFeedbackModel = this.getOwnerComponent().getModel("productFeedback");
            var aEntries = oFeedbackModel.getData().productComments;
 
 
            // Filter the feedback entries based on the orderId
            var aFilteredComments = aEntries.filter(function(oEntry) {
                return oEntry.orderId === sOrderId; // Filter by orderId
            });
 
           
            // Create a local model and set the filtered data to it
            var oFilteredFeedbackModel = new JSONModel({
                productComments: aFilteredComments
            });
 
            // Set the local model to the view
            this.getView().setModel(oFilteredFeedbackModel, "filteredFeedback");
        },
       
        onSubmitFeedback: function () {


            // Access the stored orderId
        var sOrderId = this._orderId;
            const feedbackData = {
                orderId: sOrderId,
                customer:{},
                feedbackText: this.getView().byId("feedbackText").getValue(),
                rating: this.getView().byId("rating").getValue(),
                feedbackDateTime:""
                
            };

            console.log(feedbackData);
 
            $.ajax({
                url: "https://customer-order-management-app-quick-cheetah-ql.cfapps.us10-001.hana.ondemand.com/api/v1/Feedback/post-feedback/"+ sOrderId ,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(feedbackData),
                success: function() {
                    MessageBox.success("Feedback submitted successfully");
                },
                error: function() {
                    MessageBox.error("Failed to submit feedback");
                }
                
            });
            this._fetchCustomerDetails();
        },
        onPress:function(){
            this.getOwnerComponent().getRouter().navTo("CustomerOrderDetails");
    },
    onPost: function (oEvent) {
       
        var sValue = oEvent.getParameter("value");
        // Access the stored orderId
        var sOrderId = this._orderId;
        var oEntry = {
           
            comment: sValue,
            orderId: sOrderId // Include the orderId in the comment entry
 
        };        
        // update model
        var oFeedbackModel = this.getOwnerComponent().getModel("productFeedback");
        var aEntries = oFeedbackModel.getData().productComments;
        aEntries.push(oEntry);
        oFeedbackModel.setData({
           productComments : aEntries
        });
         // Now, update the filtered feedback model to include this new entry
         this._loadFeedback(sOrderId);
       
     },

       _fetchCustomerDetails: function () {

        var sOrderId = this._orderId;

            var that = this;
            let mm = new sap.ui.model.json.JSONModel();
            $.ajax({
                url: "https://customer-order-management-app-quick-cheetah-ql.cfapps.us10-001.hana.ondemand.com/api/v1/Feedback/get-feedback-by-orderId?orderId=" + sOrderId,  // Spring Boot API endpoint
                method: "GET",
                success: function (data) {
                    console.log(data);
                    // Update the view model with customer details
                    // let localModel = that.getView().getModel("modelee")
                    // localModel.setProperty("/tabData", data)
                    mm.setData(data);




                }

            });
            this.getView().setModel(mm, "modelee");
            

        }
    });
});