package com.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.entity.Products; 

public interface ProductRepository extends JpaRepository<Products, Integer> {

}
