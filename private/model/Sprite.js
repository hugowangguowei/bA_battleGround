/**
 * Created by wgw on 2016/4/18.
 */

module.exports = Sprite;

function Sprite(id){
    this.id = id;
    this.controllable = true;
    this.controller = null;

    this.geoInfo = {
    }
    //新版属性=========================================================================
    /**
     * 阵营
     * @type {null}
     * @private
     */
    this._t_camp = null;
    /**
     * 位置
     */
    this._t_loc = -1;
    /**
     * 目标位置
     * @type {number}
     * @private
     */
    this._t_aimLoc = -1;
    /**
     * 攻击位置
     * @type {number}
     * @private
     */
    this._t_attLoc = -1;
    /**
     * 目标接收的命令
     * attack,defend
     * @type {string}
     * @private
     */
    this._t_order = "attack";
    /**
     * 攻击速度
     * @type {number}
     * @private
     */
    this._t_speed = 5;
    this._t_HP = 10;
    this._t_damage = 5;
    this._t_response = 0;
    this._t_armor = 1;
    /**
     *  是否死亡
     * @type {boolean}
     * @private
     */
    this._t_isDead = false;
}
Sprite.prototype = {
    initialize:function(){
    },
    getCamp:function(){
        return this._t_camp;
    },
    isDead:function(){
        return this._t_isDead;
    },
    t_action:function(bg){
        switch (this._t_order){
            case "attack":
                this._attack(bg);
                break;
            case "defend":
                this._defend(bg);
                break;
        }
    },
    /**
     * （私有函数）攻击
     * @param bg
     * @returns {boolean}
     * @private
     */
    _attack:function(bg){
        if(this._t_isDead||this._t_loc<0)return false;
        console.log("开始攻击！");
        var aimLoc = this._t_aimLoc;
        var attLoc = this._t_attLoc;
        var campId = this.getCamp().getCampId();
        if(aimLoc >= 0){
            var block = bg.getBlockByLoc(aimLoc);
            var aimSoldier = block.getRandomEnemySoldier(campId);
            if(aimSoldier){
                console.log("攻击一个 " + aimSoldier.type);
                var damage = this._t_damage;
                aimSoldier.getDamage(damage);
            }
            else{
                this._t_loc = aimLoc;
            }
        }
        else if(attLoc >= 0){
            var block = bg.getBlockByLoc(attLoc);
            var aimSoldier = block.getRandomEnemySoldier(campId);
            if(aimSoldier){
                var damage = this._t_damage;
                aimSoldier.getDamage(damage);
            }
        }
    },
    /**
     * （私有函数）防守
     * @param bg
     * @returns {boolean}
     * @private
     */
    _defend:function(bg){
        if(this._t_isDead||this._t_loc<0)return false;
        console.log("防守！");
        var aimLoc = this._t_aimLoc;
        var campId = this.getCamp().getCampId();
        if(aimLoc >= 0){
            var block = bg.getBlockByLoc(aimLoc);
            var aimSoldier = block.getRandomEnemySoldier(campId);
            if(!aimSoldier){
                this._t_loc = aimLoc;
            }
        }
    },
    /**
     * 收到伤害
     * @param damage
     */
    getDamage:function(damage){
        var realD = damage - this._t_armor;
        if(realD<0)realD = 0;
        console.log("造成了" + realD + "点伤害");
        this._t_HP -= realD;
        if(this._t_HP <= 0){
            this._t_HP = 0;
            this._die();
        }
    },
    /**
     * (私有函数）死亡
     * @private
     */
    _die:function(){
        this._t_isDead = true;
        console.log(this.type + " 死了");
    },
    getOutPut: function () {
        return null;
    },
}