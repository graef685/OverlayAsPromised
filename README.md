# OverlayAsPromised

### It's only a pre-release at now !!!
If you include the ```overlay-as-promised.min.js``` only, be sure jQuery and JQuery.colorbox are part of your Project.

### Install - Demo

* Download the pre-release
* ``` npm install ``` 


### Run - Demo

* ``` node server.js ```
* Open your browser at ```loacalhost:1234 ```
* You will se a cactus 

### Usage

* inlucde ```overlay-as-promised.min.js``` into your Project


 * create config:

```
{
  selector: string     -> Overlay Selector i.e.: .overlay
  permanent: bool      -> shows overlay permanently until close
  closable: bool       -> overlay is closable by button or extern layer click
  startingDelay: int   -> overlay will be opened after this amount of miliseconds
  minDidsplayTime: int -> overlay will be at least visible for this amount of miliseconds,
  maxDisplayTime: int  -> overlay will be maximal be visible fot this amount of miliseconds,
  onOpen: function     -> will be called on open
  onClose: function    -> will be called on close
}

```

* run:
``` 
var overlay = OverlayAsPromised.create(config) 
overlay.open();
```
