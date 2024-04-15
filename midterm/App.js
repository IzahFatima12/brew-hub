// App.js

import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { surahNames, surahDetails } from './QuranData';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filteredSurahs = surahNames.filter(
    (surah) =>
      surah.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.arabic.includes(searchQuery)
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={styles.title}>Quran Explorer</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#ccc', true: '#333' }}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search Surah"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.surahList}>
        {filteredSurahs.map((surah, index) => (
          <View style={styles.surahItem} key={index}>
            <Text style={styles.surahName}>{surah.english}</Text>
            <Text style={styles.surahName}>{surah.arabic}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  surahList: {
    width: '80%',
  },
  surahItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  surahName: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;
