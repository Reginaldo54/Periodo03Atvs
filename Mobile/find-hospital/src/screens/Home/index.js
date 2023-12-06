import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [hospital, setHospital] = useState('');
    const [address, setAddress] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`${hospital}&resource_id=54232db8-ed15-4f1f-90b0-2b5a20eef4cf`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um Hospital válido.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um Hospital válido');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setHospital('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!address &&
                    <Input
                        keyboardType="numeric"
                        maxLength={8}
                        onChangeText={setHospital}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o Hospital que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={hospital}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {address &&
                <AddressArea>
                    <Text>Nome Oficial: {hospital}</Text>
                    <Text>Descrição:{address.logradouro}</Text>
                    <Text>Especialidade: {address.bairro}</Text>
                    <Text>Cidade: {address.localidade}</Text>
                    <Text>IBGE: {address.ibge}</Text>
                    <Text>DDD: {address.ddd}</Text>
                    <Text>UF: {address.uf}</Text>
                </AddressArea>
            }
        </Container>
    );
}