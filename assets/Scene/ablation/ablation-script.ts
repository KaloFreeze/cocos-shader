
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Slider)
    slider: cc.Slider = null;
    @property(cc.Sprite)
    spr1: cc.Sprite = null;
    @property(cc.Sprite)
    spr2: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.slider.progress = 0;
        this.setAblation(0)
    }

    onSliderHandler(slider: cc.Slider) {
        this.setAblation(slider.progress)
    }

    setAblation(val) {
        this.spr1.getMaterial(0).setProperty("burnThreshold", val)
        this.spr2.getMaterial(0).setProperty("burnThreshold", val)
    }
    // update (dt) {}
}
