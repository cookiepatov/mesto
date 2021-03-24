export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._userNameObj = document.querySelector(userNameSelector);
    this._userInfoObj = document.querySelector(userInfoSelector);
  }
  getUserInfo() {
    return {userName: this._userNameObj.textContent, userInfo: this._userInfoObj.textContent}
  }
  setUserInfo(userName, userInfo) {
    this._userNameObj.textContent = userName;
    this._userInfoObj.textContent = userInfo;
  }
}
