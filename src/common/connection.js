import { $build, $iq, $msg, $pres, Strophe } from "react-strophe";
import "react-strophejs-plugin-muc";
import _ from "lodash";
import Logger from "./logger";
import ErrorMsg from "./errorMsg";
import XmlToJson from "./xmlToJson";

class StropheConnection {
  constructor(configObj = {}) {
    if (!_.get(configObj, "bosh", null)) {
      const errorObj = new Error(ErrorMsg.boshUrlNotSpecified);
      throw errorObj;
    }
    if (!_.get(configObj, "hosts.domain", null)) {
      const errorObj = new Error(ErrorMsg.domainUrlNotSpecified);
      throw errorObj;
    }
    if (!_.get(configObj, "hosts.muc", null)) {
      const errorObj = new Error(ErrorMsg.mucUrlNotSpecified);
      throw errorObj;
    }
    // store of the config Object for
    this.configObj = { ...configObj };

    // initialize the Strophe connection with the bosh Url
    this.connection = new Strophe.Connection(configObj.bosh);

    // initialize the MUC with Strophe connection Object
    this.connection.muc.init(this.connection);

    // log the sending and receiving data for debugging
    this.connection.rawInput = this.logReceivedXmlData;
    this.connection.rawOutput = this.logSendXmlData;
  }

  connect(id = "", password = null) {
    return new Promise((resolve, reject) => {
      this.connection.connect(id, password, status => {
        if (status === Strophe.Status.CONNECTING) {
          Logger.info("Starting The Strophe Connection");
        } else if (status === Strophe.Status.CONNFAIL) {
          // Error Message in case the XMPP Server cannot be connected
          Logger.error("Strophe Cannot Connect to Xmpp Server");
          reject(Strophe.Status.CONNFAIL);
        } else if (status === Strophe.Status.AUTHFAIL) {
          // Error Message for wrong username or password
          Logger.error(
            "Strophe is Disconnected. InValid UserName and Password"
          );

          reject(Strophe.Status.AUTHFAIL);
        } else if (status === Strophe.Status.CONNECTED) {
          Logger.success("Strophe is Connected To Xmpp Server");
          this.connection.send($pres());
          resolve(this.connection);
          this.registerOnMessageReceivedListener();
          this.registerSubscriptionListener();
        }
      });
    });
  }

  registerOnMessageReceivedListener(listenerFunctionCb) {
    if (this.connection) {
      if (listenerFunctionCb) {
        this.connection.addHandler(
          listenerFunctionCb,
          null,
          "message",
          null,
          null,
          null
        );
      } else {
        this.connection.addHandler(
          this.onMessage,
          null,
          "message",
          null,
          null,
          null
        );
      }
    }
  }
  registerSubscriptionListener(listenerFunctionCb) {
    if (this.connection) {
      if (listenerFunctionCb) {
        this.connection.addHandler(
          listenerFunctionCb,
          null,
          "message",
          null,
          null,
          null
        );
      } else {
        this.connection.addHandler(
          this.onMessage,
          null,
          "message",
          null,
          null,
          null
        );
      }
    }
  }

  onMessage = msg => {
    const to = msg.getAttribute("to");
    const from = msg.getAttribute("from");
    const type = msg.getAttribute("type");
    const elems = msg.getElementsByTagName("body");

    // Only execute if the Message-Type is msg
    if (type === "chat" && elems.length > 0) {
      const body = elems[0];
      Logger.info("CHAT: I got a message", Strophe.getText(body));
    }
    // If this would return false, this Handler would be terminated
    return true;
  };

  onSubscriptionRequest = stanza => {
    if (stanza.getAttribute("type") === "subscribe") {
      var from = window.$(stanza).attr("from");
      //   this.logsArray.push("onSubscriptionRequest: from=" + from);
      Logger.info("onSubscriptionRequest: from", from);
      // Send a 'subscribed' notification back to accept the incoming
      // subscription request
      this.connection.send(
        $pres({
          to: from,
          type: "subscribed"
        })
      );
    }
    return true;
  };

  getRoomList() {
    return new Promise((resolve, reject) => {
      this.connection.muc.listRooms(
        this.configObj.hosts.muc,
        successResponse =>
          this.handleListRoomSuccessCb(resolve, reject, successResponse),
        errorResponse =>
          this.handleListRoomErrorCb(resolve, reject, errorResponse)
      );
    });
  }
  handleListRoomSuccessCb = (resolve, reject, successResponse) => {
    let roomList = [];
    Logger.success("Room List", successResponse);
    const parsedXml = XmlToJson(successResponse);
    if (_.get(parsedXml, "query.item", null)) {
      roomList = parsedXml.query.item.map(roomObj => {
        const jid = _.get(roomObj, "@attributes.jid", null);
        const roomName = _.get(roomObj, "@attributes.name", null);
        const mappedRoomObj = {
          jid,
          roomName
        };
        return mappedRoomObj;
      });
    }
    resolve(roomList);
  };
  handleListRoomErrorCb = (resolve, reject, errorResponse) => {
    const parsedJson = XmlToJson(errorResponse);
    reject(parsedJson);
  };

  logReceivedXmlData(data) {
    Logger.info("Xml Received Data", data);
  }
  logSendXmlData(data) {
    Logger.info("Xml Send Data", data);
  }
}

export default StropheConnection;
