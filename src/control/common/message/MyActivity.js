/**
 * Created by pis on 2017/6/19.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ListView,
    RefreshControl,
    Animated,
    ActivityIndicator,
    Easing
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import HeadBar from '../../../common/HeadBar'
import Util from '../../../common/Util'
import MyActivityCell from './cell/MyActivityCell'
import PublishView from './PublishView'

export default class MyActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            dataList: [
                {image: 'timgfour', Text: '你是不是傻', time: '6-18', type: 0, day: 0},
                {image: 'timgthree', Text: '别过来', time: '6-16', type: 1, day: 0},
                {image: 'timgone', Text: '不要啊', time: '6-13', type: 1, day: 0},
                {image: 'timgone', Text: '不要啊', time: '6-12', type: 0, day: 0},
            ],
            dataLength: 0,
            refreshing: false,
            animatedValue: new Animated.Value(0),
            refreshType: false
        };
        this.listMoveHeight = 0
    }

    componentDidMount() {

        this._animatedValue();

        const {dataList, dataSource}=this.state;
        this.setState({
            dataSource: dataSource.cloneWithRows(dataList),
            dataLength: dataList.length
        })
    }

    _animatedValue() {
        this.state.animatedValue.setValue(0);
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
        }).start(() => this._animatedValue())
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar title={'我的动态'}
                         navigator={this.props.navigator}/>
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
                <ScrollView onScroll={(e)=>{
                          this.listMoveHeight=e.nativeEvent.contentOffset.y;
                          console.log(this.listMoveHeight);
                          if(this.listMoveHeight<-20){
                              this.setState({
                                  refreshType:true
                              })
                          }else {
                              this.setState({
                                  refreshType:false
                              })
                          }
                          this._newData();
                      }}
                            scrollEventThrottle={16}
                            style={listStyles.listData}>
                    {this._firstCell()}
                    {this._listData()}
                </ScrollView>
                {this._refreshControl()}
            </View>
        )
    }

    _refreshControl() {
        const {animatedValue}=this.state;

        const textSize = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [13, 18, 13]
        });

        if (this.state.refreshType) {
            console.log(this.listMoveHeight + 'sssssss')
            return (
                <View style={refresh.refreshView}>
                    <View style={refresh.loading}>
                        <ActivityIndicator/>
                    </View>
                    <Animated.Text
                        style={[refresh.refreshText,{fontSize:textSize}]}>{Util.hintText.refresh}
                    </Animated.Text>
                </View>
            )
        }
    }

    _firstCell() {
        return (
            <View style={[styles.container,{marginTop:20}]}>
                <View style={styles.hintView}>
                    <View style={styles.timeView}>
                        <Text style={styles.timeText}>今天</Text>
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
                <TouchableOpacity style={styles.bodyView} onPress={()=>this._publish()}>
                    <View style={styles.imageView}>
                        <Icon name={'ios-pricetags'}
                              size={25}
                              color={Util.color.brown1}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _publish() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: PublishView,
                params: {
                    addListData: (data) => this._addListData(data)
                }
            })
        }
    }

    _listData() {
        const {dataSource, refreshing}=this.state;
        return (
            <ListView dataSource={dataSource}
                      style={listStyles.listData}
                      renderRow={(rowData,sectionId,rowId)=>this._renderRow(rowData,sectionId,rowId)}
                      refreshControl={
                          <RefreshControl style={{backgroundColor:'transparent'}}
                              refreshing={refreshing}
                              onRefresh={()=>this._newData()}
                              tintColor={Util.color.blue3}
                              title={Util.hintText.refresh}
                              colors={[Util.color.yellow1,Util.color.blue1,Util.color.gray2]}
                              progressBackgroundColor={Util.color.whiter}
                          />}
                      onEndReachedThreshold={20}
                      onEndReached={()=>this._moreData()}
                      renderFooter={()=>this._dataFooterView()}
                      enableEmptySections={true}
            />
        )
    }


    _renderRow(rowData, sectionId, rowId) {
        return (
            <MyActivityCell rowData={rowData} rowId={rowId} navigator={this.props.navigator}
                            backSetList={(index)=>this._deleteListData(index)}/>
        )
    }

    _deleteListData(index) {
        const {dataList, dataSource}=this.state;
        let tmpListData = [];
        for (let i = 0; i < dataList.length; i++) {
            if (i != index) {
                tmpListData.push(dataList[i])
            }
        }
        this.setState({
            dataSource: dataSource.cloneWithRows(tmpListData),
            dataLength: tmpListData.length,
            dataList: tmpListData
        });
    }

    _addListData(data) {
        const {dataList, dataSource}=this.state;
        let tmpListData = [];
        tmpListData.push(data);
        tmpListData = tmpListData.concat(dataList);
        this.setState({
            dataSource: dataSource.cloneWithRows(tmpListData),
            dataList: tmpListData,
            dataLength: tmpListData.length
        })
    }

    _newData() {

    }

    _moreData() {

    }

    _dataFooterView() {
        const {dataLength}=this.state;
        return (
            <View style={FootView.scrollSpinner}>
                <Text style={{
                    textAlign: 'center',
                    color: '#bbbbbb',
                    flex: 1
                }}>{`数据加载完成,共 ${dataLength} 条`}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headTop: {
        flexDirection: 'row',
        height: 50,
        width: Util.size.width,
        backgroundColor: Util.color.blue1,
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
        color: Util.color.whiter
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
        color: Util.color.whiter,
        flex: 1,
        textAlign: 'auto',
    },

    container: {
        height: 100,
        width: Util.size.width,
        flexDirection: 'row'
    },
    hintView: {
        height: 100,
        width: 70,
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

const listStyles = StyleSheet.create({
    listData: {
        flex: 1,
        backgroundColor: Util.color.gray6
    }
});

const FootView = StyleSheet.create({
    scrollSpinner: {
        flex: 1,
        alignSelf: 'center',
    }
});

const refresh = StyleSheet.create({
    refreshView: {
        position: 'absolute',
        width: Util.size.width,
        height: 60,
        alignItems: 'center',
        marginTop: 114
    },
    refreshText: {
        color: Util.color.black3,
        marginTop: -15
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});