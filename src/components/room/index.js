import React, { Component } from "react";
import { Row, Col, Panel, Button, Table } from "react-bootstrap";
import RoomStore from "./store";

class Room extends Component {
  constructor(props) {
    super(props);
    RoomStore.getRoomList();
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <Row>
                    <Col xs={6}>Room List</Col>
                    <Col xs={6}>
                      <Button className="pull-right" bsStyle="success">
                        Refresh
                      </Button>
                    </Col>
                  </Row>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                {RoomStore.roomList.length === 0 ? (
                  <div> No Rooms Avaliable </div>
                ) : null}
                {RoomStore.roomList.length !== 0 ? (
                  <Table>
                    <thead>
                      <td>S.No</td>
                      <td>Room Name</td>
                      <td>Members</td>
                      <td>Join</td>
                    </thead>
                    <tbody>
                      {RoomStore.roomList.map((roomObj, index) => {
                        return (
                          <tr>
                            <td> {index + 1}</td>
                            <td> {roomObj.roomJid}</td>
                            <td> {roomObj.members.length}</td>
                            <td> join</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : null}
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Room;
