import { TextTransform } from "tns-core-modules/ui/enums";
import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { ItemEventData, ListView } from "tns-core-modules/ui/list-view";
import { Observable, Template } from "tns-core-modules/ui/page";
import { VTColors } from "~/utils/colors";
import { getSizes } from "~/utils/sizes";
import { factory } from "../factory";
import * as trace from "tns-core-modules/trace/trace";
import { Thread } from "~/models/thread";
import { ThreadItemView } from "./thread-item-view";
import { Frame } from "tns-core-modules/ui/frame";
export class ThreadListView extends GridLayout {
  constructor() {
    super();
    (this as any).rows = "auto, *";
    (this as any).colums = "*";
    this.addChild(this.header);
    this.addChild(this.listview);
  }

  protected _header: GridLayout;
  public get header(): GridLayout {
    if (!this._header) {
      this._header = factory.makeGridLayout({
        rows: "*",
        columns: "*",
        height: getSizes().STD_HEADER_HEIGHT,
      });
      this._header.addChild(this.titleLabel);
    }
    return this._header;
  }

  protected _titleLabel: Label;
  public get titleLabel(): Label {
    if (!this._titleLabel) {
      this._titleLabel = factory.makeLabel({
        fontSize: getSizes().LRG_TEXT,
        fontWeight: "bold",
        color: VTColors.BLUE_700,
        textTransform: TextTransform.capitalize,
        verticalAlignment: "middle",
        marginLeft: getSizes().asDIP(getSizes().LRG_PAD),
      });
    }
    return this._titleLabel;
  }

  protected _listview: ListView;
  public get listview(): ListView {
    if (!this._listview) {
      this._listview = factory.makeListView({
        row: 1,
        itemTemplate: this.itemTemplate,
        rowHeight: getSizes().LIST_ITEM,
        // on:[
        //   {name:ListView.itemTapEvent, callback: this._onItemTapped.bind(this)},
        //   {name:ListView.loadMoreItemsEvent, callback: this._onLoadMoreItems.bind(this)}
        // ]
        on: [
          {
            name: ListView.unloadedEvent,
            callback: (e) => {
              debugger;
            },
          },
          {
            name: ListView.itemTapEvent,
            callback: this._onItemTapped.bind(this),
          },
          {
            name: ListView.loadMoreItemsEvent,
            callback: this._onLoadMoreItems.bind(this),
          },
        ],
      });
    }
    return this._listview;
  }

  protected _items: Array<Thread>;
  public get items(): Array<Thread> {
    return this._items;
  }
  public set items(v: Array<Thread>) {
    if (this._items === v) {
      return;
    }
    this._items = this.listview.items = v;
  }

  protected _itemTemplate: Template = () => new ThreadItemView();
  public get itemTemplate(): Template {
    return this._itemTemplate;
  }
  public set itemTemplate(v: Template) {
    if (this._itemTemplate === v) {
      return;
    }
    this._itemTemplate = this.listview.itemTemplate = v;
  }

  protected _onItemTapped(e: ItemEventData): void {
    trace.write(
      "item-tap: " + JSON.stringify(e.view.bindingContext),
      trace.categories.Debug
    );
    console.log("item-tap: " + JSON.stringify(e.view.bindingContext));
    //navigate to details page
    var navigationOptions = {
      // moduleName: "pages/details/details-page",
      moduleName: "pages/test/test",
      // context: navContextObj,
      bindingContext: e.view.bindingContext,
      animated: true,
      // transition: {
      //   name: "fade",
      //   duration: 380,
      //   curve: "easeIn",
      // },
    };
    Frame.topmost().navigate(navigationOptions);
  }

  protected _onLoadMoreItems(): void {
    trace.write(
      "loadMoreItems: " + (this.listview ? this.listview.items.length : 0),
      trace.categories.Debug
    );
    console.log(
      "loadMoreItems: " + (this.listview ? this.listview.items.length : 0)
    );
  }
}
