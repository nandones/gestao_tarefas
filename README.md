# Como Rodar a Aplicação

É necessário possuir **Node.js** e **Expo CLI** instalado em seu desktop, e um dispositivo móvel com **Expo Go**.

## Pré-requisitos

- Verifique a presença do Node.js:
  ```bash
  node --version   # Deve retornar v18.x ou superior
  npm --version    # Deve retornar v9.x ou superior
  ```
  Caso esteja ausente, instale a partir de: [https://nodejs.org/pt](https://nodejs.org/pt)

- Verifique a presença do Expo CLI:
  ```bash
  expo --version   # Deve retornar a versão instalada (ex: 7.x)
  ```
  Caso esteja ausente, execute no terminal:
  ```bash
  npm install -g expo-cli
  ```

- Caso possua problemas com o Expo GO, recomendo o seguinte tutorial:  
  [https://youtu.be/xKGESzemfdw?si=FYsF8Y7M9ywaVL4g](https://youtu.be/xKGESzemfdw?si=FYsF8Y7M9ywaVL4g)

## Clonando e Rodando o Projeto

1. Clone o repositório.
2. Com o repositório aberto na IDE de sua preferência, execute:
   ```bash
   cd tasks_manager

   npm install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   npx expo install react-native-gesture-handler react-native-reanimated
   npm install redux react-redux @reduxjs/toolkit
   npx expo install react-dom react-native-web @expo/metro-runtime
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```

4. Você pode agora escanear o QR code que aparecerá no terminal com seu dispositivo móvel para abrir a aplicação, ou pressionar **"a"** para abrir o emulador Android (caso tenha seguido o tutorial mencionado).

---

# Onde foi utilizado Appbar

> Define o header de cada página.

## `tasks_manager/screens/AddTaskScreen.js`

```jsx
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEditMode ? "Editar Tarefa" : "Adicionar Tarefa"} />
      </Appbar.Header>

      //...

  )
```

## `tasks_manager/screens/HomeScreen.js`

```jsx
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Gerenciador de Tarefas" />
        <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
      </Appbar.Header>

      //...

  )
```

# Onde foi utilizado FAB

> Botão Flutuante posicionado na direita inferior.

## `tasks_manager/screens/HomeScreen.js`

```jsx
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
  
```

# Onde foi utilizado Banner

> Mensagem de Boas Vindas

## `tasks_manager/screens/HomeScreen.js`

```jsx
        <Banner
          visible={bannerVisible}
          actions={[
            { label: 'OK', onPress: () => setBannerVisible(false) }
          ]}
          icon="information"
        >
          Adicione, edite ou remova tarefas com facilidade!
        </Banner>
```
# Onde foi utilizado DataTable

> Exibe dados em formato tabular

## `tasks_manager/screens/HomeScreen.js`

```jsx
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
```
# Onde foi utilizado Dialog

> Pop-up, aqui confirma exclusão de tarefa

## `tasks_manager/screens/HomeScreen.js`

```jsx
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
```

# Onde foi utilizado ActivityIndicator

> Ícone de carregamento, caso não haja tarefa nãcadastrada será exibido

## `tasks_manager/screens/HomeScreen.js`

```jsx
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
```

# Onde foi utilizado TextInput com ícone

> Autoexplicativo

## `tasks_manager/screens/HomeScreen.js`

```jsx
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
```

# Onde foi utilizado RadioButton.Group

> radio buttons excludentes entre si

## `tasks_manager/screens/HomeScreen.js`

```jsx
          <RadioButton.Group onValueChange={setPrioridade} value={prioridade}>
            <RadioButton.Item label="baixa" value="baixa" />
            <RadioButton.Item label="média" value="media" />
            <RadioButton.Item label="alta" value="alta" />
          </RadioButton.Group>
```

# Onde foi utilizado ToolTip

>  orientação nos campos de preenchimento.

## `tasks_manager/screens/AddTaskScreen.js`

```jsx
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

```

# Onde foi utilizado Chip

>  filtros rápidos: todas, baixa, média, alta

## `tasks_manager/screens/HomeScreen.js`

```jsx
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
```

# Onde foi utilizado Bottom Navigation Bar

>  rodapé flutuante, contido em :

## `tasks_manager/navigation/BottomTabs.js`

> chamado em 

## `App.js`

```jsx
function Main() {
  const { theme } = useThemeContext();
  const [tasks, setTasks] = useState([]);

  return (
    <PaperProvider theme={theme}>
      <NativeBaseProvider>
        <NavigationContainer theme={theme}>
          <BottomTabs tasks={tasks} setTasks={setTasks} />
        </NavigationContainer>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
```