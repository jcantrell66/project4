import tokenService from './tokenService';

const BASE_URL = '/api/games/';

export function queryApi(data) {

  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({data}),
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) return res.json()
      throw new Error('Game does not exist, please check your spelling and try again.');
    })
}

export function reloadApi(appId, playerCount, id) {

  return fetch(`${BASE_URL}${appId}`, {
    method: 'POST',
    body: JSON.stringify({playerCount, id}),
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
      }
  })
  .then(res => {
		if(res.ok) return res.json()
		throw new Error('Problem reloading game')
	})
}

export function deleteApi(gameId) {

  return fetch(`${BASE_URL}${gameId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => {
    if(res.ok) return res.json();
    // throw new Error('Error in remove game!')
  });
}

export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => {
		if(res.ok) return res.json()
		throw new Error('Problem Fetching Gel All')
	})	
  }