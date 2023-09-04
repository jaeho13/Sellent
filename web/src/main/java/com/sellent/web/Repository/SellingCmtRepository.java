package com.sellent.web.Repository;

import com.sellent.web.Entiity.SellingCmt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellingCmtRepository extends JpaRepository<SellingCmt, Integer> {

    @Query(value = "select s.sellIdx, (select count(*) from SellingCmt c where s.sellIdx = c.sellIdx) as cmtCnt from Selling s order by s.sellIdx desc", nativeQuery = true)
    List<SellingCmt> countByCmt();

}
