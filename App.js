import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "./src/services/api";

export default function App() {
    const [cepUser, setcepUser] = useState(null);
    const [cep, setcep] = useState("");
    const inputRef = useRef(null);

    async function buscar() {
        if (cep == "") {
            alert("Digite em CEP Valido");
            setcep("");
            return;
        }

        try {
            const response = await api.get(`/${cep}/json`);
            Keyboard.dismiss();
            setcepUser(response.data);
            setcep('')
        } catch (error) {
            console.error(error);
        }
    }

    function limpar() {
        setcep("");
        inputRef.current.focus();
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.text}>Digite o CEP Desejado</Text>
                <TextInput
                    placeholder="Digite o Seu CEP"
                    value={cep}
                    onChangeText={(valor) => setcep(valor)}
                    style={styles.input}
                    keyboardType="numeric"
                    ref={inputRef}
                />
            </View>
            <View style={styles.areaBtn}>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#1d75cd" }]}
                    onPress={buscar}>
                    <Text style={styles.btnText}>Buscar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#ff0000" }]}
                    onPress={limpar}>
                    <Text style={styles.btnText}>Voltar</Text>
                </TouchableOpacity>
            </View>
            {cepUser && (
                <View style={styles.resultado}>
                    <Text style={styles.itemText}>CEP {cepUser.cep}</Text>
                    <Text style={styles.itemText}>
                        logradouro {cepUser.logradouro}
                    </Text>
                    <Text style={styles.itemText}>bairro {cepUser.bairro}</Text>
                    <Text style={styles.itemText}>
                        Cidade {cepUser.localidade}
                    </Text>
                    <Text style={styles.itemText}>Estado {cepUser.estado}</Text>
                </View>
            )}

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 25,
        marginBottom: 15,
        fontSize: 25,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        width: "90%",
        padding: 10,
        fontSize: 18,
    },
    areaBtn: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-around",
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 5,
    },
    btnText: {
        fontSize: 28,
        color: "#fff",
    },
    resultado: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    itemText: {
        fontSize: 22,
    },
});
