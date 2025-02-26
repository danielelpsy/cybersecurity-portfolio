/* 
  Script per:
  - Persistenza e applicazione della lingua scelta (usando localStorage)
  - Traduzione degli elementi tramite attributi data-i18n, data-i18n-title e data-i18n-text
  - Inizializzazione di particles.js, animazioni GSAP, feed RSS e effetto "typewriter"
*/

// Dizionario traduzioni
const translations = {
  it: {
    menuTitle: "Menù",
    menuHome: "Home",
    menuCurriculum: "Curriculum",
    menuCertifications: "Certificazioni",
    menuRecognitions: "Riconoscimenti",
    menuStudy: "Percorso di Studio",
    newsTitle: "Ultime Notizie CyberSec",
    headerSubtitle: "Portfolio Cybersecurity",
    aboutText: "Ciao! Sono Daniele Armentano, un appassionato di cybersecurity, con una solida esperienza in penetration testing, gestione delle vulnerabilità e sicurezza di rete. Esplora i miei lavori e scopri con me come rendere il mondo digitale più sicuro.",
    cvDesc: "Attualmente collaboro con programmi di bug bounty per migliorare la sicurezza di aziende globali.",
    downloadCV: "Scarica il Curriculum",
    certDetailTitle: "Dettagli sulle Certificazioni",
    certDetailText: "In questa sezione troverai le mie principali certificazioni in ambito cybersecurity, con link per approfondire i dettagli o verificarne l’autenticità.",
    recTitle: "Riconoscimenti",
    recText: "Durante la mia carriera nel campo della cybersecurity, ho collaborato con aziende leader e piattaforme globali, contribuendo al rafforzamento della loro sicurezza attraverso la scoperta e la segnalazione di vulnerabilità critiche.",
    viewRecognition: "Visualizza il riconoscimento",
    studyPageTitle: "Percorso di Studio - Daniele Armentano",
    studyHeader: "Percorso di Studio",
    // Testi per le card
    cardCurriculumTitle: "Curriculum",
    cardCurriculumText: "Scarica e visualizza il mio CV completo.",
    cardCertTitle: "Certificazioni",
    cardCertText: "Scopri le mie certificazioni professionali.",
    cardRecTitle: "Riconoscimenti",
    cardRecText: "Visualizza i miei contributi alla sicurezza.",
    profilesTitle: "Profili",
    // Nuovi testi
    typewriterText: "Benvenuto nel mio portfolio!\nInizializzazione dei Protocolli di Sicurezza...\n[✓]\n",
    oracleDesc: "Inserito nella Oracle Critical Patch Update Advisory di luglio 2023 per il programma On-Line Presence Security Contributors.",
    playstationDesc: "Inserito nella classifica dei principali ricercatori di sicurezza su HackerOne per il 2023, al 20° posto globale.",
    grindrDesc: "Classificato al 12° posto nella lista dei principali ricercatori di sicurezza su HackerOne per il 2023.",
    // Traduzioni per le certificazioni (descrizioni)
    certificate_PenTest_desc: "Certificazione avanzata per professionisti nel penetration testing, con un focus specifico su test di sicurezza e gestione delle vulnerabilità.",
    certificate_CEH_desc: "Certificazione leader per test di penetrazione e sicurezza etica, che attesta solide competenze nell’individuazione di vulnerabilità e tecniche di attacco.",
    certificate_Security_desc: "Dimostra competenze essenziali nella sicurezza di rete, nella gestione delle minacce e delle vulnerabilità, nonché nella conformità e nelle operazioni di sicurezza.",
    certificate_Network_desc: "Attesta competenze di amministrazione, configurazione e protezione di reti cablate e wireless, fondamentali per ogni professionista IT."
  },
  en: {
    menuTitle: "Menu",
    menuHome: "Home",
    menuCurriculum: "Curriculum",
    menuCertifications: "Certifications",
    menuRecognitions: "Recognitions",
    menuStudy: "Study Path",
    newsTitle: "Latest CyberSec News",
    headerSubtitle: "Cybersecurity Portfolio",
    aboutText: "Hello! I’m Daniele Armentano, a dedicated cybersecurity enthusiast with a proven track record in penetration testing, vulnerability management, and network security. Explore my work and join me on a journey to a safer digital world.",
    cvDesc: "I currently collaborate on bug bounty programs to enhance the security of global companies.",
    downloadCV: "Download Curriculum Vitae",
    certDetailTitle: "Certification Details",
    certDetailText: "In this section you will find my main certifications in cybersecurity along with links for further details or verification.",
    recTitle: "Recognitions",
    recText: "Throughout my cybersecurity career, I have collaborated with leading companies and global platforms, enhancing their security by identifying and reporting critical vulnerabilities.",
    viewRecognition: "View Recognition",
    studyPageTitle: "Study Path - Daniele Armentano",
    studyHeader: "Study Path",
    // Testi per le card
    cardCurriculumTitle: "Curriculum",
    cardCurriculumText: "Download and view my complete CV.",
    cardCertTitle: "Certifications",
    cardCertText: "View my professional certifications.",
    cardRecTitle: "Recognitions",
    cardRecText: "See my contributions to cybersecurity.",
    profilesTitle: "Profiles",
    // Nuovi testi
    typewriterText: "Welcome to my portfolio!\nInitializing Security Protocols...\n[✓]\n",
    oracleDesc: "Included in the Oracle Critical Patch Update Advisory of July 2023 for the On-Line Presence Security Contributors program.",
    playstationDesc: "Ranked among the top security researchers on HackerOne in 2023, at 20th place globally.",
    grindrDesc: "Ranked 12th among the top security researchers on HackerOne in 2023.",
    // Traduzioni per le certificazioni (descrizioni)
    certificate_PenTest_desc: "Advanced certification for penetration testing professionals with a focus on security testing and vulnerability management.",
    certificate_CEH_desc: "The leading certification for penetration testing and ethical security, attesting solid skills in vulnerability identification and attack techniques.",
    certificate_Security_desc: "Demonstrates essential skills in network security, threat and vulnerability management, as well as compliance and security operations.",
    certificate_Network_desc: "Certifies skills in managing, configuring, and securing wired and wireless networks, fundamental for every IT professional."
  }
};

// Restituisce la lingua corrente (dal localStorage o dal parametro URL; default "it")
function getLanguage() {
  let lang = localStorage.getItem('preferredLang');
  if (lang) return lang;
  const params = new URLSearchParams(window.location.search);
  lang = (params.get('lang') === 'en') ? 'en' : 'it';
  localStorage.setItem('preferredLang', lang);
  return lang;
}

// Applica le traduzioni agli elementi dotati degli attributi data-i18n, data-i18n-title e data-i18n-text
function applyTranslations() {
  const lang = getLanguage();
  
  // Elementi con data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Elementi con data-i18n-title (es. nelle card)
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (translations[lang][key]) {
      const header = el.querySelector("h3");
      if (header) header.textContent = translations[lang][key];
    }
  });

  // Elementi con data-i18n-text (es. nelle card)
  document.querySelectorAll("[data-i18n-text]").forEach(el => {
    const key = el.getAttribute("data-i18n-text");
    if (translations[lang][key]) {
      const p = el.querySelector("p");
      if (p) p.textContent = translations[lang][key];
    }
  });

  // Aggiorna il tag <title> se siamo in "study.html"
  if (window.location.pathname.includes("study.html") && translations[lang].studyPageTitle) {
    document.title = translations[lang].studyPageTitle;
  }
}

// Mostra/nasconde i blocchi nella pagina study.html in base alla lingua
function switchStudyLanguage() {
  const lang = getLanguage();
  document.querySelectorAll(".study-info .lang-it").forEach(el => {
    el.style.display = (lang === "it") ? "block" : "none";
  });
  document.querySelectorAll(".study-info .lang-en").forEach(el => {
    el.style.display = (lang === "en") ? "block" : "none";
  });
}

// Imposta i listener sul selettore di lingua
function setupLanguageSwitcher() {
  document.querySelectorAll(".lang-switcher a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedLang = link.getAttribute("data-lang");
      localStorage.setItem("preferredLang", selectedLang);
      applyTranslations();
      switchStudyLanguage();
    });
  });
}

// Inizializza particles.js se presente
function initParticles() {
  if (window.particlesJS && document.getElementById("particles-js")) {
    particlesJS.load("particles-js", {
      particles: {
        number: { value: 70 },
        color: { value: "#00ff00" },
        shape: { type: "circle" },
        opacity: { value: 0.3 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00ff00",
          opacity: 0.3,
          width: 1
        },
        move: { enable: true, speed: 2 }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 200, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    }, () => console.log("particles.js config loaded"));
  }
}

// Animazione GSAP sul titolo (se presente)
function animateTitle() {
  const titleEl = document.getElementById("terminal-text");
  if (window.gsap && titleEl) {
    gsap.from(titleEl, { duration: 1, x: -100, opacity: 0, ease: "power3.out" });
  }
}

// Carica il feed RSS
function loadSecurityFeed() {
  const RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews";
  const feedList = document.getElementById("feed-list");
  const feedError = document.getElementById("feed-error");
  
  if (!feedList || !feedError) return;
  feedList.innerHTML = "";
  feedError.textContent = "";

  fetch(RSS_URL)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (!data.items) throw new Error("Formato dati non valido.");
      data.items.slice(0, 5).forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>`;
        feedList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Errore nel caricamento del feed RSS:", error);
      feedError.textContent = "Impossibile caricare le ultime notizie.";
    });
}

// Effetto "typewriter" che usa il testo dal dizionario
function typeWriter() {
  const twElement = document.getElementById("typewriter");
  if (!twElement) return;
  const lang = getLanguage();
  const text = translations[lang].typewriterText;
  let i = 0;
  const typingSpeed = 40;
  function typeEffect() {
    if (i < text.length) {
      twElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeEffect, typingSpeed);
    }
  }
  typeEffect();
}

// Al caricamento del DOM, esegue tutte le funzioni
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  setupLanguageSwitcher();
  switchStudyLanguage();
  initParticles();
  animateTitle();
  loadSecurityFeed();
  typeWriter();
});
