(window => {
  let helpers = (window => {
    // "what?" version ... http://jsperf.com/diacritics/12
    let removeDiacritics = str => {
      let diacriticMap = window["movistar"].diacriticMap();
      return str.replace(/[^\u0000-\u007E]/g, a => {
        return diacriticMap[a] || a;
      });
    };
    let toTitleCase = str => {
      let i = 0;
      str = str.toLowerCase().split(" ");
      for (i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    };

    let getTheNameLength = name => {
      return name.split(" ").length;
    };

    let invariables = ["la", "las", "los", "de", "del"];

    let isInResponse = (name, response) => {
      let i;
      let responseKeys = response.keys;
      let responseLength = responseKeys.length;
      let nameToCheck = removeDiacritics(name)
        .toLowerCase()
        .trim();

      let switcher = getTheNameLength(nameToCheck);

      let checkSingleWord = singleWord => {
        for (i = 0; i < responseLength; i++) {
          if (singleWord === responseKeys[i].toLowerCase()) return true;
        }
        return false;
      };

      switch (switcher) {
        case 1:
          {
            return checkSingleWord(nameToCheck);
          }
          break;
        case 2:
          {
            let temp = nameToCheck.split(" ");
            if (checkSingleWord(temp[0])) {
              return checkSingleWord(temp[1]);
            }
            return false;
          }
          break;
        default:
          return false;
      }
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

    return {
      removeDiacritics: removeDiacritics,
      toTitleCase: toTitleCase,
      isInResponse: isInResponse,
      getParams: getParams,
      invariables: invariables
    };
  })(window);

  if (window["movistar"] === undefined) {
    window["movistar"] = {};
  }

  window["movistar"]["helpers"] = helpers;
})(document);
