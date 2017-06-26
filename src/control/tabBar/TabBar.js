/**
 * Created by pis on 2017/6/5.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

import DfyTabBar from './DfyTabBar'
import LoginView from '../../login/LoginView'

import Account from '../common/account/Account'
import Message from '../common/message/Message'
import Picture from '../common/picture/Picture'
import Video from '../common/video/Video'

export default class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['资讯', '视频', '图片', '我的'],
            tabBarIcon: ['ios-mail-open', 'md-videocam', 'ios-images', 'ios-contact']
        }
    }

    componentDidMount() {

    }

    render() {

        const {tabBarIcon, tabNames}=this.state;

        // return (
        //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        //         <Text onPress={this._loginOut}>{userInfo.tokenId}</Text>
        //     </View>
        // )
        const {navigator}=this.props;

        return (
            <ScrollableTabView
                // renderTabBar={() => <ScrollableTabBar/>}
                renderTabBar={() => <DfyTabBar tabNames={tabNames} tabIconNames={tabBarIcon}/>}

                tabBarPosition='bottom'

                onChangeTab={
                    (obj) => {
                        console.log('被选中的tab下标：' + obj.i);
                    }
                }

                onScroll={
                    (position) => {
                        console.log('滑动时的位置：' + position);
                    }
                }
                locked={true}
                initialPage={0}

                prerenderingSiblingsNumber={1}>


                <Message tabLabel="Message" navigator={navigator}/>

                <Video tabLabel="Video" navigator={navigator}/>

                <Picture tabLabel="pic" navigator={navigator}/>

                <Account tabLabel="account" logout={this._logout} navigator={navigator}/>

            </ScrollableTabView>
        )


    }

    _loginOut = () => {
        storage.removeItem('user');

        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: LoginView
            })
        }
    }
}