describe('Bot Configuration', () => {
  it('should have all required environment variables', () => {
    expect(process.env.BOT_TOKEN).toBeDefined();
    expect(process.env.CLIENT_ID).toBeDefined();
    expect(process.env.GUILD_ID).toBeDefined();
  });

  it('should have global variables initialized', () => {
    expect(global.commands).toBeDefined();
    expect(global.createdChannels).toBeDefined();
    expect(global.defaultEmbed).toBeDefined();
  });

  it('should create default embed with correct structure', () => {
    const embed = global.defaultEmbed();
    
    expect(embed).toBeDefined();
    expect(embed.data.color).toBe(0x0099ff);
    expect(embed.data.author?.name).toBe('Manchas Cyberpunk');
    expect(embed.data.footer?.text).toBe('Bot hecho con calidad por Pan con Queso');
  });

  it('should have commands collection', () => {
    expect(global.commands).toBeInstanceOf(Map);
  });

  it('should have created channels array', () => {
    expect(Array.isArray(global.createdChannels)).toBe(true);
  });
});
