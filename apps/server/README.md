### Deployment

Our app is deployed via a Docker container that is automatically built and pushed by Heroku. Heroku does this by looking in our Dockerfile at the root Stitchi directory. heroku.yml specifies how the build should kick off.

## stitchi-server

# Command Line

```
$ heroku git:remote -a stitchi-server
$ git push heroku [branch-name/main]
```

Docker container registry: registry.heroku.com/stitchi-server/web

# Using Heroku GUI

1. Connect GH account
2. Navigate to (https://dashboard.heroku.com/apps/stitchi-server/deploy)[Deploy]
3. Select the branch you want to deploy.

## stitchi-server-staging

# Command Line

```
$ heroku git:remote -a stitchi-server-staging
$ git push heroku main
```

Docker container registry: registry.heroku.com/stitchi-server-staging/web

# Using Heroku GUI

1. Connect GH account
2. Navigate to (https://dashboard.heroku.com/apps/stitchi-server-staging/deploy)[Deploy]
3. Select the branch you want to deploy.
