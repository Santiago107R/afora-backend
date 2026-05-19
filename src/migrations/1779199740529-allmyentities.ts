import { MigrationInterface, QueryRunner } from "typeorm";

export class Allmyentities1779199740529 implements MigrationInterface {
    name = 'Allmyentities1779199740529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{docente}'`);
        await queryRunner.query(`ALTER TYPE "public"."aula_state_enum" RENAME TO "aula_state_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."aula_state_enum" AS ENUM('available', 'maintenance', 'busy')`);
        await queryRunner.query(`ALTER TABLE "aula" ALTER COLUMN "state" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "aula" ALTER COLUMN "state" TYPE "public"."aula_state_enum" USING "state"::"text"::"public"."aula_state_enum"`);
        await queryRunner.query(`ALTER TABLE "aula" ALTER COLUMN "state" SET DEFAULT 'available'`);
        await queryRunner.query(`DROP TYPE "public"."aula_state_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."aula_state_enum_old" AS ENUM('available', 'unavailable', 'busy')`);
        await queryRunner.query(`ALTER TABLE "aula" ALTER COLUMN "state" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "aula" ALTER COLUMN "state" TYPE "public"."aula_state_enum_old" USING "state"::"text"::"public"."aula_state_enum_old"`);
        await queryRunner.query(`ALTER TABLE "aula" ALTER COLUMN "state" SET DEFAULT 'available'`);
        await queryRunner.query(`DROP TYPE "public"."aula_state_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."aula_state_enum_old" RENAME TO "aula_state_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{user}'`);
    }

}
