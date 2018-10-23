/**
 * 自定义Toast组件，主要用于iOS，android使用 ToastAndroid
 */
import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    View,
    Easing,
    Dimensions,
    Text,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';
import Toast from "./index";

const {width, height} = Dimensions.get("window");

class ToastView extends Component {
    static propTypes = {
        time: PropTypes.number,
        position: PropTypes.number,
        xOffset: PropTypes.number,
        yOffset: PropTypes.number
    }

    moveAnim = new Animated.Value(height / 12);
    opacityAnim = new Animated.Value(0);
    dismissHandler = null;

    constructor(props) {
        super(props);
        this.state = {
            message: props.message !== undefined ? props.message : '',
            time: props.time && props.time < 1500 ? Toast.SHORT : Toast.LONG,
            position: props.position !== undefined ? props.position : Toast.BOTTOM,
            xOffset: props.xOffset !== undefined ? props.xOffset : 0,
            yOffset: props.yOffset !== undefined ? props.yOffset : 0,
        }
    }

    render() {

        let textViewStyle = {};
        const { position, xOffset, yOffset } = this.state;

        if( position === Toast.BOTTOM ){
            textViewStyle.alignSelf = "flex-end";
            textViewStyle.bottom = this.moveAnim;
            textViewStyle.opacity = this.opacityAnim;
        }else if( position === Toast.TOP ){
            textViewStyle.alignSelf = "flex-start";
            textViewStyle.top = this.moveAnim;
            textViewStyle.opacity = this.opacityAnim;
        }else{
            textViewStyle.alignSelf = "center";
            textViewStyle.opacity = this.opacityAnim;
        }

        if( xOffset || yOffset ){
            textViewStyle.marginLeft = xOffset;
            textViewStyle.marginTop = yOffset;
        }

        return (
            <View style={styles.container} pointerEvents='none'>
                <Animated.View style={[styles.textContainer, textViewStyle ]}><Text
                    style={styles.defaultText}>{this.state.message}</Text></Animated.View>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            message: nextProps.message !== undefined ? nextProps.message : '',
            time: nextProps.time && nextProps.time < 1500 ? Toast.SHORT : Toast.LONG,
        })
        clearTimeout(this.dismissHandler)
        this.timingDismiss()
    }

    componentDidMount() {
        Animated.timing(
            this.moveAnim,
            {
                toValue: height / 8,
                duration: 80,
                easing: Easing.ease
            },
        ).start(this.timingDismiss);
        Animated.timing(
            this.opacityAnim,
            {
                toValue: 1,
                duration: 100,
                easing: Easing.linear
            },
        ).start();
    }

    componentWillUnmount() {
        clearTimeout(this.dismissHandler)
    }


    timingDismiss = () => {
        this.dismissHandler = setTimeout(() => {
            this.dismiss()
        }, this.state.time)
    };

    dismiss = () => {
        Animated.timing(
            this.opacityAnim,
            {
                toValue: 0,
                duration: 100,
                easing: Easing.linear
            },
        ).start(this.onDismiss);
    };

    onDismiss = () => {
        if (this.props.onDismiss) {
            this.props.onDismiss()
        }
    }
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 12,
        maxWidth: width / 2,
    },
    defaultText: {
        color: "#fff",
        fontSize: 11,
    },
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
    }
});
export default ToastView;