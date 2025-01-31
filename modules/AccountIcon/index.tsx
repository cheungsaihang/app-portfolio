import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import Sizes from '@/constants/Sizes';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function AccountIcon({email}:{email?:string}){
  const router = useRouter();
  const styles = useStyles();
  const onLinkClick = (link:'login' | 'profile') => {
    if(link == 'profile'){
      router.push({pathname:'/(stacks)/profile'});
    }
    else{
      router.push({pathname:'/(stacks)/login'});
    }
  }

  return ( 
    <>
      {
        email ? (
          <Avatar email={email} onPress={() => onLinkClick('profile')} />
        ) : (
          <TouchableOpacity onPress={() => onLinkClick('login')} ><Ionicons name="person-circle" style={styles.login} /></TouchableOpacity>
        )
      }
    </>
  );
}

function Avatar({email, onPress}:{email:string; onPress:() => void;}){
  const first = email.charAt(0);
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={styles.avatar}
      onPress={onPress}
    >
      <Text style={styles.avatarName}>{first}</Text>
    </TouchableOpacity>
  );
}

function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    login:{
      fontSize:Sizes.icon,
      color: themeColors.icon,
    },
    avatar:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#ff6666',
      width:(Sizes.icon -4),
      height:(Sizes.icon -4),
      borderRadius:(Sizes.icon -4),
    },
    avatarName:{
      fontSize:Sizes.fonts.medium,
      color:'#ffffff', 
      fontWeight:'bold'
    }
  });
  return styles;
}