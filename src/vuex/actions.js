// 修改用户登录状态为已经登录
export const isLogin = ({dispatch}) => {
	dispatch('ISLOGIN');
}
/**
  *设置用户的登录信息
  *参数 name用户名 avatar用户头像 id用户id accesstoken用户登录标识
**/
export const setUserInfo = ({dispatch}, name, avatar, id, accesstoken) => {
	dispatch('SETUSERINFO', name, avatar, id, accesstoken);
}
/**
  *设置弹框组件tips的提示内容
  *
**/
export const setTipContent = ({dispatch}, content) => {
	dispatch('SETTIPCONTENT', content);
}
/*
 *设置tip弹窗组件的显示隐藏状态
 */ 
export const setTipShow = ({dispatch}, status) => {
	dispatch('SETTIPSHOW', status);
}
/*
 *设置未读消息的次数
 */ 
 export const setNotMessageCount = ({dispatch}, count) => {
 	dispatch('SETNOTMESSAGECOUNT', count);
 }