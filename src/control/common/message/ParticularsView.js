/**
 * Created by pis on 2017/6/19.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Alert} from 'react-native'

import HeadBar from '../../../common/HeadBar'
import Util from '../../../common/Util'

import Icon from 'react-native-vector-icons/Ionicons';

export default class ParticularsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        const {rowId, rowData}=this.props;
        return (
            <View style={{flex:1}}>
                <HeadBar title={'详情'}
                         navigator={this.props.navigator}
                />
                {this._bodyType()}
            </View>
        )
    }

    _bodyType() {
        const {rowData, rowId}=this.props;
        switch (rowData.type) {
            case Util.ActivityType.key_2:
                return (
                    <View style={styles.container}>
                        <TextInput style={styles.textInputStyle}
                                   placeholder={'我有话要说'}
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   placeholderTextColor={Util.color.gray2}
                                   onChangeText={(text)=>{
                                        this.setState({
                                            text:text
                                        })
                                   }}
                                   keyboardType={'default'}
                                   autoCapitalize={'none'}/>
                    </View>
                );
                break;
            case Util.ActivityType.key_0:
            case Util.ActivityType.key_1:
                return (
                    <ScrollView style={styles.scrollViewStyle}>
                        <View style={styles.headTop}>
                            <Image style={styles.imageHead}
                                   source={{uri:'timgone'}}/>
                            <View style={styles.headNameView}>
                                <View style={styles.nameView}>
                                    <Text style={styles.nameText}>IT 界的段子手</Text>
                                    <View style={drawer.sexType}>
                                        <Icon name={'md-male'}
                                              size={13}
                                              color={Util.color.whiter}/>
                                        <Text style={drawer.ageText}>22</Text>
                                    </View>
                                    <View style={styles.labelView}>
                                        <Text style={[drawer.ageText,{marginRight:3}]}>评价的标签</Text>
                                    </View>
                                </View>
                                <Text style={styles.hintText}>stay hungry stay foolish!</Text>
                            </View>
                        </View>
                        {this._bodyViewType()}
                        {this._footerView()}
                    </ScrollView>
                );
                break;
        }
    }

    _bodyViewType() {
        const {rowData}=this.props;
        if (rowData.type == Util.ActivityType.key_1) {
            return (
                <Image style={bodyStyles.imageView}
                       source={{uri:rowData.image}}/>
            )
        } else {
            return (
                <Text style={bodyStyles.textStyle}>{rowData.Text}</Text>
            )
        }
    }

    _footerView() {
        const {rowData}=this.props;
        return (
            <View style={footer.container}>
                <Text style={footer.timeText}>{rowData.time}</Text>
                <View style={footer.rightView}>
                    <Text style={footer.deleteText} onPress={()=>this._deleteFun()}>删除</Text>
                    <TouchableOpacity style={footer.moreStyle}>
                        <Icon name={'ios-more'}
                              size={15}
                              color={Util.color.whiter}
                              style={footer.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _deleteFun() {
        const {navigator, backSetData, rowId}=this.props;
        Alert.alert(
            '提示',
            '确定要删除吗？',
            [
                {text: '取消'},
                {
                    text: '删除', onPress: () => {
                    if (navigator) {
                        navigator.pop()
                    }
                    backSetData(rowId)
                }
                }
            ]
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Util.color.gray6
    },
    textInputStyle: {
        flex: 1,
        fontSize: 14,
        color: Util.color.black3,
        marginLeft: 5
    },
    scrollViewStyle: {
        backgroundColor: Util.color.gray6
    },
    headTop: {
        flexDirection: 'row',
        height: 50,
        width: Util.size.width,
        marginTop: 10
    },
    imageHead: {
        height: 40,
        width: 40,
        borderRadius: 7,
        marginLeft: 20,
        resizeMode: 'cover',
        marginRight: 5
    },
    headNameView: {
        height: 40,
        flex: 1,
        marginLeft: 5
    },
    nameView: {
        flexDirection: 'row'
    },
    nameText: {
        fontSize: 15,
        color: Util.color.black4
    },
    labelView: {
        height: 20,
        backgroundColor: Util.color.brown1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    hintText: {
        fontSize: 13,
        color: Util.color.black4,
        flex: 1,
        textAlign: 'auto',
    }
});

const drawer = StyleSheet.create({
    sexType: {
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: Util.color.blue3,
        borderRadius: 5,
        flexDirection: 'row'
    },
    ageText: {
        fontSize: 13,
        color: Util.color.whiter,
        fontWeight: 'bold',
        marginLeft: 3
    },
});

const bodyStyles = StyleSheet.create({
    imageView: {
        height: 100,
        width: 180,
        marginLeft: 20,
        marginTop: 10,
        resizeMode: 'cover'
    },
    textStyle: {
        fontSize: 13,
        color: Util.color.black3,
        marginLeft: 20,
        marginTop: 10
    }
});

const footer = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Util.size.width,
        marginTop: 20,
        alignItems: 'center'
    },
    timeText: {
        fontSize: 13,
        color: Util.color.gray2,
        marginLeft: 20
    },
    deleteText: {
        fontSize: 13,
        color: Util.color.blue3,
        marginLeft: 10
    },
    rightView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    moreStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Util.color.gray2,
        marginRight: 20,
        borderRadius: 3
    },
    icon: {
        marginRight: 5,
        marginLeft: 5
    }
});