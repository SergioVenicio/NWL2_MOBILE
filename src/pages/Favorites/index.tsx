import React from "react";
import { View } from "react-native";

import PageHeader from "../../components/PageHeader";

import styles from "./styles";

const Favorites = () => {
  return (
    <PageHeader title="Meus proffys favoritos">
      <View style={styles.container}></View>
    </PageHeader>
  );
};

export default Favorites;
