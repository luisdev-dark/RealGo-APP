import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // TODO: Implementar lógica de login con Firebase
        console.log('Login:', phone, password);
        router.replace('/(pasajero)/home');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoIcon}>🚕</Text>
                    </View>
                    <Text style={styles.logoText}>RealGo</Text>
                    <Text style={styles.logoSubtext}>Tu viaje seguro en Chincha</Text>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>INICIAR SESIÓN</Text>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    {/* Phone */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Teléfono</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="987 654 321"
                                placeholderTextColor="#9CA3AF"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={9}
                            />
                            <Text style={styles.inputIcon}>📱</Text>
                        </View>
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                            >
                                <Text style={styles.inputIcon}>{showPassword ? '👁️' : '🔒'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Spacer */}
                    <View style={styles.spacer} />

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.loginButtonText}>INGRESAR</Text>
                        <Text style={styles.loginButtonArrow}>→</Text>
                    </TouchableOpacity>

                    {/* SMS Button */}
                    <TouchableOpacity
                        style={styles.smsButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.smsIcon}>💬</Text>
                        <Text style={styles.smsButtonText}>Ingresar con código SMS</Text>
                    </TouchableOpacity>
                </View>

                {/* Links */}
                <View style={styles.linksContainer}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>
                            ¿Olvidaste tu contraseña? <Text style={styles.linkHighlight}>RECUPERAR</Text>
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => router.push('/auth/register')}>
                        <Text style={styles.linkText}>
                            Primera vez: <Text style={styles.linkHighlight}>REGISTRARSE</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Decorative circles */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#152111',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#1e2f1b',
        borderWidth: 1,
        borderColor: 'rgba(73, 230, 25, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    logoIcon: {
        fontSize: 40,
    },
    logoText: {
        fontSize: 30,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    logoSubtext: {
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 4,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    formContainer: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#D1D5DB',
        marginLeft: 16,
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        backgroundColor: '#2c4724',
        borderRadius: 100,
        paddingHorizontal: 24,
        paddingVertical: 16,
        fontSize: 16,
        color: '#FFFFFF',
        paddingRight: 50,
    },
    inputIcon: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: [{ translateY: -12 }],
        fontSize: 20,
        color: '#49e619',
    },
    eyeButton: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -20 }],
        padding: 8,
    },
    spacer: {
        height: 8,
    },
    loginButton: {
        backgroundColor: '#49e619',
        paddingVertical: 16,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#49e619',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
    },
    loginButtonText: {
        color: '#152111',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    loginButtonArrow: {
        color: '#152111',
        fontSize: 20,
        fontWeight: 'bold',
    },
    smsButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(73, 230, 25, 0.3)',
        paddingVertical: 14,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4,
    },
    smsIcon: {
        fontSize: 18,
    },
    smsButtonText: {
        color: '#49e619',
        fontSize: 16,
        fontWeight: '600',
    },
    linksContainer: {
        marginTop: 40,
        alignItems: 'center',
        gap: 16,
    },
    linkText: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    linkHighlight: {
        color: '#49e619',
        fontWeight: 'bold',
    },
    divider: {
        width: 200,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    decorativeCircle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 256,
        height: 256,
        borderRadius: 128,
        backgroundColor: 'rgba(73, 230, 25, 0.05)',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: 'rgba(73, 230, 25, 0.03)',
    },
});
