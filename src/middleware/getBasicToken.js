/* eslint-disable */
class getBasicToken {
    constructor() {}
    static getToken(username, password) {
        return Buffer.from(username + ':' + password).toString('base64')
    }
}

export default getBasicToken