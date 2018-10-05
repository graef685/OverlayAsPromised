# OverlayAsPromised - jQuery Plugin

### Release with Dependencies !!!
If you include the ```overlay-as-promised.min.js``` only, be sure jQuery and JQuery.colorbox are part of your Project.  
You will get them here:  
*  http://jquery.com/download/ 
*  http://www.jacklmoore.com/colorbox/

### Install - Demo

* Download
* ``` npm install ``` 


### Run - Demo

* ``` node server.js ```
* Open your browser at ```loacalhost:1234 ```
* Overlay will pop up and you will se a cactus

### API
```
config: 
{
  selector:        string   -> default: ''             -> Css Overlay Selector i.e.: .overlay
  permanent:       bool     -> default: true           -> shows overlay permanently until close
  closable:        bool     -> default: true           -> overlay will be closable by button or extern layer click
  startingDelay:   int      -> default: 0              -> overlay will be opened after this amount of miliseconds
  minDisplayTime:  int      -> default: 0              -> overlay will be at least visible for this amount of miliseconds,
  maxDisplayTime:  int      -> default: 0              -> overlay will be maximal be visible for this amount of miliseconds
}

onOpen:            function -> default: empty function -> will be called on open
onClose:           function -> default: empty function -> will be called on close
```
```
overlay.open()  -> Promise
overlay.close() -> Promise
```

### Usage

* inlucde ```overlay-as-promised.min.js``` into your Project

``` 
var overlay = $.overlayAsPromised(config, onOpen, onClose);
overlay.open();
```

### Customize

To customize the close-Button simply overwrite the styles of the element with id ``` cboxClose ``` e.g. in your stylesheet:

```c2hs
#cboxClose {
  display: inline-block;
  position: absolute;
  top: -30px;
  right: -30px;
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
