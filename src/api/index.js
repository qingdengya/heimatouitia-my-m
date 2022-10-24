import { login, sendSms, getUserInfo, addfollowed, cancelfollowed, getUserProfile, updateUserProfile, updateUserPhoto } from './user'
import { getUserChannels } from './home'
import { getAeticleList, getAeticleById, addCollect, clearCollect, clearLikeArticle, addLikeArticle } from './aeticle'
import { getAllChannels, setMyChannels, delMyChannels } from './channels'
import { getSearchSuggestion, loadSearchData } from './search'
import { loadComment, addCommentLike, deleteCommentLike, addComment } from './comment'
export const loginAPI = login
export const sendSmsAPI = sendSms
// 获取用户信息 
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


//取消点赞 文章
export const clearLikeArticleAPI = clearLikeArticle
// 点赞文章
export const addLikeArticleAPI = addLikeArticle

// 评论回复回复模块
export const loadCommentAPI = loadComment


// 评论对回复点赞
export const addCommentLikeAPI = addCommentLike

// 取消对评论回复点赞
export const deleteCommentLikeAPI = deleteCommentLike

// 发布文章评论或评论的回复
export const addCommentAPI = addComment

// 获取用户信息
export const getUserProfileAPI = getUserProfile


// 更新用户信息
export const updateUserProfileAPI = updateUserProfile


// 更新用户照片
export const updateUserPhotoAPI = updateUserPhoto