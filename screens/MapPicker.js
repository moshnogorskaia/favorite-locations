import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useState } from "react";

function MapPicker() {
	const [selectedLocation, setSelectedLocation] = useState();

	const region = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.042,
	};

	function selectLocationHandler(event) {
		const lat = event.nativeEvent.coordinate.latitude;
		const lng = event.nativeEvent.coordinate.longitude;

		setSelectedLocation({ lat, lng });
	}

	return (
		<MapView
			initialRegion={region}
			style={styles.map}
			onPress={selectLocationHandler}
		>
			{selectedLocation && (
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.lng,
					}}
				/>
			)}
		</MapView>
	);
}

export default MapPicker;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
