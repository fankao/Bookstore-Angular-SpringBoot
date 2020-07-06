package com.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.ecommerce.entities.Product;
import com.ecommerce.entities.ProductCategory;
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		HttpMethod[] theUnSupportActions = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE };

		// disable method for Product: PUT, POST, DELETE
		config.getExposureConfiguration().forDomainType(Product.class)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportActions));
		
		// disable method for Product Category: PUT, POST, DELETE
				config.getExposureConfiguration().forDomainType(ProductCategory.class)
						.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportActions))
						.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportActions));
	}
}
