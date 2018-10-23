
# react-native-rn-toast
    
    A react native module to show toast like android, it works on iOS and Android(use ToastAndroid from react-native).
## Getting started

`$ npm install react-native-rn-toast --save`

##  Usage
```javascript
import Toast from 'react-native-rn-toast';

Toast.show('toast test',Toast.SHORT);
Toast.showWithGravity('toast test',Toast.SHORT, Toast.CENTER);
Toast.showWithGravityAndOffset('toast test',Toast.CENTER, 20, 25);
```

##  Mehtod
> show()

```javascript
static show(message, duration)
```
> showWithGravity()

```javascript
static showWithGravity(message, duration, gravity)
```
> showWithGravityAndOffset()

```javascript
static showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)
```
##  Properties
> SHORT

    Toast.SHORT;

> LONG

    Toast.LONG;
> TOP

    Toast.TOP;
> BOTTOM

    Toast.BOTTOM;
> CENTER

    Toast.CENTER;