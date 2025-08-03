import { ENV, User } from "../../../types";

export default async function(env: ENV, userId: string): Promise<User | Error> {
	try {
		const userData = await env.DB.prepare(`SELECT * FROM UserData WHERE user_id = ?;`).bind(userId).all<User>()
console.log('accessed')
		return userData.results[0]
	} catch (error) {
		console.error(error)
		return new Error(String(error))
	}
}