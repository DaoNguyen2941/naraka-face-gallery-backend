import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnalyticsFaceViews1757167377502 implements MigrationInterface {
    name = 'CreateAnalyticsFaceViews1757167377502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`createdBy\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`updatedBy\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`slug\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD UNIQUE INDEX \`IDX_610d63439b67f089f4616cc8b5\` (\`slug\`)`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP INDEX \`IDX_610d63439b67f089f4616cc8b5\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP COLUMN \`createdAt\``);
    }

}
