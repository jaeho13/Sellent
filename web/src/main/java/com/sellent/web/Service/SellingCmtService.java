package com.sellent.web.Service;

import com.sellent.web.Dto.CommentDTO;
import com.sellent.web.Entiity.Selling;
import com.sellent.web.Entiity.SellingCmt;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.SellingCmtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class SellingCmtService {

    @Autowired
    SellingCmtRepository sellingCmtRepository;
    @Autowired
    UserService userService;

    // 댓글 작성
    public void insertCmt(Map<String, Object> comment, Selling selling, UserList userList) {
        SellingCmt sellingCmt = new SellingCmt();
        int sellIdx = Integer.parseInt((String) comment.get("sellIdx"));
        String sellCmtContent  = (String) comment.get("sellCmtContent");

        sellingCmt.setSellingVO(selling);
        sellingCmt.setUserListVO(userList);
        sellingCmt.setSellCmtDate(new Date());
        sellingCmt.setSellCmtContent(sellCmtContent);

        sellingCmtRepository.save(sellingCmt);
    }

    // 댓글 삭제
    public Boolean deleteCmt(int sellentCmtIdx, UserList userList) {
        //회원이 작성한 댓글인지 확인
        String userEmail = userList.getUserEmail();
        String originWriter = sellingCmtRepository.getWriter(sellentCmtIdx);

        if(!originWriter.equals(userEmail)) {
            return false;
        }

        sellingCmtRepository.deleteById(sellentCmtIdx);
        return true;
    }

    // 모든 댓글 삭제
    public void deleteAllCmt(int sellIdx) {
        // 원글 번호로 해당 글 댓글 리스트 가져오기
        List<CommentDTO> list = sellingCmtRepository.getSellingCmt(sellIdx);

        // 리스트 사이즈만큼 반복문을 돌며 지우기 작업
        for(int i = 0; i<list.size(); i++) {
            int cmtIdx = list.get(i).getSellCmtIdx();

            sellingCmtRepository.deleteById(cmtIdx);
        }
    }

    // 댓글 리스트 가져오기
    public List<CommentDTO> getSellingCmt(int sellIdx) {
        List<CommentDTO> commentDTO = sellingCmtRepository.getSellingCmt(sellIdx);
        return commentDTO;
    }
}
