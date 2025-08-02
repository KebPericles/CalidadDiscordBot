import { ChatInputCommandInteraction, Client } from 'discord.js';

// Mock the command by requiring it directly
const pingCommand = require('../../../src/commands/tools/ping').default;

describe('Ping Command', () => {
  let mockInteraction: jest.Mocked<ChatInputCommandInteraction>;
  let mockClient: jest.Mocked<Client>;
  let mockMessage: any;

  beforeEach(() => {
    mockMessage = {
      createdTimestamp: Date.now(),
    };

    mockInteraction = {
      deferReply: jest.fn().mockResolvedValue(mockMessage),
      editReply: jest.fn().mockResolvedValue(undefined),
      createdTimestamp: Date.now() - 100,
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

  it('should have correct command data', () => {
    expect(pingCommand.data.name).toBe('ping');
    expect(pingCommand.data.description).toBe('Information about the ping');
  });

  it('should respond with ping information', async () => {
    await pingCommand.execute(mockInteraction, mockClient);

    expect(mockInteraction.deferReply).toHaveBeenCalledWith({
      fetchReply: true,
    });

    expect(mockInteraction.editReply).toHaveBeenCalledWith({
      content: expect.stringContaining('API latency 50'),
    });

    expect(mockInteraction.editReply).toHaveBeenCalledWith({
      content: expect.stringContaining('Client ping:'),
    });
  });

  it('should calculate client ping correctly', async () => {
    const now = Date.now();
    const createdTimestamp = now - 200;
    mockMessage.createdTimestamp = now;
    
    // Create a new mock with the desired timestamp
    const testInteraction = {
      ...mockInteraction,
      createdTimestamp,
    };

    await pingCommand.execute(testInteraction, mockClient);

    const expectedClientPing = mockMessage.createdTimestamp - createdTimestamp;
    expect(mockInteraction.editReply).toHaveBeenCalledWith({
      content: `API latency 50\nClient ping: ${expectedClientPing}`,
    });
  });
});
