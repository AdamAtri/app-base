import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { Label } from "tns-core-modules/ui/label/label";
import { ContentView, isIOS, View, EventData } from "tns-core-modules/ui/page/page";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Button } from "tns-core-modules/ui/button/button";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { TextView } from "tns-core-modules/ui/text-view/text-view";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { ListView } from "tns-core-modules/ui/list-view/list-view";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator/activity-indicator";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { ScrollView } from "tns-core-modules/ui/scroll-view/scroll-view";
import { Span } from "tns-core-modules/text/span";
import { HorizontalAlignment, TextAlignment, TextTransform } from "tns-core-modules/ui/enums/enums";
import { getSizes } from "../utils/sizes";
import { VTColors } from "../utils/colors";
import { ActionHeader } from "./headers/action-header";

let sizes = getSizes();

declare type Class = { new(...args: any[]): any };

export type CallbackItem = {
    name: string,
    callback: (e?: any) => void
};


class ComponentFactory {

    public make(cls: Class, args: any): any {
        const item = args.arguments ? new cls(...args.arguments) : new cls();
        let requiresBacking = false;
        for (const key in args) {
            if (key === 'arguments') continue;
            if (args[key] === undefined) continue;
            if (key === 'on') {
                if (!(args[key] instanceof Array)) args[key] = [args[key]];
                args[key].forEach((cb: CallbackItem) => {
                    item.on(cb.name, cb.callback);
                });
            }
            
            else {
                item[key] = args[key];
                if (key === 'fontWeight' && args[key] === 'bold') {
                    item.style.fontFamily = 'Roboto-Bold';
                    item.fontWeight = 'bold';
                }
            }
        }

        if (requiresBacking && (item instanceof GridLayout || item instanceof AbsoluteLayout)) {
            const backing = this.makeContentView({
                width: sizes.asPercent(1),
                height: sizes.asPercent(1),
            });
            
            if (item instanceof GridLayout) {
                backing.row = backing.col = 0;
                backing.rowSpan = item.getRows().length;
                backing.colSpan = item.getColumns().length;
            }
            item.insertChild(backing, 0);
        }

        // opportunity for caching???

        return item;
    }

    public makeContentView(args: any): ContentView {
        return this.make(ContentView, args);
    }

    public makeStackLayout(args: any): StackLayout {
        return this.make(StackLayout, args) as StackLayout;
    }

    public makeFlexbox(args: any): FlexboxLayout {
        return this.make(FlexboxLayout, args) as FlexboxLayout;
    }

    public makeGridLayout(args: any): GridLayout {
        return this.make(GridLayout, args) as GridLayout;
    }

    public makeAbsoluteLayout(args: any): AbsoluteLayout {
        return this.make(AbsoluteLayout, args) as AbsoluteLayout;
    }

    public makeLabel(args: any): Label {
        args = Object.assign({ color: VTColors.BLUE_900 }, args);
        return this.make(Label, args) as Label;
    }

    public makeTextField(args: any): TextField {
        args = Object.assign({ color: VTColors.BLUE_900 }, args);
        return this.make(TextField, args) as TextField;
    }

    protected textViewDefaults = { lineHeight: sizes.TEXT_VIEW_LINE, color: VTColors.BLUE_900 };
    public makeTextView(args: any): TextView {
        args = Object.assign(this.textViewDefaults, args);
        return this.make(TextView, args) as TextView;
    }

    protected buttonDefaults = {
        textWrap: true,
        textAlignment: TextAlignment.center,
    };
    public makeButton(args: any): Button {
        args = Object.assign({}, this.buttonDefaults, args);
        const button = this.make(Button, args) as Button;
        return this.sanitizeButton(button, args);
    }
    private iconDefaults = {
        className: 'fas md-24',
        backgroundColor: VTColors.TRANSPARENT,
        color: VTColors.WHITE_100,
        width: sizes.asDIP(sizes.ICON_BTN),
        height: sizes.asDIP(sizes.ICON_BTN),
        horizontalAlignment: 'center',
        verticalAlignment: 'middle',
        marginLeft: sizes.asDIP(sizes.STD_PAD)
    };
    public makeIconButton(args?: any): Button {
        args = Object.assign({}, this.iconDefaults, args);
        return this.makeButton(args);
    }

    protected sanitizeButton(button: Button, args: any): Button {
        button.cssPseudoClasses.clear();
        const updateVisualState = () => {
            button._goToVisualState(args.isEnabled === false ? 'disabled' : 'normal');
        };
        button.once(Button.loadedEvent, updateVisualState);
        return button;
    }

    public makeSpan(args: any = {}): Span {
        return this.make(Span, args) as Span;
    }

    public makeSwitch(args: any): Switch {
        return this.make(Switch, args) as Switch;
    }

    public makeListView(args: any): ListView {
        return this.make(ListView, args) as ListView;
    }

    public makeActivityIndicator(args: any = {}): ActivityIndicator {
        args = Object.assign({}, {
            className: 'text-teal-700',
            width: { value: 60, unit: 'dip' }
        }, args);
        return this.make(ActivityIndicator, args) as ActivityIndicator;
    }

    public makeActionHeader(args: any = {}): ActionHeader {
        return this.make(ActionHeader, args) as ActionHeader;
    }

    public makeActionShade(args: any = {}): ContentView {
        const defaults = {
            className: 'action-shade',
            width: sizes.asPercent(1),
            height: sizes.asDIP(sizes.STD_HEADER_HEIGHT),
            verticalAlignment: 'top',
            rowSpan: 2,
            translateY: 4,
        };
        args = Object.assign({}, defaults, args);
        return this.make(ContentView, args) as ContentView;
    }

    public makeScrollView(args: any = {}): ScrollView {
        return this.make(ScrollView, args) as ScrollView;
    }


}

export const factory = new ComponentFactory();