import { factory } from "~/components/factory";
import { ThreadListView } from "~/components/lists/thread-list-view";
import { BaseDelegate } from "../base/base-delegate";
import { BasePage } from "../base/base-page"
import { AttachHeader, IWithHeader } from "../decorators/with-header"
import { HomeDelegate } from "./home-delegate";



type HomeBase = BasePage & IWithHeader
const HomeBase = AttachHeader(BasePage);

export class HomePage extends HomeBase {

  constructor(inDelegate?:BaseDelegate) {
    super();
    this.delegate = inDelegate || new HomeDelegate;
    this.main = this.threadListView;
  }

  protected _threadListView:ThreadListView;
  public get threadListView():ThreadListView { 
    if (! this._threadListView) {
      this._threadListView = factory.make(ThreadListView, {});
    }
    return this._threadListView;
  }
}

export function createPage():HomePage {
  return new HomePage();
}