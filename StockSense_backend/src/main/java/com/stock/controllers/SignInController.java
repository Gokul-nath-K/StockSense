package com.stock.controllers;

import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.stock.services.SignInService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class SignInController {

	@Autowired
	SignInService signinservice;

	@Operation(summary = "Get user details for sign in validation")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfully loged in"),
			@ApiResponse(responseCode = "500", description = "Could not log in")
	})
	@ResponseStatus(HttpStatus.OK)
	@GetMapping(value = "/auth_user")
	public ResponseEntity<Boolean> checkUser(@RequestParam(value="email", required = true) String email, @RequestParam(value="password", required = true) String password) {

		return ResponseEntity.ok(signinservice.validateUser(email, password));
	}
}
