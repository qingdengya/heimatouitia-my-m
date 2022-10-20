import { login, sendSms, getUserInfo } from './user'
import { getUserChannels } from './home'
import { getAeticleList } from './aeticle'
import { getAllChannels, setMyChannels, delMyChannels } from './channels'
import { getSearchSuggestion, loadSearchData } from './search'

export const loginAPI = login
export const sendSmsAPI = sendSms
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getAeticleListAPI = getAeticleList
// 获取所有频道列表
export const getAllChannelsAPI = getAllChannels
// 设置用户的频道
export const setMyChannelsAPI = setMyChannels
export const delMyChannelsAPI = delMyChannels
// 搜索建议
export const getSearchSuggestionAPI = getSearchSuggestion
// 搜索结果
export const loadSearchDataAPI = loadSearchData
