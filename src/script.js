const { ipcRenderer } = require('electron');
const fs = require('fs');

const clientsFolder = ipcRenderer.sendSync('clientsFolder');

function checkCreateClientesFolder() {
  console.log('clientsFolder: ' + clientsFolder);

  if (!fs.existsSync(clientsFolder)) {
    fs.mkdirSync(clientsFolder);
    console.log('Pasta "Clientes FiadoAPP" criada com sucesso!');
  } else {
    console.log('Pasta "Clientes FiadoAPP" já existe.');
  }
}

checkCreateClientesFolder();