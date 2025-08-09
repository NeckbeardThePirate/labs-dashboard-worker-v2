import { ENV } from "../../../types";

export default async function(env: ENV, userId: string, newZipcode: string): Promise<boolean | Error> {
	try {
		const {success} = await env.DB.prepare(`UPDATE UserData SET weather_zipcode = ? WHERE user_id = ?;`).bind(newZipcode, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}