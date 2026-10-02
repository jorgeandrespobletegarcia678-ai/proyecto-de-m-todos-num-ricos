// =========================================================================
// 1. MOTORES MATEMÁTICOS NATIVOS E INTÉRPRETE
// =========================================================================
function evaluarFuncion(expresion, xValor) {
    // Esto convierto todo a minusculas y quita espacios
    let str = expresion.toLowerCase().replace(/\s+/g, '');
    
    // Esto convierte "2e" en "2*e", "2x" en "2*x", "5(" en "5*(", etc.
    str = str.replace(/(\d+)([a-z\(])/g, '\$1*\$2');     str = str.replace(/(\))(\()/g, '\$1*\$2');     str = str.replace(/(\))([a-z])/g, '\$1*\$2');

    // 3. Traducimos el número de Euler elevado a una potencia de forma 
    // Maneja tanto e^x como e^(x^2) reemplazando por la función exponencial nativa
    while (str.includes('e^')) {
        // Esto detecta si la potencia tiene paréntesis como e^(x^2)
        str = str.replace(/e\^\(([^)]+)\)/g, 'Math.exp(\$1)');
        // Detecta si es una potencia simple como e^x
        str = str.replace(/e\^([a-z0-9\.]+)/g, 'Math.exp(\$1)');
    }
    
    // Si queda alguna 'e' suelta (ej: 2*e), la cambiamos por el valor numérico de Euler
    str = str.replace(/\be\b/g, 'Math.E');

    // 4. Traducimos funciones trigonométricas y logaritmos a formato nativo JavaScript
    str = str.replace(/sin\(/g, 'Math.sin(');
    str = str.replace(/cos\(/g, 'Math.cos(');
    str = str.replace(/tan\(/g, 'Math.tan(');
    str = str.replace(/ln\(/g, 'Math.log(');
    str = str.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt(\$1)');
    
    // 5. Esto remplaza todos los '^' restantes por el operador de potencia nativo '**'
    str = str.replace(/\^/g, '**');
    
    // 6. Ejecutamos la función sobre el valor x asignado
    const fn = new Function('x', `return ${str};`);
    return fn(xValor);
}




function calcularDerivadaNumerica(ecuacion, xValor) {
    const h = 0.000001;
    const fx_mas_h = evaluarFuncion(ecuacion, xValor + h);
    const fx_menos_h = evaluarFuncion(ecuacion, xValor - h);
    return (fx_mas_h - fx_menos_h) / (2 * h);
}

function ejecutarBisecciónMatematica(ecuacion, a, b, tol, maxIter) {
    let historial = [];
    let fa = evaluarFuncion(ecuacion, a);
    let fb = evaluarFuncion(ecuacion, b);
    
    if (fa * fb >= 0) return { 
        errorIntervalo: true, historial 
    };

    let c = a;
    let iter = 0;
    let error = 100;

    while ((b - a) / 2 > tol && iter < maxIter) {
        c = (a + b) / 2;
        iter++;
        const fc = evaluarFuncion(ecuacion, c);
        error = (b - a) / 2;

        historial.push({ i: iter, x_n: c, fx_n: fc, errorAbs: error });

        if (fc === 0.0) break;
        if (evaluarFuncion(ecuacion, a) * fc < 0) {
            b = c;
        } else {
            a = c;
        }
    }
    return { raiz: c, iteraciones: iter, historial };
}

function ejecutarPuntoFijoMatematico(g_ecuacion, x0, tol, maxIter) {
    let historial = [];
    let x_actual = x0;
    let iter = 0;
    let error = 100;

    while (error > tol && iter < maxIter) {
        let x_siguiente;
        try {
            x_siguiente = evaluarFuncion(g_ecuacion, x_actual);
        } catch(e) {
            return { errorSintaxis: true, historial };
        }
        
        error = Math.abs(x_siguiente - x_actual);
        iter++;

        historial.push({ i: iter, x_n: x_actual, fx_n: x_siguiente, errorAbs: error });
        x_actual = x_siguiente;
    }
    return { raiz: x_actual, iteraciones: iter, historial };
}

function ejecutarNewtonMatematico(ecuacion, x0, tol, maxIter) {
    let historial = [];
    let x_actual = x0;
    let iter = 0;
    let error = 100;

    while (error > tol && iter < maxIter) {
        const fx = evaluarFuncion(ecuacion, x_actual);
        const dfx = calcularDerivadaNumerica(ecuacion, x_actual);

        if (dfx === 0) return { errorDerivada: true, historial };

        let x_siguiente = x_actual - (fx / dfx);
        error = Math.abs(x_siguiente - x_actual);
        iter++;

        historial.push({ i: iter, x_n: x_actual, fx_n: fx, errorAbs: error });
        x_actual = x_siguiente;
    }
    return { raiz: x_actual, iteraciones: iter, historial };
}

function generarTablaHTML(historial, tol, headers) {
    let tabla = `<table class="tabla-pasos"><thead><tr>`;
    headers.forEach(h => tabla += `<th>${h}</th>`);
    tabla += `</tr></thead><tbody>`;

    historial.forEach(p => {
        const esUltimo = p.errorAbs <= tol;
        tabla += `<tr>
            <td style="font-weight:bold;">${p.i}</td>
            <td>${p.x_n.toFixed(6)}</td>
            <td>${p.fx_n.toFixed(6)}</td>
            <td class="${esUltimo ? 'text-success' : 'text-danger'}">${p.errorAbs.toExponential(4)}</td>
        </tr>`;
    });
    return tabla + `</tbody></table>`;
}

// =========================================================================
// 2. CONTROL DIRECTO DE LA INTERFAZ Y EVENTOS
// =========================================================================

// --- NAVEGACIÓN ENTRE CAPAS ---
const navButtons = document.querySelectorAll('.nav-btn');
const layers = document.querySelectorAll('.layer');

navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        layers.forEach(layer => layer.classList.remove('active-layer'));
        
        const targetLayerId = button.getAttribute('data-target');
        const targetLayer = document.getElementById(targetLayerId);
        if (targetLayer) {
            targetLayer.classList.add('active-layer');
        }
    });
});

// --- LÓGICA DE LA CALCULADORA LIBRE ---
const selectMetodo = document.getElementById('calcMetodo');
const labelInputA = document.getElementById('labelInputA');
const containerInputB = document.getElementById('containerInputB');

selectMetodo?.addEventListener('change', () => {
    if (selectMetodo.value === 'biseccion') {
        labelInputA.innerText = "Intervalo A (Inferior):";
        if (containerInputB) containerInputB.style.display = 'block';
    } else {
        labelInputA.innerText = "Valor Inicial (X0):";
        if (containerInputB) containerInputB.style.display = 'none';
    }
});

document.getElementById('btnCalcular')?.addEventListener('click', () => {
    const metodo = selectMetodo.value;
    const ecuacion = document.getElementById('inputFuncion').value;
    const a = parseFloat(document.getElementById('inputA').value);
    const b = parseFloat(document.getElementById('inputB').value);
    const tol = parseFloat(document.getElementById('inputTol').value);
    const maxIter = parseInt(document.getElementById('inputIter').value) || 50;
    const resultBox = document.getElementById('resultadoCalc');

    let res;
    let headers = [];

    try {
        evaluarFuncion(ecuacion, 1);
    } catch(e) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `<p class="text-danger"><strong>Error de Sintaxis:</strong> No se pudo procesar la ecuación.</p>`;
        return;
    }

    if (metodo === 'biseccion') {
        res = ejecutarBisecciónMatematica(ecuacion, a, b, tol, maxIter);
        headers = ["Iteración (n)", "Punto Medio (c)", "f(c)", "Error Absoluto"];
    } else if (metodo === 'punto_fijo') {
        res = ejecutarPuntoFijoMatematico(ecuacion, a, tol, maxIter);
        headers = ["Iteración (n)", "x_n", "g(x_n)", "Error Absoluto"];
    } else if (metodo === 'newton') {
        res = ejecutarNewtonMatematico(ecuacion, a, tol, maxIter);
        headers = ["Iteración (n)", "x_n", "f(x_n)", "Error Absoluto"];
    }

    if (res.errorIntervalo) {
        resultBox.innerHTML = `<p class="text-danger"><strong>Error de Intervalo:</strong> f(a) y f(b) deben tener signos opuestos en bisección.</p>`;
    } else if (res.errorDerivada) {
        resultBox.innerHTML = `<p class="text-danger"><strong>Error Numérico:</strong> La derivada se hizo cero.</p>`;
    } else {
        resultBox.innerHTML = generarTablaHTML(res.historial, tol, headers) + 
            `<div class="alerta-final"><strong>Raíz aproximada:</strong> ${res.raiz.toFixed(6)} encontrado en ${res.iteraciones} iteraciones.</div>`;
    }
    resultBox.style.display = 'block';
});

// --- RENDERIZACIÓN AUTOMÁTICA DE TRABAJOS DE CLASE ---
const bloquesEjercicios = document.querySelectorAll('.ejercicio-automatico');

bloquesEjercicios.forEach(bloque => {
    const id = bloque.getAttribute('data-id');
    const nombre = bloque.getAttribute('data-nombre');
    const metodo = bloque.getAttribute('data-metodo');
    const ecuacion = bloque.getAttribute('data-ecuacion');
    const a = parseFloat(bloque.getAttribute('data-a'));
    const b = parseFloat(bloque.getAttribute('data-b')) || 0;
    const tol = parseFloat(bloque.getAttribute('data-tol'));
    const maxIter = parseInt(bloque.getAttribute('data-iter')) || 40;

    bloque.innerHTML = `
        <div class="ejercicio-box">
            <h3>${nombre} <span style="font-size:0.85rem; color:#7f8c8d; background:#e2e8f0; padding:2px 6px; border-radius:4px;">${metodo.toUpperCase()}</span></h3>
            <p><strong>Función:</strong> <code>${ecuacion}</code></p>
            <p><strong>Datos:</strong> X0/A = ${a} ${metodo === 'biseccion' ? '| B = ' + b : ''} | Tol = ${tol}</p>
            <button class="btn-ejercicio" data-btn-id="${id}">Resolver Trabajo</button>
            <div id="resultado-ejercicio-${id}" class="tabla-contenedor"></div>
        </div>
    `;

    bloque.querySelector(`[data-btn-id="${id}"]`).addEventListener('click', () => {
        const contenedor = document.getElementById(`resultado-ejercicio-${id}`);
        let res;
        let headers = [];

        try {
            if (metodo === 'biseccion') {
                res = ejecutarBisecciónMatematica(ecuacion, a, b, tol, maxIter);
                headers = ["Iteración (n)", "Punto Medio (c)", "f(c)", "Error Absoluto"];
            } else if (metodo === 'punto_fijo') {
                res = ejecutarPuntoFijoMatematico(ecuacion, a, tol, maxIter);
                headers = ["Iteración (n)", "x_n", "g(x_n)", "Error Absoluto"];
            } else if (metodo === 'newton') {
                res = ejecutarNewtonMatematico(ecuacion, a, tol, maxIter);
                headers = ["Iteración (n)", "x_n", "f(x_n)", "Error Absoluto"];
            }

            if (res.errorIntervalo) {
                contenedor.innerHTML = `<p class="text-danger">Error: Intervalo inválido.</p>`;
            } else if (res.errorDerivada) {
                contenedor.innerHTML = `<p class="text-danger">Error: Derivada cero.</p>`;
            } else {
                contenedor.innerHTML = generarTablaHTML(res.historial, tol, headers) + 
                    `<div class="alerta-final"><strong>Resultado:</strong> Raíz ${res.raiz.toFixed(6)} en ${res.iteraciones} pasos.</div>`;
            }
        } catch (error) {
            contenedor.innerHTML = `<p class="text-danger">Error al evaluar el ejercicio.</p>`;
        }
    });
});
