(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/live.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/live.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_EventService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/EventService */ "./resources/js/services/EventService.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "live",
  data: function data() {
    return {
      twitchdata: {
        req_user: [],
        twitch: {
          data: []
        }
      },
      twitch_panel: {},
      user: "",
      isLoading: true,
      iframeLoaded: false,
      activetab: 0
    };
  },
  methods: {
    loadIframe: function loadIframe(user) {
      var _this = this;

      axios.get('/api/friendly/' + user).then(function (resp) {
        _this.user = resp.data;
        axios.get('/api/twitchpanels/' + _this.user).then(function (_ref) {
          var data = _ref.data;
          return _this.twitch_panel = data;
        });
      });
    },
    streamloaded: function streamloaded() {
      this.iframeLoaded = true;
    },
    loadgame: function loadgame(gameid) {
      var _this2 = this;

      axios.get('/api/twitchdata/' + gameid).then(function (_ref2) {
        var data = _ref2.data;
        return _this2.twitchdata = data;
      });
    },
    loadguild: function loadguild() {
      var _this3 = this;

      axios.get('/api/twitchuser/arustedknight').then(function (_ref3) {
        var data = _ref3.data;
        return _this3.twitchdata = data;
      });
    }
  },
  created: function created() {
    var _this4 = this;

    _services_EventService__WEBPACK_IMPORTED_MODULE_0__["live"].getStreams().then(function (_ref4) {
      var data = _ref4.data;
      _this4.twitchdata = data;
      _this4.user = _this4.twitchdata.req_user;
    })["finally"](function () {
      return _this4.isLoading = false;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/live.vue?vue&type=template&id=3bb9d66b&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/live.vue?vue&type=template&id=3bb9d66b& ***!
  \**************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("transition", { attrs: { name: "fade" } }, [
        _vm.isLoading
          ? _c(
              "h1",
              {
                key: "1",
                staticClass: "text-center",
                staticStyle: { height: "0" }
              },
              [_vm._v("Loading...")]
            )
          : _c("div", { key: "2" }, [
              _c(
                "div",
                { staticClass: "columns", staticStyle: { height: "60vh" } },
                [
                  _c("iframe", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.iframeLoaded,
                        expression: "iframeLoaded"
                      }
                    ],
                    staticClass: "column is-three-quarters",
                    attrs: {
                      id: "video-stream",
                      src:
                        "https://player.twitch.tv/?channel=" +
                        _vm.user +
                        "&autoplay=true",
                      frameborder: "0",
                      allowfullscreen: "true",
                      scrolling: "no"
                    },
                    on: { load: _vm.streamloaded }
                  }),
                  _vm._v(" "),
                  _c("iframe", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.iframeLoaded,
                        expression: "iframeLoaded"
                      }
                    ],
                    staticClass: "column is-one-quarter",
                    attrs: {
                      id: "chat-stream",
                      src: "https://twitch.tv/embed/" + _vm.user + "/chat",
                      frameborder: "0",
                      scrolling: "no"
                    }
                  })
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticStyle: {
                    "max-width": "100%",
                    "max-height": "620px",
                    "overflow-y": "auto",
                    "overflow-x": "auto"
                  },
                  attrs: { id: "profile-container" }
                },
                [
                  _c(
                    "div",
                    { staticClass: "card-columns justify-content-center" },
                    [
                      _vm._l(_vm.twitch_panel.info, function(panel) {
                        return _c("div", { staticClass: "p-2" }, [
                          _c("div", { staticClass: "card text-white" }, [
                            panel.data.title
                              ? _c("div", [
                                  _c("h3", [_vm._v(_vm._s(panel.data.title))])
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("a", { attrs: { href: panel.data.link } }, [
                              _c("img", { attrs: { src: panel.data.image } })
                            ]),
                            _vm._v(" "),
                            _c("div", {
                              domProps: {
                                innerHTML: _vm._s(panel.html_description)
                              }
                            })
                          ])
                        ])
                      }),
                      _vm._v(" "),
                      _vm._l(_vm.twitch_panel.links, function(panel) {
                        return _c("div", { staticClass: "p-2" }, [
                          _c("div", { staticClass: "card" }, [
                            _c("a", { attrs: { href: panel.data.link } }, [
                              _c("img", { attrs: { src: panel.data.image } })
                            ])
                          ])
                        ])
                      })
                    ],
                    2
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "columns is-marginless" }, [
                _c(
                  "div",
                  {
                    staticClass: "column",
                    class: { active: _vm.activetab === 0 },
                    on: {
                      click: function($event) {
                        {
                          _vm.loadgame(510699)
                          _vm.activetab = 0
                        }
                      }
                    }
                  },
                  [_vm._v("APOC")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "column",
                    class: { active: _vm.activetab === 1 },
                    on: {
                      click: function($event) {
                        {
                          _vm.loadgame(138585)
                          _vm.activetab = 1
                        }
                      }
                    }
                  },
                  [_vm._v("Ashes of Creation")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "column",
                    class: { active: _vm.activetab === 2 },
                    on: {
                      click: function($event) {
                        {
                          _vm.loadguild()
                          _vm.activetab = 2
                        }
                      }
                    }
                  },
                  [_vm._v("Guild")]
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  key: "3",
                  staticClass: "columns is-multiline",
                  staticStyle: { "padding-top": "10px" }
                },
                _vm._l(_vm.twitchdata.twitch.data, function(user) {
                  return _c(
                    "a",
                    {
                      staticClass: "column is-one-quarter",
                      staticStyle: { overflow: "hidden" },
                      on: {
                        click: function($event) {
                          return _vm.loadIframe(user.user_id)
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "card",
                          style:
                            "background: url(" +
                            user.thumbnail_url +
                            "); height: 200px; width: 300px; max-width: 300px; position: relative; background-size: 100% 100%; background-position: center center; background-repeat: no-repeat;",
                          attrs: { id: "live-card" }
                        },
                        [
                          _c("div", { staticClass: "titlebar" }, [
                            _vm._v(_vm._s(user.user_name))
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "viewers" }, [
                            _vm._v("Viewers: " + _vm._s(user.viewer_count))
                          ])
                        ]
                      )
                    ]
                  )
                }),
                0
              )
            ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/live.vue":
/*!*************************************!*\
  !*** ./resources/js/views/live.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _live_vue_vue_type_template_id_3bb9d66b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./live.vue?vue&type=template&id=3bb9d66b& */ "./resources/js/views/live.vue?vue&type=template&id=3bb9d66b&");
/* harmony import */ var _live_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./live.vue?vue&type=script&lang=js& */ "./resources/js/views/live.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _live_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _live_vue_vue_type_template_id_3bb9d66b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _live_vue_vue_type_template_id_3bb9d66b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/live.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/live.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/views/live.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_live_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./live.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/live.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_live_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/live.vue?vue&type=template&id=3bb9d66b&":
/*!********************************************************************!*\
  !*** ./resources/js/views/live.vue?vue&type=template&id=3bb9d66b& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_live_vue_vue_type_template_id_3bb9d66b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./live.vue?vue&type=template&id=3bb9d66b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/live.vue?vue&type=template&id=3bb9d66b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_live_vue_vue_type_template_id_3bb9d66b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_live_vue_vue_type_template_id_3bb9d66b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);