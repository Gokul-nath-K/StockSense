package com.stock.controllers;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.stock.entity.User;
import com.stock.services.SignUpService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class SignUpController {

	@Autowired	
	SignUpService signupservice;
	
	@Operation(summary = "sign up a new user and add details in user table")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "new user added successfully"),
			@ApiResponse(responseCode = "400", description = "User already exist")
	})
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "/post",  consumes = "application/json")
	public ResponseEntity<Boolean> CreateNewUser(@RequestBody User new_user) {
		
		return ResponseEntity.ok(signupservice.CreateNewUser(new_user));
	}
}
