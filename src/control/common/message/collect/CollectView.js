/**
 * Created by pis on 2017/6/21.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native'

import HeadBar from '../../../../common/HeadBar'
import Util from '../../../../common/Util'
import CollectCell from './cell/CollectCell'

export default class CollectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manageType: true,
            listData: [
                {image: 'timgone', title: '阳少小老弟', intro: '开心的说说教学和技术的结合', upDateTime: '16小时之前'},
                {image: 'timgtwo', title: 'IT 界的段子手', intro: '人生阅历和技术的结合', upDateTime: '2天之前'}
            ],
            deleteListData: [],
            index: 0,
            allCheckType: 0
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title={'我的订阅'}
                         navigator={this.props.navigator}
                         onRightPress={()=>this._rightPress()}
                         rightView={()=>this._rightView()}/>
                <ScrollView style={styles.container}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='handled'>
                    {this.state.listData.map((v, i) => {

                        return (
                            <CollectCell data={v}
                                              key={`key_${i}`}
                                              index={i}
                                              manageType={this.state.manageType}
                                              setListLength={(index)=>this._setListLength(index)}
                                              arrIndex={this.state.index}
                                              deleteListData={this.state.deleteListData}
                                              allCheckType={this.state.allCheckType}
                            />
                        )
                    })}
                </ScrollView>
                {this._footerView()}
            </View>
        )
    }

    _rightPress() {
        this.setState({
            manageType: !this.state.manageType
        })
    }

    _rightView() {
        let tmpText = this.state.manageType ? '管理' : '取消';
        return (
            <Text style={{fontSize:18,color:Util.color.whiter}}>{tmpText}</Text>
        )
    }

    _footerView() {
        const {manageType, deleteListData, listData}=this.state;
        let allCheckText = listData.length > deleteListData.length ? '全选' : '取消全选';
        if (!manageType) {
            return (
                <View style={footerStyle.container}>
                    <Text style={footerStyle.checkText} onPress={()=>this._allCheck()}>{allCheckText}</Text>
                    <View style={footerStyle.linerStyle}/>
                    {this._cancelTextType()}
                </View>
            )
        }
    }

    _allCheck() {
        const {manageType, deleteListData, listData}=this.state;
        if (listData.length > deleteListData.length) {
            this.setState({
                allCheckType: 1,
                deleteListData: listData
            })
        } else {
            this.setState({
                allCheckType: 0,
                deleteListData: []
            })
        }
    }

    _setListLength(index) {
        const {deleteListData}=this.state;
        let tmpListData = deleteListData ? deleteListData : [];
        let tmpIndex = tmpListData.indexOf(index);
        if (tmpIndex >= 0) {
            tmpListData.splice(tmpIndex, 1)
        } else {
            tmpListData.push(index)
        }
        this.setState({
            deleteListData: tmpListData,
            index: index
        })
    }

    _cancelTextType() {
        const {deleteListData}=this.state;
        let listLength = deleteListData.length;
        if (this.state.allCheckType || listLength > 0) {
            return <Text style={[footerStyle.checkText,{color:Util.color.red1}]}
                         onPress={()=>this._cancel()}>{'取消订阅' + '(' + listLength
            + ')'}</Text>
        } else {
            return (
                <Text style={[footerStyle.checkText,{color:Util.color.gray5}]}>取消订阅</Text>
            )
        }
    }

    _cancel() {
        const {index, listData}=this.state;
        let tmpDeleteData = [];
        for (let i = 0; i < listData.length; i++) {
            if (i != index) {
                tmpDeleteData.push(listData[i])
            }
        }
        console.log(tmpDeleteData);
        this.setState({
            listData: tmpDeleteData,
            deleteListData: []
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Util.color.gray6
    }
});

const footerStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        width: Util.size.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkText: {
        color: Util.color.black3,
        fontSize: 16,
        flex: 1,
        textAlign: 'center'
    },
    linerStyle: {
        height: 30,
        width: 0.5,
        borderColor: Util.color.gray6,
        borderWidth: 0.5
    }
});