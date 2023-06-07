package com.stock.entity;

import jakarta.persistence.Column;  
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_details")
public class Products {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Product_id")
	private Long id;
	@Column(name = "Name")
	private String name;
	@Column(name = "Qty")
	private Long quantity;
	@Column(name = "Category")
	private String category;
	@Column(name = "Price")
	private Double price;

	public Products() {

	}

	public Products(Long id, String name, Long quantity, String category, Double price) {
		super();
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.category = category;
		this.price = price;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Products [id=" + id + ", name=" + name + ", quantity=" + quantity + ", category=" + category
				+ ", price=" + price + "]";
	}

}
