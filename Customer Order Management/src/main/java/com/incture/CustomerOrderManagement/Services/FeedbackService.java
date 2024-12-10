package com.incture.CustomerOrderManagement.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.incture.CustomerOrderManagement.Entities.Customer;
import com.incture.CustomerOrderManagement.Entities.Feedback;
import com.incture.CustomerOrderManagement.Repositories.CustomerRepo;
import com.incture.CustomerOrderManagement.Repositories.FeedbackRepo;

@Service
public class FeedbackService 
{
	@Autowired
	FeedbackRepo feedbackRepo;
	
	@Autowired
	CustomerRepo customerRepo;
	
	
	public Feedback submitFeedback(Feedback feedback, Long customerId)
	{
		Customer customer = customerRepo.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found!"));
		feedback.setCustomer(customer);
		feedback.setFeedbackDateTime(LocalDateTime.now());
		return feedbackRepo.save(feedback);
	}
	
	public List<Feedback> getFeedbacksByOrderId(Long orderId)
	{
		List<Feedback> feedbacks = feedbackRepo.findByOrderId(orderId);
		return feedbacks;
	}
}
