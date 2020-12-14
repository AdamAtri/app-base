import { Observable } from "tns-core-modules/data/observable/observable";
import { BasePage } from "./base-page";

export class BaseDelegate extends Observable { 

    private _target: BasePage;
    public get target(): BasePage { return this._target; }
    public set target(v: BasePage) { 
        if (this._target === v) return;
        if (this._target) { 
            this._unbindTarget();
        }
        this._target = v;
        if (this._target)
            this._bindTarget();
    }

    protected _bindTarget(): void { 
        // bind the target page to the data
    }

    protected _unbindTarget(): void { 
        // unbind the target if necessary
    }
}