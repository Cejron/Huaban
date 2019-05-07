var UserInfo={
    selectUser:'SELECT * FROM user_info WHERE id= ?',
    selectPins:'SELECT * FROM pin WHERE owner_id= ?',
    updateUser:'UPDATE user_info set user_name=?,user_city=?,user_sex=?,description=? WHERE id=?',
    updateUserName:'UPDATE pin set owner_name=? WHERE owner_id=?',
    updatePassword:'UPDATE user_info set user_password=? WHERE id=?',
    selectBoardCategory:'SELECT * FROM board WHERE owner_id=?',
    selectBoardPins:'SELECT board.id AS board_id,board.board_desc,board.board_name,pin.pin_img,pin.pin_desc,pin.owner_name,pin.owner_img FROM board,pin WHERE board.id=pin.board_id AND board.owner_id=?  ORDER BY board.id',
};
module.exports=UserInfo; 