import { Container } from "inversify";
import * as Mongo from "mongodb";
import { IClient, LevelDB, MongoDB } from "../clients";

/**
 * Composition root
 */

/**
 * Dependency container
 */
const DIContainer = new Container();
/**
 * Appsettings file that holds application configurations
 */

// Bind clients
DIContainer.bind<IClient<Mongo.Db>>(MongoDB).toSelf().inTransientScope();
DIContainer.bind<IClient<void>>(LevelDB).toSelf().inTransientScope();

export default DIContainer;
