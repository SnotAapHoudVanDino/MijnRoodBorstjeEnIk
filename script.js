// Wacht tot de DOM volledig geladen is
document.addEventListener("DOMContentLoaded", function () {
    alert("Ik hou van jou Robin ❤️");
});

// Functie om de geheime code te controleren
function checkCode() {
    let code = document.getElementById("accessCode").value;

    if (code === "28/08/2024") {
        // Toegang verleend, verberg inlog en toon hoofdinhoud
        document.getElementById("login").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    } else {
        // Foutieve code, toon melding
        alert("Foutieve code! Probeer opnieuw.");
    }
}

// Functie om foto’s en video's te tonen
function toonFotosVideos() {
    document.getElementById("content").innerHTML = `
        <h2>Foto’s en Video’s</h2>
        <p>Kies een categorie:</p>
        <button onclick="toonFotos('Zomaar jij en ik')">Zomaar jij en ik</button>
        <button onclick="toonFotos('Op reis')">Op reis</button>
        <button onclick="toonFotos('Kerstvakanties')">Kerstvakanties</button>
        <button onclick="toonFotos('Zomervakanties')">Zomervakanties</button>
        <button onclick="toonFotos('Uitstappen')">Uitstappen</button>
        <div id="gebeurtenissen"></div>
    `;
}

// Functie om foto’s/video's per categorie te tonen
function toonFotos(categorie) {
    let html = `
        <h3>Foto's en video's voor ${categorie}</h3>
        <input type="file" id="fileUpload" multiple accept="image/*, video/*">
        <button onclick="uploadFotos('${categorie}')">Upload Foto's/Video's</button>
        <div class="foto-container" id="fotoGalerij"></div>
    `;
    
    document.getElementById("gebeurtenissen").innerHTML = html;
    laadFotos(categorie);
}

// Functie om foto’s en video's op te slaan in localStorage
function uploadFotos(categorie) {
    let fileInput = document.getElementById("fileUpload");
    let files = fileInput.files;

    if (files.length === 0) {
        alert("Kies een foto of video om te uploaden.");
        return;
    }

    let fotosVideos = JSON.parse(localStorage.getItem(categorie)) || [];

    Array.from(files).forEach(file => {
        let reader = new FileReader();

        reader.onload = function (e) {
            fotosVideos.push(e.target.result);
            localStorage.setItem(categorie, JSON.stringify(fotosVideos));
            laadFotos(categorie);
        };

        reader.readAsDataURL(file);
    });
}

// Functie om opgeslagen foto's/video's weer te geven
function laadFotos(categorie) {
    let fotosVideos = JSON.parse(localStorage.getItem(categorie)) || [];
    let fotoGalerij = document.getElementById("fotoGalerij");

    fotoGalerij.innerHTML = fotosVideos.map(foto => {
        return foto.startsWith("data:image") ? 
            `<img src="${foto}" alt="Foto in ${categorie}" />` : 
            `<video controls><source src="${foto}" type="video/mp4">Je browser ondersteunt geen video</video>`;
    }).join('');
}

// Functie om het dagboek te tonen
function toonDagboek() {
    document.getElementById("content").innerHTML = `
        <h2>Dagboek</h2>
        <textarea id="dagboekInput" rows="4" cols="50" placeholder="Schrijf hier je bericht..."></textarea><br>
        <button onclick="opslaanDagboek()">Opslaan</button>
        <div id="dagboekEntries"></div>
    `;
    laadDagboek();
}

// Functie om een bericht in het dagboek op te slaan
function opslaanDagboek() {
    let tekst = document.getElementById("dagboekInput").value;
    let datum = new Date().toLocaleString();

    if (tekst.trim() === "") {
        alert("Het bericht mag niet leeg zijn.");
        return;
    }

    let berichten = JSON.parse(localStorage.getItem("dagboek")) || [];
    berichten.push({ datum, tekst });
    localStorage.setItem("dagboek", JSON.stringify(berichten));
    laadDagboek();
}

// Functie om het dagboek weer te geven
function laadDagboek() {
    let berichten = JSON.parse(localStorage.getItem("dagboek")) || [];
    let dagboekEntries = document.getElementById("dagboekEntries");

    dagboekEntries.innerHTML = berichten.map(entry => {
        return `<div><strong>${entry.datum}</strong><p>${entry.tekst}</p></div>`;
    }).join('');
}