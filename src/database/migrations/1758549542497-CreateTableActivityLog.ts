import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableActivityLog1758549542497 implements MigrationInterface {
    name = 'CreateTableActivityLog1758549542497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`activity_logs\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`module\` varchar(100) NOT NULL, \`action\` varchar(50) NOT NULL, \`description\` text NULL, \`metadata\` json NULL, \`ip_address\` varchar(45) NULL, \`user_agent\` text NULL, \`admin_id\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_68fea39332d3e30a7c7554b41d\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_7d5e508f23ded985fe17a7153c5\` FOREIGN KEY (\`admin_id\`) REFERENCES \`admins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_7d5e508f23ded985fe17a7153c5\``);
        await queryRunner.query(`DROP INDEX \`IDX_68fea39332d3e30a7c7554b41d\` ON \`activity_logs\``);
        await queryRunner.query(`DROP TABLE \`activity_logs\``);
    }

}
