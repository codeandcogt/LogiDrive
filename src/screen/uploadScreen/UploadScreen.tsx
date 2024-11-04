import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  PanResponder,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ButtonBack } from '@/src/components';
import Svg, { Path } from 'react-native-svg';

interface SignaturePadProps {
  onClose: () => void;
  onSignatureChange: (paths: string[]) => void;
  initialPaths?: string[];
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onClose, onSignatureChange, initialPaths = [] }) => {
  const [paths, setPaths] = useState<string[]>(initialPaths);
  const [currentPath, setCurrentPath] = useState<string>('');
  const svgRef = useRef(null);

  const handleClearSignature = () => {
    setPaths([]);
    setCurrentPath('');
    onSignatureChange([]);
  };

  const handleSave = () => {
    onSignatureChange(paths);
    onClose();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath(`M ${locationX} ${locationY}`);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath(prev => `${prev} L ${locationX} ${locationY}`);
      },
      onPanResponderRelease: () => {
        if (currentPath) {
          const newPaths = [...paths, currentPath];
          setPaths(newPaths);
          onSignatureChange(newPaths);
          setCurrentPath('');
        }
      },
    })
  ).current;

  return (
    <View style={styles.signaturePadContainer}>
      <View style={styles.signaturePadHeader}>
        <Text style={styles.signaturePadTitle}>Firma aquí</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.signaturePadContent}>
        <View 
          style={styles.signaturePad} 
          {...panResponder.panHandlers}
          ref={svgRef}
        >
          <View style={styles.signatureGuide} />
          <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
            {paths.map((path, index) => (
              <Path
                key={index}
                d={path}
                stroke="#000000"
                strokeWidth={3}
                fill="none"
              />
            ))}
            {currentPath ? (
              <Path
                d={currentPath}
                stroke="#000000"
                strokeWidth={3}
                fill="none"
              />
            ) : null}
          </Svg>
        </View>
        <View style={styles.signaturePadFooter}>
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={handleClearSignature}
          >
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const UploadScreen = () => {
  const [name, setName] = useState('');
  const [date] = useState(new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const router = useRouter();

  const handleComplete = () => {
    if (!name.trim()) {
      alert("Por favor, ingresa tu nombre para confirmar");
      return;
    }
    // if (!hasSignature) {
    //   alert("Por favor, añade tu firma para continuar");
    //   return;
    // }
    router.replace("/home")
  };

  const handleSignatureChange = (newPaths: string[]) => {
    setPaths(newPaths);
    setHasSignature(newPaths.length > 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="verified-user" size={24} color="#007AFF" />
            <Text style={styles.cardTitle}>Datos de Inspección</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardBody}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Fecha de inspección:</Text>
              <Text style={styles.value}>{date}</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Nombre del inspector:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ingresa tu nombre completo"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.signatureSection}>
              <Text style={styles.label}>Firma digital:</Text>
              {hasSignature ? (
                <View style={styles.signaturePreview}>
                  <View style={styles.signaturePlaceholder}>
                    <Svg height="100%" width="100%">
                      {paths.map((path, index) => (
                        <Path
                          key={index}
                          d={path}
                          stroke="#000000"
                          strokeWidth={3}
                          fill="none"
                        />
                      ))}
                    </Svg>
                    <TouchableOpacity
                      style={styles.editSignature}
                      onPress={() => setShowSignaturePad(true)}
                    >
                      <Text style={styles.editSignatureText}>Editar firma</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addSignature}
                  onPress={() => setShowSignaturePad(true)}
                >
                  <AntDesign name="edit" size={24} color="#007AFF" />
                  <Text style={styles.addSignatureText}>Añadir firma</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.disclaimer}>
              Al firmar este documento, confirmo que toda la información proporcionada es correcta y verdadera.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            // (!name) && styles.completeButtonDisabled
          ]}
          onPress={handleComplete}
        //   disabled={!name}
        >
          <Text style={styles.completeButtonText}>Confirmar y Enviar</Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {showSignaturePad && (
        <SignaturePad 
          onClose={() => setShowSignaturePad(false)}
          onSignatureChange={handleSignatureChange}
          initialPaths={paths}
        />
      )}
      
      <SafeAreaView style={styles.overlay}>
        <ButtonBack onPress={() => router.replace("/home")} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 80,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 8,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 20,
  },
  cardBody: {
    padding: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  signatureSection: {
    marginVertical: 20,
  },
  addSignature: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    gap: 10,
  },
  addSignatureText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  signaturePreview: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  signaturePlaceholder: {
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'relative',
  },
  signatureText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  editSignature: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 8,
  },
  editSignatureText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    gap: 10,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  completeButtonDisabled: {
    opacity: 0.5,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signaturePadContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  signaturePadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  signaturePadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signaturePadContent: {
    flex: 1,
    padding: 20,
  },
  signaturePad: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
    position: 'relative',
  },
  signatureGuide: {
    position: 'absolute',
    bottom: '30%',
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  signaturePadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  clearButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});