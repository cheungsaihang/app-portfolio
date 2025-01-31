import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useStyles from "./useStyles";
import { useAuthStore } from "@/hooks/zustand/useAuthStore";
import { API_UsersDetail } from "@/types/api/usersTypes";
import callApi from "@/utils/callApi";
import ApiPath from "@/constants/ApiPath";

export default function ProfileScreenDetail({
  profile
}:{
  profile:API_UsersDetail
}){
  const auth = useAuthStore();
  const router = useRouter()
  const styles = useStyles();
  const { email, firstname, lastname } = profile;

  const logout = () => {
    auth.setAccessToken(null);
    auth.setRefreshToken(null);
    const apiUrl = ApiPath.auth.refreshToken + `/${auth.rsid}`;
    callApi(apiUrl,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${auth.sid}`
      },
    },{
      onSuccess:() => null
    });
    router.back();
  }

  return (
    <View style={styles.root}>
      <View style={styles.frame}>
        <View style={styles.row}>
            <View style={styles.labelWrap}><Text style={styles.label}>名稱</Text></View>
            <View style={styles.valueWrap}><Text style={styles.value}>{`${firstname} ${lastname}`}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.labelWrap}><Text style={styles.label}>電郵</Text></View>
          <View style={styles.valueWrap}><Text style={styles.value}>{email}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.labelWrap} />
          <View style={styles.valueWrap}>
            <TouchableOpacity
              style={styles.button}
              onPress={logout}
            >
              <Text style={styles.buttonText}>登出</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </View>      
    </View>
  )
}