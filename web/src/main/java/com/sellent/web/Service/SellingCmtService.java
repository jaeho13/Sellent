package com.sellent.web.Service;

import com.sellent.web.Entiity.SellingCmt;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.SellingCmtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class SellingCmtService {

    @Autowired
    SellingCmtRepository sellingCmtRepository;
    @Autowired
    SellingService sellingService;
    @Autowired
    UserService userService;

    public void insertComment(Map<String, Object> comment, UserList userList) {
        SellingCmt sellingCmt = new SellingCmt();
        int sellIdx = Integer.parseInt((String) comment.get("sellIdx"));
        String sellCmtContent  = (String) comment.get("sellCmtContent");

        sellingCmt.setSellingVO(sellingService.findContent(sellIdx));
        sellingCmt.setUserListVO(userService.findUserVO(userList.getUserEmail()));
        sellingCmt.setSellCmtDate(new Date());
        sellingCmt.setSellCmtContent(sellCmtContent);

        sellingCmtRepository.save(sellingCmt);
    }
}
