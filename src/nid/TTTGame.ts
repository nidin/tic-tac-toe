///<reference path="includes.d.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
module nid {

    /**
     * Tic Tac Toe Game
     */
    export class TTTGame {

        private slots:Uint8Array;
        private board:BoardUI;
        private players:Array<Player>;
        private ties:number=0;
        private turn:number;
        private gameOver:boolean;
        private onTurnChangeCallback:Function;
        private onGameOverCallback:Function;

        constructor() {

            this.slots = new Uint8Array([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ]);

            this.turn = 0;
            this.players = [new Player(1), new Player(2)];
        }

        /**
         * Return score string
         * @returns {string}
         */
        public get score():string {
            return "X:" + this.players[0].wins + ", O:" + this.players[1].wins + ", T:" + this.ties;
        }

        /**
         * Attach canvas to game
         * @param canvas
         */
        public attach(canvas) {
            this.board = new BoardUI(canvas);
            this.board.addEventListener(BoardEvent.TURN, (event) => {

                if (this.gameOver) {
                    this.restart();
                }

                if (this.slots[event.data.index] != 0) {
                    return;
                }

                var sum:number = 1;
                this.slots.forEach(function (item) {
                    sum *= item;
                });

                if (sum === 0) {
                    var data = event.data;
                    this.slots[data.index] = this.players[this.turn].id;

                    if (this.turn == 1) {
                        this.board.drawCircle();
                        this.turn = 0;
                    } else {
                        this.board.drawCross();
                        this.turn = 1;
                    }
                }
                sum = 1;
                this.slots.forEach(function (item) {
                    sum *= item;
                });
                var winner:Player = this.whoWin();
                if (winner || sum > 0) {
                    this.gameOver = true;
                    if (this.onGameOverCallback) {
                        Notification.show("Game Over", winner ?
                            winner.name + " win" :
                                "It's a tie"
                        );
                        if (!winner) {
                            this.ties++;
                        }
                        this.onGameOverCallback(winner);
                    }
                } else if (this.onTurnChangeCallback) {
                    this.onTurnChangeCallback(this.players[this.turn]);
                }

            }, this);
        }

        /**
         * Check if any player wins
         * @returns {Player}
         */
        private whoWin():Player {
            var a = this.slots;
            var winner:Player = null;
            this.players.forEach(function (player) {
                if (player.isWin(a)) {
                    winner = player;
                }
            });
            return winner;
        }

        /**
         * Register function to assign turn change callback
         * @param callback
         */
        onTurnChange(callback) {
            this.onTurnChangeCallback = callback;
        }

        /**
         * Register function to assign game over callback
         * @param callback
         */
        onGameOver(callback) {
            this.onGameOverCallback = callback;
        }

        /**
         * Reset all components and restart game
         */
        restart() {
            Notification.clear();
            this.gameOver = false;
            this.slots = new Uint8Array([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ]);
            this.turn = 0;
            this.board.clear();
            if (this.onTurnChangeCallback) {
                this.onTurnChangeCallback(this.players[this.turn]);
            }
        }
    }
}