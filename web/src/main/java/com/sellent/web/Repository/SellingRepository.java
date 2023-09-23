package com.sellent.web.Repository;

import com.sellent.web.Dto.ContentDTO;
import com.sellent.web.Dto.ListDTO;
import com.sellent.web.Entiity.Selling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellingRepository extends JpaRepository<Selling, Integer> {
    // sellIdx = ? 글 가져오기
    @Query(value = "SELECT new com.sellent.web.Dto.ContentDTO(s.sellIdx, s.sellTitle, s.sellContent, s.userListVO.userNm, s.userListVO.userEmail, s.sellDate, s.sellPrice,  s.sellLocation, s.sellLike, s.sellType) " +
            "FROM Selling s " +
            "WHERE s.sellIdx = :sellIdx")
    ContentDTO getSellingContent(@Param("sellIdx") int sellIdx);

    // 판매 글 가져오기
    @Query(value = "SELECT new com.sellent.web.Dto.ListDTO(s.sellIdx, s.sellTitle, s.sellLike, s.sellDate) " +
            "FROM Selling s " +
            "WHERE s.sellType = 0 " +
            "ORDER BY s.sellDate DESC")
    List<ListDTO> findBySelling();

    // 판매 글 + 인기 글 가져오기
    @Query(value = "SELECT new com.sellent.web.Dto.ListDTO(s.sellIdx, s.sellTitle, s.sellLike, s.sellDate) " +
            "FROM Selling s " +
            "WHERE s.sellType = 0 " +
            "ORDER BY s.sellLike DESC, s.sellDate DESC")
    List<ListDTO> findPopular();


    // 구매 글 가져오기
    @Query(value = "SELECT new com.sellent.web.Dto.ListDTO(s.sellIdx, s.sellTitle, s.sellLike, s.sellDate) " +
            "FROM Selling s " +
            "WHERE s.sellType = 1 " +
            "ORDER BY s.sellDate DESC")
    List<ListDTO> findByPurchase();


    @Query(value = "SELECT * FROM Selling WHERE SELL_IDX = :sellIdx", nativeQuery = true)
    Selling findContent(@Param("sellIdx") int sellIdx);
}
