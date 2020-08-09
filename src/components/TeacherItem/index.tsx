import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import heartOutLineIcon from "../../assets/images/icons/heart-outline.png";
import unFavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";
import api from "../../services/api";

export interface TeacherI {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherI> = ({
  id,
  name,
  bio,
  cost,
  avatar,
  subject,
  whatsapp,
  favorited,
}) => {
  const [isFavorited, setISFavorited] = useState(favorited);
  const handleLinkToWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=+55${whatsapp}`);
    api.post("/connections", {
      user_id: id,
    });
  };

  const toggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    const favoritesArray = favorites ? JSON.parse(favorites) : [];

    const favoriteIndex = favoritesArray.findIndex((teacherItem: TeacherI) => {
      return id === teacherItem.id;
    });

    if (favoriteIndex !== -1) {
      favoritesArray.splice(favoriteIndex, 1);
      setISFavorited(false);
    } else {
      favoritesArray.push({
        id,
        name,
        bio,
        cost,
        avatar,
        subject,
        whatsapp,
      });
      setISFavorited(true);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>

        <Text style={styles.bio}>{bio}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {"   "}
          <Text style={styles.priceValue}>R$ {cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : null,
            ]}
            onPress={toggleFavorite}
          >
            {isFavorited ? (
              <Image source={unFavoriteIcon} />
            ) : (
              <Image source={heartOutLineIcon} />
            )}
          </RectButton>
          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
