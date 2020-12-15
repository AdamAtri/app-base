import { factory } from "~/components/factory";
import { ThreadListView } from "~/components/lists/thread-list-view";
import { BaseDelegate } from "../base/base-delegate";
import { BasePage } from "../base/base-page"
import { AttachHeader, IWithHeader } from "../decorators/with-header"
import { DetailsDelegate } from "./details-delegate";



type HomeBase = BasePage & IWithHeader
const HomeBase = AttachHeader(BasePage);

export class DetailsPage extends HomeBase {

  constructor(inDelegate?:BaseDelegate) {
    super();
    this.delegate = inDelegate || new DetailsDelegate;
    // this.main = this.threadListView;
    // this.onActionTap = function(){console.log("tapped back")}
  }

//   protected _threadListView:ThreadListView;
//   public get threadListView():ThreadListView { 
//     if (! this._threadListView) {
//       this._threadListView = factory.make(ThreadListView, {});
//     }
//     return this._threadListView;
//   }
}

export function createPage():DetailsPage {
  return new DetailsPage();
}