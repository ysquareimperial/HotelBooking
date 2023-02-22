// export const server_url = 'https://yge.wvi.mybluehost.me/knowtify/api'
// export const server_url = 'https://5101-102-89-44-54.eu.ngrok.io/api'
// export const server_url = 'https://hotelbooking-production.up.railway.app/api'
export const server_url = 'https://yge.wvi.mybluehost.me:9090/api'

export const _post = (url, data, success = (f) => f, error = (f) => f) => {
  fetch(`${server_url}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((raw) => raw.json())
    .then((result) => {
      success(result)
    })
    .catch((err) => {
      error(err)
    })
}

export const _get = (url, success = (f) => f, error = (f) => f) => {
  fetch(`${server_url}/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((raw) => raw.json())
    .then((result) => {
      success(result)
    })
    .catch((err) => {
      error(err)
    })
}

export const _put = (url, data, success = (f) => f, error = (f) => f) => {
  fetch(`${server_url}/${url}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((raw) => raw.json())
    .then((result) => {
      success(result)
    })
    .catch((err) => {
      error(err)
    })
}
