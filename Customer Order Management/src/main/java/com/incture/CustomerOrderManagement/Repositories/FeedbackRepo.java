package com.incture.CustomerOrderManagement.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.incture.CustomerOrderManagement.Entities.Feedback;

public interface FeedbackRepo extends JpaRepository<Feedback, Long>
{
	public List<Feedback> findByOrderId(Long orderId);
}
