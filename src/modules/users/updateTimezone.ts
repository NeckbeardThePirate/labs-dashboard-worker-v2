import { ENV } from '../../../types';

export default async function (
	env: ENV,
	userId: string,
	newTimezone: string,
	newOffset: number,
	newDeliveryHour: number,
	newUtcDelivery: number
): Promise<boolean | Error> {
	try {


				let newUTC = newUtcDelivery;
		if (newUTC < 0) {
			newUTC = 24 + newUTC
		} else if (newUTC > 24) {
			newUTC-=24
		}


		const { success } = await env.DB.prepare(
			`UPDATE UserData SET weather_timezone = ?, default_offset = ?, weather_delivery_hour = ?, weather_delivery_utc = ? WHERE user_id = ?;`
		)
			.bind(newTimezone, newOffset, newDeliveryHour, newUTC, userId)
			.run();
		return success;
	} catch (error) {
		console.error(error);
		return new Error(String(error));
	}
}
