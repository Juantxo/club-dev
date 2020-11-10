(window => {
  const formElem = document.getElementById("namesForm") || null;
  const buttonElem = document.getElementById("goToMovistar") || null;

  const XHR = new XMLHttpRequest();

  let formIsOk = () => {
    let elements = formElem["elements"];
    let i, element;
    for (i = 0, element; (element = elements[i++]); ) {
      switch (element.getAttribute("data-test")) {
        case "empty":
        case "error":
          element.value = "";
          break;
        default:
          element.value = element.value;
      }
    }
    return true;
  };

  buttonElem.addEventListener("click", e => {
    if (formIsOk()) {
      return true;
    }
    return false;
  });
})(document);

//# sourceMappingURL=introducir-nombres-sendParams.js.map
