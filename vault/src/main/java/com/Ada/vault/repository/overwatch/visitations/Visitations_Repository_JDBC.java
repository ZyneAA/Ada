package com.Ada.vault.repository.overwatch.visitations;

import com.Ada.vault.domain.overwatch.Visitations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@Repository
public class Visitations_Repository_JDBC implements Visitations_Repository{

    @Autowired
    private JdbcTemplate jdbc_template;

    @Override
    public List<Visitations> get_visitations_by_user_id(Long user_id) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM visitations WHERE user_id = ?",
                    new Visitations_Row_Mapper(),
                    user_id
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Visitations> get_visitations_by_last_login(String last_login) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM visitations WHERE last_login = ?",
                    new Visitations_Row_Mapper(),
                    last_login
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Visitations> get_visitations_by_last_login_range(String last_login_0, String last_login_1) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM visitations WHERE last_login BETWEEN ? AND ?",
                    new Visitations_Row_Mapper(),
                    last_login_0, last_login_1
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Visitations> get_visitations_by_last_visit(String last_visit) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM visitations WHERE last_visit = ?",
                    new Visitations_Row_Mapper(),
                    last_visit
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Visitations> get_visitations_by_last_visit_range(String last_visit_0, String last_visit_1) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM visitations WHERE last_visit BETWEEN ? AND ?",
                    new Visitations_Row_Mapper(),
                    last_visit_0, last_visit_1
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public void insert_visitation(Visitations visitations) {

        this.jdbc_template.update(
                "INSERT INTO visitations (last_login, last_visited, user_id) values(?, ?, ?)",
                visitations.get_last_login(), visitations.get_last_visited(), visitations.get_user_id()
        );

    }

    @Override
    public void update_visitation(Visitations visitations) {

        if(visitations.get_last_login() == null) {
            jdbc_template.update(
                    "UPDATE visitations SET last_visited = ? WHERE user_id = ?",
                    visitations.get_last_visited(), visitations.get_user_id()
            );
            return;
        }
        else if (visitations.get_last_visited() == null) {
            jdbc_template.update(
                    "UPDATE visitations SET last_login = ? WHERE user_id = ?",
                    visitations.get_last_login(), visitations.get_user_id()
            );
            return;
        }

        jdbc_template.update(
                "UPDATE visitations SET last_login = ?, last_visited = ? WHERE user_id = ?",
                visitations.get_last_login(), visitations.get_last_visited(), visitations.get_user_id()
        );

    }

    private static class Visitations_Row_Mapper implements RowMapper<Visitations> {

        @Override
        public Visitations mapRow(ResultSet rs, int rowNum) throws SQLException {

            Visitations visitations = new Visitations();
            visitations.set_last_login(rs.getString("last_login"));
            visitations.set_last_visited(rs.getString("last_visited"));
            visitations.set_user_id(rs.getLong("user_id"));

            return visitations;

        }
    }

}
