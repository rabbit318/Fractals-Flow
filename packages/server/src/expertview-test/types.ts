export interface Source {
    title: string;
    preview: string;
}

export interface Message {
    type: 'user' | 'bot';
    message: string;
}

export interface Votes {
    [key: number]: 'up' | 'down' | null;
} 