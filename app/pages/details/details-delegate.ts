import { getThreads, Thread } from "~/models/thread";
import { dataBind, ObservableProperty } from "~/utils/observables";
import { BaseDelegate } from "../base/base-delegate";
import { DetailsPage } from "./details-page";

export class DetailsDelegate extends BaseDelegate {
  @ObservableProperty()
  public title: string = "Details";

  @ObservableProperty()
  public details: Thread = null;
  //   public threads:Array<Thread> = null;
  

  public get detailsPage(): DetailsPage {
    return this.target as DetailsPage;
  }

  _bindTarget(): void {
    const { detailsPage } = this;
    dataBind(detailsPage, "title", this, "title");
    
    // const {threadListView} = detailsPage;
    // threadListView.titleLabel.textTransform = "none";
    // threadListView.titleLabel.text = "VoiceThread Details";
    // dataBind(threadListView, 'items', this, 'threads');
    // getThreads().then(result => {
    //   // console.log('result', result);
    //   console.log(result.length +" threads retrieved")
    //   this.threads = result;
    // });
  }
}
