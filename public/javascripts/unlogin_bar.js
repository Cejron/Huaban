var menu_nav = document.getElementsByClassName('menu-nav')[0];
var menu_nav_content = document.getElementsByClassName('menu-nav-content')[0];
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
