/**
 * Created by pis on 2017/6/22.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'

import HeadBar from '../../../../common/HeadBar'
import Util from '../../../../common/Util'

export default class IndentView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title='我的订单'
                         navigator={this.props.navigator}/>
                <View style={styles.bodyStyle}>
                    <Text style={styles.indentText}>暂无订单</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bodyStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Util.color.gray6,
        flex:1
    },
    indentText: {
        fontSize: 13,
        color: Util.color.gray2
    }
});