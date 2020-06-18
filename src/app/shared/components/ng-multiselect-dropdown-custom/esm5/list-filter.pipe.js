import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ListFilterPipe = /** @class */ (function () {
    function ListFilterPipe() {
    }
    ListFilterPipe.prototype.transform = function (items, filter) {
        var _this = this;
        if (!items || !filter) {
            return items;
        }
        return items.filter(function (item) { return _this.applyFilter(item, filter); });
    };
    ListFilterPipe.prototype.applyFilter = function (item, filter) {
        if (typeof item.text === 'string' && typeof filter.text === 'string') {
            return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
        }
        else {
            return !(filter.text && item.text && item.text.toString().toLowerCase().indexOf(filter.text.toString().toLowerCase()) === -1);
        }
    };
    ListFilterPipe = tslib_1.__decorate([
        Pipe({
            name: 'multiSelectFilter',
            pure: false
        })
    ], ListFilterPipe);
    return ListFilterPipe;
}());
export { ListFilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duLWN1c3RvbS8iLCJzb3VyY2VzIjpbImxpc3QtZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBUXBEO0lBQUE7SUFlQSxDQUFDO0lBZEcsa0NBQVMsR0FBVCxVQUFVLEtBQWlCLEVBQUUsTUFBZ0I7UUFBN0MsaUJBS0M7UUFKRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBYyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLElBQWMsRUFBRSxNQUFnQjtRQUN4QyxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNsRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0c7YUFBTTtZQUNILE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqSTtJQUNMLENBQUM7SUFkUSxjQUFjO1FBSjFCLElBQUksQ0FBQztZQUNGLElBQUksRUFBRSxtQkFBbUI7WUFDekIsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDO09BQ1csY0FBYyxDQWUxQjtJQUFELHFCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEl0ZW0gfSBmcm9tICcuL211bHRpc2VsZWN0Lm1vZGVsJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdtdWx0aVNlbGVjdEZpbHRlcicsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTGlzdEZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0oaXRlbXM6IExpc3RJdGVtW10sIGZpbHRlcjogTGlzdEl0ZW0pOiBMaXN0SXRlbVtdIHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCAhZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbTogTGlzdEl0ZW0pID0+IHRoaXMuYXBwbHlGaWx0ZXIoaXRlbSwgZmlsdGVyKSk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoaXRlbTogTGlzdEl0ZW0sIGZpbHRlcjogTGlzdEl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnRleHQgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBmaWx0ZXIudGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAhKGZpbHRlci50ZXh0ICYmIGl0ZW0udGV4dCAmJiBpdGVtLnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50ZXh0LnRvTG93ZXJDYXNlKCkpID09PSAtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gIShmaWx0ZXIudGV4dCAmJiBpdGVtLnRleHQgJiYgaXRlbS50ZXh0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50ZXh0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPT09IC0xKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==