package com.sellent.web.Entiity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@DynamicInsert
public class Selling {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sellSeq")
    @SequenceGenerator(name = "sellSeq", sequenceName = "sellSeq", allocationSize = 1)
    private int sellIdx; // 글 번호

    @Column(nullable = false)
    private String sellTitle; // 글 제목

    @Column(nullable = false, length = 3000)
    private String sellContent; // 글 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userEmail", nullable = false)
    private UserList userListVO; // 글 작성자

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date sellDate; // 글 작성일자

    @Column(nullable = false)
    private int sellPrice; // 판매 가격

    @Column
    private String sellLocation; // 장소

    @Column
    private int sellLike; // 좋아요

    @Column(nullable = false)
    private int sellType; // 0: 판매 1: 구매
}
