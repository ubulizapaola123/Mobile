import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: '',
    bio: '',
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.password) {
      Alert.alert('Missing details', 'Please enter your first name, email, and password.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Passwords do not match', 'Please check the password fields.');
      return;
    }
    console.log(JSON.stringify(form, null, 2));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Form submitted</Text>
        <Text style={styles.text}>Welcome, {form.firstName}!</Text>
        <Button title="Back to form" onPress={() => setSubmitted(false)} />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.text}>Complete the form below.</Text>

      <Label text="First name" />
      <TextInput value={form.firstName} onChangeText={(value) => update('firstName', value)} placeholder="Enter first name" placeholderTextColor="#999" style={styles.input} />

      <Label text="Last name" />
      <TextInput value={form.lastName} onChangeText={(value) => update('lastName', value)} placeholder="Enter last name" placeholderTextColor="#999" style={styles.input} />

      <Label text="Email" />
      <TextInput value={form.email} onChangeText={(value) => update('email', value)} placeholder="you@example.com" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" style={styles.input} />

      <Label text="Phone" />
      <TextInput value={form.phone} onChangeText={(value) => update('phone', value)} placeholder="Enter phone number" placeholderTextColor="#999" keyboardType="phone-pad" style={styles.input} />

      <Label text="Address" />
      <TextInput value={form.address} onChangeText={(value) => update('address', value)} placeholder="Enter address" placeholderTextColor="#999" style={styles.input} />

      <Label text="City" />
      <TextInput value={form.city} onChangeText={(value) => update('city', value)} placeholder="Enter city" placeholderTextColor="#999" style={styles.input} />

      <Label text="Country" />
      <TextInput value={form.country} onChangeText={(value) => update('country', value)} placeholder="Enter country" placeholderTextColor="#999" style={styles.input} />

      <Label text="Password" />
      <TextInput value={form.password} onChangeText={(value) => update('password', value)} placeholder="Enter password" placeholderTextColor="#999" secureTextEntry style={styles.input} />

      <Label text="Confirm password" />
      <TextInput value={form.confirmPassword} onChangeText={(value) => update('confirmPassword', value)} placeholder="Confirm password" placeholderTextColor="#999" secureTextEntry style={styles.input} />

      <Label text="About you" />
      <TextInput value={form.bio} onChangeText={(value) => update('bio', value)} placeholder="Write a short bio" placeholderTextColor="#999" multiline numberOfLines={4} style={[styles.input, styles.bio]} />

      <View style={styles.switchRow}>
        <Text style={styles.text}>Subscribe to newsletter</Text>
        <Switch value={form.newsletter} onValueChange={(value) => update('newsletter', value)} />
      </View>

      <Button title="Submit form" onPress={handleSubmit} />
      <StatusBar style="light" />
    </ScrollView>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#000', flexGrow: 1, padding: 20 },
  title: { color: '#fff', fontSize: 26, marginBottom: 8 },
  text: { color: '#fff', marginBottom: 12 },
  label: { color: '#fff', marginBottom: 5, marginTop: 12 },
  input: { backgroundColor: '#fff', color: '#000', padding: 10 },
  bio: { minHeight: 100, textAlignVertical: 'top' },
  switchRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
});
