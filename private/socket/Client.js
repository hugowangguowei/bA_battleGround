/**
 * Created by wgw on 2016/6/17.
 */

module.exports = Client;
function Client(id,ws){
    this.UNI_id = id;
    this.socket = ws;
    this.state = "on";
    this.game = null;
    this.sprite = null;
    //提交camp完成
    this._submitCampFinish = false;
}
