import { View, ContentView } from "tns-core-modules/ui/content-view/content-view";
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";

export function removeFromParent(v: View):void { 
    if (!v || !v.parent || !(v.parent instanceof View)) return;
    if (!v.isLoaded) { 
        v.on(View.loadedEvent, () => setTimeout(() => removeFromParent(v)));
        return;
    }
    if (v.parent instanceof LayoutBase)
        v.parent.removeChild(v);
    else if (v.parent instanceof ContentView)
        v.parent.content = null;
    else
        v.parent._removeView(v);
}

