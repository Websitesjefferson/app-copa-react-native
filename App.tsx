import { NativeBaseProvider, StatusBar} from "native-base";
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme'

import { Loading } from './src/components/Loading';
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContexts";


export default function App() {
 const [fontesLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})


  return (
   <NativeBaseProvider theme={THEME}>
    <AuthContextProvider>
    <StatusBar
      barStyle="light-content"
      backgroundColor='transparent'
      translucent 
    />
     { fontesLoaded ? <Routes /> : <Loading />}
     </AuthContextProvider>
    </NativeBaseProvider>
  );
}


