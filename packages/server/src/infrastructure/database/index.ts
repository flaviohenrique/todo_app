import { join } from "path";
import { readJson } from "fs-extra";
import { createConnection, Connection, ConnectionOptions } from "typeorm";

export const getConnectionConfig = async (): Promise<ConnectionOptions> => {
  const config: ConnectionOptions = await readJson(
    join(process.cwd(), "src/infrastructure/configs/ormconfig.json")
  );

  if (!config) {
    throw Error("Connection Not Found");
  }
  return Promise.resolve<ConnectionOptions>(config);
};

export const withConnection = async (): Promise<Connection> => {
  const options = await getConnectionConfig()

  return createConnection(options)
}
