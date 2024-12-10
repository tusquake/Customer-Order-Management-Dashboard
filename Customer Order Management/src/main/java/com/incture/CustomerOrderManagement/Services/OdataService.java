package com.incture.CustomerOrderManagement.Services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.zip.GZIPInputStream;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OdataService {
    @SuppressWarnings("unused")
	private final RestTemplate restTemplate;

    public OdataService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("deprecation")
	public ResponseEntity<String> getSalesOrder() {
        final int BUFFER_SIZE = 8192;
        BufferedReader in = null;

        try {
            String url = "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder?%24inlinecount=allpages&%24top=50";
            URL urlObj = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) urlObj.openConnection();

            // Setting the request method and headers
            connection.setRequestMethod("GET");
            connection.setRequestProperty("APIKey", "Qo1xCfJJ13sy0uXtUyy4qTJn6Mn1C9x2");
            connection.setRequestProperty("DataServiceVersion", "2.0");
            connection.setRequestProperty("Accept", "application/json");

            // Handle compressed response (GZIP)
            String encoding = connection.getContentEncoding();
            if (encoding != null && encoding.equalsIgnoreCase("gzip")) {
                in = new BufferedReader(new InputStreamReader(new GZIPInputStream(connection.getInputStream())));
            } else {
                in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            }

            // Read the response
            StringBuilder response = new StringBuilder();
            char[] buffer = new char[BUFFER_SIZE];
            int charsRead;
            while ((charsRead = in.read(buffer)) != -1) {
                response.append(buffer, 0, charsRead);
            }

            // Return the response
            return new ResponseEntity<>(response.toString(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    @SuppressWarnings("deprecation")
	public ResponseEntity<String> getSalesOrderItem() {
        final int BUFFER_SIZE = 8192;
        BufferedReader in = null;

        try {
            String url = "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrderItem(SalesOrder='{SalesOrder}',SalesOrderItem='{SalesOrderItem}')/to_SalesOrder";
            URL urlObj = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) urlObj.openConnection();

            // Setting the request method and headers
            connection.setRequestMethod("GET");
            connection.setRequestProperty("APIKey", "Qo1xCfJJ13sy0uXtUyy4qTJn6Mn1C9x2");
            connection.setRequestProperty("DataServiceVersion", "2.0");
            connection.setRequestProperty("Accept", "application/json");

            // Handle compressed response (GZIP)
            String encoding = connection.getContentEncoding();
            if (encoding != null && encoding.equalsIgnoreCase("gzip")) {
                in = new BufferedReader(new InputStreamReader(new GZIPInputStream(connection.getInputStream())));
            } else {
                in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            }

            // Read the response
            StringBuilder response = new StringBuilder();
            char[] buffer = new char[BUFFER_SIZE];
            int charsRead;
            while ((charsRead = in.read(buffer)) != -1) {
                response.append(buffer, 0, charsRead);
            }

            // Return the response
            return new ResponseEntity<>(response.toString(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
