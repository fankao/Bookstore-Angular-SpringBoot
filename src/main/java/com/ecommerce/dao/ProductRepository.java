package com.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
