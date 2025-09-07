import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTrafficAnalysis1757228233697 implements MigrationInterface {
    name = 'CreateTrafficAnalysis1757228233697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`traffic_analysis\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`path\` varchar(512) NOT NULL, \`views\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_b57165f7345ca480e163b816f5\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b57165f7345ca480e163b816f5\` ON \`traffic_analysis\``);
        await queryRunner.query(`DROP TABLE \`traffic_analysis\``);
    }

}
