package com.stock.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.stock.entity.Products;
import com.stock.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository repo;

	public Products createProduct(Products p) {

		return repo.save(p);
	}

	public List<Products> getAllRecords() {

		return repo.findAll();
	}
	
	public long getCount() {

		return repo.count();
	}

	public List<Products> getSortedByField(String field, String dir, int page_no, int page_size) {

		
		if (dir.equals("asc")) {

			Pageable paging = PageRequest.of(page_no, page_size, Sort.by(Direction.ASC, field));
			
			Page<Products> pageResult = repo.findAll(paging);
			
			return pageResult.getContent();
			
		} else {
			
			Pageable paging = PageRequest.of(page_no, page_size, Sort.by(Direction.DESC, field));
			
			Page<Products> pageResult = repo.findAll(paging);
				
			return pageResult.getContent();
		}
	}
	
	public List<Products> getPagedProducts(int page_no, int page_size) {

		Pageable page = PageRequest.of(page_no, page_size);
		Page<Products> pagedResult = repo.findAll(page);

		return pagedResult.getContent();
	}

	public Optional<Products> getById(Long id) {

		Integer n = id.intValue();
		return repo.findById(n);
	}

	public Products update(Products new_record, Long id) {

		Integer n = id.intValue();
		Products updateProduct = repo.findById(n).get();

		if (updateProduct == null) {

			return updateProduct;
		} else {

			updateProduct.setName(new_record.getName());
			updateProduct.setQuantity(new_record.getQuantity());
			updateProduct.setCategory(new_record.getCategory());
			updateProduct.setPrice(new_record.getPrice());
		}

		return repo.save(updateProduct);
	}

	public List<Products> deleteById(Long id) {

		Integer n = id.intValue();
		repo.deleteById(n);
		return repo.findAll();
	}

	public void deleteAllRecord() {

		repo.deleteAll();
	}

}
