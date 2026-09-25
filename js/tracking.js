// Zaehlt Seitenaufrufe von dcardslab.de im DCardsLab-Manager-Tool
// (main.py's oeffentlicher POST /api/website-views/ping, siehe
// dcardslab-manager-Repo, Backlog "Website-Views für dcardslab.de").
// navigator.sendBeacon() statt fetch(): fire-and-forget, funktioniert auch
// waehrend eines Seitenwechsels zuverlaessig, und der Browser liest die
// Antwort nie - deshalb braucht der Endpoint keine CORS-Header. Keine
// Cookies, keine Besucher-ID, keine IP-Speicherung im Tool - nur ein
// grober taeglicher Zaehler.
(function () {
  var PING_URL = "https://app-8000-desonas.eur9.ugdocker.link/api/website-views/ping";
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
