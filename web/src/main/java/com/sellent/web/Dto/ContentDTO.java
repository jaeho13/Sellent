package com.sellent.web.Dto;

import lombok.*;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class ContentDTO {

    private int sellIdx;
    private String sellTitle;
    private String sellContent;
    private String userNm;
    private String userEmail;
    private Date sellDate;
    private int sellPrice;
    private String sellLocation;
    private int sellLike;
    private int sellType;

}
