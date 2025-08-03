import { ENV } from "../../../types";

export default async function(env: ENV, userId: string, saveChats: 'true' | 'false'): Promise<boolean | Error> {
	try {
		console.log(userId)
		console.log(saveChats)
		const {success} = await env.DB.prepare(`UPDATE UserData SET save_chats = ? WHERE user_id = ?;`).bind(saveChats, userId).run()
		return success
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}