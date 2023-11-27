import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Import icons from '@expo/vector-icons'

const Task = ({ text, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTask, setEditedTask] = React.useState(text);

  const handleUpdate = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <View style={styles.task}>
      <View style={styles.taskDetails}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedTask}
            onChangeText={(text) => setEditedTask(text)}
            autoFocus
            onBlur={handleUpdate}
          />
        ) : (
          <Text>{text}</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.button}>
          <FontAwesome name="pencil" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <AntDesign name="delete" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const [task, setTask] = React.useState('');
  const [taskItems, setTaskItems] = React.useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const updateTask = (index, updatedTask) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = updatedTask;
    setTaskItems(itemsCopy);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>To Do List</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task
                  text={item}
                  onDelete={() => deleteTask(index)}
                  onUpdate={(updatedTask) => updateTask(index, updatedTask)}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Add a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskDetails: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10, // Adjust the space between buttons
  },
  editInput: {
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    minWidth: 50,
    color: '#333',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#333',
    borderWidth: 1,
    width: 250,
    color: '#333',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
  },
  addText: {
    color: '#333',
  },
});

