/**
 * Created by pis on 2017/6/7.
 */
import React, {Component}  from 'react'
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import {BlurView, VibrancyView} from 'react-native-blur'

import HeadBar from '../common/HeadBar'

import Utils from '../common/Util'

export default class ForgetModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            verification: '',
            pewOne: '',
            pwdTwo: '',
            load: false,
            seconds: 60
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title={'忘记密码'}
                         navigator={this.props.navigator}>

                </HeadBar>
                <ScrollView style={{flex: 1}}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='handled'>
                    <Image style={styles.container}
                           source={{uri: 'yasuo'}}>

                        <BlurView blurAmount={5}
                                  style={styles.obscure}
                                  blurType='light'>

                            <View style={styles.itemView}>
                                <Text style={styles.textStyle}>{'手   机'}</Text>
                                <TextInput style={styles.textInputView}
                                           placeholder={'请输入手机号'}
                                           keyboardType={'numeric'}
                                           underlineColorAndroid={'transparent'}
                                           placeholderTextColor={'#fff'}
                                           multiline={false}
                                           textAlign="center"
                                           onChangeText={(text) => {
                                           this.setState({
                                               phoneNumber: text
                                           });
                                       }}/>
                            </View>

                            <View style={styles.itemView}>
                                <Text style={styles.textStyle}>验证码</Text>
                                <TextInput style={styles.textInputView}
                                           placeholder={'请输入验证码'}
                                           keyboardType={'default'}
                                           underlineColorAndroid={'transparent'}
                                           placeholderTextColor={'#fff'}
                                           multiline={false}
                                           textAlign="center"
                                           onChange={(text) => {
                                           this.setState({
                                               verification: text.nativeEvent.text
                                           });
                                       }}/>
                                {this._verification()}
                            </View>

                            <View style={styles.itemView}>
                                <Text style={styles.textStyle}>{'密   码'}</Text>
                                <TextInput style={styles.textInputView}
                                           placeholder={'请输入新密码'}
                                           keyboardType={'default'}
                                           underlineColorAndroid={'transparent'}
                                           placeholderTextColor={'#fff'}
                                           multiline={false}
                                           secureTextEntry={true}
                                           textAlign="center"
                                           onChange={(text) => {
                                           this.setState({
                                               pewOne: text.nativeEvent.text
                                           });
                                       }}/>
                            </View>

                            <View style={styles.itemView}>
                                <Text style={styles.textStyle}>{'密   码'}</Text>
                                <TextInput style={styles.textInputView}
                                           placeholder={'请再次输入密码'}
                                           keyboardType={'default'}
                                           underlineColorAndroid={'transparent'}
                                           placeholderTextColor={'#fff'}
                                           multiline={false}
                                           secureTextEntry={true}
                                           onBlur={() => this._onBlur()}
                                           textAlign="center"
                                           onChange={(text) => {
                                           this.setState({
                                               pwdTwo: text.nativeEvent.text
                                           });
                                       }}/>
                            </View>

                            {this._forgetType()}

                        </BlurView>

                    </Image>
                </ScrollView>
            </View>
        )
    }

    _verification() {
        const {phoneNumber, load, seconds} =this.state;
        if (!phoneNumber || phoneNumber.trim().length === 0) {
            return (
                <View style={styles.verificationView}>
                    <Text style={styles.textStyle}>获取验证码</Text>
                </View>
            )
        } else {

            if (load) {
                if (this.state.seconds === 0) {
                    return (
                        <TouchableOpacity onPress={() => this._countDown()}
                                          style={[styles.verificationView, {backgroundColor: '#3DBFFB'}]}>
                            <Text style={[styles.textStyle, {color: '#fff'}]}>重新发送</Text>
                        </TouchableOpacity>
                    )
                }
                return (
                    <View style={[styles.verificationView, {backgroundColor: '#3DBFFB'}]}>
                        <Text style={[styles.textStyle, {color: '#fff'}]}>还剩{seconds}秒</Text>
                    </View>
                )
            } else {
                return (
                    <TouchableOpacity style={[styles.verificationView, {backgroundColor: '#3DBFFB'}]}
                                      onPress={() => this._countDown()}>
                        <Text style={[styles.textStyle, {color: '#fff'}]}>获取验证码</Text>
                    </TouchableOpacity>
                )
            }

        }
    }

    _forgetType() {
        const {phoneNumber, verification, pewOne, pwdTwo}=this.state;
        if (!phoneNumber || phoneNumber.trim().length == 0 || !verification || verification.trim().length == 0 || !pewOne || pewOne.trim().length == 0 || !pwdTwo || pwdTwo.trim().length == 0) {
            return (
                <View style={styles.itemView}>
                    <Text style={styles.textStyle}>立即登入</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity style={[styles.itemView, {backgroundColor: '#3DBFFB'}]}
                                  onPress={() => this._login()}>
                    <Text style={[styles.textStyle, {color: '#fff'}]}>立即登入</Text>
                </TouchableOpacity>
            )
        }
    }

    _countDown() {
        if (!(/^1[34578]\d{9}$/.test(this.state.phoneNumber))) {
            Alert.alert('手机号码错误', '你输入的是一个无效的手机号码', [{text: '确定'}]);
            return
        }
        this.setState({
            load: true,
            seconds: 60
        });

        this._interval = setInterval(() => {
            if (this.state.seconds === 0) {
                return clearInterval(this._interval);
            }

            this.setState({
                seconds: this.state.seconds - 1
            })
        }, 1000)
    }

    componentWillUnmount() {
        this._interval && clearInterval(this._interval)
    }

    _login() {
        const {pewOne, pwdTwo}=this.state;
        if (pwdTwo != pewOne) {
            Alert.alert(
                '提示', '两次输入的密码不一致', [{text: '确定'}]
            )
        }
    }

    _onBlur() {

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
    textInputView: {
        flex: 1,
        fontSize: 15,
        textAlignVertical: 'center',
        color: Utils.color.blue1,
        fontWeight: 'bold'
    },
    verificationView: {
        width: 100,
        height: 50,
        backgroundColor: Utils.color.backgroundColor1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    obscure: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Utils.size.width,
        height: Utils.size.height
    }
});