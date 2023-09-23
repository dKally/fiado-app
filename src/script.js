const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const os = require('os');
const { shell } = require('electron');


let countDownload = 0
let countDownloaded = 0
let isDownloadingChrome = false
let isDownloadingFirefox = false
let isDownloadingOpera = false
let isDownloadingAmd = false
let isDownloadingCpuz32 = false
let isDownloadingCpuz64 = false
let isDownloadingGpuz = false
let isDownloadingNVCcleanstall = false
let isDownloadingDiscord = false
let isDownloadingWinrar64 = false
let isDownloadingWinrar32 = false
let isDownloadingRealtek = false

const downloadingMessage = document.querySelector('.download-message')

// Local dos instaladores
const chromePath = path.join(__dirname, '..' ,'..', 'installers', 'ChromeSetup.exe')
const firefoxPath = path.join(__dirname, '..', '..', 'installers', 'FirefoxSetup.exe')
const operaPath = path.join(__dirname, '..', '..', 'installers', 'OperaGXSetup.exe')
const amdPath = path.join(__dirname, '..', '..', 'installers', 'amd-software-adrenalin-edition-23.5.2-minimalsetup-230621_web.exe')
const cpuz32Path = path.join(__dirname, '..', '..', 'installers', 'cpuz_x32.exe')
const cpuz64Path = path.join(__dirname, '..', '..', 'installers', 'cpuz_x64.exe')
const gpuzPath = path.join(__dirname, '..', '..', 'installers', 'GPU-Z.2.54.0.exe')
const nvccleanstallPath = path.join(__dirname, '..', '..', 'installers', 'NVCleanstall_1.16.0.exe')
const discordPath = path.join(__dirname, '..', '..', 'installers', 'DiscordSetup.exe')
const winrar64Path = path.join(__dirname, '..', '..', 'installers', 'Winrar64x.exe')
const winrar32Path = path.join(__dirname, '..', '..', 'installers', 'Winrar32x.exe')
const realtekPath = path.join(__dirname, '..', '..', 'installers', 'Realtek.exe')

// Local do "downloads" do usuário
const downloadsPath = path.join(os.homedir(), 'Downloads')



// Local em que os instaladores serão movidos
const chromePathDownloads = downloadsPath + "\\ChromeSetup.exe"
const firefoxPathDownloads = downloadsPath + "\\FirefoxSetup.exe"
const operaPathDownloads = downloadsPath + "\\OperaSetup.exe"
const amdPathDownloads = downloadsPath + "\\amd-software-adrenalin-edition-23.5.2-minimalsetup-230621_web.exe"
const cpuz32PathDownloads = downloadsPath + "\\cpuz_x32.exe"
const cpuz64PathDownloads = downloadsPath + "\\cpuz_x64.exe"
const gpuzPathDownloads = downloadsPath + "\\GPU-Z.2.54.0.exe"
const nvccleanstallPathDownloads = downloadsPath + "\\NVCleanstall_1.16.0.exe"
const discordPathDownloads = downloadsPath + "\\DiscordSetup.exe"
const winrar64PathDownloads = downloadsPath + "\\Winrar64x.exe"
const winrar32PathDownloads = downloadsPath + "\\Winrar32x.exe"
const realtekPathDownloads = downloadsPath + "\\Realtek.exe"

// Verificando se já tem um instalador em "downloads" e se tiver alterando o botão para "instalar"
let hasChrome = false
let hasFirefox = false
let hasOpera = false
let hasAmd = false
let hasCpuz32 = false
let hasCpuz64 = false
let hasGpuz = false
let hasNVCcleanstall = false
let hasDiscord = false
let hasWinrar64 = false
let hasWinrar32 = false
let hasRealtek = false

function verify(path) {
    try {
      fs.accessSync(path, fs.constants.F_OK);
      console.log(path);
      console.log('O arquivo existe!');
      return true;
    } catch (err) {
      console.log(path + ' Não existe');
      return false;
    }
}
  
hasChrome = verify(chromePathDownloads)
hasFirefox = verify(firefoxPathDownloads)
hasOpera = verify(operaPathDownloads)
hasAmd = verify(amdPathDownloads)
hasCpuz32 = verify(cpuz32PathDownloads)
hasCpuz64 = verify(cpuz64PathDownloads)
hasGpuz = verify(gpuzPathDownloads)
hasNVCcleanstall = verify(nvccleanstallPathDownloads)
hasDiscord = verify(discordPathDownloads)
hasWinrar64 = verify(winrar64PathDownloads)
hasWinrar32 = verify(winrar32PathDownloads)
hasRealtek = verify(realtekPathDownloads)
  
if (hasChrome) {
    toggleBtn('chrome-download', 'chrome-install');
}
  
if (hasFirefox) {
    toggleBtn('firefox-download', 'firefox-install');
}
  
if (hasOpera) {
    toggleBtn('opera-download', 'opera-install');
}

if (hasAmd) {
    toggleBtn('amd-download', 'amd-install');
}

if (hasCpuz32) {
    toggleBtn('cpuz32-download', 'cpuz32-install');
}

if (hasCpuz64) {
    toggleBtn('cpuz64-download', 'cpuz64-install');
}

if (hasGpuz) {
    toggleBtn('gpuz-download', 'gpuz-install');
}

if (hasNVCcleanstall) {
    toggleBtn('nvccleanstall-download', 'nvccleanstall-install');
}

if (hasDiscord) {
    toggleBtn('discord-download', 'discord-install');
}

if (hasWinrar64) {
    toggleBtn('winrar64-download', 'winrar64-install');
}

if (hasWinrar32) {
    toggleBtn('winrar32-download', 'winrar32-install');
}

if (hasRealtek) {
    toggleBtn('realtek-download', 'realtek-install');
}



// Trocando os botões "Downloads" para "Instalar"

function toggleBtn(classDownload, classInstall, path){
  try {
    let btn = document.querySelector('.' + classDownload)
    btn.classList.add('hide')
    btnInstall = document.querySelector('.' + classInstall)
    btnInstall.classList.remove('hide')
  } catch (error) {
    console.error('Ocorreu um erro:', error)
  }

}

// Função de mover o arquivo para "downloads"
function move(has, downloading, path, pathDownloads, classDownload, classInstall) {
    if (has === true) {
        console.log(has)
      return
    } else {
        console.log(has)
      countDownloaded++
      document.querySelector('.downloads').classList.remove('hide')
      downloadingMessage.innerText = 'Baixando!'
      document.querySelector('.count-downloaded').innerText = countDownloaded
      downloading = true;
      fs.copyFile(path, pathDownloads, (err) => {
        if (err) {
          console.error(`Erro ao mover o arquivo: ${err}`)
          return
        }
        console.log('Arquivo movido com sucesso')
        toggleBtn(classDownload, classInstall)
        hasChrome = verify(chromePathDownloads)
        hasFirefox = verify(firefoxPathDownloads)
        hasOpera = verify(operaPathDownloads)
        hasAmd = verify(amdPathDownloads)
        hasCpuz32 = verify(cpuz32PathDownloads)
        hasCpuz64 = verify(cpuz64PathDownloads)
        hasGpuz = verify(gpuzPathDownloads)
        hasNVCcleanstall = verify(nvccleanstallPathDownloads)
        hasDiscord = verify(discordPathDownloads)
        hasWinrar64 = verify(winrar64PathDownloads)
        hasWinrar32 = verify(winrar32PathDownloads)
        hasRealtek = verify(realtekPathDownloads)

        countDownload++
        document.querySelector('.count-download').innerText = countDownload;
        downloading = false;
        if (!isDownloadingChrome && !isDownloadingFirefox && !isDownloadingOpera
          && !isDownloadingAmd && !isDownloadingCpuz32 && !isDownloadingCpuz64
          && !isDownloadingGpuz && !isDownloadingNVCcleanstall && !isDownloadingRealtek
          && !isDownloadingDiscord && !isDownloadingWinrar32 && !isDownloadingWinrar64
          ) {
          downloadingMessage.innerText = 'Baixado!'
        }
      })
    }
}

function execFiles(path){
    exec(path, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar o comando: ${error}`)
          return
        }
        console.log(`Saída padrão: ${stdout}`)
        console.log(`Saída de erro: ${stderr}`)
      })
}

// abrir a pasta "Downloads" do usuário
const openDownloadsBtn = document.querySelector('.open-downloads')
openDownloadsBtn.addEventListener('click', ()=>{openDownloads()})

function openDownloads(){

shell.openPath(os.homedir() + '\\Downloads')
}