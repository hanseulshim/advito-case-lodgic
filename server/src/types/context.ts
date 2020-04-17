import { UserType } from './user'
import Knex from 'knex/types/index'

export type ContextType = {
	user: UserType
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	advito: Knex<any, unknown[]>
	hotel: Knex<any, unknown[]>
}
