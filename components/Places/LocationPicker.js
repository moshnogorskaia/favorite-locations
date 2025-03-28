import { View, StyleSheet, Image, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";
import { useState, useEffect } from "react";
import { getMapPreview, getAddress } from "../../util/location";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {
	const navigation = useNavigation();
	const route = useRoute();
	const [pickedLocation, setPickedLocation] = useState();
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (route.params && isFocused) {
			const mapPickedLocation = route.params && {
				lat: route.params.pickedLat,
				lng: route.params.pickedLng,
			};
			setPickedLocation(mapPickedLocation);
		}
	}, [route.params, isFocused]);

	useEffect(() => {
		async function handleLocation() {
			if (pickedLocation) {
				const address = await getAddress(
					pickedLocation.lat,
					pickedLocation.lng,
				);
				console.log("Address: ", address);
				onPickLocation({ ...pickedLocation, address });
			}
		}

		handleLocation();
	}, [pickedLocation, onPickLocation]);

	async function verifyPermissions() {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions",
				"You need to grant location permissions to use this app.",
			);

			return false;
		}

		return true;
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}

	function pickOnMapHandler() {
		navigation.navigate("Map");
	}

	let locationPreview = <Text>No location picked yet.</Text>;

	if (pickedLocation) {
		locationPreview = (
			<Image
				source={{
					uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
				}}
				style={styles.image}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
}

export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: "hidden",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
