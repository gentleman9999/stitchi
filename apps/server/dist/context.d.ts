import { PrismaClient } from '@prisma/client';
import { ManagementClient } from 'auth0';
import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
export interface Context {
    prisma: PrismaClient;
    auth0: ManagementClient;
    membershipId?: string;
    userId?: string;
    organizationId?: string;
}
declare const _default: {
    makeDefaultContext: () => ContextFunction<ExpressContext, object>;
};
export default _default;
//# sourceMappingURL=context.d.ts.map