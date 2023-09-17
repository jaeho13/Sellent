package com.sellent.web.Service;

import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    //userVO찾기
    public UserList findUserVO(String userEmail){
        UserList userVO = userRepository.findByUserEmail(userEmail);
        return userVO;
    }

    //user정보 저장
    public void saveUserVO(UserList userList){
        userRepository.save(userList);
    }
}
