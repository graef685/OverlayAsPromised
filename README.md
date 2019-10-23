# OverlayAsPromised - jQuery Plugin

![](https://img.shields.io/npm/v/overlay-as-promised.svg)
![](https://img.shields.io/npm/l/overlay-as-promised.svg)
![](https://img.shields.io/github/size/graef685/OverlayAsPromised/jquery.overlay-as-promised.min.js)
![](https://img.shields.io/github/commits-since/graef685/OverlayAsPromised/0.1.0/master)
![](https://img.shields.io/npm/dt/overlay-as-promised.svg)

	

### Release with Dependencies !!!
If you include the ```jquery.overlay-as-promised.min.js``` only, be sure jQuery and jQuery.colorbox are part of your Project.  
You will get them here:  
*  http://jquery.com/download/ 
*  http://www.jacklmoore.com/colorbox/

### Install - Demo

* Download
* ``` npm install ``` 


### Run - Demo

* ``` node server.js ```
* Open your browser at ```localhost:1234 ```

### API
```
var overlay = $(selector).overlayAsPromised(config, onOpen, onClose);
```
``` 
config: {
  closable:        bool                    -> default: true           -> overlay will be closable by button or extern layer click
  closeButton:     bool                    -> default: false          -> shows close button at overlay's bottom
  closeLabel:      string                  -> default: 'Close'         -> label for close button
  closeClass:      string                  -> default: ''              -> css class for close button
  startingDelay:   int                     -> default: 0              -> overlay will be opened after this amount of miliseconds
  minDisplayTime:  int                     -> default: 0              -> overlay will be at least visible for this amount of miliseconds,
  maxDisplayTime:  int                     -> default: 0              -> overlay will be maximal be visible for this amount of miliseconds
  width:           int|string              -> default: false          -> overlay's fixed width
  height:          int|string              -> default: false          -> overlay's fixed height
  maxWidth:        int|string              -> default: false          -> overlay's max width
  maxHeight:       int|string              -> default: false          -> overlay's max height
  top:             int|string              -> default: false          -> overlay's distance to the top of the window
  bottom:          int|string              -> default: false          -> overlay's distance to the bottom of the window
  left:            int|string              -> default: false          -> overlay's distance to the left of the window
  right:           int|string              -> default: false          -> overlay's distance to the right of the window
  className:       string                  -> default: false          -> gives overlay a custom class
  transition:      'elastic'|'fade'|'none' -> default: 'elastic'      -> opening transition type
  speed:           int                     -> default: 350            -> transition speed
  fixed:           bool                    -> default: false          -> fixed position, no scrolling of background
  fitScreen:       bool                    -> default: false          -> whole screen overlay
  autoResize:      bool                    -> default: false          -> trigger resize on dom changes
}

onOpen:            function                -> default: empty function -> will be called on open
onClose:           function                -> default: empty function -> will be called on close
```
```
overlay.open()   -> Promise with resolved return value from onOpen
overlay.close()  -> Promise with resolved return value from onClose
overlay.resize() -> null
```

*Note: Auto resizing is not working on Internet Explorer 9 and below*

### Usage

* Include ```jquery.overlay-as-promised.min.js``` into your Project

``` 
var overlay = $('.test').overlayAsPromised({
    closable: true,
}, function() {
    return "it's working";
}, function() {
    console.log("closed");
});

overlay.open().then(function(value) {
    console.log(value);
});
```

### Customize

For the moment customizing means to override the ```jQuery.colorbox``` styles.  
To customize the built-in top close-Button simply overwrite the styles of the element with id ``` cboxClose ``` e.g. in your stylesheet:

```c2hs
#cboxClose {
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0px;
  color: #000;
  border: none;
  background-color: #fff;
}

#cboxClose::before {
  font-family: 'Glyphicons Halflings';
  content: "\e014";
  font-size: 17px;
}
```

This would result in a black X on white ground (Glyphicons muste be included as font-family).

### Contributors

* Patrick Gräf - graef685@googlemail.com
