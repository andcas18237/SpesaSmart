import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, Alert, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ScreenContainer } from '../../../../components/screen-container';
import { trpc } from '@/lib/trpc';

/**
 * Scanner Screen - Capture receipt photos.
 * Integrates with expo-camera for actual camera functionality.
 */
export default function ScannerScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);
  const [capturedPhotoBase64, setCapturedPhotoBase64] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);

  const processReceiptMutation = trpc.expenses.processReceipt.useMutation();

  // Request camera permission on mount
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Handle camera permission denied
  if (!permission) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center p-4">
        <Text className="text-lg font-bold text-foreground mb-4">
          Permesso fotocamera richiesto
        </Text>
        <Text className="text-base text-muted text-center mb-6">
          L'app ha bisogno dell'accesso alla fotocamera per scansionare gli scontrini.
        </Text>
        <Pressable
          onPress={requestPermission}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <View className="bg-primary rounded-full py-3 px-6 items-center justify-center">
            <Text className="text-white font-bold text-lg">
              Abilita Fotocamera
            </Text>
          </View>
        </Pressable>
      </ScreenContainer>
    );
  }

  if (!permission.granted) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center p-4">
        <Text className="text-lg font-bold text-foreground mb-4">
          Accesso fotocamera negato
        </Text>
        <Text className="text-base text-muted text-center mb-6">
          Per usare lo scanner, consenti l'accesso alla fotocamera nelle impostazioni.
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <View className="bg-surface border border-border rounded-full py-3 px-6 items-center justify-center">
            <Text className="text-foreground font-bold text-lg">
              Indietro
            </Text>
          </View>
        </Pressable>
      </ScreenContainer>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        setCapturedPhotoUri(photo.uri);
        setCapturedPhotoBase64(photo.base64 || null);
        setIsPreview(true);
      } catch (error) {
        Alert.alert('Errore', 'Impossibile scattare la foto. Riprova.');
        console.error('Camera capture error:', error);
      }
    }
  };

  const handleConfirm = async () => {
    if (!capturedPhotoBase64) return;

    try {
      setIsProcessing(true);
      
      console.log('Base64 string length:', capturedPhotoBase64.length);

      // Call tRPC procedure with base64 from camera
      const result = await processReceiptMutation.mutateAsync({
        imageBase64: capturedPhotoBase64,
      });

      // Log and save result
      console.log('OCR Result:', result);
      setOcrResult(result);
      
      // Per ora torniamo indietro come richiesto, ma dopo aver loggato
      // In futuro qui si passerà alla schermata dei risultati
      router.back();
    } catch (error) {
      console.error('OCR processing error:', error);
      Alert.alert('Errore', 'Si è verificato un errore durante l\'elaborazione dello scontrino.');
    } finally {
      setIsProcessing(false);
    }
  }

  const handleRetry = () => {
    setCapturedPhotoUri(null);
    setCapturedPhotoBase64(null);
    setIsPreview(false);
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  return (
    <ScreenContainer className="p-4">
      {isProcessing && (
        <View className="absolute inset-0 z-50 bg-background/80 items-center justify-center">
          <ActivityIndicator size="large" color="#10B981" />
          <Text className="text-foreground font-semibold mt-4">Elaborazione...</Text>
        </View>
      )}
      {!isPreview ? (
        // Camera View
        <View className="flex-1 gap-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-primary font-semibold">
                Annulla
              </Text>
            </Pressable>
            <Text className="text-lg font-bold text-foreground">
              Scansiona Scontrino
            </Text>
            <Pressable onPress={toggleFlash}>
              <Text className="text-lg text-primary font-semibold">
                {flashEnabled ? '⚡' : '🔦'}
              </Text>
            </Pressable>
          </View>

          {/* Camera View */}
          <View className="flex-1 rounded-2xl overflow-hidden border-2 border-border">
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing="back"
              flash={flashEnabled ? 'on' : 'off'}
            >
              {/* Guide Frame */}
              <View className="flex-1 items-center justify-center">
                <View
                  style={{
                    width: '80%',
                    aspectRatio: 1.4,
                    borderWidth: 2,
                    borderColor: '#10B981',
                    borderRadius: 12,
                    backgroundColor: 'transparent',
                  }}
                />
              </View>
            </CameraView>
          </View>

          {/* Capture Button */}
          <Pressable
            onPress={handleCapture}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View className="bg-primary rounded-full py-4 items-center justify-center">
              <Text className="text-white font-bold text-lg">Scatta</Text>
            </View>
          </Pressable>
        </View>
      ) : (
        // Preview View
        <View className="flex-1 gap-4">
          {/* Header */}
          <View className="mb-4">
            <Text className="text-lg font-bold text-foreground">
              Anteprima
            </Text>
          </View>

          {/* Photo Preview */}
          {capturedPhotoUri && (
            <View className="flex-1 bg-surface rounded-2xl border-2 border-border overflow-hidden">
              <Image
                source={{ uri: capturedPhotoUri }}
                style={{ flex: 1 }}
                resizeMode="contain"
              />
            </View>
          )}

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleConfirm}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View className="bg-primary rounded-full py-4 items-center justify-center">
                <Text className="text-white font-bold text-lg">
                  Conferma
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleRetry}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="bg-surface border border-border rounded-full py-4 items-center justify-center">
                <Text className="text-foreground font-bold text-lg">
                  Riprova
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
