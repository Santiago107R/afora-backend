import { MigrationInterface, QueryRunner } from "typeorm";

export class MapaUrl1779113376962 implements MigrationInterface {
    name = 'MapaUrl1779113376962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mapa" ADD "url" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mapa" DROP COLUMN "url"`);
    }

}
