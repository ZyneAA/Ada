package com.Ada.vault.repository;

import com.Ada.vault.domain.User;

public interface User_Repository {

    void add(User user);

    void delete(User user);

    User find_user_by_username(String username);

}
