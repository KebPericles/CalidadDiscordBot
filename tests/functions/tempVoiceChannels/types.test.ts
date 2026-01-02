import { VoiceState, GuildMember, VoiceBasedChannel } from 'discord.js';
import { ChannelName, ChannelCategory } from '../../../src/functions/tempVoiceChannels/types';

describe('ChannelName Class', () => {
  it('should create a channel name with location and activity', () => {
    const channelName = new ChannelName('Sala', 'Gaming');
    
    expect(channelName.location).toBe('Sala');
    expect(channelName.activity).toBe('Gaming');
    expect(channelName.channelName).toBe('Sala de Gaming');
  });

  it('should create a channel name with default activity', () => {
    const channelName = new ChannelName('Sala');
    
    expect(channelName.location).toBe('Sala');
    expect(channelName.activity).toBe('');
    expect(channelName.channelName).toBe('Sala de ');
  });

  it('should allow renaming when canBeRenamed is true', () => {
    const channelName = new ChannelName('Sala', 'Gaming', true);
    
    channelName.location = 'Nueva Sala';
    channelName.activity = 'Estudios';
    
    expect(channelName.location).toBe('Nueva Sala');
    expect(channelName.activity).toBe('Estudios');
    expect(channelName.channelName).toBe('Nueva Sala de Estudios');
  });

  it('should not allow renaming when canBeRenamed is false', () => {
    const channelName = new ChannelName('Sala', 'Gaming', false);
    
    channelName.location = 'Nueva Sala';
    channelName.activity = 'Estudios';
    
    expect(channelName.location).toBe('Sala'); // Should not change
    expect(channelName.activity).toBe('Gaming'); // Should not change
  });

  it('should allow activity change when activity is empty and canBeRenamed is false', () => {
    const channelName = new ChannelName('Sala', '', false);
    
    channelName.activity = 'Estudios';
    
    expect(channelName.activity).toBe('Estudios');
  });

  it('should have correct override level', () => {
    const channelName = new ChannelName('Sala', 'Gaming', true, 5);
    
    expect(channelName.overrideLevel).toBe(5);
  });

  it('should validate with predicate function', () => {
    const mockPredicate = jest.fn().mockReturnValue(true);
    const channelName = new ChannelName('Sala', 'Gaming', true, 0, mockPredicate);
    
    const mockVoiceState = {} as VoiceState;
    const result = channelName.isValid(mockVoiceState);
    
    expect(result).toBe(true);
    expect(mockPredicate).toHaveBeenCalledWith(mockVoiceState);
  });
});

describe('ChannelCategory Enum', () => {
  it('should have correct values', () => {
    expect(ChannelCategory.CHISMECITO).toBe('CHISMECITO');
    expect(ChannelCategory.GAMING).toBe('GAMING');
    expect(ChannelCategory.HOMEWORK).toBe('HOMEWORK');
  });
});
