/* ============================================================
  ejercicios.js
  Utilidades y corrección compartidas por las tres guías del repo.
  Cada página define window.EJERCICIOS antes de cargar este archivo.
  ============================================================ */

function etiquetas(texto, nombre){
  const re = new RegExp('<' + nombre + '\\b([^>]*)>', 'gi');
  const encontradas = [];
  let coincidencia;
  while ((coincidencia = re.exec(texto))) encontradas.push(coincidencia[1]);
  return encontradas;
}

function etiquetasConContenido(texto, nombre){
  const re = new RegExp('<' + nombre + '\\b([^>]*)>([\\s\\S]*?)<\\/' + nombre + '\\s*>', 'gi');
  const encontradas = [];
  let coincidencia;
  while ((coincidencia = re.exec(texto))) {
    encontradas.push({ attrs: coincidencia[1], contenido: coincidencia[2] });
  }
  return encontradas;
}

function atributo(atributos, nombre){
  const re = new RegExp('\\b' + nombre + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i');
  const m = re.exec(atributos);
  if (!m) return null;
  if (m[1] !== undefined) return m[1];
  if (m[2] !== undefined) return m[2];
  return m[3];
}

function textoVisible(html){
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tieneAtributo(atributos, nombre){
  return new RegExp('\\b' + nombre + '\\b', 'i').test(atributos);
}

function tipoDe(atributos){
  return String(atributo(atributos, 'type') || 'text').toLowerCase();
}

function camposDeTipo(texto, tipos){
  return etiquetas(texto, 'input').filter(a => tipos.indexOf(tipoDe(a)) !== -1);
}

function idsDe(texto){
  return etiquetas(texto, 'input').map(a => atributo(a, 'id')).filter(id => !!id);
}

function labelsQueApuntan(texto, ids){
  return etiquetas(texto, 'label')
    .map(a => atributo(a, 'for'))
    .filter(f => !!f && ids.indexOf(f) !== -1);
}

function todosEtiquetados(texto, campos){
  if (!campos.length) return false;
  const fors = etiquetas(texto, 'label').map(a => atributo(a, 'for')).filter(f => !!f);
  return campos.every(function(a){
    const id = atributo(a, 'id');
    return !!id && fors.indexOf(id) !== -1;
  });
}

function primerImg(texto){
  return etiquetas(texto, 'img')[0] || '';
}

function conScope(texto, valor){
  return etiquetas(texto, 'th').some(function(a){
    return String(atributo(a, 'scope') || '').toLowerCase() === valor;
  });
}

function corregir(boton){
  const art = boton.closest('.ejercicio');
  const texto = art.querySelector('.respuesta').value;
  const datos = window.EJERCICIOS && window.EJERCICIOS[art.dataset.id];
  if (!datos) return;

  const resultados = datos.requisitos.map(function(r){
    return { texto: r.d, pista: r.p, ok: !!r.f(texto) };
  });
  const bien = resultados.filter(function(r){ return r.ok; }).length;
  const total = resultados.length;
  const perfecto = bien === total;
  art.classList.toggle('correcto', perfecto);

  const salida = art.querySelector('.resultado');
  salida.setAttribute('role', 'status');
  salida.setAttribute('aria-live', 'polite');
  salida.innerHTML =
    '<div class="resumen' + (perfecto ? '' : ' parcial') + '">' +
      (perfecto ? '✅ ' : '✍️ ') + bien + ' de ' + total + ' requisitos cumplidos' +
    '</div><ul>' +
    resultados.map(function(r){
      return '<li class="' + (r.ok ? 'si' : 'no') + '">' + (r.ok ? '✅' : '❌') + ' ' + r.texto +
        (r.ok || !r.pista ? '' : '<span class="pista">Pista: ' + r.pista + '</span>') + '</li>';
    }).join('') + '</ul>';
}

document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.ejercicio .resultado').forEach(function(salida){
    salida.setAttribute('role', 'status');
    salida.setAttribute('aria-live', 'polite');
  });

  document.querySelectorAll('.corregir').forEach(function(b){
    b.addEventListener('click', function(){ corregir(b); });
  });

  document.querySelectorAll('.limpiar').forEach(function(b){
    b.addEventListener('click', function(){
      const art = b.closest('.ejercicio');
      art.querySelector('.respuesta').value = '';
      art.querySelector('.resultado').innerHTML = '';
      art.classList.remove('correcto');
    });
  });
});
