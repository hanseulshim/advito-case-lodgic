import merge from 'lodash.merge'
import client from './client'

export default {
	...merge(client)
}
