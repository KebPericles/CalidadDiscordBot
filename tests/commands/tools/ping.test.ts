import { CacheType, ChatInputCommandInteraction, Client } from "discord.js";

// Mock the command by requiring it directly
import { command as pingCommand } from "#src/commands/tools/ping";

describe("Ping Command", () => {
	let mockInteraction: jest.Mocked<ChatInputCommandInteraction<CacheType>>;
	let mockClient: jest.Mocked<Client>;
	let mockMessage: any;

	beforeEach(() => {
		mockMessage = {
			createdTimestamp: Date.now(),
		};

		mockInteraction = {
			deferReply: jest.fn().mockResolvedValue(mockMessage),
			editReply: jest.fn().mockResolvedValue(undefined),
			replied: false,
			deferred: false,
		} as any;

		mockClient = {
			ws: {
				ping: 50,
			},
		} as any;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should have correct command data", () => {
		expect(pingCommand.data.name).toBe("ping");
		expect(pingCommand.data.description).toBe("Information about the ping");
	});

	it("should respond with ping information", async () => {
		await pingCommand.execute(mockInteraction, mockClient);

		expect(mockInteraction.deferReply).toHaveBeenCalledWith({
			fetchReply: true,
		});

		expect(mockInteraction.editReply).toHaveBeenCalledWith({
			content: expect.stringContaining("API latency 50"),
		});

		expect(mockInteraction.editReply).toHaveBeenCalledWith({
			content: expect.stringContaining("Client ping:"),
		});
	});
});
