'use strict';
import React from 'react';
import {
	ToastAndroid,
	Platform,
} from 'react-native';
import RootView from './RootView'
import ToastView from './ToastView'

class Toast {
    static LONG = 3500;
    static SHORT = 2000;
    static TOP = ToastAndroid.TOP;
    static BOTTOM = ToastAndroid.BOTTOM;
    static CENTER = ToastAndroid.CENTER;

    static show(msg) {
        RootView.setView(<ToastView
            message={msg}
            onDismiss={() => {
                RootView.setView()
            }}/>)
    }

    static show(msg, time) {
        RootView.setView(<ToastView
            message={msg}
            time={time}
            onDismiss={() => {
                RootView.setView()
            }}/>)
    }

    static showWithGravity( msg, time, position){
        RootView.setView(<ToastView
            message={msg}
            time={time}
            position={position}
            onDismiss={() => {
                RootView.setView()
            }}/>)
    }

    static showWithGravityAndOffset( msg, time, position, xOffset, yOffset ){
        RootView.setView(<ToastView
            message={msg}
            time={time}
            position={position}
            xOffset={xOffset}
            yOffset={yOffset}
            onDismiss={() => {
                RootView.setView()
            }}/>)
    }
}

export default (Platform.OS === 'android' ? ToastAndroid : Toast);