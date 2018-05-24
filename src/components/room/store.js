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

  enterRoom(roomObj) {
    AppStore.enterRoom(roomObj.roomJid);
  }
}

export default new RoomStore();
