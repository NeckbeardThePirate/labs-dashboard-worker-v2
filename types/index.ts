export interface ENV {
	DB: D1Database
}

export interface User {
	user_id: string;
	user_email: string;
	user_full_name: string;
	phone_number: string;
}

export interface ChatDefaultUpdateRequest {
	userId: string;
	newDefault: 'query' | 'chat' | 'search';
}

export interface SaveChatUpdateRequest {
	userId: string;
	saveChats: 'true' | 'false';
}

export interface DeliveryPausedUpdateRequest {
	userId: string;
	deliveryPaused: 'true' | 'false';
}

export interface NewsDeliveryTimeUpdateReques {
	userId: string;
	newHour: number;
}