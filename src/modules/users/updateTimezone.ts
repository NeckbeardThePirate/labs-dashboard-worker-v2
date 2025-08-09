import { ENV } from '../../../types';

export default async function (
	env: ENV,
	userId: string,
	newTimezone: string,
	newOffset: number,
	newDeliveryHour: number
): Promise<boolean | Error> {
	try {
		const { success } = await env.DB.prepare(
			`UPDATE UserData SET weather_timezone = ?, default_offset = ?, weather_delivery_hour = ? WHERE user_id = ?;`
		)
			.bind(newTimezone, newOffset, newDeliveryHour, userId)
			.run();
		return success;
	} catch (error) {
		console.error(error);
		return new Error(String(error));
	}
}
