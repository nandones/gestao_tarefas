import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, FAB, Banner, DataTable, Dialog, Portal, Button, Text, ActivityIndicator, IconButton, Chip } from 'react-native-paper';
import { useThemeContext } from '../contexts/ThemeContext';

export default function HomeScreen({ navigation, tasks, setTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [prioridadeFiltro, setPrioridadeFiltro] = useState('Todas');
  const { toggleTheme } = useThemeContext();

  const handleDeleteTask = () => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTask?.id));
    setSelectedTask(null);
    setVisibleDialog(false);
  };

  const openDeleteDialog = (task) => {
    setSelectedTask(task);
    setVisibleDialog(true);
  };

  const openEditScreen = (task) => {
    navigation.navigate('Adicionar', { editTask: task });
  };

  const openAddScreen = () => {
    navigation.navigate('Adicionar', { editTask: null });
  };

  const tarefasFiltradas = prioridadeFiltro === 'Todas'//
    ? tasks
    : tasks.filter(p => p.prioridade === prioridadeFiltro.toLowerCase());

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Gerenciador de Tarefas" />
        <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
      </Appbar.Header>

      <ScrollView style={{ margin: 10 }}>
        <Banner
          visible={bannerVisible}
          actions={[
            { label: 'OK', onPress: () => setBannerVisible(false) }
          ]}
          icon="information"
        >
          Adicione, edite ou remova tarefas com facilidade!
        </Banner>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={prioridadeFiltro === 'Todas'}
            onPress={() => setPrioridadeFiltro('Todas')}
          >
            Todas
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={prioridadeFiltro === 'baixa'}
            onPress={() => setPrioridadeFiltro('baixa')}
          >
            baixa
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={prioridadeFiltro === 'media'}
            onPress={() => setPrioridadeFiltro('media')}
          >
            Média
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={prioridadeFiltro === 'alta'}
            onPress={() => setPrioridadeFiltro('alta')}
          >
            Alta
          </Chip>
        </View>

        {tarefasFiltradas.length === 0 ? (
          <ActivityIndicator animating={true} style={{ marginTop: 20 }} />
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title numeric>Departamento</DataTable.Title>
              <DataTable.Title numeric>Ações</DataTable.Title>
            </DataTable.Header>

            {tarefasFiltradas.map((task) => (
              <DataTable.Row key={task.id}>
                <DataTable.Cell>{task.name}</DataTable.Cell>
                <DataTable.Cell>{task.department}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => openEditScreen(task)}
                    />
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => openDeleteDialog(task)}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Confirmação</Dialog.Title>
          <Dialog.Content>
            <Text>Deseja realmente excluir "{selectedTask?.name}"?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>Cancelar</Button>
            <Button onPress={handleDeleteTask}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={openAddScreen}
      />
    </>
  );
}
