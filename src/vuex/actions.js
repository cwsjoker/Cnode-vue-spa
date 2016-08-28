export const isLogin = ({dispatch}) => {
	dispatch('ISLOGIN');
}

export const setUserInfo = ({dispatch}, name, avatar, id, accesstoken) => {
	dispatch('SETUSERINFO', name, avatar, id, accesstoken);
}