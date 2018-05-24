class RoomModel {
  constructor(jid = "", roomName = "", roomMembers = []) {
    this.roomJid = jid;
    this.roomName = roomName;
    this.members = roomMembers;
  }
}

export default RoomModel;
