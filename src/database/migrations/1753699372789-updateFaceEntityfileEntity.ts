import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFaceEntityfileEntity1753699372789 implements MigrationInterface {
    name = 'UpdateFaceEntityfileEntity1753699372789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`faces\` ADD \`source\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`faces\` DROP COLUMN \`source\``);
    }

}
