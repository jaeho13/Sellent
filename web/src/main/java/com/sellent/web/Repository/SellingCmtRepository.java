package com.sellent.web.Repository;

import com.sellent.web.Dto.CommentDTO;
import com.sellent.web.Entiity.SellingCmt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellingCmtRepository extends JpaRepository<SellingCmt, Integer> {

//    @Query(value = "select s.sellIdx, (select count(*) from SellingCmt c where s.sellIdx = c.sellIdx) as cmtCnt from Selling s order by s.sellIdx desc", nativeQuery = true)
//    List<SellingCmt> countByCmt();

    @Query(value = "SELECT new com.sellent.web.Dto.CommentDTO(c.sellCmtIdx, c.sellingVO.sellIdx, c.sellCmtDate, c.sellCmtContent, c.userListVO.userNm) " +
            "FROM SellingCmt c " +
            "WHERE c.sellingVO.sellIdx = :sellIdx " +
            "ORDER BY c.sellCmtDate ASC")
    List<CommentDTO> getSellingComment(@Param("sellIdx") int sellIdx);

    @Query(value = "SELECT c.userEmail FROM SellingCmt c WHERE c.sellCmtIdx = :sellentCmtIdx", nativeQuery = true)
    String getWriter(@Param("sellentCmtIdx") int sellentCmtIdx);
}
