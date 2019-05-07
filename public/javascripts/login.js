window.onload = function () {

    var close = document.getElementsByClassName('close');

    var mimicry = document.getElementsByClassName('mimicry')[0];

    var frame = document.getElementsByClassName('frame');
    // console.log(frame)

    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            mimicry.style.display = "none";
        }
    }

    var btn = document.getElementsByClassName('btn');
    btn[0].onclick = function () {
        mimicry.style.display = "block";
        frame[0].style.display = "block";
        frame[1].style.display = "none";


    }
    btn[1].onclick = function () {
        mimicry.style.display = "block";
        frame[1].style.display = "block";
        frame[0].style.display = "none";

    }

}