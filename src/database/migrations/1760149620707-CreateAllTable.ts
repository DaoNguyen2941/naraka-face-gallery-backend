import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTable1760149620707 implements MigrationInterface {
    name = 'CreateAllTable1760149620707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ef5af166ef4f3e44dfc18404e9\` (\`slug\`), UNIQUE INDEX \`IDX_4ba6d0c734d53f8e1b2e24b6c5\` (\`username\`), UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`files\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`type\` varchar(255) NULL, \`size\` int NULL, \`originalName\` varchar(255) NULL, \`usage\` varchar(255) NULL, \`face_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_67434370162217cf583370f0e7\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`characters\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`avatar_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_df9b751251a0aee20739af7d4f\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`file_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_420d9f679d41281f282f5bc7d0\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`faces\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`source\` varchar(255) NULL, \`views\` int NOT NULL DEFAULT '0', \`character_id\` varchar(36) NULL, \`qrCodeCN_id\` varchar(36) NULL, \`qrCodeGlobals_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_d4301e23a24576d15738319eef\` (\`slug\`), UNIQUE INDEX \`REL_d5bff4dbf3246d8a1407151767\` (\`qrCodeCN_id\`), UNIQUE INDEX \`REL_7d354cc052cde439abab98c239\` (\`qrCodeGlobals_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_b3aa10c29ea4e61a830362bd25\` (\`slug\`), UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`traffic_analysis\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`path\` varchar(512) NOT NULL, \`views\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_b57165f7345ca480e163b816f5\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`analytics_face_views\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`face_id\` varchar(255) NOT NULL, \`views\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_610d63439b67f089f4616cc8b5\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity_logs\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`admin_id\` varchar(255) NOT NULL, \`record_id\` varchar(255) NOT NULL, \`module\` varchar(100) NOT NULL, \`action\` varchar(50) NOT NULL, \`description\` text NULL, \`metadata\` json NULL, \`ip_address\` varchar(45) NULL, \`user_agent\` text NULL, UNIQUE INDEX \`IDX_68fea39332d3e30a7c7554b41d\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`analytics_daily_stats\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`pageviews\` int NOT NULL DEFAULT '0', \`sessions\` int NOT NULL DEFAULT '0', \`unique_visitors\` int NOT NULL DEFAULT '0', \`new_visitor\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_efaf548762f0f23dab7330e19c\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions_permission\` (\`roleId\` varchar(36) NOT NULL, \`permissionId\` varchar(36) NOT NULL, INDEX \`IDX_b36cb2e04bc353ca4ede00d87b\` (\`roleId\`), INDEX \`IDX_bfbc9e263d4cea6d7a8c9eb3ad\` (\`permissionId\`), PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`faces_categories_categories\` (\`facesId\` varchar(36) NOT NULL, \`categoriesId\` varchar(36) NOT NULL, INDEX \`IDX_aa7e3ddad3a955f4780f12320e\` (\`facesId\`), INDEX \`IDX_6d58ca77ec5809829506292a30\` (\`categoriesId\`), PRIMARY KEY (\`facesId\`, \`categoriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`faces_tags_tags\` (\`facesId\` varchar(36) NOT NULL, \`tagsId\` varchar(36) NOT NULL, INDEX \`IDX_e6f982056df9a37d22ad031bf4\` (\`facesId\`), INDEX \`IDX_5675b9b2f4289fd867e075deac\` (\`tagsId\`), PRIMARY KEY (\`facesId\`, \`tagsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_10a5e89de990fd6c32462bc108a\` FOREIGN KEY (\`face_id\`) REFERENCES \`faces\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`characters\` ADD CONSTRAINT \`FK_1f434f441f252313824be631beb\` FOREIGN KEY (\`avatar_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_3e25fb3cdffe9f7f48c89cf1de8\` FOREIGN KEY (\`file_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD CONSTRAINT \`FK_d1c4f31ed22e684060cc4c5d820\` FOREIGN KEY (\`character_id\`) REFERENCES \`characters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD CONSTRAINT \`FK_d5bff4dbf3246d8a14071517678\` FOREIGN KEY (\`qrCodeCN_id\`) REFERENCES \`files\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faces\` ADD CONSTRAINT \`FK_7d354cc052cde439abab98c239e\` FOREIGN KEY (\`qrCodeGlobals_id\`) REFERENCES \`files\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` ADD CONSTRAINT \`FK_3415ecf1c747684473715d8d050\` FOREIGN KEY (\`face_id\`) REFERENCES \`faces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_b36cb2e04bc353ca4ede00d87b9\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_bfbc9e263d4cea6d7a8c9eb3ad2\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faces_categories_categories\` ADD CONSTRAINT \`FK_aa7e3ddad3a955f4780f12320e0\` FOREIGN KEY (\`facesId\`) REFERENCES \`faces\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`faces_categories_categories\` ADD CONSTRAINT \`FK_6d58ca77ec5809829506292a307\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faces_tags_tags\` ADD CONSTRAINT \`FK_e6f982056df9a37d22ad031bf4c\` FOREIGN KEY (\`facesId\`) REFERENCES \`faces\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`faces_tags_tags\` ADD CONSTRAINT \`FK_5675b9b2f4289fd867e075deacf\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`faces_tags_tags\` DROP FOREIGN KEY \`FK_5675b9b2f4289fd867e075deacf\``);
        await queryRunner.query(`ALTER TABLE \`faces_tags_tags\` DROP FOREIGN KEY \`FK_e6f982056df9a37d22ad031bf4c\``);
        await queryRunner.query(`ALTER TABLE \`faces_categories_categories\` DROP FOREIGN KEY \`FK_6d58ca77ec5809829506292a307\``);
        await queryRunner.query(`ALTER TABLE \`faces_categories_categories\` DROP FOREIGN KEY \`FK_aa7e3ddad3a955f4780f12320e0\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_bfbc9e263d4cea6d7a8c9eb3ad2\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_b36cb2e04bc353ca4ede00d87b9\``);
        await queryRunner.query(`ALTER TABLE \`analytics_face_views\` DROP FOREIGN KEY \`FK_3415ecf1c747684473715d8d050\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP FOREIGN KEY \`FK_7d354cc052cde439abab98c239e\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP FOREIGN KEY \`FK_d5bff4dbf3246d8a14071517678\``);
        await queryRunner.query(`ALTER TABLE \`faces\` DROP FOREIGN KEY \`FK_d1c4f31ed22e684060cc4c5d820\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_3e25fb3cdffe9f7f48c89cf1de8\``);
        await queryRunner.query(`ALTER TABLE \`characters\` DROP FOREIGN KEY \`FK_1f434f441f252313824be631beb\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_10a5e89de990fd6c32462bc108a\``);
        await queryRunner.query(`DROP INDEX \`IDX_5675b9b2f4289fd867e075deac\` ON \`faces_tags_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_e6f982056df9a37d22ad031bf4\` ON \`faces_tags_tags\``);
        await queryRunner.query(`DROP TABLE \`faces_tags_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d58ca77ec5809829506292a30\` ON \`faces_categories_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa7e3ddad3a955f4780f12320e\` ON \`faces_categories_categories\``);
        await queryRunner.query(`DROP TABLE \`faces_categories_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_bfbc9e263d4cea6d7a8c9eb3ad\` ON \`role_permissions_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_b36cb2e04bc353ca4ede00d87b\` ON \`role_permissions_permission\``);
        await queryRunner.query(`DROP TABLE \`role_permissions_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_efaf548762f0f23dab7330e19c\` ON \`analytics_daily_stats\``);
        await queryRunner.query(`DROP TABLE \`analytics_daily_stats\``);
        await queryRunner.query(`DROP INDEX \`IDX_68fea39332d3e30a7c7554b41d\` ON \`activity_logs\``);
        await queryRunner.query(`DROP TABLE \`activity_logs\``);
        await queryRunner.query(`DROP INDEX \`IDX_610d63439b67f089f4616cc8b5\` ON \`analytics_face_views\``);
        await queryRunner.query(`DROP TABLE \`analytics_face_views\``);
        await queryRunner.query(`DROP INDEX \`IDX_b57165f7345ca480e163b816f5\` ON \`traffic_analysis\``);
        await queryRunner.query(`DROP TABLE \`traffic_analysis\``);
        await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3aa10c29ea4e61a830362bd25\` ON \`tags\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
        await queryRunner.query(`DROP INDEX \`REL_7d354cc052cde439abab98c239\` ON \`faces\``);
        await queryRunner.query(`DROP INDEX \`REL_d5bff4dbf3246d8a1407151767\` ON \`faces\``);
        await queryRunner.query(`DROP INDEX \`IDX_d4301e23a24576d15738319eef\` ON \`faces\``);
        await queryRunner.query(`DROP TABLE \`faces\``);
        await queryRunner.query(`DROP INDEX \`IDX_420d9f679d41281f282f5bc7d0\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_df9b751251a0aee20739af7d4f\` ON \`characters\``);
        await queryRunner.query(`DROP TABLE \`characters\``);
        await queryRunner.query(`DROP INDEX \`IDX_67434370162217cf583370f0e7\` ON \`files\``);
        await queryRunner.query(`DROP TABLE \`files\``);
        await queryRunner.query(`DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ba6d0c734d53f8e1b2e24b6c5\` ON \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef5af166ef4f3e44dfc18404e9\` ON \`admins\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
