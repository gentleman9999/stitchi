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

FROM node:14.18.3 AS builder

# Set working directory
WORKDIR /usr/src/app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:14.18.3 AS installer

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/yarn.lock ./yarn.lock
RUN yarn install

FROM node:14.18.3 AS sourcer

WORKDIR /usr/src/app
COPY --from=installer /usr/src/app/ .
COPY --from=builder /usr/src/app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build test --scope=server --include-dependencies --no-deps 
