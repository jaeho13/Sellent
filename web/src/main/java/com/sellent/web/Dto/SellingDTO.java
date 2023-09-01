package com.sellent.web.Dto;

import lombok.*;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SellingDTO {

    private int sellIdx;
    private String sellTitle;
    private String sellContent;
    private String userEmail;
    private Date sellDate;
    private int sellPrice;
    private int sellHashTag;
    private String sellLocation;

}