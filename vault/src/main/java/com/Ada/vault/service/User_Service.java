package com.Ada.vault.service;

import com.Ada.vault.domain.User;
import com.Ada.vault.domain.settings.Profile;
import com.Ada.vault.repository.user.User_Repository_JDBC;
import com.Ada.vault.repository.settings.Profiles_Repository_JDBC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class User_Service {

    @Autowired
    private User_Repository_JDBC user_repository_jdbc;

    @Autowired
    private Profiles_Repository_JDBC profiles_repository_jdbc;

    @Async
    public CompletableFuture<User> add_user(User user) {

        user_repository_jdbc.add(user);

        Long user_id = user_repository_jdbc.find_user_by_username(user.get_username()).get_user_id();
        profiles_repository_jdbc.add_user_id(user_id);

        return CompletableFuture.completedFuture(user);

    }

    @Async
    public CompletableFuture<User> find_user_by_username(String username) {

        User get_user = user_repository_jdbc.find_user_by_username(username);

        return CompletableFuture.completedFuture(get_user);

    }

    @Async
    public CompletableFuture<User> find_user_by_id(Long id) {

        User get_user = user_repository_jdbc.find_user_by_user_id(id);

        return CompletableFuture.completedFuture(get_user);

    }

    @Async
    public CompletableFuture<Profile> update_user_settings(Profile profile) {

        profiles_repository_jdbc.update_user_profile(profile);

        return CompletableFuture.completedFuture(profile);

    }

}
