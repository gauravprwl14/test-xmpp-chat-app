import { observable, action, toJS } from "mobx";
import ConstantsObject from "../../utils/constants";

class RoomUiStore {
  @observable showChatModal = false;

  @action
  updateChatModalVisibility(value) {
    this.showChatModal = value;
  }
}

export default new RoomUiStore();
