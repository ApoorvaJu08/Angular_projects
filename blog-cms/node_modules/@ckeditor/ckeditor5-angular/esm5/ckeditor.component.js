/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
import { Component, Input, Output, NgZone, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
        this.ready = new EventEmitter();
        /**
         * Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
         * event.
         */
        this.change = new EventEmitter();
        /**
         * Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
         * event.
         */
        this.blur = new EventEmitter();
        /**
         * Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
         * event.
         */
        this.focus = new EventEmitter();
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
         */
        function () {
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
         */
        function (isDisabled) {
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
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
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
        var config = tslib_1.__assign({}, this.config, { initialData: this.config.initialData || this.data || '' });
        this.elementRef.nativeElement.appendChild(element);
        return (/** @type {?} */ (this.editor)).create(element, config)
            .then((/**
         * @param {?} editor
         * @return {?}
         */
        function (editor) {
            _this.editorInstance = editor;
            if (_this.initialIsDisabled) {
                editor.isReadOnly = _this.initialIsDisabled;
            }
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.ready.emit(editor);
            }));
            _this.setUpEditorEvents(editor);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
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
        modelDocument.on('change:data', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                if (_this.cvaOnChange && !_this.isEditorSettingData) {
                    /** @type {?} */
                    var data = editor.getData();
                    _this.cvaOnChange(data);
                }
                _this.change.emit({ event: evt, editor: editor });
            }));
        }));
        viewDocument.on('focus', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.focus.emit({ event: evt, editor: editor });
            }));
        }));
        viewDocument.on('blur', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                if (_this.cvaOnTouched) {
                    _this.cvaOnTouched();
                }
                _this.blur.emit({ event: evt, editor: editor });
            }));
        }));
    };
    CKEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ckeditor',
                    template: '<ng-template></ng-template>',
                    // Integration with @angular/forms.
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return CKEditorComponent; })),
                            multi: true,
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    CKEditorComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    CKEditorComponent.propDecorators = {
        editor: [{ type: Input }],
        config: [{ type: Input }],
        data: [{ type: Input }],
        tagName: [{ type: Input }],
        disabled: [{ type: Input }],
        ready: [{ type: Output }],
        change: [{ type: Output }],
        blur: [{ type: Output }],
        focus: [{ type: Output }]
    };
    return CKEditorComponent;
}());
export { CKEditorComponent };
if (false) {
    /**
     * The reference to the DOM element created by the component.
     * @type {?}
     * @private
     */
    CKEditorComponent.prototype.elementRef;
    /**
     * The constructor of the editor to be used for the instance of the component.
     * It can be e.g. the `ClassicEditorBuild`, `InlineEditorBuild` or some custom editor.
     * @type {?}
     */
    CKEditorComponent.prototype.editor;
    /**
     * The configuration of the editor.
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
     * to learn more.
     * @type {?}
     */
    CKEditorComponent.prototype.config;
    /**
     * The initial data of the editor. Useful when not using the ngModel.
     * See https://angular.io/api/forms/NgModel to learn more.
     * @type {?}
     */
    CKEditorComponent.prototype.data;
    /**
     * Tag name of the editor component.
     *
     * The default tag is 'div'.
     * @type {?}
     */
    CKEditorComponent.prototype.tagName;
    /**
     * Fires when the editor is ready. It corresponds with the `editor#ready`
     * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#event-ready
     * event.
     * @type {?}
     */
    CKEditorComponent.prototype.ready;
    /**
     * Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
     * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
     * event.
     * @type {?}
     */
    CKEditorComponent.prototype.change;
    /**
     * Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
     * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
     * event.
     * @type {?}
     */
    CKEditorComponent.prototype.blur;
    /**
     * Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
     * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
     * event.
     * @type {?}
     */
    CKEditorComponent.prototype.focus;
    /**
     * The instance of the editor created by this component.
     * @type {?}
     */
    CKEditorComponent.prototype.editorInstance;
    /**
     * If the component is read–only before the editor instance is created, it remembers that state,
     * so the editor can become read–only once it is ready.
     * @type {?}
     * @private
     */
    CKEditorComponent.prototype.initialIsDisabled;
    /**
     * An instance of https://angular.io/api/core/NgZone to allow the interaction with the editor
     * withing the Angular event loop.
     * @type {?}
     * @private
     */
    CKEditorComponent.prototype.ngZone;
    /**
     * A callback executed when the content of the editor changes. Part of the
     * `ControlValueAccessor` (https://angular.io/api/forms/ControlValueAccessor) interface.
     *
     * Note: Unset unless the component uses the `ngModel`.
     * @type {?}
     * @private
     */
    CKEditorComponent.prototype.cvaOnChange;
    /**
     * A callback executed when the editor has been blurred. Part of the
     * `ControlValueAccessor` (https://angular.io/api/forms/ControlValueAccessor) interface.
     *
     * Note: Unset unless the component uses the `ngModel`.
     * @type {?}
     * @private
     */
    CKEditorComponent.prototype.cvaOnTouched;
    /**
     * Reference to the source element used by the editor.
     * @type {?}
     * @private
     */
    CKEditorComponent.prototype.editorElement;
    /**
     * A lock flag preventing from calling the `cvaOnChange()` during setting editor data.
     * @type {?}
     * @private
     */
    CKEditorComponent.prototype.isEditorSettingData;
}
/**
 * @record
 */
export function BlurEvent() { }
if (false) {
    /** @type {?} */
    BlurEvent.prototype.event;
    /** @type {?} */
    BlurEvent.prototype.editor;
}
/**
 * @record
 */
export function FocusEvent() { }
if (false) {
    /** @type {?} */
    FocusEvent.prototype.event;
    /** @type {?} */
    FocusEvent.prototype.editor;
}
/**
 * @record
 */
export function ChangeEvent() { }
if (false) {
    /** @type {?} */
    ChangeEvent.prototype.event;
    /** @type {?} */
    ChangeEvent.prototype.editor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNrZWRpdG9yL2NrZWRpdG9yNS1hbmd1bGFyLyIsInNvdXJjZXMiOlsiY2tlZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFFVixVQUFVLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUVOLGlCQUFpQixFQUNqQixNQUFNLGdCQUFnQixDQUFDO0FBSXhCO0lBc0lDLDJCQUFvQixVQUFzQixFQUFFLE1BQWM7Ozs7OztRQXZHMUMsV0FBTSxHQUFxQixFQUFFLENBQUM7Ozs7O1FBTTlCLFNBQUksR0FBRyxFQUFFLENBQUM7Ozs7OztRQU9WLFlBQU8sR0FBRyxLQUFLLENBQUM7Ozs7OztRQXdCZixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7Ozs7OztRQU83QyxXQUFNLEdBQThCLElBQUksWUFBWSxFQUFlLENBQUM7Ozs7OztRQU9wRSxTQUFJLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7Ozs7OztRQU85RCxVQUFLLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7Ozs7UUFLM0UsbUJBQWMsR0FBNEIsSUFBSSxDQUFDOzs7OztRQU05QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFnQzFCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUduQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUM5QixDQUFDO0lBdEZELHNCQUFvQix1Q0FBUTs7OztRQUk1QjtZQUNDLElBQUssSUFBSSxDQUFDLGNBQWMsRUFBRztnQkFDMUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzthQUN0QztZQUVELE9BQU8sSUFB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QUFLO3lCQU9MLEtBQUs7dUJBTUwsS0FBSzswQkFPTCxLQUFLOzJCQU9MLEtBQUs7d0JBaUJMLE1BQU07eUJBT04sTUFBTTt1QkFPTixNQUFNO3dCQU9OLE1BQU07O0lBOExSLHdCQUFDO0NBQUEsQUF2UkQsSUF1UkM7U0F6UVksaUJBQWlCOzs7Ozs7O0lBSTdCLHVDQUE2Qzs7Ozs7O0lBTTdDLG1DQUFxRDs7Ozs7OztJQU9yRCxtQ0FBOEM7Ozs7OztJQU05QyxpQ0FBMEI7Ozs7Ozs7SUFPMUIsb0NBQWdDOzs7Ozs7O0lBd0JoQyxrQ0FBOEQ7Ozs7Ozs7SUFPOUQsbUNBQXFGOzs7Ozs7O0lBT3JGLGlDQUErRTs7Ozs7OztJQU8vRSxrQ0FBa0Y7Ozs7O0lBS2xGLDJDQUFzRDs7Ozs7OztJQU10RCw4Q0FBa0M7Ozs7Ozs7SUFNbEMsbUNBQXVCOzs7Ozs7Ozs7SUFRdkIsd0NBQStDOzs7Ozs7Ozs7SUFRL0MseUNBQWtDOzs7Ozs7SUFLbEMsMENBQW9DOzs7Ozs7SUFLcEMsZ0RBQW9DOzs7OztBQXFKckMsK0JBR0M7OztJQUZBLDBCQUFtQzs7SUFDbkMsMkJBQXlCOzs7OztBQUcxQixnQ0FHQzs7O0lBRkEsMkJBQW9DOztJQUNwQyw0QkFBeUI7Ozs7O0FBRzFCLGlDQUdDOzs7SUFGQSw0QkFBMEM7O0lBQzFDLDZCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgQ29weXJpZ2h0IChjKSAyMDAzLTIwMTksIENLU291cmNlIC0gRnJlZGVyaWNvIEtuYWJiZW4uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBGb3IgbGljZW5zaW5nLCBzZWUgTElDRU5TRS5tZC5cbiAqL1xuXG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdE5nWm9uZSxcblx0RXZlbnRFbWl0dGVyLFxuXHRmb3J3YXJkUmVmLFxuXHRBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksXG5cdEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG5cdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuXHROR19WQUxVRV9BQ0NFU1NPUlxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENLRWRpdG9yNSB9IGZyb20gJy4vY2tlZGl0b3InO1xuXG5AQ29tcG9uZW50KCB7XG5cdHNlbGVjdG9yOiAnY2tlZGl0b3InLFxuXHR0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZT48L25nLXRlbXBsYXRlPicsXG5cblx0Ly8gSW50ZWdyYXRpb24gd2l0aCBAYW5ndWxhci9mb3Jtcy5cblx0cHJvdmlkZXJzOiBbXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVzZS1iZWZvcmUtZGVmaW5lXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZiggKCkgPT4gQ0tFZGl0b3JDb21wb25lbnQgKSxcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdH1cblx0XVxufSApXG5leHBvcnQgY2xhc3MgQ0tFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblx0LyoqXG5cdCAqIFRoZSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50IGNyZWF0ZWQgYnkgdGhlIGNvbXBvbmVudC5cblx0ICovXG5cdHByaXZhdGUgZWxlbWVudFJlZiE6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG5cdC8qKlxuXHQgKiBUaGUgY29uc3RydWN0b3Igb2YgdGhlIGVkaXRvciB0byBiZSB1c2VkIGZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudC5cblx0ICogSXQgY2FuIGJlIGUuZy4gdGhlIGBDbGFzc2ljRWRpdG9yQnVpbGRgLCBgSW5saW5lRWRpdG9yQnVpbGRgIG9yIHNvbWUgY3VzdG9tIGVkaXRvci5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyBlZGl0b3I/OiBDS0VkaXRvcjUuRWRpdG9yQ29uc3RydWN0b3I7XG5cblx0LyoqXG5cdCAqIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBlZGl0b3IuXG5cdCAqIFNlZSBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9jb3JlX2VkaXRvcl9lZGl0b3Jjb25maWctRWRpdG9yQ29uZmlnLmh0bWxcblx0ICogdG8gbGVhcm4gbW9yZS5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IENLRWRpdG9yNS5Db25maWcgPSB7fTtcblxuXHQvKipcblx0ICogVGhlIGluaXRpYWwgZGF0YSBvZiB0aGUgZWRpdG9yLiBVc2VmdWwgd2hlbiBub3QgdXNpbmcgdGhlIG5nTW9kZWwuXG5cdCAqIFNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2Zvcm1zL05nTW9kZWwgdG8gbGVhcm4gbW9yZS5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyBkYXRhID0gJyc7XG5cblx0LyoqXG5cdCAqIFRhZyBuYW1lIG9mIHRoZSBlZGl0b3IgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBUaGUgZGVmYXVsdCB0YWcgaXMgJ2RpdicuXG5cdCAqL1xuXHRASW5wdXQoKSBwdWJsaWMgdGFnTmFtZSA9ICdkaXYnO1xuXG5cdC8qKlxuXHQgKiBXaGVuIHNldCBgdHJ1ZWAsIHRoZSBlZGl0b3IgYmVjb21lcyByZWFkLW9ubHkuXG5cdCAqIFNlZSBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9jb3JlX2VkaXRvcl9lZGl0b3ItRWRpdG9yLmh0bWwjbWVtYmVyLWlzUmVhZE9ubHlcblx0ICogdG8gbGVhcm4gbW9yZS5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyBzZXQgZGlzYWJsZWQoIGlzRGlzYWJsZWQ6IGJvb2xlYW4gKSB7XG5cdFx0dGhpcy5zZXREaXNhYmxlZFN0YXRlKCBpc0Rpc2FibGVkICk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRpc2FibGVkKCkge1xuXHRcdGlmICggdGhpcy5lZGl0b3JJbnN0YW5jZSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVkaXRvckluc3RhbmNlLmlzUmVhZE9ubHk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuaW5pdGlhbElzRGlzYWJsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogRmlyZXMgd2hlbiB0aGUgZWRpdG9yIGlzIHJlYWR5LiBJdCBjb3JyZXNwb25kcyB3aXRoIHRoZSBgZWRpdG9yI3JlYWR5YFxuXHQgKiBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9jb3JlX2VkaXRvcl9lZGl0b3ItRWRpdG9yLmh0bWwjZXZlbnQtcmVhZHlcblx0ICogZXZlbnQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgcHVibGljIHJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxDS0VkaXRvcjUuRWRpdG9yPigpO1xuXG5cdC8qKlxuXHQgKiBGaXJlcyB3aGVuIHRoZSBjb250ZW50IG9mIHRoZSBlZGl0b3IgaGFzIGNoYW5nZWQuIEl0IGNvcnJlc3BvbmRzIHdpdGggdGhlIGBlZGl0b3IubW9kZWwuZG9jdW1lbnQjY2hhbmdlYFxuXHQgKiBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9lbmdpbmVfbW9kZWxfZG9jdW1lbnQtRG9jdW1lbnQuaHRtbCNldmVudC1jaGFuZ2Vcblx0ICogZXZlbnQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2hhbmdlRXZlbnQ+KCk7XG5cblx0LyoqXG5cdCAqIEZpcmVzIHdoZW4gdGhlIGVkaXRpbmcgdmlldyBvZiB0aGUgZWRpdG9yIGlzIGJsdXJyZWQuIEl0IGNvcnJlc3BvbmRzIHdpdGggdGhlIGBlZGl0b3IuZWRpdGluZy52aWV3LmRvY3VtZW50I2JsdXJgXG5cdCAqIGh0dHBzOi8vY2tlZGl0b3IuY29tL2RvY3MvY2tlZGl0b3I1L2xhdGVzdC9hcGkvbW9kdWxlX2VuZ2luZV92aWV3X2RvY3VtZW50LURvY3VtZW50Lmh0bWwjZXZlbnQtZXZlbnQ6Ymx1clxuXHQgKiBldmVudC5cblx0ICovXG5cdEBPdXRwdXQoKSBwdWJsaWMgYmx1cjogRXZlbnRFbWl0dGVyPEJsdXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJsdXJFdmVudD4oKTtcblxuXHQvKipcblx0ICogRmlyZXMgd2hlbiB0aGUgZWRpdGluZyB2aWV3IG9mIHRoZSBlZGl0b3IgaXMgZm9jdXNlZC4gSXQgY29ycmVzcG9uZHMgd2l0aCB0aGUgYGVkaXRvci5lZGl0aW5nLnZpZXcuZG9jdW1lbnQjZm9jdXNgXG5cdCAqIGh0dHBzOi8vY2tlZGl0b3IuY29tL2RvY3MvY2tlZGl0b3I1L2xhdGVzdC9hcGkvbW9kdWxlX2VuZ2luZV92aWV3X2RvY3VtZW50LURvY3VtZW50Lmh0bWwjZXZlbnQtZXZlbnQ6Zm9jdXNcblx0ICogZXZlbnQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgcHVibGljIGZvY3VzOiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG5cblx0LyoqXG5cdCAqIFRoZSBpbnN0YW5jZSBvZiB0aGUgZWRpdG9yIGNyZWF0ZWQgYnkgdGhpcyBjb21wb25lbnQuXG5cdCAqL1xuXHRwdWJsaWMgZWRpdG9ySW5zdGFuY2U6IENLRWRpdG9yNS5FZGl0b3IgfCBudWxsID0gbnVsbDtcblxuXHQvKipcblx0ICogSWYgdGhlIGNvbXBvbmVudCBpcyByZWFk4oCTb25seSBiZWZvcmUgdGhlIGVkaXRvciBpbnN0YW5jZSBpcyBjcmVhdGVkLCBpdCByZW1lbWJlcnMgdGhhdCBzdGF0ZSxcblx0ICogc28gdGhlIGVkaXRvciBjYW4gYmVjb21lIHJlYWTigJNvbmx5IG9uY2UgaXQgaXMgcmVhZHkuXG5cdCAqL1xuXHRwcml2YXRlIGluaXRpYWxJc0Rpc2FibGVkID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIEFuIGluc3RhbmNlIG9mIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29yZS9OZ1pvbmUgdG8gYWxsb3cgdGhlIGludGVyYWN0aW9uIHdpdGggdGhlIGVkaXRvclxuXHQgKiB3aXRoaW5nIHRoZSBBbmd1bGFyIGV2ZW50IGxvb3AuXG5cdCAqL1xuXHRwcml2YXRlIG5nWm9uZTogTmdab25lO1xuXG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIHdoZW4gdGhlIGNvbnRlbnQgb2YgdGhlIGVkaXRvciBjaGFuZ2VzLiBQYXJ0IG9mIHRoZVxuXHQgKiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgIChodHRwczovL2FuZ3VsYXIuaW8vYXBpL2Zvcm1zL0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSBpbnRlcmZhY2UuXG5cdCAqXG5cdCAqIE5vdGU6IFVuc2V0IHVubGVzcyB0aGUgY29tcG9uZW50IHVzZXMgdGhlIGBuZ01vZGVsYC5cblx0ICovXG5cdHByaXZhdGUgY3ZhT25DaGFuZ2U/OiAoIGRhdGE6IHN0cmluZyApID0+IHZvaWQ7XG5cblx0LyoqXG5cdCAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgd2hlbiB0aGUgZWRpdG9yIGhhcyBiZWVuIGJsdXJyZWQuIFBhcnQgb2YgdGhlXG5cdCAqIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvZm9ybXMvQ29udHJvbFZhbHVlQWNjZXNzb3IpIGludGVyZmFjZS5cblx0ICpcblx0ICogTm90ZTogVW5zZXQgdW5sZXNzIHRoZSBjb21wb25lbnQgdXNlcyB0aGUgYG5nTW9kZWxgLlxuXHQgKi9cblx0cHJpdmF0ZSBjdmFPblRvdWNoZWQ/OiAoKSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZWZlcmVuY2UgdG8gdGhlIHNvdXJjZSBlbGVtZW50IHVzZWQgYnkgdGhlIGVkaXRvci5cblx0ICovXG5cdHByaXZhdGUgZWRpdG9yRWxlbWVudD86IEhUTUxFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBBIGxvY2sgZmxhZyBwcmV2ZW50aW5nIGZyb20gY2FsbGluZyB0aGUgYGN2YU9uQ2hhbmdlKClgIGR1cmluZyBzZXR0aW5nIGVkaXRvciBkYXRhLlxuXHQgKi9cblx0cHJpdmF0ZSBpc0VkaXRvclNldHRpbmdEYXRhID0gZmFsc2U7XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBuZ1pvbmU6IE5nWm9uZSApIHtcblx0XHR0aGlzLm5nWm9uZSA9IG5nWm9uZTtcblx0XHR0aGlzLmVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xuXHR9XG5cblx0Ly8gSW1wbGVtZW50aW5nIHRoZSBBZnRlclZpZXdJbml0IGludGVyZmFjZS5cblx0cHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4ge1xuXHRcdFx0dGhpcy5jcmVhdGVFZGl0b3IoKTtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBJbXBsZW1lbnRpbmcgdGhlIE9uRGVzdHJveSBpbnRlcmZhY2UuXG5cdHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAoIHRoaXMuZWRpdG9ySW5zdGFuY2UgKSB7XG5cdFx0XHR0aGlzLmVkaXRvckluc3RhbmNlLmRlc3Ryb3koKTtcblx0XHRcdHRoaXMuZWRpdG9ySW5zdGFuY2UgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8vIEltcGxlbWVudGluZyB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIChvbmx5IHdoZW4gYmluZGluZyB0byBuZ01vZGVsKS5cblx0cHVibGljIHdyaXRlVmFsdWUoIHZhbHVlOiBzdHJpbmcgfCBudWxsICk6IHZvaWQge1xuXHRcdC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aXRoIHRoZSBgbnVsbGAgdmFsdWUgd2hlbiB0aGUgZm9ybSByZXNldHMuXG5cdFx0Ly8gQSBjb21wb25lbnQncyByZXNwb25zaWJpbGl0eSBpcyB0byByZXN0b3JlIHRvIHRoZSBpbml0aWFsIHN0YXRlLlxuXHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHR2YWx1ZSA9ICcnO1xuXHRcdH1cblxuXHRcdC8vIElmIGFscmVhZHkgaW5pdGlhbGl6ZWQuXG5cdFx0aWYgKCB0aGlzLmVkaXRvckluc3RhbmNlICkge1xuXHRcdFx0Ly8gVGhlIGxvY2sgbWVjaGFuaXNtIHByZXZlbnRzIGZyb20gY2FsbGluZyBgY3ZhT25DaGFuZ2UoKWAgZHVyaW5nIGNoYW5naW5nXG5cdFx0XHQvLyB0aGUgZWRpdG9yIHN0YXRlLiBTZWUgIzEzOVxuXHRcdFx0dGhpcy5pc0VkaXRvclNldHRpbmdEYXRhID0gdHJ1ZTtcblx0XHRcdHRoaXMuZWRpdG9ySW5zdGFuY2Uuc2V0RGF0YSggdmFsdWUgKTtcblx0XHRcdHRoaXMuaXNFZGl0b3JTZXR0aW5nRGF0YSA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBJZiBub3QsIHdhaXQgZm9yIGl0IHRvIGJlIHJlYWR5OyBzdG9yZSB0aGUgZGF0YS5cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuZGF0YSA9IHZhbHVlO1xuXG5cdFx0XHQvLyBJZiB0aGUgZWRpdG9yIGVsZW1lbnQgaXMgYWxyZWFkeSBhdmFpbGFibGUsIHRoZW4gdXBkYXRlIGl0cyBjb250ZW50LlxuXHRcdFx0Ly8gSWYgdGhlIG5nTW9kZWwgaXMgdXNlZCB0aGVuIHRoZSBlZGl0b3IgZWxlbWVudCBzaG91bGQgYmUgdXBkYXRlZCBkaXJlY3RseSBoZXJlLlxuXHRcdFx0aWYgKCB0aGlzLmVkaXRvckVsZW1lbnQgKSB7XG5cdFx0XHRcdHRoaXMuZWRpdG9yRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRhdGE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gSW1wbGVtZW50aW5nIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgKG9ubHkgd2hlbiBiaW5kaW5nIHRvIG5nTW9kZWwpLlxuXHRwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZSggY2FsbGJhY2s6ICggZGF0YTogc3RyaW5nICkgPT4gdm9pZCApOiB2b2lkIHtcblx0XHR0aGlzLmN2YU9uQ2hhbmdlID0gY2FsbGJhY2s7XG5cdH1cblxuXHQvLyBJbXBsZW1lbnRpbmcgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSAob25seSB3aGVuIGJpbmRpbmcgdG8gbmdNb2RlbCkuXG5cdHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCggY2FsbGJhY2s6ICgpID0+IHZvaWQgKTogdm9pZCB7XG5cdFx0dGhpcy5jdmFPblRvdWNoZWQgPSBjYWxsYmFjaztcblx0fVxuXG5cdC8vIEltcGxlbWVudGluZyB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIChvbmx5IHdoZW4gYmluZGluZyB0byBuZ01vZGVsKS5cblx0cHVibGljIHNldERpc2FibGVkU3RhdGUoIGlzRGlzYWJsZWQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cdFx0Ly8gSWYgYWxyZWFkeSBpbml0aWFsaXplZFxuXHRcdGlmICggdGhpcy5lZGl0b3JJbnN0YW5jZSApIHtcblx0XHRcdHRoaXMuZWRpdG9ySW5zdGFuY2UuaXNSZWFkT25seSA9IGlzRGlzYWJsZWQ7XG5cdFx0fVxuXHRcdC8vIElmIG5vdCwgd2FpdCBmb3IgaXQgdG8gYmUgcmVhZHk7IHN0b3JlIHRoZSBzdGF0ZS5cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuaW5pdGlhbElzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaW5zdGFuY2UsIHNldHMgaW5pdGlhbCBlZGl0b3IgZGF0YSwgdGhlbiBpbnRlZ3JhdGVzXG5cdCAqIHRoZSBlZGl0b3Igd2l0aCB0aGUgQW5ndWxhciBjb21wb25lbnQuIFRoaXMgbWV0aG9kIGRvZXMgbm90IHVzZSB0aGUgYGVkaXRvci5zZXREYXRhKClgXG5cdCAqIGJlY2F1c2Ugb2YgdGhlIGlzc3VlIGluIHRoZSBjb2xsYWJvcmF0aW9uIG1vZGUgKCM2KS5cblx0ICovXG5cdHByaXZhdGUgY3JlYXRlRWRpdG9yKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCB0aGlzLnRhZ05hbWUgKTtcblx0XHR0aGlzLmVkaXRvckVsZW1lbnQgPSBlbGVtZW50O1xuXG5cdFx0aWYgKCB0aGlzLmRhdGEgJiYgdGhpcy5jb25maWcuaW5pdGlhbERhdGEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoICdFZGl0b3IgZGF0YSBzaG91bGQgYmUgcHJvdmlkZWQgZWl0aGVyIHVzaW5nIGBjb25maWcuaW5pdGlhbERhdGFgIG9yIGBkYXRhYCBwcm9wZXJ0aWVzLicgKTtcblx0XHR9XG5cblx0XHQvLyBNZXJnZSB0d28gcG9zc2libGUgd2F5cyBvZiBwcm92aWRpbmcgZGF0YSBpbnRvIHRoZSBgY29uZmlnLmluaXRpYWxEYXRhYCBmaWVsZC5cblx0XHRjb25zdCBjb25maWcgPSB7XG5cdFx0XHQuLi50aGlzLmNvbmZpZyxcblx0XHRcdGluaXRpYWxEYXRhOiB0aGlzLmNvbmZpZy5pbml0aWFsRGF0YSB8fCB0aGlzLmRhdGEgfHwgJydcblx0XHR9O1xuXG5cdFx0dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdHJldHVybiB0aGlzLmVkaXRvciEuY3JlYXRlKCBlbGVtZW50LCBjb25maWcgKVxuXHRcdFx0LnRoZW4oIGVkaXRvciA9PiB7XG5cdFx0XHRcdHRoaXMuZWRpdG9ySW5zdGFuY2UgPSBlZGl0b3I7XG5cblx0XHRcdFx0aWYgKCB0aGlzLmluaXRpYWxJc0Rpc2FibGVkICkge1xuXHRcdFx0XHRcdGVkaXRvci5pc1JlYWRPbmx5ID0gdGhpcy5pbml0aWFsSXNEaXNhYmxlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMubmdab25lLnJ1biggKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVhZHkuZW1pdCggZWRpdG9yICk7XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHR0aGlzLnNldFVwRWRpdG9yRXZlbnRzKCBlZGl0b3IgKTtcblx0XHRcdH0gKVxuXHRcdFx0LmNhdGNoKCAoIGVycjogRXJyb3IgKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoIGVyci5zdGFjayApO1xuXHRcdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEludGVncmF0ZXMgdGhlIGVkaXRvciB3aXRoIHRoZSBjb21wb25lbnQgYnkgYXR0YWNoaW5nIHJlbGF0ZWQgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKi9cblx0cHJpdmF0ZSBzZXRVcEVkaXRvckV2ZW50cyggZWRpdG9yOiBDS0VkaXRvcjUuRWRpdG9yICk6IHZvaWQge1xuXHRcdGNvbnN0IG1vZGVsRG9jdW1lbnQgPSBlZGl0b3IubW9kZWwuZG9jdW1lbnQ7XG5cdFx0Y29uc3Qgdmlld0RvY3VtZW50ID0gZWRpdG9yLmVkaXRpbmcudmlldy5kb2N1bWVudDtcblxuXHRcdG1vZGVsRG9jdW1lbnQub24oICdjaGFuZ2U6ZGF0YScsICggZXZ0OiBDS0VkaXRvcjUuRXZlbnRJbmZvPCdjaGFuZ2U6ZGF0YSc+ICkgPT4ge1xuXHRcdFx0dGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG5cdFx0XHRcdGlmICggdGhpcy5jdmFPbkNoYW5nZSAmJiAhdGhpcy5pc0VkaXRvclNldHRpbmdEYXRhICkge1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSBlZGl0b3IuZ2V0RGF0YSgpO1xuXG5cdFx0XHRcdFx0dGhpcy5jdmFPbkNoYW5nZSggZGF0YSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jaGFuZ2UuZW1pdCggeyBldmVudDogZXZ0LCBlZGl0b3IgfSApO1xuXHRcdFx0fSApO1xuXHRcdH0gKTtcblxuXHRcdHZpZXdEb2N1bWVudC5vbiggJ2ZvY3VzJywgKCBldnQ6IENLRWRpdG9yNS5FdmVudEluZm88J2ZvY3VzJz4gKSA9PiB7XG5cdFx0XHR0aGlzLm5nWm9uZS5ydW4oICgpID0+IHtcblx0XHRcdFx0dGhpcy5mb2N1cy5lbWl0KCB7IGV2ZW50OiBldnQsIGVkaXRvciB9ICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXG5cdFx0dmlld0RvY3VtZW50Lm9uKCAnYmx1cicsICggZXZ0OiBDS0VkaXRvcjUuRXZlbnRJbmZvPCdibHVyJz4gKSA9PiB7XG5cdFx0XHR0aGlzLm5nWm9uZS5ydW4oICgpID0+IHtcblx0XHRcdFx0aWYgKCB0aGlzLmN2YU9uVG91Y2hlZCApIHtcblx0XHRcdFx0XHR0aGlzLmN2YU9uVG91Y2hlZCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5ibHVyLmVtaXQoIHsgZXZlbnQ6IGV2dCwgZWRpdG9yIH0gKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCbHVyRXZlbnQge1xuXHRldmVudDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnYmx1cic+O1xuXHRlZGl0b3I6IENLRWRpdG9yNS5FZGl0b3I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9jdXNFdmVudCB7XG5cdGV2ZW50OiBDS0VkaXRvcjUuRXZlbnRJbmZvPCdmb2N1cyc+O1xuXHRlZGl0b3I6IENLRWRpdG9yNS5FZGl0b3I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlRXZlbnQge1xuXHRldmVudDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnY2hhbmdlOmRhdGEnPjtcblx0ZWRpdG9yOiBDS0VkaXRvcjUuRWRpdG9yO1xufVxuIl19