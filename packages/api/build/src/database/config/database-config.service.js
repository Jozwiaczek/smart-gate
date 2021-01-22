"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfigService = void 0;
const common_1 = require("@nestjs/common");
let DatabaseConfigService = class DatabaseConfigService {
    getConfig() {
        return this.validateConfig({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: process.env.ENV !== 'production',
            logging: process.env.ENV === 'production',
        });
    }
    validateConfig(config) {
        if (config.host === undefined)
            throw new Error('Empty database host');
        if (config.port === undefined)
            throw new Error('Empty database port');
        if (config.username === undefined)
            throw new Error('Empty database username');
        if (config.password === undefined)
            throw new Error('Empty database password');
        if (config.database === undefined)
            throw new Error('Empty database database');
        if (config.synchronize === undefined)
            throw new Error('Empty database synchronize');
        if (config.logging === undefined)
            throw new Error('Empty database logging');
        return config;
    }
};
DatabaseConfigService = __decorate([
    common_1.Injectable()
], DatabaseConfigService);
exports.DatabaseConfigService = DatabaseConfigService;
//# sourceMappingURL=database-config.service.js.map