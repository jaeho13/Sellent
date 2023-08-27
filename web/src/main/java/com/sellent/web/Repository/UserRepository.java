package com.sellent.web.Repository;

import com.sellent.web.Entiity.UserList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserList, String> {

    // 유저 검색
    UserList findByUserEmail(String userEmail);

}
