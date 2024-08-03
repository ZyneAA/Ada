package com.Ada.vault.repository.overwatch.code_executions;

import com.Ada.vault.domain.overwatch.Code_Executions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Collection;
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
        return null;
    }

    @Override
    public List<Code_Executions> get_exe_data_by_version(String version) {
        return null;
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

    private static class Code_Executions_Row_Mapper implements RowMapper<Code_Executions> {

        @Override
        public Code_Executions mapRow(ResultSet rs, int rowNum) throws SQLException {

            Code_Executions code_executions = new Code_Executions();
            code_executions.set_date(rs.getTimestamp("date"));
            code_executions.set_language(rs.getString("language"));
            code_executions.set_version(rs.getString("version"));
            code_executions.set_user_id(rs.getLong("user_id"));

            return code_executions;

        }
    }

}
