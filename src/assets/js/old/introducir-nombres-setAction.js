(window => {
  let actionURL = window["movistar"].actionURL;

  const formElem = document.getElementById("namesForm") || null;

  let getLocationHref = () => {
    return window.location.href;
  };

  let getParams = url => {
    let params = {};
    let parser = document.createElement("a");
    parser.href = url;
    let query = parser.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      params[pair[0]] = decodeURIComponent(pair[1])
        .replace(/\+/g, " ")
        .replace(/\s\s+/g, " ")
        .trim();
    }
    return params;
  };
  let getXMLresponse = () => {
    let params = getParams(getLocationHref());
    return params;
  };

  let setFormAction = () => {
    if (formElem) {
      let videoNumber = getXMLresponse()["video"];

      switch (videoNumber) {
        case "1":
          formElem["action"] = actionURL + "/";
          break;
        case "2":
        case "3":
          formElem["action"] = actionURL + "-" + videoNumber + "/";
          break;
        default:
          formElem["action"] = actionURL + "/";
      }
    }
  };

  setFormAction();
})(document);
