import { objectType } from "nexus";

export const Organization = objectType({
  name: "Organization",
  definition: (t) => {
    t.nonNull.id("id");
    t.string("name");
    t.field("role", { type: "GlobalRole" });

    t.nonNull.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });

    t.list.field("memberships", {
      type: "Membership",
      resolve: async (organization, _, ctx) => {
        return await ctx.prisma.membership.findMany({
          where: { organizationId: organization.id },
        });
      },
    });
  },
});
