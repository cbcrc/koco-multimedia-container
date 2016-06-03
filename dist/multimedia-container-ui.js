(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'knockout', 'koco-disposer'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('knockout'), require('koco-disposer'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.knockout, global.kocoDisposer);
        global.multimediaContainerUi = mod.exports;
    }
})(this, function (exports, _knockout, _kocoDisposer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _knockout2 = _interopRequireDefault(_knockout);

    var _kocoDisposer2 = _interopRequireDefault(_kocoDisposer);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var MultimediaContainerViewModel = function MultimediaContainerViewModel(params /*, componentInfo */) {
        var self = this;

        var rawParams = params.$raw;

        self.multimedia = params.multimedia;
        self.defaultImageUrl = params.defaultImageUrl;
        self.koDisposer = new _kocoDisposer2.default();

        if ('remove' in params) {
            self.remove = params.remove;
        } else {
            self.remove = function () {};
        }

        if ('click' in params) {
            self.click = params.click;
        } else {
            self.click = null;
        }

        self.removeTitle = params.removeTitle;

        self.canRemove = _knockout2.default.pureComputed(function () {
            var canRemove = true;

            if (!('remove' in params)) {
                return false;
            }

            if ('canRemove' in params) {
                canRemove = _knockout2.default.unwrap(params.canRemove);
            }

            return _knockout2.default.unwrap(self.multimedia) && canRemove;
        });
        self.koDisposer.add(self.canRemove);

        self.showDefaultImage = _knockout2.default.pureComputed(function () {
            return params.defaultImageUrl && !_knockout2.default.unwrap(self.multimedia);
        });
        self.koDisposer.add(self.showDefaultImage);

        self.visible = _knockout2.default.pureComputed(function () {
            return !(!self.showDefaultImage() && !_knockout2.default.unwrap(self.multimedia));
        });
        self.koDisposer.add(self.visible);
    };

    MultimediaContainerViewModel.prototype.dispose = function () {
        var self = this;

        self.koDisposer.dispose();
    };

    exports.default = {
        viewModel: {
            createViewModel: function createViewModel(params, componentInfo) {
                return new MultimediaContainerViewModel(params, componentInfo);
            }
        },
        template: template
    };
});