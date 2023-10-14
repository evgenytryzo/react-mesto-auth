const BASE_URL = 'https://auth.nomoreparties.co'

const Auth = (password, email, endpointRegister) => {
	return fetch(`${BASE_URL}${endpointRegister}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password, email }),
	}).then(checkResponse)
}

function checkResponse(res) {
	if (res.ok) {
		return res.json()
	}
	return res.json().then(err => Promise.reject({ ...err, status: res.status }))
}

export default Auth
