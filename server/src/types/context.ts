import { UserType } from './user'
import Knex from 'knex/types/index'

export type ContextType = {
	user: UserType
	advito: Knex<any, unknown[]>
	hotel: Knex<any, unknown[]>
}
