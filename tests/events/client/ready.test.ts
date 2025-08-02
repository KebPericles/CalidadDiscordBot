import { Client, Events } from 'discord.js';

const readyEvent = require('../../../src/events/client/ready').default;

describe('Ready Event', () => {
  let mockClient: jest.Mocked<Client>;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    mockClient = {
      user: {
        tag: 'TestBot#1234',
      },
    } as any;

    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
  });

  it('should have correct event configuration', () => {
    expect(readyEvent.name).toBe(Events.ClientReady);
    expect(readyEvent.once).toBe(true);
  });

  it('should log ready message when executed', async () => {
    await readyEvent.execute(mockClient);

    expect(consoleSpy).toHaveBeenCalledWith('Ready!! TestBot#1234 is logged in and online.');
  });

  it('should handle client without user tag', async () => {
    mockClient.user = null;

    await readyEvent.execute(mockClient);

    expect(consoleSpy).toHaveBeenCalledWith('Ready!! undefined is logged in and online.');
  });
});
