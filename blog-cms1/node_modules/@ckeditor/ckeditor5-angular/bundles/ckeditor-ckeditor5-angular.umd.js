(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@ckeditor/ckeditor5-angular', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (factory((global.ckeditor = global.ckeditor || {}, global.ckeditor['ckeditor5-angular'] = {}),global.ng.core,global.ng.common,global.ng.forms));
}(this, (function (exports,core,common,forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CKEditorComponent = /** @class */ (function () {
        function CKEditorComponent(elementRef, ngZone) {
            /**
             * The configuration of the editor.
             * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
             * to learn more.
             */
            this.config = {};
            /**
             * The initial data of the editor. Useful when not using the ngModel.
             * See https://angular.io/api/forms/NgModel to learn more.
             */
            this.data = '';
            /**
             * Tag name of the editor component.
             *
             * The default tag is 'div'.
             */
            this.tagName = 'div';
            /**
             * Fires when the editor is ready. It corresponds with the `editor#ready`
             * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#event-ready
             * event.
             */
            this.ready = new core.EventEmitter();
            /**
             * Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
             * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
             * event.
             */
            this.change = new core.EventEmitter();
            /**
             * Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
             * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
             * event.
             */
            this.blur = new core.EventEmitter();
            /**
             * Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
             * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
             * event.
             */
            this.focus = new core.EventEmitter();
            /**
             * The instance of the editor created by this component.
             */
            this.editorInstance = null;
            /**
             * If the component is read–only before the editor instance is created, it remembers that state,
             * so the editor can become read–only once it is ready.
             */
            this.initialIsDisabled = false;
            /**
             * A lock flag preventing from calling the `cvaOnChange()` during setting editor data.
             */
            this.isEditorSettingData = false;
            this.ngZone = ngZone;
            this.elementRef = elementRef;
        }
        Object.defineProperty(CKEditorComponent.prototype, "disabled", {
            get: /**
             * @return {?}
             */ function () {
                if (this.editorInstance) {
                    return this.editorInstance.isReadOnly;
                }
                return this.initialIsDisabled;
            },
            /**
             * When set `true`, the editor becomes read-only.
             * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
             * to learn more.
             */
            set: /**
             * When set `true`, the editor becomes read-only.
             * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
             * to learn more.
             * @param {?} isDisabled
             * @return {?}
             */ function (isDisabled) {
                this.setDisabledState(isDisabled);
            },
            enumerable: true,
            configurable: true
        });
        // Implementing the AfterViewInit interface.
        // Implementing the AfterViewInit interface.
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.ngAfterViewInit =
            // Implementing the AfterViewInit interface.
            /**
             * @return {?}
             */
            function () {
                var _this = this;
                this.ngZone.runOutsideAngular(( /**
                 * @return {?}
                 */function () {
                    _this.createEditor();
                }));
            };
        // Implementing the OnDestroy interface.
        // Implementing the OnDestroy interface.
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.ngOnDestroy =
            // Implementing the OnDestroy interface.
            /**
             * @return {?}
             */
            function () {
                if (this.editorInstance) {
                    this.editorInstance.destroy();
                    this.editorInstance = null;
                }
            };
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        /**
         * @param {?} value
         * @return {?}
         */
        CKEditorComponent.prototype.writeValue =
            // Implementing the ControlValueAccessor interface (only when binding to ngModel).
            /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                // This method is called with the `null` value when the form resets.
                // A component's responsibility is to restore to the initial state.
                if (value === null) {
                    value = '';
                }
                // If already initialized.
                if (this.editorInstance) {
                    // The lock mechanism prevents from calling `cvaOnChange()` during changing
                    // the editor state. See #139
                    this.isEditorSettingData = true;
                    this.editorInstance.setData(value);
                    this.isEditorSettingData = false;
                }
                // If not, wait for it to be ready; store the data.
                else {
                    this.data = value;
                    // If the editor element is already available, then update its content.
                    // If the ngModel is used then the editor element should be updated directly here.
                    if (this.editorElement) {
                        this.editorElement.innerHTML = this.data;
                    }
                }
            };
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        /**
         * @param {?} callback
         * @return {?}
         */
        CKEditorComponent.prototype.registerOnChange =
            // Implementing the ControlValueAccessor interface (only when binding to ngModel).
            /**
             * @param {?} callback
             * @return {?}
             */
            function (callback) {
                this.cvaOnChange = callback;
            };
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        /**
         * @param {?} callback
         * @return {?}
         */
        CKEditorComponent.prototype.registerOnTouched =
            // Implementing the ControlValueAccessor interface (only when binding to ngModel).
            /**
             * @param {?} callback
             * @return {?}
             */
            function (callback) {
                this.cvaOnTouched = callback;
            };
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        // Implementing the ControlValueAccessor interface (only when binding to ngModel).
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        CKEditorComponent.prototype.setDisabledState =
            // Implementing the ControlValueAccessor interface (only when binding to ngModel).
            /**
             * @param {?} isDisabled
             * @return {?}
             */
            function (isDisabled) {
                // If already initialized
                if (this.editorInstance) {
                    this.editorInstance.isReadOnly = isDisabled;
                }
                // If not, wait for it to be ready; store the state.
                else {
                    this.initialIsDisabled = isDisabled;
                }
            };
        /**
         * Creates the editor instance, sets initial editor data, then integrates
         * the editor with the Angular component. This method does not use the `editor.setData()`
         * because of the issue in the collaboration mode (#6).
         */
        /**
         * Creates the editor instance, sets initial editor data, then integrates
         * the editor with the Angular component. This method does not use the `editor.setData()`
         * because of the issue in the collaboration mode (#6).
         * @private
         * @return {?}
         */
        CKEditorComponent.prototype.createEditor = /**
         * Creates the editor instance, sets initial editor data, then integrates
         * the editor with the Angular component. This method does not use the `editor.setData()`
         * because of the issue in the collaboration mode (#6).
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var element = document.createElement(this.tagName);
                this.editorElement = element;
                if (this.data && this.config.initialData) {
                    throw new Error('Editor data should be provided either using `config.initialData` or `data` properties.');
                }
                // Merge two possible ways of providing data into the `config.initialData` field.
                /** @type {?} */
                var config = __assign({}, this.config, { initialData: this.config.initialData || this.data || '' });
                this.elementRef.nativeElement.appendChild(element);
                return ( /** @type {?} */(this.editor)).create(element, config)
                    .then(( /**
             * @param {?} editor
             * @return {?}
             */function (editor) {
                    _this.editorInstance = editor;
                    if (_this.initialIsDisabled) {
                        editor.isReadOnly = _this.initialIsDisabled;
                    }
                    _this.ngZone.run(( /**
                     * @return {?}
                     */function () {
                        _this.ready.emit(editor);
                    }));
                    _this.setUpEditorEvents(editor);
                }))
                    .catch(( /**
             * @param {?} err
             * @return {?}
             */function (err) {
                    console.error(err.stack);
                }));
            };
        /**
         * Integrates the editor with the component by attaching related event listeners.
         */
        /**
         * Integrates the editor with the component by attaching related event listeners.
         * @private
         * @param {?} editor
         * @return {?}
         */
        CKEditorComponent.prototype.setUpEditorEvents = /**
         * Integrates the editor with the component by attaching related event listeners.
         * @private
         * @param {?} editor
         * @return {?}
         */
            function (editor) {
                var _this = this;
                /** @type {?} */
                var modelDocument = editor.model.document;
                /** @type {?} */
                var viewDocument = editor.editing.view.document;
                modelDocument.on('change:data', ( /**
                 * @param {?} evt
                 * @return {?}
                 */function (evt) {
                    _this.ngZone.run(( /**
                     * @return {?}
                     */function () {
                        if (_this.cvaOnChange && !_this.isEditorSettingData) {
                            /** @type {?} */
                            var data = editor.getData();
                            _this.cvaOnChange(data);
                        }
                        _this.change.emit({ event: evt, editor: editor });
                    }));
                }));
                viewDocument.on('focus', ( /**
                 * @param {?} evt
                 * @return {?}
                 */function (evt) {
                    _this.ngZone.run(( /**
                     * @return {?}
                     */function () {
                        _this.focus.emit({ event: evt, editor: editor });
                    }));
                }));
                viewDocument.on('blur', ( /**
                 * @param {?} evt
                 * @return {?}
                 */function (evt) {
                    _this.ngZone.run(( /**
                     * @return {?}
                     */function () {
                        if (_this.cvaOnTouched) {
                            _this.cvaOnTouched();
                        }
                        _this.blur.emit({ event: evt, editor: editor });
                    }));
                }));
            };
        CKEditorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ckeditor',
                        template: '<ng-template></ng-template>',
                        // Integration with @angular/forms.
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return CKEditorComponent; })),
                                multi: true,
                            }
                        ]
                    }] }
        ];
        /** @nocollapse */
        CKEditorComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.NgZone }
            ];
        };
        CKEditorComponent.propDecorators = {
            editor: [{ type: core.Input }],
            config: [{ type: core.Input }],
            data: [{ type: core.Input }],
            tagName: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            ready: [{ type: core.Output }],
            change: [{ type: core.Output }],
            blur: [{ type: core.Output }],
            focus: [{ type: core.Output }]
        };
        return CKEditorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CKEditorModule = /** @class */ (function () {
        function CKEditorModule() {
        }
        CKEditorModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [forms.FormsModule, common.CommonModule],
                        declarations: [CKEditorComponent],
                        exports: [CKEditorComponent]
                    },] }
        ];
        return CKEditorModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.CKEditorComponent = CKEditorComponent;
    exports.CKEditorModule = CKEditorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ckeditor-ckeditor5-angular.umd.js.map