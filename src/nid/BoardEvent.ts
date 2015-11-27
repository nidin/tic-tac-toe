///<reference path="includes.d.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */

module nid{

    import BaseEvent = core.BaseEvent;

    export class BoardEvent extends BaseEvent{

        static TURN:string = "TURN";

        data:any;

        constructor(type:string, data:any){
            super(type);
            this.data = data;
        }

    }
}
