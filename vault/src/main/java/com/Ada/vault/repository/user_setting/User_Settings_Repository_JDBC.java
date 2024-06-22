package com.Ada.vault.repository.user_setting;


import com.Ada.vault.domain.User_Settings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class User_Settings_Repository_JDBC implements User_Settings_Repository {

    @Autowired
    JdbcTemplate jdbc_template;

    @Override
    public void add_user_id(Long user_id) {

        jdbc_template.update(
                "INSERT INTO user_settings (user_id) values(?)",
                user_id
        );

    }

    @Override
    public void update_user_settings(User_Settings user_settings) {

        jdbc_template.update(
                "UPDATE user_settings SET fn = ?, ln = ?, status_1 = ?, status_2 = ? WHERE user_id = ?",
                user_settings.get_fn(), user_settings.get_ln(), user_settings.get_status_1(), user_settings.get_status_2(), user_settings.get_user_id()
        );

    }
}
