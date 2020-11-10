(function() {
  let thisLocation = encodeURI(window.location.href);
  let thisFacebook = document.getElementById("facebook_sharer");
  let thisTwitter = document.getElementById("twitter_sharer");
  let thisWhatsapp = document.getElementById("whatsapp_sharer");

  let goToPage = sharer => {
    switch (sharer) {
      case "facebook":
        {
          return "https://www.facebook.com/sharer/sharer.php?u=" + thisLocation;
        }
        break;
      case "twitter":
        {
          return (
            "http://twitter.com/intent/tweet?text=Seguimos%20conectados&amp;url=" +
            thisLocation
          );
        }
        break;
      case "whatsapp":
        {
          return (
            "https://web.whatsapp.com/send?text=Seguimos%20conectados " +
            thisLocation
          );
        }
        break;
    }
  };

  let addEventToSharer = (domElem, sharer) => {
    domElem.addEventListener("click", e => {
      event.preventDefault();
      window.open(goToPage(sharer));
    });
  };

  let initShare = () => {
    addEventToSharer(thisFacebook, "facebook");
    addEventToSharer(thisTwitter, "twitter");
    addEventToSharer(thisWhatsapp, "whatsapp");
  };

  window.addEventListener("load", () => {
    initShare();
  });
})();
