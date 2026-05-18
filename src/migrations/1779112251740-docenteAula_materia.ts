import { MigrationInterface, QueryRunner } from "typeorm";

export class DocenteAulaMateria1779112251740 implements MigrationInterface {
    name = 'DocenteAulaMateria1779112251740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "docente_aula" ADD "materiaId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "docente_aula" ADD CONSTRAINT "FK_3647e19754f854111cfd79688c0" FOREIGN KEY ("materiaId") REFERENCES "materia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "docente_aula" DROP CONSTRAINT "FK_3647e19754f854111cfd79688c0"`);
        await queryRunner.query(`ALTER TABLE "docente_aula" DROP COLUMN "materiaId"`);
    }

}
