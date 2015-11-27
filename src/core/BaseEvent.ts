/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */

module core {

    export class BaseEvent{

        type:string;

        constructor(type:string) {
            this.type = type;
        }
    }
}