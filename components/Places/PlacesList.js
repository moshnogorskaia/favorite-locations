import { FlatList, StyleSheet, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

function PlacesList({ places }) {
	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places found. Maybe start adding some!
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <PlaceItem place={item} />}
			style={styles.list}
		/>
	);
}

export default PlacesList;

const styles = StyleSheet.create({
	list: {
		margin: 24,
	},
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
		color: Colors.primary200,
	},
});
