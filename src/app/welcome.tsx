import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header con mapa de fondo */}
            <View style={styles.header}>
                <View style={styles.headerGradient}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/icon.png')}
                            style={styles.logoIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.logoText}>REALGO</Text>
                    </View>
                    <Text style={styles.subtitle}>Transporte de Chincha</Text>
                </View>
            </View>

            {/* Pregunta */}
            <View style={styles.questionSection}>
                <Text style={styles.questionTitle}>¿Eres pasajero o conductor?</Text>
                <Text style={styles.questionSubtitle}>Selecciona tu perfil para comenzar</Text>
            </View>

            {/* Tarjetas de acción */}
            <View style={styles.cardsContainer}>
                {/* Tarjeta Pasajero */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => router.push('/auth/register')}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardIcon}>🙋</Text>
                            <Text style={styles.cardTitle}>SOY PASAJERO</Text>
                        </View>
                        <Text style={styles.cardDescription}>Solicita transporte regulado y viaja seguro</Text>
                        <View style={styles.cardAction}>
                            <Text style={styles.cardActionText}>Continuar</Text>
                            <Text style={styles.cardActionArrow}>→</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Tarjeta Conductor */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => router.push('/(conductor)/welcome')}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardIcon}>🚗</Text>
                            <Text style={styles.cardTitle}>SOY CONDUCTOR</Text>
                        </View>
                        <Text style={styles.cardDescription}>Gestiona tus rutas y aumenta tus ganancias</Text>
                        <View style={styles.cardAction}>
                            <Text style={styles.cardActionText}>Continuar</Text>
                            <Text style={styles.cardActionArrow}>→</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Opción de invitado */}
            <View style={styles.guestSection}>
                <TouchableOpacity
                    style={styles.guestButton}
                    onPress={() => router.push('/(pasajero)/home')}
                >
                    <Text style={styles.guestButtonTitle}>ACCEDER SIN REGISTRO</Text>
                    <Text style={styles.guestButtonSubtitle}>Solo ver rutas disponibles</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8f6',
    },
    header: {
        height: 240,
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        backgroundColor: '#152111',
    },
    headerGradient: {
        flex: 1,
        padding: 24,
        justifyContent: 'flex-end',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    logoIcon: {
        width: 40,
        height: 40,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    subtitle: {
        color: '#49e619',
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    questionSection: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    questionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111418',
        textAlign: 'center',
        marginBottom: 8,
    },
    questionSubtitle: {
        fontSize: 14,
        color: '#637588',
        textAlign: 'center',
    },
    cardsContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    cardContent: {
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardIcon: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111418',
    },
    cardDescription: {
        fontSize: 14,
        color: '#637588',
        lineHeight: 20,
    },
    cardAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    cardActionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#49e619',
    },
    cardActionArrow: {
        fontSize: 18,
        color: '#49e619',
    },
    guestSection: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginTop: 'auto',
        marginBottom: 24,
    },
    guestButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    guestButtonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111418',
        letterSpacing: 0.5,
    },
    guestButtonSubtitle: {
        fontSize: 12,
        color: '#637588',
        marginTop: 4,
    },
});
