/**
 * Created by pis on 2017/6/5.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    PlatForm,
    Animated,
    Image,
    Switch,
    TouchableOpacity,
    Easing,
    Alert
} from 'react-native'

import {BlurView, VibrancyView} from 'react-native-blur'
import Utils from '../common/Util'
import ForgetPwd from './ForgetPwd'
import RegisterPwd from './RegisterPwd'
import TabBar from '../control/tabBar/TabBar'

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(1),
            tmpName: '',
            tmpPsw: '',
            switchType: true,
            loadedEd: false,
            userData: {
                tokenId: '我是 tokenId',
                userId: '我是 userId'
            }
        }
    }

    componentWillMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        }).start();

        storage.getItem('loginState')
            .then((value) => {
                if (value == 'false') {
                    this.setState({
                        switchType: false,
                    })
                } else {
                    this.setState({
                        switchType: true,
                    })
                }
            })
            .catch((err) => {
                    console.log(err)
                }
            );

        storage.getItem('phone')
            .then(
                (phone) => {
                    if (this.state.switchType) {
                        global.phone = phone;
                        this.setState({
                            tmpName: phone
                        })
                    } else {
                        this.setState({
                            tmpName: ''
                        })
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })
    }

    _changeSate(value) {
        let tmpString = String(value);

        storage.setItem('loginState', tmpString)
            .then(() => {
                this.setState({
                    switchType: value
                })
            })
            .catch((err) => {
                    console.log(err)
                }
            );
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='handled'>
                <Animated.View style={[styles.container, {opacity: this.state.fadeInOpacity}]}>
                    {this._login()}
                </Animated.View>
            </ScrollView>
        )
    }

    _login() {
        return (
            <Image source={{uri: 'yasuo'}}
                   style={styles.BGImage}>

                <BlurView blurAmount={5}
                          style={styles.obscure}
                          blurType='light'>
                    <Image style={styles.logoImage}
                           source={{uri: 'follow'}}/>

                    <View style={styles.userNameView}>
                        <Text style={styles.textStyle}>用户名</Text>
                        <TextInput style={styles.textInputView}
                                   placeholder={'请输入用户名'}
                                   editable={true}
                                   autoCapitalize={'none'}
                                   defaultValue={this.state.tmpName}
                                   keyboardType={'numeric'}
                                   underlineColorAndroid={'transparent'}
                                   placeholderTextColor={'#fff'}
                                   multiline={false}
                                   onBlur={() => this._onBlur()}
                                   textAlign="center"
                                   onChangeText={(text) => {
                                   this.setState({
                                       tmpName: text
                                   });
                               }}/>

                    </View>
                    <View style={[styles.userNameView, {marginTop: Utils.size.width / 10}]}>
                        <Text style={styles.textStyle}>{'密     码'}</Text>
                        <TextInput style={styles.textInputView}
                                   placeholder={'请输入密码'}
                                   keyboardType={'default'}
                                   underlineColorAndroid={'transparent'}
                                   placeholderTextColor={'#fff'}
                                   multiline={false}
                                   secureTextEntry={true}
                                   textAlign='center'
                                   onChangeText={(psw) => {
                                   this.setState({
                                       tmpPsw: psw
                                   })
                               }}/>

                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.textStyle}>自动登入</Text>
                        <Switch value={this.state.switchType}
                                onValueChange={(value) => {
                                this._changeSate(value)
                            }}/>
                    </View>

                    {this._longType()}

                    <View style={styles.footerView}>
                        <TouchableOpacity onPress={() => this._register()}>
                            <Text style={styles.footerText}>注册账号</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._forgetPwd()}>
                            <Text style={styles.footerText}>忘记密码</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>

            </Image>
        )
    }

    _longType() {
        const {tmpName, tmpPsw}=this.state;
        if ((tmpName && tmpPsw ) || (tmpName.trim().length !== 0 && tmpPsw.trim().length !== 0)) {
            return (
                <TouchableOpacity style={styles.loginView}
                                  onPress={() => this._loginClick()}>
                    <Text style={styles.loginText}>{'登              入'}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={[styles.loginView, {backgroundColor: 'rgba(128,128,128,0.5)'}]}>
                    <Text style={styles.loginText}>{'登              入'}</Text>
                </View>
            )
        }
    }

    _onBlur() {

    }

    _loginClick() {
        if (!(/^1[34578]\d{9}$/.test(this.state.tmpName))) {
            Alert.alert('手机号码错误', '你输入的是一个无效的手机号码', [{text: '确定'}])
        } else {
            //登录接口，成功后到下个页面
            this.fetchDate()
        }
    }

    fetchDate() {
        const {tmpName, tmpPsw, userData}=this.state;
        // fetch(Utils.fetchConfig.FetchConfig,
        //     {
        //         method: 'POST',
        //         headers: {
        //             //我向服务器端接受的数据类型（json）
        //             'Accept': 'application/json',
        //             //我给服务器端的数据类型（json）
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             userName: tmpName,
        //             userPassword: tmpPsw,
        //             jiajianAppId: AppId
        //         })
        //     })
        //     .then((response) => {
        //         console.log(response)
        //         return response.json()
        //     })
        //     .then((responseData) =>
        //         this._loginSuccess(responseData))
        //     .catch(error => {
        //         console.log(error)
        //     })

        this._loginSuccess(userData)
    }

    _loginSuccess(data) {
        const {switchType, tmpName}=this.state;
        const {navigator}=this.props;
        if (data && data.tokenId) {
            global.userInfo = data;
            if (!switchType) {
                if (navigator) {
                    navigator.push({
                        component: TabBar,
                        name: 'TabBar'
                    })
                }
            } else {
                if (navigator) {
                    navigator.push({
                        component: TabBar,
                        name: 'TabBar'
                    })
                }
                let userInfo = JSON.stringify(data);
                storage.setItem('user', userInfo)
                    .then(() => {
                        this.setState({
                            data: data
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                let phone = JSON.stringify(tmpName);
                storage.setItem('phone', tmpName)
                    .then(() => {
                        this.setState({
                            data: tmpName
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }

    _register() {
        const {navigator} =this.props;
        if (navigator) {
            navigator.push({
                component: RegisterPwd,
                name: 'RegisterPwd'
            })
        }
    }

    _forgetPwd() {
        const {navigator} =this.props;
        if (navigator) {
            navigator.push({
                name: 'ForgetPwd',
                component: ForgetPwd
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    BGImage: {
        resizeMode: 'cover',
        width: Utils.size.width,
        height: Utils.size.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        height: Utils.size.width / 2.5,
        width: Utils.size.width / 2,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    userNameView: {
        height: Utils.size.height / 16,
        width: Utils.size.width / 1.5,
        borderRadius: 3,
        backgroundColor: Utils.color.backgroundColor1,
        marginTop: Utils.size.width / 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInputView: {
        flex: 1,
        fontSize: 15,
        textAlignVertical: 'center',
        color: Utils.color.blue1,
        fontWeight: 'bold'
    },
    textStyle: {
        fontSize: 15,
        color: Utils.color.blue1,
        marginLeft: 7,
        marginRight: 10,
        fontWeight: 'bold'
    },
    switch: {
        width: Utils.size.width * 0.9,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        alignItems: 'center',
    },
    loginView: {
        width: 200,
        height: 45,
        backgroundColor: Utils.color.blue1,
        borderRadius: 20,
        marginTop: Utils.size.width / 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 19,
        color: Utils.color.whiter,
        fontWeight: 'bold'
    },
    footerView: {
        height: 40,
        width: Utils.size.width * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    footerText: {
        color: Utils.color.whiter,
        fontSize: 17,
        fontWeight: 'bold'
    },
    obscure: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Utils.size.width,
        height: Utils.size.height
    }
});