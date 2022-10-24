
// 评论列表api


import request from "@/utils/request";



// 获取评论列表和回复列表
export const loadComment = (params) => {
  return request({
    url: "/v1_0/comments",
    method: "GET",
    params
  })
}





// 对评论或评论回复点赞
export const addCommentLike = (target) => {
  return request({
    url: "/v1_0/comment/likings",
    method: "POST",
    data: {
      target
    }
  })
}
//取消对评论或评论回复点赞
export const deleteCommentLike = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: "DELETE",

  })
}



// 发布文章评论或评论的回复

export const addComment = (data) => {
  return request({
    url: `/v1_0/comments`,
    method: "POST",
    data
  })
}