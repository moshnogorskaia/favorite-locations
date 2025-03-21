import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({ route }) {
	const isFocused = useIsFocused();
	const [loadedPlaces, setLoadedPlaces] = useState([]);

	useEffect(() => {
		if (isFocused && route.params) {
			setLoadedPlaces((currentPlaces) => [
				route.params.place,
				...currentPlaces,
			]);
		}
	}, [isFocused, route]);

	return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
