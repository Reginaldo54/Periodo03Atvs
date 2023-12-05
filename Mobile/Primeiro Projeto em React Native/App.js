import * as React from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Reginaldo Alves</Text>
      <Image
        source={require('./assets/photo.jpg')} // Substitua pelo caminho real da sua imagem
        style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
      />
      <Text>Bem-vindo ao Meu currículo!!</Text>

      <Pressable
        onPress={() => navigation.navigate('Curriculo')}
        style={{
          backgroundColor: 'grey',
          padding: 10,
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Text>Currículo</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Experiencia')}
        style={{ backgroundColor: 'grey', padding: 10 }}>
        <Text>Experiência</Text>
      </Pressable>
    </View>
  );
}

function Curriculo() {
  return (
    <View style={{ flex: 1, alignItems: 'left', left: 50, justifyContent: 'center' }}>
      <Text>Reginaldo Alves - Currículo</Text>
      <Text>Formação Acadêmica:</Text>
      <Text>Curso: Análise e Desenvolvimento de Sistemas</Text>
      <Text>Instituição: Faculdade Senac Pernambuco</Text>
      <Text>Ano de conclusão: 2024</Text>

      <Text>Habilidades:</Text>
      <Text>- HTML, CSS, JS, React</Text>
      <Text>- JAVA e SpringBoot</Text>
      <Text>- MySQL</Text>
    </View>
  );
}

function Experiencia() {
  return (
    <View style={{ flex: 1, alignItems: 'left', left: 30, justifyContent: 'center' }}>
      <Text>Experiência Profissional</Text>
      <Text>FullStack - DemoDay no Instituto Proa</Text>
      <Text>Período: Agosto de 2023 - Dezembro de 2023 </Text>
      <Text>Responsabilidades:</Text>
      <Text>- Desenvolver o back-end usando Java (SpringBoot) e MySQL</Text>
      <Text>- Criar telas no front usando React</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          headerLeft: (props) => {
            return (
              <>
                <Text onPress={() => navigation.toggleDrawer()}>Menu</Text>
                {props.canGoBack && <HeaderBackButton {...props} />}
              </>
            );
          },
        })}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Curriculo" component={Curriculo} />
        <Stack.Screen name="Experiencia" component={Experiencia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
