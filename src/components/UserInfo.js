export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}, wrongImagePlaceHolder) {
    this._userNameObj = document.querySelector(userNameSelector);
    this._userInfoObj = document.querySelector(userInfoSelector);
    this._userAvatarObj = document.querySelector(userAvatarSelector);
    this._wrongImagePlaceHolder = wrongImagePlaceHolder;
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
    this._userAvatar = avatarSrc
    this._userAvatarObj.src = avatarSrc;
    this._userAvatarObj.onerror = ()=>{this._userAvatarObj.src = this._wrongImagePlaceHolder};

  }
  getAvatarSrc() {
    return {link: this._userAvatar};
  }
}
