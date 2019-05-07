var waterfall = document.getElementById('waterfall');

var items = document.getElementsByClassName('pin');

console.log(items[0].offsetWidth);
// console.log(getClient().width);
var gap = 12;
window.onload = function () {
    waterFall();
}
function waterFall() {
    //页宽
    var pageWidth = getClient().width;
    //一个item宽
    var itemWidth = items[0].offsetWidth;
    //列数
    var colums = parseInt(pageWidth / (itemWidth + gap));
    //列高
    var arr = [];
    for (var i = 0; i < items.length; i++) {                //第一行的..
        if (i < colums) {
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(items[i].offsetHeight);

        } else {
            //第二行以上的
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            items[i].style.top = arr[index] + gap + 'px';
            items[i].style.left = items[index].offsetLeft + 'px';
            arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
    }
}
//页面尺寸改变时实时触发
window.onresize = function () {
    waterFall();
}
function getClient() {
    return {
        width: waterfall.clientWidth || waterfall.offsetWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}