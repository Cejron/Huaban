window.onload = function () {
    var setting_items = document.getElementsByClassName('setting-item');
    var title = document.getElementsByClassName('title');
    var holder = document.getElementsByClassName('holder');
    var edits = document.getElementsByClassName('edit');
    for (var i = 0; i < title.length; i++) {
        let j = i;
        title[j].onclick = function () {
            for (var a = 0; a < title.length; a++) {
                let b = a;
                if (b == j) {
                    holder[b].style.display = "block";
                    edits[b].innerHTML = "收起";
                } else {
                    holder[b].style.display = "none";
                    edits[b].innerHTML = "编辑";
                }
            }
        }
    }

    for (let n = 0; n < edits.length; n++) {

        edits[n].onclick = function (e) {
            // console.log(e)
            switch (e.target.innerHTML) {
                case "编辑":
                    for (var m = 0; m < holder.length; m++) {
                        if (m == n) {
                            holder[m].style.display = "block";
                            e.target.innerHTML = "收起";
                        } else {
                            holder[m].style.display = "none";
                            edits[m].innerHTML = "编辑";
                        }
                    }
                    break;
                case "收起":
                    holder[n].style.display = "none";
                    e.target.innerHTML = "编辑";
                    break;
            }
            // console.log(e.target.innerHTML)
        }
    }


    var user_sex = document.getElementsByClassName('sex')[0].getAttribute('data-value');
    var user_sex_items = document.getElementsByName('sex');
    user_sex=Number(user_sex)

    switch (user_sex) {
        case 1:
            user_sex_items[0].checked = true;
            break;
        case 2:
            user_sex_items[1].checked = true;
            break;
        case 0:
            user_sex_items[2].checked = true;
            break;
        default:
            break;
    }

}



