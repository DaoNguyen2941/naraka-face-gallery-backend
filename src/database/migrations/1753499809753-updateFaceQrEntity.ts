import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFaceQrEntity1753499809753 implements MigrationInterface {
    name = 'UpdateFaceQrEntity1753499809753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`faces\` DROP FOREIGN KEY \`FK_0b83fa6c141094e0fc776b2d894\``);
        await queryRunner.query(`DROP INDEX \`REL_0b83fa6c141094e0fc776b2d89\` ON \`faces\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP COLUMN \`image_id\``);
        await queryRunner.query(`ALTER TABLE \`files\` ADD \`face_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD \`qrCodeCN_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD UNIQUE INDEX \`IDX_d5bff4dbf3246d8a1407151767\` (\`qrCodeCN_id\`)`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD \`qrCodeGlobals_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD UNIQUE INDEX \`IDX_7d354cc052cde439abab98c239\` (\`qrCodeGlobals_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d5bff4dbf3246d8a1407151767\` ON \`faces\` (\`qrCodeCN_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7d354cc052cde439abab98c239\` ON \`faces\` (\`qrCodeGlobals_id\`)`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_10a5e89de990fd6c32462bc108a\` FOREIGN KEY (\`face_id\`) REFERENCES \`faces\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD CONSTRAINT \`FK_d5bff4dbf3246d8a14071517678\` FOREIGN KEY (\`qrCodeCN_id\`) REFERENCES \`files\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD CONSTRAINT \`FK_7d354cc052cde439abab98c239e\` FOREIGN KEY (\`qrCodeGlobals_id\`) REFERENCES \`files\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`faces\` DROP FOREIGN KEY \`FK_7d354cc052cde439abab98c239e\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP FOREIGN KEY \`FK_d5bff4dbf3246d8a14071517678\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_10a5e89de990fd6c32462bc108a\``);
        await queryRunner.query(`DROP INDEX \`REL_7d354cc052cde439abab98c239\` ON \`faces\``);
        await queryRunner.query(`DROP INDEX \`REL_d5bff4dbf3246d8a1407151767\` ON \`faces\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP INDEX \`IDX_7d354cc052cde439abab98c239\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP COLUMN \`qrCodeGlobals_id\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP INDEX \`IDX_d5bff4dbf3246d8a1407151767\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP COLUMN \`qrCodeCN_id\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP COLUMN \`face_id\``);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD \`image_id\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0b83fa6c141094e0fc776b2d89\` ON \`faces\` (\`image_id\`)`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD CONSTRAINT \`FK_0b83fa6c141094e0fc776b2d894\` FOREIGN KEY (\`image_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
