const fs = require('fs-extra');
const zip = require('zip-local')
const path = require('path')
const os = require('os')
const { shell } = require('electron')
const { ipcRenderer } = require('electron')



document.querySelector('.save-backup').addEventListener('click', ()=>{
    saveBackup()
})

document.querySelector('.open-backup').addEventListener('click', ()=>{
    openBackupPaste()
})

document.querySelector('.backup').addEventListener('click', ()=>{
    openBackup()
})

function saveBackup() {
    const clientsPaste = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP')

    const clientsZip = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP.zip')


  zip.sync.zip(clientsPaste).compress().save(clientsZip);

  alert(`Backup da pasta "${clientsPaste}" criado com sucesso em "${clientsZip}".`);
}

function openBackupPaste(){
    shell.openPath(path.join(os.homedir(), 'Documentos'))
}


function openBackup() {
  ipcRenderer.send('open-dialog');
}

// Para receber a pasta selecionada do processo principal
ipcRenderer.on('selected-folder', (event, paths) => {
    if (!paths || paths.length === 0) {
      console.log('Seleção de pasta cancelada.');
    } else {
      const folderPath = paths[0];
      const destinoPasta = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP');
  
      // Verifique o nome da pasta e mova, substituindo se já existir
      if (path.basename(folderPath) === 'Clientes FiadoAPP') {
        try {
          fs.removeSync(destinoPasta); // Remova o destino existente recursivamente
          fs.moveSync(folderPath, destinoPasta); // Mova a nova pasta para o destino
  
          console.log(`A pasta "Clientes FiadoAPP" foi movida e substituiu ${destinoPasta}`);
        } catch (error) {
          console.error('Erro ao mover a pasta:', error);
        }
      } else {
        console.log('O nome da pasta selecionada não é "Clientes FiadoAPP".');
      }
    }
  });
