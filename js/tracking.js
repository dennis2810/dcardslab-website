// Zaehlt Seitenaufrufe von dcardslab.de im DCardsLab-Manager-Tool
// (main.py's oeffentlicher POST /api/website-views/ping, siehe
// dcardslab-manager-Repo, Backlog "Website-Views für dcardslab.de").
// navigator.sendBeacon() statt fetch(): fire-and-forget, funktioniert auch
// waehrend eines Seitenwechsels zuverlaessig, und der Browser liest die
// Antwort nie - deshalb braucht der Endpoint keine CORS-Header. Keine
// Cookies, keine Besucher-ID, keine IP-Speicherung im Tool - nur ein
// grober taeglicher Zaehler.
//
// PING_URL muss die OEFFENTLICH erreichbare Adresse des Tools sein (nicht
// die interne 192.168.x-Adresse, die ein Website-Besucher nie erreichen
// kann). Laeuft seit 26.09.2026 ueber einen Cloudflare Tunnel (cloudflared
// auf dem NAS) statt der bisherigen, gelegentlich wechselnden und zudem
// login-pflichtigen ugdocker.link-Adresse (die leitete anonyme Besucher auf
// den NAS-Login um statt zum Tool durchzulassen - Ursache der "keine Views"-
// Meldungen) - app.dcardslab.de ist jetzt fest und ohne Login erreichbar.
(function () {
  var PING_URL = "https://app.dcardslab.de/api/website-views/ping";
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(PING_URL);
    } else {
      fetch(PING_URL, { method: "POST", mode: "no-cors", keepalive: true }).catch(function () {});
    }
  } catch (err) {
    // Aufruf soll nie die Seite selbst stoeren.
  }
})();
