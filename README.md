# blockr-data-access `TypeScript`

|**CI**|**SonarQube**|**Version**|
|:-:|:-:|:-:|
|[![Build Status](https://jenkins.naebers.me/buildStatus/icon?job=Blockr%2Fblockr-data-access%2Fmaster)](https://jenkins.naebers.me/job/Blockr/job/blockr-data-access/job/master/)|[![Quality Gate Status](https://sonarqube.naebers.me/api/project_badges/measure?project=blockr-data-access&metric=alert_status)](https://sonarqube.naebers.me/dashboard?id=blockr-data-access)|[![npm](https://img.shields.io/npm/v/@blockr/blockr-data-access.svg)](https://www.npmjs.com/package/@blockr/blockr-data-access)|

The data access layer can be consumed either by `dependency injection` or normal construction.

## Dependency injection

This library uses `inversify-js` as its dependency injection library. This means the consuming project is required to do the same. The data access layer has two dependencies: `DataSource` and `Configuration` that either need to be injected or constructed.

|Name|Type|
|-|-|
|`DataSource`|`Enum`|
|`Configuration`|`IClientConfiguration`|

### Example:

*container*
```ts
DIContainer.bind<DataAccessLayer>(DataAccessLayer).toSelf().inTransientScope();

DIContainer.bind<DataSource>("DataSource").toConstantValue(DataSource.MONGO_DB);
DIContainer.bind<IClientConfiguration>("Configuration")
    .toConstantValue(new MongoDbConfiguration("connection string", "database"));
```

*consumer (typically a service)*
```ts
class MainService {
    private dataAccessLayer: DataAccessLayer;

    constructor(@inject(DataAccessLayer) dataAccessLayer: DataAccessLayer) {
        this.dataAccessLayer = dataAccessLayer;
    }
}
```

## Normal construction

### Example:

*consumer (typically a service)*
```ts
class MainService {
    private dataAccessLayer: DataAccessLayer;

    constructor() {
        this.dataAccessLayer = new DataAccessLayer(
            DataSource.MONGO_DB,
            new MongoDbConfiguration("connection string", "database")
        );
    }
}
```