import { MigrationInterface, QueryRunner } from "typeorm";

export class FixActivityLogAdminId1758560439982 implements MigrationInterface {
    name = 'FixActivityLogAdminId1758560439982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_7d5e508f23ded985fe17a7153c5\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`admin_id\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`admin_id\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`admin_id\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`admin_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_7d5e508f23ded985fe17a7153c5\` FOREIGN KEY (\`admin_id\`) REFERENCES \`admins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
