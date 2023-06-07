export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers.authorization; //token
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization,
                'Content-type': 'aplication/json'
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json()
            }else{
                return Promise.reject(`Ошибка ${res.status}`)
            }})
    }

    deleteCard(cardID) {
        return fetch(`${this._url}/cards/${cardID}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
                'Content-type': 'aplication/json'
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json()
            }else{
                return Promise.reject(`Ошибка ${res.status}`)
            }})
    }
}