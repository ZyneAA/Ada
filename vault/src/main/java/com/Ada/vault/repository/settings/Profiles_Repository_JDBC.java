package com.Ada.vault.repository.settings;


import com.Ada.vault.domain.settings.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class Profiles_Repository_JDBC implements Profiles_Repository {

    @Autowired
    JdbcTemplate jdbc_template;

    @Override
    public void add_user_id(Long user_id) {

        jdbc_template.update(
                "INSERT INTO profiles (user_id) values(?)",
                user_id
        );

    }

    @Override
    public void update_user_profile(Profile profile) {

        jdbc_template.update(
                "UPDATE profiles SET fn = ?, ln = ?, status_1 = ?, status_2 = ?, bio = ? WHERE user_id = ?",
                profile.get_fn(), profile.get_ln(), profile.get_status_1(), profile.get_status_2(), profile.get_bio(), profile.get_user_id()
        );

    }
}
