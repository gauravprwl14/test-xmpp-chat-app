import { observable, action, toJS } from "mobx";
import ConstantsObject from "../../utils/constants";
import { $build, $iq, $msg, $pres, Strophe, $ } from "strophe.js";
import RoomModel from "../../model/room.model";
import RoomListFakeData from "../../utils/fakeData/roomList";
import AppStore from "../app/store";

class RoomStore {
  @observable roomList = [];
  @observable connectionObjectRefAppStore = null;

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

    AppStore.connection.muc.createInstantRoom(
      room,
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
    return true;
  };

  roomPresHandler = (param1, param2, param3) => {
    AppStore.logsArray.push(
      "MUC: Subscribed to all roomPresHandler inside this Room"
    );
    console.log(
      "%c param1 of roomMsgHandler ",
      "background: salmon; color: black",
      param1
    );
    console.log(
      "%c param2 of roomMsgHandler ",
      "background: salmon; color: black",
      param2
    );
    console.log(
      "%c param3 of roomMsgHandler ",
      "background: salmon; color: black",
      param3
    );
    return true;
  };
}

export default new RoomStore();
