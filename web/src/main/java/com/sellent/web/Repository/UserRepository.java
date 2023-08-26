package com.sellent.web.Repository;

import com.sellent.web.Entiity.UserList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserList, String> {

    @Query(value = "select * from UserList where userEmail like :userEmail", nativeQuery = true)
    UserList findByUserEmail(@Param(value = "userEmail") String email);
}
