$(document).ready(function () {
    $("#darkmode").click(function () {
      $("#darkmode-content").toggleClass("darkmode-style");
  
      if ($("body").css("background-color") === "rgb(255, 255, 255)") {
        $("body").css("background-color", "grey");
      } else {
        $("body").css("background-color", "white");
      }
    });
  });