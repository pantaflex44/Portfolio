const stickyMenubar = document.querySelector(".sticky__menubar");
const scrollToTopArrow = document.querySelector(".scrollToTop");

const aboutSection = document.querySelector(".about");
const workSection = document.querySelector(".work");
const contactSection = document.querySelector(".contact");
const sections = [aboutSection, workSection, contactSection];

const ageBox = document.getElementById("author_age");

const shadowHome1 = document.querySelector(".shadow-home-1");
const shadowHome2 = document.querySelector(".shadow-home-2");
const shadowHome3 = document.querySelector(".shadow-home-3");

function getAge(birthday = "07/26/1981") {
    const dob = new Date(birthday);
    const month_diff = Date.now() - dob.getTime();
    const age_dt = new Date(month_diff);
    const year = age_dt.getUTCFullYear();

    return Math.abs(year - 1970);
}

function randomString(length = 8) {
    var result = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!:;.§%¨^ù?,$£+=°)]}@àç_-|([{"#é~&';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function setRandomString() {
    if (shadowHome1) shadowHome1.innerText = randomString(5);
    if (shadowHome2) shadowHome2.innerText = randomString(5);
    if (shadowHome3) shadowHome3.innerText = randomString(5);
}

function rollRandomString() {
    let counter = 0;
    const loop = setInterval(() => {
        setRandomString();

        counter++;
        if (counter > 10) clearInterval(loop);
    }, 50);
}

function isElementVisible(el) {
    if (!el) return false;

    let top = el.offsetTop - 1;
    let left = el.offsetLeft - 1;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < window.pageYOffset + window.innerHeight &&
        left < window.pageXOffset + window.innerWidth &&
        top + height > window.pageYOffset &&
        left + width > window.pageXOffset
    );
}

function isElementInViewport(el) {
    if (!el) return false;
}

document.addEventListener(
    "scroll",
    (evt) => {
        if (window.scrollY && window.scrollY >= window.innerHeight - 20) {
            stickyMenubar.style.transform = "scaleY(1)";
            scrollToTopArrow.style.opacity = 1;

            for (const section of sections) {
                const classname = section.dataset.stickyMenuClassname || null;
                if (classname) {
                    const menuLink = document.querySelector(`.${classname}`);
                    if (menuLink) {
                        if (section && isElementVisible(section)) {
                            menuLink.classList.add("active");
                        } else {
                            menuLink.classList.remove("active");
                        }
                    }
                }
            }
        } else {
            scrollToTopArrow.style.opacity = 0;
            stickyMenubar.style.transform = "scaleY(0)";
        }
    },
    { passive: true }
);

window.addEventListener("DOMContentLoaded", (evt) => {
    if (ageBox) {
        ageBox.innerText = `${getAge()} ans`;
    }

    setInterval(() => {
        rollRandomString();
        setRandomString();
    }, 10000);

    rollRandomString();
});

if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}

window.onbeforeunload = (evt) => {
    window.scrollTo(0, 0);
};
