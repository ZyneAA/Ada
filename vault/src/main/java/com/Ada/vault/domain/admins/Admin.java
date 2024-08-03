package com.Ada.vault.domain.admins;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @NotNull
    private Long admin_id;

    @NotBlank()
    private String admin_name;

    @NotBlank()
    private String password;

    public Long get_admin_id() {

        return this.admin_id;

    }

    public void set_admin_id(Long admin_id) {

        this.admin_id = admin_id;

    }

    public String get_admin_name() {

        return this.admin_name;

    }

    public void set_admin_name(String admin_name) {

        this.admin_name = admin_name;

    }

    public String get_password() {

        return this.password;

    }

    public void set_password(String password) {

        this.password = password;

    }

}