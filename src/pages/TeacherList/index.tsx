import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { TeacherI } from "../../components/TeacherItem";

import styles from "./styles";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const [showFilters, setShowFilters] = useState(false);

  const toogleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "subject":
        setSubject(value);
        break;
      case "week_day":
        setWeekDay(value);
        break;
      case "time":
        setTime(value);
        break;
      default:
        throw "Invalid Field";
    }
  };

  const handleSubmit = async () => {
    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setTeachers(response.data);
    setShowFilters(response.data.lenght === 0);
  };

  useFocusEffect(() => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: TeacherI) => teacher.id
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  });

  const headerButton = (
    <BorderlessButton onPress={toogleFilters}>
      <Feather name="filter" size={20} color="#FFF" />
    </BorderlessButton>
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" headerRight={headerButton}>
        {showFilters && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={(value) => handleChange("subject", value)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={(value) => handleChange("week_day", value)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={(value) => handleChange("time", value)}
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers &&
          teachers.map((teacher: TeacherI) => (
            <TeacherItem
              key={teacher.id}
              {...teacher}
              favorited={favorites.includes(teacher.id)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
