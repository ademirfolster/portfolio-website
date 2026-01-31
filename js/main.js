const newsletterBtn = document.getElementById("newsletter-btn");

let aberta = false;

function abrirNewsletter() {
    if (!aberta) {
        status.textContent = "Em breve newsletter com artigos, estudos e bastidores.";
        aberta = true;
    } else {
        status.textContent = "";
        aberta = false;
    }
    };

newsletterBtn.addEventListener("click", abrirNewsletter);



