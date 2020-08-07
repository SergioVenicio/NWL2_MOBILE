import React from "react";
import { View } from "react-native";

import PageHeader from "../../components/PageHeader";

import styles from "./styles";

const TeacherList = () => {
  return (
    <PageHeader title="Proffys disponíveis ">
      <View style={styles.container}></View>
    </PageHeader>
  );
};

export default TeacherList;
