export interface Message {
    sender: string;
    content: string;
    timestamp: Date;
}

export type HistoricData = Message[];