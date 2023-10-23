import { ObjectId } from "mongoose";

export interface ChatModel {
    userName: string;
    messageContent: string;
    shippingTime: Date;
    id?: ObjectId | undefined;
  }

