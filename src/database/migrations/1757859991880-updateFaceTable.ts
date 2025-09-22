import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFaceTable1757859991880 implements MigrationInterface {
    name = 'UpdateFaceTable1757859991880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`faces\` ADD \`views\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`faces\` DROP COLUMN \`views\``);
    }

}
