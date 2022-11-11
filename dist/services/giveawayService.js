"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("better-replit-db");
class GiveawayService {
    constructor(dbClient = null) {
        Object.defineProperty(this, "dbClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.dbClient = dbClient ?? db;
    }
    async createGiveaway(giveaway) {
        console.log(giveaway);
        await this.dbClient.set(`giveaways:${giveaway.guildId}:${giveaway.messageId}`, giveaway);
        return giveaway;
    }
}
exports.default = GiveawayService;
//# sourceMappingURL=giveawayService.js.map