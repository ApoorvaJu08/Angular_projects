/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
import { Component, Input, Output, NgZone, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class CKEditorComponent {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     */
    constructor(elementRef, ngZone) {
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
    /**
     * When set `true`, the editor becomes read-only.
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
     * to learn more.
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) {
        this.setDisabledState(isDisabled);
    }
    /**
     * @return {?}
     */
    get disabled() {
        if (this.editorInstance) {
            return this.editorInstance.isReadOnly;
        }
        return this.initialIsDisabled;
    }
    // Implementing the AfterViewInit interface.
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.createEditor();
        }));
    }
    // Implementing the OnDestroy interface.
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.editorInstance) {
            this.editorInstance.destroy();
            this.editorInstance = null;
        }
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    registerOnChange(callback) {
        this.cvaOnChange = callback;
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    registerOnTouched(callback) {
        this.cvaOnTouched = callback;
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        // If already initialized
        if (this.editorInstance) {
            this.editorInstance.isReadOnly = isDisabled;
        }
        // If not, wait for it to be ready; store the state.
        else {
            this.initialIsDisabled = isDisabled;
        }
    }
    /**
     * Creates the editor instance, sets initial editor data, then integrates
     * the editor with the Angular component. This method does not use the `editor.setData()`
     * because of the issue in the collaboration mode (#6).
     * @private
     * @return {?}
     */
    createEditor() {
        /** @type {?} */
        const element = document.createElement(this.tagName);
        this.editorElement = element;
        if (this.data && this.config.initialData) {
            throw new Error('Editor data should be provided either using `config.initialData` or `data` properties.');
        }
        // Merge two possible ways of providing data into the `config.initialData` field.
        /** @type {?} */
        const config = Object.assign({}, this.config, { initialData: this.config.initialData || this.data || '' });
        this.elementRef.nativeElement.appendChild(element);
        return (/** @type {?} */ (this.editor)).create(element, config)
            .then((/**
         * @param {?} editor
         * @return {?}
         */
        editor => {
            this.editorInstance = editor;
            if (this.initialIsDisabled) {
                editor.isReadOnly = this.initialIsDisabled;
            }
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.ready.emit(editor);
            }));
            this.setUpEditorEvents(editor);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            console.error(err.stack);
        }));
    }
    /**
     * Integrates the editor with the component by attaching related event listeners.
     * @private
     * @param {?} editor
     * @return {?}
     */
    setUpEditorEvents(editor) {
        /** @type {?} */
        const modelDocument = editor.model.document;
        /** @type {?} */
        const viewDocument = editor.editing.view.document;
        modelDocument.on('change:data', (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                if (this.cvaOnChange && !this.isEditorSettingData) {
                    /** @type {?} */
                    const data = editor.getData();
                    this.cvaOnChange(data);
                }
                this.change.emit({ event: evt, editor });
            }));
        }));
        viewDocument.on('focus', (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.focus.emit({ event: evt, editor });
            }));
        }));
        viewDocument.on('blur', (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                if (this.cvaOnTouched) {
                    this.cvaOnTouched();
                }
                this.blur.emit({ event: evt, editor });
            }));
        }));
    }
}
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
                        () => CKEditorComponent)),
                        multi: true,
                    }
                ]
            }] }
];
/** @nocollapse */
CKEditorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNrZWRpdG9yL2NrZWRpdG9yNS1hbmd1bGFyLyIsInNvdXJjZXMiOlsiY2tlZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUVWLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBRU4saUJBQWlCLEVBQ2pCLE1BQU0sZ0JBQWdCLENBQUM7QUFrQnhCLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBd0g3QixZQUFvQixVQUFzQixFQUFFLE1BQWM7Ozs7OztRQXZHMUMsV0FBTSxHQUFxQixFQUFFLENBQUM7Ozs7O1FBTTlCLFNBQUksR0FBRyxFQUFFLENBQUM7Ozs7OztRQU9WLFlBQU8sR0FBRyxLQUFLLENBQUM7Ozs7OztRQXdCZixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7Ozs7OztRQU83QyxXQUFNLEdBQThCLElBQUksWUFBWSxFQUFlLENBQUM7Ozs7OztRQU9wRSxTQUFJLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7Ozs7OztRQU85RCxVQUFLLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7Ozs7UUFLM0UsbUJBQWMsR0FBNEIsSUFBSSxDQUFDOzs7OztRQU05QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFnQzFCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUduQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUM5QixDQUFDOzs7Ozs7OztJQXRGRCxJQUFvQixRQUFRLENBQUUsVUFBbUI7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFFLFVBQVUsQ0FBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCxJQUFXLFFBQVE7UUFDbEIsSUFBSyxJQUFJLENBQUMsY0FBYyxFQUFHO1lBQzFCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7U0FDdEM7UUFFRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQixDQUFDOzs7OztJQStFTSxlQUFlO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCOzs7UUFBRSxHQUFHLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBRSxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFHTSxXQUFXO1FBQ2pCLElBQUssSUFBSSxDQUFDLGNBQWMsRUFBRztZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0lBQ0YsQ0FBQzs7Ozs7O0lBR00sVUFBVSxDQUFFLEtBQW9CO1FBQ3RDLG9FQUFvRTtRQUNwRSxtRUFBbUU7UUFDbkUsSUFBSyxLQUFLLEtBQUssSUFBSSxFQUFHO1lBQ3JCLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDWDtRQUVELDBCQUEwQjtRQUMxQixJQUFLLElBQUksQ0FBQyxjQUFjLEVBQUc7WUFDMUIsMkVBQTJFO1lBQzNFLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDakM7UUFDRCxtREFBbUQ7YUFDOUM7WUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUVsQix1RUFBdUU7WUFDdkUsa0ZBQWtGO1lBQ2xGLElBQUssSUFBSSxDQUFDLGFBQWEsRUFBRztnQkFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN6QztTQUNEO0lBQ0YsQ0FBQzs7Ozs7O0lBR00sZ0JBQWdCLENBQUUsUUFBa0M7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBR00saUJBQWlCLENBQUUsUUFBb0I7UUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBR00sZ0JBQWdCLENBQUUsVUFBbUI7UUFDM0MseUJBQXlCO1FBQ3pCLElBQUssSUFBSSxDQUFDLGNBQWMsRUFBRztZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7U0FDNUM7UUFDRCxvREFBb0Q7YUFDL0M7WUFDSixJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1NBQ3BDO0lBQ0YsQ0FBQzs7Ozs7Ozs7SUFPTyxZQUFZOztjQUNiLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUU7UUFDdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7UUFFN0IsSUFBSyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFHO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUUsd0ZBQXdGLENBQUUsQ0FBQztTQUM1Rzs7O2NBR0ssTUFBTSxxQkFDUixJQUFJLENBQUMsTUFBTSxJQUNkLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsR0FDdkQ7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUUsT0FBTyxDQUFFLENBQUM7UUFFckQsT0FBTyxtQkFBQSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsTUFBTSxDQUFFLE9BQU8sRUFBRSxNQUFNLENBQUU7YUFDM0MsSUFBSTs7OztRQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7WUFFN0IsSUFBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUc7Z0JBQzdCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2FBQzNDO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7WUFBRSxHQUFHLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFFLE1BQU0sQ0FBRSxDQUFDO1lBQzNCLENBQUMsRUFBRSxDQUFDO1lBRUosSUFBSSxDQUFDLGlCQUFpQixDQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQ2xDLENBQUMsRUFBRTthQUNGLEtBQUs7Ozs7UUFBRSxDQUFFLEdBQVUsRUFBRyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBQzVCLENBQUMsRUFBRSxDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQUtPLGlCQUFpQixDQUFFLE1BQXdCOztjQUM1QyxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFROztjQUNyQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUVqRCxhQUFhLENBQUMsRUFBRSxDQUFFLGFBQWE7Ozs7UUFBRSxDQUFFLEdBQXVDLEVBQUcsRUFBRTtZQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7OztZQUFFLEdBQUcsRUFBRTtnQkFDckIsSUFBSyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFHOzswQkFDOUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFFLENBQUM7aUJBQ3pCO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBRSxDQUFDO1lBQzVDLENBQUMsRUFBRSxDQUFDO1FBQ0wsQ0FBQyxFQUFFLENBQUM7UUFFSixZQUFZLENBQUMsRUFBRSxDQUFFLE9BQU87Ozs7UUFBRSxDQUFFLEdBQWlDLEVBQUcsRUFBRTtZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7OztZQUFFLEdBQUcsRUFBRTtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFFLENBQUM7WUFDM0MsQ0FBQyxFQUFFLENBQUM7UUFDTCxDQUFDLEVBQUUsQ0FBQztRQUVKLFlBQVksQ0FBQyxFQUFFLENBQUUsTUFBTTs7OztRQUFFLENBQUUsR0FBZ0MsRUFBRyxFQUFFO1lBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7O1lBQUUsR0FBRyxFQUFFO2dCQUNyQixJQUFLLElBQUksQ0FBQyxZQUFZLEVBQUc7b0JBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDcEI7Z0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFFLENBQUM7WUFDMUMsQ0FBQyxFQUFFLENBQUM7UUFDTCxDQUFDLEVBQUUsQ0FBQztJQUNMLENBQUM7OztZQXRSRCxTQUFTLFNBQUU7Z0JBQ1gsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSw2QkFBNkI7O2dCQUd2QyxTQUFTLEVBQUU7b0JBQ1Y7d0JBQ0MsT0FBTyxFQUFFLGlCQUFpQjs7d0JBRTFCLFdBQVcsRUFBRSxVQUFVOzs7d0JBQUUsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7d0JBQ2xELEtBQUssRUFBRSxJQUFJO3FCQUNYO2lCQUNEO2FBQ0Q7Ozs7WUF2QkEsVUFBVTtZQUpWLE1BQU07OztxQkFzQ0wsS0FBSztxQkFPTCxLQUFLO21CQU1MLEtBQUs7c0JBT0wsS0FBSzt1QkFPTCxLQUFLO29CQWlCTCxNQUFNO3FCQU9OLE1BQU07bUJBT04sTUFBTTtvQkFPTixNQUFNOzs7Ozs7OztJQXZFUCx1Q0FBNkM7Ozs7OztJQU03QyxtQ0FBcUQ7Ozs7Ozs7SUFPckQsbUNBQThDOzs7Ozs7SUFNOUMsaUNBQTBCOzs7Ozs7O0lBTzFCLG9DQUFnQzs7Ozs7OztJQXdCaEMsa0NBQThEOzs7Ozs7O0lBTzlELG1DQUFxRjs7Ozs7OztJQU9yRixpQ0FBK0U7Ozs7Ozs7SUFPL0Usa0NBQWtGOzs7OztJQUtsRiwyQ0FBc0Q7Ozs7Ozs7SUFNdEQsOENBQWtDOzs7Ozs7O0lBTWxDLG1DQUF1Qjs7Ozs7Ozs7O0lBUXZCLHdDQUErQzs7Ozs7Ozs7O0lBUS9DLHlDQUFrQzs7Ozs7O0lBS2xDLDBDQUFvQzs7Ozs7O0lBS3BDLGdEQUFvQzs7Ozs7QUFxSnJDLCtCQUdDOzs7SUFGQSwwQkFBbUM7O0lBQ25DLDJCQUF5Qjs7Ozs7QUFHMUIsZ0NBR0M7OztJQUZBLDJCQUFvQzs7SUFDcEMsNEJBQXlCOzs7OztBQUcxQixpQ0FHQzs7O0lBRkEsNEJBQTBDOztJQUMxQyw2QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAoYykgMjAwMy0yMDE5LCBDS1NvdXJjZSAtIEZyZWRlcmljbyBLbmFiYmVuLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogRm9yIGxpY2Vuc2luZywgc2VlIExJQ0VOU0UubWQuXG4gKi9cblxuaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHROZ1pvbmUsXG5cdEV2ZW50RW1pdHRlcixcblx0Zm9yd2FyZFJlZixcblx0QWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LFxuXHRFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuXHRDb250cm9sVmFsdWVBY2Nlc3Nvcixcblx0TkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDS0VkaXRvcjUgfSBmcm9tICcuL2NrZWRpdG9yJztcblxuQENvbXBvbmVudCgge1xuXHRzZWxlY3RvcjogJ2NrZWRpdG9yJyxcblx0dGVtcGxhdGU6ICc8bmctdGVtcGxhdGU+PC9uZy10ZW1wbGF0ZT4nLFxuXG5cdC8vIEludGVncmF0aW9uIHdpdGggQGFuZ3VsYXIvZm9ybXMuXG5cdHByb3ZpZGVyczogW1xuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxuXHRcdFx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoICgpID0+IENLRWRpdG9yQ29tcG9uZW50ICksXG5cdFx0XHRtdWx0aTogdHJ1ZSxcblx0XHR9XG5cdF1cbn0gKVxuZXhwb3J0IGNsYXNzIENLRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cdC8qKlxuXHQgKiBUaGUgcmVmZXJlbmNlIHRvIHRoZSBET00gZWxlbWVudCBjcmVhdGVkIGJ5IHRoZSBjb21wb25lbnQuXG5cdCAqL1xuXHRwcml2YXRlIGVsZW1lbnRSZWYhOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBlZGl0b3IgdG8gYmUgdXNlZCBmb3IgdGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQuXG5cdCAqIEl0IGNhbiBiZSBlLmcuIHRoZSBgQ2xhc3NpY0VkaXRvckJ1aWxkYCwgYElubGluZUVkaXRvckJ1aWxkYCBvciBzb21lIGN1c3RvbSBlZGl0b3IuXG5cdCAqL1xuXHRASW5wdXQoKSBwdWJsaWMgZWRpdG9yPzogQ0tFZGl0b3I1LkVkaXRvckNvbnN0cnVjdG9yO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29uZmlndXJhdGlvbiBvZiB0aGUgZWRpdG9yLlxuXHQgKiBTZWUgaHR0cHM6Ly9ja2VkaXRvci5jb20vZG9jcy9ja2VkaXRvcjUvbGF0ZXN0L2FwaS9tb2R1bGVfY29yZV9lZGl0b3JfZWRpdG9yY29uZmlnLUVkaXRvckNvbmZpZy5odG1sXG5cdCAqIHRvIGxlYXJuIG1vcmUuXG5cdCAqL1xuXHRASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBDS0VkaXRvcjUuQ29uZmlnID0ge307XG5cblx0LyoqXG5cdCAqIFRoZSBpbml0aWFsIGRhdGEgb2YgdGhlIGVkaXRvci4gVXNlZnVsIHdoZW4gbm90IHVzaW5nIHRoZSBuZ01vZGVsLlxuXHQgKiBTZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9mb3Jtcy9OZ01vZGVsIHRvIGxlYXJuIG1vcmUuXG5cdCAqL1xuXHRASW5wdXQoKSBwdWJsaWMgZGF0YSA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUYWcgbmFtZSBvZiB0aGUgZWRpdG9yIGNvbXBvbmVudC5cblx0ICpcblx0ICogVGhlIGRlZmF1bHQgdGFnIGlzICdkaXYnLlxuXHQgKi9cblx0QElucHV0KCkgcHVibGljIHRhZ05hbWUgPSAnZGl2JztcblxuXHQvKipcblx0ICogV2hlbiBzZXQgYHRydWVgLCB0aGUgZWRpdG9yIGJlY29tZXMgcmVhZC1vbmx5LlxuXHQgKiBTZWUgaHR0cHM6Ly9ja2VkaXRvci5jb20vZG9jcy9ja2VkaXRvcjUvbGF0ZXN0L2FwaS9tb2R1bGVfY29yZV9lZGl0b3JfZWRpdG9yLUVkaXRvci5odG1sI21lbWJlci1pc1JlYWRPbmx5XG5cdCAqIHRvIGxlYXJuIG1vcmUuXG5cdCAqL1xuXHRASW5wdXQoKSBwdWJsaWMgc2V0IGRpc2FibGVkKCBpc0Rpc2FibGVkOiBib29sZWFuICkge1xuXHRcdHRoaXMuc2V0RGlzYWJsZWRTdGF0ZSggaXNEaXNhYmxlZCApO1xuXHR9XG5cblx0cHVibGljIGdldCBkaXNhYmxlZCgpIHtcblx0XHRpZiAoIHRoaXMuZWRpdG9ySW5zdGFuY2UgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lZGl0b3JJbnN0YW5jZS5pc1JlYWRPbmx5O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmluaXRpYWxJc0Rpc2FibGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmVzIHdoZW4gdGhlIGVkaXRvciBpcyByZWFkeS4gSXQgY29ycmVzcG9uZHMgd2l0aCB0aGUgYGVkaXRvciNyZWFkeWBcblx0ICogaHR0cHM6Ly9ja2VkaXRvci5jb20vZG9jcy9ja2VkaXRvcjUvbGF0ZXN0L2FwaS9tb2R1bGVfY29yZV9lZGl0b3JfZWRpdG9yLUVkaXRvci5odG1sI2V2ZW50LXJlYWR5XG5cdCAqIGV2ZW50LlxuXHQgKi9cblx0QE91dHB1dCgpIHB1YmxpYyByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8Q0tFZGl0b3I1LkVkaXRvcj4oKTtcblxuXHQvKipcblx0ICogRmlyZXMgd2hlbiB0aGUgY29udGVudCBvZiB0aGUgZWRpdG9yIGhhcyBjaGFuZ2VkLiBJdCBjb3JyZXNwb25kcyB3aXRoIHRoZSBgZWRpdG9yLm1vZGVsLmRvY3VtZW50I2NoYW5nZWBcblx0ICogaHR0cHM6Ly9ja2VkaXRvci5jb20vZG9jcy9ja2VkaXRvcjUvbGF0ZXN0L2FwaS9tb2R1bGVfZW5naW5lX21vZGVsX2RvY3VtZW50LURvY3VtZW50Lmh0bWwjZXZlbnQtY2hhbmdlXG5cdCAqIGV2ZW50LlxuXHQgKi9cblx0QE91dHB1dCgpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPENoYW5nZUV2ZW50PigpO1xuXG5cdC8qKlxuXHQgKiBGaXJlcyB3aGVuIHRoZSBlZGl0aW5nIHZpZXcgb2YgdGhlIGVkaXRvciBpcyBibHVycmVkLiBJdCBjb3JyZXNwb25kcyB3aXRoIHRoZSBgZWRpdG9yLmVkaXRpbmcudmlldy5kb2N1bWVudCNibHVyYFxuXHQgKiBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9lbmdpbmVfdmlld19kb2N1bWVudC1Eb2N1bWVudC5odG1sI2V2ZW50LWV2ZW50OmJsdXJcblx0ICogZXZlbnQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgcHVibGljIGJsdXI6IEV2ZW50RW1pdHRlcjxCbHVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCbHVyRXZlbnQ+KCk7XG5cblx0LyoqXG5cdCAqIEZpcmVzIHdoZW4gdGhlIGVkaXRpbmcgdmlldyBvZiB0aGUgZWRpdG9yIGlzIGZvY3VzZWQuIEl0IGNvcnJlc3BvbmRzIHdpdGggdGhlIGBlZGl0b3IuZWRpdGluZy52aWV3LmRvY3VtZW50I2ZvY3VzYFxuXHQgKiBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9lbmdpbmVfdmlld19kb2N1bWVudC1Eb2N1bWVudC5odG1sI2V2ZW50LWV2ZW50OmZvY3VzXG5cdCAqIGV2ZW50LlxuXHQgKi9cblx0QE91dHB1dCgpIHB1YmxpYyBmb2N1czogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIGVkaXRvciBjcmVhdGVkIGJ5IHRoaXMgY29tcG9uZW50LlxuXHQgKi9cblx0cHVibGljIGVkaXRvckluc3RhbmNlOiBDS0VkaXRvcjUuRWRpdG9yIHwgbnVsbCA9IG51bGw7XG5cblx0LyoqXG5cdCAqIElmIHRoZSBjb21wb25lbnQgaXMgcmVhZOKAk29ubHkgYmVmb3JlIHRoZSBlZGl0b3IgaW5zdGFuY2UgaXMgY3JlYXRlZCwgaXQgcmVtZW1iZXJzIHRoYXQgc3RhdGUsXG5cdCAqIHNvIHRoZSBlZGl0b3IgY2FuIGJlY29tZSByZWFk4oCTb25seSBvbmNlIGl0IGlzIHJlYWR5LlxuXHQgKi9cblx0cHJpdmF0ZSBpbml0aWFsSXNEaXNhYmxlZCA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBBbiBpbnN0YW5jZSBvZiBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvcmUvTmdab25lIHRvIGFsbG93IHRoZSBpbnRlcmFjdGlvbiB3aXRoIHRoZSBlZGl0b3Jcblx0ICogd2l0aGluZyB0aGUgQW5ndWxhciBldmVudCBsb29wLlxuXHQgKi9cblx0cHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZTtcblxuXHQvKipcblx0ICogQSBjYWxsYmFjayBleGVjdXRlZCB3aGVuIHRoZSBjb250ZW50IG9mIHRoZSBlZGl0b3IgY2hhbmdlcy4gUGFydCBvZiB0aGVcblx0ICogYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCAoaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9mb3Jtcy9Db250cm9sVmFsdWVBY2Nlc3NvcikgaW50ZXJmYWNlLlxuXHQgKlxuXHQgKiBOb3RlOiBVbnNldCB1bmxlc3MgdGhlIGNvbXBvbmVudCB1c2VzIHRoZSBgbmdNb2RlbGAuXG5cdCAqL1xuXHRwcml2YXRlIGN2YU9uQ2hhbmdlPzogKCBkYXRhOiBzdHJpbmcgKSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIHdoZW4gdGhlIGVkaXRvciBoYXMgYmVlbiBibHVycmVkLiBQYXJ0IG9mIHRoZVxuXHQgKiBgQ29udHJvbFZhbHVlQWNjZXNzb3JgIChodHRwczovL2FuZ3VsYXIuaW8vYXBpL2Zvcm1zL0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSBpbnRlcmZhY2UuXG5cdCAqXG5cdCAqIE5vdGU6IFVuc2V0IHVubGVzcyB0aGUgY29tcG9uZW50IHVzZXMgdGhlIGBuZ01vZGVsYC5cblx0ICovXG5cdHByaXZhdGUgY3ZhT25Ub3VjaGVkPzogKCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogUmVmZXJlbmNlIHRvIHRoZSBzb3VyY2UgZWxlbWVudCB1c2VkIGJ5IHRoZSBlZGl0b3IuXG5cdCAqL1xuXHRwcml2YXRlIGVkaXRvckVsZW1lbnQ/OiBIVE1MRWxlbWVudDtcblxuXHQvKipcblx0ICogQSBsb2NrIGZsYWcgcHJldmVudGluZyBmcm9tIGNhbGxpbmcgdGhlIGBjdmFPbkNoYW5nZSgpYCBkdXJpbmcgc2V0dGluZyBlZGl0b3IgZGF0YS5cblx0ICovXG5cdHByaXZhdGUgaXNFZGl0b3JTZXR0aW5nRGF0YSA9IGZhbHNlO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvciggZWxlbWVudFJlZjogRWxlbWVudFJlZiwgbmdab25lOiBOZ1pvbmUgKSB7XG5cdFx0dGhpcy5uZ1pvbmUgPSBuZ1pvbmU7XG5cdFx0dGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcblx0fVxuXG5cdC8vIEltcGxlbWVudGluZyB0aGUgQWZ0ZXJWaWV3SW5pdCBpbnRlcmZhY2UuXG5cdHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoICgpID0+IHtcblx0XHRcdHRoaXMuY3JlYXRlRWRpdG9yKCk7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gSW1wbGVtZW50aW5nIHRoZSBPbkRlc3Ryb3kgaW50ZXJmYWNlLlxuXHRwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKCB0aGlzLmVkaXRvckluc3RhbmNlICkge1xuXHRcdFx0dGhpcy5lZGl0b3JJbnN0YW5jZS5kZXN0cm95KCk7XG5cdFx0XHR0aGlzLmVkaXRvckluc3RhbmNlID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvLyBJbXBsZW1lbnRpbmcgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSAob25seSB3aGVuIGJpbmRpbmcgdG8gbmdNb2RlbCkuXG5cdHB1YmxpYyB3cml0ZVZhbHVlKCB2YWx1ZTogc3RyaW5nIHwgbnVsbCApOiB2b2lkIHtcblx0XHQvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2l0aCB0aGUgYG51bGxgIHZhbHVlIHdoZW4gdGhlIGZvcm0gcmVzZXRzLlxuXHRcdC8vIEEgY29tcG9uZW50J3MgcmVzcG9uc2liaWxpdHkgaXMgdG8gcmVzdG9yZSB0byB0aGUgaW5pdGlhbCBzdGF0ZS5cblx0XHRpZiAoIHZhbHVlID09PSBudWxsICkge1xuXHRcdFx0dmFsdWUgPSAnJztcblx0XHR9XG5cblx0XHQvLyBJZiBhbHJlYWR5IGluaXRpYWxpemVkLlxuXHRcdGlmICggdGhpcy5lZGl0b3JJbnN0YW5jZSApIHtcblx0XHRcdC8vIFRoZSBsb2NrIG1lY2hhbmlzbSBwcmV2ZW50cyBmcm9tIGNhbGxpbmcgYGN2YU9uQ2hhbmdlKClgIGR1cmluZyBjaGFuZ2luZ1xuXHRcdFx0Ly8gdGhlIGVkaXRvciBzdGF0ZS4gU2VlICMxMzlcblx0XHRcdHRoaXMuaXNFZGl0b3JTZXR0aW5nRGF0YSA9IHRydWU7XG5cdFx0XHR0aGlzLmVkaXRvckluc3RhbmNlLnNldERhdGEoIHZhbHVlICk7XG5cdFx0XHR0aGlzLmlzRWRpdG9yU2V0dGluZ0RhdGEgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gSWYgbm90LCB3YWl0IGZvciBpdCB0byBiZSByZWFkeTsgc3RvcmUgdGhlIGRhdGEuXG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmRhdGEgPSB2YWx1ZTtcblxuXHRcdFx0Ly8gSWYgdGhlIGVkaXRvciBlbGVtZW50IGlzIGFscmVhZHkgYXZhaWxhYmxlLCB0aGVuIHVwZGF0ZSBpdHMgY29udGVudC5cblx0XHRcdC8vIElmIHRoZSBuZ01vZGVsIGlzIHVzZWQgdGhlbiB0aGUgZWRpdG9yIGVsZW1lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgZGlyZWN0bHkgaGVyZS5cblx0XHRcdGlmICggdGhpcy5lZGl0b3JFbGVtZW50ICkge1xuXHRcdFx0XHR0aGlzLmVkaXRvckVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5kYXRhO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEltcGxlbWVudGluZyB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIChvbmx5IHdoZW4gYmluZGluZyB0byBuZ01vZGVsKS5cblx0cHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoIGNhbGxiYWNrOiAoIGRhdGE6IHN0cmluZyApID0+IHZvaWQgKTogdm9pZCB7XG5cdFx0dGhpcy5jdmFPbkNoYW5nZSA9IGNhbGxiYWNrO1xuXHR9XG5cblx0Ly8gSW1wbGVtZW50aW5nIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgKG9ubHkgd2hlbiBiaW5kaW5nIHRvIG5nTW9kZWwpLlxuXHRwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoIGNhbGxiYWNrOiAoKSA9PiB2b2lkICk6IHZvaWQge1xuXHRcdHRoaXMuY3ZhT25Ub3VjaGVkID0gY2FsbGJhY2s7XG5cdH1cblxuXHQvLyBJbXBsZW1lbnRpbmcgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSAob25seSB3aGVuIGJpbmRpbmcgdG8gbmdNb2RlbCkuXG5cdHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKCBpc0Rpc2FibGVkOiBib29sZWFuICk6IHZvaWQge1xuXHRcdC8vIElmIGFscmVhZHkgaW5pdGlhbGl6ZWRcblx0XHRpZiAoIHRoaXMuZWRpdG9ySW5zdGFuY2UgKSB7XG5cdFx0XHR0aGlzLmVkaXRvckluc3RhbmNlLmlzUmVhZE9ubHkgPSBpc0Rpc2FibGVkO1xuXHRcdH1cblx0XHQvLyBJZiBub3QsIHdhaXQgZm9yIGl0IHRvIGJlIHJlYWR5OyBzdG9yZSB0aGUgc3RhdGUuXG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmluaXRpYWxJc0Rpc2FibGVkID0gaXNEaXNhYmxlZDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGluc3RhbmNlLCBzZXRzIGluaXRpYWwgZWRpdG9yIGRhdGEsIHRoZW4gaW50ZWdyYXRlc1xuXHQgKiB0aGUgZWRpdG9yIHdpdGggdGhlIEFuZ3VsYXIgY29tcG9uZW50LiBUaGlzIG1ldGhvZCBkb2VzIG5vdCB1c2UgdGhlIGBlZGl0b3Iuc2V0RGF0YSgpYFxuXHQgKiBiZWNhdXNlIG9mIHRoZSBpc3N1ZSBpbiB0aGUgY29sbGFib3JhdGlvbiBtb2RlICgjNikuXG5cdCAqL1xuXHRwcml2YXRlIGNyZWF0ZUVkaXRvcigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggdGhpcy50YWdOYW1lICk7XG5cdFx0dGhpcy5lZGl0b3JFbGVtZW50ID0gZWxlbWVudDtcblxuXHRcdGlmICggdGhpcy5kYXRhICYmIHRoaXMuY29uZmlnLmluaXRpYWxEYXRhICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCAnRWRpdG9yIGRhdGEgc2hvdWxkIGJlIHByb3ZpZGVkIGVpdGhlciB1c2luZyBgY29uZmlnLmluaXRpYWxEYXRhYCBvciBgZGF0YWAgcHJvcGVydGllcy4nICk7XG5cdFx0fVxuXG5cdFx0Ly8gTWVyZ2UgdHdvIHBvc3NpYmxlIHdheXMgb2YgcHJvdmlkaW5nIGRhdGEgaW50byB0aGUgYGNvbmZpZy5pbml0aWFsRGF0YWAgZmllbGQuXG5cdFx0Y29uc3QgY29uZmlnID0ge1xuXHRcdFx0Li4udGhpcy5jb25maWcsXG5cdFx0XHRpbml0aWFsRGF0YTogdGhpcy5jb25maWcuaW5pdGlhbERhdGEgfHwgdGhpcy5kYXRhIHx8ICcnXG5cdFx0fTtcblxuXHRcdHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lZGl0b3IhLmNyZWF0ZSggZWxlbWVudCwgY29uZmlnIClcblx0XHRcdC50aGVuKCBlZGl0b3IgPT4ge1xuXHRcdFx0XHR0aGlzLmVkaXRvckluc3RhbmNlID0gZWRpdG9yO1xuXG5cdFx0XHRcdGlmICggdGhpcy5pbml0aWFsSXNEaXNhYmxlZCApIHtcblx0XHRcdFx0XHRlZGl0b3IuaXNSZWFkT25seSA9IHRoaXMuaW5pdGlhbElzRGlzYWJsZWQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLm5nWm9uZS5ydW4oICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJlYWR5LmVtaXQoIGVkaXRvciApO1xuXHRcdFx0XHR9ICk7XG5cblx0XHRcdFx0dGhpcy5zZXRVcEVkaXRvckV2ZW50cyggZWRpdG9yICk7XG5cdFx0XHR9IClcblx0XHRcdC5jYXRjaCggKCBlcnI6IEVycm9yICkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCBlcnIuc3RhY2sgKTtcblx0XHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnRlZ3JhdGVzIHRoZSBlZGl0b3Igd2l0aCB0aGUgY29tcG9uZW50IGJ5IGF0dGFjaGluZyByZWxhdGVkIGV2ZW50IGxpc3RlbmVycy5cblx0ICovXG5cdHByaXZhdGUgc2V0VXBFZGl0b3JFdmVudHMoIGVkaXRvcjogQ0tFZGl0b3I1LkVkaXRvciApOiB2b2lkIHtcblx0XHRjb25zdCBtb2RlbERvY3VtZW50ID0gZWRpdG9yLm1vZGVsLmRvY3VtZW50O1xuXHRcdGNvbnN0IHZpZXdEb2N1bWVudCA9IGVkaXRvci5lZGl0aW5nLnZpZXcuZG9jdW1lbnQ7XG5cblx0XHRtb2RlbERvY3VtZW50Lm9uKCAnY2hhbmdlOmRhdGEnLCAoIGV2dDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnY2hhbmdlOmRhdGEnPiApID0+IHtcblx0XHRcdHRoaXMubmdab25lLnJ1biggKCkgPT4ge1xuXHRcdFx0XHRpZiAoIHRoaXMuY3ZhT25DaGFuZ2UgJiYgIXRoaXMuaXNFZGl0b3JTZXR0aW5nRGF0YSApIHtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gZWRpdG9yLmdldERhdGEoKTtcblxuXHRcdFx0XHRcdHRoaXMuY3ZhT25DaGFuZ2UoIGRhdGEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuY2hhbmdlLmVtaXQoIHsgZXZlbnQ6IGV2dCwgZWRpdG9yIH0gKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cblx0XHR2aWV3RG9jdW1lbnQub24oICdmb2N1cycsICggZXZ0OiBDS0VkaXRvcjUuRXZlbnRJbmZvPCdmb2N1cyc+ICkgPT4ge1xuXHRcdFx0dGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZm9jdXMuZW1pdCggeyBldmVudDogZXZ0LCBlZGl0b3IgfSApO1xuXHRcdFx0fSApO1xuXHRcdH0gKTtcblxuXHRcdHZpZXdEb2N1bWVudC5vbiggJ2JsdXInLCAoIGV2dDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnYmx1cic+ICkgPT4ge1xuXHRcdFx0dGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG5cdFx0XHRcdGlmICggdGhpcy5jdmFPblRvdWNoZWQgKSB7XG5cdFx0XHRcdFx0dGhpcy5jdmFPblRvdWNoZWQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuYmx1ci5lbWl0KCB7IGV2ZW50OiBldnQsIGVkaXRvciB9ICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmx1ckV2ZW50IHtcblx0ZXZlbnQ6IENLRWRpdG9yNS5FdmVudEluZm88J2JsdXInPjtcblx0ZWRpdG9yOiBDS0VkaXRvcjUuRWRpdG9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvY3VzRXZlbnQge1xuXHRldmVudDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnZm9jdXMnPjtcblx0ZWRpdG9yOiBDS0VkaXRvcjUuRWRpdG9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUV2ZW50IHtcblx0ZXZlbnQ6IENLRWRpdG9yNS5FdmVudEluZm88J2NoYW5nZTpkYXRhJz47XG5cdGVkaXRvcjogQ0tFZGl0b3I1LkVkaXRvcjtcbn1cbiJdfQ==