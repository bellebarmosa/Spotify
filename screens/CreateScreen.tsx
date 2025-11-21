import { Ionicons } from '@expo/vector-icons';
import React, { useReducer, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Action types
type PlaylistAction =
  | { type: 'ADD_SONG'; payload: string }
  | { type: 'REMOVE_SONG'; payload: number }
  | { type: 'CLEAR_PLAYLIST' }
  | { type: 'ADD_TO_HISTORY'; payload: string };

// State interface
interface PlaylistState {
  songs: string[];
  history: string[];
}

// Initial state
const initialState: PlaylistState = {
  songs: [],
  history: [],
};

// Reducer function
const playlistReducer = (state: PlaylistState, action: PlaylistAction): PlaylistState => {
  switch (action.type) {
    case 'ADD_SONG':
      if (action.payload.trim() === '') {
        return state;
      }
      return {
        ...state,
        songs: [...state.songs, action.payload.trim()],
      };
    case 'REMOVE_SONG':
      const removedSong = state.songs[action.payload];
      return {
        ...state,
        songs: state.songs.filter((_, index) => index !== action.payload),
        history: removedSong ? [...state.history, removedSong] : state.history,
      };
    case 'CLEAR_PLAYLIST':
      return {
        ...state,
        songs: [],
        history: [...state.history, ...state.songs],
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
};

export const CreateScreen: React.FC = () => {
  const [songName, setSongName] = useState('');
  const [state, dispatch] = useReducer(playlistReducer, initialState);
  const insets = useSafeAreaInsets();

  const handleAddSong = () => {
    if (songName.trim() === '') {
      Alert.alert('Error', 'Please enter a song name');
      return;
    }
    dispatch({ type: 'ADD_SONG', payload: songName });
    setSongName('');
  };

  const handleRemoveSong = (index: number) => {
    dispatch({ type: 'REMOVE_SONG', payload: index });
  };

  const handleClearPlaylist = () => {
    if (state.songs.length === 0) {
      Alert.alert('Info', 'Playlist is already empty');
      return;
    }
    Alert.alert(
      'Clear Playlist',
      `Are you sure you want to clear ${state.songs.length} song(s)?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'CLEAR_PLAYLIST' });
            Alert.alert('Success', 'Playlist cleared. Songs moved to history.');
          },
        },
      ]
    );
  };

  const handleClearHistory = () => {
    if (state.history.length === 0) {
      Alert.alert('Info', 'History is already empty');
      return;
    }
    Alert.alert(
      'Clear History',
      `Are you sure you want to clear ${state.history.length} song(s) from history?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'CLEAR_PLAYLIST' });
            // Reset history by creating a new state
            dispatch({ type: 'ADD_SONG', payload: '' });
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Playlist</Text>
          <Text style={styles.headerSubtitle}>
            Add songs to build your playlist
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="musical-notes"
              size={20}
              color="#B3B3B3"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter song name"
              placeholderTextColor="#B3B3B3"
              value={songName}
              onChangeText={setSongName}
              onSubmitEditing={handleAddSong}
              returnKeyType="done"
              accessibilityLabel="Song name input"
            />
          </View>
          <TouchableOpacity
            style={[styles.addButton, !songName.trim() && styles.addButtonDisabled]}
            onPress={handleAddSong}
            disabled={!songName.trim()}
            accessibilityRole="button"
            accessibilityLabel="Add song to playlist"
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.clearButton,
              state.songs.length === 0 && styles.actionButtonDisabled,
            ]}
            onPress={handleClearPlaylist}
            disabled={state.songs.length === 0}
            accessibilityRole="button"
            accessibilityLabel="Clear playlist"
          >
            <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Clear Playlist</Text>
          </TouchableOpacity>
          {state.history.length > 0 && (
            <TouchableOpacity
              style={[styles.actionButton, styles.historyButton]}
              onPress={handleClearHistory}
              accessibilityRole="button"
              accessibilityLabel="Clear history"
            >
              <Ionicons name="time-outline" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Clear History</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Playlist Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Playlist ({state.songs.length})
            </Text>
          </View>
          {state.songs.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="musical-notes-outline" size={48} color="#B3B3B3" />
              <Text style={styles.emptyStateText}>Your playlist is empty</Text>
              <Text style={styles.emptyStateSubtext}>
                Add songs to get started
              </Text>
            </View>
          ) : (
            <View style={styles.songsList}>
              {state.songs.map((song, index) => (
                <View key={index} style={styles.songItem}>
                  <View style={styles.songInfo}>
                    <View style={styles.songNumber}>
                      <Text style={styles.songNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.songName} numberOfLines={1}>
                      {song}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveSong(index)}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${song}`}
                  >
                    <Ionicons name="close-circle" size={24} color="#E22134" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* History Section */}
        {state.history.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={20} color="#B3B3B3" />
              <Text style={styles.sectionTitle}>
                History ({state.history.length})
              </Text>
            </View>
            <View style={styles.historyList}>
              {state.history.map((song, index) => (
                <View key={index} style={styles.historyItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#1DB954" />
                  <Text style={styles.historySongName} numberOfLines={1}>
                    {song}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  clearButton: {
    backgroundColor: '#E22134',
  },
  historyButton: {
    backgroundColor: '#333',
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  songsList: {
    gap: 8,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  songNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  songNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  songName: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  historySongName: {
    flex: 1,
    fontSize: 14,
    color: '#B3B3B3',
  },
});
