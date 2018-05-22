import { observable, action, toJS } from "mobx";
import ConstantsObject from "../../utils/constants";

class AppStore {
  @observable connection = null;
  @observable
  clientServerConnectionObj = {
    jid: "jitsi.geekydev.com",
    pass: "",
    fullId: ""
  };

  @observable subscribePersonJid = "";

  @observable msgForSubscriber = "";

  // if client is connected to server than show disconnect btn
  // otherwise show connect btn
  @observable isClientConnectedToServer = false;

  @observable chatRoomName = "";

  @observable logsArray = [];

  @action
  onAppInit() {
    this.connection = new window.Strophe.Connection(
      ConstantsObject.boshServerUrl
    );
    this.connection.rawInput = this.customRawOutputFunc;
    this.connection.rawOutput = this.customRawOutputFunc;
    console.log("this.connection rawInput", this.connection.rawInput);
    console.log("this.connection rawOutput", this.connection.rawOutput);
  }

  @action
  handleServerConnection() {
    const jidValue = this.clientServerConnectionObj.jid;
    const passValue = this.clientServerConnectionObj.pass;
    this.connection.connect(jidValue, passValue, status =>
      this.onConnectCallBack(status)
    );
    // this.connection.connect(jidValue, passValue, this.onConnectCallBack);
  }
  @action
  handleServerDisconnection() {
    this.connection.disconnect();
    this.isClientConnectedToServer = false;
    this.clientServerConnectionObj = {
      jid: "",
      pass: "",
      fullId: ""
    };
    this.logsArray.push("Strophe is disconnected.");
    // this.connection.connect(jidValue, passValue, this.onConnectCallBack);
  }

  @action
  onConnectCallBack(status) {
    console.log(
      "%c status value from the server ",
      "background: lime; color: black",
      status
    );
    console.log(
      "%c this.logsArray ",
      "background: lime; color: black",
      toJS(this.logsArray)
    );
    if (status === window.Strophe.Status.CONNECTING) {
      this.logsArray.push("Strophe is connecting.");
      console.log(
        "%c Strophe is connecting. ",
        "background: aqua; color: black"
      );
    } else if (status === window.Strophe.Status.CONNFAIL) {
      // Error Message in case the XMPP Server cannot be connected
      alert(
        "A connection to the server is not possible, check variable BOSH SERVER URL configuartion"
      );
      this.logsArray.push(
        "Strophe is disconnecting. Connection to server failed."
      );
    } else if (status === window.Strophe.Status.AUTHFAIL) {
      // Error Message for wrong username or password
      alert("You entered a wrong username or password");
      this.logsArray.push(
        "Strophe failed to connect. Wrong username or password."
      );
      this.isClientConnectedToServer = false;
    } else if (status === window.Strophe.Status.CONNECTED) {
      console.log(
        "%c inside CONNECTED ",
        "background: lime; color: black",
        this.connection.jid
      );
      this.logsArray.push("Strophe is connected.");
      this.isClientConnectedToServer = true;
      this.clientServerConnectionObj.fullId = this.connection.jid;
      // Sending of Presence (status)
      // $pres Create a Strophe.Builder with a <presence/> element as the root.
      this.connection.send(window.$pres());

      // Set onMessage/onSubscriptionRequest Handler to receive Notifications (Messages and Contact Requests)
      this.connection.addHandler(
        this.onMessage,
        null,
        "message",
        null,
        null,
        null
      );

      this.connection.addHandler(
        this.onSubscriptionRequest,
        null,
        "presence",
        "subscribe"
      );
    } else {
      console.log(
        "%c some thing went wrong i dont know ",
        "background: black; color: yellow"
      );
    }
  }

  customRawInputFunc(data) {
    console.log(
      "%c received raw data ",
      "background: lime; color: black",
      data
    );
  }
  customRawOutputFunc(data) {
    console.log("%c send raw data ", "background: lime; color: black", data);
  }

  /**
   * Handler for the Receiving of Notifications
   * @param msg
   * @returns {boolean}
   */
  @action
  onMessage = msg => {
    const to = msg.getAttribute("to");
    const from = msg.getAttribute("from");
    const type = msg.getAttribute("type");
    const elems = msg.getElementsByTagName("body");

    // Only execute if the Message-Type is msg
    if (type === "chat" && elems.length > 0) {
      const body = elems[0];
      this.logsArray.push(
        "CHAT: I got a message from " +
          from +
          ": " +
          window.Strophe.getText(body)
      );
    }
    // If this would return false, this Handler would be terminated
    return true;
  };

  /**
   * This only works if the Person is not in your Contact List
   * @param stanza
   * @returns {boolean}
   */
  onSubscriptionRequest = stanza => {
    if (stanza.getAttribute("type") === "subscribe") {
      var from = window.$(stanza).attr("from");
      this.logsArray.push("onSubscriptionRequest: from=" + from);
      // Send a 'subscribed' notification back to accept the incoming
      // subscription request
      this.connection.send(
        window.$pres({
          to: from,
          type: "subscribed"
        })
      );
    }
    return true;
  };

  @action
  updateClientConnectionObj(path, value) {
    this.clientServerConnectionObj[path] = value;
  }

  @action
  updateChatRoomName(value) {
    this.chatRoomName = value;
  }

  /**
   * Function for entering Chatrooms
   * @param room
   */
  @action
  enterRoom(room) {
    room = room + '@' + ConstantsObject.conferenceServerUrl;
    this.logsArray.push("Connecting to the room " + room);
    console.log(
      "%c this.clientServerConnectionObj.jid, ",
      "background: lime; color: black",
      this.clientServerConnectionObj.jid
    );
    const responseFromInitFunc = this.connection.muc.init(this.connection);
    console.log(
      "%c responseFromInitFunc ",
      "background: lime; color: black",
      responseFromInitFunc
    );
    this.connection.muc.join(
      room,
      this.clientServerConnectionObj.fullId,
      this.roomMsgHandler,
      this.roomPresHandler
    );
    this.connection.muc.createInstantRoom(
      room,
      successResponse => {
        console.log(
          "%c successResponse ",
          "background: lime; color: black",
          successResponse
        );
      },
      errorResponse => {
        console.log(
          "%c error",
          "background: salmon; color: black",
          errorResponse
        );
      }
    );
  }

  // Function for Messages and Notifications inside Chatrooms
  roomMsgHandler = (a, b, c) => {
    this.logsArray.push("MUC: Subscribed to all Messages inside this Room");
    console.log(
      "%c inside roomMsgHandler",
      "background: lime; color: black",
      a,
      b,
      c
    );
    return true;
  };
  roomPresHandler = (a, b, c) => {
    this.logsArray.push(
      "MUC: Subscribed to all Status-Changes inside this Room"
    );
    console.log(
      "%c inside roomPresHandler",
      "background: lime; color: black",
      a,
      b,
      c
    );
    return true;
  };
  exitRoom(room) {
    this.logsArray.push("exitRoom: " + room);
  }

  @action
  updateSubscriberJid(value) {
    this.subscribePersonJid = value;
  }
  @action
  updateMsgForSubscriber(value) {
    this.msgForSubscriber = value;
  }

  @action
  subscribePresence(jid) {
    this.logsArray.push("subscribe Person: " + jid);
    this.connection.send(
      window.$pres({
        to: jid,
        type: "subscribe"
      })
    );
  }
  /**
   * Function for Message Sending
   * @param msg
   */
  @action
  sendMessage(msg) {
    // #to is the cssID of the HTML Formular. You need to enter the receiver here
    // #jid is the JabberID of the transmitting user
    // body is the content of the Message itself
    this.logsArray.push(
      "CHAT: Send a message to " + this.subscribePersonJid + ": " + msg
    );
    var m = window
      .$msg({
        to: this.subscribePersonJid,
        from: this.clientServerConnectionObj.fullId,
        type: "chat"
      })
      .c("body")
      .t(msg);
    this.connection.send(m);
  }
}

export default new AppStore();
