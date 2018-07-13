# OverlayAsPromised

### Release with Dependecies !!!
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
* You will see a cactus 

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

onOpen: function -> default: empty function -> will be called on open
onClose: function -> default: empty function -> will be called on close
```
```
Overlay.create(config) -> overlay

overlay.open()  -> Promise
overlay.close() -> Promise
```

### Usage

* inlucde ```overlay-as-promised.min.js``` into your Project

``` 
var overlay = $.OverlayAsPromised.(config) 
overlay.open();
```

### Contributors

* Patrick Gräf - graef685@googlemail.com

### Usages

OverlayAsPromised is in use in following Projects:

*  https://shop.t-mobile.at/
*  https://businessshop.t-mobile.at/
