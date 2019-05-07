var LoginCheck={
    selectUser:'SELECT * FROM user_info WHERE user_act= ? AND user_password=?',
    selectPass:'SELECT user_password FROM user_info WHERE id= ? '
};
module.exports=LoginCheck;