package com.Ada.vault.repository;

import com.Ada.vault.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

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

        return;

    }

    public User find_user_by_username(String username) {

        return jdbc_template.queryForObject(
                "SELECT * FROM users WHERE username = ?",
                new Object[]{username},
                new User_Row_Mapper()
        );

    }

    private static class User_Row_Mapper implements RowMapper<User> {

        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {

            User user = new User();
            user.set_id(rs.getLong("id"));
            user.set_username(rs.getString("username"));

            return user;

        }
    }

}
