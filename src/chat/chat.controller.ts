import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import type { ChatMessage } from './interfaces/chat-message.interface';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}

  @Get('messages')
  findAll(): ChatMessage[] {
    return this.chatService.findAll();
  }

  @Post('messages')
  create(@Body() sendMessageDto: SendMessageDto): ChatMessage {
    const message = this.chatService.createMessage(sendMessageDto);
    this.chatGateway.broadcastMessage(message);
    return message;
  }
}
