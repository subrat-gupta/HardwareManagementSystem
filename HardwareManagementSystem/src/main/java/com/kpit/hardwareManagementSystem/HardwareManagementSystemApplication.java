package com.kpit.hardwareManagementSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.kpit.hardwareManagementSystem.repository")
public class HardwareManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(HardwareManagementSystemApplication.class, args);
		System.out.print("Hello");
	}

}
