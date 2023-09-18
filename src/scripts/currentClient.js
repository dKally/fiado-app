const os = require('os')
const path = require('path')
const fs = require('fs')

const urlParams = new URLSearchParams(window.location.search)
const currentClient = urlParams.get('currentClient')
console.log(currentClient)

let currentClientPath

const clientsPath = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP')


document.addEventListener('DOMContentLoaded', function() {
    const folder = urlParams.get('folder');

    if(currentClient == undefined){
        currentClientPath  = clientsPath + "/" + folder
        console.log(currentClientPath)
    } else{
        currentClientPath  = clientsPath + "/" + currentClient
        console.log(currentClientPath)
    }

    const registerClientPath = currentClientPath + "/" + "Cadastro.json"

    fs.readFile(registerClientPath, 'utf8', (error, data) => {
        if (error) {
          console.error(error)
          return
        }
        setTimeout(()=> {
            console.log(data)
      
            const jsonObject = JSON.parse(data)
            const client = jsonObject.client
        
            document.querySelector('#name').innerText = client.name
            document.querySelector('#last-name').innerText = client.lastName
            document.querySelector('#phone').innerText = client.phone
            document.querySelector('#cpf').innerText = client.cpf
        }, 500)

      })

});

document.addEventListener('DOMContentLoaded', function() {

    const purchasesScript = document.createElement('script');
    purchasesScript.src = '../scripts/purchases.js';
    document.body.appendChild(purchasesScript);
});
