package com.incture.CustomerOrderManagement.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.incture.CustomerOrderManagement.Entities.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

}
