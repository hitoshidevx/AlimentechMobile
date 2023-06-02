import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Menu = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1.5,
        backgroundColor: '#FF8412',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: 700,
          marginTop: 30,
        }}>
        Alimentech
      </Text>
    </View>
  );
};

const Footer = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#D9630E',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ color: 'white', fontSize: 12 }}>
        Todos os direitos reservados a © ALIMENTECH
      </Text>
    </View>
  );
};

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Menu />

      <View
        style={{
          flex: 8,
          backgroundColor: '#007047',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.8,
            backgroundColor: '#0FA971',
            justifyContent: 'space-evenly',
            padding: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 600,
              textAlign: 'center',
            }}>
            Queremos te ajudar a sair da situação que você se encontra.
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 600,
              textAlign: 'center',
            }}>
            Clique em prosseguir para que isso seja possível.
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#9E642E',
              width: '60%',
              padding: 10,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('Formulario')}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 23,
              }}>
              Prosseguir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const Form = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const openAiKey = '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'; // Substitua com a sua chave de API do GPT-3.5
  const orgId = 'org-qWI37OoJXtQX1t9w5FhJ8eRj';

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: `Chatgpt, preciso que você me ajude com o plantio autônomo. ${question}`,
          max_tokens: 300,
          temperature: 0.1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
            'OpenAI-Organization': `${orgId}`,
          },
        }
      );

      if (response.data.choices && response.data.choices.length > 0) {
        setAnswer(response.data.choices[0].text);
      } else {
        setAnswer('Não foi possível obter uma resposta do modelo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao fazer a requisição. Por favor, tente novamente mais tarde.'
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 8, backgroundColor: '#0FA971', alignItems: 'center', padding: 20 }}>
        <View style={{ flex: 1, justifyContent: "space-evenly", marginBottom: 30, marginTop: 30}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#007047',
                padding: 30,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 600,
                }}>
                Por favor, descreva sua área de plantio
              </Text>
            </View>
            <TextInput
              placeholder="Digite aqui..."
              style={{
                backgroundColor: '#0A4630',
                color: 'white',
                padding: 20,
                textAlign: 'center',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                marginBottom: 30
              }}
              value={question}
              onChangeText={setQuestion}
            />
            

          <TouchableOpacity style={{
              backgroundColor: '#9E642E',
              padding: 20,
              borderRadius: 10}} 
              onPress={handleAskQuestion}>
            <Text style={{color: "white", fontSize: 20, textAlign: "center", fontWeight: 600}}>Pronto!</Text>
          </TouchableOpacity>
          </View>

          <ScrollView style={{flex: 1, backgroundColor: "#007047", padding: 30, borderRadius: 10, marginTop: 100 }}>
            <Text style={{color: "white", fontSize: 20, fontWeight: 500, textAlign: "center"}}>{answer}</Text>
          </ScrollView>
        </View>
      </View>

      <Footer />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Formulario"
          component={Form}
          options={{
            title: 'Alimentech',
            headerStyle: {
              backgroundColor: '#FF8412',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 700,
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
