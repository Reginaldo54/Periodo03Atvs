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
            const { status, data } = await api.get();

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um Hospital válido.');
            } else {
                
                
                let array = data.result.records;
                for(const element of array)
                {
                    if(element.nome_oficial.includes(hospital.toLowerCase()))
                    {
                        console.log(element);
                        setAddress(element);
                    }
                }
                
                
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
                        keyboardType="string"
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
                    <Text>Nome Oficial: {address.nome_oficial}</Text>
                    <Text>Endereço:{address.endereço}</Text>
                    <Text>Especialidade: {address.especialidade}</Text>
                    <Text>Horário de antedimento: {address.horario}</Text>
                    <Text>Tipo de serviço: {address.tipo_servico}</Text>
                </AddressArea>
            }
        </Container>
    );
}