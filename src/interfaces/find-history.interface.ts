import { ObjectId } from 'mongodb';

export interface FindHistory {
    _id: ObjectId
    userName: string;
    messageContent: string;
    shippingTime: Date; 
    __v: number;
}
