/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS = new WeakMap();
var BRICKS = new WeakMap();
var GAME = new WeakMap();
var PADDLE = new WeakMap();

var Ball = function () {
    function Ball(canvas, bricks, paddle, game) {
        _classCallCheck(this, Ball);

        CANVAS.set(this, canvas);
        BRICKS.set(this, bricks);
        GAME.set(this, game);
        PADDLE.set(this, paddle);
        this.x = canvas.width / 2;
        this.y = canvas.height - 60;
        this.movingX = 2;
        this.movingY = -5;
        this.radius = 5;
        this.bouncingSound = new Audio("bounce.ogg");
    }

    _createClass(Ball, [{
        key: 'drawBall',
        value: function drawBall() {
            var canvas = CANVAS.get(this);
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();
        }
    }, {
        key: 'checkBricksVisibility',
        value: function checkBricksVisibility() {
            var bricks = BRICKS.get(this);
            var visible = 0;
            for (var col = 0; col < bricks.columnCount; col++) {
                for (var row = 0; row < bricks.rowCount; row++) {
                    if (bricks.states[row][col]) {
                        visible++;
                    }
                }
            }
            return visible;
        }
    }, {
        key: 'checkVictory',
        value: function checkVictory() {
            var bricks = BRICKS.get(this);
            var game = GAME.get(this);
            var canvas = CANVAS.get(this);
            var ctx = canvas.getContext('2d');
            if (!this.checkBricksVisibility()) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#f9f9fb';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#6f4e74';
                ctx.fillText("YOU WIN, CONGRATULATIONS!", 90, 150);
                ctx.fillText('Score: ' + game.score, 190, 200);
                game.status = 'stop';
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            var paddle = PADDLE.get(this);
            var canvas = CANVAS.get(this);
            this.x = canvas.width / 2;
            this.y = canvas.height - 60;
            paddle.positionX = (canvas.width - paddle.width) / 2;
        }
    }, {
        key: 'checkLives',
        value: function checkLives() {
            var game = GAME.get(this);
            var canvas = CANVAS.get(this);
            var ctx = canvas.getContext('2d');
            if (!game.lives) {
                this.drawScoreAndLives();
                ctx.fillStyle = "red";
                ctx.fillText("Game over!", 150, 150);
                ctx.fillText("Press S to restart", 150, 200);
                game.status = 'stop';
            } else {
                this.reset();
            }
        }
    }, {
        key: 'drawScoreAndLives',
        value: function drawScoreAndLives() {
            var canvas = CANVAS.get(this);
            var ctx = canvas.getContext('2d');
            var game = GAME.get(this);
            ctx.fillStyle = 'rgb(50,100,50)';
            ctx.clearRect(0, canvas.height - 30, canvas.width, 30);
            ctx.fillText('Score: ' + game.score, 10, canvas.height - 5);
            ctx.fillText('Lives: ' + game.lives, canvas.width - 80, canvas.height - 5);
        }
    }, {
        key: 'moveBall',
        value: function moveBall() {
            var canvas = CANVAS.get(this);
            var paddle = PADDLE.get(this);
            var game = GAME.get(this);

            if (this.y + this.movingY - this.radius < 0 || this.collisionYWithBricks()) {
                this.movingY = -this.movingY;
                this.bouncingSound.play();
            }

            if (this.x + this.movingX - this.radius < 0 || this.x + this.movingX + this.radius > canvas.width || this.collisionXWithBricks()) {
                this.movingX = -this.movingX;
                this.bouncingSound.play();
            }
            if (this.y + this.movingY + this.radius >= canvas.height - 30 - paddle.height) {
                if (this.x + this.movingX >= paddle.positionX && this.x + this.movingX <= paddle.positionX + paddle.width) {
                    this.movingY = -this.movingY;
                    this.bouncingSound.play();
                } else {
                    game.lives--;
                    this.checkLives();
                }
            }
            this.x = this.x + this.movingX;
            this.y = this.y + this.movingY;
        }
    }, {
        key: 'collisionXWithBricks',
        value: function collisionXWithBricks() {
            var bricks = BRICKS.get(this);
            var bumpedX = false;
            for (var i = 0; i < bricks.states.length; i++) {
                for (var j = 0; j < bricks.states[i].length; j++) {
                    if (bricks.states[i][j]) {
                        var brickX = j * bricks.width;
                        var brickY = i * bricks.height;
                        if (this.x + this.movingX + this.radius >= brickX && this.x + this.radius <= brickX || this.x + this.movingX - this.radius <= brickX + bricks.width && this.x - this.radius >= this.x + bricks.width) {
                            if (this.y + this.movingY - this.radius <= brickY + bricks.height && this.y + this.movingY + this.radius >= brickY) {
                                bricks.explodeBrick(i, j);
                                this.checkVictory();

                                bumpedX = true;
                            }
                        }
                    }
                }
            }
            return bumpedX;
        }
    }, {
        key: 'collisionYWithBricks',
        value: function collisionYWithBricks() {
            var bricks = BRICKS.get(this);
            var bumpedY = false;
            for (var i = 0; i < bricks.states.length; i++) {
                for (var j = 0; j < bricks.states[i].length; j++) {
                    if (bricks.states[i][j]) {
                        var brickX = j * bricks.width;
                        var brickY = i * bricks.height;
                        if (this.y + this.movingY - this.radius <= brickY + bricks.height && this.y - this.radius >= brickY + bricks.height || this.y + this.movingY + this.radius >= brickY && this.y + this.radius <= brickY) {
                            if (this.x + this.movingX + this.radius >= brickX && this.x + this.movingX - this.radius <= brickX + bricks.width) {
                                bricks.explodeBrick(i, j);
                                this.checkVictory();
                                bumpedY = true;
                            }
                        }
                    }
                }
            }
            return bumpedY;
        }
    }]);

    return Ball;
}();

exports.default = Ball;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS = new WeakMap();
var GAME = new WeakMap();

var Bricks = function () {
    function Bricks(canvas, game) {
        _classCallCheck(this, Bricks);

        CANVAS.set(this, canvas);
        GAME.set(this, game);
        this.rowCount = 4;
        this.columnCount = 8;
        this.width = canvas.width / this.columnCount;
        this.height = 20;
        this.items = [];
        this.states = [[1, 1, 3, 3, 1, 1, 1, 2], [1, 1, 3, 1, 3, 1, 1, 1], [2, 3, 2, 1, 2, 1, 3, 1], [1, 2, 1, 1, 3, 3, 1, 1]];
        this.breakingSound = new Audio("break.ogg");

        for (var col = 0; col < this.columnCount; col++) {
            this.items[col] = [];
            for (var row = 0; row < this.rowCount; row++) {
                this.items[col][row] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    _createClass(Bricks, [{
        key: 'explodeBrick',
        value: function explodeBrick(i, j) {
            var game = GAME.get(this);
            this.states[i][j]--;

            if (this.states[i][j] > 0) {
                game.score++;
            } else {
                game.score += 2;
                this.breakingSound.play();
            }
        }
    }, {
        key: 'drawBricks',
        value: function drawBricks() {
            var canvas = CANVAS.get(this);
            var ctx = canvas.getContext('2d');

            for (var col = 0; col < this.columnCount; col++) {
                for (var row = 0; row < this.rowCount; row++) {
                    if (this.states[row][col] > 0) {
                        var brickX = col * this.width;
                        var brickY = row * this.height;
                        this.items[col][row].x = brickX;
                        this.items[col][row].y = brickY;
                        this.items[col][row].color = this.setBrickColor(col, row, this.states[row][col]);
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, this.width, this.height);
                        ctx.fillStyle = this.items[col][row].color;
                        ctx.fill();
                        ctx.strokeStyle = '#f9f9f9';
                        ctx.strokeRect(this.items[col][row].x, this.items[col][row].y, this.width, this.height);
                        ctx.closePath();
                    }
                }
            }
        }
    }, {
        key: 'setBrickColor',
        value: function setBrickColor(x, y, type) {
            var canvas = CANVAS.get(this);
            var ctx = canvas.getContext('2d');
            var color;
            switch (type) {
                case 1:
                    color = '#fea';
                    break;
                case 2:
                    color = '#ad2';
                    break;
                case 3:
                    color = '#b04e7c';
                    break;
                default:
                    ctx.clearRect(x * this.width, y * this.height, this.width, this.height);
                    break;
            }
            return color;
        }
    }]);

    return Bricks;
}();

exports.default = Bricks;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS = new WeakMap();

var Paddle = function () {
    function Paddle(canvas) {
        _classCallCheck(this, Paddle);

        CANVAS.set(this, canvas);
        this.height = 10;
        this.width = 75;
        this.positionX = (canvas.width - this.width) / 2;
    }

    _createClass(Paddle, [{
        key: 'drawPaddle',
        value: function drawPaddle() {
            var canvas = CANVAS.get(this);
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.rect(this.positionX, canvas.height - this.height - 30, this.width, this.height);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();
        }
    }]);

    return Paddle;
}();

exports.default = Paddle;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fail.png";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pause.png";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "win.png";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bounce.ogg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "break.ogg";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(6);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(7);

__webpack_require__(8);

var _ball = __webpack_require__(0);

var _ball2 = _interopRequireDefault(_ball);

var _bricks = __webpack_require__(1);

var _bricks2 = _interopRequireDefault(_bricks);

var _paddle = __webpack_require__(2);

var _paddle2 = _interopRequireDefault(_paddle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('breakout');
canvas.width = 480;
canvas.height = 500;
var ctx = canvas.getContext('2d');
ctx.font = '20px Montserrat Bold';

var game = {
    lives: 3,
    score: 0,
    status: 'start'
};

var bricks = new _bricks2.default(canvas, game);
var paddle = new _paddle2.default(canvas);
var ball = new _ball2.default(canvas, bricks, paddle, game);

var paddleMove = function paddleMove(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 + paddle.width / 2 && relativeX < canvas.width - paddle.width / 2) {
        paddle.positionX = relativeX - paddle.width / 2;
    }
};

document.addEventListener('mousemove', paddleMove, false);

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        if (game.status === 'pause') {
            game.status = 'start';
            ctx.fillStyle = '#f9f9fb';
            ctx.fillRect(150, 150, 100, 100);
        } else {
            game.status = 'pause';
            ctx.fillStyle = '#007789';
            ctx.fillText("PAUSE", 200, 250);
        }
    }
}, false);

var setup = function setup() {
    game.lives = 3;
    game.score = 0;
    game.status = 'start';

    bricks = new _bricks2.default(canvas, game);
    paddle = new _paddle2.default(canvas);
    ball = new _ball2.default(canvas, bricks, paddle, game);
};

var draw = function draw() {
    if (game.status === 'start') {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f9f9fb';
        ctx.fill();
        ctx.closePath();
        bricks.drawBricks();
        paddle.drawPaddle();
        ball.drawBall();
        ball.drawScoreAndLives();
        ball.moveBall();
    } else if (game.status === 'pause') {
        cancelAnimationFrame(animation);
    } else {
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 83) {
                game.status = 'start';
                setup();
            }
        });
    }
    var animation = requestAnimationFrame(draw);
};

draw();
//style airbnb
//webpack css отдельно

//иконка

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.map