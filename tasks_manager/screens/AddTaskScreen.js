import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';
import { VStack, Tooltip, Box } from 'native-base';

export default function AddTaskScreen({ navigation, route, tasks, setTasks }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [prioridade, setPrioridade] = useState('baixa');
  const [emProducao, setEmProducao] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { editTask = null } = route.params || {};

      if (editTask) {
        setName(editTask.name);
        setDepartment(editTask.department.toString());
        setPrioridade(editTask.prioridade);
        setEmProducao(editTask.emProducao);
        setIsEditMode(true);
      } else {
        setName('');
        setDepartment('');
        setPrioridade('false');
        setEmProducao(false);
        setIsEditMode(false);
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleSaveTask = () => {
    if (isEditMode) {
      setTasks(tasks.map(t =>
        t.id === (route.params?.editTask?.id || 0) ? { ...route.params.editTask, name, department, prioridade, emProducao } : t
      ));
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), name, department, prioridade, emProducao }
      ]);
    }
    navigation.navigate('Home');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEditMode ? "Editar Tarefa" : "Adicionar Tarefa"} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <VStack space={4}>
          <Tooltip label="Digite o nome da tarefa" placement="top">
            <Box>
              <TextInput
                label="Nome da Tarefa"
                value={name}
                onChangeText={setName}
                left={<TextInput.Icon icon="tag" />}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <Tooltip label="Digite o departamento" placement="top">
            <Box>
              <TextInput
                label="Departamento"
                value={department}
                onChangeText={setDepartment}
                left={<TextInput.Icon icon="tag" />}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <RadioButton.Group onValueChange={setPrioridade} value={prioridade}>
            <RadioButton.Item label="baixa" value="baixa" />
            <RadioButton.Item label="média" value="media" />
            <RadioButton.Item label="alta" value="alta" />
          </RadioButton.Group>

          <Checkbox.Item
            label="Task em Produção?"
            status={emProducao ? 'checked' : 'unchecked'}
            onPress={() => setEmProducao(!emProducao)}
          />

          <Button 
            mode="contained" 
            onPress={handleSaveTask}
            buttonColor={isEditMode ? "orange" : "blue"}
            style={{ marginTop: 10 }}
            icon={isEditMode ? "pencil" : "content-save"}
          >
            {isEditMode ? "Atualizar Tarefa" : "Salvar Salvar Tarefa"}
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
}
