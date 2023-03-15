const gnsWebConfig = {
    focusPlatformOnDefaultClick: (data) => true,
    providers: [
        {
            type: "stomp",
            url: "http://localhost:8084/",
            // authorization: () => {
            //     return new Promise((resolve) => {
            //         setTimeout(() => {
            //             resolve("U000001");
            //         }, 1000);
            //     })
            // }
            recipient: "u000001"
        }
    ]
};

const plugins = {
    definitions: [
        {
            name: "gns.web",
            start: window.GNSWeb,
            config: gnsWebConfig
        }
    ]
};
// @glue42/web-gns
const config = {
    glue: {
        notifications: {
            defaultClick: (glue, data) => {
                console.log(glue.version);
                console.log(data);
            }
        }
    },
    serviceWorker: {
        url: "/service-worker.js"
    },
    plugins
};

GlueWebPlatform(config)
    .then((data) => {
        window.glue = data.glue;

        if (window.glue42gd) {
            return window.GNSWeb(data.glue, gnsWebConfig)
        }

    })
    .then(() => console.log("done"))
    .catch(console.warn);



// showToasts: false,
// autoRequestPermission: false,
// showToastActions: false,
// focusPlatformOnDefaultClick: (data) => true,

// glue.interop.subscribe("T42.GNS.Notifications").then((sub) => sub.onData(console.log));

// glue.interop.subscribe("T42.GNS.GetNotifications").then((sub) => sub.onData(console.log));

// { arguments: { snapshot: { limit: 10, since: 12983671298 } } }

// glue.interop.invoke("T42.GNS.Control", {type: "snooze", payload: {id: "asdasdasd"}}).then(console.log);

// Notification.permission

// const permissionValue = await Notification.requestPermission();

// const permissionGranted = permissionValue === "granted";

// glue: {
//     notifications: {
//         defaultClick: (glue, data) => {
//             console.log(glue.version);
//             console.log(data);
//         }
//     }
// },