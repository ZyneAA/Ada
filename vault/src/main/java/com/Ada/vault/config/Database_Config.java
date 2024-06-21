package com.Ada.vault.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class Database_Config {

    @Bean
    public JdbcTemplate jdbc_template(final DataSource data_source) {

        return new JdbcTemplate(data_source);

    }

}
