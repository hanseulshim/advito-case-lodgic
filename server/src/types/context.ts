import { UserType } from './user'
import Knex from 'knex/types/index'

export type KnexType = Knex<{}, unknown[]>

export type ContextType = {
	user: UserType
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	advito: KnexType
	hotel: KnexType
}
