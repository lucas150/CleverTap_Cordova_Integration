document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('onCleverTapProfileSync', onCleverTapProfileSync, false); 
document.addEventListener('onCleverTapProfileDidInitialize', onCleverTapProfileDidInitialize, false);
document.addEventListener('onCleverTapInAppNotificationDismissed', onCleverTapInAppNotificationDismissed, false);
document.addEventListener('onDeepLink', onDeepLink, false);
document.addEventListener('onPushNotification', onPushNotification, false); 
document.addEventListener('onCleverTapInboxDidInitialize', onCleverTapInboxDidInitialize, false); 
document.addEventListener('onCleverTapInboxMessagesDidUpdate', onCleverTapInboxMessagesDidUpdate, false);
document.addEventListener('onCleverTapInboxButtonClick', onCleverTapInboxButtonClick, false); 
document.addEventListener('onCleverTapInAppButtonClick', onCleverTapInAppButtonClick, false); 
document.addEventListener('onCleverTapFeatureFlagsDidUpdate', onCleverTapFeatureFlagsDidUpdate, false);
document.addEventListener('onCleverTapProductConfigDidInitialize', onCleverTapProductConfigDidInitialize, false);
document.addEventListener('onCleverTapProductConfigDidFetch', onCleverTapProductConfigDidFetch, false); 
document.addEventListener('onCleverTapProductConfigDidActivate', onCleverTapProductConfigDidActivate, false); 
document.addEventListener('onCleverTapDisplayUnitsLoaded', onCleverTapDisplayUnitsLoaded, false); 

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    // Notify CleverTap that the device is ready
    CleverTap.notifyDeviceReady();
    CleverTap.setDebugLevel(3);


    
}
document.getElementById("Login").addEventListener("click", function () {
    console.log("Login function called");
    CleverTap.onUserLogin(profile,stuff);
  });
    var stuff = ["bags", "shoes"];
    var profile = {
        'Name': 'adit',
        'Identity': '11112',
        'Email': 'captain@gmail.com',
        'Phone': '+14155551234',
        'stuff': stuff
    }   

document.getElementById("Login").addEventListener("click", function () {
    console.log("Login function called");
    CleverTap.onUserLogin(profile);
  });

  function onCleverTapProfileSync(e) {
    console.log("onCleverTapProfileSync", e);
  }
  function onCleverTapProfileDidInitialize(e) {
    console.log("onCleverTapProfileDidInitialize", e);
  }
  function onCleverTapInAppNotificationDismissed(e) {
    console.log("onCleverTapInAppNotificationDismissed", e);
  }
// deep link handling  
function onDeepLink(e) {
    console.log(e.deeplink);  
}

// push notification data handling
function onPushNotification(e) {
    console.log(JSON.stringify(e.notification));
}

function onCleverTapInboxDidInitialize() {
    CleverTap.showInbox({"navBarTitle":"My App Inbox","tabs": ["tag1", "tag2"],"navBarColor":"#FF0000"});
}
    
function onCleverTapInboxMessagesDidUpdate() {
    CleverTap.getInboxMessageUnreadCount(function(val) {console.log("Inbox unread message count"+val);})
    CleverTap.getInboxMessageCount(function(val) {console.log("Inbox read message count"+val);});
}

function onCleverTapInAppButtonClick(e) {
    console.log("onCleverTapInAppButtonClick");
    console.log(e.customExtras);
}

function onCleverTapInboxButtonClick(e) {
    console.log("onCleverTapInboxButtonClick");
    console.log(e.customExtras);
}

function onCleverTapFeatureFlagsDidUpdate() {
    console.log("onCleverTapFeatureFlagsDidUpdate");
}

function onCleverTapProductConfigDidInitialize() {
    console.log("onCleverTapProductConfigDidInitialize");
}

function onCleverTapProductConfigDidFetch() {
    console.log("onCleverTapProductConfigDidFetch");
}

function onCleverTapProductConfigDidActivate() {
    console.log("onCleverTapProductConfigDidActivate");
}

function onCleverTapDisplayUnitsLoaded(e) {
    console.log("onCleverTapDisplayUnitsLoaded", e.units);

    const displayContainer = document.getElementById("nativeDisplayContainer");
    displayContainer.innerHTML = ""; 

    if (e.units && e.units.length > 0) {
        e.units.forEach(unit => {
            let unitDiv = document.createElement("div");
            unitDiv.className = "native-display-unit";
            unitDiv.style.backgroundColor = unit.bg || "#fff"; 

            let content = unit.content[0]; // Assuming first content block
            let imageUrl = content.media.url || "";
            let wzrkId = unit.wzrk_id; // Unique ID for the display unit

            // Display unit HTML
            unitDiv.innerHTML = `
                <img id="nativeImage_${wzrkId}" src="${imageUrl}" alt="Display Image" width="100%" style="cursor:pointer;">
            `;

            displayContainer.appendChild(unitDiv);
                CleverTap.pushDisplayUnitViewedEventForID(wzrkId);
                // CleverTap.recordDisplayUnitViewedEventForID(wzrkId);
                console.log(`Recorded View Event for ${wzrkId}`);
           

            // Add click event listener
            let imgElement = document.getElementById(`nativeImage_${wzrkId}`);
            imgElement.addEventListener("click", function () {
                    // CleverTap.recordDisplayUnitClickedEventForID(wzrkId);
                    CleverTap.pushDisplayUnitClickedEventForID(wzrkId);
                    console.log(`Recorded Click Event for ${wzrkId}`);
               
            });
        });
    } else {
        displayContainer.innerHTML = "<p>No display units available</p>";
    }
}



document.getElementById("btn2").addEventListener("click", function () {
    console.log("Native Display");
    CleverTap.recordEventWithName("Native Display");
  });
  let localInApp = {
    inAppType: "alert",
    titleText: "Get Notified",
    messageText: "Enable Notification permission",
    followDeviceOrientation: true,
    positiveBtnText: "Allow",
    negativeBtnText: "Cancel",
    fallbackToSettings: true, 
  };
  document.getElementById("btn3").addEventListener("click", function () {
    console.log("Prompt Push Primer function called");
    CleverTap.promptPushPrimer(localInApp);
  });
  
  document.getElementById("btn4").addEventListener("click", function () {
    console.log("Inbox function called");
    CleverTap.recordEventWithName("AppInboxClicked");
    CleverTap.initializeInbox();
    
  });
  document.addEventListener("onCleverTapInboxDidInitialize", () => {
    CleverTap.showInbox();
  });
//   CleverTap.getInboxMessageCount((val) => log("Inbox read message count" + val));
//   CleverTap.getInboxMessageUnreadCount((val) =>
//     log("Inbox unread message count" + val)
//   );
  document.getElementById("btn5").addEventListener("click", function () {
    console.log("Raise InApp");
    CleverTap.recordEventWithName("Raise InApp");
    
  });

  // Get Location
CleverTap.getLocation(
  function (location) {
    console.log("Latitude:", location.lat);
    console.log("Longitude:", location.lon);
    CleverTap.setLocation(location.lat, location.lon);
  },
  function (error) {
    console.error("Error getting location:", error);
  }
);

// Set Location Manually
CleverTap.setLocation(37.7749, -122.4194);