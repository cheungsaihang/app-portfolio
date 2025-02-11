import Sizes from "@/constants/Sizes";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";

type TagsProps = {
  tags:string[];
  onPress?:(index:number, tag:string) => void;
}

export default function TagsSelector({
  tags,
  onPress
}:TagsProps
){
  const styles = useStyles();
  const [activeTag, setActiveTag] = useState(0);

  const renderItem = ({index, item}:{index:number; item:string}) => {
    const isActive = index == activeTag;
    const tagStyle = isActive ? [styles.tag, styles.activeTag] : styles.tag;
    const tagTextStyle = isActive ? [styles.tagText, styles.activeTagText] : styles.tagText;
    return (
      <TouchableOpacity 
        style={tagStyle}
        disabled={isActive}
        onPress={() => {
          setActiveTag(index);
          if(onPress){
            onPress(index,item);
          }
        }}
      >
        <Text style={tagTextStyle}>{item}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <FlatList
      style={styles.wrap}
      data={tags}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
    />
  )
}

function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    wrap:{
      flexGrow:0,
      marginBottom:10,
    },
    tag:{
      backgroundColor:themeColors.menuTag,
      borderRadius:10,
      paddingHorizontal:10,
      paddingVertical:5,
      marginRight:5,
    },
    tagText:{
      color:themeColors.foreground,
      fontSize:Sizes.fonts.medium
    },
    activeTag:{
      backgroundColor:themeColors.menuTagActive,
    },
    activeTagText:{
      color:themeColors.background,
    }
  });
  return styles;
}