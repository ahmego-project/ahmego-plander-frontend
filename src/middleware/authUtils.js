/* eslint-disable no-useless-constructor */
class authUtils {
  constructor () {}
  static getBasicToken (username, password) {
    return Buffer.from(username + ':' + password).toString('base64')
  }
  // decode basic token

  // encode jwt token

  // decode jwt token
}

export default authUtils
