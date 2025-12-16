import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

type DocumentStatus = {
    uploaded: boolean;
    uri?: string;
};

export default function DriverDocumentsScreen() {
    const router = useRouter();
    const [documents, setDocuments] = useState({
        dni: { uploaded: false } as DocumentStatus,
        license: { uploaded: false } as DocumentStatus,
        soat: { uploaded: false } as DocumentStatus,
        property: { uploaded: false } as DocumentStatus,
        health: { uploaded: false } as DocumentStatus,
        carPhoto: { uploaded: false } as DocumentStatus,
    });

    const uploadedCount = Object.values(documents).filter(doc => doc.uploaded).length;
    const totalDocs = 6;
    const progress = (uploadedCount / totalDocs) * 100;

    const handleUploadDocument = (docType: keyof typeof documents) => {
        // TODO: Implementar lógica de cámara/galería con expo-image-picker
        console.log('Subir documento:', docType);
    };

    const handleSubmit = () => {
        if (uploadedCount === totalDocs) {
            // TODO: Enviar documentos a verificación
            console.log('Enviando documentos a verificación');
            router.push('/(conductor)/verification-pending');
        }
    };

    const DocumentItem = ({
        title,
        subtitle,
        docKey
    }: {
        title: string;
        subtitle?: string;
        docKey: keyof typeof documents;
    }) => {
        const isUploaded = documents[docKey].uploaded;

        return (
            <TouchableOpacity
                style={styles.documentItem}
                onPress={() => handleUploadDocument(docKey)}
                activeOpacity={0.7}
            >
                <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle}>{title}</Text>
                    {subtitle && <Text style={styles.documentSubtitle}>{subtitle}</Text>}
                    <View style={styles.statusContainer}>
                        <Text style={isUploaded ? styles.statusUploaded : styles.statusNotUploaded}>
                            {isUploaded ? '✓' : '✕'} {isUploaded ? 'Subido' : 'No subido'}
                        </Text>
                    </View>
                </View>
                <View style={[styles.uploadButton, isUploaded && styles.uploadButtonActive]}>
                    <Text style={styles.uploadIcon}>📷</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>DOCUMENTOS REQUERIDOS</Text>
            </View>

            {/* Main Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Progress Section */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Tu Progreso</Text>
                        <Text style={styles.progressCount}>{uploadedCount}/{totalDocs} Subidos</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                    </View>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoIcon}>ℹ️</Text>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Requisito Importante</Text>
                        <Text style={styles.infoText}>
                            Asegúrate de que los documentos sean legibles, estén vigentes y la foto no tenga reflejos.
                        </Text>
                    </View>
                </View>

                {/* Documents List */}
                <View style={styles.documentsList}>
                    <DocumentItem title="DNI (Frontal)" docKey="dni" />
                    <DocumentItem title="Licencia de Conducir" docKey="license" />
                    <DocumentItem title="SOAT Vigente" docKey="soat" />
                    <DocumentItem title="Tarjeta de Propiedad" docKey="property" />
                    <DocumentItem title="Certificado de Salud" docKey="health" />
                    <DocumentItem
                        title="Foto del Auto"
                        subtitle="Frontal / Lateral"
                        docKey="carPhoto"
                    />
                </View>

                {/* Bottom Spacer */}
                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        uploadedCount === totalDocs && styles.submitButtonActive
                    ]}
                    onPress={handleSubmit}
                    disabled={uploadedCount !== totalDocs}
                    activeOpacity={0.8}
                >
                    <Text style={[
                        styles.submitButtonText,
                        uploadedCount === totalDocs && styles.submitButtonTextActive
                    ]}>
                        ENVIAR A VERIFICACIÓN
                    </Text>
                </TouchableOpacity>
                <Text style={styles.footerNote}>
                    La verificación toma aproximadamente 24h
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#152111',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingTop: 24,
        backgroundColor: 'rgba(21, 33, 17, 0.95)',
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
        flex: 1,
        textAlign: 'center',
        marginRight: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 180,
    },
    progressSection: {
        marginTop: 24,
        marginBottom: 24,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    progressCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#49e619',
    },
    progressBarBg: {
        height: 12,
        width: '100%',
        backgroundColor: '#1e2b1a',
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#49e619',
        borderRadius: 6,
        shadowColor: '#49e619',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    infoBox: {
        flexDirection: 'row',
        gap: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(73, 230, 25, 0.2)',
        backgroundColor: 'rgba(73, 230, 25, 0.05)',
        padding: 16,
        marginBottom: 24,
    },
    infoIcon: {
        fontSize: 24,
        marginTop: 2,
    },
    infoContent: {
        flex: 1,
        gap: 4,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    infoText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9fc893',
        lineHeight: 20,
    },
    documentsList: {
        gap: 12,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#1e2b1a',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    documentInfo: {
        flex: 1,
    },
    documentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    documentSubtitle: {
        fontSize: 12,
        color: '#9fc893',
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusNotUploaded: {
        fontSize: 12,
        fontWeight: '500',
        color: '#EF4444',
    },
    statusUploaded: {
        fontSize: 12,
        fontWeight: '500',
        color: '#49e619',
    },
    uploadButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(73, 230, 25, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButtonActive: {
        backgroundColor: '#49e619',
    },
    uploadIcon: {
        fontSize: 24,
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
        paddingTop: 48,
        backgroundColor: 'linear-gradient(to top, #152111, transparent)',
    },
    submitButton: {
        backgroundColor: '#1e2b1a',
        paddingVertical: 16,
        borderRadius: 100,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    submitButtonActive: {
        backgroundColor: '#49e619',
        borderColor: '#49e619',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: 0.5,
    },
    submitButtonTextActive: {
        color: '#152111',
    },
    footerNote: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        color: '#9fc893',
    },
});
