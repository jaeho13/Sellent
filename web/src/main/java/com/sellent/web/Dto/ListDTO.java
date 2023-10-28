package com.sellent.web.Dto;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class ListDTO {
    private int sellIdx;
    private String sellTitle;
    private int sellLike;
    private Date sellDate;
    private String uploadedFileNames;
}
