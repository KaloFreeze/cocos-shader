

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    renderSpr: cc.Sprite = null;

    @property(cc.Camera)
    renderCamera: cc.Camera = null;

    @property(cc.Slider)
    slider: cc.Slider = null;

    wave_offset = 0;
    renderTex: cc.RenderTexture;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.renderSpr.getMaterial(0).setProperty("wh_ratio", cc.winSize.width / cc.winSize.height)
        // this.node.on(cc.Node.EventType.TOUCH_START, this.toucheEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.toucheEvent, this);
        this.renderTex = new cc.RenderTexture();
        this.renderTex.initWithSize(cc.winSize.width, cc.winSize.height);
        this.renderCamera.targetTexture = this.renderTex;

        this.slider.progress = 1;
        this.onSliderSize(this.slider)
    }

    toucheEvent(evt: cc.Event.EventTouch) {
        let pos = evt.getLocation();
        this.renderSpr.getMaterial(0).setProperty('center', [pos.x / cc.winSize.width, (pos.y) / cc.winSize.height]);
        this.wave_offset = 0;
    }

    update (dt) {
        if (this.wave_offset < 5) {
            this.wave_offset += dt * 1.5;
            this.renderSpr.getMaterial(0).setProperty('wave_offset', this.wave_offset);
        }
        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(this.renderTex);
        this.renderSpr.spriteFrame = spriteFrame;
    }

    onSliderSize(slider:cc.Slider) {
        this.renderSpr.getMaterial(0).setProperty("wave_radius", slider.progress * 0.5);
    }
}
