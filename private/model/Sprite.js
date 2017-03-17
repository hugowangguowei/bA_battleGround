/**
 * Created by wgw on 2016/4/18.
 */
var GUID = require("../../dep/baBasicLib/util/GUID");
module.exports = Sprite;

function Sprite(id){
    this.id = id||GUID.getGUID();
    this.controllable = true;
    this.controller = null;
    this.type = "sprite";
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
     * 小队
     * @type {null}
     * @private
     */
    this._t_group = null;
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
    setCamp:function(camp){
        this._t_camp = camp;
    },
    getCamp:function(){
        return this._t_camp;
    },
    setGroup:function(group){
        this._t_group = group;
        var loc = group.getLoc();
        this.setLoc(loc);
        var camp = group.getCamp();
        this.setCamp(camp);
    },
    setLoc:function(loc){
        this._t_loc = loc;
    },
    getGroup:function(){
        return this._t_group;
    },
    updatePropByOrder:function(info){
        var loc,order,antiOrder,obey,brave,aimLoc,attLoc;
        loc = info.loc;
        order = info.order;
        aimLoc = info.aimLoc;
        attLoc = info.attLoc;

        brave = info.brave;
        obey = info.obey;

        this._t_loc = loc;
        this._t_aimLoc = aimLoc;
        this._t_attLoc = attLoc;
        this._t_order = order;
    },
    getType:function(){
        return this.type;
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
        console.log(this._t_camp._t_num +" 阵营的 "+ this.type + "开始攻击！目标位置为：" + this._t_aimLoc);
        var aimLoc = this._t_aimLoc;
        var attLoc = this._t_attLoc;
        var campId = this.getCamp().getCampId();
        if(aimLoc >= 0){
            var block = bg.getBlockByLoc(aimLoc);
            var aimSoldier = block.getRandomEnemySoldier(campId);
            if(aimSoldier){
                console.log("攻击一个 " + aimSoldier.type);
                aimSoldier.getDamage(this._t_damage);
            }
            else{
                console.log("没有找到攻击目标,移动到" + aimLoc)
                this._moveToBlock(bg,this._t_loc,aimLoc);

            }
        }
        else if(attLoc >= 0){
            var block = bg.getBlockByLoc(attLoc);
            var aimSoldier = block.getRandomEnemySoldier(campId);
            if(aimSoldier){
                aimSoldier.getDamage(this._t_damage);
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
        if(this._t_isDead||this._t_loc<0){
            console.log(this._t_camp._t_num + "阵营的" + this.type + "不在战场内");
            return false;
        }
        console.log(this._t_camp._t_num + "阵营的" + this.type + "在防守");
        var aimLoc = this._t_aimLoc;
        var campId = this.getCamp().getCampId();
        if(aimLoc >= 0){
            var block = bg.getBlockByLoc(aimLoc);
            var aimSoldier = block.getRandomEnemySoldier(campId);
            if(!aimSoldier){
                this._moveToBlock(bg,this._t_loc,aimLoc);
            }
        }
    },
    /**
     * 移动到指定Block
     * @private
     */
    _moveToBlock:function(bg,curLoc,aimLoc){
        if(curLoc){
            var curBlock = bg.getBlockByLoc(curLoc);
            curBlock.removeSoldier(this);
        }
        var aimBlock = bg.getBlockByLoc(aimLoc);
        aimBlock.addSoldier(this);
        this._t_loc = aimLoc;
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
        var group = this.getGroup();
        group.soldierDied(this);
    },
    isDead:function(){
        return this._t_isDead;
    },
    getOutPut: function () {
        return null;
    },
}