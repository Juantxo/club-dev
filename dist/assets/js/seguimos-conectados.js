(window => {
  let mode = window["movistar"].mode; // dev or production
  let site = window["movistar"].site; // visualThinking
  let movistar_list = window["movistar"].movistar_list;
  let toTitleCase = window["movistar"].helpers.toTitleCase;
  let isInResponse = window["movistar"].helpers.isInResponse;
  let invariables = window["movistar"].helpers.invariables;

  const wordElem = "word_name";
  const videoElem = document.querySelector("video");
  const playVideoElem = document.getElementById("playVideoButton");

  let getLocationHref = () => {
    return mode === "dev"
      ? window["movistar"]["dummy_href"]
      : window.location.href;
  };

  let names = [];
  let isPlaying = false;
  let xhr = new XMLHttpRequest();

  const paramsInterval = 1480;

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

  let getWordsToFind = stringArray => {
    let result = {
      toCheck: [],
      invars: []
    };

    stringArray.forEach(s => {
      if (invariables.indexOf(s) >= 0) {
        result.invars.push(s);
      } else {
        result.toCheck.push(s);
      }
    });

    return result;
  };

  let buildTheFinalName = obj => {
    let i;
    let result = "";
    result += toTitleCase(obj.toCheck[0]);

    for (i = 0; i < obj["invars"].length; i++) {
      if (i === 0) {
        result += " " + obj["invars"][i] + " ";
      }
      if (i === 1) {
        result += obj["invars"][i];
      }
    }
    if (!!obj.toCheck[1]) {
      result += " " + toTitleCase(obj.toCheck[1]);
    }
    return result;
  };

  let buildTheNameToCheck = arr => {
    if (arr.length === 2) {
      return arr[0] + " " + arr[1];
    }
    return arr[0];
  };
  let checkParams = (params, response) => {
    let namesToCheck = Object.values(params);
    let namesToCheckL = namesToCheck.length;
    let i;
    let result = [];

    for (i = 0; i < namesToCheckL; i++) {
      let originalName = namesToCheck[i];
      if (originalName != "") {
        let selectedWordsToFind = getWordsToFind(namesToCheck[i].split(" "));

        if (
          isInResponse(
            buildTheNameToCheck(selectedWordsToFind.toCheck),
            response
          )
        ) {
          result.push(buildTheFinalName(selectedWordsToFind));
        } else {
          result.push("&nbsp;");
        }
      } else {
        result.push("&nbsp;");
      }
    }
    return result;
  };

  let setParamsInterval = words => {
    let count = 0;
    let word = document.getElementById(wordElem);
    let timer = setInterval(() => {
      word.innerHTML = words[count % words.length];
      count++;
      if (count === 11) {
        clearInterval(timer);
        word.innerHTML = "&nbsp;";
      }
    }, paramsInterval);
  };

  let getXMLresponse = res => {
    let params = getParams(getLocationHref());
    return (names = checkParams(params, JSON.parse(res)));
  };

  // VIDEO MEDIA

  let playVideoTimeOut;
  let pauseVideoTimeOut;

  // video control

  let mutedVideo = () => {
    videoElem.muted = true;
  };
  let amplifiedVideo = () => {
    videoElem.muted = false;
  };

  let pauseVideo = () => {
    videoElem.autoplay = false;
    videoElem.pause();
  };
  let playVideo = e => {
    e.preventDefault;

    try {
      if (!isPlaying) {
        isPlaying = true;
        videoElem.play();
        setParamsInterval(names);
        toggleButtonState(playVideoElem, "hidden");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let playEnded = () => {
    try {
      if (isPlaying) {
        isPlaying = false;
        toggleButtonState(playVideoElem, "hidden");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let toggleButtonState = (buttonEl, buttonState) => {
    try {
      if (buttonEl.classList.contains(buttonState)) {
        buttonEl.classList.remove(buttonState);
      } else {
        buttonEl.classList.add(buttonState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let initParams = res => {
    getXMLresponse(res);
    toggleButtonState(playVideoElem, "hidden");
  };

  // ACTIONS
  xhr.open("GET", movistar_list);
  xhr.send();

  playVideoElem.addEventListener("click", playVideo, false);
  videoElem.addEventListener("ended", playEnded, false);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      initParams(xhr.responseText);
    } else {
      return;
    }
  };
})(document);

//# sourceMappingURL=seguimos-conectados.js.map
