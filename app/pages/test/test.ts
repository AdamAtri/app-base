import { Frame } from "tns-core-modules/ui/frame";
import * as utils from "tns-core-modules/utils/utils";

var item;
export function onNavigatingTo(args) {
  const page = args.object;
  //binding context set to same as home page
  // console.log(page.bindingContext)
  // console.log(page)
  item = page.bindingContext;
}

export function openThread() {
  console.log(item.shareURL);
  utils.openUrl(item.shareURL);
}
