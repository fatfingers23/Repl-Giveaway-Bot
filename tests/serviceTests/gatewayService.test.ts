import GiveawayService from '../../src/services/giveawayService'
import type { Giveaway } from '../../src/models/Giveaway'
import type { Client } from "@replit/database";
import type { CurrentGiveaway } from "../../src/models/CurrentGiveaway";
import { DateTime } from "luxon";

let MockClient: Client;
let GiveawayClass: GiveawayService;
let testGiveaway: Giveaway;
const isArrayUnique = (arr?: Array<string>) => Array.isArray(arr) && new Set(arr).size === arr.length; // add function to check that array is unique.
beforeEach(() => {
	MockClient = jest.createMockFromModule<Client>('@replit/database')
	GiveawayClass = new GiveawayService(MockClient);
	testGiveaway = {
		winnerIds: [],
		stillRunning: true,
		messageId: '0',
		guildId: '0',
		description: "",
		endTime: DateTime.now(),
		hostId: "123",
		participants: ['5'],
		possibleNumberOfWinners: 1
	};
});


describe("test the give away service", () => {
	it("should be able to create a giveaway", async () => {


		MockClient.pushArray = jest.fn().mockResolvedValue([testGiveaway])
		MockClient.set = jest.fn(() => MockClient);
		let result = await GiveawayClass.createGiveaway(testGiveaway);
		expect(result).toEqual(testGiveaway)
		expect(MockClient.pushArray).toHaveBeenCalledWith(`giveaways:current_giveaways`, { "guildId": '0', "messageId": '0' });
		expect(MockClient.set).toHaveBeenCalledWith(`giveaways:0:0`, testGiveaway);
	})

	it("can add a participant", async () => {
		const mockKey = 'giveaways:0:0';
		let fakeUserId = '123';
		const testAddParticipantGiveaway = {
			winnerIds: [],
			stillRunning: true,
			messageId: '0',
			guildId: '0',
			description: "",
			endTime: DateTime.now(),
			hostId: "123",
			possibleNumberOfWinners: 1
		};
		MockClient.get = jest.fn().mockResolvedValue(testAddParticipantGiveaway);
		MockClient.set = jest.fn().mockResolvedValue(MockClient);
		const result = await GiveawayClass.addAParticipant('0', '0', fakeUserId);
		expect(MockClient.get).toHaveBeenCalledWith(mockKey);
		// expect(MockClient.set).toHaveBeenCalledWith(mockKey, testGiveaway);
		expect(result.participants).toBe(expect.arrayContaining([fakeUserId]))
	})

	it("can select multiple winners", async () => {
		MockClient.set = jest.fn().mockResolvedValue(MockClient);
		MockClient.deleteArrayItemByValue = jest.fn().mockResolvedValue([]);

		let localTestGiveaway: Giveaway = {
			winnerIds: [],
			stillRunning: true,
			messageId: '0',
			guildId: '0',
			description: "",
			endTime: DateTime.now(),
			hostId: "123",
			participants: ['100', '200', '300'],
			possibleNumberOfWinners: 2
		}

		MockClient.get = jest.fn().mockResolvedValue(localTestGiveaway);
		let result = await GiveawayClass.selectAWinner(0, 0);

		expect(result.winnerIds?.length).toEqual(2);
		expect(result.stillRunning).toBe(false);
		const winner = result.winnerIds?.at(0) ?? 0;
		const secondWinner = result.winnerIds?.at(1) ?? 0;
		expect(isArrayUnique(result.winnerIds)).toBeTruthy();
		expect(result.participants).toEqual(expect.not.arrayContaining([winner, secondWinner]));
		expect(result.winnerIds).toEqual(expect.arrayContaining([winner, secondWinner]));

	})

	it("can select a winner", async () => {
		MockClient.set = jest.fn().mockResolvedValue(MockClient);
		MockClient.deleteArrayItemByValue = jest.fn().mockResolvedValue([]);
		testGiveaway.participants = ['1', '2', '3'];
		MockClient.get = jest.fn().mockResolvedValue(testGiveaway);
		let result = await GiveawayClass.selectAWinner(0, 0);
		expect(result.winnerIds?.length).toEqual(1);
		expect(result.stillRunning).toBe(false);
		const winner = result.winnerIds?.at(0) ?? 0;
		expect(result.participants).toEqual(expect.not.arrayContaining([winner]))
		expect(result.winnerIds).toEqual(expect.arrayContaining([winner]))
	})

	it("can re roll a giveaway", async () => {
		const anotherTestGiveaway: Giveaway = {
			winnerIds: ['300'],
			stillRunning: true,
			messageId: '1',
			guildId: '0',
			description: "",
			endTime: DateTime.now(),
			hostId: "123",
			participants: ['100', '200', '400'],
			possibleNumberOfWinners: 1
		};

		MockClient.set = jest.fn().mockResolvedValue(MockClient);
		MockClient.get = jest.fn().mockResolvedValue(anotherTestGiveaway);

		let result = await GiveawayClass.reRollAGiveaway('0', '0');
		expect(result.participants).toEqual(expect.arrayContaining(['300']))
		expect(result.winnerIds).toEqual(expect.not.arrayContaining(['300']))

	});

	it("can display a guild's current giveaways", async () => {
		const anotherTestGiveaway: Giveaway = {
			winnerIds: [],
			stillRunning: true,
			messageId: '1',
			guildId: '1',
			description: "",
			endTime: DateTime.now(),
			hostId: "123",
			participants: ['5'],
			possibleNumberOfWinners: 1
		};

		const testCurrentGiveaways: CurrentGiveaway[] = [
			{ guildId: '0', messageId: '0' },
			{ guildId: '1', messageId: '1' },
			{ guildId: '0', messageId: '3' }
		];
		MockClient.get = jest.fn()
			.mockReturnValueOnce(testCurrentGiveaways)
			.mockReturnValueOnce(testGiveaway)
			.mockReturnValue(anotherTestGiveaway);

		let result = await GiveawayClass.getGuildsCurrentGiveaways('0');
		expect(result).toEqual(expect.arrayContaining([
			expect.objectContaining({ messageId: '1' }),

		]))
		expect(result.length).toBe(2);

	})
})