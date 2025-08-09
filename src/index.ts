import type {
	ChatDefaultUpdateRequest,
	DeliveryPausedUpdateRequest,
	ENV,
	NewsDeliveryTimeUpdateReques,
	SaveChatUpdateRequest,
	ShowFeelsLikeTempUpdateRequest,
	ShowHumidityUpdateRequest,
	ShowRealTempUpdateRequest,
	TimeFormatUpdateRequest,
	UpdateGenericRequest,
	ZipcodeUpdateRequest,
} from '../types/index.ts';
import genericSingleColumnUserUpdate from './modules/users/genericSingleColumnUserUpdate.js';
import getUserData from './modules/users/getUserData.js';
import updateDefaultChatMode from './modules/users/updateDefaultChatMode.js';
import updateNewsDeliveryPausedSetting from './modules/users/updateNewsDeliveryPausedSetting.js';
import updateNewsDeliveryTime from './modules/users/updateNewsDeliveryTime.js';
import updateSaveChatSetting from './modules/users/updateSaveChatSetting.js';
import updateSpeedFormatSetting from './modules/users/updateSpeedFormatSetting.js';
import updateTempFormatSetting from './modules/users/updateTempFormatSetting.js';
import updateTimeFormatSetting from './modules/users/updateTimeFormatSetting.js';
import updateTimezone from './modules/users/updateTimezone.js';
import updateWeatherDeliveryPausedSetting from './modules/users/updateWeatherDeliveryPausedSetting.js';
import updateWeatherDeliveryTime from './modules/users/updateWeatherDeliveryTime.js';
import updateZipcodeSetting from './modules/users/updateZipcodeSetting.js';
export default {
	async fetch(request: Request, env: ENV, ctx: ExecutionContext): Promise<Response | void> {
		const response = await handleRequest(request, env, ctx);

		if (response instanceof Error) {
			return new Response(JSON.stringify({ message: 'Problem' }), {
				status: 500,
				headers: {
					'Access-Control-Allow-Origin': origin || '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-org-id, x-org-slug, x-group-id, x-user-id',
				},
			});
		}

		return response;
	},
};

async function handleRequest(request: Request, env: ENV, ctx: ExecutionContext): Promise<Response | Error> {
	const origin = request.headers.get('Origin');

	const defaultHeaders: Record<string, string> = {
		'Access-Control-Allow-Origin': origin || '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-org-id, x-group-id, x-user-id, x-org-slug',
	};

	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: 204,
			headers: defaultHeaders,
		});
	}

	const { pathname } = new URL(request.url);
	try {
		if (request.method === 'GET') {
			if (pathname === '/u/user-data') {
				try {
					const userId = request.headers.get('l-user-id');
					if (userId === null) {
						return new Response(JSON.stringify({ message: 'Invalid UserId' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					const userData = await getUserData(env, userId);
					return new Response(JSON.stringify({ userData }), {
						status: 200,
						headers: defaultHeaders,
					});
				} catch (error) {
					console.error(error);
					return new Response(JSON.stringify({ message: 'Problem' }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
		}

		if (request.method === 'POST') {
			if (pathname === '/u/update-chat-default') {
				try {
					const isAuthorized = true;

					const { userId, newDefault } = (await request.json()) as ChatDefaultUpdateRequest;

					if (userId === null || userId === '' || newDefault === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						console.log(userId, newDefault);
						const updateDefaultChatModeSuccess = await updateDefaultChatMode(env, userId, newDefault);

						if (updateDefaultChatModeSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-save-chat') {
				try {
					const isAuthorized = true;

					const { userId, saveChats } = (await request.json()) as SaveChatUpdateRequest;

					if (userId === null || userId === '' || saveChats === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						console.log(userId, saveChats);
						const updateSaveChatSuccess = await updateSaveChatSetting(env, userId, saveChats);

						if (updateSaveChatSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-news-delivery-hour') {
				try {
					const isAuthorized = true;

					const { userId, newHour } = (await request.json()) as NewsDeliveryTimeUpdateReques;

					if (userId === null || userId === '' || newHour === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateNewsDeliveryTimeSuccess = await updateNewsDeliveryTime(env, userId, newHour);

						if (updateNewsDeliveryTimeSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}

			if (pathname === '/u/update-weather-delivery-hour') {
				try {
					const isAuthorized = true;

					const { userId, newHour } = (await request.json()) as NewsDeliveryTimeUpdateReques;

					if (userId === null || userId === '' || newHour === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateWeatherDeliveryTimeSuccess = await updateWeatherDeliveryTime(env, userId, newHour);

						if (updateWeatherDeliveryTimeSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-news-delivery-paused') {
				try {
					const isAuthorized = true;

					const { userId, deliveryPaused } = (await request.json()) as DeliveryPausedUpdateRequest;

					if (userId === null || userId === '' || deliveryPaused === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateNewsDeliveryPausedSuccess = await updateNewsDeliveryPausedSetting(env, userId, deliveryPaused);

						if (updateNewsDeliveryPausedSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-weather-delivery-paused') {
				try {
					const isAuthorized = true;

					const { userId, deliveryPaused } = (await request.json()) as DeliveryPausedUpdateRequest;

					if (userId === null || userId === '' || deliveryPaused === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateWeatherDeliveryPausedSuccess = await updateWeatherDeliveryPausedSetting(env, userId, deliveryPaused);

						if (updateWeatherDeliveryPausedSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-weather-zipcode') {
				try {
					const isAuthorized = true;

					const { userId, newZipCode } = (await request.json()) as ZipcodeUpdateRequest;

					if (userId === null || userId === '' || newZipCode === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateZipcodeSuccess = await updateZipcodeSetting(env, userId, newZipCode);

						if (updateZipcodeSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-weather-time-format') {
				try {
					const isAuthorized = true;

					const { userId, newFormat } = (await request.json()) as TimeFormatUpdateRequest;

					if (userId === null || userId === '' || newFormat === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateTimeFormatSettingSuccess = await updateTimeFormatSetting(env, userId, newFormat);

						if (updateTimeFormatSettingSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-wind-speed-format') {
				try {
					const isAuthorized = true;

					const { userId, newFormat } = (await request.json()) as TimeFormatUpdateRequest;

					if (userId === null || userId === '' || newFormat === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateSpeedFormatSettingSuccess = await updateSpeedFormatSetting(env, userId, newFormat);

						if (updateSpeedFormatSettingSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-weather-temp-format') {
				try {
					const isAuthorized = true;

					const { userId, newFormat } = (await request.json()) as TimeFormatUpdateRequest;

					if (userId === null || userId === '' || newFormat === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const updateTempFormatSettingSuccess = await updateTempFormatSetting(env, userId, newFormat);

						if (updateTempFormatSettingSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}

			if (pathname === '/u/update-show-real-temp') {
				try {
					const isAuthorized = true;

					const { userId, showRealTemp } = (await request.json()) as ShowRealTempUpdateRequest;

					if (userId === null || userId === '' || showRealTemp === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const realTempUpdateSuccess = await genericSingleColumnUserUpdate(env, userId, showRealTemp, 'show_temp');

						if (realTempUpdateSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}

			if (pathname === '/u/update-show-feels-like-temp') {
				try {
					const isAuthorized = true;

					const { userId, showFeelsLikeTemp } = (await request.json()) as ShowFeelsLikeTempUpdateRequest;

					if (userId === null || userId === '' || showFeelsLikeTemp === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const realTempUpdateSuccess = await genericSingleColumnUserUpdate(env, userId, showFeelsLikeTemp, 'show_feels_like');

						if (realTempUpdateSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
			if (pathname === '/u/update-show-humidity-temp') {
				try {
					const isAuthorized = true;

					const { userId, showHumidity } = (await request.json()) as ShowHumidityUpdateRequest;

					if (userId === null || userId === '' || showHumidity === null) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const realTempUpdateSuccess = await genericSingleColumnUserUpdate(env, userId, showHumidity, 'show_humidity');

						if (realTempUpdateSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}

			if (pathname === '/u/update-show-weather') {
				try {
					const isAuthorized = true;

					const { userId, showWeather } = (await request.json()) as UpdateGenericRequest;

					if (userId === null || userId === '' || showWeather === undefined) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const realTempUpdateSuccess = await genericSingleColumnUserUpdate(env, userId, showWeather, 'show_weather');

						if (realTempUpdateSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}

			if (pathname === '/u/update-show-wind') {
				try {
					const isAuthorized = true;

					const { userId, showWind } = (await request.json()) as UpdateGenericRequest;

					if (userId === null || userId === '' || showWind === undefined) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const realTempUpdateSuccess = await genericSingleColumnUserUpdate(env, userId, showWind, 'show_wind');

						if (realTempUpdateSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}

			if (pathname === '/u/update-time-zone') {
				try {
					const isAuthorized = true;

					const { userId, newTimezone, newOffset, newDeliveryHour, newUtcDelivery} = (await request.json()) as UpdateGenericRequest;

					if (userId === null || userId === '' || newTimezone === undefined || newOffset === undefined || newDeliveryHour === undefined || newUtcDelivery === undefined) {
						return new Response(JSON.stringify({ error: 'cannot have null props' }), {
							status: 500,
							headers: defaultHeaders,
						});
					}

					if (isAuthorized) {
						const realTempUpdateSuccess = await updateTimezone(env, userId, newTimezone, newOffset, newDeliveryHour, newUtcDelivery);

						if (realTempUpdateSuccess instanceof Error) {
							console.log('failed to update chat defaults');
							return new Response(JSON.stringify({ success: false }), {
								status: 500,
								headers: defaultHeaders,
							});
						}

						return new Response(JSON.stringify({ success: true }), {
							status: 200,
							headers: defaultHeaders,
						});
					}
				} catch (error) {
					return new Response(JSON.stringify({ error }), {
						status: 500,
						headers: defaultHeaders,
					});
				}
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}
	return new Error('non existent endpoint');
}
