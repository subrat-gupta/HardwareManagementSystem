package com.kpit.hardwareManagementSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.kpit.hardwareManagementSystem.repository")
public class HardwareManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(HardwareManagementSystemApplication.class, args);
		System.out.print("Hello");
	}
	@Bean 
	public ModelMapper configureMapper() {
		System.out.println("in config mapper....");
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}
}
