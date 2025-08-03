import type {
	ChatDefaultUpdateRequest,
	DeliveryPausedUpdateRequest,
	ENV,
	NewsDeliveryTimeUpdateReques,
	SaveChatUpdateRequest,
} from '../types/index.ts';
import getUserData from './modules/users/getUserData.js';
import updateDefaultChatMode from './modules/users/updateDefaultChatMode.js';
import updateNewsDeliveryPausedSetting from './modules/users/updateNewsDeliveryPausedSetting.js';
import updateNewsDeliveryTime from './modules/users/updateNewsDeliveryTime.js';
import updateSaveChatSetting from './modules/users/updateSaveChatSetting.js';
import updateWeatherDeliveryPausedSetting from './modules/users/updateWeatherDeliveryPausedSetting.js';
import updateWeatherDeliveryTime from './modules/users/updateWeatherDeliveryTime.js';
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
		}
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}
	return new Error('non existent endpoint');
}
