export const getEndpoint = (): string => {
	return process.env.ENVIRONMENT === 'DEV'
		? 'https://y0md40ljt5.execute-api.us-east-2.amazonaws.com/dev/graphql'
		: process.env.ENVIRONMENT === 'STAGING'
		? 'https://xsq8e72w5m.execute-api.us-east-2.amazonaws.com/staging/graphql'
		: process.env.ENVIRONMENT === 'PRODUCTION'
		? 'https://otnrpe76ni.execute-api.us-east-2.amazonaws.com/production/graphql'
		: 'http://localhost:4000/local/graphql'
}
