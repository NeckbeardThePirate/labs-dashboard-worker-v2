import type { ENV } from '../types/index.ts'
import getUserData from './modules/users/getUserData.js';
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

		// if (request.method === 'POST') {
		// 	if (pathname === '/tech/create-group') {
		// 		try {
		// 			const isAuthorized = true;

		// 			const { orgSlug, groupName, groupUsers } = (await request.json()) as GroupCreationRequestProperties;

		// 			if (orgSlug === null || groupName === null || groupUsers === null) {
		// 				return new Response(JSON.stringify({ error: 'cannot have null props' }), {
		// 					status: 500,
		// 					headers: defaultHeaders,
		// 				});
		// 			}

		// 			if (isAuthorized) {
		// 				const cloudGroupCreationSuccess = await createCloudGroup(env, orgSlug, groupName, groupUsers);

		// 				if (cloudGroupCreationSuccess === false) {
		// 					console.log('failed to create cloud group');
		// 					return new Response(JSON.stringify({ success: false }), {
		// 						status: 500,
		// 						headers: defaultHeaders,
		// 					});
		// 				}

		// 				return new Response(JSON.stringify({ success: true }), {
		// 					status: 200,
		// 					headers: defaultHeaders,
		// 				});
		// 			}
		// 		} catch (error) {
		// 			return new Response(JSON.stringify({ error }), {
		// 				status: 500,
		// 				headers: defaultHeaders,
		// 			});
		// 		}
		// 	}
		// }
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}
	return new Error('non existent endpoint');
}