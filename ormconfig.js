const production = process.env.NODE_ENV === "production";

module.exports = {
  type: process.env.DB_DRIVER || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "typeorm",
  entities: production ? ["dist/entity/**/*.js"] : ["src/entity/**/*.ts"],
  logging: !production,
  synchronize: true,
  cli: {
    entitiesDir: production ? "dist/entity" : "src/entity"
  }
};
