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
public class SellingCmt {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sellCmtSeq")
    @SequenceGenerator(name = "sellCmtSeq", sequenceName = "sellCmtSeq", allocationSize = 1)
    private int sellCmtIdx; // 댓글 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sellIdx")
    private Selling sellingVO; // 원 글 번호

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date sellCmtDate; // 댓글 작성일자

    @Column
    private String sellCmtContent; // 댓글 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userEmail")
    private UserList userListVO; // 댓글 작성자

}
