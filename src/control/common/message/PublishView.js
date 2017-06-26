/**
 * Created by pis on 2017/6/20.
 */
import React, {Component} from 'react'
import {TextInput, View, Text, StyleSheet, Alert} from 'react-native'

import Util from '../../../common/Util'
import HeadBar from '../../../common/HeadBar'

export default class PublishView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title='发表动态'
                         navigator={this.props.navigator}
                         rightView={()=>this._rightView()}
                         onRightPress={()=>this._rightPress()}
                         backHint={this.state.text}
                />
                {this._bodyType()}
            </View>
        )
    }

    _rightView() {
        return (
            <Text style={{fontSize:18,color:Util.color.whiter}}>发表</Text>
        )
    }

    _rightPress() {
        const {addListData, navigator}=this.props;
        let data = {
            Text: this.state.text, time: '今天', type: 0, day: 1
        };
        if (!this.state.text) {
            Alert.alert(
                '提示',
                '请先编辑再发表',
                [
                    {text: '确定'}
                ]
            )
        } else {
            addListData(data);
            if (navigator) {
                navigator.pop()
            }
        }
    }

    _bodyType() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInputStyle}
                           placeholder={'我有话要说'}
                           underlineColorAndroid='transparent'
                           multiline={true}
                           placeholderTextColor={Util.color.gray2}
                           onChangeText={(text)=>{
                                        this.setState({
                                            text:text
                                        })
                                   }}
                           keyboardType={'default'}
                           autoCapitalize={'none'}
                           />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Util.color.gray6
    },
    textInputStyle: {
        flex: 1,
        fontSize: 14,
        color: Util.color.black3,
        marginLeft: 5
    },
});

