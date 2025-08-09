import { ENV } from "../../../types";

export default async function(env: ENV, userId: string, newFormat: string): Promise<boolean | Error> {
	try {
		const {success} = await env.DB.prepare(`UPDATE UserData SET time_format = ? WHERE user_id = ?;`).bind(newFormat, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}