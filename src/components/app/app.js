import React, { Component } from "react";
import { observer } from "mobx-react";

import AppStore from "./store";

//styles
import "./app.scss";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.handleClientConnectionValueChange = this.handleClientConnectionValueChange.bind(
      this
    );
    this.handleServerConnection = this.handleServerConnection.bind(this);
    this.handleServerDisconnection = this.handleServerDisconnection.bind(this);
    this.updateChatRoomName = this.updateChatRoomName.bind(this);
    this.handleChatRoomConnection = this.handleChatRoomConnection.bind(this);
    this.updateSubscriberId = this.updateSubscriberId.bind(this);
    this.updateMsgForSubscriber = this.updateMsgForSubscriber.bind(this);
    this.handleSubscriberConnection = this.handleSubscriberConnection.bind(
      this
    );
    this.sendMsgToSubscriber = this.sendMsgToSubscriber.bind(this);
  }
  componentDidMount() {
    AppStore.onAppInit();
  }
  handleClientConnectionValueChange(e) {
    e.preventDefault();
    const targetName = e.target.name;
    const targetValue = e.target.value;
    AppStore.updateClientConnectionObj(targetName, targetValue);
  }
  handleServerConnection(e) {
    e.preventDefault();
    AppStore.handleServerConnection();
  }
  handleServerDisconnection(e) {
    e.preventDefault();
    AppStore.handleServerDisconnection();
  }

  updateChatRoomName(e) {
    e.preventDefault();
    const value = e.target.value;
    AppStore.updateChatRoomName(value);
  }
  handleChatRoomConnection(e) {
    e.preventDefault();
    AppStore.enterRoom(AppStore.chatRoomName);
  }
  updateSubscriberId(e) {
    e.preventDefault();
    const value = e.target.value;
    AppStore.updateSubscriberJid(value);
  }
  updateMsgForSubscriber(e) {
    e.preventDefault();
    const value = e.target.value;
    AppStore.updateMsgForSubscriber(value);
  }
  handleSubscriberConnection(e) {
    e.preventDefault();
    const subscriberJid = AppStore.subscribePersonJid;
    AppStore.subscribePresence(subscriberJid);
  }
  sendMsgToSubscriber(e) {
    e.preventDefault();
    const msg = AppStore.msgForSubscriber;
    AppStore.sendMessage(msg);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div id="login" className="panel panel-default">
              <div className="panel-heading">Login</div>
              <form name="cred" className="panel-body">
                <div className="form-group">
                  <label htmlFor="jid">Username (JID):</label>
                  <input
                    type="text"
                    id="jid"
                    name="jid"
                    value={AppStore.clientServerConnectionObj.jid}
                    onChange={this.handleClientConnectionValueChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">Password:</label>
                  <input
                    type="password"
                    id="pass"
                    name="pass"
                    value={AppStore.clientServerConnectionObj.pass}
                    onChange={this.handleClientConnectionValueChange}
                  />
                </div>
                {AppStore.isClientConnectedToServer ? (
                  <input
                    type="button"
                    className="btn btn-danger"
                    id="disConnect"
                    value="Disconnect"
                    onClick={this.handleServerDisconnection}
                  />
                ) : (
                  <input
                    type="button"
                    className="btn btn-success"
                    id="connect"
                    value="connect"
                    onClick={this.handleServerConnection}
                  />
                )}

                <label htmlFor="to">Your Full ID: </label>
                <input
                  type="text"
                  id="fullID"
                  value={AppStore.clientServerConnectionObj.fullId}
                />
              </form>
            </div>
          </div>
          <div id="chat" className="panel panel-default col-md-6">
            <div className="panel-heading">Chat</div>
            <form name="chat" className="panel-body">
              <div className="form-group">
                <label htmlFor="to">Person to interact with:</label>
                <input
                  type="text"
                  id="to"
                  onChange={this.updateSubscriberId}
                  value={AppStore.subscribePersonJid}
                />
              </div>
              <div className="form-group">
                <input
                  type="button"
                  className="btn btn-primary"
                  id="btnSubPres"
                  value="subscribe Person"
                  onClick={this.handleSubscriberConnection}
                />
                {/* <input
                  type="button"
                  className="btn btn-primary"
                  id="btnGetPres"
                  value="get Status of Person (Person has to be subscribed)"
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="msg">Message:</label>
                <input
                  type="text"
                  id="msg"
                  value={AppStore.msgForSubscriber}
                  onChange={this.updateMsgForSubscriber}
                />
              </div>
              <input
                type="button"
                className="btn btn-success"
                id="send"
                value="send Message"
                onClick={this.sendMsgToSubscriber}
              />
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div id="rooms" className="panel panel-default">
              <div className="panel-heading">Rooms</div>
              <form name="rooms" className="panel-body">
                <label htmlFor="room">room:</label>
                <input
                  type="text"
                  id="room"
                  value={AppStore.chatRoomName}
                  onChange={this.updateChatRoomName}
                />
                <input
                  type="button"
                  className="btn btn-primary"
                  id="btnEnter"
                  value="Enter"
                  onClick={this.handleChatRoomConnection}
                />
                <input
                  type="button"
                  className="btn btn-danger"
                  id="btnExit"
                  value="exit"
                />
              </form>
            </div>
          </div>
        </div>

        <div className="panel panel-default panel-heading">
          <strong>History:</strong>
          {AppStore.logsArray.map((logValue, index) => {
            return (
              <div id="log" key={index}>
                {" "}
                {logValue}{" "}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
