import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';

import axios from 'axios';

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
            padding: 30,
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
            onPress={() => navigation.navigate('Auth')}>
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


const Form = ({navigation}) => {
  const [area, setArea] = useState('')
  const [regiao, setRegiao] = useState('')
  const [tempoEspera, setTempoEspera] = useState('')
  const [recursos, setRecursos] = useState('')
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false)
  const openAiKey = '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'; 

  const question = `Eu possuo uma área de ${area}m² para plantio, moro na região de ${regiao}, consigo esperar ${tempoEspera} até a colheita e tenho os seguintes recursos: ${recursos}`

  useEffect(() => {
    if (answer) {
      setLoading(false); 
      navigation.navigate('ResponseFormulario', { answer: answer });
    }
  }, [answer, navigation]);

  const handleAskQuestion = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: `'Você é um assistente que dá dicas sobre plantio para consumo próprio. Lembre-se de fornecer informações sobre técnicas de agricultura sustentável, como agricultura vertical, aquaponia` },
            { role: 'user', content: question }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`
          },
        }
      )

      if (response.data.choices && response.data.choices.length > 0) {
        setAnswer(response.data.choices[0].message.content);
      } else {
        setAnswer('Não foi possível obter uma resposta do modelo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao fazer a requisição. Por favor, tente novamente mais tarde.'
      );
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 8, backgroundColor: '#0FA971' }}>
  
        <View style={{backgroundColor: "#0A4630", padding: 20}}>
              <Text style={{color: "white", textAlign: "center", fontWeight: 600, fontSize: 25, marginBottom: 30, opacity: 0.6}}>Para tornar as dicas mais específicas, precisamos que você nos forneça algumas informações</Text>
            </View>
        <View style={{ flex: 1, justifyContent: "space-evenly", marginBottom: 30, marginTop: 30, padding: 20}}>
          
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
                Descreva sua área de plantio em m².
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
              value={area}
              onChangeText={setArea}
            />

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
                Onde você mora?
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
              value={regiao}
              onChangeText={setRegiao}
            />

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
                Quanto tempo você consegue esperar até a colheita?
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
              value={tempoEspera}
              onChangeText={setTempoEspera}
            />

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
                Quais recursos você tem disponível?
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
              value={recursos}
              onChangeText={setRecursos}
            />
            

          <TouchableOpacity style={{
              backgroundColor: '#9E642E',
              padding: 20,
              borderRadius: 10}} 
              onPress={handleAskQuestion}
              disabled={loading}
              >
            {loading 
            ? (
              <ActivityIndicator color="white" />
            ) 
            : (
              <Text style={{ color: 'white', fontSize: 20, textAlign: "center" }}>Pronto</Text>
            )}
          </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
};

const ResponseForm = ({ navigation, route }) => {
  const { answer } = route.params;
  console.log(answer)

  return (
    <View style={{ flex: 1 }}>
      <View style={{flex: 0.4, justifyContent: "center", alignItems: "center", backgroundColor: "#0A4630"}}>
          <Text style={{fontSize: 30, fontWeight: 600, textAlign: "center"}}>Dicas para uma boa colheita :)</Text>
      </View>
      <View style={{flex: 1, backgroundColor: "#007047", padding: 30}}>
          <ScrollView
              style={{ backgroundColor: '#0F855B', padding: 30, borderRadius: 20 }}>
                <Text style={{textAlign: "center", fontSize: 20, fontWeight: 500, marginBottom: 50}}>{answer}</Text>
          </ScrollView>
      </View>
  </View>
  );
}

export default function App() {


  const Auth = ({ navigation }) => {

    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [usuarioLogado, setUsuarioLogado] = useState();
    

    useEffect( ()=> {  
      AsyncStorage.getItem("USUARIOS")
      .then((info)=>{
        if (!info) {
          setListaUsuarios([])
        } else { 
          setListaUsuarios(JSON.parse(info))
        }
      })
      .catch((err)=>{
        alert("Erro ao ler a lista de usuarios: ", err)
      })
    }, [])

    return(
      <View style={{ flex: 1 }}>

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
            width: '100%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 30,
            }}>
            {' '}
            Auth{' '}
          </Text>

          <TextInput
            style={{
              backgroundColor: '#007047',
              borderRadius: 10,
              color: '#FFFFFF',
              textAlign: 'center',
              height: '10%',
              width: '60%',
              alignSelf: 'center',
            }}
            placeholder="Insira seu nome..."
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={{
              backgroundColor: '#007047',
              borderRadius: 10,
              color: '#FFFFFF',
              textAlign: 'center',
              height: '10%',
              width: '60%',
              alignSelf: 'center',
            }}
            placeholder="Insira seu e-mail..."
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={{
              backgroundColor: '#007047',
              borderRadius: 10,
              color: '#FFFFFF',
              textAlign: 'center',
              height: '10%',
              width: '60%',
              alignSelf: 'center',
            }}
            placeholder="Insira sua senha..."
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#9E642E',
              width: '60%',
              padding: 10,
              alignSelf: 'center',
              borderRadius: 10,
            }} >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 25,
              }}
              onPress={()=>{
                const obj = {email, senha} 
                const lista = [...listaUsuarios, obj]
                setListaUsuarios(lista)
                AsyncStorage.setItem("USUARIOS", JSON.stringify(lista))
                .then((info)=>{alert("Usuario registrado com sucesso! :D")})
                .catch((err)=>{alert("Erro: " + err)})
                
              }}>
              Cadastrar
            </Text>
          </TouchableOpacity>

          <Text style={{color: "white", textAlign: "center"}}>Ou</Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#9E642E',
              width: '60%',
              padding: 10,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            onPress={()=>{
              let achou = false
              for (let i = 0; i < listaUsuarios.length; i++) {
                const item = listaUsuarios[i];
                if (item.email == email 
                    && item.senha == senha) {
                      setUsuarioLogado(nome)
                      navigation.navigate("Formulario")
                      achou = true;
                      break;
                }
              }
              if (!achou) { 
                alert("Usuario ou senha estao incorretos")
              }
            }} >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 25,
              }}>
              Login
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <Footer />
    </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            title: 'Alimentech',
            headerStyle: {
              backgroundColor: '#FF8412',
              height: 120
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 700,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Formulario"
          component={Form}
          options={{
            title: 'Alimentech',
            headerStyle: {
              backgroundColor: '#FF8412',
              height: 120
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 700,
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ResponseFormulario"
          component={ResponseForm}
          options={{
            title: 'Alimentech',
            headerStyle: {
              backgroundColor: '#FF8412',
              height: 120
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
