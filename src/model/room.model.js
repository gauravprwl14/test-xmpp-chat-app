class RoomModel {
  constructor(jid = "", roomName = "", roomMembers = {}) {
    this.roomJid = jid;
    this.roomName = roomName;
    this.members = roomMembers;
  }

  mapRoomMembers(rosterObj) {
    this.members = {};
    
  }
}

export default RoomModel;
