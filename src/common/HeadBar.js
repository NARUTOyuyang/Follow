/**
 * Created by pis on 2017/6/7.
 */
import React, {Component, PropTypes} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform, Alert} from 'react-native'

import Utils from '../common/Util'

/**
 * rightView:右侧视图,
 * onRightPress:右侧方法,
 * title:标题,
 */


export default class HeadBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        BGColor: Utils.color.blue1,
        backHint: false
    };

    static ViewPropTypes = {
        title: PropTypes.string.isRequired
    };

    render() {
        return (
            <View style={[styles.container,{backgroundColor:this.props.BGColor}]}>
                {this._goBackLight()}
                {this._headTitle()}
                {this._goNextRight()}
            </View>
        )
    }

    _goBackLight() {
        return (
            <TouchableOpacity onPress={()=>this._goBackPress()}
                              style={styles.RightViewStyle}>
                <Image style={styles.goBackImage}
                       source={{uri:'back'}}/>
            </TouchableOpacity>
        )
    }

    _goBackPress() {
        const {navigator, backHint} = this.props;
        if (backHint) {
            Alert.alert(
                '提示',
                '是否退出本次编辑？',
                [
                    {text: '取消'},
                    {
                        text: '确定', onPress: () => {
                        if (navigator) {
                            navigator.pop()
                        }
                    }
                    }
                ]
            )
        } else {
            if (navigator) {
                navigator.pop()
            }
        }
    }

    _headTitle() {
        return (
            <View style={styles.headTitleView}>
                <Text style={styles.titleText} numberOfLines={1}>{this.props.title}</Text>
            </View>
        )
    }

    _goNextRight() {
        return (
            <TouchableOpacity onPress={this.props.onRightPress}
                              style={styles.RightViewStyle}>
                {this.props.rightView && this.props.rightView()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Utils.size.width,
        height: Platform.OS === 'ios' ? 64 : 44,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Utils.color.blue1
    },
    goBackImage: {
        width: 20,
        height: 28,
        resizeMode: 'cover',
    },
    headTitleView: {
        flex: 3.5
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Utils.color.whiter
    },
    RightViewStyle: {
        flex: 1,
        height: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});