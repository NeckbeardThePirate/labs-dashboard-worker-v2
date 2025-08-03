import { ENV } from "../../../types";

export default async function(env: ENV, userId: string, newHour: number): Promise<boolean | Error> {
	try {
		const {success} = await env.DB.prepare(`UPDATE UserData SET news_delivery_hour = ? WHERE user_id = ?;`).bind(newHour, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}