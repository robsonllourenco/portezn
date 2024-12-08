const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');
const sections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.tab'); // Abas de navegação
let currentSection = 0;

// Variável para armazenar o tamanho original da imagem
let originalWidth, originalHeight;

// Exibir a seção inicial
sections[currentSection].classList.add('active');
tabs[currentSection].classList.add('active');

// Função para exibir uma seção específica ao clicar na aba
function showSection(sectionId) {
  // Esconde todas as seções
  sections.forEach((section) => section.classList.remove('active'));

  // Remove a classe ativa de todas as abas
  tabs.forEach((tab) => tab.classList.remove('active'));

  // Mostra a seção correspondente
  const sectionIndex = Array.from(sections).findIndex(
    (section) => section.id === sectionId
  );
  if (sectionIndex !== -1) {
    sections[sectionIndex].classList.add('active');
    tabs[sectionIndex].classList.add('active');
    currentSection = sectionIndex;
  }
}

// Carregar a imagem de fundo
const backgroundImage = new Image();
backgroundImage.src = './fundoportezn.png';

backgroundImage.onload = () => {
  // Salva o tamanho original da imagem
  originalWidth = backgroundImage.width;
  originalHeight = backgroundImage.height;

  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

// Atualizar canvas em tempo real
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Configuração do texto (negrito e maiúsculas)
  ctx.font = 'bold 15px Arial'; // Texto em negrito
  ctx.fillStyle = 'black';

  // Preencher campos (convertendo para maiúsculas)
  ctx.fillText(document.getElementById('nome').value.toUpperCase(), 170, 224); // Nome
  ctx.fillText(document.getElementById('identidade').value.toUpperCase(), 499, 224); // RG

  ctx.fillText(document.getElementById('certificado').value.toUpperCase(), 78, 166); // Certificado
  ctx.fillText(document.getElementById('expedicao').value, 229, 166); // Expedição (pré-preenchido)
  ctx.fillText(document.getElementById('categoria').value, 357, 166); // Categoria (pré-preenchido)
  ctx.fillText(document.getElementById('via').value, 526, 166); // Via (select)

  ctx.fillText(document.getElementById('arma').value.toUpperCase(), 80, 282); // Arma
  ctx.fillText(document.getElementById('especie').value.toUpperCase(), 250, 282); // Espécie

  ctx.fillText(document.getElementById('dataExpedicao').value.toUpperCase(), 437, 282); // Data de Expedição
}

// Baixar imagem no tamanho original
function downloadImage() {
  // Cria um canvas temporário para renderizar no tamanho original
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = originalWidth;
  tempCanvas.height = originalHeight;

  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(backgroundImage, 0, 0, originalWidth, originalHeight);

  // Renderizar os textos no tamanho original (negrito e maiúsculas)
  const scaleX = originalWidth / canvas.width;
  const scaleY = originalHeight / canvas.height;

  tempCtx.font = `bold ${15 * scaleX}px Arial`; // Texto em negrito proporcional
  tempCtx.fillStyle = 'black';

  tempCtx.fillText(document.getElementById('nome').value.toUpperCase(), 170 * scaleX, 224 * scaleY); // Nome
  tempCtx.fillText(document.getElementById('identidade').value.toUpperCase(), 499 * scaleX, 224 * scaleY); // RG

  tempCtx.fillText(document.getElementById('certificado').value.toUpperCase(), 78 * scaleX, 166 * scaleY); // Certificado
  tempCtx.fillText(document.getElementById('expedicao').value, 229 * scaleX, 166 * scaleY); // Expedição
  tempCtx.fillText(document.getElementById('categoria').value, 356 * scaleX, 166 * scaleY); // Categoria
  tempCtx.fillText(document.getElementById('via').value, 526 * scaleX, 166 * scaleY); // Via

  tempCtx.fillText(document.getElementById('arma').value.toUpperCase(), 80 * scaleX, 282 * scaleY); // Arma
  tempCtx.fillText(document.getElementById('especie').value.toUpperCase(), 250 * scaleX, 282 * scaleY); // Espécie

  tempCtx.fillText(document.getElementById('dataExpedicao').value.toUpperCase(), 437 * scaleX, 282 * scaleY); // Data de Expedição

  // Baixar a imagem
  const link = document.createElement('a');
  link.download = 'porte-federal.png';
  link.href = tempCanvas.toDataURL('image/png');
  link.click();
}
