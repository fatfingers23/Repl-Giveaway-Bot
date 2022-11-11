import type { Client } from 'better-replit-db';
import type { Giveaway } from '../models/Giveaway';
export default class GiveawayService {
    protected dbClient: Client;
    constructor(dbClient?: null);
    createGiveaway(giveaway: Giveaway): Promise<Giveaway>;
}
//# sourceMappingURL=giveawayService.d.ts.map