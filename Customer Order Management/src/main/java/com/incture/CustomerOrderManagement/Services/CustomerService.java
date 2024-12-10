package com.incture.CustomerOrderManagement.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.incture.CustomerOrderManagement.Entities.Customer;
import com.incture.CustomerOrderManagement.Repositories.CustomerRepo;

@Service
public class CustomerService 
{
	@Autowired
	CustomerRepo customerRepo;
	
	public Customer addCustomer(Customer customer)
	{
		if(customer.getCustomerId()==null)
		{
			return customerRepo.save(customer);
			
		}
		return customer;
	}
	
	public Customer getById(Long id)
	{
		Optional<Customer> optional = customerRepo.findById(id);
		if(optional.isPresent())
		{
			return optional.get();
		}
		return null;
	}
	
	public Customer updateById(Customer updatedCustomer, Long id)
	{
		Optional<Customer> optional = customerRepo.findById(id);
		if(optional.isPresent())
		{
			Customer customer = optional.get();
			customer.setCustomerName(updatedCustomer.getCustomerName());
			customer.setEmail(updatedCustomer.getEmail());
			customer.setPhoneNumber(updatedCustomer.getPhoneNumber());
			customer.setAddress(updatedCustomer.getAddress());
			customer.setCity(updatedCustomer.getCity());
			customer.setPinCode(updatedCustomer.getPinCode());
			customer.setState(updatedCustomer.getState());
			customer.setCountry(updatedCustomer.getCountry());
			customerRepo.save(customer);
			return customer;
		}
		return null;
	}
	
	public List<Customer> getAllCustomers()
	{
		List<Customer> customers = customerRepo.findAll();
		return customers;
	}
}
