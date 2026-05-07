import { Image, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
}

export function Avatar({ uri, name, size = 40 }: AvatarProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  return (
    <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    placeholder: { backgroundColor: '#EEF4FF', alignItems: 'center', justifyContent: 'center' },
    initials: { color: Colors.light.tint, fontWeight: '600' },
});

// AOUAD ABDELKARIM