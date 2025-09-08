import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnalyticDailyStatus1757348040118 implements MigrationInterface {
    name = 'CreateAnalyticDailyStatus1757348040118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`analytics_daily_stats\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`pageviews\` int NOT NULL DEFAULT '0', \`sessions\` int NOT NULL DEFAULT '0', \`unique_visitors\` int NOT NULL DEFAULT '0', \`new_visitor\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_efaf548762f0f23dab7330e19c\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_efaf548762f0f23dab7330e19c\` ON \`analytics_daily_stats\``);
        await queryRunner.query(`DROP TABLE \`analytics_daily_stats\``);
    }

}
