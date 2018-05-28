import { observable, action, toJS } from "mobx";
import ConstantsObject from "../../utils/constants";
import { $build, $iq, $msg, $pres, Strophe, $ } from "strophe.js";
import RoomModel from "../../model/room.model";
import RoomListFakeData from "../../utils/fakeData/roomList";
import xmlToJsonParser from "../../utils/xmlToJson";
import AppStore from "../app/store";

class RoomStore {
  @observable roomList = [];
  @observable connectionObjectRefAppStore = null;
  @observable roomJoinedByUser = {};

  @action
  getRoomList() {
    // this.roomList = [...RoomListFakeData];
    if (AppStore.connection) {
      AppStore.connection.muc.listRooms(
        ConstantsObject.conferenceServerUrl,
        this.handleListRoomSuccessCb,
        this.handleListRoomErrorCb
      );
    }

    console.log(
      "%c this.roomList ",
      "background: lime; color: black",
      this.roomList
    );
  }
  handleListRoomSuccessCb = successResponse => {
    console.log(
      "%c successResponse ",
      "background: lime; color: black",
      successResponse
    );
    // const that = this;
    this.roomList = [];
    window
      .$(successResponse)
      .find("item")
      .each((index, ele) => {
        var jid = window.$(ele).attr("jid"); // The jabber_id of the room
        var roomName = window.$(ele).attr("name"); // The roomName
        const roomObj = new RoomModel(jid, roomName, []);
        this.roomList.push(roomObj);
        // You can probably put them in a unordered list and and use their jids as ids.
        AppStore.logsArray.push("jid: " + jid);
      });
  };
  handleListRoomErrorCb = errorResponse => {
    console.log(
      "%c errorResponse of list Room ",
      "background: salmon; color: black",
      errorResponse
    );
  };

  /**
   * Function for entering Chatrooms
   * @param room
   */
  @action
  enterRoom(room) {
    // room = room + "@" + ConstantsObject.conferenceServerUrl;
    console.log("%c room ", "background: lime; color: black", room);
    AppStore.logsArray.push("Connecting to the room " + room);

    console.log(
      "%c this.clientServerConnectionObj.jid, ",
      "background: lime; color: black",
      AppStore.clientServerConnectionObj.jid
    );

    AppStore.connection.muc.join(
      room,
      AppStore.clientServerConnectionObj.fullId,
      this.roomMsgHandler,
      this.roomPresHandler
    );
  }

  // Function for Messages and Notifications inside Chatrooms
  roomMsgHandler = (param1, param2, param3) => {
    AppStore.logsArray.push("MUC: Subscribed to all Messages inside this Room");
    console.log(
      "%c param1 of roomMsgHandler ",
      "background: lime; color: black",
      param1
    );
    console.log(
      "%c param2 of roomMsgHandler ",
      "background: lime; color: black",
      param2
    );
    console.log(
      "%c param3 of roomMsgHandler ",
      "background: lime; color: black",
      param3
    );

    const parsedXmlObj = xmlToJsonParser(param1);
    console.log(
      "%c parsed parsedXmlObj",
      "background: aqua; color: black",
      parsedXmlObj
    );
    return true;
  };

  roomPresHandler = (param1, param2, param3) => {
    AppStore.logsArray.push(
      "MUC: Subscribed to all roomPresHandler inside this Room"
    );
    if (param2 && param2.roster) {
      const membersList = Object.keys(param2.roster);
      // if the person whose is join the room is the first person
      // than room need to be unlock by him.
      // if room is not unlocked than no other participant will be able to join the room
      if (membersList.length === 1 && param2.roster[AppStore.connection.jid]) {
        this.createRoomInstance(param2.name);
      }
    }

    console.log(
      "%c param1 of roomPresHandler ",
      "background: aqua; color: black",
      param1
    );
    console.log(
      "%c param2 of roomPresHandler ",
      "background: aqua; color: black",
      param2
    );
    console.log(
      "%c param3 of roomPresHandler ",
      "background: aqua; color: black",
      param3
    );
    const parsedXmlObj = xmlToJsonParser(param1);
    console.log(
      "%c parsed roomPresHandler",
      "background: aqua; color: black",
      parsedXmlObj
    );

    if (!this.roomJoinedByUser[param2.name]) {
      this.roomJoinedByUser[param2.name] = {
        roomJid: param2.name,
        roomMembers: {},
        msg: []
      };
    }
    this.roomJoinedByUser[param2.name].roomMembers = { ...param2.roster };
    console.log(
      "%c this.roomJoinedByUser ",
      "background: lime; color: black",
      this.roomJoinedByUser
    );
    return true;
  };

  createRoomInstance(roomJid) {
    AppStore.connection.muc.createInstantRoom(
      roomJid,
      successResponse => {
        console.log(
          "%c successResponse of createInstantRoom",
          "background: lime; color: black",
          successResponse
        );
      },
      errorResponse => {
        console.log(
          "%c error of createInstantRoom",
          "background: salmon; color: black",
          errorResponse
        );
      }
    );
  }

  @action
  sendMessage(roomJid, nickName = null, msg) {
    AppStore.logsArray.push("CHAT: Send a message to " + roomJid + ": " + msg);
    AppStore.connection.muc.message(roomJid, nickName, msg);
  }
  @action
  sendGroupMessage(roomJid, msg) {
    AppStore.logsArray.push(
      "Group CHAT: Send a message to " + roomJid + ": " + msg
    );
    AppStore.connection.muc.groupchat(roomJid, msg);
  }
}

export default new RoomStore();
