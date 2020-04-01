import history from './history'
import moment from 'moment'

export const formatDate = date => {
	return date ? moment(date).format('MMMM DD, YYYY') : ''
}

export const getToken = () => {
	if (localStorage.getItem('advito-user')) {
		const { sessionToken } = JSON.parse(localStorage.getItem('advito-user'))
		return sessionToken
	} else return ''
}

export const getUser = () => {
	if (localStorage.getItem('advito-user')) {
		const user = JSON.parse(localStorage.getItem('advito-user'))
		return { ...user }
	} else {
		return {}
	}
}

export const updateUserName = displayName => {
	if (localStorage.getItem('advito-user')) {
		const user = JSON.parse(localStorage.getItem('advito-user'))
		user.displayName = displayName
		localStorage.setItem('advito-user', JSON.stringify(user))
	}
}

export const setUser = user => {
	if (localStorage.getItem('advito-user')) {
		localStorage.removeItem('advito-user')
	}
	localStorage.setItem('advito-user', JSON.stringify(user))
}

export const removeUser = () => {
	localStorage.removeItem('advito-user')
	history.push('/login')
}

export const getApi = () => {
	const REACT_APP_STAGE = process.env.REACT_APP_STAGE
	return REACT_APP_STAGE === 'dev'
		? 'https://y0md40ljt5.execute-api.us-east-2.amazonaws.com/dev/graphql'
		: REACT_APP_STAGE === 'staging'
		? 'https://xsq8e72w5m.execute-api.us-east-2.amazonaws.com/staging/graphql'
		: REACT_APP_STAGE === 'production'
		? 'https://otnrpe76ni.execute-api.us-east-2.amazonaws.com/production/graphql'
		: 'http://localhost:4000/local/graphql'
}

export const getAuthApi = () => {
	const REACT_APP_STAGE = process.env.REACT_APP_STAGE
	return REACT_APP_STAGE === 'dev'
		? 'https://mv3ohvxam8.execute-api.us-east-2.amazonaws.com/dev/graphql'
		: REACT_APP_STAGE === 'staging'
		? 'https://sewnh0p54a.execute-api.us-east-2.amazonaws.com/staging/graphql'
		: REACT_APP_STAGE === 'production'
		? 'https://lkkkz4lxwc.execute-api.us-east-2.amazonaws.com/production/graphql'
		: 'http://localhost:8080/local/graphql'
}
