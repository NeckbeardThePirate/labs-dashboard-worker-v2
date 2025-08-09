import { ENV } from "../../../types";

export default async function(env: ENV, userId: string, insertVal: string, updateCol: string): Promise<boolean | Error> {
	try {
		const {success} = await env.DB.prepare(`UPDATE UserData SET ${updateCol} = ? WHERE user_id = ?;`).bind(insertVal, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}