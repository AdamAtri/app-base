import { Observable, View, ViewBase } from "tns-core-modules/ui/page";

export function notifier(o:Observable, eventName:string, data?:any):void {
  if (!o || !eventName) return;
  let event = {eventName, object: o, data: null};
  if (data) {
    if (typeof(data) === 'object' && !(data instanceof Array)) {
      event = Object.assign(event, data);
    }
    else 
      event.data = data;
  }
  o.notify(event);
}

export function dataBind(target:ViewBase, tPropName:string, source:Observable, sPropName:string, expression?:string):void {
  target.bindingContext = source;
  target.bind({targetProperty:tPropName, sourceProperty:sPropName, expression}, source);
}


export function ObservableProperty(initialValue?:any, updatesLayout:boolean=false) {
  return (obj: Observable, key:string) => {
    const protectedProp = `_${key}`;

    Object.defineProperty(obj, protectedProp, {
      value: initialValue,
      writable: true,
      enumerable: false,
      configurable: true
    });

    Object.defineProperty(obj, key, {
      get: function () { return this[protectedProp]; },
      set: function (v) {
        if (this[protectedProp] === v) return;
        const previousValue = this[protectedProp];
        this[protectedProp] = v;
        
        this.notifyPropertyChange(key, this[protectedProp], previousValue);
        if (this instanceof View && updatesLayout) {
          this.requestLayout();
        }
      },
      enumerable: true,
      configurable: true,
    });
    
  };
}