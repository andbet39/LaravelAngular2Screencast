'use strict';var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var constants_1 = require('./constants');
var pipe_lifecycle_reflector_1 = require('./pipe_lifecycle_reflector');
var binding_record_1 = require('./binding_record');
var directive_record_1 = require('./directive_record');
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 */
var WrappedValue = (function () {
    function WrappedValue(wrapped) {
        this.wrapped = wrapped;
    }
    WrappedValue.wrap = function (value) {
        var w = _wrappedValues[_wrappedIndex++ % 5];
        w.wrapped = value;
        return w;
    };
    return WrappedValue;
})();
exports.WrappedValue = WrappedValue;
var _wrappedValues = [
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null)
];
var _wrappedIndex = 0;
/**
 * Represents a basic change from a previous to a new value.
 */
var SimpleChange = (function () {
    function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.previousValue === ChangeDetectionUtil.uninitialized; };
    return SimpleChange;
})();
exports.SimpleChange = SimpleChange;
var _simpleChangesIndex = 0;
var _simpleChanges = [
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null)
];
function _simpleChange(previousValue, currentValue) {
    var index = _simpleChangesIndex++ % 20;
    var s = _simpleChanges[index];
    s.previousValue = previousValue;
    s.currentValue = currentValue;
    return s;
}
/* tslint:disable:requireParameterType */
var ChangeDetectionUtil = (function () {
    function ChangeDetectionUtil() {
    }
    ChangeDetectionUtil.arrayFn0 = function () { return []; };
    ChangeDetectionUtil.arrayFn1 = function (a1) { return [a1]; };
    ChangeDetectionUtil.arrayFn2 = function (a1, a2) { return [a1, a2]; };
    ChangeDetectionUtil.arrayFn3 = function (a1, a2, a3) { return [a1, a2, a3]; };
    ChangeDetectionUtil.arrayFn4 = function (a1, a2, a3, a4) { return [a1, a2, a3, a4]; };
    ChangeDetectionUtil.arrayFn5 = function (a1, a2, a3, a4, a5) { return [a1, a2, a3, a4, a5]; };
    ChangeDetectionUtil.arrayFn6 = function (a1, a2, a3, a4, a5, a6) { return [a1, a2, a3, a4, a5, a6]; };
    ChangeDetectionUtil.arrayFn7 = function (a1, a2, a3, a4, a5, a6, a7) { return [a1, a2, a3, a4, a5, a6, a7]; };
    ChangeDetectionUtil.arrayFn8 = function (a1, a2, a3, a4, a5, a6, a7, a8) {
        return [a1, a2, a3, a4, a5, a6, a7, a8];
    };
    ChangeDetectionUtil.arrayFn9 = function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
    };
    ChangeDetectionUtil.operation_negate = function (value) { return !value; };
    ChangeDetectionUtil.operation_add = function (left, right) { return left + right; };
    ChangeDetectionUtil.operation_subtract = function (left, right) { return left - right; };
    ChangeDetectionUtil.operation_multiply = function (left, right) { return left * right; };
    ChangeDetectionUtil.operation_divide = function (left, right) { return left / right; };
    ChangeDetectionUtil.operation_remainder = function (left, right) { return left % right; };
    ChangeDetectionUtil.operation_equals = function (left, right) { return left == right; };
    ChangeDetectionUtil.operation_not_equals = function (left, right) { return left != right; };
    ChangeDetectionUtil.operation_identical = function (left, right) { return left === right; };
    ChangeDetectionUtil.operation_not_identical = function (left, right) { return left !== right; };
    ChangeDetectionUtil.operation_less_then = function (left, right) { return left < right; };
    ChangeDetectionUtil.operation_greater_then = function (left, right) { return left > right; };
    ChangeDetectionUtil.operation_less_or_equals_then = function (left, right) { return left <= right; };
    ChangeDetectionUtil.operation_greater_or_equals_then = function (left, right) { return left >= right; };
    ChangeDetectionUtil.cond = function (cond, trueVal, falseVal) { return cond ? trueVal : falseVal; };
    ChangeDetectionUtil.mapFn = function (keys) {
        function buildMap(values) {
            var res = collection_1.StringMapWrapper.create();
            for (var i = 0; i < keys.length; ++i) {
                collection_1.StringMapWrapper.set(res, keys[i], values[i]);
            }
            return res;
        }
        switch (keys.length) {
            case 0:
                return function () { return []; };
            case 1:
                return function (a1) { return buildMap([a1]); };
            case 2:
                return function (a1, a2) { return buildMap([a1, a2]); };
            case 3:
                return function (a1, a2, a3) { return buildMap([a1, a2, a3]); };
            case 4:
                return function (a1, a2, a3, a4) { return buildMap([a1, a2, a3, a4]); };
            case 5:
                return function (a1, a2, a3, a4, a5) { return buildMap([a1, a2, a3, a4, a5]); };
            case 6:
                return function (a1, a2, a3, a4, a5, a6) { return buildMap([a1, a2, a3, a4, a5, a6]); };
            case 7:
                return function (a1, a2, a3, a4, a5, a6, a7) { return buildMap([a1, a2, a3, a4, a5, a6, a7]); };
            case 8:
                return function (a1, a2, a3, a4, a5, a6, a7, a8) { return buildMap([a1, a2, a3, a4, a5, a6, a7, a8]); };
            case 9:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                    return buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
                };
            default:
                throw new exceptions_1.BaseException("Does not support literal maps with more than 9 elements");
        }
    };
    ChangeDetectionUtil.keyedAccess = function (obj, args) { return obj[args[0]]; };
    ChangeDetectionUtil.unwrapValue = function (value) {
        if (value instanceof WrappedValue) {
            return value.wrapped;
        }
        else {
            return value;
        }
    };
    ChangeDetectionUtil.changeDetectionMode = function (strategy) {
        return constants_1.isDefaultChangeDetectionStrategy(strategy) ? constants_1.ChangeDetectionStrategy.CheckAlways :
            constants_1.ChangeDetectionStrategy.CheckOnce;
    };
    ChangeDetectionUtil.simpleChange = function (previousValue, currentValue) {
        return _simpleChange(previousValue, currentValue);
    };
    ChangeDetectionUtil.isValueBlank = function (value) { return lang_1.isBlank(value); };
    ChangeDetectionUtil.s = function (value) { return lang_1.isPresent(value) ? "" + value : ''; };
    ChangeDetectionUtil.protoByIndex = function (protos, selfIndex) {
        return selfIndex < 1 ?
            null :
            protos[selfIndex - 1]; // self index is shifted by one because of context
    };
    ChangeDetectionUtil.callPipeOnDestroy = function (selectedPipe) {
        if (pipe_lifecycle_reflector_1.implementsOnDestroy(selectedPipe.pipe)) {
            selectedPipe.pipe.ngOnDestroy();
        }
    };
    ChangeDetectionUtil.bindingTarget = function (mode, elementIndex, name, unit, debug) {
        return new binding_record_1.BindingTarget(mode, elementIndex, name, unit, debug);
    };
    ChangeDetectionUtil.directiveIndex = function (elementIndex, directiveIndex) {
        return new directive_record_1.DirectiveIndex(elementIndex, directiveIndex);
    };
    ChangeDetectionUtil.looseNotIdentical = function (a, b) { return !lang_1.looseIdentical(a, b); };
    ChangeDetectionUtil.uninitialized = lang_1.CONST_EXPR(new Object());
    return ChangeDetectionUtil;
})();
exports.ChangeDetectionUtil = ChangeDetectionUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwudHMiXSwibmFtZXMiOlsiV3JhcHBlZFZhbHVlIiwiV3JhcHBlZFZhbHVlLmNvbnN0cnVjdG9yIiwiV3JhcHBlZFZhbHVlLndyYXAiLCJTaW1wbGVDaGFuZ2UiLCJTaW1wbGVDaGFuZ2UuY29uc3RydWN0b3IiLCJTaW1wbGVDaGFuZ2UuaXNGaXJzdENoYW5nZSIsIl9zaW1wbGVDaGFuZ2UiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5jb25zdHJ1Y3RvciIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjAiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm4xIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuMiIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjMiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm40IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuNSIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjYiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm43IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuOCIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjkiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9uZWdhdGUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9hZGQiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9zdWJ0cmFjdCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX211bHRpcGx5IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fZGl2aWRlIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fcmVtYWluZGVyIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fZXF1YWxzIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fbm90X2VxdWFscyIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2lkZW50aWNhbCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX25vdF9pZGVudGljYWwiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9sZXNzX3RoZW4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9ncmVhdGVyX3RoZW4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9sZXNzX29yX2VxdWFsc190aGVuIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fZ3JlYXRlcl9vcl9lcXVhbHNfdGhlbiIsIkNoYW5nZURldGVjdGlvblV0aWwuY29uZCIsIkNoYW5nZURldGVjdGlvblV0aWwubWFwRm4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm1hcEZuLmJ1aWxkTWFwIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5rZXllZEFjY2VzcyIsIkNoYW5nZURldGVjdGlvblV0aWwudW53cmFwVmFsdWUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmNoYW5nZURldGVjdGlvbk1vZGUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLnNpbXBsZUNoYW5nZSIsIkNoYW5nZURldGVjdGlvblV0aWwuaXNWYWx1ZUJsYW5rIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5zIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5wcm90b0J5SW5kZXgiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmNhbGxQaXBlT25EZXN0cm95IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5iaW5kaW5nVGFyZ2V0IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5kaXJlY3RpdmVJbmRleCIsIkNoYW5nZURldGVjdGlvblV0aWwubG9vc2VOb3RJZGVudGljYWwiXSwibWFwcGluZ3MiOiJBQUFBLHFCQU9PLDBCQUEwQixDQUFDLENBQUE7QUFDbEMsMkJBQTRC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LEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzVETiw0QkFBUUEsR0FBZkEsVUFBZ0JBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQVdPLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3BFUCw0QkFBUUEsR0FBZkEsVUFBZ0JBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQVdRLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzVFUiw0QkFBUUEsR0FBZkEsVUFBZ0JBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQVdTLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3BGVCw0QkFBUUEsR0FBZkEsVUFBZ0JBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBO1FBQzVDVSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFF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LENBQUVBLGtEQUFrREE7SUFDdkZBLENBQUNBO0lBRU1uQyxxQ0FBaUJBLEdBQXhCQSxVQUF5QkEsWUFBMEJBO1FBQ2pEb0MsRUFBRUEsQ0FBQ0EsQ0FBQ0EsOENBQW1CQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyQ0EsWUFBWUEsQ0FBQ0EsSUFBS0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7UUFDekNBLENBQUNBO0lBQ0hBLENBQUNBO0lBRU1wQyxpQ0FBYUEsR0FBcEJBLFVBQXFCQSxJQUFZQSxFQUFFQSxZQUFvQkEsRUFBRUEsSUFBWUEsRUFBRUEsSUFBWUEsRUFDOURBLEtBQWFBO1FBQ2hDcUMsTUFBTUEsQ0FBQ0EsSUFBSUEsOEJBQWFBLENBQUNBLElBQUlBLEVBQUVBLFlBQVlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0lBQ2xFQSxDQUFDQTtJQUVNckMsa0NBQWNBLEdBQXJCQSxVQUFzQkEsWUFBb0JBLEVBQUVBLGNBQXNCQTtRQUNoRXNDLE1BQU1BLENBQUNBLElBQUlBLGlDQUFjQSxDQUFDQSxZQUFZQSxFQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtJQUMxREEsQ0FBQ0E7SUFFTXRDLHFDQUFpQkEsR0FBeEJBLFVBQXlCQSxDQUFNQSxFQUFFQSxDQUFNQSxJQUFhdUMsTUFBTUEsQ0FBQ0EsQ0FBQ0EscUJBQWNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBakg1RXZDLGlDQUFhQSxHQUFXQSxpQkFBVUEsQ0FBU0EsSUFBSUEsTUFBTUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFrSGxFQSwwQkFBQ0E7QUFBREEsQ0FBQ0EsQUFuSEQsSUFtSEM7QUFuSFksMkJBQW1CLHNCQW1IL0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENPTlNUX0VYUFIsXG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgVHlwZSxcbiAgU3RyaW5nV3JhcHBlcixcbiAgbG9vc2VJZGVudGljYWxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1Byb3RvUmVjb3JkfSBmcm9tICcuL3Byb3RvX3JlY29yZCc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBpc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtpbXBsZW1lbnRzT25EZXN0cm95fSBmcm9tICcuL3BpcGVfbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0JpbmRpbmdUYXJnZXR9IGZyb20gJy4vYmluZGluZ19yZWNvcmQnO1xuaW1wb3J0IHtEaXJlY3RpdmVJbmRleH0gZnJvbSAnLi9kaXJlY3RpdmVfcmVjb3JkJztcbmltcG9ydCB7U2VsZWN0ZWRQaXBlfSBmcm9tICcuL3BpcGVzJztcblxuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IHRoZSByZXN1bHQgb2YgYSB7QGxpbmsgUGlwZU1ldGFkYXRhfSB0cmFuc2Zvcm1hdGlvbiBoYXMgY2hhbmdlZCBldmVuIHRob3VnaCB0aGVcbiAqIHJlZmVyZW5jZVxuICogaGFzIG5vdCBjaGFuZ2VkLlxuICpcbiAqIFRoZSB3cmFwcGVkIHZhbHVlIHdpbGwgYmUgdW53cmFwcGVkIGJ5IGNoYW5nZSBkZXRlY3Rpb24sIGFuZCB0aGUgdW53cmFwcGVkIHZhbHVlIHdpbGwgYmUgc3RvcmVkLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpZiAodGhpcy5fbGF0ZXN0VmFsdWUgPT09IHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUpIHtcbiAqICAgIHJldHVybiB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlO1xuICogIH0gZWxzZSB7XG4gKiAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gKiAgICByZXR1cm4gV3JhcHBlZFZhbHVlLndyYXAodGhpcy5fbGF0ZXN0VmFsdWUpOyAvLyB0aGlzIHdpbGwgZm9yY2UgdXBkYXRlXG4gKiAgfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBXcmFwcGVkVmFsdWUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgd3JhcHBlZDogYW55KSB7fVxuXG4gIHN0YXRpYyB3cmFwKHZhbHVlOiBhbnkpOiBXcmFwcGVkVmFsdWUge1xuICAgIHZhciB3ID0gX3dyYXBwZWRWYWx1ZXNbX3dyYXBwZWRJbmRleCsrICUgNV07XG4gICAgdy53cmFwcGVkID0gdmFsdWU7XG4gICAgcmV0dXJuIHc7XG4gIH1cbn1cblxudmFyIF93cmFwcGVkVmFsdWVzID0gW1xuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpLFxuICBuZXcgV3JhcHBlZFZhbHVlKG51bGwpXG5dO1xuXG52YXIgX3dyYXBwZWRJbmRleCA9IDA7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJhc2ljIGNoYW5nZSBmcm9tIGEgcHJldmlvdXMgdG8gYSBuZXcgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJldmlvdXNWYWx1ZTogYW55LCBwdWJsaWMgY3VycmVudFZhbHVlOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlIG5ldyB2YWx1ZSBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAqL1xuICBpc0ZpcnN0Q2hhbmdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlID09PSBDaGFuZ2VEZXRlY3Rpb25VdGlsLnVuaW5pdGlhbGl6ZWQ7IH1cbn1cblxudmFyIF9zaW1wbGVDaGFuZ2VzSW5kZXggPSAwO1xudmFyIF9zaW1wbGVDaGFuZ2VzID0gW1xuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpLFxuICBuZXcgU2ltcGxlQ2hhbmdlKG51bGwsIG51bGwpXG5dO1xuXG5mdW5jdGlvbiBfc2ltcGxlQ2hhbmdlKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSk6IFNpbXBsZUNoYW5nZSB7XG4gIHZhciBpbmRleCA9IF9zaW1wbGVDaGFuZ2VzSW5kZXgrKyAlIDIwO1xuICB2YXIgcyA9IF9zaW1wbGVDaGFuZ2VzW2luZGV4XTtcbiAgcy5wcmV2aW91c1ZhbHVlID0gcHJldmlvdXNWYWx1ZTtcbiAgcy5jdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWU7XG4gIHJldHVybiBzO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpyZXF1aXJlUGFyYW1ldGVyVHlwZSAqL1xuZXhwb3J0IGNsYXNzIENoYW5nZURldGVjdGlvblV0aWwge1xuICBzdGF0aWMgdW5pbml0aWFsaXplZDogT2JqZWN0ID0gQ09OU1RfRVhQUjxPYmplY3Q+KG5ldyBPYmplY3QoKSk7XG5cbiAgc3RhdGljIGFycmF5Rm4wKCk6IGFueVtdIHsgcmV0dXJuIFtdOyB9XG4gIHN0YXRpYyBhcnJheUZuMShhMSk6IGFueVtdIHsgcmV0dXJuIFthMV07IH1cbiAgc3RhdGljIGFycmF5Rm4yKGExLCBhMik6IGFueVtdIHsgcmV0dXJuIFthMSwgYTJdOyB9XG4gIHN0YXRpYyBhcnJheUZuMyhhMSwgYTIsIGEzKTogYW55W10geyByZXR1cm4gW2ExLCBhMiwgYTNdOyB9XG4gIHN0YXRpYyBhcnJheUZuNChhMSwgYTIsIGEzLCBhNCk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNF07IH1cbiAgc3RhdGljIGFycmF5Rm41KGExLCBhMiwgYTMsIGE0LCBhNSk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTVdOyB9XG4gIHN0YXRpYyBhcnJheUZuNihhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KTogYW55W10geyByZXR1cm4gW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTZdOyB9XG4gIHN0YXRpYyBhcnJheUZuNyhhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNyk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhN107IH1cbiAgc3RhdGljIGFycmF5Rm44KGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCk6IGFueVtdIHtcbiAgICByZXR1cm4gW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOF07XG4gIH1cbiAgc3RhdGljIGFycmF5Rm45KGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5XTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVyYXRpb25fbmVnYXRlKHZhbHVlKTogYW55IHsgcmV0dXJuICF2YWx1ZTsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2FkZChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICsgcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9zdWJ0cmFjdChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0IC0gcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9tdWx0aXBseShsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICogcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9kaXZpZGUobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAvIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fcmVtYWluZGVyKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgJSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2VxdWFscyhsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ID09IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbm90X2VxdWFscyhsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICE9IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25faWRlbnRpY2FsKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgPT09IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbm90X2lkZW50aWNhbChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICE9PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2xlc3NfdGhlbihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0IDwgcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9ncmVhdGVyX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA+IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbGVzc19vcl9lcXVhbHNfdGhlbihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0IDw9IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZ3JlYXRlcl9vcl9lcXVhbHNfdGhlbihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ID49IHJpZ2h0OyB9XG4gIHN0YXRpYyBjb25kKGNvbmQsIHRydWVWYWwsIGZhbHNlVmFsKTogYW55IHsgcmV0dXJuIGNvbmQgPyB0cnVlVmFsIDogZmFsc2VWYWw7IH1cblxuICBzdGF0aWMgbWFwRm4oa2V5czogYW55W10pOiBhbnkge1xuICAgIGZ1bmN0aW9uIGJ1aWxkTWFwKHZhbHVlcyk6IHtbazogLyphbnkqLyBzdHJpbmddOiBhbnl9IHtcbiAgICAgIHZhciByZXMgPSBTdHJpbmdNYXBXcmFwcGVyLmNyZWF0ZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJlcywga2V5c1tpXSwgdmFsdWVzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgc3dpdGNoIChrZXlzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gKCkgPT4gW107XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiAoYTEpID0+IGJ1aWxkTWFwKFthMV0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gKGExLCBhMikgPT4gYnVpbGRNYXAoW2ExLCBhMl0pO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzXSk7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiAoYTEsIGEyLCBhMywgYTQpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNF0pO1xuICAgICAgY2FzZSA1OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSkgPT4gYnVpbGRNYXAoW2ExLCBhMiwgYTMsIGE0LCBhNV0pO1xuICAgICAgY2FzZSA2OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2XSk7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIHJldHVybiAoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhN10pO1xuICAgICAgY2FzZSA4OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkgPT4gYnVpbGRNYXAoW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOF0pO1xuICAgICAgY2FzZSA5OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpID0+XG4gICAgICAgICAgICAgICAgICAgYnVpbGRNYXAoW2ExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTldKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBEb2VzIG5vdCBzdXBwb3J0IGxpdGVyYWwgbWFwcyB3aXRoIG1vcmUgdGhhbiA5IGVsZW1lbnRzYCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGtleWVkQWNjZXNzKG9iaiwgYXJncyk6IGFueSB7IHJldHVybiBvYmpbYXJnc1swXV07IH1cblxuICBzdGF0aWMgdW53cmFwVmFsdWUodmFsdWU6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgV3JhcHBlZFZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUud3JhcHBlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjaGFuZ2VEZXRlY3Rpb25Nb2RlKHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSk6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3koc3RyYXRlZ3kpID8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tBbHdheXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja09uY2U7XG4gIH1cblxuICBzdGF0aWMgc2ltcGxlQ2hhbmdlKHByZXZpb3VzVmFsdWU6IGFueSwgY3VycmVudFZhbHVlOiBhbnkpOiBTaW1wbGVDaGFuZ2Uge1xuICAgIHJldHVybiBfc2ltcGxlQ2hhbmdlKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSk7XG4gIH1cblxuICBzdGF0aWMgaXNWYWx1ZUJsYW5rKHZhbHVlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGlzQmxhbmsodmFsdWUpOyB9XG5cbiAgc3RhdGljIHModmFsdWU6IGFueSk6IHN0cmluZyB7IHJldHVybiBpc1ByZXNlbnQodmFsdWUpID8gYCR7dmFsdWV9YCA6ICcnOyB9XG5cbiAgc3RhdGljIHByb3RvQnlJbmRleChwcm90b3M6IFByb3RvUmVjb3JkW10sIHNlbGZJbmRleDogbnVtYmVyKTogUHJvdG9SZWNvcmQge1xuICAgIHJldHVybiBzZWxmSW5kZXggPCAxID9cbiAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgcHJvdG9zW3NlbGZJbmRleCAtIDFdOyAgLy8gc2VsZiBpbmRleCBpcyBzaGlmdGVkIGJ5IG9uZSBiZWNhdXNlIG9mIGNvbnRleHRcbiAgfVxuXG4gIHN0YXRpYyBjYWxsUGlwZU9uRGVzdHJveShzZWxlY3RlZFBpcGU6IFNlbGVjdGVkUGlwZSk6IHZvaWQge1xuICAgIGlmIChpbXBsZW1lbnRzT25EZXN0cm95KHNlbGVjdGVkUGlwZS5waXBlKSkge1xuICAgICAgKDxhbnk+c2VsZWN0ZWRQaXBlLnBpcGUpLm5nT25EZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGJpbmRpbmdUYXJnZXQobW9kZTogc3RyaW5nLCBlbGVtZW50SW5kZXg6IG51bWJlciwgbmFtZTogc3RyaW5nLCB1bml0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIGRlYnVnOiBzdHJpbmcpOiBCaW5kaW5nVGFyZ2V0IHtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdUYXJnZXQobW9kZSwgZWxlbWVudEluZGV4LCBuYW1lLCB1bml0LCBkZWJ1Zyk7XG4gIH1cblxuICBzdGF0aWMgZGlyZWN0aXZlSW5kZXgoZWxlbWVudEluZGV4OiBudW1iZXIsIGRpcmVjdGl2ZUluZGV4OiBudW1iZXIpOiBEaXJlY3RpdmVJbmRleCB7XG4gICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVJbmRleChlbGVtZW50SW5kZXgsIGRpcmVjdGl2ZUluZGV4KTtcbiAgfVxuXG4gIHN0YXRpYyBsb29zZU5vdElkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gIWxvb3NlSWRlbnRpY2FsKGEsIGIpOyB9XG59XG4iXX0=