import { ENV } from "../../../types";

interface TimesResponse {
	default_offset: number;
}

export default async function(env: ENV, userId: string, newHour: number): Promise<boolean | Error> {
	try {
		const { default_offset } = await (await env.DB.prepare(`SELECT default_offset, weather_delivery_hour FROM UserData WHERE user_id = ?;`).bind(userId).all<TimesResponse>()).results[0]
		let newUTC = newHour + default_offset;
		if (newUTC < 0) {
			newUTC = 24 + newUTC
		} else if (newUTC > 24) {
			newUTC-=24
		}

		const {success} = await env.DB.prepare(`UPDATE UserData SET weather_delivery_hour = ?, weather_delivery_utc = ? WHERE user_id = ?;`).bind(newHour, newUTC, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}