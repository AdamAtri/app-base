import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Button } from "tns-core-modules/ui/button/button";
import { Label } from "tns-core-modules/ui/label/label";
import { getSizes } from "~/utils/sizes";
import { factory } from "../factory";
import { awesome, AWESOME_NAMES } from "~/utils/icons";
import { Callback } from "~/pages/decorators/decorators";
import { EventData } from "tns-core-modules/ui/page";
import { notifier } from "~/utils/observables";
import { VTColors } from "~/utils/colors";

const sizes = getSizes()

export class ActionHeader extends GridLayout {

    public static ACTION = 'action-header-action';

    constructor() {
        super();
        (this as any).rows = `${sizes.STD_HEADER_HEIGHT}`;
        (this as any).columns = 'auto, auto, *, auto';
        this.backgroundColor = VTColors.BLUE_900;
        this.addChild(this.actionIconBtn);
        this.addChild(this.titleLabel);
        this.addChild(this.buttonBar);
    }

    private _actionIconBtn: Button = null;
    public get actionIconBtn(): Button {
        if (!this._actionIconBtn) {
            this._actionIconBtn = factory.makeIconButton({
                text: awesome(AWESOME_NAMES.arrowLeft),
                androidElevation: 1,
                borderRadius: sizes.asDIP(Math.round(sizes.ICON_BTN/2)),
                on: [{name: Button.tapEvent, callback: this._onButtonTapped.bind(this)}]
            });
            this._actionIconBtn.style.borderRadius
        }
        return this._actionIconBtn;
    }

    private _titleLabel: Label = null;
    public get titleLabel(): Label {
        if (!this._titleLabel) {
            this._titleLabel = factory.makeLabel({
                color: VTColors.WHITE_100,
                fontSize: sizes.TITLE_TEXT,
                fontWeight: 'bold',
                verticalAlignment: 'middle',
                column: 1
            });
        }
        return this._titleLabel;
    }

    private _buttonBar: GridLayout = null;
    public get buttonBar(): GridLayout {
        if (!this._buttonBar) {
            this._buttonBar = factory.makeGridLayout({});
        }
        return this._buttonBar;
    }

    public onActionTap:Callback;
    protected _onButtonTapped(e:EventData):void {
        if (typeof(this.onActionTap) === 'function')
            this.onActionTap(e);
        notifier(this, ActionHeader.ACTION);
    }


}