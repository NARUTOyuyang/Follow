/**
 * Created by pis on 2017/6/20.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet, ScrollView} from 'react-native'

import HeadBar from '../../../../common/HeadBar'
import Util from '../../../../common/Util'

export default class ManageVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title={'视频下载中心'}
                         navigator={this.props.navigator}/>
                <View style={styles.bodyStyle}>
                    <Text style={styles.noVideoText}>暂无已下载视频，你可以去资讯视频中心下载哦！</Text>
                </View>
            </View>
        )
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