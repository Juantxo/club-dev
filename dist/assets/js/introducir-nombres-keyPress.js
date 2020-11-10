(window => {
  const XHR = new XMLHttpRequest();
  const formElem = document.getElementById("namesForm");
  const inputElems = document.querySelectorAll("input[type=text]");
  const errorElems = document.querySelectorAll("p.error");
  let movistar_list = window["movistar"].movistar_list;
  let isInResponse = window["movistar"]["helpers"].isInResponse;
  let invariables = window["movistar"]["helpers"].invariables;
  let errorMessages = window["movistar"].errorMessages;

  let findErrorElem = finder => {
    let found;
    errorElems.forEach(err => {
      if (err.id === finder) {
        found = err;
      }
    });
    return found;
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

  let checkCharacterOnKeypress = e => {
    let regex = new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$");
    let key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  };

  let checkWordsOnBlur = e => {
    let inpuId = e.currentTarget.id;
    let errorEl = findErrorElem(inpuId + "error");

    if (e.currentTarget.value === "") {
      e.currentTarget.value = "Introduzca un nombre";
    }

    if (
      e.currentTarget.value != "" &&
      e.currentTarget.value != "Introduzca un nombre"
    ) {
      // remove white spaces
      let originalValue = e.currentTarget.value.replace(/\s\s+/g, " ").trim();
      // split words
      let wordsToCheck = originalValue.split(" ");
      // object with words to find on xhr response
      let selectedWordsToFind = getWordsToFind(wordsToCheck);
      // name to check (string: "iñigo carmen")
      let name =
        selectedWordsToFind.toCheck.length === 2
          ? selectedWordsToFind.toCheck[0] +
            " " +
            selectedWordsToFind.toCheck[1]
          : selectedWordsToFind.toCheck[0];
      //let result = [];

      // if name is more than two words, log error.
      if (selectedWordsToFind.toCheck.length > 2) {
        errorEl.innerHTML = errorMessages.larges;
        e.currentTarget.setAttribute("data-test", "error");
        return;
      } else {
        errorEl.innerHTML = "";
      }
      // if is on the database says ok if not says error
      if (isInResponse(name, JSON.parse(XHR.responseText))) {
        //result.push(name);
        e.currentTarget.setAttribute("data-test", "ok");
        return;
      } else {
        //e.currentTarget.value = "";
        e.currentTarget.setAttribute("data-test", "error");
        errorEl.innerHTML = errorMessages.notFound;
      }
    }
    if (e.currentTarget.value === "") {
      e.currentTarget.setAttribute("data-test", "empty");
    }

    return;
  };
  let resetErrorOnFocus = e => {
    if (e.currentTarget.value === "Introduzca un nombre") {
      e.currentTarget.value = "";
    }
    let inpuId = e.currentTarget.id;
    let errorEl = findErrorElem(inpuId + "error");
    errorEl.innerHTML = "";
  };

  let addEventsToInputs = () => {
    inputElems.forEach(input => {
      input.addEventListener("keypress", checkCharacterOnKeypress, false);
      input.addEventListener("blur", checkWordsOnBlur, false);
      input.addEventListener("focus", resetErrorOnFocus, false);
    });
  };

  let showForm = () => {
    if (formElem.classList.contains("hidden")) {
      formElem.classList.remove("hidden");
    }
  };

  XHR.open("GET", movistar_list);
  XHR.send();

  XHR.onload = () => {
    // Process our return data
    if (XHR.status >= 200 && XHR.status < 300) {
      init(XHR.responseText);
    } else {
      //console.log("The request failed!");
    }
    //console.log("This always runs...");
  };

  let init = res => {
    showForm();
    addEventsToInputs();
  };
})(document);

//# sourceMappingURL=introducir-nombres-keyPress.js.map
