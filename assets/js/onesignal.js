if (document.documentElement.clientWidth  >= 900) {
	
  var myscript = document.createElement('script');
  myscript.setAttribute('src','https://cdn.onesignal.com/sdks/OneSignalSDK.js');
  document.head.appendChild(myscript);
	
  window.OneSignal = window.OneSignal || [];

  OneSignal.push(function () {
    OneSignal.SERVICE_WORKER_UPDATER_PATH = "OneSignalSDKUpdaterWorker.js.php";
    OneSignal.SERVICE_WORKER_PATH = "OneSignalSDKWorker.js.php";
    OneSignal.SERVICE_WORKER_PARAM = { scope: "/" };

    OneSignal.setDefaultNotificationUrl("https://peacefulscience.org");
    var oneSignal_options = {};
    window._oneSignalInitOptions = oneSignal_options;

    oneSignal_options["appId"] = "3f375261-7ee3-4a7a-bd37-34219a6ac3c6";
    oneSignal_options["allowLocalhostAsSecureOrigin"] = true;
    oneSignal_options["welcomeNotification"] = {};
    oneSignal_options["welcomeNotification"]["title"] = "";
    oneSignal_options["welcomeNotification"]["message"] = "";
    oneSignal_options["path"] =
      "https://peacefulscience.org/wp-content/plugins/onesignal-free-web-push-notifications/sdk_files/";
    oneSignal_options["safari_web_id"] =
      "N2I3NjAwNTktZDhhZi00MjI1LWE2MmEtMGYxYzM5NjYxMTdj";
    oneSignal_options["promptOptions"] = {};
    oneSignal_options["notifyButton"] = {};
    oneSignal_options["notifyButton"]["enable"] = true;
    oneSignal_options["notifyButton"]["position"] = "bottom-left";
    oneSignal_options["notifyButton"]["theme"] = "inverse";
    oneSignal_options["notifyButton"]["size"] = "medium";
    oneSignal_options["notifyButton"]["showCredit"] = false;
    oneSignal_options["notifyButton"]["text"] = {};
    oneSignal_options["notifyButton"]["colors"] = {};
    oneSignal_options["notifyButton"]["colors"]["circle.background"] = "black";
    oneSignal_options["notifyButton"]["colors"]["circle.foreground"] = "white";
    oneSignal_options["notifyButton"]["colors"]["badge.background"] = "black";
    oneSignal_options["notifyButton"]["colors"]["badge.foreground"] = "white";
    oneSignal_options["notifyButton"]["colors"]["badge.bordercolor"] = "black";
    oneSignal_options["notifyButton"]["colors"]["pulse.color"] = "#006600";
    oneSignal_options["notifyButton"]["colors"]["dialog.button.background"] =
      "#006600";
    oneSignal_options["notifyButton"]["colors"][
      "dialog.button.background.hovering"
    ] = "#006600";
    oneSignal_options["notifyButton"]["colors"][
      "dialog.button.background.active"
    ] = "#006600";
    oneSignal_options["notifyButton"]["colors"]["dialog.button.foreground"] =
      "white";
    OneSignal.init(window._oneSignalInitOptions);
    OneSignal.showNativePrompt();
  });

  function documentInitOneSignal() {
    var oneSignal_elements =
      document.getElementsByClassName("OneSignal-prompt");

    var oneSignalLinkClickHandler = function (event) {
      OneSignal.push(["registerForPushNotifications"]);
      event.preventDefault();
    };
    for (var i = 0; i < oneSignal_elements.length; i++)
      oneSignal_elements[i].addEventListener(
        "click",
        oneSignalLinkClickHandler,
        false
      );
  }

  if (document.readyState === "complete") {
    documentInitOneSignal();
  } else {
    window.addEventListener("load", function (event) {
      documentInitOneSignal();
    });
  }
}
