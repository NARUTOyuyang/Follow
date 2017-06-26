/**
 * Created by pis on 2017/6/5.
 */
import React, {Component} from 'react'
import {BackAndroid, Platform, View, StyleSheet, Animated, Easing, Image, Alert} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';
import {BlurView, VibrancyView} from 'react-native-blur'

import LoginView from './login/LoginView'
import TabBar from './control/tabBar/TabBar'
import Utils from './common/Util'

import SetView from './control/common/message/set/SetView'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            loaded: false,
            fadeInOpacity: new Animated.Value(0),
            user: null
        };

        this._asyncGetAppStatus = this._asyncGetAppStatus.bind(this)
    }

    //获取到缓存的数据
    _asyncGetAppStatus() {
        storage.getItem('user')
            .then(
                (data) => {
                    let user;
                    if (data) {
                        user = JSON.parse(data)
                    }
                    if (user && user.tokenId) {
                        global.userInfo = user;
                        this.setState({
                            user: user,
                            loaded: true
                        })
                    } else {
                        this.setState({
                            loaded: false
                        })
                    }
                }
            )
            .catch((error) => {
                Alert.alert(error)
            })
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        }).start(() => {
            this.setState({
                load: true
            })
        });

        this._asyncGetAppStatus()
    }

    render() {
        const {load, loaded} =this.state;
        if (!load) {
            return this._renderLoadingContainer();
        }
        let TmpComponent;

        if (load && loaded) {
            TmpComponent = TabBar
        } else if (load && !loaded) {
            TmpComponent = LoginView
        }

        return (
            <Navigator initialRoute={{name:'fistName',component:TmpComponent}}
                       ref="navigator"
                       style={{flex:1}}
                //configureScene={(route) => {
                //return Navigator.SceneConfigs.VerticalDownSwipeJump;
                //}}

                       renderScene={(route,navigator)=>{
                    let TmpComponent=route.component;
                    return <TmpComponent {...route.params} navigator={navigator}/>
                }}
            />
        )
    }

    _renderLoadingContainer() {
        return (
            <Animated.Image
                source={{uri: 'yasuo'}}
                style={[styles.loading, { opacity: this.state.fadeInOpacity}]}>
                <BlurView blurAmount={5}
                          style={styles.obscure}
                          blurType='light'/>
            </Animated.Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
    },
    obscure: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Utils.size.width,
        height: Utils.size.height
    }
});