import * as tslib_1 from "tslib";
import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ListItem } from "./multiselect.model";
import { ListFilterPipe } from "./list-filter.pipe";
export var DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
var noop = function () { };
var ɵ0 = noop;
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(cdr, listFilterPipe) {
        this.cdr = cdr;
        this.listFilterPipe = listFilterPipe;
        this._data = [];
        this.selectedItems = [];
        this.isDropdownOpen = true;
        this._placeholder = "Select";
        this._sourceDataType = null; // to keep note of the source data type. could be array of string/number/object
        this._sourceDataFields = []; // store source data fields names
        this.filter = new ListItem(this.data);
        this.defaultSettings = {
            singleSelection: false,
            idField: "id",
            textField: "text",
            disabledField: "isDisabled",
            enableCheckAll: true,
            selectAllText: "Select All",
            unSelectAllText: "UnSelect All",
            allowSearchFilter: false,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 999999999999,
            searchPlaceholderText: "Search",
            noDataAvailablePlaceholderText: "No data available",
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: true,
            defaultOpen: false,
            allowRemoteDataSearch: false,
            showSelectedList: true,
            selectedListTitle: 'selected',
            selectionListTitle: 'To be'
        };
        this.disabled = false;
        this.onFilterChange = new EventEmitter();
        this.onDropDownClose = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        set: function (value) {
            if (value) {
                this._placeholder = value;
            }
            else {
                this._placeholder = "Select";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "settings", {
        set: function (value) {
            if (value) {
                this._settings = Object.assign(this.defaultSettings, value);
            }
            else {
                this._settings = Object.assign(this.defaultSettings);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        set: function (value) {
            var _this = this;
            if (!value) {
                this._data = [];
            }
            else {
                var firstItem = value[0];
                this._sourceDataType = typeof firstItem;
                this._sourceDataFields = this.getFields(firstItem);
                this._data = value.map(function (item) {
                    return typeof item === "string" || typeof item === "number"
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField],
                            isDisabled: item[_this._settings.disabledField]
                        });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    MultiSelectComponent.prototype.onFilterTextChange = function ($event) {
        this.onFilterChange.emit($event);
    };
    MultiSelectComponent.prototype.onItemClick = function ($event, item) {
        if (this.disabled || item.isDisabled) {
            return false;
        }
        var found = this.isSelected(item);
        var allowAdd = this._settings.limitSelection === -1 || (this._settings.limitSelection > 0 && this.selectedItems.length < this._settings.limitSelection);
        if (!found) {
            if (allowAdd) {
                this.addSelected(item);
            }
        }
        else {
            this.removeSelected(item);
        }
        if (this._settings.singleSelection && this._settings.closeDropDownOnSelection) {
            this.closeDropdown();
        }
    };
    MultiSelectComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== undefined && value !== null && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        var firstItem = value[0];
                        this.selectedItems = [
                            typeof firstItem === "string" || typeof firstItem === "number"
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField],
                                    isDisabled: firstItem[this._settings.disabledField]
                                })
                        ];
                    }
                }
                catch (e) {
                    // console.error(e.body.msg);
                }
            }
            else {
                var _data = value.map(function (item) {
                    return typeof item === "string" || typeof item === "number"
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField],
                            isDisabled: item[_this._settings.disabledField]
                        });
                });
                if (this._settings.limitSelection > 0) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                }
                else {
                    this.selectedItems = _data;
                }
            }
        }
        else {
            this.selectedItems = [];
        }
        this.onChangeCallback(value);
    };
    // From ControlValueAccessor interface
    MultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    MultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    // Set touched on blur
    MultiSelectComponent.prototype.onTouched = function () {
        this.closeDropdown();
        this.onTouchedCallback();
    };
    MultiSelectComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    };
    MultiSelectComponent.prototype.isSelected = function (clickedItem) {
        var found = false;
        this.selectedItems.forEach(function (item) {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    };
    MultiSelectComponent.prototype.isLimitSelectionReached = function () {
        return this._settings.limitSelection === this.selectedItems.length;
    };
    MultiSelectComponent.prototype.isAllItemsSelected = function () {
        // get disabld item count
        var filteredItems = this.listFilterPipe.transform(this._data, this.filter);
        var itemDisabledCount = filteredItems.filter(function (item) { return item.isDisabled; }).length;
        // take disabled items into consideration when checking
        if ((!this.data || this.data.length === 0) && this._settings.allowRemoteDataSearch) {
            return false;
        }
        return filteredItems.length === this.selectedItems.length + itemDisabledCount;
    };
    MultiSelectComponent.prototype.showButton = function () {
        if (!this._settings.singleSelection) {
            if (this._settings.limitSelection > 0) {
                return false;
            }
            // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
            return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
        }
        else {
            // should be disabled in single selection mode
            return false;
        }
    };
    MultiSelectComponent.prototype.itemShowRemaining = function () {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    };
    MultiSelectComponent.prototype.addSelected = function (item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    };
    MultiSelectComponent.prototype.removeSelected = function (itemSel) {
        var _this = this;
        this.selectedItems.forEach(function (item) {
            if (itemSel.id === item.id) {
                _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    };
    MultiSelectComponent.prototype.emittedValue = function (val) {
        var _this = this;
        var selected = [];
        if (Array.isArray(val)) {
            val.map(function (item) {
                selected.push(_this.objectify(item));
            });
        }
        else {
            if (val) {
                return this.objectify(val);
            }
        }
        return selected;
    };
    MultiSelectComponent.prototype.objectify = function (val) {
        if (this._sourceDataType === 'object') {
            var obj = {};
            obj[this._settings.idField] = val.id;
            obj[this._settings.textField] = val.text;
            if (this._sourceDataFields.includes(this._settings.disabledField)) {
                obj[this._settings.disabledField] = val.isDisabled;
            }
            return obj;
        }
        if (this._sourceDataType === 'number') {
            return Number(val.id);
        }
        else {
            return val.text;
        }
    };
    MultiSelectComponent.prototype.toggleDropdown = function (evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this._settings.defaultOpen = !this._settings.defaultOpen;
        if (!this._settings.defaultOpen) {
            this.onDropDownClose.emit();
        }
    };
    MultiSelectComponent.prototype.closeDropdown = function () {
        this._settings.defaultOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = "";
        }
        this.onDropDownClose.emit();
    };
    MultiSelectComponent.prototype.toggleSelectAll = function () {
        if (this.disabled) {
            return false;
        }
        if (!this.isAllItemsSelected()) {
            // filter out disabled item first before slicing
            this.selectedItems = this.listFilterPipe.transform(this._data, this.filter).filter(function (item) { return !item.isDisabled; }).slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    };
    MultiSelectComponent.prototype.getFields = function (inputData) {
        var fields = [];
        if (typeof inputData !== "object") {
            return fields;
        }
        // tslint:disable-next-line:forin
        for (var prop in inputData) {
            fields.push(prop);
        }
        return fields;
    };
    MultiSelectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ListFilterPipe }
    ]; };
    tslib_1.__decorate([
        Input()
    ], MultiSelectComponent.prototype, "placeholder", null);
    tslib_1.__decorate([
        Input()
    ], MultiSelectComponent.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input()
    ], MultiSelectComponent.prototype, "settings", null);
    tslib_1.__decorate([
        Input()
    ], MultiSelectComponent.prototype, "data", null);
    tslib_1.__decorate([
        Output("onFilterChange")
    ], MultiSelectComponent.prototype, "onFilterChange", void 0);
    tslib_1.__decorate([
        Output("onDropDownClose")
    ], MultiSelectComponent.prototype, "onDropDownClose", void 0);
    tslib_1.__decorate([
        Output("onSelect")
    ], MultiSelectComponent.prototype, "onSelect", void 0);
    tslib_1.__decorate([
        Output("onDeSelect")
    ], MultiSelectComponent.prototype, "onDeSelect", void 0);
    tslib_1.__decorate([
        Output("onSelectAll")
    ], MultiSelectComponent.prototype, "onSelectAll", void 0);
    tslib_1.__decorate([
        Output("onDeSelectAll")
    ], MultiSelectComponent.prototype, "onDeSelectAll", void 0);
    tslib_1.__decorate([
        HostListener("blur")
    ], MultiSelectComponent.prototype, "onTouched", null);
    MultiSelectComponent = tslib_1.__decorate([
        Component({
            selector: "ng-multiselect-dropdown",
            template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list {{(_settings.singleSelection)?'single-select-mode':''}}\" [hidden]=\"!_settings.defaultOpen\">\n    <div>\n      <ul class=\"item1\">\n        <li (click)=\"toggleSelectAll()\" *ngIf=\"(_data.length > 0 || _settings.allowRemoteDataSearch) && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\" class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n          <input type=\"checkbox\" aria-label=\"multiselect-select-all\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n          <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n        </li>\n        <li class=\"filter-textbox\" *ngIf=\"(_data.length>0 || _settings.allowRemoteDataSearch) && _settings.allowSearchFilter\">\n          <input type=\"text\" aria-label=\"multiselect-search\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n        </li>\n      </ul>\n    </div>\n    <div class=\"selected-list\" *ngIf=\"_settings.showSelectedList || false\">\n      <span class=\"selected-list__title\">{{_settings.selectedListTitle || ''}}</span>\n      <ul class=\"item2\">\n        <li class=\"selected-list__item\" *ngFor=\"let item of selectedItems let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n          <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item)) || item.isDisabled\" />\n          <div>{{item.text}}</div>\n        </li>\n      </ul>\n    </div>\n    <div class=\"selection-list\">\n      <span class=\"selected-list__title\"  *ngIf=\"_settings.showSelectedList || false\" >{{_settings.selectionListTitle || ''}}</span>\n        <ul class=\"item2 select-list\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n          <li *ngFor=\"let item of _data | multiSelectFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox {{isSelected(item) ? 'selected-list__item':''}}\">\n            <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item)) || item.isDisabled\" />\n            <div>{{item.text}}</div>\n          </li>\n          <li class='no-data' *ngIf=\"_data.length == 0 && !_settings.allowRemoteDataSearch\">\n            <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n          </li>\n        </ul>\n    </div>\n  </div>\n</div>\n",
            providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;transform:scale(0);transform-origin:50%;transition:transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out;transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"]
        })
    ], MultiSelectComponent);
    return MultiSelectComponent;
}());
export { MultiSelectComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24tY3VzdG9tLyIsInNvdXJjZXMiOlsibXVsdGlzZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQXFCLE1BQU0scUJBQXFCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE1BQU0sQ0FBQyxJQUFNLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBQ0YsSUFBTSxJQUFJLEdBQUcsY0FBTyxDQUFDLENBQUM7O0FBU3RCO0lBaUdFLDhCQUFvQixHQUFzQixFQUFTLGNBQTZCO1FBQTVELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUEvRnpFLFVBQUssR0FBb0IsRUFBRSxDQUFDO1FBQzVCLGtCQUFhLEdBQW9CLEVBQUUsQ0FBQztRQUNwQyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUM3QixpQkFBWSxHQUFHLFFBQVEsQ0FBQztRQUNoQixvQkFBZSxHQUFHLElBQUksQ0FBQyxDQUFDLCtFQUErRTtRQUN2RyxzQkFBaUIsR0FBa0IsRUFBRSxDQUFDLENBQUMsaUNBQWlDO1FBQ2hGLFdBQU0sR0FBYSxJQUFJLFFBQVEsQ0FB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QUM7K0RBQ3NEO0lBbUY5RTtRQURDLFlBQVksQ0FBQyxNQUFNLENBQUM7eURBSXBCO0lBOUtVLG9CQUFvQjtRQVBoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLHdqSEFBNEM7WUFFNUMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyxvQkFBb0IsQ0FnVWhDO0lBQUQsMkJBQUM7Q0FBQSxBQWhVRCxJQWdVQztTQWhVWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBMaXN0SXRlbSwgSURyb3Bkb3duU2V0dGluZ3MgfSBmcm9tIFwiLi9tdWx0aXNlbGVjdC5tb2RlbFwiO1xuaW1wb3J0IHsgTGlzdEZpbHRlclBpcGUgfSBmcm9tIFwiLi9saXN0LWZpbHRlci5waXBlXCI7XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibmctbXVsdGlzZWxlY3QtZHJvcGRvd25cIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9tdWx0aS1zZWxlY3QuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL211bHRpLXNlbGVjdC5jb21wb25lbnQuc2Nzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgX3NldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncztcbiAgcHVibGljIF9kYXRhOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcbiAgcHVibGljIHNlbGVjdGVkSXRlbXM6IEFycmF5PExpc3RJdGVtPiA9IFtdO1xuICBwdWJsaWMgaXNEcm9wZG93bk9wZW4gPSB0cnVlO1xuICBfcGxhY2Vob2xkZXIgPSBcIlNlbGVjdFwiO1xuICBwcml2YXRlIF9zb3VyY2VEYXRhVHlwZSA9IG51bGw7IC8vIHRvIGtlZXAgbm90ZSBvZiB0aGUgc291cmNlIGRhdGEgdHlwZS4gY291bGQgYmUgYXJyYXkgb2Ygc3RyaW5nL251bWJlci9vYmplY3RcbiAgcHJpdmF0ZSBfc291cmNlRGF0YUZpZWxkczogQXJyYXk8c3RyaW5nPiA9IFtdOyAvLyBzdG9yZSBzb3VyY2UgZGF0YSBmaWVsZHMgbmFtZXNcbiAgZmlsdGVyOiBMaXN0SXRlbSA9IG5ldyBMaXN0SXRlbSh0aGlzLmRhdGEpO1xuICBkZWZhdWx0U2V0dGluZ3M6IElEcm9wZG93blNldHRpbmdzID0ge1xuICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXG4gICAgaWRGaWVsZDogXCJpZFwiLFxuICAgIHRleHRGaWVsZDogXCJ0ZXh0XCIsXG4gICAgZGlzYWJsZWRGaWVsZDogXCJpc0Rpc2FibGVkXCIsXG4gICAgZW5hYmxlQ2hlY2tBbGw6IHRydWUsXG4gICAgc2VsZWN0QWxsVGV4dDogXCJTZWxlY3QgQWxsXCIsXG4gICAgdW5TZWxlY3RBbGxUZXh0OiBcIlVuU2VsZWN0IEFsbFwiLFxuICAgIGFsbG93U2VhcmNoRmlsdGVyOiBmYWxzZSxcbiAgICBsaW1pdFNlbGVjdGlvbjogLTEsXG4gICAgY2xlYXJTZWFyY2hGaWx0ZXI6IHRydWUsXG4gICAgbWF4SGVpZ2h0OiAxOTcsXG4gICAgaXRlbXNTaG93TGltaXQ6IDk5OTk5OTk5OTk5OSxcbiAgICBzZWFyY2hQbGFjZWhvbGRlclRleHQ6IFwiU2VhcmNoXCIsXG4gICAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0OiBcIk5vIGRhdGEgYXZhaWxhYmxlXCIsXG4gICAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wOiB0cnVlLFxuICAgIGRlZmF1bHRPcGVuOiBmYWxzZSxcbiAgICBhbGxvd1JlbW90ZURhdGFTZWFyY2g6IGZhbHNlLFxuICAgIHNob3dTZWxlY3RlZExpc3Q6IHRydWUsXG4gICAgc2VsZWN0ZWRMaXN0VGl0bGU6ICdzZWxlY3RlZCcsXG4gICAgc2VsZWN0aW9uTGlzdFRpdGxlOiAnVG8gYmUnXG4gIH07XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IFwiU2VsZWN0XCI7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzZXR0aW5ncyh2YWx1ZTogSURyb3Bkb3duU2V0dGluZ3MpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncywgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlyc3RJdGVtID0gdmFsdWVbMF07XG4gICAgICB0aGlzLl9zb3VyY2VEYXRhVHlwZSA9IHR5cGVvZiBmaXJzdEl0ZW07XG4gICAgICB0aGlzLl9zb3VyY2VEYXRhRmllbGRzID0gdGhpcy5nZXRGaWVsZHMoZmlyc3RJdGVtKTtcbiAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZS5tYXAoKGl0ZW06IGFueSkgPT5cbiAgICAgICAgdHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGl0ZW0gPT09IFwibnVtYmVyXCJcbiAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxuICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSxcbiAgICAgICAgICAgICAgaXNEaXNhYmxlZDogaXRlbVt0aGlzLl9zZXR0aW5ncy5kaXNhYmxlZEZpZWxkXVxuICAgICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dChcIm9uRmlsdGVyQ2hhbmdlXCIpXG4gIG9uRmlsdGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoXCJvbkRyb3BEb3duQ2xvc2VcIilcbiAgb25Ecm9wRG93bkNsb3NlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dChcIm9uU2VsZWN0XCIpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dChcIm9uRGVTZWxlY3RcIilcbiAgb25EZVNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoXCJvblNlbGVjdEFsbFwiKVxuICBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgQE91dHB1dChcIm9uRGVTZWxlY3RBbGxcIilcbiAgb25EZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgb25GaWx0ZXJUZXh0Q2hhbmdlKCRldmVudCkge1xuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UuZW1pdCgkZXZlbnQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLHByaXZhdGUgbGlzdEZpbHRlclBpcGU6TGlzdEZpbHRlclBpcGUpIHt9XG5cbiAgb25JdGVtQ2xpY2soJGV2ZW50OiBhbnksIGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgaXRlbS5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmlzU2VsZWN0ZWQoaXRlbSk7XG4gICAgY29uc3QgYWxsb3dBZGQgPSB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgfHwgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCAmJiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIDwgdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24pO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGlmIChhbGxvd0FkZCkge1xuICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIHRoaXMuX3NldHRpbmdzLmNsb3NlRHJvcERvd25PblNlbGVjdGlvbikge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gdmFsdWVbMF07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgIHR5cGVvZiBmaXJzdEl0ZW0gPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGZpcnN0SXRlbSA9PT0gXCJudW1iZXJcIlxuICAgICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGZpcnN0SXRlbSlcbiAgICAgICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkOiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MuZGlzYWJsZWRGaWVsZF1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZS5ib2R5Lm1zZyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IF9kYXRhID0gdmFsdWUubWFwKChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGl0ZW0gPT09IFwibnVtYmVyXCJcbiAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdLFxuICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuZGlzYWJsZWRGaWVsZF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhLnNwbGljZSgwLCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXG4gIEBIb3N0TGlzdGVuZXIoXCJibHVyXCIpXG4gIHB1YmxpYyBvblRvdWNoZWQoKSB7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICBpc1NlbGVjdGVkKGNsaWNrZWRJdGVtOiBMaXN0SXRlbSkge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGNsaWNrZWRJdGVtLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gIH1cblxuICBpc0FsbEl0ZW1zU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgLy8gZ2V0IGRpc2FibGQgaXRlbSBjb3VudFxuICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gdGhpcy5saXN0RmlsdGVyUGlwZS50cmFuc2Zvcm0odGhpcy5fZGF0YSx0aGlzLmZpbHRlcik7XG4gICAgY29uc3QgaXRlbURpc2FibGVkQ291bnQgPSBmaWx0ZXJlZEl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uaXNEaXNhYmxlZCkubGVuZ3RoO1xuICAgIC8vIHRha2UgZGlzYWJsZWQgaXRlbXMgaW50byBjb25zaWRlcmF0aW9uIHdoZW4gY2hlY2tpbmdcbiAgICBpZiAoKCF0aGlzLmRhdGEgfHwgdGhpcy5kYXRhLmxlbmd0aCA9PT0gMCkgJiYgdGhpcy5fc2V0dGluZ3MuYWxsb3dSZW1vdGVEYXRhU2VhcmNoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCArIGl0ZW1EaXNhYmxlZENvdW50O1xuICB9XG5cbiAgc2hvd0J1dHRvbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyAhdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIHRoaXMuX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsICYmIHRoaXMuX2RhdGEubGVuZ3RoID4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdWxkIGJlIGRpc2FibGVkIGluIHNpbmdsZSBzZWxlY3Rpb24gbW9kZVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGl0ZW1TaG93UmVtYWluaW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSB0aGlzLl9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdDtcbiAgfVxuXG4gIGFkZFNlbGVjdGVkKGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgcmVtb3ZlU2VsZWN0ZWQoaXRlbVNlbDogTGlzdEl0ZW0pIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtU2VsLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UodGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtU2VsKSk7XG4gIH1cblxuICBlbWl0dGVkVmFsdWUodmFsOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLm1hcChpdGVtID0+IHtcbiAgICAgICAgc2VsZWN0ZWQucHVzaCh0aGlzLm9iamVjdGlmeShpdGVtKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RpZnkodmFsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkO1xuICB9XG5cbiAgb2JqZWN0aWZ5KHZhbDogTGlzdEl0ZW0pIHtcbiAgICBpZiAodGhpcy5fc291cmNlRGF0YVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgIG9ialt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSA9IHZhbC5pZDtcbiAgICAgIG9ialt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdID0gdmFsLnRleHQ7XG4gICAgICBpZiAodGhpcy5fc291cmNlRGF0YUZpZWxkcy5pbmNsdWRlcyh0aGlzLl9zZXR0aW5ncy5kaXNhYmxlZEZpZWxkKSkge1xuICAgICAgICBvYmpbdGhpcy5fc2V0dGluZ3MuZGlzYWJsZWRGaWVsZF0gPSB2YWwuaXNEaXNhYmxlZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zb3VyY2VEYXRhVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbC50ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA9ICF0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbjtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLmRlZmF1bHRPcGVuKSB7XG4gICAgICB0aGlzLm9uRHJvcERvd25DbG9zZS5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VEcm9wZG93bigpIHtcbiAgICB0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA9IGZhbHNlO1xuICAgIC8vIGNsZWFyIHNlYXJjaCB0ZXh0XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLmNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci50ZXh0ID0gXCJcIjtcbiAgICB9XG4gICAgdGhpcy5vbkRyb3BEb3duQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0FsbEl0ZW1zU2VsZWN0ZWQoKSkge1xuICAgICAgLy8gZmlsdGVyIG91dCBkaXNhYmxlZCBpdGVtIGZpcnN0IGJlZm9yZSBzbGljaW5nXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLmxpc3RGaWx0ZXJQaXBlLnRyYW5zZm9ybSh0aGlzLl9kYXRhLHRoaXMuZmlsdGVyKS5maWx0ZXIoaXRlbSA9PiAhaXRlbS5pc0Rpc2FibGVkKS5zbGljZSgpO1xuICAgICAgdGhpcy5vblNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gIH1cblxuICBnZXRGaWVsZHMoaW5wdXREYXRhKSB7XG4gICAgY29uc3QgZmllbGRzID0gW107XG4gICAgaWYgKHR5cGVvZiBpbnB1dERhdGEgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgfVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBpbnB1dERhdGEpIHtcbiAgICAgIGZpZWxkcy5wdXNoKHByb3ApO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGRzO1xuICB9XG59XG4iXX0=