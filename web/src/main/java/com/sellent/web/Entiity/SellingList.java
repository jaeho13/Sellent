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
public class SellingList { // 구매 내역 관리 테이블

    //구매 번호, 원 글 번호, 가격, 구매자, 구매 일자
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sellListSeq")
    @SequenceGenerator(name = "sellListSeq", sequenceName = "sellListSeq", allocationSize = 1)
    private int sellListIdx; // 구매 내역 관리 번호

    @Column(nullable = false)
    private int sellOriginIdx; // 구매 원 글 번호

    @Column(nullable = false)
    private String userEmail; // 구매자 이메일

    @Column(nullable = false)
    private int amount;

    @Column(nullable = false)
    private String tId; // 구매번호

    @Column(nullable = false)
    private String sellTitle;
}
