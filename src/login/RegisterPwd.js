/**
 * Created by pis on 2017/6/7.
 */
import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput} from 'react-native'

import {BlurView, VibrancyView} from 'react-native-blur'

import RegisterCell from './cell/RegisterCell'
import Utils from '../common/Util'
import HeadBar from '../common/HeadBar'

export default class RegisterModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {title: '手机', hint: '请输入手机号码'},
                {title: '密码', hint: '请输入密码'},
                {title: '密码', hint: '请再次输入密码'},
            ],
            tmpValue: ''
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title={'注册账号'}
                         navigator={this.props.navigator}/>

                <ScrollView style={{flex: 1}}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='handled'>
                    <Image style={styles.container}
                           source={{uri: 'yasuo'}}>

                        <BlurView blurAmount={5}
                                  blurType={'light'}
                                  style={styles.obscure}>
                            {this.state.data.map((v, i) => {
                                return (
                                    <RegisterCell data={v}
                                                  key={`key_${i}`}
                                                  callBack={(value) => this._setNumber(value)}
                                                  index={i}/>
                                )
                            })}

                            {this._registerType()}
                        </BlurView>
                    </Image>
                </ScrollView>
            </View>
        )
    }

    _setNumber(value) {
        this.setState({
            tmpValue: value
        })
    }


    _registerType() {
        const {tmpValue}=this.state;
        if (!tmpValue || tmpValue.trim().length == 0) {
            return (
                <View style={styles.itemView}>
                    <Text style={styles.textStyle}>立即注册</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity style={[styles.itemView, {backgroundColor: Utils.color.blue1}]}
                                  onPress={()=>this._register()}>
                    <Text style={[styles.textStyle, {color: Utils.color.whiter}]}>立即注册</Text>
                </TouchableOpacity>
            )
        }
    }

    _register() {
        // if (!(/^1[34578]\d{9}$/.test(this.state.tmpName))) {
        //     Alert.alert('手机号码错误', '你输入的是一个无效的手机号码', [{text: '确定'}])
        // }
    }

}

const styles = StyleSheet.create({
    container: {
        resizeMode: 'cover',
        width: Utils.size.width,
        height: Utils.size.height - 64,
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemView: {
        height: 50,
        width: 300,
        borderRadius: 5,
        backgroundColor: Utils.color.backgroundColor1,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 15,
        color: Utils.color.blue1,
        marginLeft: 7,
        marginRight: 10,
        fontWeight: 'bold'
    },
    obscure: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Utils.size.width,
        height: Utils.size.height
    }
});