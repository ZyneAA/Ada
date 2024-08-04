package com.Ada.vault.repository.overwatch.code_executions;

import com.Ada.vault.domain.overwatch.Code_Executions;
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
public class Code_Executions_Repository_JDBC implements Code_Executions_Repository {

    @Autowired
    private JdbcTemplate jdbc_template;

    @Override
    public List<Code_Executions> get_exe_data_by_date(String date) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM code_executions WHERE date = ?",
                    new Code_Executions_Row_Mapper(),
                    date
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Code_Executions> get_exe_data_by_language(String language) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM code_executions WHERE language = ?",
                    new Code_Executions_Row_Mapper(),
                    language
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Code_Executions> get_exe_data_by_version(String version) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM code_executions WHERE version = ?",
                    new Code_Executions_Row_Mapper(),
                    version
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Code_Executions> get_exe_data_by_user_id(String user_id) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM code_executions WHERE user_id = ?",
                    new Code_Executions_Row_Mapper(),
                    user_id
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public List<Code_Executions> get_exe_data_by_date_range(String date_0, String date_1) {

        try{
            return this.jdbc_template.query(
                    "SELECT * FROM code_executions WHERE date BETWEEN ? AND ?",
                    new Code_Executions_Row_Mapper(),
                    date_0, date_1
            );
        }
        catch(EmptyResultDataAccessException e) {
            return Collections.emptyList();
        }

    }

    @Override
    public void record_execute(Code_Executions code_executions) {

        jdbc_template.update(
                "INSERT INTO code_executions (date, language, version, user_id) values(?, ?, ?, ?)",
                code_executions.get_date(), code_executions.get_language(), code_executions.get_version(), code_executions.get_user_id()
        );

    }

    private static class Code_Executions_Row_Mapper implements RowMapper<Code_Executions> {

        @Override
        public Code_Executions mapRow(ResultSet rs, int rowNum) throws SQLException {

            Code_Executions code_executions = new Code_Executions();
            code_executions.set_date(rs.getString("date"));
            code_executions.set_language(rs.getString("language"));
            code_executions.set_version(rs.getString("version"));
            code_executions.set_user_id(rs.getLong("user_id"));

            return code_executions;

        }
    }

}
