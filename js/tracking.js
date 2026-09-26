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
// kann). Diese Tunnel-Adresse aendert sich gelegentlich (z.B. bei einem
// Neustart des Containers) - dann hier die neue externe Adresse eintragen
// (siehe main.py-Log/README im dcardslab-manager-Repo).
(function () {
  var PING_URL = "https://app-8000-desonas.eur4.ugdocker.link/api/website-views/ping";
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
