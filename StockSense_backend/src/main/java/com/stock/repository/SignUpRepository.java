package com.stock.repository;

import java.util.List;  

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stock.entity.User;

import jakarta.transaction.Transactional;

public interface SignUpRepository extends JpaRepository<User, Long> {

	@Transactional
	@Query("select count(u) from User u where u.email = ?1") 
	public List<Integer> isExist(@Param("email") String email);
	
	
}
