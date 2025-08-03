user_id user_full_name user_email phone_number news_active chat_active weather_active weather_days_remaining chat_tokens_remaining news_days_remaining stripe_user_id save_chats weather_config news_config chat_config

ALTER TABLE UserData ADD COLUMN news_active TEXT DEFAULT "false"
ALTER TABLE UserData ADD COLUMN weather_active TEXT DEFAULT "false";
ALTER TABLE UserData ADD COLUMN chat_active TEXT DEFAULT "false";
ALTER TABLE UserData ADD COLUMN weather_days_remaining INTEGER DEFAULT 0;
ALTER TABLE UserData ADD COLUMN chat_tokens_remaining INTEGER DEFAULT 0;
ALTER TABLE UserData ADD COLUMN news_days_remaining INTEGER DEFAULT 0;
ALTER TABLE UserData ADD COLUMN stripe_user_id TEXT;
ALTER TABLE UserData ADD COLUMN save_chats TEXT DEFAULT "false";
ALTER TABLE UserData ADD COLUMN news_delivery_hour INTEGER DEFAULT 0;
ALTER TABLE UserData ADD COLUMN weather_delivery_hour INTEGER DEFAULT 0;
ALTER TABLE UserData ADD COLUMN weather_zipcode TEXT DEFAULT '';
ALTER TABLE UserData ADD COLUMN news_topics TEXT DEFAULT '';
ALTER TABLE UserData ADD COLUMN time_format TEXT DEFAULT '12';
ALTER TABLE UserData ADD COLUMN speed_format TEXT DEFAULT 'mph';
ALTER TABLE UserData ADD COLUMN temp_format TEXT DEFAULT 'f';
ALTER TABLE UserData ADD COLUMN show_temp TEXT DEFAULT 'true';
ALTER TABLE UserData ADD COLUMN show_feels_like TEXT DEFAULT 'false';
ALTER TABLE UserData ADD COLUMN show_humidity TEXT DEFAULT 'false';
ALTER TABLE UserData ADD COLUMN show_weather TEXT DEFAULT 'true';
ALTER TABLE UserData ADD COLUMN show_wind TEXT DEFAULT 'false';
ALTER TABLE UserData ADD COLUMN weather_timezone TEXT DEFAULT 'est';

	ALTER TABLE UserData ADD COLUMN news_delivery_paused TEXT DEFAULT 'false';
	ALTER TABLE UserData ADD COLUMN weather_delivery_paused TEXT DEFAULT 'false';


news_delivery_hour weather_delivery_hour weather_zipcode news_topics time_format speed_format temp_format show_temp show_feels_like show_humidity show_weather show_wind weather_timezone chat_default_mode default_offset
news_delivery_paused
weather_delivery_paused


ALTER TABLE UserData ADD COLUMN chat_default_mode TEXT DEFAULT 'query';
ALTER TABLE UserData ADD COLUMN default_offset INTEGER DEFAULT 0;

