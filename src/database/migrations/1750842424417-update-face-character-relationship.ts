import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFaceCharacterRelationship1750842424417 implements MigrationInterface {
    name = 'UpdateFaceCharacterRelationship1750842424417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`characters\` CHANGE \`avatar\` \`avatar_id\` varchar(255) NULL DEFAULT 'https://pub-5c96059ac5534e72b75bf2db6c189f0c.r2.dev/default-avatar.png'`);
        await queryRunner.query(`ALTER TABLE \`admins\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`characters\` DROP COLUMN \`avatar_id\``);
        await queryRunner.query(`ALTER TABLE \`characters\` ADD \`avatar_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`characters\` ADD CONSTRAINT \`FK_1f434f441f252313824be631beb\` FOREIGN KEY (\`avatar_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`characters\` DROP FOREIGN KEY \`FK_1f434f441f252313824be631beb\``);
        await queryRunner.query(`ALTER TABLE \`characters\` DROP COLUMN \`avatar_id\``);
        await queryRunner.query(`ALTER TABLE \`characters\` ADD \`avatar_id\` varchar(255) NULL DEFAULT 'https://pub-5c96059ac5534e72b75bf2db6c189f0c.r2.dev/default-avatar.png'`);
        await queryRunner.query(`ALTER TABLE \`admins\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`characters\` CHANGE \`avatar_id\` \`avatar\` varchar(255) NULL DEFAULT 'https://pub-5c96059ac5534e72b75bf2db6c189f0c.r2.dev/default-avatar.png'`);
    }

}
