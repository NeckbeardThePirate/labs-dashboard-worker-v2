export interface ENV {
	DB: D1Database
}

export interface User {
	user_id: string;
	user_email: string;
	user_full_name: string;
	phone_number: string;
}