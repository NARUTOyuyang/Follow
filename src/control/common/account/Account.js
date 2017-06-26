/**
 * Created by pis on 2017/6/9.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Account</Text>
            </View>
        )
    }
}