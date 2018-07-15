// const constantsObj = {
//   serverUrl: "demo-noturn.t-e.biz",
//   boshServerUrl: "https://demo-noturn.t-e.biz/http-bind",
//   conferenceServerUrl: "conference.demo-noturn.t-e.biz"
// };
// const constantsObjForCommonClass = {
//   hosts: {
//     domain: "jitsi-videobridge.demo-noturn.t-e.biz",
//     muc: "conference.demo-noturn.t-e.biz",
//     bridge: "jitsi-videobridge.demo-noturn.t-e.biz"
//   },
//   bosh: "https://demo-noturn.t-e.biz/http-bind"
//   // hosts: {
//   //   domain: "jitsi.geekydev.com",
//   //   muc: "conference.jitsi.geekydev.com",
//   //   bridge: "jitsi-videobridge.jitsi.geekydev.com"
//   // },
//   // bosh: "wss://jitsi.geekydev.com:7443/ws/"
// };

// const constantsObj = {
//   serverUrl: "teleportation-eu1.t-e.biz",
//   boshServerUrl: "https://teleportation-eu1.t-e.biz:7443/http-bind/",
//   conferenceServerUrl: "conference.teleportation-eu1.t-e.biz"
// };

// const constantsObjForCommonClass = {
//   hosts: {
//     domain: "jitsi-videobridge.teleportation-eu1.t-e.biz",
//     muc: "conference.teleportation-eu1.t-e.biz",
//     bridge: "jitsi-videobridge.teleportation-eu1.t-e.biz"
//   },
//   bosh: "https://teleportation-eu1.t-e.biz:7443/http-bind/"
//   // hosts: {
//   //   domain: "jitsi.geekydev.com",
//   //   muc: "conference.jitsi.geekydev.com",
//   //   bridge: "jitsi-videobridge.jitsi.geekydev.com"
//   // },
//   // bosh: "wss://jitsi.geekydev.com:7443/ws/"
// };

console.log('%c  ', 'background: lime; color: black');

const constantsObj = {
  serverUrl: "jitsi.geekydev.com",
  boshServerUrl: "wss://jitsi.geekydev.com:7443/ws/",
  conferenceServerUrl: "conference.jitsi.geekydev.com"
};
const constantsObjForCommonClass = {
  hosts: {
    domain: "jitsi-videobridge.teleportation-eu1.t-e.biz",
    muc: "conference.teleportation-eu1.t-e.biz",
    bridge: "jitsi-videobridge.teleportation-eu1.t-e.biz"
  },
  bosh: "https://teleportation-eu1.t-e.biz:7443/http-bind/"
  // hosts: {
  //   domain: "jitsi.geekydev.com",
  //   muc: "conference.jitsi.geekydev.com",
  //   bridge: "jitsi-videobridge.jitsi.geekydev.com"
  // },
  // bosh: "wss://jitsi.geekydev.com:7443/ws/"
};

// const constantsObj = {
//   serverUrl: "meet.jit.si",
//   boshServerUrl: "https://meet.jit.si/http-bind",
//   conferenceServerUrl: "conference.meet.jit.si"
// };

constantsObj.constantsObjForCommonClass = constantsObjForCommonClass;

export default constantsObj;

// export { constantsObjForCommonClass }
