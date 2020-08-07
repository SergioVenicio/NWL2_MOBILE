import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TeacherList from "../pages/TeacherList";
import Favorites from "../pages/Favorites";
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpcity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: "Archivo_700Bold",
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: "#fafafc",
        activeBackgroundColor: "#ebebf5",
        inactiveTintColor: "#c1bccc",
        activeTintColor: "#32264d",
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: "Proffys",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                size={size}
                color={focused ? "#8257e5" : color}
                name="ios-easel"
              />
            );
          },
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                size={size}
                color={focused ? "#8257e5" : color}
                name="ios-heart"
              />
            );
          },
        }}
      />
    </Navigator>
  );
};

export default StudyTabs;
