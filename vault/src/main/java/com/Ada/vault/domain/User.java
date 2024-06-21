package com.Ada.vault.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    private Long id;
    private String username;

    public void set_id(Long id) {

        this.id = id;

    }

    public void set_username(String username) {

        this.username = username;

    }

    public Long get_id() {

        return this.id;

    }

    public String get_username() {

        return this.username;

    }


}
