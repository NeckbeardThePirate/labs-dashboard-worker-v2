import { ENV } from "../../../types";

export default async function(env: ENV, userId: string, newDefault: 'query' | 'chat' | 'search'): Promise<boolean | Error> {
	try {
		const {success} = await env.DB.prepare(`UPDATE UserData SET chat_default_mode = ? WHERE user_id = ?;`).bind(newDefault, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}