exports.id = 0;
exports.modules = {

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(40);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(39);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(14);

var _promise2 = _interopRequireDefault(_promise);

var _config = __webpack_require__(38);

var _config2 = _interopRequireDefault(_config);

var _child_process = __webpack_require__(77);

var _path = __webpack_require__(79);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(__dirname)
var count = 0;
var urlList = ["http://ptp.chinaexpats.cn/index.php?s=tuiguang&id=5d3Khdp/pNMKvg"];

var timeOut = function timeOut(time) {
    return new _promise2.default(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time * 1000);
    });
};
var getList = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var list;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return (0, _config2.default)('select?name=free_ipproxy&order=save_time&sort=desc&count=1');

                    case 3:
                        list = _context.sent;
                        return _context.abrupt('return', list);

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function getList() {
        return _ref.apply(this, arguments);
    };
}();

var surfing = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var list, i, len, protocol, proxy, j, len2, tempUrl;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return getList();

                    case 3:
                        list = _context2.sent;
                        i = 0, len = list.length;

                    case 5:
                        if (!(i < len)) {
                            _context2.next = 20;
                            break;
                        }

                        // console.log(list[i])
                        protocol = list[i].https === 'yes' ? 'https' : 'http';
                        proxy = protocol + '://' + list[i].ip + ':' + list[i].port + '/';
                        // console.log(proxy)

                        j = 0, len2 = urlList.length;

                    case 9:
                        if (!(j < len2)) {
                            _context2.next = 17;
                            break;
                        }

                        console.log(count++);
                        tempUrl = encodeURIComponent(urlList[j]);
                        _context2.next = 14;
                        return execPhantom(proxy, tempUrl);

                    case 14:
                        j++;
                        _context2.next = 9;
                        break;

                    case 17:
                        i++;
                        _context2.next = 5;
                        break;

                    case 20:
                        _context2.next = 24;
                        break;

                    case 22:
                        _context2.prev = 22;
                        _context2.t0 = _context2['catch'](0);

                    case 24:
                        surfing();

                    case 25:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 22]]);
    }));

    return function surfing() {
        return _ref2.apply(this, arguments);
    };
}();
var execPhantom = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(proxy, tempUrl) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
                            var programPath = _path2.default.resolve();
                            console.log(programPath);
                            (0, _child_process.exec)('phantomjs ' + programPath + " " + proxy + " " + tempUrl, function (error, stdout, stderr) {
                                console.log(stdout);
                                resolve();
                                if (error) {
                                    console.info('stderr : ' + stderr);
                                }
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function execPhantom(_x, _x2) {
        return _ref3.apply(this, arguments);
    };
}();
(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    // await timeOut(30)
                    console.log("start");
                    surfing();

                case 2:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _callee4, undefined);
}))();

/***/ })

};