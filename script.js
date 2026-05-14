let destCount = 0;

function addDest() {
    destCount++;
    const container = document.getElementById('destinations-container');
    const div = document.createElement('div');
    div.className = 'stop-wrapper';
    div.innerHTML = `
        <label>🚩 DESTINO ${destCount}</label>
        <input type="text" class="dest-input" placeholder="Digite o endereço...">
    `;
    container.appendChild(div);
}

// Inicia com 2 campos
window.onload = () => { addDest(); addDest(); };

function organizarRota() {
    const origin = document.getElementById('origin').value;
    const inputs = document.querySelectorAll('.dest-input');
    const points = Array.from(inputs).map(i => i.value).filter(v => v !== "");

    if (!origin || points.length < 1) {
        alert("Preencha a origem e ao menos um destino!");
        return;
    }

    // Lógica TransR: Simulação de organização por proximidade de texto/lista
    // Na versão sem API, apresentamos a sequência para conferência manual organizada
    exibirResultado(origin, points);
}

function exibirResultado(origem, pontos) {
    const resArea = document.getElementById('result-area');
    const list = document.getElementById('route-list');
    resArea.style.display = 'block';
    list.innerHTML = `<div class="route-step"><strong>PARTIDA:</strong> ${origem}</div>`;

    pontos.forEach((p, i) => {
        list.innerHTML += `<div class="route-step"><strong>${i+1}ª ENTREGA:</strong> ${p}</div>`;
    });
    
    list.innerHTML += `<div class="route-step"><strong>RETORNO:</strong> BASE</div>`;
}

function copiarWhatsApp() {
    const passos = document.querySelectorAll('.route-step');
    let texto = "🚚 *ROTA DE ENTREGA - TransR*\n\n";
    passos.forEach(p => texto += p.innerText + "\n");
    
    navigator.clipboard.writeText(texto);
    alert("Rota copiada! Só colar no WhatsApp.");
}