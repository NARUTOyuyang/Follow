/**
 * Created by pis on 2017/6/9.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    RefreshControl,
    ListView,
    Animated,
    Easing,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'

import {BlurView, VibrancyView} from 'react-native-blur'
import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer'

import Util from '../../../common/Util'

import DataListCell from './cell/DataListCell'
import InformationModuleCell from './cell/InformationModuleCell'
import MyActivity from './MyActivity'
import DownLoadView from './download/DownLoadView'
import SubscriptionView from './subscription/SubscriptionView'
import CollectView from './collect/CollectView'
import IndentView from './indent/IndentView'
import SetView from './set/SetView'

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            animatedValue: new Animated.Value(0),
            dataSourceRefreshing: false,
            dataList: [
                {
                    title: '阳少小老弟的说说教学', image: 'timgtwo', time: '30 分钟前', read: '200 万阅',
                    textBody: '最新最热最有' +
                    '趣的说说教学，你有理由不点开看吗？',
                    type: 1
                },
                {
                    title: '阳少小老弟的 React Native 开发教学',
                    image: 'timgthree',
                    time: '1 天前',
                    read: '300 万阅',
                    textBody: '让小老弟' +
                    '手把手带你 RN 开发',
                    type: 3
                },
                {
                    title: '为什么看不到我', image: 'timgfour', time: '3 天前', read: '30 万阅',
                    textBody: '我站在你面前，你却看不见我...',
                    type: 0
                },
                {
                    title: '看破不说破',
                    image: 'timgone',
                    time: '06-13',
                    read: '100 万阅',
                    textBody: '匆匆忙忙，却看不见自己最纯净的心，忘了当初为何要扬帆起航！',
                    type: 0
                },
                {
                    title: '阳少小老弟的 React Native 开发教学',
                    image: 'timgthree',
                    time: '1 天前',
                    read: '300 万阅',
                    textBody: '让小老弟' +
                    '手把手带你 RN 开发',
                    type: 3
                },
                {
                    title: '阳少小老弟的 React Native 开发教学',
                    image: 'timgthree',
                    time: '1 天前',
                    read: '300 万阅',
                    textBody: '让小老弟' +
                    '手把手带你 RN 开发',
                    type: 3
                },
            ],
            dataListLength: 0,
            headType: false,
            showModalType: false
        };
        this.listHeight = 0;
        this.listMoveHeight = 0;
    }

    componentDidMount() {

        this._animatedValue();

        const {dataSource, dataList}=this.state;
        this.setState({
            dataSource: dataSource.cloneWithRows(dataList),
            dataListLength: dataList.length
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
            <Drawer type="static"
                    content={this._renderDate()}
                    side='left'
                    openDrawerOffset={0.3}
                    acceptTap={true}
                    acceptDoubleTap={true}
                    disabled={false}
                    ref={ref => this.Drawer = ref}>
                {this._modalCell()}
                <View style={{flex:1}}>
                    <ScrollView showsVerticalScrollIndicator={false}
                                onContentSizeChange={(contentWidth,contentHeight)=>{
                               this.listHeight=contentHeight;
                               console.log(this.listHeight);
                                }}
                                onScroll={(e)=>{
                                this.listMoveHeight=e.nativeEvent.contentOffset.y;
                                this._newData();
                                if(this.listMoveHeight>126){
                                    this.setState({
                                        headType:true
                                    })
                                }else {
                                    this.setState({
                                        headType:false
                                    })}
                                }}
                                scrollEventThrottle={16}
                                style={{backgroundColor:Util.color.gray6}}>
                        {this._headMessage()}
                        {this._tabBar()}
                        {this._messageCell()}
                    </ScrollView>
                    {this._refreshControl()}
                    {this._headBGStyle()}
                    {this._headViewType()}
                    {this._findIcon()}
                </View>
            </Drawer>
        )
    }

    _renderDate() {
        return (
            <Image style={drawer.BGImage}
                   source={{uri:'jepen'}}>
                <BlurView blurAmount={5}
                          blurType='light'
                          style={drawer.container}>
                    <View style={drawer.headView}>
                        <TouchableOpacity style={drawer.headImageView}>
                            <Image style={drawer.headImage}
                                   source={{uri:'ms_df_head'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={drawer.informationView} onPress={()=>this._showModalCell()}>
                            <Icon
                                name={'ios-contacts'}
                                size={30}
                                color={Util.color.blue3}/>
                            <Text style={drawer.informationText}>我的名片</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={drawer.informationNameView}>
                        <Text style={drawer.nameText}>IT 界的段子手</Text>
                        {this._sexType()}
                    </View>
                    <Text style={drawer.signature}>
                        stay hungry stay foolish !
                    </Text>
                    <View style={drawer.lineStyle}/>

                    <TouchableOpacity style={drawer.activityView} onPress={()=>this._myActivity()}>
                        <View style={drawer.iconVIewStyle}>
                            <Icon name={'md-megaphone'}
                                  size={25}
                                  color={Util.color.black3}/>
                        </View>
                        <Text style={drawer.ItemText}>我的动态</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={drawer.activityView} onPress={()=>this._download()}>
                        <View style={drawer.iconVIewStyle}>
                            <Icon name={'md-cloud-download'}
                                  size={25}
                                  color={Util.color.black3}/>
                        </View>
                        <Text style={drawer.ItemText}>我的下载</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={drawer.activityView} onPress={()=>this._subscriptionView()}>
                        <View style={drawer.iconVIewStyle}>
                            <Icon name={'ios-bookmark'}
                                  size={25}
                                  color={Util.color.black3}/>
                        </View>
                        <Text style={drawer.ItemText}>我的订阅</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={drawer.activityView} onPress={()=>this._collectView()}>
                        <View style={drawer.iconVIewStyle}>
                            <Icon name={'md-star-half'}
                                  size={25}
                                  color={Util.color.black3}/>
                        </View>
                        <Text style={drawer.ItemText}>我的收藏</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={drawer.activityView} onPress={()=>this._indentView()}>
                        <View style={drawer.iconVIewStyle}>
                            <Icon name={'logo-usd'}
                                  size={25}
                                  color={Util.color.black3}/>
                        </View>
                        <Text style={drawer.ItemText}>我的订单</Text>
                    </TouchableOpacity>

                    <View style={{flex:1}}/>
                    <TouchableOpacity style={[drawer.activityView,{marginBottom:20}]} onPress={()=>this._setting()}>
                        <View style={drawer.iconVIewStyle}>
                            <Icon name={'md-settings'}
                                  size={25}
                                  color={Util.color.black3}/>
                        </View>
                        <Text style={drawer.ItemText}>设置</Text>
                    </TouchableOpacity>
                </BlurView>
            </Image>
        )
    }

    _modalCell() {
        return (
            <InformationModuleCell showModalType={this.state.showModalType}/>
        )
    }

    _showModalCell() {
        this.Drawer.close();
        this.setState({
            showModalType: true
        })
    }

    _myActivity() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: MyActivity
            })
        }
    }

    _download() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: DownLoadView
            })
        }
    }

    _subscriptionView() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: SubscriptionView
            })
        }
    }

    _collectView() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: CollectView
            })
        }
    }

    _indentView() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: IndentView
            })
        }
    }

    _setting() {
        const {navigator}=this.props;
        if (navigator) {
            navigator.push({
                component: SetView
            })
        }
    }

    _sexType() {

        // todo girl : md-female
        return (
            <View style={drawer.sexType}>
                <Icon name={'md-male'}
                      size={15}
                      color={Util.color.whiter}/>
                <Text style={drawer.ageText}>22</Text>
            </View>
        )
    }

    _refreshControl() {
        const {animatedValue}=this.state;

        const textSize = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [13, 18, 13]
        });

        if (this.listMoveHeight < -20) {
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

    _headBGStyle() {
        const {headType}=this.state;
        if (headType) {
            return (
                <Image style={styles.headViewStyle}
                       source={{uri:'timgone'}}>
                    <BlurView blurAmount={5}
                              blurType='light'
                              style={styles.obscure}>
                        <Text style={styles.messageHeadTitle}>精彩资讯</Text>
                    </BlurView>
                </Image>
            )
        }
    }

    _headViewType() {
        if (this.listMoveHeight > -20) {
            return (
                <TouchableOpacity style={styles.headPortraitView} onPress={()=>this._myInformation()}>
                    <Image style={styles.headPortrait}
                           source={{uri:'ms_df_head'}}/>
                </TouchableOpacity>
            )
        }
    }

    _myInformation() {
        this.Drawer.open();
    };

    _findIcon() {
        if (this.listMoveHeight > -20) {
            return (
                <TouchableOpacity style={styles.iconStyle} onPress={()=>this._Fined()}>
                    <Icon
                        name={'ios-search'} // 图标
                        size={16}
                        color={Util.color.yellow1}/>
                </TouchableOpacity>
            )
        }

    }

    _Fined() {

    }

    _headMessage() {
        return (
            <View style={styles.headView}>
                <Image style={styles.headImage}
                       source={{uri:'timgone'}}>
                </Image>
            </View>
        )
    }

    _tabBar() {

    }

    _messageCell() {
        const {dataSource}=this.state;
        return (
            <ListView dataSource={dataSource}
                      style={styles.listViewStyle}
                      contentContainerStyle={{alignItems:'center'}}
                      renderRow={(rowData,sectionId,rowId)=>this._renderRow(rowData,sectionId,rowId)}
                      onEndReachedThreshold={20}
                      onEndReached={() => this._dataOneReached()}
                      renderFooter={() => this._dataOneRenderFooter()}
                      enableEmptySections={true}
            />
        )
    }

    _renderRow(rowData, sectionId, rowId) {
        return (
            <DataListCell rowData={rowData}
                          rowId={rowId}
                          navigator={this.props.navigator}
            />
        )
    }

    _newData() {
        // todo 下拉刷新是调的接口
    }

    _dataOneReached() {

    }

    _dataOneRenderFooter() {
        const {dataListLength}=this.state;
        return (
            <View style={FootView.scrollSpinner}>
                <Text style={{
                    textAlign: 'center',
                    color: '#bbbbbb',
                    flex: 1
                }}>{`数据加载完成,共 ${dataListLength} 条`}</Text>
            </View>
        );
    }
}

const drawer = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Util.color.backgroundColor0
    },
    BGImage: {
        flex: 1,
    },
    headView: {
        width: Util.size.width * 0.7,
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headImageView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Util.color.yellow1,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headImage: {
        height: 48,
        width: 48,
        borderRadius: 24,
        resizeMode: 'cover'
    },
    informationView: {
        height: 50,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    informationText: {
        fontSize: 14,
        color: Util.color.blue2
    },
    informationNameView: {
        alignItems: 'center',
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 5
    },
    sexType: {
        width: 40,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: Util.color.blue1,
        borderRadius: 5,
        flexDirection: 'row'
    },
    ageText: {
        fontSize: 14,
        color: Util.color.whiter,
        fontWeight: 'bold',
        marginLeft: 2
    },
    nameText: {
        color: Util.color.black3,
        fontSize: 15
    },
    signature: {
        fontSize: 14,
        color: Util.color.black4,
        marginLeft: 20,
        marginTop: 5
    },
    lineStyle: {
        marginLeft: 20,
        backgroundColor: Util.color.whiter,
        height: 0.5,
        marginTop: 8
    },
    activityView: {
        marginLeft: 20,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ItemText: {
        fontSize: 16,
        color: Util.color.black3,
        marginLeft: 20
    },
    iconVIewStyle: {
        width: 30
    }
});

const refresh = StyleSheet.create({
    refreshView: {
        position: 'absolute',
        width: Util.size.width,
        height: 60,
        alignItems: 'center',
        marginTop: 0
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

const styles = StyleSheet.create({
    headView: {
        width: Util.size.width,
        height: 180,
    },
    headImage: {
        width: Util.size.width,
        height: 180,
        resizeMode: 'stretch'
    },
    listViewStyle: {
        flex: 1,
        backgroundColor: Util.color.gray6,
    },
    headPortraitView: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Util.color.yellow1,
        position: 'absolute',
        marginTop: 25,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headPortrait: {
        width: 28,
        height: 28,
        borderRadius: 14,
        resizeMode: 'cover'
    },
    headViewStyle: {
        width: Util.size.width,
        height: 55,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0
    },
    headPortraitViewTwo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Util.color.yellow1,
        marginTop: 25,
        marginLeft: 15,
    },
    obscure: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Util.size.width,
        height: 55
    },
    messageHeadTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 25,
        color: Util.color.blue1
    },
    iconStyle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: Util.color.black5,
        position: 'absolute',
        marginTop: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Util.size.width - 43
    }
});

const FootView = StyleSheet.create({
    scrollSpinner: {
        flex: 1,
        alignSelf: 'center',
    }
});