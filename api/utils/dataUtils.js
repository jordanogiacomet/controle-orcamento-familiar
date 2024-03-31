const moment = require('moment');

/**
 * Converte uma string de data em vários formatos para o formato ISO 'YYYY-MM-DD'.
 * A função tenta analisar uma série de formatos de data comuns. Se a data não puder ser analisada,
 * 'Data inválida' é retornada. A análise da data é feita considerando o fuso horário local.
 *
 * @param {string} dataStr - A string de data a ser convertida.
 * @return {string} A data no formato 'YYYY-MM-DD' se a string de entrada for válida, ou 'Data inválida' caso contrário.
 */
function converterParaISO(dataStr) {
  const formatos = [
    moment.ISO_8601,
    'DD-MM-YYYY',
    // Você pode adicionar mais formatos aqui se necessário
  ];

  // Tenta criar um objeto moment com o fuso horário local
  const data = moment(dataStr, formatos, true);

  if (!data.isValid()) {
    return 'Data inválida';
  }

  // Usa a data local, não a data UTC, para evitar problemas de fuso horário
  return data.format('YYYY-MM-DD');
}

module.exports = converterParaISO;
