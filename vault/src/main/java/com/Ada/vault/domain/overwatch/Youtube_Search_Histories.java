package com.Ada.vault.domain.overwatch;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "youtube_search_histories")
public class Youtube_Search_Histories {

    @Id
    private Long user_id;

    @NotBlank()
    private String date;

    @NotBlank()
    private String search;

    public Long get_user_id() {

        return this.user_id;

    }

    public void set_user_id(Long user_id) {

        this.user_id = user_id;

    }

    public String get_date() {

        return this.date;

    }

    public void set_date(String date) {

        this.date = date;

    }

    public String get_search() {

        return this.search;

    }

    public void set_search(String search) {

        this.search = search;

    }


}
