const os = require('os');
const path = require('path');
const fs = require('fs');

function checkCreateClientesFolder() {
  const clientesFolderPath = path.join(os.homedir(), 'Documentos', 'Clientes');

  if (!fs.existsSync(clientesFolderPath)) {
    fs.mkdirSync(clientesFolderPath);
    console.log('Pasta "Clientes" criada com sucesso!');
  } else {
    console.log('Pasta "Clientes" já existe.');
  }
}

checkCreateClientesFolder();
