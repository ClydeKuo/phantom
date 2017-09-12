exports.id = 0;
exports.modules = {

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(14);

var _promise2 = _interopRequireDefault(_promise);

var _request = __webpack_require__(79);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "http://45.78.43.138:8000/";
if (false) {
    console.log('This platform is linux:' + (process.platform == 'linux'));
    url = "http://127.0.0.1:8000/";
}
console.log("dev");
var $api = function $api(path) {
    try {
        return new _promise2.default(function (resolve, reject) {
            (0, _request2.default)(url + path, function (error, response, body) {
                if (error) {
                    console.log('error:', error);
                    reject(error);
                }
                resolve(JSON.parse(body));
            });
        });
    } catch (e) {
        reject(e);
    }
};

module.exports = $api;

/***/ })

};