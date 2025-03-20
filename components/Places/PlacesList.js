import { FlatList } from "react-native";

function PlacesList({places}) {
    return <FlatList data={places} keyExtractor={item=>item.id} renderItem={({item}) => <Text>{item.name}</Text>} />
}

export default PlacesList;