import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { useColors } from '../../../../hooks/use-colors';

export interface VoiceInputModalProps {
  visible: boolean;
  productName?: string;
  onConfirm: (text: string) => void;
  onCancel: () => void;
}

/**
 * Voice Input Modal - Allows user to correct product names via voice.
 * TODO: Integrate with expo-speech-recognition for actual voice input.
 * Currently shows placeholder UI with mock transcription.
 */
export function VoiceInputModal({
  visible,
  productName,
  onConfirm,
  onCancel,
}: VoiceInputModalProps) {
  const colors = useColors();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscription('');
    // TODO: Start actual voice recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Stop recording and get transcription
    // Mock transcription for now
    setTranscription('Pane integrale');
  };

  const handleConfirm = () => {
    if (transcription.trim()) {
      onConfirm(transcription);
      setTranscription('');
      setIsRecording(false);
    }
  };

  const handleCancel = () => {
    setTranscription('');
    setIsRecording(false);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View
          className="bg-background rounded-t-3xl p-6 gap-6"
          style={{
            paddingBottom: 32,
          }}
        >
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Cosa hai acquistato?
            </Text>
            {productName && (
              <Text className="text-sm text-muted">
                Prodotto ambiguo: {productName}
              </Text>
            )}
          </View>

          {/* Recording Indicator */}
          {isRecording && (
            <View className="items-center gap-3">
              <View className="flex-row gap-1 items-center justify-center h-12">
                {[0, 1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    className="bg-primary rounded-full"
                    style={{
                      width: 4,
                      height: 20 + i * 4,
                      opacity: 0.6 + i * 0.08,
                    }}
                  />
                ))}
              </View>
              <Text className="text-sm text-muted">Registrando...</Text>
            </View>
          )}

          {/* Transcription Display */}
          {transcription && (
            <View className="bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-base text-foreground">{transcription}</Text>
            </View>
          )}

          {/* Record Button */}
          <Pressable
            onPress={isRecording ? handleStopRecording : handleStartRecording}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View
              className={`rounded-full py-4 items-center justify-center ${
                isRecording ? 'bg-error' : 'bg-primary'
              }`}
            >
              <Text className="text-white font-bold text-lg">
                {isRecording ? '⏹ Ferma' : '🎤 Registra Voce'}
              </Text>
            </View>
          </Pressable>

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleConfirm}
              disabled={!transcription.trim()}
              style={({ pressed }) => [
                {
                  opacity:
                    !transcription.trim() || pressed ? 0.6 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View className="bg-primary rounded-full py-3 items-center justify-center">
                <Text className="text-white font-bold text-base">
                  Conferma
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleCancel}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="bg-surface border border-border rounded-full py-3 items-center justify-center">
                <Text className="text-foreground font-bold text-base">
                  Annulla
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
