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

FROM node:14.18.3 AS pruner

# Set working directory 
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=server --docker

FROM base AS dev-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

FROM base AS prod-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=dev-deps /app/${YARN_CACHE_FOLDER} /${YARN_CACHE_FOLDER} 
RUN yarn install --frozen-lockfile --production --prefer-offline --ignore-scripts
RUN rm -rf /app/${YARN_CACHE_FOLDER}

FROM base AS builder
COPY --from=dev-deps /app/ .
COPY --from=pruner /app/out/full/ .
RUN yarn turbo run build --scope=${SCOPE} --include-dependencies --no-deps
RUN find . -name node_modules | xargs rm -rf

FROM base AS runner
COPY --from=prod-deps /app/ .
COPY --from=builder /app/ .
CMD yarn workspace ${SCOPE} start