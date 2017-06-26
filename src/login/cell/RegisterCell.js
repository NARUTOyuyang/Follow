/**
 * Created by pis on 2017/6/7.
 */
import React, {Component} from 'react'
import {TextInput, View, Text, StyleSheet, Alert} from 'react-native'

export default class RegisterCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: ''
        }
    }

    render() {
        const {data, index}=this.props;
        const tmpKey = index === 0 ? 'numeric' : 'default';
        return (
            <View style={styles.itemView}>
                <Text style={styles.textStyle}>{data.title}</Text>
                <TextInput style={styles.textInputView}
                           placeholder={data.hint}
                           keyboardType={tmpKey}
                           underlineColorAndroid={'transparent'}
                           placeholderTextColor={'#fff'}
                           multiline={false}
                           secureTextEntry={index !== 0}
                           onBlur={() => this._onBlur()}
                           textAlign="center"
                           onChange={(text) => {
                               this.setState({
                                   phoneNumber: text.nativeEvent.text
                               });
                               this.props.callBack(this.state.phoneNumber)
                           }}/>
            </View>
        )
    }

    _onBlur() {
        // if (!(/^1[34578]\d{9}$/.test(this.state.tmpName))) {
        //     Alert.alert('手机号码错误', '你输入的是一个无效的手机号码', [{text: '确定'}])
        // }
    }
}

const styles = StyleSheet.create({
    itemView: {
        height: 50,
        width: 300,
        borderRadius: 5,
        backgroundColor: 'rgba(128,128,128,0.5)',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 15,
        color: '#3DBFFB',
        marginLeft: 7,
        marginRight: 10,
        fontWeight: 'bold'
    },
    textInputView: {
        flex: 1,
        fontSize: 15,
        textAlignVertical: 'center',
        color: '#3DBFFB',
        fontWeight: 'bold'
    }
});