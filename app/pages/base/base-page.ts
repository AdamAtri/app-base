import { Page, Observable, View, ContentView } from 'tns-core-modules/ui/page/page';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { BaseDelegate } from './base-delegate';
import { factory } from '~/components/factory';
import { removeFromParent } from '~/utils/views';
import { ScrollView } from 'tns-core-modules/ui/scroll-view/scroll-view';

export class BasePage extends Page {

    constructor() {
        super();
        this.content = this.body;
        this.actionBarHidden = true;
    }

    private _delegate: BaseDelegate;
    public get delegate(): BaseDelegate { return this._delegate; }
    public set delegate(v: BaseDelegate) {
        if (this._delegate === v) return;
        this.bindingContext = this._delegate = v;
        if (this._delegate)
            this._delegate.target = this;
    }

    private _body: GridLayout = null;
    public get body(): GridLayout {
        if (!this._body) {
            this._body = factory.makeGridLayout({
                rows: "auto, *, auto", colums: "*",

            });
        }
        return this._body;
    }

    protected _header: View;
    public get header(): View { return this._header; }
    public set header(v: View) {
        if (this._header === v) return;
        if (this._header) {
            removeFromParent(this._header);
        }
        this._header = v;
        if (this._header) {
            this._header.row = 0;
            const index = this.headerShade ? 2 : 1;
            this.body.insertChild(this._header, index);
        }
    }
    protected _headerShade: ContentView;
    public get headerShade(): ContentView { return this._headerShade; }
    public set headerShade(v: ContentView) {
        if (this._headerShade === v) return;
        if (this._headerShade) {
            removeFromParent(this._headerShade);
        }
        this._headerShade = v;
        if (this._headerShade) {
            this._headerShade.row = 0;
            this._headerShade.rowSpan = 2;
            this.body.insertChild(this._headerShade, 1);
        }
    }

    private _main: LayoutBase | ScrollView = null;
    public get main(): LayoutBase | ScrollView { return this._main; }
    public set main(v: LayoutBase | ScrollView) {
        if (this._main === v) return;
        if (this._main) { removeFromParent(this._main); }
        this._main = v;
        if (this._main) {
            this._main.row = 1;
            this.body.insertChild(this._main, 0);
        }
    }

    private _footer: View;
    public get footer(): View { return this._footer; }
    public set footer(v: View) {
        if (this._footer === v) return;
        if (this._footer) {
            removeFromParent(this._footer);
        }
        this._footer = v;
        if (this._footer) {
            this._footer.row = 2;
            const index = this.headerShade ? 3 : 2;
            this.body.insertChild(this._footer, index);
        }
    }

    public onGoBack:() => boolean;

    protected _goBack(): boolean { 
        if (typeof(this.onGoBack) === 'function')
            return this.onGoBack();
        return false;
    }

    public onBackPressed(): boolean { 
        if (this._goBack())
            return true;
        return super.onBackPressed();
    }

    public onLoaded():void {
        super.onLoaded();
        (global as any).currentPage = this;
    }

}