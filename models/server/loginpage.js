var LoginPage={
    selectAll:'SELECT * FROM pin',
    selectCategory:'SELECT pin.pin_category,COUNT(*) AS "num" FROM pin GROUP BY pin_category',
    selectGroupByCategory:'SELECT id,pin_category,pin_img,pin_desc,owner_img,owner_name,board_name FROM pin',
    selectByCategory:'SELECT id,pin_category,pin_img,pin_desc,owner_img,owner_name,board_name FROM pin WHERE pin_category="?"',
};
module.exports=LoginPage;