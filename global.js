/**
 * Created by pis on 2017/6/12.
 */
import {AsyncStorage} from 'react-native'

import {AppInfo} from './src/common/Dictionary'

global.storage = AsyncStorage;
global.AppId = AppInfo.AppID;