/**
 * Created by pis on 2017/6/19.
 */
import React, {Component} from 'react'
import {Image, TouchableOpacity, Text, StyleSheet, View} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import Util from '../../../../common/Util'
import ParticularsView from '../ParticularsView'

export default class MyActivityCell extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {rowData, rowId}=this.props;
        let tmpTime = rowData.day == 1 ? '' : rowData.time;
        if (rowData.type == Util.ActivityType.key_0) {
            return (
                <View style={[styles.container_0,{marginTop:0}]}>
                    <View style={styles.hintView_0}>
                        <View style={styles.timeView}>
                            <Text style={styles.timeText}>{tmpTime}</Text>
                            <View style={styles.hintImage}>
                                <Icon name={'ios-pricetags'}
                                      size={12}
                                      color={Util.color.whiter}/>
                            </View>
                        </View>
                        <View style={styles.otherView}>
                            <View style={styles.lineLeftView}/>
                            <View style={styles.lineRight}/>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bodyView} onPress={()=>this._particulars()}>
                        <Text style={styles.titleText}>{rowData.Text}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={[styles.container,{marginTop:0}]}>
                <View style={styles.hintView}>
                    <View style={styles.timeView}>
                        <Text style={styles.timeText}>{tmpTime}</Text>
                        <View style={styles.hintImage}>
                            <Icon name={'ios-pricetags'}
                                  size={12}
                                  color={Util.color.whiter}/>
                        </View>
                    </View>
                    <View style={styles.otherView}>
                        <View style={styles.lineLeftView}/>
                        <View style={styles.lineRight}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.bodyView} onPress={()=>this._particulars()}>
                    <Image style={styles.imageView}
                           source={{uri:rowData.image}}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }

    _particulars() {
        const {navigator, rowData, rowId}=this.props;
        if (navigator) {
            navigator.push({
                component: ParticularsView,
                params: {
                    rowData: rowData,
                    rowId: rowId,
                    backSetData: (rowId) => this.props.backSetList(rowId),
                }
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: Util.size.width,
        flexDirection: 'row'
    },
    container_0: {
        height: 70,
        width: Util.size.width,
        flexDirection: 'row'
    },
    hintView: {
        height: 100,
        width: 70,
    },
    hintView_0: {
        height: 70,
        width: 70
    },
    timeView: {
        width: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        color: Util.color.black4,
        fontSize: 13,
        marginRight: 5,
        flex: 1,
        textAlign: 'right'
    },
    hintImage: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Util.color.blue3
    },
    otherView: {
        flex: 1,
        flexDirection: 'row'
    },
    lineLeftView: {
        flex: 1
    },
    lineRight: {
        width: 11,
        borderLeftColor: Util.color.gray3,
        borderLeftWidth: 2
    },
    bodyView: {
        flex: 1
    },
    imageView: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Util.color.gray5,
        marginLeft: 7,
        borderRadius: 3
    },
    titleText: {
        fontSize: 13,
        color: Util.color.black4,
        marginLeft: 5,
        marginTop: 3.5
    }
});