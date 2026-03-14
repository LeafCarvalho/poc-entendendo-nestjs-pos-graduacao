import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatMessage } from './interfaces/chat-message.interface';

@Injectable()
export class ChatService {
  private readonly messages: ChatMessage[] = [];

  findAll(): ChatMessage[] {
    return this.messages;
  }

  createMessage(sendMessageDto: SendMessageDto): ChatMessage {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      user: sendMessageDto.user,
      content: sendMessageDto.content,
      createdAt: new Date().toISOString(),
    };

    this.messages.push(message);
    return message;
  }
}
