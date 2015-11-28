/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
var core;
(function (core) {
    var BaseEvent = (function () {
        function BaseEvent(type) {
            this.type = type;
        }
        return BaseEvent;
    })();
    core.BaseEvent = BaseEvent;
})(core || (core = {}));
///<reference path="BaseEvent.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
var core;
(function (core) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.eventMaps = {};
            this.pendingEventMap = {};
            this.pendingEvents = [];
        }
        EventDispatcher.prototype.addEventListener = function (type, listener, context) {
            if (this.eventMaps[type] === undefined) {
                this.eventMaps[type] = [];
            }
            this.eventMaps[type].push({ method: listener, context: context });
            if (this.pendingEventMap[type] != undefined) {
                listener.call(context, this.pendingEvents[this.pendingEventMap[type]]);
            }
        };
        EventDispatcher.prototype.hasEventListener = function (type, listener) {
            if (this.eventMaps[type] === undefined) {
                return false;
            }
            return (this.eventMaps[type] !== undefined && this.eventMaps[type].indexOf(listener) !== -1);
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener) {
            if (this.eventMaps[type] !== undefined) {
                this.eventMaps[type].splice(this.eventMaps[type].indexOf(listener), 1);
            }
        };
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var listeners = this.eventMaps[event.type];
            if (listeners !== undefined) {
                for (var i = 0; i < listeners.length; i++) {
                    var listener = listeners[i];
                    listener.method.call(listener.context, event);
                }
            }
            else {
                this.pendingEventMap[event.type] = this.pendingEvents.push(event) - 1;
            }
        };
        return EventDispatcher;
    })();
    core.EventDispatcher = EventDispatcher;
})(core || (core = {}));
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
var nid;
(function (nid) {
    var Player = (function () {
        /**
         * Constructor
         * @param id
         */
        function Player(id) {
            this.id = id;
            this.wins = 0;
            this.name = "Player " + id;
        }
        /**
         * Check if player wins
         * @param a
         * @returns {boolean}
         */
        Player.prototype.isWin = function (a) {
            var win = false;
            //row
            if (a[0] == this.id && a[1] == this.id && a[2] == this.id) {
                win = true;
            }
            if (a[3] == this.id && a[4] == this.id && a[5] == this.id) {
                win = true;
            }
            if (a[6] == this.id && a[7] == this.id && a[8] == this.id) {
                win = true;
            }
            //column
            if (a[0] == this.id && a[3] == this.id && a[6] == this.id) {
                win = true;
            }
            if (a[1] == this.id && a[4] == this.id && a[7] == this.id) {
                win = true;
            }
            if (a[2] == this.id && a[5] == this.id && a[8] == this.id) {
                win = true;
            }
            //diagonal
            if (a[0] == this.id && a[4] == this.id && a[8] == this.id) {
                win = true;
            }
            if (a[6] == this.id && a[4] == this.id && a[2] == this.id) {
                win = true;
            }
            if (win) {
                this.wins++;
            }
            return win;
        };
        return Player;
    })();
    nid.Player = Player;
})(nid || (nid = {}));
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
var nid;
(function (nid) {
    /**
     * Handles small notifications
     */
    var Notification = (function () {
        function Notification() {
        }
        /**
         * Show notification message with title
         * @param title
         * @param message
         */
        Notification.show = function (title, message) {
            if (!Notification.dom) {
                var container = document.createElement('div');
                var _title = document.createElement('div');
                var _msg = document.createElement('div');
                container.id = "notification";
                _title.className = "notification_title";
                container.appendChild(_title);
                container.appendChild(_msg);
                Notification.dom = container;
                Notification.title = _title;
                Notification.msg = _msg;
            }
            document.body.appendChild(Notification.dom);
            Notification.msg.innerHTML = message;
            Notification.title.innerHTML = title;
        };
        /**
         * Clear notification
         */
        Notification.clear = function () {
            if (document.body.contains(Notification.dom)) {
                document.body.removeChild(Notification.dom);
            }
        };
        return Notification;
    })();
    nid.Notification = Notification;
})(nid || (nid = {}));
///<reference path="includes.d.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var nid;
(function (nid) {
    var BaseEvent = core.BaseEvent;
    var BoardEvent = (function (_super) {
        __extends(BoardEvent, _super);
        /**
         * Constructor
         * @param type
         * @param data
         */
        function BoardEvent(type, data) {
            _super.call(this, type);
            this.data = data;
        }
        BoardEvent.TURN = "TURN";
        return BoardEvent;
    })(BaseEvent);
    nid.BoardEvent = BoardEvent;
})(nid || (nid = {}));
///<reference path="includes.d.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
var nid;
(function (nid) {
    var EventDispatcher = core.EventDispatcher;
    var BoardUI = (function (_super) {
        __extends(BoardUI, _super);
        /**
         * Constructor
         * @param canvas
         */
        function BoardUI(canvas) {
            _super.call(this);
            if (canvas) {
                this.init(canvas);
            }
        }
        /**
         * Initialize UI
         * @param canvas
         */
        BoardUI.prototype.init = function (canvas) {
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
        };
        /**
         * Initialize event listeners
         */
        BoardUI.prototype.initListener = function () {
            var _this = this;
            this.inited = true;
            this.canvas.addEventListener("click", function (event) {
                var slot = { x: event.offsetX, y: event.offsetY, row: undefined, column: undefined, index: undefined };
                slot.row = Math.floor(slot.y / _this.boardUnitHeight);
                slot.column = Math.floor(slot.x / _this.boardUnitWidth);
                slot.index = (slot.row * 3) + slot.column;
                _this.activeSlot = slot;
                _this.dispatchEvent(new nid.BoardEvent(nid.BoardEvent.TURN, slot));
            });
        };
        /**
         * Draw circle on canvas
         */
        BoardUI.prototype.drawCircle = function () {
            var thickness = 10;
            var x = this.radius + (this.activeSlot.column * (this.boardUnitWidth)) + this.lineWidth + 20;
            var y = this.radius + (this.activeSlot.row * (this.boardUnitHeight)) + this.lineWidth + 20;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = 'none';
            this.ctx.lineWidth = thickness;
            this.ctx.strokeStyle = '#F80303';
            this.ctx.stroke();
        };
        /**
         * Draw cross on canvas
         */
        BoardUI.prototype.drawCross = function () {
            var x = (this.activeSlot.column * (this.boardUnitWidth)) + 30;
            var y = (this.activeSlot.row * (this.boardUnitHeight)) + 130;
            this.ctx.fillStyle = '#007CDC';
            this.ctx.font = "150px Arial";
            this.ctx.fillText("X", x, y);
        };
        /**
         * Clear canvas
         */
        BoardUI.prototype.clear = function () {
            this.ctx.clearRect(0, 0, this.boardWidth, this.boardHeight);
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(this.boardUnitWidth, 0, this.lineWidth, this.boardHeight);
            this.ctx.fillRect(this.boardUnitWidth * 2, 0, this.lineWidth, this.boardHeight);
            this.ctx.fillRect(0, this.boardUnitHeight, this.boardWidth, this.lineWidth);
            this.ctx.fillRect(0, this.boardUnitHeight * 2, this.boardWidth, this.lineWidth);
        };
        return BoardUI;
    })(EventDispatcher);
    nid.BoardUI = BoardUI;
})(nid || (nid = {}));
///<reference path="includes.d.ts" />
/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
var nid;
(function (nid) {
    /**
     * Tic Tac Toe Game
     */
    var TTTGame = (function () {
        function TTTGame() {
            this.ties = 0;
            this.slots = new Uint8Array([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ]);
            this.turn = 0;
            this.players = [new nid.Player(1), new nid.Player(2)];
        }
        Object.defineProperty(TTTGame.prototype, "score", {
            /**
             * Return score string
             * @returns {string}
             */
            get: function () {
                return "X:" + this.players[0].wins + ", O:" + this.players[1].wins + ", T:" + this.ties;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Attach canvas to game
         * @param canvas
         */
        TTTGame.prototype.attach = function (canvas) {
            var _this = this;
            this.board = new nid.BoardUI(canvas);
            this.board.addEventListener(nid.BoardEvent.TURN, function (event) {
                if (_this.gameOver) {
                    _this.restart();
                }
                if (_this.slots[event.data.index] != 0) {
                    return;
                }
                var sum = 1;
                _this.slots.forEach(function (item) {
                    sum *= item;
                });
                if (sum === 0) {
                    var data = event.data;
                    _this.slots[data.index] = _this.players[_this.turn].id;
                    if (_this.turn == 1) {
                        _this.board.drawCircle();
                        _this.turn = 0;
                    }
                    else {
                        _this.board.drawCross();
                        _this.turn = 1;
                    }
                }
                sum = 1;
                _this.slots.forEach(function (item) {
                    sum *= item;
                });
                var winner = _this.whoWin();
                if (winner || sum > 0) {
                    _this.gameOver = true;
                    if (_this.onGameOverCallback) {
                        nid.Notification.show("Game Over", winner ?
                            winner.name + " win" :
                            "It's a tie");
                        if (!winner) {
                            _this.ties++;
                        }
                        _this.onGameOverCallback(winner);
                    }
                }
                else if (_this.onTurnChangeCallback) {
                    _this.onTurnChangeCallback(_this.players[_this.turn]);
                }
            }, this);
        };
        /**
         * Check if any player wins
         * @returns {Player}
         */
        TTTGame.prototype.whoWin = function () {
            var a = this.slots;
            var winner = null;
            this.players.forEach(function (player) {
                if (player.isWin(a)) {
                    winner = player;
                }
            });
            return winner;
        };
        /**
         * Register function to assign turn change callback
         * @param callback
         */
        TTTGame.prototype.onTurnChange = function (callback) {
            this.onTurnChangeCallback = callback;
        };
        /**
         * Register function to assign game over callback
         * @param callback
         */
        TTTGame.prototype.onGameOver = function (callback) {
            this.onGameOverCallback = callback;
        };
        /**
         * Reset all components and restart game
         */
        TTTGame.prototype.restart = function () {
            nid.Notification.clear();
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
        };
        return TTTGame;
    })();
    nid.TTTGame = TTTGame;
})(nid || (nid = {}));
//# sourceMappingURL=TTTGame.js.map