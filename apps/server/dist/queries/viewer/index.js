"use strict";
exports.__esModule = true;
exports.viewer = void 0;
var nexus_1 = require("nexus");
exports.viewer = (0, nexus_1.queryField)('viewer', {
    type: 'Membership',
    resolve: function (_, __, ctx) {
        if (!ctx.membershipId || !ctx.userId)
            return null;
        return ctx.prisma.membership.findFirst({
            where: { id: ctx.membershipId }
        });
    }
});
//# sourceMappingURL=index.js.map