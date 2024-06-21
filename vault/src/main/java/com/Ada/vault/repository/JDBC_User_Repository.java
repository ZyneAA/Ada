package com.Ada.vault.repository;

import com.Ada.vault.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JDBC_User_Repository implements User_Repository {

    @Autowired
    JdbcTemplate jdbc_template;

    @Override
    public void add(User user) {

         jdbc_template.update(
                "INSERT INTO users (username) values(?)",
                user.get_username()
        );

         return;

    }

    @Override
    public void delete(User user) {
        jdbc_template.update(
                "DELETE FROM users WHERE id = ?",
                user.get_id()
        );
    }

}
