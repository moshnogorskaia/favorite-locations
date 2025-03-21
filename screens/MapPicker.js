import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

function MapPicker() {
	const region = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.042,
	};

	return <MapView initialRegion={region} style={styles.map} />;
}

export default MapPicker;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
