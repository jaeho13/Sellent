package com.sellent.web.Repository;

import com.sellent.web.Entiity.SellingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellingListRepository extends JpaRepository<SellingList, Integer> {
    @Query(value = "SELECT * FROM selling_list WHERE user_email = :userEmail", nativeQuery = true)
    List<SellingList> findUserSellList(@Param("userEmail")String userEmail);

}
