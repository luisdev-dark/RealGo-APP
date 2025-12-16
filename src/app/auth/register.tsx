import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

export default function RegisterScreen() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [zone, setZone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        // Validaciones
        if (!fullName || !phone || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
            return;
        }

        if (phone.length !== 9) {
            Alert.alert('Error', 'El teléfono debe tener 9 dígitos');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (!acceptTerms) {
            Alert.alert('Error', 'Debes aceptar los términos y condiciones');
            return;
        }

        setLoading(true);

        try {
            // Usar el teléfono como email si no se proporciona
            const userEmail = email || `${phone}@realgo.app`;

            // Crear usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
            const user = userCredential.user;

            // Actualizar perfil con el nombre
            await updateProfile(user, {
                displayName: fullName
            });

            // Guardar datos adicionales en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                fullName,
                phone,
                email: userEmail,
                zone,
                role: 'passenger',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            console.log('Usuario registrado:', user.uid);

            // Navegar a home
            router.replace('/(pasajero)/home');
        } catch (error: any) {
            console.error('Error en registro:', error);

            let errorMessage = 'Ocurrió un error al registrar';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este correo ya está registrado';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'El correo no es válido';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'La contraseña es muy débil';
            }

            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>REGISTRO PASAJERO</Text>
                <View style={styles.spacer} />
            </View>

            {/* Form */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.formContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Nombres completos */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombres completos</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Juan Pérez"
                            placeholderTextColor="#9fc893"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                        <Text style={styles.inputIcon}>👤</Text>
                    </View>
                </View>

                {/* Teléfono */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Teléfono (WhatsApp)</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="987 654 321"
                            placeholderTextColor="#9fc893"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            maxLength={9}
                        />
                        <Text style={styles.inputIcon}>📱</Text>
                    </View>
                    <Text style={styles.helperText}>Debe tener 9 dígitos</Text>
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo (opcional)</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="juan@ejemplo.com"
                            placeholderTextColor="#9fc893"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Text style={styles.inputIcon}>✉️</Text>
                    </View>
                </View>

                {/* Zona */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Zona donde vives</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Selecciona tu zona"
                            placeholderTextColor="#9fc893"
                            value={zone}
                            onChangeText={setZone}
                        />
                        <Text style={styles.inputIcon}>📍</Text>
                    </View>
                </View>

                {/* Contraseña */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Crear contraseña</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••"
                            placeholderTextColor="#9fc893"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                        >
                            <Text style={styles.inputIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.helperText}>Mínimo 6 caracteres</Text>
                </View>

                {/* Términos y condiciones */}
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setAcceptTerms(!acceptTerms)}
                >
                    <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                        {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>
                        ACEPTO <Text style={styles.termsLink}>TÉRMINOS Y CONDICIONES</Text>
                    </Text>
                </TouchableOpacity>

                {/* Botón de registro */}
                <TouchableOpacity
                    style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                    onPress={handleRegister}
                    activeOpacity={0.8}
                    disabled={loading}
                >
                    <Text style={styles.registerButtonText}>
                        {loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA PASAJERO'}
                    </Text>
                </TouchableOpacity>

                {/* Link a login */}
                <View style={styles.loginLinkContainer}>
                    <Text style={styles.loginText}>Ya tengo cuenta: </Text>
                    <TouchableOpacity onPress={() => router.push('/auth/login')}>
                        <Text style={styles.loginLink}>INICIAR SESIÓN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8f6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#152111',
        borderBottomWidth: 1,
        borderBottomColor: '#3f6534',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    spacer: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    formContainer: {
        padding: 24,
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111418',
        paddingLeft: 8,
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#3f6534',
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#111418',
        paddingRight: 50,
    },
    inputIcon: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -12 }],
        fontSize: 20,
    },
    eyeButton: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -20 }],
        padding: 8,
    },
    helperText: {
        fontSize: 12,
        color: '#637588',
        paddingLeft: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 8,
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#3f6534',
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#49e619',
        borderColor: '#49e619',
    },
    checkmark: {
        color: '#152111',
        fontSize: 14,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111418',
        flex: 1,
    },
    termsLink: {
        color: '#49e619',
        textDecorationLine: 'underline',
    },
    registerButton: {
        backgroundColor: '#49e619',
        paddingVertical: 16,
        borderRadius: 100,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#49e619',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
    },
    registerButtonDisabled: {
        backgroundColor: '#9fc893',
        opacity: 0.6,
    },
    registerButtonText: {
        color: '#152111',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    loginText: {
        fontSize: 14,
        color: '#637588',
    },
    loginLink: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#49e619',
    },
});
