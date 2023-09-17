package com.sellent.web.Dto;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class CommentDTO {
    private int sellCmtIdx;
    private int sellIdx;
    private Date sellCmtDate;
    private String sellCmtContent;
    private String userNm;
}
