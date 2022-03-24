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

# Set working directory // Heroku expects the working direcotry to be /usr/src/app
WORKDIR /
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:14.18.3 AS installer

WORKDIR /
COPY --from=builder /out/json/ .
COPY --from=builder /out/yarn.lock ./yarn.lock
RUN yarn install

FROM node:14.18.3 AS sourcer

WORKDIR /
COPY --from=installer / .
COPY --from=builder /out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build test --scope=server --include-dependencies --no-deps 