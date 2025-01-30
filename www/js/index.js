function log(param){
    if(arguments.length>1){
        for (let i = 0; i < arguments.length; i++) {
            log(arguments[i])
        }
    }
    else{
        if (typeof param === 'object') {
            console.log("object:",JSON.stringify(param))
        } else if (typeof param === 'function') {
            console.log('function:', param)
        } else {
            console.log(String(param))
        }
    }
}

function setupButtons() {
    let variables = {
        'cordova_var_string': 'cordova_var_string_value',
        'cordova_var_map': {
          cordova_var_map_string: 'cordova_var_map_value',
          cordova_var_map_float: 10.11,
          cordova_var_map_nested:{
            cordova_var_map_nested_float:3.14
          }
        },
        'cordova_var_int': 6,
        'cordova_var_float': 6.9,
        'cordova_var_boolean': true
      };

    let fileVariable = "folder1.fileVariable"


    let eventsMap = [

       
        ["title","Events"],
        ["record Event With Name", () => {
            let eventName = prompt("Please enter name of event")
            CleverTap.recordEventWithName(eventName)}],
        ["record Event With NameAndProps", () => CleverTap.recordEventWithNameAndProps("boo", {"bar": "zoo"})],
        ["record Charged Event With Details And Items", () => CleverTap.recordChargedEventWithDetailsAndItems({
            "amount": 300,
            "Charged ID": 1234
        }, [{"Category": "Books", "Quantity": 1, "Title": "Book Title"}])],
       
        ["title","User Profile"],
        ["profile onUserLogin", () => CleverTap.onUserLogin({'Name': 'Captain America',
        'Identity': '115',
        'Email': 'capin@america.com',
        'Phone': '+14155551234',
        })],
        

        ["title","In App"],
        ["create notification channel henil123", ()=> CleverTap.createNotificationChannel("henil123", "henil123", "", 5, true)],
        ["In-app_2 Notification Triggered", () => CleverTap.recordEventWithName("In-app_2 Notification Triggered")],

        ["title","inbox"],
        ["initialize Inbox", () => CleverTap.initializeInbox()],
        ["Inbox event",()=>CleverTap.recordEventWithName("Inbox")],    
        
    ]

    const groupedButtons = {};
    let currentGroup = null;

    for (let element of eventsMap) {
        if (element[0] === "title") {
            currentGroup = element[1];
            groupedButtons[currentGroup] = [];
        } else if (currentGroup) {
            groupedButtons[currentGroup].push({
                label: element[0],
                action: element[1]
            });
        }
    }

    const container = document.querySelector('.ct_button');

    // Render the buttons with collapsible groups
    for (const [groupTitle, buttons] of Object.entries(groupedButtons)) {
        // Create title button
        const titleButton = document.createElement("button");
        titleButton.classList.add("group-title");
        titleButton.innerText = groupTitle;

        // Create a container for sub-buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Toggle visibility on title button click
        titleButton.addEventListener('click', () => {
            buttonContainer.classList.toggle("open");
        });

        // Add sub-buttons
        buttons.forEach(buttonData => {
            const subButton = document.createElement("button");
            subButton.classList.add("sub-button");
            subButton.innerText = buttonData.label;
            subButton.addEventListener('click', buttonData.action);
            buttonContainer.appendChild(subButton);
        });

        container.appendChild(titleButton);
        container.appendChild(buttonContainer);
    }


}




function initLogging() {
    log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    CleverTap.setDebugLevel(3)
}


function initListeners() {
    log("setting listeners")
    document.addEventListener('onCleverTapProfileSync', e => log(e.updates))
    document.addEventListener('onCleverTapProfileDidInitialize', e => log(e.CleverTapID))
    
    document.addEventListener('onPushNotification', e => log(e.notification))
    document.addEventListener('onCleverTapInboxDidInitialize', () => {
            CleverTap.getInboxMessageForId("1642753141_1642755745", val => log("Inbox message is " + JSON.stringify(val)))
            CleverTap.showInbox({"navBarTitle": "My App Inbox", "tabs": ["tag1", "tag2"], "navBarColor": "#FF0000"})
            CleverTap.getAllInboxMessages(val => log("Inbox messages are " + val))
            CleverTap.getUnreadInboxMessages(val => log("Unread Inbox messages are " + val))
            CleverTap.deleteInboxMessageForId("messageId")
            CleverTap.deleteInboxMessagesForIds(["id1", "id2"])
            CleverTap.markReadInboxMessageForId("messageId")
            CleverTap.markReadInboxMessagesForIds(["id1", "id2"])
            CleverTap.pushInboxNotificationViewedEventForId("messageId")
            CleverTap.pushInboxNotificationClickedEventForId("messageId")
            CleverTap.dismissInbox()
        }
    )
}



initListeners()
document.addEventListener(
    'deviceready',
    param => {
        log("on device ready, received param:", param)
        initLogging()
        setupButtons()
        updateUi()
    },
    false
)

// butoon b1= findViewById(R.id.b1);
// const b1 = document.getElementById('b1');
// b1.addEventListener('click', () => {
//     log('b1 clicked')
//     CleverTap.recordEventWithName('b1 clicked')
// });