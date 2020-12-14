
import { getThreads, Thread } from "~/models/thread";
import { dataBind, ObservableProperty } from "~/utils/observables";
import { BaseDelegate } from "../base/base-delegate";
import { HomePage } from "./home-page";

export class HomeDelegate extends BaseDelegate {

  @ObservableProperty()
  public title:string = "Home";

  @ObservableProperty()
  public threads:Array<Thread> = null;

  public get homePage():HomePage { return this.target as HomePage }

  _bindTarget():void {
    const {homePage} = this;
    dataBind(homePage, 'title', this, 'title');
    const {threadListView} = homePage;
    threadListView.titleLabel.textTransform = "none";
    threadListView.titleLabel.text = "VoiceThreads";
    dataBind(threadListView, 'items', this, 'threads');
    getThreads().then(result => {
      console.log('result', result);
      this.threads = result;
    });
  }


}