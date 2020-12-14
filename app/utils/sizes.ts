import { Frame } from "tns-core-modules/ui/frame/frame";
import * as Application from "tns-core-modules/application/application";
import { Observable } from "tns-core-modules/data/observable/observable";
import { PercentLength, Length } from "tns-core-modules/ui/page"

class Sizes extends Observable {

    private static _instance: Sizes;
    public static get sizes(): Sizes {
        if (!Sizes._instance) {
            Sizes._instance = new Sizes();
        }
        return Sizes._instance;
    }
    public static SIZES_CHANGE: string = 'sizes-have-changed';

    private _frame: Frame = null;
    protected get frame(): Frame {
        if (!this._frame) {
            const frame = Frame.topmost();
            frame.on(Frame.layoutChangedEvent, this._onLayoutChanged.bind(this));
            Application.on(Application.orientationChangedEvent, this._onLayoutChanged.bind(this));
            this._frame = frame;
        }
        return this._frame;
    }
    public get frameWidth():number {
        return this.frame ? this.frame.getActualSize().width : 0;
    }
    public get frameHeight():number {
        return this.frame ? this.frame.getActualSize().height : 0;
    }

    protected _onLayoutChanged(): void {
        for (let key of Object.keys(this)) {
            if (key.startsWith('_') || typeof (this[key]) === "function") continue;
            this.notifyPropertyChange(key, this[key]);
        }
        this.notify({ eventName: Sizes.SIZES_CHANGE, object: this });
    }

    public get STD_PAD(): number { return 8 }
    public get LRG_PAD(): number { return this.STD_PAD * 2 }
    public get X_LRG_PAD(): number { return this.STD_PAD * 3 }
    public get SM_PAD(): number { return this.STD_PAD / 2 }

    public get STD_TEXT(): number { return 16; }
    public get LRG_TEXT(): number { return Math.ceil(this.STD_TEXT * 1.25); }
    public get TITLE_TEXT(): number { return Math.ceil(this.STD_TEXT * 1.5); }

    /* buttons */
    public get ICON_BTN():number {
        return 50;
    }

    /* headers */
    public get STD_HEADER_HEIGHT(): number { return 60; }

    /* views */
    public get TEXT_VIEW_LINE(): number {
        return 1.5;
    }
    public get LIST_ITEM():number {
        const height = this.frameHeight;
        const rows = height >= 1200 ? 10 : 
                     height >= 720 ? 6 : 4;

        return Math.round(height/rows);
    }


    public asPercent(v: number): PercentLength {
        if (v > 1) v /= 100;
        return { unit: '%', value: v };
    }
    public asDIP(v: number): Length {
        return { unit: 'dip', value: v };
    }

}
export function getSizes(): Sizes {
    return Sizes.sizes;
}