export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._userNameObj = document.querySelector(userNameSelector);
    this._userInfoObj = document.querySelector(userInfoSelector);
    this._userAvatarObj = document.querySelector(userAvatarSelector);
    this.userId = 0;
  }
  getUserInfo() {
    return {userName: this._userNameObj.textContent, userInfo: this._userInfoObj.textContent}
  }
  setUserInfo(userName, userInfo, userId) {
    this._userNameObj.textContent = userName;
    this._userInfoObj.textContent = userInfo;
    this.userId = userId;
  }
  setAvatar(avatarSrc) {
    this._userAvatarObj.src = avatarSrc;
  }
  getAvatarSrc() {
    return {link: this._userAvatarObj.src};
  }
}
