/**
 * Created by pis on 2017/6/22.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import HeadBar from '../../../../common/HeadBar'
import Util from '../../../../common/Util'
import LoginView from '../../../../login/LoginView'

export default class SetView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmpName: ''
        }
    }

    componentWillMount() {
        storage.getItem('phone')
            .then(
                (phone) => {
                    this.setState({
                        tmpName: phone
                    })
                }
            )
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title='设置'
                         navigator={this.props.navigator}/>
                <ScrollView style={styles.container}>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLine]}>
                        <Text style={styles.itemsText}>绑定大区</Text>
                        <Text style={styles.itemRightText}>hello world</Text>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLineBottom]}>
                        <Text style={styles.itemsText}>绑定手机号码</Text>
                        <Text style={styles.itemRightText}/>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLine]}>
                        <Text style={styles.itemsText}>消息推送设置</Text>
                        <Text style={styles.itemRightText}/>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLineBottom]}>
                        <Text style={styles.itemsText}>隐私设置</Text>
                        <Text style={styles.itemRightText}/>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLineBottom]}>
                        <Text style={styles.itemsText}>省流量</Text>
                        <Text style={styles.itemRightText}>资讯图片自动下载设置</Text>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLineBottom]}>
                        <Text style={styles.itemsText}>清理缓存</Text>
                        <Text style={styles.itemRightText}>18.11 MB</Text>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLine]}>
                        <Text style={styles.itemsText}>关于 APP</Text>
                        <Text style={styles.itemRightText}/>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemsView,styles.itemLineBottom]}>
                        <Text style={styles.itemsText}>意见反馈</Text>
                        <Text style={styles.itemRightText}>官方反馈QQ群:631730313</Text>
                        <Icon name={'ios-arrow-forward'}
                              size={18}
                              color={Util.color.gray2}
                              style={styles.icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signOutView} onPress={()=>this.signOutPress()}>
                        <Text style={styles.signOutText}>{'退出登录' + '(' + this.state.tmpName + ')'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    signOutPress() {
        storage.removeItem('user');
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: LoginView
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Util.color.gray6
    },
    itemsView: {
        height: 45,
        width: Util.size.width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Util.color.gray4
    },
    itemsText: {
        fontSize: 16,
        color: Util.color.black3,
        // fontWeight: 'bold',
        marginLeft: 15
    },
    itemRightText: {
        fontSize: 14,
        color: Util.color.gray2,
        flex: 1,
        textAlign: 'right'
    },
    icon: {
        marginRight: 15,
        marginLeft: 15
    },
    itemLine: {
        marginTop: 16,
        borderTopColor: Util.color.gray3,
        borderTopWidth: 0.5
    },
    linerView: {
        height: 1,
        width: Util.size.width,
        borderColor: Util.color.gray3,
        borderWidth: 0.5,
        marginLeft: 15,
    },
    itemLineBottom: {
        borderBottomColor: Util.color.gray3,
        borderBottomWidth: 0.5,
        marginTop: 1
    },
    signOutView: {
        height: 45,
        width: Util.size.width,
        backgroundColor: Util.color.gray4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    signOutText: {
        fontSize: 16,
        color: Util.color.red1,
        // fontWeight: 'bold'
    }
});
