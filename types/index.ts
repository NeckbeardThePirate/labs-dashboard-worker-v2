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

export interface ZipcodeUpdateRequest {
	userId: string;
	newZipCode: string;
}

export interface TimeFormatUpdateRequest {
	userId: string;
	newFormat: string;
}

export interface ShowRealTempUpdateRequest {
	userId: string;
	showRealTemp: string;
}

export interface ShowFeelsLikeTempUpdateRequest {
	userId: string;
	showFeelsLikeTemp: string;
}

export interface NewsDeliveryTimeUpdateReques {
	userId: string;
	newHour: number;
}

export interface ShowHumidityUpdateRequest {
	userId: string;
	showHumidity: 'true' | 'false';
}

export interface UpdateGenericRequest {
	userId: string;
	showHumidity?: 'true' | 'false';
	showWeather?: 'true' | 'false';
	showWind?: 'true' | 'false';
	newTimezone?: string;
	newOffset?: number;
	newDeliveryHour?: number;
}