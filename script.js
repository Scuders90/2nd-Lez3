const scenarios = [
    {
        url: "https://www.bancasicura.it",
        title: "Banca Online",
        content: "Accedi al tuo conto",
        isSecure: true,
        hasLock: true,
        explanation: "Sito sicuro: ha HTTPS e il lucchetto"
    },
    {
        url: "http://www.offerta-speciale.net",
        title: "OFFERTA SPECIALE!",
        content: "Hai vinto un premio! Clicca qui per ritirarlo.",
        isSecure: false,
        hasLock: false,
        explanation: "Sito non sicuro: manca HTTPS e contiene offerte sospette"
    },
    {
        url: "https://www.amazon-account.tk",
        title: "Amazon Login",
        content: "Verifica il tuo account Amazon",
        isSecure: false,
        hasLock: true,
        explanation: "Attenzione al dominio sospetto .tk"
    }
];

let currentScenario = 0;
let score = 0;

function loadScenario(index) {
    const scenario = scenarios[index];
    const container = document.querySelector('.scenario-container');
    
    container.innerHTML = `
        <div class="scenario">
            <div class="website">
                <div class="website-header">
                    ${scenario.title}
                </div>
                <div class="website-content">
                    <p>${scenario.content}</p>
                    <div class="actions">
                        <button class="button" onclick="checkSecurity(true)">Sito Sicuro</button>
                        <button class="button" onclick="checkSecurity(false)">Sito Non Sicuro</button>
                    </div>
                    <div class="feedback"></div>
                </div>
            </div>
        </div>
    `;

    // Aggiorna la barra degli indirizzi
    document.querySelector('.address-bar input').value = scenario.url;
    document.querySelector('.security-indicator').innerHTML = 
        scenario.hasLock ? '🔒' : '❌';
}

function checkSecurity(userAnswer) {
    const scenario = scenarios[currentScenario];
    const feedback = document.querySelector('.feedback');
    
    if (userAnswer === scenario.isSecure) {
        score += 10;
        feedback.className = 'feedback success';
        feedback.textContent = `Corretto! ${scenario.explanation}`;
    } else {
        score -= 5;
        feedback.className = 'feedback error';
        feedback.textContent = `Sbagliato. ${scenario.explanation}`;
    }
    
    document.querySelector('#score span').textContent = score;
    feedback.style.display = 'block';
    
    setTimeout(() => {
        currentScenario = (currentScenario + 1) % scenarios.length;
        loadScenario(currentScenario);
    }, 2000);
}

window.onload = () => loadScenario(0);
