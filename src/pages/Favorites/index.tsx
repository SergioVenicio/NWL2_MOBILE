import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import { TeacherI } from "../../components/TeacherItem";

import styles from "./styles";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const getFavorites = async () => {
    const localFavorites = await AsyncStorage.getItem("favorites");
    if (localFavorites) {
      setFavorites(JSON.parse(localFavorites));
    }
  };

  useFocusEffect(() => {
    getFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites &&
          favorites.map((favorite: TeacherI) => (
            <TeacherItem key={favorite.id} {...favorite} favorited />
          ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
