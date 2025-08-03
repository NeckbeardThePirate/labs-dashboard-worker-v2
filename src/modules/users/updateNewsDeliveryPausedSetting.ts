import { ENV } from "../../../types";

export default async function(env: ENV, userId: string, deliveryPaused: 'true' | 'false'): Promise<boolean | Error> {
	try {
		const {success} = await env.DB.prepare(`UPDATE UserData SET news_delivery_paused = ? WHERE user_id = ?;`).bind(deliveryPaused, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}