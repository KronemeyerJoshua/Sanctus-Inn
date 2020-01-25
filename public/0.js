(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forum/Category.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forum/Category.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: "Category",
  props: {
    id: [String, Number]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/forum.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_forum_Category__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/forum/Category */ "./resources/js/components/forum/Category.vue");
/* harmony import */ var _services_EventService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/EventService */ "./resources/js/services/EventService.js");
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
  name: 'forum',
  components: {
    Category: _components_forum_Category__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      categories: {},
      subcategories: {},
      loading: true
    };
  },
  computed: {
    subNum: function subNum() {
      return this.categories.num;
    }
  },
  created: function created() {
    var _this = this;

    _services_EventService__WEBPACK_IMPORTED_MODULE_1__["forum"].getCategories().then(function (_ref) {
      var data = _ref.data;
      return _this.categories = data;
    })["catch"](function (error) {
      console.log(error);
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.forumContainer[data-v-7c391b32] {\n    padding: 5px;\n    color: white;\n    background: black;\n}\n.categoryContainer[data-v-7c391b32] {\n    border: 1px solid white;\n}\n.categoryContainer > .category[data-v-7c391b32]:last-child {\n    border: none;\n}\n.categoryTitle[data-v-7c391b32] {\n    color: rgba(0,0,0,0.7) !important;\n    font-weight: bold;\n}\n.categories[data-v-7c391b32] {\n    padding-left: 5px;\n    border-bottom: 1px solid white;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forum/Category.vue?vue&type=template&id=bcde5952&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forum/Category.vue?vue&type=template&id=bcde5952&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "category columns is-mobile" }, [
    _c("div", { staticClass: "column is-three-fifths" }, [
      _c(
        "div",
        { staticClass: "categoryTitle" },
        [
          _c(
            "router-link",
            { attrs: { to: { name: "category", params: { id: this.id } } } },
            [_vm._t("title")],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "categoryDescription" }, [_vm._t("desc")], 2)
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "column is-one-fifth" },
      [_vm._t("discussions")],
      2
    ),
    _vm._v(" "),
    _c("div", { staticClass: "column is-one-fifth" }, [_vm._t("recent")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=template&id=7c391b32&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/forum.vue?vue&type=template&id=7c391b32&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    { staticClass: "categoryContainer" },
    _vm._l(_vm.categories, function(cat) {
      return _c(
        "section",
        { key: cat.id, staticClass: "forumContainer" },
        [
          _c("div", { staticClass: "forumHeader columns is-mobile" }, [
            _c("div", { staticClass: "column is-three-fifths" }, [
              _vm._v(_vm._s(cat.title))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "column is-one-fifth" }, [
              _vm._v("Discussions")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "column is-one-fifth" }, [
              _vm._v("Recent")
            ])
          ]),
          _vm._v(" "),
          _vm._l(cat.subcategories, function(sub) {
            return _c(
              "div",
              { key: sub.id, staticClass: "categories" },
              [
                _c("Category", {
                  attrs: { id: sub.id },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "title",
                        fn: function() {
                          return [_vm._v(_vm._s(sub.title))]
                        },
                        proxy: true
                      },
                      {
                        key: "desc",
                        fn: function() {
                          return [_vm._v(_vm._s(sub.description))]
                        },
                        proxy: true
                      },
                      {
                        key: "discussions",
                        fn: function() {
                          return [_vm._v(_vm._s(sub.threads_count))]
                        },
                        proxy: true
                      },
                      {
                        key: "recent",
                        fn: function() {
                          return [_vm._v(_vm._s(sub.latest_thread.title))]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    true
                  )
                })
              ],
              1
            )
          })
        ],
        2
      )
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/forum/Category.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/forum/Category.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Category_vue_vue_type_template_id_bcde5952_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Category.vue?vue&type=template&id=bcde5952&scoped=true& */ "./resources/js/components/forum/Category.vue?vue&type=template&id=bcde5952&scoped=true&");
/* harmony import */ var _Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Category.vue?vue&type=script&lang=js& */ "./resources/js/components/forum/Category.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Category_vue_vue_type_template_id_bcde5952_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Category_vue_vue_type_template_id_bcde5952_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "bcde5952",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/forum/Category.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/forum/Category.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/forum/Category.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Category.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forum/Category.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/forum/Category.vue?vue&type=template&id=bcde5952&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/forum/Category.vue?vue&type=template&id=bcde5952&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_bcde5952_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Category.vue?vue&type=template&id=bcde5952&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forum/Category.vue?vue&type=template&id=bcde5952&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_bcde5952_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_bcde5952_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/forum.vue":
/*!**************************************!*\
  !*** ./resources/js/views/forum.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _forum_vue_vue_type_template_id_7c391b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forum.vue?vue&type=template&id=7c391b32&scoped=true& */ "./resources/js/views/forum.vue?vue&type=template&id=7c391b32&scoped=true&");
/* harmony import */ var _forum_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forum.vue?vue&type=script&lang=js& */ "./resources/js/views/forum.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _forum_vue_vue_type_style_index_0_id_7c391b32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css& */ "./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _forum_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _forum_vue_vue_type_template_id_7c391b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _forum_vue_vue_type_template_id_7c391b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7c391b32",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/forum.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/forum.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/views/forum.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./forum.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_style_index_0_id_7c391b32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=style&index=0&id=7c391b32&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_style_index_0_id_7c391b32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_style_index_0_id_7c391b32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_style_index_0_id_7c391b32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_style_index_0_id_7c391b32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_style_index_0_id_7c391b32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/forum.vue?vue&type=template&id=7c391b32&scoped=true&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/forum.vue?vue&type=template&id=7c391b32&scoped=true& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_template_id_7c391b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./forum.vue?vue&type=template&id=7c391b32&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/forum.vue?vue&type=template&id=7c391b32&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_template_id_7c391b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_forum_vue_vue_type_template_id_7c391b32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);