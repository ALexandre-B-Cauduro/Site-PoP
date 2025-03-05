// Carregar disponibilidade (para index.html)
if (document.getElementById('disponibilidade')) {
  console.log('Iniciando carregamento da disponibilidade para index.html...');
  fetch('total.txt')
    .then(response => {
      console.log('Resposta do fetch recebida:', response);
      if (!response.ok) {
        throw new Error('Erro ao carregar total.txt: ' + response.statusText);
      }
      return response.text();
    })
    .then(texto => {
      console.log('Texto bruto carregado:', texto);
      const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
      console.log('Linhas processadas:', linhas);
      if (linhas.length === 0) {
        throw new Error('Arquivo total.txt está vazio');
      }

      const ultimaLinha = linhas[linhas.length - 1];
      const [ano, mesAbreviado, valor] = ultimaLinha.split(' ');
      console.log('Última linha processada:', { ano, mesAbreviado, valor });

      // Verificar se os dados foram extraídos corretamente
      if (!ano || !mesAbreviado || !valor) {
        throw new Error('Formato inválido na última linha do total.txt');
      }

      // Mapeamento de meses abreviados para nomes completos em português
      const meses = {
        jan: 'Janeiro',
        fev: 'Fevereiro',
        mar: 'Março',
        abr: 'Abril',
        mai: 'Maio',
        jun: 'Junho',
        jul: 'Julho',
        ago: 'Agosto',
        set: 'Setembro',
        out: 'Outubro',
        nov: 'Novembro',
        dez: 'Dezembro'
      };

      // Converter o mês abreviado para o nome completo
      const mesCompleto = meses[mesAbreviado.toLowerCase()] || mesAbreviado;
      console.log('Mês convertido:', mesCompleto);

      // Atualizar os elementos no DOM
      document.getElementById('disponibilidade-mes').textContent = `${mesCompleto}/${ano}`;
      document.getElementById('disponibilidade').textContent = `${valor}%`;
    })
    .catch(error => {
      console.error('Erro ao carregar ou processar dados:', error);
      document.getElementById('disponibilidade-mes').textContent = 'Indisponível';
      document.getElementById('disponibilidade').textContent = 'Erro ao carregar';
    });
}

  document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o elemento #map existe (para a página instituicoes-conectadas.html)
    if (document.getElementById('map')) {
      // Inicializar o mapa com Leaflet
      const map = L.map('map').setView([-30.0331, -51.23], 7); // Centro aproximado do RS
  
      // Adicionar camada de tiles do OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      // Lista de instituições conectadas (70 instituições agora)
      const instituicoes = [
        { nome: 'UFRGS', lat: -30.0331, lng: -51.22, descricao: 'Universidade Federal do Rio Grande do Sul, localizada em Porto Alegre.', status: 'Conectado' },
        { nome: 'PUCRS', lat: -30.0576, lng: -51.1746, descricao: 'Pontifícia Universidade Católica do RS, em Porto Alegre.', status: 'Conectado' },
        { nome: 'UFSM', lat: -29.6881, lng: -53.8069, descricao: 'Universidade Federal de Santa Maria, em Santa Maria.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Bagé', lat: -31.3314, lng: -54.1069, descricao: 'Universidade Federal do Pampa, campus Bagé.', status: 'Conectado' },
        { nome: 'UFPEL', lat: -31.775, lng: -52.342, descricao: 'Universidade Federal de Pelotas, em Pelotas.', status: 'Conectado' },
        { nome: 'UFCSPA', lat: -30.051, lng: -51.214, descricao: 'Universidade Federal de Ciências da Saúde de Porto Alegre.', status: 'Conectado' },
        { nome: 'UNISINOS', lat: -29.795, lng: -51.152, descricao: 'Universidade do Vale do Rio dos Sinos, em São Leopoldo.', status: 'Conectado' },
        { nome: 'UCS', lat: -29.168, lng: -51.179, descricao: 'Universidade de Caxias do Sul, em Caxias do Sul.', status: 'Conectado' },
        { nome: 'FURG', lat: -32.034, lng: -52.098, descricao: 'Universidade Federal do Rio Grande, em Rio Grande.', status: 'Conectado' },
        { nome: 'IFRS - Porto Alegre', lat: -30.032, lng: -51.23, descricao: 'Instituto Federal do Rio Grande do Sul, campus Porto Alegre.', status: 'Conectado' },
        { nome: 'UNIVATES', lat: -29.456, lng: -51.966, descricao: 'Universidade do Vale do Taquari, localizada em Lajeado.', status: 'Conectado' },
        { nome: 'IFRS - Bento Gonçalves', lat: -29.171, lng: -51.519, descricao: 'Instituto Federal do Rio Grande do Sul, campus Bento Gonçalves.', status: 'Conectado' },
        { nome: 'UNISC', lat: -29.697, lng: -52.434, descricao: 'Universidade de Santa Cruz do Sul, em Santa Cruz do Sul.', status: 'Conectado' },
        { nome: 'ULBRA', lat: -29.923, lng: -51.175, descricao: 'Universidade Luterana do Brasil, campus Canoas.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Alegrete', lat: -29.784, lng: -55.792, descricao: 'Universidade Federal do Pampa, campus Alegrete.', status: 'Conectado' },
        { nome: 'UNIJUÍ - Ijuí', lat: -28.389, lng: -53.918, descricao: 'Universidade Regional do Noroeste do Estado do RS, Campus Ijuí.', status: 'Conectado' },
        { nome: 'URI - Erechim', lat: -27.634, lng: -52.274, descricao: 'Universidade Regional Integrada do Alto Uruguai e das Missões, campus Erechim.', status: 'Conectado' },
        { nome: 'UPF', lat: -28.263, lng: -52.407, descricao: 'Universidade de Passo Fundo, em Passo Fundo.', status: 'Conectado' },
        { nome: 'IFRS - Caxias do Sul', lat: -29.169, lng: -51.181, descricao: 'Instituto Federal do Rio Grande do Sul, campus Caxias do Sul.', status: 'Conectado' },
        { nome: 'UNIPAMPA - São Borja', lat: -28.659, lng: -56.004, descricao: 'Universidade Federal do Pampa, campus São Borja.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Santana do Livramento', lat: -30.876, lng: -55.533, descricao: 'Universidade Federal do Pampa, campus Santana do Livramento.', status: 'Conectado' },
        { nome: 'FEEVALE', lat: -29.656, lng: -51.123, descricao: 'Universidade Feevale, localizada em Novo Hamburgo.', status: 'Conectado' },
        { nome: 'URI - Santo Ângelo', lat: -28.299, lng: -54.263, descricao: 'Universidade Regional Integrada, campus Santo Ângelo.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Uruguaiana', lat: -29.755, lng: -57.088, descricao: 'Universidade Federal do Pampa, campus Uruguaiana.', status: 'Conectado' },
        { nome: 'IFRS - Farroupilha', lat: -29.225, lng: -51.347, descricao: 'Instituto Federal do Rio Grande do Sul, campus Farroupilha.', status: 'Conectado' },
        { nome: 'IFRS - Osório', lat: -29.886, lng: -50.269, descricao: 'Instituto Federal do Rio Grande do Sul, campus Osório.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Itaqui', lat: -29.125, lng: -56.553, descricao: 'Universidade Federal do Pampa, campus Itaqui.', status: 'Conectado' },
        { nome: 'IFSUL - Pelotas', lat: -31.771, lng: -52.342, descricao: 'Instituto Federal Sul-Riograndense, campus Pelotas.', status: 'Conectado' },
        { nome: 'IFSUL - Sapucaia do Sul', lat: -29.828, lng: -51.149, descricao: 'Instituto Federal Sul-Riograndense, campus Sapucaia do Sul.', status: 'Conectado' },
        { nome: 'UNICRUZ', lat: -29.697, lng: -52.435, descricao: 'Universidade de Cruz Alta, em Cruz Alta.', status: 'Conectado' },
        { nome: 'IFSUL - Bagé', lat: -31.331, lng: -54.107, descricao: 'Instituto Federal Sul-Riograndense, campus Bagé.', status: 'Conectado' },
        { nome: 'IFSUL - Santana do Livramento', lat: -30.876, lng: -55.533, descricao: 'Instituto Federal Sul-Riograndense, campus Santana do Livramento.', status: 'Conectado' },
        { nome: 'IFRS - Canoas', lat: -29.921, lng: -51.176, descricao: 'Instituto Federal do Rio Grande do Sul, campus Canoas.', status: 'Conectado' },
        { nome: 'IFRS - Erechim', lat: -27.634, lng: -52.275, descricao: 'Instituto Federal do Rio Grande do Sul, campus Erechim.', status: 'Conectado' },
        { nome: 'IFRS - Ibirubá', lat: -28.627, lng: -53.091, descricao: 'Instituto Federal do Rio Grande do Sul, campus Ibirubá.', status: 'Conectado' },
        { nome: 'IFRS - Rio Grande', lat: -32.035, lng: -52.099, descricao: 'Instituto Federal do Rio Grande do Sul, campus Rio Grande.', status: 'Conectado' },
        { nome: 'IFRS - Rolante', lat: -29.650, lng: -50.576, descricao: 'Instituto Federal do Rio Grande do Sul, campus Rolante.', status: 'Conectado' },
        { nome: 'IFRS - Sertão', lat: -27.982, lng: -52.257, descricao: 'Instituto Federal do Rio Grande do Sul, campus Sertão.', status: 'Conectado' },
        { nome: 'IFRS - Vacaria', lat: -28.512, lng: -50.934, descricao: 'Instituto Federal do Rio Grande do Sul, campus Vacaria.', status: 'Conectado' },
        { nome: 'IFRS - Veranópolis', lat: -28.936, lng: -51.549, descricao: 'Instituto Federal do Rio Grande do Sul, campus Veranópolis.', status: 'Conectado' },
        { nome: 'UFSM - Campus Cachoeira do Sul', lat: -30.512, lng: -53.491, descricao: 'Universidade Federal Santa Maria, Campus Cachoeira do Sul.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Dom Pedrito', lat: -30.983, lng: -54.673, descricao: 'Universidade Federal do Pampa, campus Dom Pedrito.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Jaguarão', lat: -32.566, lng: -53.376, descricao: 'Universidade Federal do Pampa, campus Jaguarão.', status: 'Conectado' },
        { nome: 'UNIPAMPA - São Gabriel', lat: -30.336, lng: -54.320, descricao: 'Universidade Federal do Pampa, campus São Gabriel.', status: 'Conectado' },
        { nome: 'URI - Frederico Westphalen', lat: -27.359, lng: -53.394, descricao: 'Universidade Regional Integrada, campus Frederico Westphalen.', status: 'Conectado' },
        { nome: 'URI - Santiago', lat: -29.192, lng: -54.867, descricao: 'Universidade Regional Integrada, campus Santiago.', status: 'Conectado' },
        { nome: 'IFSUL - Charqueadas', lat: -29.955, lng: -51.625, descricao: 'Instituto Federal Sul-Riograndense, campus Charqueadas.', status: 'Conectado' },
        { nome: 'IFSUL - Passo Fundo', lat: -28.263, lng: -52.408, descricao: 'Instituto Federal Sul-Riograndense, campus Passo Fundo.', status: 'Conectado' },
        { nome: 'IFSUL - Camaquã', lat: -30.851, lng: -51.812, descricao: 'Instituto Federal Sul-Riograndense, campus Camaquã.', status: 'Conectado' },
        { nome: 'IFSUL - Gravataí', lat: -29.944, lng: -50.992, descricao: 'Instituto Federal Sul-Riograndense, campus Gravataí.', status: 'Conectado' },
        { nome: 'IFSUL - Venâncio Aires', lat: -29.614, lng: -52.193, descricao: 'Instituto Federal Sul-Riograndense, campus Venâncio Aires.', status: 'Conectado' },
        { nome: 'IFSUL - Novo Hamburgo', lat: -29.678, lng: -51.131, descricao: 'Instituto Federal Sul-Riograndense, campus Novo Hamburgo.', status: 'Conectado' },
        { nome: 'IFSUL - Lajeado', lat: -29.467, lng: -51.964, descricao: 'Instituto Federal Sul-Riograndense, campus Lajeado.', status: 'Conectado' },
        { nome: 'IFRS - Alvorada', lat: -29.991, lng: -51.083, descricao: 'Instituto Federal do Rio Grande do Sul, campus Alvorada.', status: 'Conectado' },
        { nome: 'IFRS - Restinga', lat: -30.149, lng: -51.149, descricao: 'Instituto Federal do Rio Grande do Sul, campus Restinga, Porto Alegre.', status: 'Conectado' },
        { nome: 'IFRS - Viamão', lat: -30.081, lng: -51.023, descricao: 'Instituto Federal do Rio Grande do Sul, campus Viamão.', status: 'Conectado' },
        { nome: 'IFRS - Feliz', lat: -29.451, lng: -51.306, descricao: 'Instituto Federal do Rio Grande do Sul, campus Feliz.', status: 'Conectado' },
        { nome: 'UNIPAMPA - São Sepé', lat: -30.161, lng: -53.565, descricao: 'Universidade Federal do Pampa, campus São Sepé.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Cachoeira do Sul', lat: -30.039, lng: -52.894, descricao: 'Universidade Federal do Pampa, campus Cachoeira do Sul.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Santa Vitória do Palmar', lat: -33.519, lng: -53.350, descricao: 'Universidade Federal do Pampa, campus Santa Vitória do Palmar.', status: 'Conectado' },
        { nome: 'URI - Cerro Largo', lat: -28.148, lng: -54.738, descricao: 'Universidade Regional Integrada, campus Cerro Largo.', status: 'Conectado' },
        { nome: 'IFSUL - Sapiranga', lat: -29.638, lng: -51.006, descricao: 'Instituto Federal Sul-Riograndense, campus Sapiranga.', status: 'Conectado' },
        { nome: 'IFSUL - Jaguarão', lat: -32.566, lng: -53.376, descricao: 'Instituto Federal Sul-Riograndense, campus Jaguarão.', status: 'Conectado' },
        { nome: 'IFSUL - SantAna do Livramento', lat: -30.876, lng: -55.533, descricao: 'Instituto Federal Sul-Riograndense, campus SantAna do Livramento.', status: 'Conectado' },
        { nome: 'IFRS - Eldorado do Sul', lat: -30.084, lng: -51.618, descricao: 'Instituto Federal do Rio Grande do Sul, campus Eldorado do Sul.', status: 'Conectado' },
        { nome: 'IFRS - Porto Alegre Centro', lat: -30.032, lng: -51.229, descricao: 'Instituto Federal do Rio Grande do Sul, campus Porto Alegre Centro.', status: 'Conectado' },
        { nome: 'UNIRITTER - Porto Alegre', lat: -30.058, lng: -51.171, descricao: 'Centro Universitário Ritter dos Reis, campus Porto Alegre.', status: 'Conectado' },
        { nome: 'UNIFIN - Passo Fundo', lat: -28.263, lng: -52.407, descricao: 'Faculdade de Finanças e Administração, em Passo Fundo.', status: 'Conectado' },
        { nome: 'IFSUL - São José do Norte', lat: -32.015, lng: -52.017, descricao: 'Instituto Federal Sul-Riograndense, campus São José do Norte.', status: 'Conectado' },
        { nome: 'IFSUL - Santa Rosa', lat: -27.871, lng: -54.481, descricao: 'Instituto Federal Sul-Riograndense, campus Santa Rosa.', status: 'Conectado' },
        { nome: 'IFSUL - Santo Ângelo', lat: -28.299, lng: -54.263, descricao: 'Instituto Federal Sul-Riograndense, campus Santo Ângelo.', status: 'Conectado' },
        { nome: 'IFSUL - Farroupilha', lat: -29.225, lng: -51.347, descricao: 'Instituto Federal Sul-Riograndense, campus Farroupilha.', status: 'Conectado' },
        { nome: 'IFRS - São Vicente do Sul', lat: -29.691, lng: -54.679, descricao: 'Instituto Federal do Rio Grande do Sul, campus São Vicente do Sul.', status: 'Conectado' },
        { nome: 'IFRS - Guaíba', lat: -30.114, lng: -51.325, descricao: 'Instituto Federal do Rio Grande do Sul, campus Guaíba.', status: 'Conectado' },
        { nome: 'IFRS - Não-Me-Toque', lat: -28.459, lng: -52.821, descricao: 'Instituto Federal do Rio Grande do Sul, campus Não-Me-Toque.', status: 'Conectado' },
        { nome: 'IFRS - Passo Fundo', lat: -28.263, lng: -52.406, descricao: 'Instituto Federal do Rio Grande do Sul, campus Passo Fundo.', status: 'Conectado' },
        { nome: 'IFF - Panambi', lat: -28.287, lng: -53.501, descricao: 'Instituto Federal Farroupilha, campus Panambi.', status: 'Conectado' },
        { nome: 'IFRS - Santo Augusto', lat: -27.851, lng: -53.777, descricao: 'Instituto Federal do Rio Grande do Sul, campus Santo Augusto.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Aceguá', lat: -31.866, lng: -54.161, descricao: 'Universidade Federal do Pampa, campus Aceguá.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Rosário do Sul', lat: -30.258, lng: -54.914, descricao: 'Universidade Federal do Pampa, campus Rosário do Sul.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Lavras do Sul', lat: -30.814, lng: -53.895, descricao: 'Universidade Federal do Pampa, campus Lavras do Sul.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Hulha Negra', lat: -31.406, lng: -53.943, descricao: 'Universidade Federal do Pampa, campus Hulha Negra.', status: 'Conectado' },
        { nome: 'UNA - Porto Alegre', lat: -30.057, lng: -51.171, descricao: 'Centro Universitário UNA, campus Porto Alegre.', status: 'Conectado' },
        { nome: 'UNIFRA - Santa Maria', lat: -29.689, lng: -53.807, descricao: 'Centro Universitário Franciscano, em Santa Maria.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Santa Maria', lat: -29.690, lng: -53.806, descricao: 'Centro Universitário Leonardo da Vinci, polo Santa Maria.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Porto Alegre', lat: -30.033, lng: -51.220, descricao: 'Centro Universitário Leonardo da Vinci, polo Porto Alegre.', status: 'Conectado' },
        { nome: 'IFSUL - São Leopoldo', lat: -29.760, lng: -51.148, descricao: 'Instituto Federal Sul-Riograndense, campus São Leopoldo.', status: 'Conectado' },
        { nome: 'IFSUL - Três Passos', lat: -27.455, lng: -53.932, descricao: 'Instituto Federal Sul-Riograndense, campus Três Passos.', status: 'Conectado' },
        { nome: 'IFSUL - Palmeira das Missões', lat: -27.900, lng: -53.313, descricao: 'Instituto Federal Sul-Riograndense, campus Palmeira das Missões.', status: 'Conectado' },
        { nome: 'IFSUL - São Gabriel', lat: -30.336, lng: -54.320, descricao: 'Instituto Federal Sul-Riograndense, campus São Gabriel.', status: 'Conectado' },
        { nome: 'IFRS - Três Passos', lat: -27.455, lng: -53.932, descricao: 'Instituto Federal do Rio Grande do Sul, campus Três Passos.', status: 'Conectado' },
        { nome: 'IFRS - Palmeira das Missões', lat: -27.900, lng: -53.313, descricao: 'Instituto Federal do Rio Grande do Sul, campus Palmeira das Missões.', status: 'Conectado' },
        { nome: 'IFRS - São Borja', lat: -28.659, lng: -56.004, descricao: 'Instituto Federal do Rio Grande do Sul, campus São Borja.', status: 'Conectado' },
        { nome: 'IFRS - Santana do Livramento', lat: -30.876, lng: -55.533, descricao: 'Instituto Federal do Rio Grande do Sul, campus Santana do Livramento.', status: 'Conectado' },
        { nome: 'IFRS - Uruguaiana', lat: -29.755, lng: -57.088, descricao: 'Instituto Federal do Rio Grande do Sul, campus Uruguaiana.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Quaraí', lat: -30.388, lng: -56.452, descricao: 'Universidade Federal do Pampa, campus Quaraí.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Pinheiro Machado', lat: -31.578, lng: -53.381, descricao: 'Universidade Federal do Pampa, campus Pinheiro Machado.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Pedras Altas', lat: -31.727, lng: -53.583, descricao: 'Universidade Federal do Pampa, campus Pedras Altas.', status: 'Conectado' },
        { nome: 'UNIPAMPA - Candiota', lat: -31.553, lng: -53.673, descricao: 'Universidade Federal do Pampa, campus Candiota.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Caxias do Sul', lat: -29.168, lng: -51.179, descricao: 'Centro Universitário Leonardo da Vinci, polo Caxias do Sul.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Pelotas', lat: -31.771, lng: -52.342, descricao: 'Centro Universitário Leonardo da Vinci, polo Pelotas.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Bento Gonçalves', lat: -29.171, lng: -51.519, descricao: 'Centro Universitário Leonardo da Vinci, polo Bento Gonçalves.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Lajeado', lat: -29.467, lng: -51.964, descricao: 'Centro Universitário Leonardo da Vinci, polo Lajeado.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Novo Hamburgo', lat: -29.678, lng: -51.131, descricao: 'Centro Universitário Leonardo da Vinci, polo Novo Hamburgo.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Passo Fundo', lat: -28.263, lng: -52.406, descricao: 'Centro Universitário Leonardo da Vinci, polo Passo Fundo.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Erechim', lat: -27.634, lng: -52.275, descricao: 'Centro Universitário Leonardo da Vinci, polo Erechim.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Canoas', lat: -29.921, lng: -51.176, descricao: 'Centro Universitário Leonardo da Vinci, polo Canoas.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Santa Cruz do Sul', lat: -29.697, lng: -52.434, descricao: 'Centro Universitário Leonardo da Vinci, polo Santa Cruz do Sul.', status: 'Conectado' },
        { nome: 'UNIASSELVI - Gravataí', lat: -29.944, lng: -50.992, descricao: 'Centro Universitário Leonardo da Vinci, polo Gravataí.', status: 'Conectado' },
        { nome: 'UNIASSELVI - São Leopoldo', lat: -29.760, lng: -51.148, descricao: 'Centro Universitário Leonardo da Vinci, polo São Leopoldo.', status: 'Conectado' },
        { nome: 'UCPEL', lat: -31.771, lng: -52.341, descricao: 'Universidade Católica de Pelotas, em Pelotas.', status: 'Conectado' },
        { nome: 'Anhanguera - Pelotas', lat: -31.769, lng: -52.340, descricao: 'Centro de Educação Superior Anhanguera de Pelotas, em Pelotas.', status: 'Conectado' },
        { nome: 'SENAI - Pelotas', lat: -31.768, lng: -52.339, descricao: 'Serviço Nacional de Aprendizagem Industrial, unidade Pelotas.', status: 'Conectado' },
        { nome: 'SESC - Pelotas', lat: -31.765, lng: -52.338, descricao: 'Serviço Social do Comércio, unidade Pelotas.', status: 'Conectado' },
        { nome: 'Hospital Escola UFPEL', lat: -31.774, lng: -52.343, descricao: 'Hospital Escola da Universidade Federal de Pelotas, em Pelotas.', status: 'Conectado' },
        { nome: 'EMBRAPA - Pelotas', lat: -31.711, lng: -52.344, descricao: 'EMBRAPA Clima Temperado, unidade de pesquisa em Pelotas.', status: 'Conectado' }
      ];
  
      // Adicionar marcadores ao mapa (um único estilo)
      instituicoes.forEach(instituicao => {
        const marker = L.circleMarker([instituicao.lat, instituicao.lng], {
          color: '#003366', // Cor azul escura consistente com o site
          fillColor: '#003366',
          fillOpacity: 0.8,
          radius: 8
        }).addTo(map);
  
        // Popup com informações detalhadas
        marker.bindPopup(`
          <b>${instituicao.nome}</b><br>
          <p>${instituicao.descricao}</p>
          <p><strong>Status:</strong> ${instituicao.status}</p>
        `);
      });
    }
  
    // Carregar disponibilidade (para index.html)
    if (document.getElementById('disponibilidade')) {
      fetch('total.txt')
        .then(response => response.text())
        .then(texto => {
          const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
          const ultimaLinha = linhas[linhas.length - 1];
          const [ano, mes, valor] = ultimaLinha.split(' ');
          document.getElementById('disponibilidade').textContent = valor ? `${valor}%` : 'Dados indisponíveis';
        })
        .catch(error => {
          console.error('Erro ao carregar dados:', error);
          document.getElementById('disponibilidade').textContent = 'Erro ao carregar';
        });
    }
  });


// Carregar dados de estatística (para estatistica.html)
if (document.getElementById('estatistica-body')) {
  fetch('total.txt')
    .then(response => response.text())
    .then(texto => {
      const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
      const dados = linhas.map(linha => {
        const [ano, mes, porcentagem] = linha.split(' ');
        return { ano: parseInt(ano), mes: mes.toLowerCase(), porcentagem: parseFloat(porcentagem.replace(',', '.')) };
      });

      // Gráfico: Últimos 12 meses (abr/2024 a mar/2025)
      const ultimos12Meses = dados.slice(-12); // Pega as últimas 12 entradas
      const labels = ultimos12Meses.map(d => `${d.mes.charAt(0).toUpperCase() + d.mes.slice(1)}/${d.ano}`);
      const valores = ultimos12Meses.map(d => d.porcentagem);

      const ctx = document.getElementById('disponibilidade-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Disponibilidade (%)',
            data: valores,
            backgroundColor: 'rgba(0, 51, 102, 0.6)', // Cor azul escura com transparência
            borderColor: '#003366',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              min: 90, // Mínimo do eixo Y, já que as porcentagens estão entre 95 e 100
              max: 100, // Máximo do eixo Y
              title: {
                display: true,
                text: 'Disponibilidade (%)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Mês/Ano'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });

      // Tabela: Últimos 3 anos (2025, 2024, 2023)
      const anos = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017.];
      const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
      const tbody = document.getElementById('estatistica-body');

      anos.forEach(ano => {
        const dadosAno = dados.filter(d => d.ano === ano);
        const tr = document.createElement('tr');
        let rowHtml = `<td>${ano}</td>`;

        meses.forEach(mes => {
          const dadoMes = dadosAno.find(d => d.mes === mes);
          rowHtml += `<td>${dadoMes ? dadoMes.porcentagem.toFixed(2).replace('.', ',') + '%' : '-'}</td>`;
        });

        tr.innerHTML = rowHtml;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar dados de estatística:', error);
      const tbody = document.getElementById('estatistica-body');
      tbody.innerHTML = '<tr><td colspan="13">Erro ao carregar dados</td></tr>';

      const ctx = document.getElementById('disponibilidade-chart').getContext('2d');
      ctx.font = '20px Arial';
      ctx.fillText('Erro ao carregar dados', 10, 50);
    });
}


document.addEventListener('DOMContentLoaded', function() {
  const noticiasPorPagina = 3; // Quantidade de notícias por "página"
  const listaNoticias = document.querySelectorAll('.noticia-item');
  const totalNoticias = listaNoticias.length;
  const totalPaginas = Math.ceil(totalNoticias / noticiasPorPagina);
  let paginaAtual = 1;

  const btnAnterior = document.getElementById('anterior');
  const btnProximo = document.getElementById('proximo');

  // Função para mostrar os itens da página atual
  function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * noticiasPorPagina;
    const fim = inicio + noticiasPorPagina;

    listaNoticias.forEach((noticia, index) => {
      if (index >= inicio && index < fim) {
        noticia.classList.add('visivel');
      } else {
        noticia.classList.remove('visivel');
      }
    });

    // Controla o estado dos botões
    btnAnterior.disabled = pagina === 1;
    btnProximo.disabled = pagina === totalPaginas;
  }

  // Exibe a primeira página ao carregar
  mostrarPagina(paginaAtual);

  // Evento para o botão "Próximo"
  btnProximo.addEventListener('click', function() {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      mostrarPagina(paginaAtual);
    }
  });

  // Evento para o botão "Anterior"
  btnAnterior.addEventListener('click', function() {
    if (paginaAtual > 1) {
      paginaAtual--;
      mostrarPagina(paginaAtual);
    }
  });
});