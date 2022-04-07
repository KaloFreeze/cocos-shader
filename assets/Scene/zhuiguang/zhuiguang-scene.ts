

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Camera)
    mainCamera: cc.Camera = null;
    @property(cc.Camera)
    renderCamera: cc.Camera = null;

    @property(cc.Sprite)
    renderSpr: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:
    texture1: cc.RenderTexture;
    texture2: cc.RenderTexture;
    // onLoad () {}

    start () {
        this.renderSpr.getMaterial(0).setProperty("wh_ratio", this.bg.node.width / this.bg.node.height)
        this.node.on(cc.Node.EventType.TOUCH_START, this.toucheEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.toucheEvent, this);
        this.texture1 = new cc.RenderTexture();
        this.texture2 = new cc.RenderTexture();
        this.texture1.initWithSize(cc.winSize.width, cc.winSize.height);
        this.texture2.initWithSize(cc.winSize.width, cc.winSize.height);

        this.renderCamera.targetTexture = this.texture1;
        // this.mainCamera.targetTexture = this.texture2;
        // this.renderSpr.spriteFrame.setTexture(this.texture1);
    }

    toucheEvent(evt: cc.Event.EventTouch) {
        let pos = evt.getLocation();
        this.renderSpr.getMaterial(0).setProperty("center", [pos.x / this.bg.node.width, pos.y / this.bg.node.height])
    }

    update (dt) {
        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(this.texture1);
        this.renderSpr.spriteFrame = spriteFrame;
    }
}
