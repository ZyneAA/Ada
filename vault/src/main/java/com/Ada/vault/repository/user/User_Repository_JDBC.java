package com.Ada.vault.repository.user;

import com.Ada.vault.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class User_Repository_JDBC implements User_Repository {

    @Autowired
    JdbcTemplate jdbc_template;

    // private static final Logger logger = LoggerFactory.getLogger(User_Repository_JDBC.class);

    @Override
    public void add(User user) {

         this.jdbc_template.update(
                "INSERT INTO users (username, email, password) values(?, ?, ?)",
                user.get_username(), user.get_email(), user.get_password()
         );


    }

    @Override
    public void delete_user_by_username(String username) {

        this.jdbc_template.update(
                "DELETE FROM users WHERE id = ?",
                username
        );

    }

    @Override
    public User find_user_by_username(String username) {

        try {
            return this.jdbc_template.queryForObject(
                    "SELECT * FROM users WHERE username = ?",
                    new User_Row_Mapper(),
                    username
            );
        }
        catch(EmptyResultDataAccessException e) {
            return null;
        }

    }

    @Override
    public User find_user_by_user_id(Long id) {

        try{
            return this.jdbc_template.queryForObject(
                    "SELECT * FROM users WHERE user_id = ?",
                    new User_Row_Mapper(),
                    id
            );
        }
        catch(EmptyResultDataAccessException e) {
            return null;
        }

    }

    private static class User_Row_Mapper implements RowMapper<User> {

        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {

            User user = new User();
            user.set_user_id(rs.getLong("user_id"));
            user.set_username(rs.getString("username"));
            user.set_email(rs.getString("email"));
            user.set_password(rs.getString("password"));

            return user;

        }
    }

}
