import { PageConstructor, Callback } from "./decorators";
import { ContentView } from "tns-core-modules/ui/content-view";
import { ActionHeader } from "~/components/headers/action-header";
import { factory } from "~/components/factory";

export interface IWithHeader { 
    actionHeader: ActionHeader;
    actionShade: ContentView;
    title: string;
    actionIcon: string;
    onActionTap?:Callback;
}

export function AttachHeader<T extends PageConstructor>(Ctor: T) { 
    return class WithHeader extends Ctor implements IWithHeader { 

        constructor(...args:any[]) {
            super();
            this.headerShade = this.actionShade;
            this.header = this.actionHeader;            
        }

        protected _actionHeader:ActionHeader
        public get actionHeader():ActionHeader { 
            if (!this._actionHeader) {
                this._actionHeader = factory.makeActionHeader({ });
            }
            return this._actionHeader as ActionHeader; 
        }

        protected _actionShade:ContentView;
        public get actionShade():ContentView {
            if (!this._actionShade) {
                this._actionShade = factory.makeActionShade({});
                this._actionShade.cssClasses.add('dark');
            }
            return this._actionShade;
        }

        public get title():string { return this.actionHeader.titleLabel.text; }
        public set title(v:string) { this.actionHeader.titleLabel.text = v; }

        public get actionIcon():string { return this.actionHeader.actionIconBtn.text; }
        public set actionIcon(v:string) { this.actionHeader.actionIconBtn.text = v; }

        public get onActionTap():Callback { return this.actionHeader.onActionTap }
        public set onActionTap(v:Callback) { this.actionHeader.onActionTap = v; }

    }
}

