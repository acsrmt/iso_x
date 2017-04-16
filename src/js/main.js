document.addEventListener("DOMContentLoaded", function() {
    var toggle = true;
    document.querySelector(".main-nav__button").addEventListener("click", function() {
        if (toggle) {
            document.querySelector(".main-nav__list").classList.add("toggle");
            toggle = false;
        } else {
            document.querySelector(".main-nav__list").classList.remove("toggle");
            toggle = true;
        }
    });
    window.addEventListener("resize", function() {
        if (document.documentElement.clientWidth > 640) {
            document.querySelector(".main-nav__list").classList.remove("toggle");
        }
    });
});
