# OverlayAsPromised

### It's only a pre-release at now !!!
If you include the ```overlay-as-promised.min.js``` only, be sure jQuery and JQuery.colorbox are part of your Project.

### Install - Demo

* Download the pre-release
* ``` npm install ``` 


### Run - Demo

* ``` node server.js ```
* Open your browser at ```loacalhost:1234 ```
* You will see a cactus 

### API
```
config: 
{
  selector: string     -> Overlay Selector i.e.: .overlay
  permanent: bool      -> shows overlay permanently until close
  closable: bool       -> overlay will be closable by button or extern layer click
  startingDelay: int   -> overlay will be opened after this amount of miliseconds
  minDidsplayTime: int -> overlay will be at least visible for this amount of miliseconds,
  maxDisplayTime: int  -> overlay will be maximal be visible for this amount of miliseconds,
  onOpen: function     -> will be called on open
  onClose: function    -> will be called on close
}
```
```
Overlay.create(config) -> overlay

overlay.open()  -> Promise
overlay.close() -> Promise
```

### Usage

* inlucde ```overlay-as-promised.min.js``` into your Project

``` 
var overlay = OverlayAsPromised.create(config) 
overlay.open();
```
