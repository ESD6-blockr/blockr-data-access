import { Container } from "inversify";
import {IDatabase, LevelDB, MongoDB } from "../Databases";

/**
 * Composition root
 * This file holds the dependancy registration
 */
const DIContainer = new Container();
DIContainer.bind<IDatabase>(MongoDB).toSelf();
DIContainer.bind<IDatabase>(LevelDB).toSelf();

export default DIContainer;
