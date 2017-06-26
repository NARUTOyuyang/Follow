/**
 * Created by pis on 2017/6/20.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, ScrollView, StyleSheet} from 'react-native'

import HeadBar from '../../../../common/HeadBar'
import Util from '../../../../common/Util'
import ManageVideo from './ManageVideo'

export default class DownLoadView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title={'视频下载中心'}
                         navigator={this.props.navigator}
                         onRightPress={()=>this._rightPress()}
                         rightView={()=>this._rightView()}/>
                <View style={styles.bodyStyle}>
                    <Text style={styles.noVideoText}>暂无已下载视频，你可以去资讯视频中心下载哦！</Text>
                </View>
            </View>
        )
    }

    _rightView() {
        return (
            <Text style={{fontSize:18,color:Util.color.whiter}}>管理</Text>
        )
    }

    _rightPress() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: ManageVideo
            })
        }
    }
}

const styles = StyleSheet.create({
    bodyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Util.color.gray6
    },
    noVideoText: {
        fontSize: 13,
        color: Util.color.black3
    }
});