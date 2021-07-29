import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: "debian-sys-maint",
  password: "cVWsgGzcze3yP3Ec",
  database: "zen",
  autoLoadEntities: true,
  entities: [
    "dist/core/entity/**/*.js"
  ],
  // Only development
  synchronize: true,
}