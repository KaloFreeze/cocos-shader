

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
    // texture2: cc.RenderTexture;
    // onLoad () {}

    start () {
        this.renderSpr.getMaterial(0).setProperty("wh_ratio", cc.winSize.width / cc.winSize.height)
        // this.renderSpr.getMaterial(0).setProperty("wh_ratio", cc.winSize.width / cc.winSize.height)

        this.node.on(cc.Node.EventType.TOUCH_START, this.toucheEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.toucheEvent, this);
        
        this.texture1 = new cc.RenderTexture();
        this.texture1.initWithSize(cc.winSize.width, cc.winSize.height);
        this.renderCamera.targetTexture = this.texture1;
        console.log(this.renderSpr.getMaterial(0).getProperty("radius", 0))
        console.log(this.renderSpr.getMaterial(0).getProperty("blur", 0))
        console.log(this.renderSpr.getMaterial(0).getProperty("radius2", 0))
        console.log(this.renderSpr.getMaterial(0).getProperty("blur2", 0))
        this.node.getChildByName("silderSize1").getChildByName("New Slider").getComponent(cc.Slider).progress = this.renderSpr.getMaterial(0).getProperty("radius", 0)
        this.node.getChildByName("sliderBlur1").getChildByName("New Slider").getComponent(cc.Slider).progress = this.renderSpr.getMaterial(0).getProperty("blur", 0)
        this.node.getChildByName("silderSize2").getChildByName("New Slider").getComponent(cc.Slider).progress = this.renderSpr.getMaterial(0).getProperty("radius2", 0)
        this.node.getChildByName("sliderBlur2").getChildByName("New Slider").getComponent(cc.Slider).progress = this.renderSpr.getMaterial(0).getProperty("blur2", 0)
    }

    toucheEvent(evt: cc.Event.EventTouch) {
        let pos = evt.getLocation();
        this.renderSpr.getMaterial(0).setProperty('center', [pos.x / cc.winSize.width, (pos.y) / cc.winSize.height]);
    }

    update (dt) {
        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(this.texture1);
        this.renderSpr.spriteFrame = spriteFrame;
    }

    onSliderSize(slider:cc.Slider) {
        this.renderSpr.getMaterial(0).setProperty("radius", slider.progress)
    }

    onSliderBlur(slider:cc.Slider) {
        this.renderSpr.getMaterial(0).setProperty("blur", slider.progress * 0.2)
    }

    onSliderSize2(slider:cc.Slider) {
        this.renderSpr.getMaterial(0).setProperty("radius2", slider.progress)
    }

    onSliderBlur2(slider:cc.Slider) {
        this.renderSpr.getMaterial(0).setProperty("blur2", slider.progress * 0.2)
    }
}
