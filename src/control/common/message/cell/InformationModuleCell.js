/**
 * Created by pis on 2017/6/16.
 */

import React, {Component} from 'react'

import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native'

import Util from '../../../../common/Util'

export default class InformationModuleCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'none',
            modalVisible: this.props.showModalType,
            transparent: true
        }
    }

    render() {
        const {animationType, modalVisible, transparent}=this.state;
        console.log(modalVisible)
        return (
            <Modal animationType={animationType}
                   transparent={transparent}
                   visible={modalVisible}
                   onRequestClose={() => this._setModalVisible(false)}>
                <View style={styles.container}>
                    <Text onPress={()=>this._hiddenModalCell()}>hello world</Text>
                </View>
            </Modal>
        )
    }

    _setModalVisible(type) {
        this.setState({
            modalVisible: type
        })
    }

    _hiddenModalCell() {
        this.setState({
            modalVisible: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: 'red'
    }
});

