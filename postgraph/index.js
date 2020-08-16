const express = require("express");
const { postgraphile } = require("postgraphile");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector")
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const { default: PostgisPlugin } = require('@graphile/postgis');
const ConnectionFilterPostgisPlugin = require('postgraphile-plugin-connection-filter-postgis');
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');
const PgManyToManyPlugin = require("@graphile-contrib/pg-many-to-many");

const app = express();

const plugins = [
  PgSimplifyInflectorPlugin,
  ConnectionFilterPlugin,
  PostgisPlugin,
  ConnectionFilterPostgisPlugin,
  PostGraphileNestedMutations,
  PgManyToManyPlugin
];

app.use(
  postgraphile(
    "postgres://postgres@localhost:5432/course-weekly",
    ["article", "author"],
    {
      subscriptions: true,
      watchPg: true,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      ignoreIndexes: true,
      showErrorStack: true,
      extendedErrors: [
        'severity',
        'code',
        'detail',
        'hint',
        'position',
        'internalPosition',
        'internalQuery',
        'where',
        'schema',
        'table',
        'column',
        'dataType',
        'constraint',
        'file',
        'line',
        'routine'
      ],
      appendPlugins: plugins,
      exportGqlSchemaPath: "schema.graphql",
      graphiql: true,
      enhanceGraphiql: true,
      allowExplain(req) {
        // TODO: customise condition!
        return true;
      },
      enableQueryBatching: true,
      legacyRelations: "omit",
      pgSettings(req) {
        /* TODO */
      },
    })
);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`listening on port: ${port} `)
});
