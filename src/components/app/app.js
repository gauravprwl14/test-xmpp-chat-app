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
        </div>

        <div className="row">
          <div className="col-md-6">
            <div id="rooms" className="panel panel-default">
              <div className="panel-heading">Rooms</div>
              <form name="rooms" className="panel-body">
                <label htmlFor="room">room:</label>
                <input type="text" id="room" value="" />
                <input
                  type="button"
                  className="btn btn-primary"
                  id="btnEnter"
                  value="enter"
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

          <div id="presence" className="panel panel-default col-md-6">
            <div className="panel-heading">Contacts and Status</div>
            <form name="presence" className="panel-body">
              <input
                type="button"
                className="btn btn-primary"
                id="btnRoster"
                value="get your contacts/Rooms(Roster)"
              />
              <input
                type="button"
                className="btn btn-warning"
                id="btnAway"
                value="set your status away"
              />
            </form>
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
