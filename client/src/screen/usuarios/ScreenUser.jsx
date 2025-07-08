import { StyleSheet, Text, View } from "react-native";
import { DataTable, Card, IconButton, MD3Colors } from "react-native-paper";
import { estadoLoginGlobal } from "../../context/contextData";
import { useContext, useEffect } from "react";
import React from "react";

export default function ScreenUser() {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const { obtenerDatosUsuario, eliminaruser, dataUser } =
    useContext(estadoLoginGlobal);
  console.log("usuarios:", dataUser);

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  const items = dataUser;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  console.log(dataUser.length);

  // if (dataUser.length === 0) {
  //   return <Text>Cargando</Text>;
  // }

  if (!dataUser || dataUser.length === 0) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text>Cargando usuarios o no se encontraron datos</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Card>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nombre</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Eliminar
            </DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.nombre}</DataTable.Cell>
              <DataTable.Cell>{item.email}</DataTable.Cell>
              <DataTable.Cell numeric>
                <IconButton
                  icon="trash-can"
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => eliminaruser(item.id)}
                >
                  Eliminar
                </IconButton>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 10,
  },
});
