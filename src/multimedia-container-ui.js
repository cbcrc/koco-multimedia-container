import template from 'text!./multimedia-container.html';
import ko from 'knockout';
import KoDisposer from 'koco-disposer';


var MultimediaContainerViewModel = function(params /*, componentInfo */ ) {
    var self = this;

    var rawParams = params.$raw;

    self.multimedia = params.multimedia;
    self.defaultImageUrl = params.defaultImageUrl;
    self.koDisposer = new KoDisposer();

    if ('remove' in params) {
        self.remove = params.remove;
    } else {
        self.remove = function() {};
    }

    if ('click' in params) {
        self.click = params.click;
    } else {
        self.click = null;
    }

    self.removeTitle = params.removeTitle;

    self.canRemove = ko.pureComputed(function() {
        var canRemove = true;

        if (!('remove' in params)) {
            return false;
        }

        if ('canRemove' in params) {
            canRemove = ko.unwrap(params.canRemove);
        }

        return ko.unwrap(self.multimedia) && canRemove;
    });
    self.koDisposer.add(self.canRemove);

    self.showDefaultImage = ko.pureComputed(function() {
        return params.defaultImageUrl && !ko.unwrap(self.multimedia);
    });
    self.koDisposer.add(self.showDefaultImage);

    self.visible = ko.pureComputed(function() {
        return !(!self.showDefaultImage() && !ko.unwrap(self.multimedia));
    });
    self.koDisposer.add(self.visible);
};

MultimediaContainerViewModel.prototype.dispose = function() {
    var self = this;

    self.koDisposer.dispose();
};

export default {
    viewModel: {
        createViewModel: function(params, componentInfo) {
            return new MultimediaContainerViewModel(params, componentInfo);
        }
    },
    template: template
};
