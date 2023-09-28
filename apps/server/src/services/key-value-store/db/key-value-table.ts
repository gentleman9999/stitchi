import { PrismaClient } from '@prisma/client'

export const table = (db: PrismaClient) => db.keyValue
export type KeyValueTable = ReturnType<typeof table>
