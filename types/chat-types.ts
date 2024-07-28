export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  created_at: string;
}

export enum MessageRole {
  User = "user",
  Assistant = "assistant",
}
