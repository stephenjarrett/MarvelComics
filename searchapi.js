const md5 = require('md5');
const rp = require('request-promise');
const apiURL = 'http://gateway.marvel.com/v1/public/';
const apiKey = process.env.API_KEY;
const publicKey = process.env.PUBLIC_KEY;

function searchComicsByCharName(character) {
    let charQuery = character
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `characters?name=${charQuery}&orderBy=name&` + apiAuthenticationString
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let character = JSON.parse(data);
            let charID = character.data.results[0].id;
            let comicData = searchComicsByCharID(charID);
            // console.log(comicData);
            return comicData
            })
        .catch(error => {
            let message = 'character not found';
            return message
        })
}
function searchComicsByCharID(charID) {
    // console.log('running now');
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `characters/${charID}/comics?hasDigitalIssue=true&orderBy=title&limit=10&` + apiAuthenticationString
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            return comics.data.results;
        })
        .catch(error => {
            let message = 'character not found';
            return message
        })
}

function searchAllComics() {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics?' + 'offset=&' + 'limit=20&' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            let results = comics.data.results;
            return results
            })
        .catch((error) => {
            let message = 'there was an error'
            return message
        })
    }
    
function searchAllCharacters() {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'characters?' + 'offset=&' + 'limit=20&' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            let results = comics.data.results;
            return results
        })
        .catch((error) => {
            let message = 'there was an error';
            return message
        })
}

module.exports = {
    searchComicsByCharID,
    searchComicsByCharName,
    searchAllComics,
    searchAllCharacters
}