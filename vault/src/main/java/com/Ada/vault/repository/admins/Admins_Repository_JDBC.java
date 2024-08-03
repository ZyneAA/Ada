package com.Ada.vault.repository.admins;

import com.Ada.vault.domain.admins.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class Admins_Repository_JDBC implements Admins_Repository{

    @Autowired
    private JdbcTemplate jdbc_template;

    @Override
    public Admin find_admin_by_admin_name(String admin_name) {

        try {
            return this.jdbc_template.queryForObject(
                    "SELECT * FROM admins WHERE admin_name = ?",
                    new Admin_Row_Mapper(),
                    admin_name
            );
        }
        catch(EmptyResultDataAccessException e) {
            return null;
        }

    }

    @Override
    public Admin find_admin_by_admin_id(Long id) {

        try {
            return this.jdbc_template.queryForObject(
                    "SELECT * FROM admins WHERE admin_id = ?",
                    new Admin_Row_Mapper(),
                    id
            );
        }
        catch(EmptyResultDataAccessException e) {
            return null;
        }

    }

    private static class Admin_Row_Mapper implements RowMapper<Admin> {

        @Override
        public Admin mapRow(ResultSet rs, int rowNum) throws SQLException {

            Admin admin = new Admin();
            admin.set_admin_id(rs.getLong("admin_id"));
            admin.set_admin_name(rs.getString("admin_name"));
            admin.set_password(rs.getString("password"));

            return admin;

        }
    }

}
