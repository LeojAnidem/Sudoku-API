/**
 * 
 * @param {string} html Representa el elemento html o nodo que desees convertir a texto
 * @returns {string} Un texto con identacion y saltos de linea.
 */

export const formatHtml = (html: string): string => {
  let formatted = '';
  const regex = /(>)(<)(\/?)/g;
  
  html = html.replace(regex, '$1\n$2$3');
  
  let pad = 0;
  const tokens = html.split('\n');
  const indent = '  '; 

  for (let i = 0; i < tokens.length; i++) {
    let line = tokens[i];

    
    line = line.trim();

    if (line.length > 0) {
      
      if (line.match(/^<\/\w/) && pad > 0) { 
        pad--;
      }
      
      
      formatted += indent.repeat(pad) + line + '\n';

      
      if (line.match(/^<\w[^>]*[^\/]>|^<[^/]>.*[^<\/]>$/) && !line.match(/<\/\w/)) {
        pad++;
      }
    }
  }


  return formatted.trim(); 
};