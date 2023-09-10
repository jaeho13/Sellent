package com.sellent.web.Repository;

import com.sellent.web.Dto.SellingDTO;
import com.sellent.web.Entiity.Selling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellingRepository extends JpaRepository<Selling, Integer> {

    @Query(value = "SELECT * FROM SELLING WHERE SELL_TYPE = 0", nativeQuery = true)
    List<Selling> findBySelling();

    @Query(value = "SELECT s.sellIdx, s.sellTitle, s.sellContent, u.userEmail, s.sellDate, s.sellPrice, s.sellHashTag, s.sellLocation " +
            "FROM Selling s " +
            "JOIN s.userListVO u " +
            "WHERE s.sellIdx = :sellIdx", nativeQuery = true)
    SellingDTO getSellingContentWithSellIdx(@Param("sellIdx") int sellIdx);

    @Query(value = "SELECT * FROM (SELECT * FROM SELLING ORDER BY SELL_LIKE DESC, SELL_DATE DESC) WHERE ROWNUM <= 3", nativeQuery = true)
    List<Selling> findPopular();

    @Query(value = "SELECT * FROM SELLING WHERE SELL_TYPE = 1", nativeQuery = true)
    List<Selling> findByPurchase();
}
