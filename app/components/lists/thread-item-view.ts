import { Image } from "@nativescript/core/ui/image";
import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { factory } from "~/components/factory";
import { VTColors } from "~/utils/colors";
import { getSizes } from "~/utils/sizes";


export class ThreadItemView extends GridLayout {

  constructor() {
    super();
    (this as any).rows = `*`;
    (this as any).columns = `*,60`
    // this.height = 100;
    
    this.addChild(this.titleLabel);
    this.addChild(this.titleImage);
  }

  protected _titleLabel:Label;
  public get titleLabel():Label { 
    if (! this._titleLabel) {
      this._titleLabel = factory.makeLabel({
        height: getSizes().asPercent(90),
        fontSize: getSizes().LRG_TEXT,
        color: VTColors.BLUE_800,
        backgroundColor: VTColors.BLUE_100,
        col:0
      }); 
      this._titleLabel.bind(
        {
          targetProperty: 'text', 
          sourceProperty: 'title'
        }, this.bindingContext);
    }
    return this._titleLabel;
  }

  protected _titleImage:Image;
  public get titleImage():Image { 
    if (! this._titleImage) {
      this._titleImage = factory.makeImage({
        // height: getSizes().asPercent(40),
        // height:80,
        // height:
        // fontSize: getSizes().LRG_TEXT,
        // color: VTColors.BLUE_800,
        // backgroundColor: VTColors.BLUE_100
        col:1
      }); 
      this._titleImage.bind(
        {
          targetProperty: 'src', 
          sourceProperty: 'imageURL'
        }, this.bindingContext);
    }
    return this._titleImage;
  }
}
