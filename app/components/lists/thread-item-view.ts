import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { factory } from "~/components/factory";
import { VTColors } from "~/utils/colors";
import { getSizes } from "~/utils/sizes";


export class ThreadItemView extends GridLayout {

  constructor() {
    super();
    (this as any).rows = `*`;
    (this as any).columns = `*`
    this.addChild(this.titleLabel);
  }

  protected _titleLabel:Label;
  public get titleLabel():Label { 
    if (! this._titleLabel) {
      this._titleLabel = factory.makeLabel({
        height: getSizes().asPercent(90),
        fontSize: getSizes().LRG_TEXT,
        color: VTColors.BLUE_800,
        backgroundColor: VTColors.BLUE_100
      }); 
      this._titleLabel.bind(
        {
          targetProperty: 'text', 
          sourceProperty: 'title'
        }, this.bindingContext);
    }
    return this._titleLabel;
  }
}
