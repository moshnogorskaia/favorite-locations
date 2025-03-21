import { GOOGLE_API_KEY } from "../apikey";

export function getMapPreview(lat, lng) {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

	return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
	// const response = await axios.get(url);

	// if (!response.ok) {
	// 	throw new Error("Failed to fetch address. Please try again!");
	// }

	// const data = await response.json();
	// console.log(data);
	// const address = data.results[0].formatted_address;
	const address = "Dummy address";
	return address;
}
