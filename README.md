# koco-multimedia-container
Container for different types of multimedia content for use in a context like a picker in a form or that type of thing. Provides a 'media present' state and a 'nothing has been selected state.'

## installation
```bash
bower install koco-multimedia-container
```

## Usage with KOCO

This is a shared module that is used in many other modules. Register it in your components.js:

```javascript
        Components.prototype.registerComponents = function() {
            ...
            koUtilities.registerComponent('koco-multimedia-container');
            ...
        };
```

Also add the container's styles to your less file:

`@import "../bower_components/koco-multimedia-container/src/koco-multimedia-container.less";`

And then you can use it like this:

```html
<koco-multimedia-container params="click: selectImage, multimedia: image, remove: unselectImage, removeTitle: 'remove this image', defaultImageUrl: settings.defaultImageUrl">
    <img data-bind="image: image" />
</koco-multimedia-container>
```

Pass a removeTitle (which will be used as the alt for the X button to remove the image), and a defaultImageUrl for use when we don't have an image (for example if you remove it!). defaultImageUrl can be a full url, but url utilities will be used to attempt to resolve it to a full url so it can also be a path.