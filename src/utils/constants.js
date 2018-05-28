const constantsObj = {
  serverUrl: "jitsi.geekydev.com",
  boshServerUrl: "wss://jitsi.geekydev.com:7443/ws/",
  conferenceServerUrl: "conference.jitsi.geekydev.com"
};
const constantsObjForCommonClass = {
  hosts: {
    domain: "jitsi.geekydev.com",
    muc: "conference.jitsi.geekydev.com",
    bridge: "jitsi-videobridge.jitsi.geekydev.com"
  },
  bosh: "wss://jitsi.geekydev.com:7443/ws/"
};
// const constantsObj = {
//   serverUrl: "meet.jit.si",
//   boshServerUrl: "https://meet.jit.si/http-bind",
//   conferenceServerUrl: "conference.meet.jit.si"
// };

constantsObj.constantsObjForCommonClass = constantsObjForCommonClass;

export default constantsObj;

// export { constantsObjForCommonClass }
