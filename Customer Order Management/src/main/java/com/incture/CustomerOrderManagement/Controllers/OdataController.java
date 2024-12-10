package com.incture.CustomerOrderManagement.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.CustomerOrderManagement.Services.OdataService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/external/sap-hana-odata")
public class OdataController 
{
	@Autowired
	OdataService odataService;
	
	@GetMapping("/sales-order-srv")
	public ResponseEntity<String> getSalesOrder()
	{
		return odataService.getSalesOrder();
	}
	
	@GetMapping("/sales-order-item-srv")
	public ResponseEntity<String> getSalesOrderItem()
	{
		return odataService.getSalesOrderItem();
	}
}
