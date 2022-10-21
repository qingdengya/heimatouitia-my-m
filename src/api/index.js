import { login, sendSms, getUserInfo, addfollowed, cancelfollowed } from './user'
import { getUserChannels } from './home'
import { getAeticleList, getAeticleById, addCollect, clearCollect } from './aeticle'
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
export const getAeticleByIdAPI = getAeticleById

// 取消用户关注
export const cancelfollowedAPI = cancelfollowed
// 关注用户 
export const addfollowedAPI = addfollowed
// 添加收藏
export const addCollectAPI = addCollect
// 取消收藏
export const clearCollectAPI = clearCollect