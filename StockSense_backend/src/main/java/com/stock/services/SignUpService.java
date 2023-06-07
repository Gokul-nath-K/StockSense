package com.stock.services;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.entity.User;
import com.stock.repository.SignUpRepository;
 
@Service
public class SignUpService {

	@Autowired
	SignUpRepository userrepo;
	
	public Boolean CreateNewUser(User new_user) {
		
		List<Integer> countList = userrepo.isExist(new_user.getEmail()); 
		
		if(countList.get(0) ==  0) {
			
			userrepo.save(new_user);
			return true;
		}
		else {
			
			return false;
		}
	}
}
