import { observable, action, toJS } from "mobx";
import ConstantsObject from "../../utils/constants";
import RoomListFakeData from "../../utils/fakeData/roomList";
import AppStore from "../app/store";

class RoomStore {
  @observable roomList = [];
  @observable connectionObjectRefAppStore = null;

  @action
  getRoomList() {
    this.roomList = [...RoomListFakeData];
    if (AppStore.connection) {
      AppStore.connection.muc.listRooms(
        ConstantsObject.conferenceServerUrl,
        this.handleListRommSuccessCb
      );
    }

    console.log(
      "%c this.roomList ",
      "background: lime; color: black",
      this.roomList
    );
  }
  handleListRommSuccessCb = succesResponse => {
    console.log(
      "%c succesResponse ",
      "background: lime; color: black",
      succesResponse
    );
  };
  handleListRommErrorCb = errorResponse => {
    console.log(
      "%c errorResponse of list Room ",
      "background: salmon; color: black",
      errorResponse
    );
  };
}

export default new RoomStore();
