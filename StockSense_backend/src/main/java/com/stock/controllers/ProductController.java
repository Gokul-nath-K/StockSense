package com.stock.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.stock.entity.Products;
import com.stock.services.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/products")
public class ProductController {

	@Autowired
	ProductService service;

	@Operation(summary = "Add a new product")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Product detail added successfully"),
			@ApiResponse(responseCode = "400", description = "Invalid product detail") })
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "/post", produces = "application/json", consumes = "application/json")
	public ResponseEntity<Products> create(final @RequestBody Products p) {

		Products createdProduct = service.createProduct(p);
		return ResponseEntity.ok(createdProduct);
	}

	@Operation(summary = "Retrieve all products records")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "All records are retrieved successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not retrieve products records") })
	@ResponseStatus(HttpStatus.FOUND)
	@GetMapping(value = "/get", produces = "application/json")
	public ResponseEntity<List<Products>> get() {

		List<Products> result = service.getAllRecords();
		return ResponseEntity.ok(result);
	}

	@Operation(summary = "Retrieve product records by given id")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Record was retrieved successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not retrieve product record") })
	@ResponseStatus(HttpStatus.FOUND)
	@GetMapping(value = "/get/{id}", produces = "application/json")
	public ResponseEntity<Optional<Products>> getById(@PathVariable("id") Long id) {

		Optional<Products> result = service.getById(id);
		return ResponseEntity.ok(result);
	}
	
	@Operation(summary = "Retrieve product records sorted and paged by given field")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Record was retrieved successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not retrieve product record") })
	@ResponseStatus(HttpStatus.FOUND)
	@GetMapping(value = "/get_sorted/{field}/{dir}/{no}/{size}", produces = "application/json")
	public ResponseEntity<List<Products>> getSortedByField(@PathVariable("field") String field, @PathVariable("dir") String dir, @PathVariable("no") int no, @PathVariable("size") int size) {

		List<Products> result = service.getSortedByField(field, dir, no, size);
		return ResponseEntity.ok(result);
	}
	
	@Operation(summary = "Retrieve product records paged")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Record was retrieved successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not retrieve product record") })
	@ResponseStatus(HttpStatus.FOUND)
	@GetMapping(value = "/get_paged/{no}/{size}", produces = "application/json")
	public ResponseEntity<List<Products>> getPagedProducts(@PathVariable("no") int no, @PathVariable("size") int size) {

		List<Products> result = service.getPagedProducts(no, size);
		return ResponseEntity.ok(result);
	}
	
	@Operation(summary = "Get count of total number of products")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Record was retrieved successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not retrieve product record") })
	@ResponseStatus(HttpStatus.FOUND)
	@GetMapping(value = "/count", produces = "application/json")
	public ResponseEntity<Long> getCount() {

		Long result = service.getCount();
		return ResponseEntity.ok(result);
	}

	@Operation(summary = "Update product records by given id")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Record was updated successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not update product record") })
	@ResponseStatus(HttpStatus.OK)
	@PutMapping(value = "/put/{id}", produces = "application/json")
	public void updatedxById(final @RequestBody Products new_record, @PathVariable("id") Long id) {

		service.update(new_record, id);
	}

	@Operation(summary = "Delete product records by given id")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Record was deleted successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not delete product record") })
	@ResponseStatus(HttpStatus.OK)
	@DeleteMapping(value = "/delete/{id}", produces = "application/json")
	public ResponseEntity<List<Products>> deleteById(@PathVariable("id") Long id) {

		List<Products> ls = service.deleteById(id);

		System.out.println(ls);
		return ResponseEntity.ok(ls);
	}

	@Operation(summary = "Delete all product records")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Record was deleted successfully!"),
			@ApiResponse(responseCode = "500", description = "Could not delete product record") })
	@ResponseStatus(HttpStatus.OK)
	@DeleteMapping(value = "/delete_all_record", produces = "application/json")
	public void deleteAllRecord() {

		service.deleteAllRecord();
	}

}
