exports.id = 0;
exports.modules = {

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(41);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(40);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(14);

var _promise2 = _interopRequireDefault(_promise);

var _api = __webpack_require__(38);

var _api2 = _interopRequireDefault(_api);

var _config = __webpack_require__(22);

var _config2 = _interopRequireDefault(_config);

var _child_process = __webpack_require__(78);

var _path = __webpack_require__(79);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;
var successTime = 0;
var sqlTimes = -1;
var sqlCondition = {
    order: "save_time",
    sort: "desc"
};
var target = "https://www.baidu.com/";

var changeSql = function changeSql() {
    console.log("-------------------");
    var odd = sqlTimes % 2;
    var orderTime = odd ? (sqlTimes - 1) / 2 % 9 : sqlTimes / 2 % 9;
    console.log("orderTime:" + orderTime);
    sqlCondition.order = ['save_time', 'ip', 'port', 'country', 'anonymity', 'https', 'speed', 'source', 'vali_count'][orderTime];
    sqlCondition.sort = ['desc', 'asc'][odd];
};

var timeOut = function timeOut(time) {
    return new _promise2.default(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time * 1000);
    });
};
var getList = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var number, sql, list;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        number = { "mysql": 1000, "centos6": 1000 }[_config2.default.env] || 20;

                        console.log("sql times:" + ++sqlTimes);
                        changeSql();
                        console.log("mysql number:" + number);
                        console.log("order:" + sqlCondition.order);
                        console.log("sort:" + sqlCondition.sort);
                        sql = 'select?name=free_ipproxy&order=' + sqlCondition.order + '&sort=' + sqlCondition.sort + '&count=' + number;

                        console.log(sql);
                        _context.next = 11;
                        return (0, _api2.default)(sql);

                    case 11:
                        list = _context.sent;
                        return _context.abrupt('return', list);

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](0);

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 15]]);
    }));

    return function getList() {
        return _ref.apply(this, arguments);
    };
}();

var surfing = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var list, _loop, i, len;

        return _regenerator2.default.wrap(function _callee2$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return getList();

                    case 3:
                        list = _context3.sent;

                        console.log("thread:" + _config2.default.thread);
                        _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop() {
                            var proxyArr, k, tempUrl, targetArr;
                            return _regenerator2.default.wrap(function _loop$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            proxyArr = [];

                                            for (k = i; k < _config2.default.thread + i; k++) {
                                                console.log("times:" + ++count);
                                                proxyArr.push(formatUrl(list[k]));
                                            }
                                            tempUrl = encodeURIComponent(target);
                                            targetArr = proxyArr.map(function (item) {
                                                return execPhantom(item, tempUrl);
                                            });
                                            // console.log(targetArr)

                                            _context2.next = 6;
                                            return _promise2.default.all(targetArr);

                                        case 6:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _loop, undefined);
                        });
                        i = 0, len = list.length;

                    case 7:
                        if (!(i < len)) {
                            _context3.next = 12;
                            break;
                        }

                        return _context3.delegateYield(_loop(), 't0', 9);

                    case 9:
                        i += _config2.default.thread;
                        _context3.next = 7;
                        break;

                    case 12:
                        _context3.next = 17;
                        break;

                    case 14:
                        _context3.prev = 14;
                        _context3.t1 = _context3['catch'](0);

                        console.log(_context3.t1);

                    case 17:
                        surfing();

                    case 18:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee2, undefined, [[0, 14]]);
    }));

    return function surfing() {
        return _ref2.apply(this, arguments);
    };
}();
var formatUrl = function formatUrl(data) {
    try {
        var protocol = data.https === 'yes' ? 'https' : 'http';
        var proxy = protocol + '://' + data.ip + ':' + data.port + '/';
        console.log('proxy：' + proxy);
        return proxy;
    } catch (e) {
        console.log(e);
    }
};
var execPhantom = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(proxy, tempUrl) {
        return _regenerator2.default.wrap(function _callee3$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
                            var programPath = _path2.default.join(__dirname, '../phantom', 'phantom.js');
                            // console.log(programPath)
                            (0, _child_process.exec)('phantomjs ' + programPath + " " + proxy + " " + tempUrl, function (error, stdout, stderr) {
                                console.log(stdout);
                                if (stdout.match(/Status: success/)) {
                                    console.log("success times:" + ++successTime);
                                }
                                resolve(111);
                                if (error) {
                                    console.info('stderr : ' + stderr);
                                }
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function execPhantom(_x, _x2) {
        return _ref3.apply(this, arguments);
    };
}();
(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    console.log("wait:" + _config2.default.wait + "s");
                    _context5.next = 3;
                    return timeOut(_config2.default.wait);

                case 3:
                    surfing();

                case 4:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _callee4, undefined);
}))();

/***/ })

};