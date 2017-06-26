/**
 * Created by pis on 2017/6/14.
 */
import React, {Component} from 'react'
import {Image, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'

import Util from '../../../../common/Util'

import TalkView from '../TalkView'
import EpisodeView from '../EpisodeView'
import ArticleView from '../ArticleView'
import TechnologyView from '../TechnologyView'

export default class DataListCell extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {rowData, rowId}=this.props;

        let typeColor;
        let typeText;
        switch (rowData.type) {
            case 0:
                typeColor = Util.messageType.文章.color;
                typeText = Util.messageType.文章.value;
                break;
            case 1:
                typeColor = Util.messageType.说说.color;
                typeText = Util.messageType.说说.value;
                break;
            case 2:
                typeColor = Util.messageType.段子.color;
                typeText = Util.messageType.段子.value;
                break;
            case 3:
                typeColor = Util.messageType.技术.color;
                typeText = Util.messageType.技术.value;
                break;
        }

        return (
            <TouchableOpacity style={styles.container}
                              onPress={this._onPress}>
                <Image source={{uri:rowData.image}}
                       style={styles.imageStyle}/>
                <View style={styles.textBodyView}>
                    <Text style={styles.titleText} numberOfLines={1}>{rowData.title}</Text>
                    <ScrollView style={{flex:1}}>
                        <Text style={styles.textBody}>{rowData.textBody}</Text>
                    </ScrollView>
                    <View style={styles.footerView}>
                        <Text style={styles.timeStyle}>{rowData.time}</Text>
                        <Text style={styles.readStyle} numberOfLines={1}>{rowData.read}</Text>

                        <View style={[styles.typeView,{borderColor:typeColor}]}>
                            <Text style={[styles.typeText,{color:typeColor}]}>{typeText}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        const {rowData, navigator}=this.props;

        let messageNextType;
        switch (rowData.type) {
            case 0:
                messageNextType = ArticleView;
                break;
            case 1:
                messageNextType = TalkView;
                break;
            case 2:
                messageNextType = EpisodeView;
                break;
            case 3:
                messageNextType = TechnologyView;
                break;
        }

        if (navigator) {
            navigator.push({
                component: messageNextType
            })
        }
    };
}

const styles = StyleSheet.create({
    container: {
        width: Util.size.width - 10,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Util.color.gray4,
        marginTop: 5,
        alignItems: 'center',
    },
    imageStyle: {
        height: 90,
        width: 120,
        marginRight: 5,
        marginLeft: 5
    },
    textBodyView: {
        flex: 1,
        height: 90,
        marginRight: 10
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Util.color.black3
    },
    textBody: {
        fontSize: 14,
        color: Util.color.gray2,
        marginTop: 5,
        marginBottom: 5
    },
    footerView: {
        flexDirection: 'row'
    },
    timeStyle: {
        fontSize: 14,
        color: Util.color.gray2,
        marginRight: 10
    },
    readStyle: {
        fontSize: 14,
        color: Util.color.yellow1,
        flex: 1
    },
    typeView: {
        height: 20,
        width: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    typeText: {
        fontSize: 14
    }
});