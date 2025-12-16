import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function DriverWelcomeScreen() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [zone, setZone] = useState('');
    const [carType, setCarType] = useState('');

    const handleNext = () => {
        // TODO: Guardar datos y continuar al siguiente paso
        console.log('Datos conductor:', { fullName, phone, email, zone, carType });
        router.push('/(conductor)/documents');
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
                <Text style={styles.headerTitle}>REGISTRO CONDUCTOR</Text>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressText}>Paso 1 de 3</Text>
                    <Text style={styles.progressLabel}>Datos personales</Text>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={styles.progressBarFill} />
                </View>
            </View>

            {/* Main Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>¡Bienvenido a RealGo!</Text>
                    <Text style={styles.subtitle}>Completa tus datos para empezar a conducir.</Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Nombres completos */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombres completos</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>👤</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Carlos Mendoza"
                                placeholderTextColor="#9fc893"
                                value={fullName}
                                onChangeText={setFullName}
                            />
                        </View>
                    </View>

                    {/* Teléfono */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Teléfono</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>📱</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="956 000 000"
                                placeholderTextColor="#9fc893"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={9}
                            />
                        </View>
                    </View>

                    {/* Correo */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>✉️</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="carlos@ejemplo.com"
                                placeholderTextColor="#9fc893"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>🔒</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="******"
                                placeholderTextColor="#9fc893"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                            >
                                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Zona */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Zona donde operas</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>📍</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Selecciona tu zona"
                                placeholderTextColor="#9fc893"
                                value={zone}
                                onChangeText={setZone}
                            />
                            <Text style={styles.dropdownIcon}>▼</Text>
                        </View>
                    </View>

                    {/* Tipo de carro */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>TIPO DE CARRO</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcon}>🚗</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Selecciona modelo"
                                placeholderTextColor="#9fc893"
                                value={carType}
                                onChangeText={setCarType}
                            />
                            <Text style={styles.dropdownIcon}>▼</Text>
                        </View>
                    </View>
                </View>

                {/* Spacer for fixed button */}
                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.nextButtonText}>SIGUIENTE</Text>
                    <Text style={styles.nextButtonArrow}>→</Text>
                </TouchableOpacity>
            </View>
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
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#f6f8f6',
    },
    backButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: '#111418',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111418',
        letterSpacing: 0.5,
        flex: 1,
        textAlign: 'center',
        marginRight: 48,
    },
    progressContainer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#f6f8f6',
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111418',
    },
    progressLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#49e619',
    },
    progressBarBg: {
        width: '100%',
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '33.33%',
        height: '100%',
        backgroundColor: '#49e619',
        borderRadius: 3,
        shadowColor: '#49e619',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    titleContainer: {
        paddingVertical: 8,
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111418',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#637588',
    },
    formContainer: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111418',
        marginLeft: 4,
    },
    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: 16,
        fontSize: 20,
        zIndex: 1,
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#3f6534',
        borderRadius: 12,
        paddingLeft: 48,
        paddingRight: 48,
        paddingVertical: 16,
        fontSize: 16,
        color: '#111418',
    },
    eyeButton: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
    eyeIcon: {
        fontSize: 20,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 16,
        fontSize: 16,
        color: '#9fc893',
    },
    bottomSpacer: {
        height: 20,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'linear-gradient(to top, #f6f8f6, transparent)',
    },
    nextButton: {
        backgroundColor: '#49e619',
        paddingVertical: 16,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#49e619',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 8,
    },
    nextButtonText: {
        color: '#152111',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    nextButtonArrow: {
        color: '#152111',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
