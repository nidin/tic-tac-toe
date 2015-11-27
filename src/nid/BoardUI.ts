///<reference path="includes.d.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */

module nid {

    import BaseEvent = core.BaseEvent;
    import EventDispatcher = core.EventDispatcher;

    export class BoardUI extends EventDispatcher {

        private boardWidth:number;
        private boardHeight:number;
        private boardUnitWidth:number;
        private boardUnitHeight:number;
        private lineWidth:number;
        private radius:number;
        private canvas;
        private ctx;
        private activeSlot;
        private inited:boolean;

        constructor(canvas) {
            super();

            if (canvas) {
                this.init(canvas);
            }
        }

        public init(canvas) {


            this.lineWidth = 5;
            this.boardUnitWidth = 150;
            this.boardUnitHeight = 150;
            this.boardWidth = (this.boardUnitWidth * 3) + (this.lineWidth * 2);
            this.boardHeight = (this.boardUnitHeight * 3) + (this.lineWidth * 2);
            this.radius = ((this.boardUnitWidth) / 2) - (this.lineWidth / 2) - 20;

            this.canvas = canvas;
            this.canvas.width = this.boardWidth;
            this.canvas.height = this.boardHeight;

            this.ctx = this.canvas.getContext("2d");

            this.clear();

            if (!this.inited) {
                this.initListener();
            }
        }

        private initListener() {

            this.inited = true;
            this.canvas.addEventListener("click", (event) => {
                var slot = {x: event.offsetX, y: event.offsetY, row: undefined, column: undefined, index: undefined};
                slot.row = Math.floor(slot.y / this.boardUnitHeight);
                slot.column = Math.floor(slot.x / this.boardUnitWidth);
                slot.index = (slot.row * 3) + slot.column;
                this.activeSlot = slot;
                this.dispatchEvent(new BoardEvent(BoardEvent.TURN, slot));
            })
        }

        public drawCircle() {
            var thickness = 10;
            var x = this.radius + (this.activeSlot.column * (this.boardUnitWidth)) + this.lineWidth + 20;
            var y = this.radius + (this.activeSlot.row * (this.boardUnitHeight)) + this.lineWidth + 20;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = 'none';
            this.ctx.lineWidth = thickness;
            this.ctx.strokeStyle = '#F80303';
            this.ctx.stroke();
        }

        public drawCross() {
            var x = (this.activeSlot.column * (this.boardUnitWidth)) + 30;
            var y = (this.activeSlot.row * (this.boardUnitHeight)) + 130;
            this.ctx.fillStyle = '#007CDC';
            this.ctx.font = "150px Arial";
            this.ctx.fillText("X", x, y);
        }

        public clear() {
            this.ctx.clearRect(0, 0, this.boardWidth, this.boardHeight);
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(this.boardUnitWidth, 0, this.lineWidth, this.boardHeight);
            this.ctx.fillRect(this.boardUnitWidth * 2, 0, this.lineWidth, this.boardHeight);
            this.ctx.fillRect(0, this.boardUnitHeight, this.boardWidth, this.lineWidth);
            this.ctx.fillRect(0, this.boardUnitHeight * 2, this.boardWidth, this.lineWidth);
        }
    }

}