const os = require('os');
const path = require('path');
const fs = require('fs');

function checkCreateClientesFolder() {
  const clientesFolderPath = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP');

  if (!fs.existsSync(clientesFolderPath)) {
    fs.mkdirSync(clientesFolderPath);
    console.log('Pasta "Clientes FiadoAPP" criada com sucesso!');
  } else {
    console.log('Pasta "Clientes FiadoAPP" já existe.');
  }
}

checkCreateClientesFolder();

console.log(path.join(__dirname, 'icon.png'))
