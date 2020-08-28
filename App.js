/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

export default class App extends Component {
  state = {
    cep: '',
    dados: {
      logradouro: '',
      uf: '',
      bairro: '',
      localidade: '',
      ibge: '',
    },
  };
  buscarCep = (cep) => {
    this.setState({
      dados: {
        logradouro: '',
        uf: '',
        bairro: '',
        localidade: '',
        ibge: '',
      },
    });
    fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dados: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            style={styles.img}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/b/be/Mapa_do_Brasil_com_a_Bandeira_Nacional.png',
            }}
          />
        </View>
        <Text style={styles.text}>Buscar cep</Text>

        <TextInput
          keyboardType={'numeric'}
          maxLength={8}
          value={this.state.cep}
          onChangeText={(cep) => {
            this.setState({cep});
          }}
          style={styles.input}
          placeholder="Digite seu cep"
          placeholderTextColor="#c3c3c3"
        />
        <TouchableOpacity style={styles.button} onPress={this.buscarCep}>
          <Text>Buscar</Text>
        </TouchableOpacity>
        {this.state.dados.localidade ? (
          <View>
            <Text>Estado: {this.state.dados.uf}</Text>
            <Text>Ibge: {this.state.dados.ibge}</Text>
            <Text>Cidade: {this.state.dados.localidade}</Text>
            <Text>Bairro: {this.state.dados.bairro}</Text>
            <Text>Rua: {this.state.dados.logradouro}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 200,
  },
  center: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  text: {
    textAlign: 'center',
    fontSize: 30,
  },
  input: {
    marginTop: 40,
    borderWidth: 4,
    borderColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gold',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
