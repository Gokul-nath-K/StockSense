package com.stock.services;

import java.util.List;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.entity.User;
import com.stock.repository.SignInRepository;


@Service
public class SignInService {

	@Autowired
	SignInRepository signinrepository;
	
	
	public Boolean validateUser(String email, String password) {
		
		List<User> userlist = signinrepository.checkPassword(email);
		String ref = "";
		
		if(userlist.isEmpty()) {
			
			return false;
		}
		else {
						
			ref = userlist.get(0).getPassword();
		}
		
		
		if(password.equals(ref)) {
			
			return true;
		}
		else if( !password.equals(ref) ) {
			
			 return false;
		}
		else {
			
			return false;
		}
		
	}
}
