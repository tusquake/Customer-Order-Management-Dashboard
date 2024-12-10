package com.incture.CustomerOrderManagement.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.CustomerOrderManagement.Entities.Customer;
import com.incture.CustomerOrderManagement.Services.CustomerService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/Customer")
public class CustomerController 
{
	@Autowired
	CustomerService customerService;
	
	@PostMapping("/add-customer")
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer)
	{
		return new ResponseEntity<Customer>(customerService.addCustomer(customer), HttpStatus.OK);
	}
	
	@GetMapping("/get-customer-by-id/{id}")
	public ResponseEntity<?> getCustomerById(@PathVariable Long id)
	{
		Customer customer = customerService.getById(id);
		if(customer!=null)
		{
			return new ResponseEntity<>(customer, HttpStatus.OK);
		}
		return new ResponseEntity<>("Customer not found!", HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/update-customer-by-id/{id}")
	public ResponseEntity<?> updateCustomerById(@RequestBody Customer customer, @PathVariable Long id)
	{
		Customer updatedCustomer = customerService.updateById(customer, id);
		if(updatedCustomer!=null)
		{
			return new ResponseEntity<>(customer, HttpStatus.OK);
		}
		return new ResponseEntity<>("Customer not found!", HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/get-all-customers")
	public ResponseEntity<List<Customer>> getAllCustomers()
	{
		return new ResponseEntity<List<Customer>>(customerService.getAllCustomers(), HttpStatus.OK);
	}
}
