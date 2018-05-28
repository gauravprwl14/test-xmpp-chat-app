import { $build, $iq, $msg, $pres, Strophe } from "react-strophe";
import "react-strophejs-plugin-muc";

class StropheConnection {
    this.connection = null;
    constructor(boshUrl) {
        this.connection = new Strophe.Connection(ConstantsObject.boshServerUrl);
        this.connection.muc.init(this.connection);
    this.connection.rawInput = this.customRawOutputFunc;
    this.connection.rawOutput = this.customRawOutputFunc;
    }
}

export default StropheConnection;