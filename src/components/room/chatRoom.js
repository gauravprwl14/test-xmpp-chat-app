import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import Modal, {
  Header as ModalHeader,
  Title as ModalTitle,
  Body as ModalBody,
  Footer as ModalFooter
} from "react-bootstrap/lib/Modal";
import { observer } from "mobx-react";

import RoomUiStore from "./uiStore";

import GroupChatFakeData from "../../utils/fakeData/message";

import "./styles.scss";

@observer
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.handleChatModalClose = this.handleChatModalClose.bind(this);
    this.handleChatModalSendBtn = this.handleChatModalSendBtn.bind(this);
  }
  handleChatModalClose(e) {
    if (e) {
      e.preventDefault();
    }
    RoomUiStore.updateChatModalVisibility(false);
  }
  handleChatModalSendBtn(e) {
    if (e) {
      e.preventDefault();
    }
    // RoomUiStore.updateChatModalVisibility(false);
  }
  render() {
    return (
      <div className="group-chat-modal-container">
        <Modal
          show={RoomUiStore.showChatModal}
          onHide={this.handleChatModalClose}
        >
          <ModalHeader closeButton>
            <ModalTitle id="contained-modal-title">Chat Room</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div style={{ width: "100%" }}>
              {GroupChatFakeData.map((msgObject, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "chat-msg-container other"
                        : "chat-msg-container self"
                    }
                    key={index}
                  >
                    {" "}
                    {msgObject.msg}{" "}
                  </div>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col xs={10}>
                <FormControl type="text" placeholder="Enter Msg" />
              </Col>
              <Col xs={2}>
                <Button onClick={this.handleChatModalSendBtn}>Send</Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ChatRoom;
