# COMS Showcase Frontend

This is the Showcase frontend. It implements a Vue frontend with Keycloak authentication support. It calls an associated COMS instance for object storage usage.

## Configuration

The Showcase frontend will require some configuration. We will need to configure the application to authenticate using the same Keycloak realm as the COMS instance. Configuration is served from the backend. See the parent readme  [parent App readme](../README.md) for details on config.

## Super Quickstart

Ensure that you have filled in all the appropriate configurations following [../config/custom-environment-variables.json](../config/custom-environment-variables.json) before proceeding.

### Project setup

``` sh
npm install
```

### Compiles and hot-reloads for development

``` sh
npm run serve
```

### Compiles and minifies for production

``` sh
npm run build
```

### Run your unit tests

``` sh
npm run test:unit
```

### Lints and fixes files

``` sh
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
