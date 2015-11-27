/// <reference path="../../src/nid/includes.d.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
declare module core {
    class BaseEvent {
        type: string;
        constructor(type: string);
    }
}
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
declare module core {
    class EventDispatcher {
        eventMaps: any;
        pendingEventMap: any;
        pendingEvents: Array<BaseEvent>;
        constructor();
        addEventListener(type: string, listener: Function, context?: any): void;
        hasEventListener(type: string, listener: Function): boolean;
        removeEventListener(type: string, listener: Function): void;
        dispatchEvent(event: BaseEvent): void;
    }
}
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
declare module nid {
    class Notification {
        static dom: any;
        static title: any;
        static msg: any;
        static show(title: string, message: string): void;
        static clear(): void;
    }
}
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
declare module nid {
    import BaseEvent = core.BaseEvent;
    class BoardEvent extends BaseEvent {
        static TURN: string;
        data: any;
        constructor(type: string, data: any);
    }
}
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
declare module nid {
    class Player {
        id: number;
        name: string;
        wins: number;
        constructor(id: number);
        isWin(a: any): boolean;
    }
}
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
declare module nid {
    import EventDispatcher = core.EventDispatcher;
    class BoardUI extends EventDispatcher {
        private boardWidth;
        private boardHeight;
        private boardUnitWidth;
        private boardUnitHeight;
        private lineWidth;
        private radius;
        private canvas;
        private ctx;
        private activeSlot;
        private inited;
        constructor(canvas: any);
        init(canvas: any): void;
        private initListener();
        drawCircle(): void;
        drawCross(): void;
        clear(): void;
    }
}
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
declare module nid {
    class TTTGame {
        private slots;
        private board;
        private players;
        private ties;
        private turn;
        private gameOver;
        private onTurnChangeCallback;
        private onGameOverCallback;
        constructor();
        score: string;
        attach(canvas: any): void;
        private whoWin();
        onTurnChange(callback: any): void;
        onGameOver(callback: any): void;
        restart(): void;
    }
}
