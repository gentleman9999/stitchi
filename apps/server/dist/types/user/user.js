"use strict";
exports.__esModule = true;
exports.User = void 0;
var nexus_1 = require("nexus");
exports.User = (0, nexus_1.objectType)({
    name: 'User',
    definition: function (t) {
        t.string('email');
        t.boolean('emailVerified');
        t.string('username');
        t.string('phoneNumber');
        t.boolean('phoneVerified');
        t.string('userId');
        t.field('createdAt', { type: 'DateTime' });
        t.field('updatedAt', { type: 'DateTime' });
        t.string('picture');
        t.string('name');
        t.string('nickname');
        t.field('lastLogin', { type: 'DateTime' });
        t.int('loginsCount');
        t.string('givenName');
        t.string('familyName');
    }
});
//# sourceMappingURL=user.js.map