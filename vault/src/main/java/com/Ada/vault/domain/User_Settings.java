package com.Ada.vault.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user_settings")
public class User_Settings {

    @Id
    private Long user_id;

    private String fn;

    private String ln;

    private String status_1;

    private String status_2;

    public Long get_user_id() {

        return user_id;

    }

    public void set_user_id(Long user_id) {

        this.user_id = user_id;

    }

    public String get_status_2() {

        return status_2;

    }

    public void set_status_2(String status_2) {

        this.status_2 = status_2;

    }

    public String get_ln() {

        return ln;

    }

    public void set_ln(String ln) {

        this.ln = ln;

    }

    public String get_status_1() {

        return status_1;

    }

    public void set_status_1(String status_1) {

        this.status_1 = status_1;

    }

    public String get_fn() {

        return fn;

    }

    public void set_fn(String fn) {

        this.fn = fn;

    }
}
