/**
 * Created by pis on 2017/6/5.
 */
import {Dimensions} from 'react-native'
import Color from './Color'
import {FetchUrl, PostHeader} from './FetchConfig'
import {hintText, messageType, ActivityType} from './Dictionary'

module.exports = {
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    color: Color,

    fetchConfig: FetchUrl.loginUrl,

    hintText: hintText,

    messageType: messageType,

    ActivityType: ActivityType
};