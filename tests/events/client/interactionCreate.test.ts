import { ChatInputCommandInteraction, Client, Events } from "discord.js";
import * as global from "#src/global";
import { event as interactionCreateEvent } from "#src/events/client/interactionCreate";

interface TestDiscordCommand {
	data: any;
	execute: jest.Mock;
}

describe("InteractionCreate Event", () => {
	let mockInteraction: jest.Mocked<ChatInputCommandInteraction>;
	let mockClient: jest.Mocked<Client>;
	let mockCommand: TestDiscordCommand;
	let consoleSpy: jest.SpyInstance;

	beforeEach(() => {
		mockCommand = {
			data: { name: "test-command" },
			execute: jest.fn().mockResolvedValue(undefined),
		};

		mockInteraction = {
			isChatInputCommand: jest.fn().mockReturnValue(true),
			commandName: "test-command",
			reply: jest.fn().mockResolvedValue(undefined),
			followUp: jest.fn().mockResolvedValue(undefined),
			replied: false,
			deferred: false,
		} as any;

		mockClient = {} as any;

		// Setup global commands collection
		global.commands.clear();
		global.commands.set("test-command", mockCommand);

		consoleSpy = jest.spyOn(console, "error").mockImplementation();
	});

	afterEach(() => {
		jest.clearAllMocks();
		consoleSpy.mockRestore();
	});

	it("should have correct event configuration", () => {
		expect(interactionCreateEvent.name).toBe(Events.InteractionCreate);
	});

	it("should execute command when interaction is chat input command", async () => {
		await interactionCreateEvent.execute(mockInteraction, mockClient);

		expect(mockInteraction.isChatInputCommand).toHaveBeenCalled();
		expect(mockCommand.execute).toHaveBeenCalledWith(
			mockInteraction,
			mockClient
		);
	});

	it("should not execute when interaction is not chat input command", async () => {
		mockInteraction.isChatInputCommand.mockReturnValue(false);

		await interactionCreateEvent.execute(mockInteraction, mockClient);

		expect(mockCommand.execute).not.toHaveBeenCalled();
	});

	it("should not execute when command does not exist", async () => {
		global.commands.clear();

		await interactionCreateEvent.execute(mockInteraction, mockClient);

		expect(mockCommand.execute).not.toHaveBeenCalled();
	});

	it("should handle command execution errors with reply", async () => {
		const error = new Error("Test error");
		mockCommand.execute.mockRejectedValue(error);

		await interactionCreateEvent.execute(mockInteraction, mockClient);

		expect(consoleSpy).toHaveBeenCalledWith(error);
		expect(mockInteraction.reply).toHaveBeenCalledWith({
			content: "Something went wrong while executing this command",
			ephemeral: true,
		});
	});

	it("should handle command execution errors with followUp when already replied", async () => {
		const error = new Error("Test error");
		mockCommand.execute.mockRejectedValue(error);
		mockInteraction.replied = true;

		await interactionCreateEvent.execute(mockInteraction, mockClient);

		expect(consoleSpy).toHaveBeenCalledWith(error);
		expect(mockInteraction.followUp).toHaveBeenCalledWith({
			content: "Something went wrong while executing this command",
			ephemeral: true,
		});
	});

	it("should handle command execution errors with followUp when deferred", async () => {
		const error = new Error("Test error");
		mockCommand.execute.mockRejectedValue(error);
		mockInteraction.replied = false;
		mockInteraction.deferred = true;

		await interactionCreateEvent.execute(mockInteraction, mockClient);

		expect(consoleSpy).toHaveBeenCalledWith(error);
		expect(mockInteraction.followUp).toHaveBeenCalledWith({
			content: "Something went wrong while executing this command",
			ephemeral: true,
		});
	});
});
