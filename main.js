(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},t=Array.from(document.querySelectorAll(e.formSelector)),n=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__add-button"),o=document.querySelector(".profile__avatar-button"),i={userNameSelector:".profile__name",userInfoSelector:".profile__description",userAvatarSelector:".profile__avatar-image"},u={formSelectors:[".popup__input_type_name",".popup__input_type_data"],newDataKeys:["userName","userInfo"]},a={formSelectors:[".popup__input_type_data"],newDataKeys:["link"]},s={baseUrl:"https://mesto.nomoreparties.co/v1/cohort-22",headers:{authorization:"175f949a-57a4-4e41-845e-76eb0a4e61c1","Content-Type":"application/json"}};function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t,n){var r=t.name,o=t.link,i=t.likes,u=t._id,a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],l=arguments.length>4?arguments[4]:void 0,f=arguments.length>5?arguments[5]:void 0,p=arguments.length>6?arguments[6]:void 0;c(this,e),this._name=r,this._link=o,this._likes=i,this._selector=n,this._handleCardClick=l,this._handleDeleteCard=f,this._handleLikeClick=p,this._cardOwnerIsCurrent=a,this._id=u,this.isLiked=s}var t,n;return t=e,(n=[{key:"createCard",value:function(){this._newCard=this._getCardFromTemplate(),this._likeCounter=this._newCard.querySelector(".element__like-counter"),this._deleteButton=this._newCard.querySelector(".element__delete-button"),this._likeButton=this._newCard.querySelector(".element__like-button");var e=this._newCard.querySelector(".element__picture");return!this._cardOwnerIsCurrent&&this._deleteButton.classList.add("element__delete-button_hidden"),this.isLiked&&this._likeButton.classList.add("element__like-button_active"),e.src=this._link,e.alt=this._name,this._likeCounter.textContent=this._likes.length,this._newCard.querySelector(".element__text").textContent=this._name,this._setEventListeners(),this._newCard}},{key:"_getCardFromTemplate",value:function(){return document.querySelector(this._selector).content.cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this,t=this._newCard.querySelector(".element__picture-button");this._likeButton.addEventListener("click",(function(){return e._handleLikeClick(e._id)})),this._deleteButton.addEventListener("click",(function(t){return e._handleDeleteCard(t.target.closest(".element"),e._id)})),t.addEventListener("click",(function(){return e._handleCardClick(e._link,e._name)}))}},{key:"_handleLike",value:function(){this.classList.toggle("element__like-button_active")}},{key:"toggleLike",value:function(e){this.isLiked=!this.isLiked,this._likeButton.classList.toggle("element__like-button_active"),this._likeCounter.textContent=e}}])&&l(t.prototype,n),e}();function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var h=function(){function e(t,n){var r=t.inputSelector,o=t.submitButtonSelector,i=t.inputErrorClass,u=t.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._inputSelector=r,this._submitButtonSelector=o,this._inputErrorClass=i,this._errorClass=u,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._button=this._formElement.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._validateInput(t),e._validateForm(e._inputList)}))}))}},{key:"_validateInput",value:function(e){var t=e.validity.valid,n=this._formElement.querySelector(".".concat(e.id,"-error")),r=e.validationMessage;t?this._hideErrorMessage(e,n):this._showErrorMessage(e,n,r)}},{key:"_validateForm",value:function(e){var t=e.map((function(e){return e.validity.valid})).every((function(e){return!0===e}));this._setFormState(t)}},{key:"_setFormState",value:function(e){e?this._enableButton(this._button):this._disableButton(this._button)}},{key:"_showErrorMessage",value:function(e,t,n){e.classList.add(this._inputErrorClass),t.classList.add(this._errorClass),t.textContent=n}},{key:"_hideErrorMessage",value:function(e,t){e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_enableButton",value:function(e){e.disabled=!1}},{key:"_disableButton",value:function(e){e.disabled=!0}}])&&p(t.prototype,n),e}();function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var d=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.append(e)}},{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e.addItem(e._renderer(t))}))}}])&&_(t.prototype,n),e}();function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._body=document.querySelector(".body")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),this._body.classList.add("no-scroll"),this.escapeHandler=this._handleEscClose.bind(this),document.addEventListener("keydown",this.escapeHandler)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),this._body.classList.remove("no-scroll"),document.removeEventListener("keydown",this.escapeHandler)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("pointerdown",(function(t){return e._overlayClick(t)})),this._popup.querySelector(".popup__close-button").addEventListener("click",(function(){return e.close()}))}},{key:"_overlayClick",value:function(e){e.target.classList.contains("popup")&&this.close()}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}}])&&y(t.prototype,n),e}();function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(e,t,n){return(k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function w(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._submitForm=t,n._body=document.querySelector(".body"),n._formInputs=n._popup.querySelectorAll(".popup__input"),n._button=n._popup.querySelector(".popup__button"),n._buttonText=n._button.textContent,n}return t=u,(n=[{key:"close",value:function(){k(C(u.prototype),"close",this).call(this),this._clearValues()}},{key:"setEventListeners",value:function(){var e=this;k(C(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){return e._submitForm(t,e._getInputValues())}))}},{key:"setValues",value:function(e,t){var n=this;t.formSelectors.forEach((function(r,o){n._popup.querySelector(r).value=e[t.newDataKeys[o]]}))}},{key:"setLoading",value:function(){var e=this,t=[".","..","..."],n=0;this._interval=setInterval((function(){e._button.textContent="Сохранение"+t[n],n=2===n?0:n+1}),500)}},{key:"setLoaded",value:function(){this._button.textContent=this._buttonText,clearInterval(this._interval)}},{key:"_clearValues",value:function(){this._formInputs.forEach((function(e){e.value=""}))}},{key:"_getInputValues",value:function(){return Array.from(this._formInputs).map((function(e){return e.value}))}}])&&m(t.prototype,n),u}(v);function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(e,t,n){return(L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e,t){return!t||"object"!==E(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._body=document.querySelector(".body"),t._popupImage=t._popup.querySelector(".popup__full-picture"),t._popupCaption=t._popup.querySelector(".popup__picture-title"),t}return t=u,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;L(P(u.prototype),"open",this).call(this),this._popupImage.src=n,this._popupCaption.textContent=t}}])&&O(t.prototype,n),u}(v);function q(e){return(q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(e,t,n){return(A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=U(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function B(e,t){return!t||"object"!==q(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function U(e){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var D=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=U(r);if(o){var n=U(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return B(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._deleteCard=t,n._deleteBtn=n._popup.querySelector(".popup__button"),n._buttonText=n._deleteBtn.textContent,n}return t=u,(n=[{key:"setEventListeners",value:function(){var e=this;A(U(u.prototype),"setEventListeners",this).call(this),this._deleteBtn.addEventListener("click",(function(t){return e._deleteCard(t,e._object,e._id)}))}},{key:"open",value:function(e,t){A(U(u.prototype),"open",this).call(this),this._object=e,this._id=t}},{key:"setLoading",value:function(){var e=this,t=[".","..","..."],n=0;this._interval=setInterval((function(){e._deleteBtn.textContent="Сохранение"+t[n],n=2===n?0:n+1}),500)}},{key:"setLoaded",value:function(){this._deleteBtn.textContent=this._buttonText,clearInterval(this._interval)}}])&&x(t.prototype,n),u}(v);function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var z=function(){function e(t){var n=t.userNameSelector,r=t.userInfoSelector,o=t.userAvatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userNameObj=document.querySelector(n),this._userInfoObj=document.querySelector(r),this._userAvatarObj=document.querySelector(o),this.userId=0}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{userName:this._userNameObj.textContent,userInfo:this._userInfoObj.textContent}}},{key:"setUserInfo",value:function(e,t,n){this._userNameObj.textContent=e,this._userInfoObj.textContent=t,this.userId=n}},{key:"setAvatar",value:function(e){this._userAvatarObj.src=e}},{key:"getAvatarSrc",value:function(){return{link:this._userAvatarObj.src}}}])&&N(t.prototype,n),e}();function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var F=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._token=t.headers.authorization,this._contentType=t.headers["Content-Type"]}var t,n;return t=e,(n=[{key:"getInitialCards",value:function(){return fetch(this._baseUrl+"/cards",{headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"getUserInfo",value:function(){return fetch(this._baseUrl+"/users/me",{headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setUserInfo",value:function(e,t){return fetch(this._baseUrl+"/users/me",{method:"PATCH",headers:{authorization:this._token,"Content-Type":this._contentType},body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setUserAvatar",value:function(e){return console.log(e),fetch(this._baseUrl+"/users/me/avatar",{method:"PATCH",headers:{authorization:this._token,"Content-Type":this._contentType},body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addNewCard",value:function(e,t){return fetch(this._baseUrl+"/cards",{method:"POST",headers:{authorization:this._token,"Content-Type":this._contentType},body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCard",value:function(e){return fetch(this._baseUrl+"/cards/"+e,{method:"DELETE",headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"likeCard",value:function(e){return fetch(this._baseUrl+"/cards/likes/"+e,{method:"PUT",headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"dislikeCard",value:function(e){return fetch(this._baseUrl+"/cards/likes/"+e,{method:"DELETE",headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}])&&V(t.prototype,n),e}();function M(e){return function(e){if(Array.isArray(e))return H(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}!function(){var c;t.forEach((function(t){new h(e,t).enableValidation()})),document.documentElement.style.setProperty("--scrollbar-width",window.innerWidth-document.documentElement.clientWidth+"px");var l=new z(i),p=new F(s);function _(e){var t=e.owner._id===l.userId,n=e.likes.find((function(e){return e._id===l.userId})),r=new f(e,"#card-template",t,n,(function(){m.open(e)}),(function(e,t){y.open(e,t)}),(function(e){r.isLiked?p.dislikeCard(e).then((function(e){r.toggleLike(e.likes.length)})).catch(console.log):p.likeCard(e).then((function(e){r.toggleLike(e.likes.length)})).catch(console.log)}));return r.createCard()}p.getUserInfo().then((function(e){l.setAvatar(e.avatar),l.setUserInfo(e.name,e.about,e._id),p.getInitialCards().then((function(e){(c=new d({items:e,renderer:function(e){return _(e)}},".elements")).renderItems()})).catch(console.log)})).catch(console.log);var y=new D(".popup_type_delete_confirm",(function(e,t,n){e.preventDefault(),y.setLoading(),p.deleteCard(n).then((function(){t.remove(),y.close()})).catch(console.log).finally((function(){y.setLoaded()}))}));y.setEventListeners();var v=new S(".popup_type_profile",(function(e,t){e.preventDefault(),v.setLoading(),p.setUserInfo.apply(p,M(t)).then((function(e){l.setUserInfo(e.name,e.about),v.close()})).catch(console.log).finally((function(){v.setLoaded()}))}));v.setEventListeners();var b=new S(".popup_type_card",(function(e,t){e.preventDefault(),b.setLoading(),p.addNewCard.apply(p,M(t)).then((function(e){c.addItem(_(e)),b.close()})).catch(console.log).finally((function(){b.setLoaded()}))}));b.setEventListeners();var m=new T(".popup_type_full-view");m.setEventListeners();var k=new S(".popup_type_avatar",(function(e,t){e.preventDefault(),k.setLoading(),p.setUserAvatar.apply(p,M(t)).then((function(e){l.setAvatar(e.avatar),k.close()})).catch(console.log).finally((function(){k.setLoaded()}))}));k.setEventListeners(),r.addEventListener("click",(function(){b.open()})),o.addEventListener("click",(function(){k.setValues(l.getAvatarSrc(),a),k.open()})),n.addEventListener("click",(function(){v.open(),v.setValues(l.getUserInfo(),u)}))}()})();