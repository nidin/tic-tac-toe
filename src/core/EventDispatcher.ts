///<reference path="BaseEvent.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
module core {

    export class EventDispatcher {

        eventMaps:any;
        pendingEventMap:any;
        pendingEvents:Array<BaseEvent>;

        constructor() {
            this.eventMaps = {};
            this.pendingEventMap = {};
            this.pendingEvents = [];
        }

        addEventListener(type:string, listener:Function, context?) {
            if(this.eventMaps[type] === undefined){
                this.eventMaps[type] = [];
            }
            this.eventMaps[type].push({method:listener, context:context});
            if(this.pendingEventMap[type] != undefined){
                listener.call(context,this.pendingEvents[this.pendingEventMap[type]]);
            }
        }

        hasEventListener(type:string, listener:Function):boolean {
            if(this.eventMaps[type] === undefined){
                return false;
            }
            return ( this.eventMaps[ type ] !== undefined && this.eventMaps[ type ].indexOf( listener ) !== - 1 );
        }

        removeEventListener(type:string, listener:Function) {
            if(this.eventMaps[type] !== undefined){
                this.eventMaps[type].splice(this.eventMaps[type].indexOf(listener),1);
            }
        }

        dispatchEvent(event:BaseEvent) {
            var listeners = this.eventMaps[event.type];
            if(listeners !== undefined){
                for(var i=0;i<listeners.length;i++){
                    var listener = listeners[i];
                    listener.method.call(listener.context, event);
                }
            }else{
                this.pendingEventMap[event.type] = this.pendingEvents.push(event) - 1;

            }
        }

    }
}
