function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function loadMailLinks() {
    const links = document.querySelectorAll("[data-mail]");
    links.forEach((item) => {
        if (item.nodeName.toLowerCase() === "a") {
            let dataMail = item.getAttribute("data-mail");
            item.removeAttribute("data-mail");

            const onmouseenter =
                "this.href='mailto:'+this.dataset.mail.replaceAll(' at ', '@').replaceAll(' point ', '.');";
            const onmouseleave = "this.href='#';";

            const key = "k" + makeid(6).toLowerCase();

            item.setAttribute("href", "#");
            item.setAttribute(`data-${key}`, dataMail);
            item.setAttribute("onmouseenter", onmouseenter.replace("dataset.mail.", `dataset.${key}.`));
            item.setAttribute("onmouseleave", onmouseleave);
        }
    });
}
loadMailLinks();

function sanitize(string) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;"
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
}
function sendMail(btn) {
    btn.disabled = true;
    btn.innerText = "Préparation du message...";

    const subjectDom = document.getElementById("contact_subject");
    subjectDom.disabled = true;
    subjectDom.classList.add("disabled");
    const nameDom = document.getElementById("contact_name");
    nameDom.disabled = true;
    nameDom.classList.add("disabled");
    const emailDom = document.getElementById("contact_email");
    emailDom.disabled = true;
    emailDom.classList.add("disabled");
    const bodyDom = document.getElementById("contact_message");
    bodyDom.disabled = true;
    bodyDom.classList.add("disabled");

    emailjs.init("user_ScBMzSHBurP66GIdXaY7X");

    const templateParams = {
        subject: sanitize(subjectDom.value),
        name: sanitize(nameDom.value),
        from: sanitize(emailDom.value),
        message: sanitize(bodyDom.value)
    };

    btn.innerText = "Envoie en cours...";

    emailjs.send("service_lbz32ue", "template_6ukge1a", templateParams).then(
        function (response) {
            btn.innerText =
                "Message envoyé. Pour limiter les spams, le formulaire reste désactivé 60s après l'envoie du message.";
        },
        function (error) {
            btn.innerText = "Erreur!";
        }
    );

    setTimeout(() => {
        subjectDom.value = "";
        subjectDom.classList.remove("disabled");
        subjectDom.disabled = false;

        nameDom.value = "";
        nameDom.classList.remove("disabled");
        nameDom.disabled = false;

        emailDom.value = "";
        emailDom.classList.remove("disabled");
        emailDom.disabled = false;

        bodyDom.value = "";
        bodyDom.classList.remove("disabled");
        bodyDom.disabled = false;

        btn.innerText = "Envoyer le message";
        btn.disabled = false;
    }, 60000);
}
