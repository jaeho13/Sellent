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

    @Query(value = "SELECT * FROM Selling", nativeQuery = true)
    List<Selling> findBySelling();

    @Query(value = "SELECT new com.sellent.web.Dto.SellingDTO(" +
            "s.sellIdx, s.sellTitle, s.sellContent, u.userEmail," +
            "s.sellDate, s.sellPrice, s.sellHashTag, s.sellLocation)" +
            "FROM Selling s " +
            "JOIN s.userListVO u " +
            "WHERE s.sellIdx = :sellIdx", nativeQuery = true)
    SellingDTO getSellingContentWithSellIdx(@Param("sellIdx") int sellIdx);





}
