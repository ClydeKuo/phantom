exports.id = 0;
exports.modules = {

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(36);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(35);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phantom = __webpack_require__(37);
(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
   var instance, page, status, content;
   return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               _context.next = 2;
               return phantom.create();

            case 2:
               instance = _context.sent;
               _context.next = 5;
               return instance.createPage();

            case 5:
               page = _context.sent;

               page.setProxy("socks://127.0.0.1:1080/");
               _context.next = 9;
               return page.on("onResourceRequested", function (requestData) {
                  console.info('Requesting', requestData.url);
               });

            case 9:
               _context.next = 11;
               return page.open('https://hidemy.name/en/proxy-list/?start=1');

            case 11:
               status = _context.sent;

               console.log(status);

               _context.next = 15;
               return page.property('content');

            case 15:
               content = _context.sent;

               console.log(content);

               //    await instance.exit();

            case 17:
            case "end":
               return _context.stop();
         }
      }
   }, _callee, this);
}))();

/***/ })

};