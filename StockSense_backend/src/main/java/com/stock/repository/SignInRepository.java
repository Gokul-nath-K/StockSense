package com.stock.repository; 

import java.util.List;  

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stock.entity.User;


public interface SignInRepository extends JpaRepository<User, Long> {

	@Query("select u from User u where u.email = ?1")
	public List<User> checkPassword(@Param("email") String email);
}

