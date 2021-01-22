export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
}
export declare class DatabaseConfigService {
    getConfig(): DatabaseConfig;
    private validateConfig;
}
