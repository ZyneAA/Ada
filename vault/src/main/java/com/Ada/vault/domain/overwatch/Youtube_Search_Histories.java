package com.Ada.vault.domain.overwatch;

import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "youtube_search_histories")
public class Youtube_Search_Histories {

    @NotNull
    private Long user_id;

    @NotBlank()
    private LocalDateTime date;

    @NotBlank()
    private String search;

    public Long get_user_id() {

        return this.user_id;

    }

    public void set_user_id(Long user_id) {

        this.user_id = user_id;

    }

    public LocalDateTime get_date() {

        return this.date;

    }

    public void set_date(LocalDateTime date) {

        this.date = date;

    }

    public String get_search() {

        return this.search;

    }

    public void set_search(String search) {

        this.search = search;

    }


}
