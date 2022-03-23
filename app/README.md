# COMS Showcase Application Backend

COMS Showcase (Common Object Management Service Showcase) Backend at this point is only intended to serve the [frontend](frontend) showcase application and it's configuration. Future uses of the backend API could be to demo service-service level COMS integration, or to hold any other necessary secrets or keys for showcase functionality. For the user-authenticated COMS use cases, the front end will call an associated COMS instance directly from the Vue app rather than proxying through this backend.

## Configuration

The API will contain the configuration that the front end uses. This will include links to the COMS instance and Keycloak configuration for the front end. We will need to configure the front end to authenticate with the same realm as the associated COMS instance. A typical frontend authentication flow Keycloak client with appropraite redirect setup should be made for use with the showcase application.

All configuration for the frontend will come from this backend, fetched by calling a configuration url (/config).

## Super Quickstart

In general, most of these npm run scripts can be prepended with `all:` in order to run the same operation on both the application and the frontend sequentially.

### Local Config Setup

Ensure that you have filled in all the appropriate configurations following [config/custom-environment-variables.json](config/custom-environment-variables.json) before proceeding.

The [config/custom-environment-variables.json](config/custom-environment-variables.json) file provides a complete mapping of ENV variables to the config that the node application will see, and the [config/default.json](config/default.json)default.json provides generic defaults for all non-sensitive config values. If you do a search for `config.get(...)` on the repository, you'll get a sense of how the configuration variables are utilized in this project.

If you are running this on a local machine, you will need to create a `local.json` file in the `config` directory containing the values you want set. For more information on how the config library loads and searches for environment variables, take a look at this article: <https://github.com/lorenwest/node-config/wiki/Configuration-Files>.

At an absolute bare minimum, we recommend that you will want your `local.json` to at least have the following values defined (replacing `REDACTED` with your own values as needed):

``` json
{
  "frontend": {
    "keycloak": {
      "clientId": "REDACTED",
      "realm": "REDACTED",
      "serverUrl": "REDACTED"
    }
  },
  "server": {
    "logLevel": "http",
    "port": "8080"
  }
}
```

### Production Build and Run

``` sh
npm run all:fresh-start
```

### Development Run

``` sh
npm run serve
```

Start a new terminal

``` sh
cd frontend
npm run serve
```

### Run application tests

``` sh
npm run test
```

### Lints and fixes application files

``` sh
npm run lint
npm run lint-fix
```
