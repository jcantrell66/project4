import tokenService from './tokenService';

const BASE_URL = '/api/games/';

export function queryApi(data) {
  console.log(data, '<= create api')
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({data}),
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      // Valid login if we have a status of 2xx (res.ok)
      // console.log(res)
      // console.log(res.json())
      if (res.ok) return res.json()
      throw new Error('Bad Bad Bad!');
    })
}



// export default {
//     getStats
// };