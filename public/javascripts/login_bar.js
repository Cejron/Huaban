var menu_nav = document.getElementsByClassName('menu-nav')[0];
// console.log(menu_nav)
var menu_nav_content = document.getElementsByClassName('menu-nav-content')[0];
// console.log(menu_nav_content)
var menu_if = 0;
menu_nav.onclick = function () {
    switch (menu_if) {
        case 0:
            menu_nav_content.style.display = 'block';
            menu_if = 1;
            break;
        case 1:
            menu_nav_content.style.display = 'none';
            menu_if = 0;
            break;
        default:
            break;
    }
}
var select_option = document.getElementById('selectoption');
var searching_menu = document.getElementsByClassName('searching-menu')[0];
searching_menu.style.display = 'none';
var op_me = 0;
select_option.onclick = function () {
    if (op_me == 0) {
        searching_menu.style.display = 'block';
        op_me = 1;
    } else {
        searching_menu.style.display = 'none';
        op_me = 0;
    }

}


var message_nav_icon = document.getElementsByClassName('message-nav-icon')[0];
var message_group = document.getElementsByClassName('message-group')[0];
message_group.style.display = 'none';
var na_gr = 0;
message_nav_icon.onclick = function () {
    if (na_gr == 0) {
        message_group.style.display = 'block';
        na_gr = 1;
    } else {
        message_group.style.display = 'none';
        na_gr = 0;
    }

}

var box_choice = document.getElementsByClassName('barTitle');

var box_content = document.getElementsByClassName('box');

var message_tip = document.getElementsByClassName('show-all');

// console.log(message_tip[0].href)

box_choice[0].onclick = function () {
    box_content[0].style.display = "block";
    box_content[1].style.display = "none";
    box_choice[0].style.background = '#fff';
    box_choice[1].style.background = '#fafafa';
    message_tip[0].innerHTML = "查看所有消息&gt;&gt;";
}
box_choice[1].onclick = function () {
    box_content[0].style.display = "none";
    box_content[1].style.display = "block";
    box_choice[1].style.background = '#fff';
    box_choice[0].style.background = '#fafafa';
    message_tip[0].innerHTML = "查看所有动态&gt;&gt;";
}