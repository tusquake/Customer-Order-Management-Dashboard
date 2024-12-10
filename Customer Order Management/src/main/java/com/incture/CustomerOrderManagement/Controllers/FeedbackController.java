package com.incture.CustomerOrderManagement.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.incture.CustomerOrderManagement.Entities.Feedback;
import com.incture.CustomerOrderManagement.Services.FeedbackService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/Feedback")
public class FeedbackController 
{
	@Autowired
	FeedbackService feedbackService;
	
	@PostMapping("/post-feedback/{customerId}")
	public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback, @PathVariable Long customerId)
	{
		Feedback savedFeedback = feedbackService.submitFeedback(feedback, customerId);
		return new ResponseEntity<Feedback>(savedFeedback, HttpStatus.OK);
	}
	
	@GetMapping("/get-feedback-by-orderId")
	public ResponseEntity<List<Feedback>> getFeedbacksByOrderId(@RequestParam(required = true) Long orderId)
	{
		List<Feedback> feedbacks = feedbackService.getFeedbacksByOrderId(orderId);
		return new ResponseEntity<List<Feedback>>(feedbacks, HttpStatus.OK);
	}
}
