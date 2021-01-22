"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = __importDefault(require("./entities"));
const database_config_module_1 = require("./config/database-config.module");
const database_config_service_1 = require("./config/database-config.service");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [database_config_module_1.DatabaseConfigModule],
                useFactory: (databaseConfigService) => {
                    const config = databaseConfigService.getConfig();
                    return Object.assign({ type: 'postgres', entities: entities_1.default }, config);
                },
                inject: [database_config_service_1.DatabaseConfigService],
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map