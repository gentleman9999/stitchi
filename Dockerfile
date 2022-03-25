##
## Marketing App Config
##

# FROM node:14.18.3 AS builder

# # Set working directory
# WORKDIR /app
# RUN yarn global add turbo
# COPY . .
# RUN turbo prune --scope=marketing --docker

# # Add lockfile and package.json's of isolated subworkspace
# FROM node:14.18.3 AS installer

# WORKDIR /app
# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
# RUN yarn install

# FROM node:14.18.3 AS sourcer

# WORKDIR /app
# COPY --from=installer /app/ .
# COPY --from=builder /app/out/full/ .
# COPY .gitignore .gitignore
# RUN yarn turbo run build test --scope=marketing --include-dependencies --no-deps 



##
## Server Config
##

##
## NOTES
##
## Heroku's build context is the same directory as the Dockerfile and this cannot be changed.
## Because we must also leverage `turbo prune` from the root directory, we therefore must specificy the Dockerfile in the root directory as opposed to the app directory.

FROM node:14.18.3 AS base
WORKDIR /app
ENV SCOPE=server
ENV YARN_CACHE_FOLDER=.yarn-cache

FROM base AS pruner
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=server --docker

FROM base as installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install

FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build test --scope=web --include-dependencies --no-deps
