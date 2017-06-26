/**
 * Created by pis on 2017/6/21.
 */
import React, {Component} from 'react'
import {View, Text, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import Util from '../../../../../common/Util'

export default class CollectCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkType: true
        }
    }

    render() {
        const {data}=this.props;
        return (
            <View style={styles.container}>
                {this._select()}
                <Image style={styles.imageStyle}
                       source={{uri:data.image}}/>
                <View style={styles.bodyStyle}>
                    <Text style={styles.titleText} numberOfLines={1}>{data.title}</Text>
                    <Text style={styles.textIntro} numberOfLines={1}>{data.intro}</Text>
                </View>
                <Text style={styles.upDateTimeStyle}>{data.upDateTime}</Text>
                <Icon name={'ios-arrow-forward'}
                      size={13}
                      color={Util.color.gray2}
                      style={styles.icon}/>
            </View>
        )
    }

    _select() {
        const {manageType}=this.props;
        const {checkType}=this.state;
        let BGColor = checkType ? Util.color.gray6 : Util.color.brown1;
        if (!manageType) {
            return (
                <TouchableOpacity style={[checks.check,{backgroundColor:BGColor}]} onPress={()=>this._checkPress()}>
                    {this._checkType()}
                </TouchableOpacity>
            )
        }
    }

    _checkPress() {
        const {checkType}=this.state;
        this.setState({
            checkType: !checkType
        });
        this.props.setListLength(this.props.index);
    }

    _checkType() {
        const {checkType}=this.state;
        if (!checkType) {
            return (
                <Icon name={'md-checkmark'}
                      size={14}
                      color={Util.color.whiter}
                />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: Util.size.width,
        borderBottomWidth: 1,
        borderBottomColor: Util.color.gray3
    },
    imageStyle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        resizeMode: 'cover',
        marginLeft: 10,
        marginRight: 10
    },
    bodyStyle: {
        flex: 1,
        height: 50
    },
    titleText: {
        fontSize: 16,
        color: Util.color.black3,
        flex: 1
    },
    textIntro: {
        fontSize: 13,
        color: Util.color.gray2,
        flex: 1
    },
    upDateTimeStyle: {
        fontSize: 12,
        color: Util.color.gray2
    },
    icon: {
        marginRight: 10,
        marginLeft: 7
    }
});

const checks = StyleSheet.create({
    check: {
        width: 20,
        height: 20,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Util.color.gray2,
        borderWidth: 1,
        marginLeft: 10
    }
});