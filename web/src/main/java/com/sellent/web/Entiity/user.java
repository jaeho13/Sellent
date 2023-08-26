package com.sellent.web.Entiity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@DynamicInsert
public class user {
    //유저 메일
    @Id
    @Column(nullable = false)
    private String userEmail;
    //유저 닉네임
    @Column(nullable = false)
    private String userNm;
    //유저 성별
    @Column
    private String userGender;

}
