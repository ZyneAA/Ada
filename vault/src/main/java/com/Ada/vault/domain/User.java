package com.Ada.vault.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @NotNull
    private Long user_id;

    @NotBlank(message = "Password is mandatory")
    private String username;

    @NotBlank(message = "Password is mandatory")
    private String email;

    @NotBlank(message = "Password is mandatory")
    private String password;

    public void set_user_id(Long user_id) {

        this.user_id = user_id;

    }

    public void set_username(String username) {

        this.username = username;

    }

    public Long get_user_id() {

        return this.user_id;

    }

    public String get_username() {

        return this.username;

    }


    public String get_password() {

        return password;

    }

    public void set_password(String password) {

        this.password = password;

    }

    public String get_email() {

        return email;

    }

    public void set_email(String email) {

        this.email = email;

    }

}
