package com.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.ecommerce.entities.Product;
import com.ecommerce.entities.ProductCategory;
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
	
	private EntityManager manager;
	
	@Autowired
	public MyDataRestConfig(EntityManager manager) {
		this.manager = manager;
	}


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
	
		//call an internal helper method
		exposesIds(config);
	
	}


	private void exposesIds(RepositoryRestConfiguration config) {
		//get list all entity from entity manager
		Set<EntityType<?>> entities = manager.getMetamodel().getEntities();
		
		//create array for entity class
		List<Class> entityClass = new ArrayList<>();
		
		//get entity type from entities
		for (EntityType  item : entities) {
			entityClass.add(item.getJavaType());
		}
		
		//expose entity ids for array for entity class
		Class [] domainTypes = entityClass.toArray(new Class[0]);
		
		config.exposeIdsFor(domainTypes);
		
	}
}
