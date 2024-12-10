
# Customer Order Management Dashboard

This project is a **Customer Order Management Dashboard** built using **SAPUI5** for the frontend and **Spring Boot** for the backend. The backend is deployed on **Cloud Foundry**, while the frontend is hosted on the **SAP BTP Cockpit**, ensuring scalability and seamless cloud integration. It integrates with an **SAP HANA database** for efficient storage and retrieval of sales order and customer details.

The application is designed with an intuitive user interface, incorporating user-centric design principles to deliver a smooth and efficient user experience. It provides real-time data visibility and supports both `GET` and `POST` requests to manage data dynamically.

## Key Features

### Frontend
- **Built with SAPUI5**: A responsive and feature-rich user interface with a modern design.
- **User-Centric Design**: Ensures an intuitive and user-friendly experience.
- **Routing and Navigation**: Enables seamless navigation between views for enhanced usability.
- **Formatters**: Utilized for dynamic data formatting and display.
- **AJAX Calls**: Facilitates smooth communication with the backend services.

### Backend
- **Spring Boot Service**: Handles the business logic and integrates with the SAP HANA database.
- **OData Integration**: Backend exposes OData services to fetch and manipulate data efficiently.
- **Cloud Deployment**: Deployed on **Cloud Foundry** for scalability and reliability.

### Database
- **SAP HANA Integration**: Stores sales orders and customer details, enabling fast and secure data operations.

### Functionality
- **Dynamic Data Handling**: Both `GET` and `POST` requests are supported for seamless data retrieval and updates.
- **Real-Time Updates**: Newly posted data is instantly reflected on the UI.
- **Error Handling**: Robust error handling ensures a smooth user experience during backend interactions.

## Deployment
- **Frontend**: Deployed on **SAP BTP Cockpit**, leveraging the cloud platform for hosting.
- **Backend**: Deployed on **Cloud Foundry**, providing a scalable and efficient environment.

## Highlights
- The dashboard combines **formatter logic**, **AJAX calls**, and **OData services** for real-time interaction and data manipulation.
- The UI is fully responsive, making it accessible on both desktop and mobile devices.
- Designed with user-friendliness in mind, making it easy to navigate and perform actions.

## Getting Started
1. **Backend**: Clone and deploy the Spring Boot service to a Cloud Foundry instance.
2. **Frontend**: Deploy the SAPUI5 application on the SAP BTP Cockpit.
3. **Database**: Set up SAP HANA with the required schema for sales orders and customer details.

## Technologies Used
- **Frontend**: SAPUI5, AJAX, Formatters, Routing
- **Backend**: Spring Boot, OData Services
- **Database**: SAP HANA
- **Cloud**: SAP BTP Cockpit (Frontend), Cloud Foundry (Backend)

This project showcases a robust and scalable solution for managing customer orders, combining cutting-edge SAP technologies with cloud-native deployment. It is ideal for businesses aiming for efficient order management and an intuitive user interface.
