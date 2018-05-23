import { observable, action, toJS } from "mobx";
import ConstantsObject from "../../utils/constants";
import RoomListFakeData from "../../utils/fakeData/roomList";

class RoomStore {
  @observable roomList = [];

  @action
  getRoomList() {
    this.roomList = [...RoomListFakeData];
    console.log(
      "%c this.roomList ",
      "background: lime; color: black",
      this.roomList
    );
  }
}

export default new RoomStore();
