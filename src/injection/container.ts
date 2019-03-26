import { Container } from "inversify";
import * as Mongo from "mongodb";
import { IClient, LevelDB, MongoDB } from "../clients";

/**
 * Composition root
 * This file holds the dependancy registration
 */
const DIContainer = new Container();
DIContainer.bind<IClient<Mongo.Db>>(MongoDB).toSelf();
DIContainer.bind<IClient<void>>(LevelDB).toSelf();

export default DIContainer;
