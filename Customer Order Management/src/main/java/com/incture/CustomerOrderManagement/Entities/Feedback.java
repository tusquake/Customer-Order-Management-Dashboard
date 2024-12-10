package com.incture.CustomerOrderManagement.Entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class Feedback 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long feedbackId;
	
	@Column
	private Long orderId;
	
	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false)
	@JsonIgnore
	private Customer customer;
	
	@Column
	private String feedbackText;
	
	@Column
	private Double rating;
	
	@Column
	private LocalDateTime feedbackDateTime;

	public Long getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(Long feedbackId) {
		this.feedbackId = feedbackId;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getFeedbackText() {
		return feedbackText;
	}

	public void setFeedbackText(String feedbackText) {
		this.feedbackText = feedbackText;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public LocalDateTime getFeedbackDateTime() {
		return feedbackDateTime;
	}

	public void setFeedbackDateTime(LocalDateTime feedbackDateTime) {
		this.feedbackDateTime = feedbackDateTime;
	}

	public Feedback(Long feedbackId, Long orderId, Customer customer, String feedbackText, Double rating,
			LocalDateTime feedbackDateTime) {
		super();
		this.feedbackId = feedbackId;
		this.orderId = orderId;
		this.customer = customer;
		this.feedbackText = feedbackText;
		this.rating = rating;
		this.feedbackDateTime = feedbackDateTime;
	}

	public Feedback() {
		super();
	}

	@Override
	public String toString() {
		return "Feedback [feedbackId=" + feedbackId + ", orderId=" + orderId + ", customer=" + customer
				+ ", feedbackText=" + feedbackText + ", rating=" + rating + ", feedbackDateTime=" + feedbackDateTime
				+ "]";
	}
}
