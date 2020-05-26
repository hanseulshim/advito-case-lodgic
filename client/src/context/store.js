import React, { createContext, useReducer } from 'react'

import initialState from './initialState'

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'setIngestionContext':
				return {
					...state,
					clientId: action.value.inputs.clientId,
					dateRange: action.value.inputs.dateRange
				}
			case 'setFilters':
				return {
					...state,
					filters: {
						...action.value
					}
				}
			case 'clearContext':
				return {
					...initialState
				}
			default:
				throw new Error()
		}
	}, initialState)

	return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
