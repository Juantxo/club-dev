(window => {
  let mode = "production"; // dev or production (for dummy url)
  let site = "localhost"; // localhost, botsoul or server (for list and form action)

  let server_white_list =
    "http://seguimosconectados.movistar.es/wp-content/themes/seguimos-conectados/data/white_list.json";
  let server_action =
    "http://seguimosconectados.movistar.es/seguimos-conectados";

  let local_white_list = "http://localhost:3000/assets/data/white_list.json";
  let local_action = "http://localhost:3000/seguimos-conectados";

  let botsoul_white_list =
    "https://www.botsoul.com/pruebas/movistar/dist/assets/data/white_list.json";
  let botsoul_server =
    "https://www.botsoul.com/pruebas/movistar/dist/seguimos-conectados";

  let movistar_list =
    site === "localhost"
      ? local_white_list
      : site === "botsoul"
      ? botsoul_white_list
      : server_white_list;

  let actionURL =
    site === "localhost"
      ? local_action
      : site === "botsoul"
      ? botsoul_server
      : server_action;

  let helpers = {};
  let errorMessages = {
    larges: "El nombre  es demasiado largo y no saldrá en el vídeo.",
    notFound:
      "El nombre  no existe en la base de datos y no saldrá en el vídeo. Debería teclear otro."
  };

  let dummy_href =
    "https://visualthinking.es/movistar/seguimos-conectados/?nombre1=%20Iñigo%20%20%20Ángel%20&nombre2=Maria%20%20%20Alexito&nombre3=Írene&nombre4=diego%20alejandro&nombre5=carmen&nombre6=Carlos&nombre7=Elisa&nombre8=%20%20zuriel%20%20%20%20%20%20isabella%20%20%20%20&nombre9=fernando&nombre10=williams";

  if (window["movistar"] === undefined) {
    window["movistar"] = {};
  }

  window["movistar"]["mode"] = mode;
  window["movistar"]["site"] = site;
  window["movistar"]["actionURL"] = actionURL;
  window["movistar"]["dummy_href"] = dummy_href;
  window["movistar"]["movistar_list"] = movistar_list;
  window["movistar"]["helpers"] = helpers;
  window["movistar"]["errorMessages"] = errorMessages;
})(document);

//# sourceMappingURL=movistar-common.js.map

//# sourceMappingURL=movistar-common.js.map
