// SI TIENES ESTO EN LA LÍNEA 1, ELIMÍNALO COMPLETAMENTE:
// =========================================================================
// 1. MOTORES MATEMÁTICOS NATIVOS E INTÉRPRETE
// =========================================================================
function evaluarFuncion(expresion, xValor) {
    // Esto convierto todo a minusculas y quita espacios
    let str = expresion.toLowerCase().replace(/\s+/g, '');
    
    // Esto convierte "2e" en "2*e", "2x" en "2*x", "5(" en "5*(", etc.
    str = str.replace(/(\d+)([a-z\(])/g, '\$1*\$2');     
    str = str.replace(/(\))(\()/g, '\$1*\$2');     
    str = str.replace(/(\))([a-z])/g, '\$1*\$2');

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
    str = str.replace(/tanh\(/g, 'Math.tanh(');
    
    // 5. Esto remplaza todos los '^' restantes por el operador de potencia nativo '**'
// 5. Esto reemplaza todos los '^' restantes por el operador de potencia
    str = str.replace(/\^/g, '**');
    str = str.replace(/(^|[\+\-\*\/\(])-x/g, '$1(-1)*x'); // Asegura que 'x' esté precedido por un operador o paréntesis
    
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

function ejecutarBiseccionMatematica(ecuacion, a, b, tol, maxIter) {
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
// Factorial auxiliar para Taylor
function calcularFactorial(num) {
    if (num <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
}

// Derivadas de orden superior numéricas
function calcularDerivadaOrdenN(ecuacion, xValor, orden) {
    const h = 0.01; 
    if (orden === 0) return evaluarFuncion(ecuacion, xValor);
    if (orden === 1) {
        return (evaluarFuncion(ecuacion, xValor + h) - evaluarFuncion(ecuacion, xValor - h)) / (2 * h);
    }
    return (calcularDerivadaOrdenN(ecuacion, xValor + h, orden - 1) - calcularDerivadaOrdenN(ecuacion, xValor - h, orden - 1)) / (2 * h);
}

// Algoritmo del Polinomio de Taylor
function ejecutarTaylorMatematico(ecuacion, centro, grado) {
    let historial = [];
    let expresionPolinomio = "";

    for (let i = 0; i <= grado; i++) {
        let derivada = calcularDerivadaOrdenN(ecuacion, centro, i);
        let factorial = calcularFactorial(i);
        let coeficiente = derivada / factorial;

        historial.push({ i: i, termino: `f^(${i})`, valorDerivada: derivada, coef: coeficiente });

        if (Math.abs(coeficiente) > 0.00001) {
            let terminoStr = `${coeficiente.toFixed(4)} * (x - ${centro})^${i}`;
            if (expresionPolinomio === "") {
                expresionPolinomio = terminoStr;
            } else {
                expresionPolinomio += (coeficiente >= 0 ? " + " : " ") + terminoStr;
            }
        }
    }
    return { historial, polinomioEcuacion: expresionPolinomio };
}
// =========================================================================
// MOTORES DE LAGRANGE Y SIMPSON 1/3
// =========================================================================
function ejecutarLagrangeMatematico(ptsX, ptsY, xBuscar) {
    let resultado = 0;
    let n = ptsX.length;
    let historial = [];
    let terminosPolinomio = [];

    for (let i = 0; i < n; i++) {
        let li = 1;
        let numStr = [];
        let den = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (xBuscar - ptsX[j]) / (ptsX[i] - ptsX[j]);
                numStr.push(`(x - (${ptsX[j]}))`);
                den *= (ptsX[i] - ptsX[j]);
            }
        }
        let coef = ptsY[i] / den;
        terminosPolinomio.push(`(${coef}) * ${numStr.join(' * ')}`);
        let aporte = li * ptsY[i];
        resultado += aporte;
        historial.push({ i: i, x: ptsX[i], y: ptsY[i], li: li, aporte: aporte });
    }
    const polinomioEcuacion = terminosPolinomio.join(' + ');
    return { resultado, historial, polinomioEcuacion };
}


function evaluarPuntoSimpson(ecuacionStr, xVal) {
    if (typeof math !== 'undefined') {
        return math.evaluate(ecuacionStr, { x: xVal, e: Math.E, pi: Math.PI });
    }
    let expr = ecuacionStr
        .replace(/\^/g, '**')
        .replace(/-x\*\*([0-9.]+)/g, '-(x**$1)')
        .replace(/\bln\(/g, 'Math.log(')
        .replace(/\bsin\(/g, 'Math.sin(')
        .replace(/\bcos\(/g, 'Math.cos(')
        .replace(/\bsqrt\(/g, 'Math.sqrt(')
        .replace(/\be\b/g, 'Math.E');
    return Function('x', `return ${expr};`)(xVal);
}


function ejecutarSimpson13Matematico(ecuacionStr, a, b, n) {
    const h = (b - a) / n;
    let suma = 0;
    let historial = [];

    for (let i = 0; i <= n; i++) {
        let xi = a + i * h;
        let fxi = evaluarPuntoSimpson(ecuacionStr, xi);
        let coef = (i === 0 || i === n) ? 1 : (i % 2 === 1 ? 4 : 2);
        let termino = coef * fxi;
        suma += termino;
        historial.push({ i: i, x: xi, fx: fxi, coef: coef, termino: termino });
    }

    const integral = (h / 3) * suma;
    return { integral, h, historial };
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
function graficarFuncionEnCanvas(ecuacion, xPunto, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Evaluador seguro compatible con math.js y expresiones estándar
    const evalY = (xVal) => {
        try {
            if (typeof math !== 'undefined') {
                return math.evaluate(ecuacion, { x: xVal, e: Math.E, pi: Math.PI });
            }
            let expr = ecuacion
                .replace(/\^/g, '**')
                .replace(/-x\*\*([0-9.]+)/g, '-(x**$1)')
                .replace(/\bln\(/g, 'Math.log(')
                .replace(/\bsin\(/g, 'Math.sin(')
                .replace(/\bcos\(/g, 'Math.cos(')
                .replace(/\bsqrt\(/g, 'Math.sqrt(')
                .replace(/\be\b/g, 'Math.E');
            return Function('x', `return ${expr};`)(xVal);
        } catch (e) {
            return NaN;
        }
    };

    // Altura real del punto sobre la curva y = f(x)
    const yPunto = evalY(xPunto);
    const esRaiz = Math.abs(yPunto) < 0.01 || isNaN(yPunto);
    const yObjetivo = esRaiz ? 0 : yPunto;

    // Rango horizontal centrado alrededor de xPunto
    const xMin = xPunto - 4;
    const xMax = xPunto + 4;
    const escalaX = width / (xMax - xMin);
    const origenX = -xMin * escalaX;

    // Rango vertical ajustado para que siempre quepa el punto y la curva
    const amplitudY = Math.max(20, Math.abs(yObjetivo) * 1.8);
    const yMin = Math.min(-5, yObjetivo - amplitudY * 0.5);
    const yMax = Math.max(15, yObjetivo + amplitudY * 0.8);
    const escalaY = height / (yMax - yMin);
    const origenY = yMax * escalaY;

    // 1. Cuadrícula suave
    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 1;
    const pasoX = 1;
    const pasoY = Math.max(1, Math.round((yMax - yMin) / 8));

    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += pasoX) {
        const px = origenX + x * escalaX;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += pasoY) {
        const py = origenY - y * escalaY;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
    }

    // 2. Ejes X y Y principales
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 1.5;
    if (origenY >= 0 && origenY <= height) {
        ctx.beginPath();
        ctx.moveTo(0, origenY);
        ctx.lineTo(width, origenY);
        ctx.stroke();
    }
    if (origenX >= 0 && origenX <= width) {
        ctx.beginPath();
        ctx.moveTo(origenX, 0);
        ctx.lineTo(origenX, height);
        ctx.stroke();
    }

    // Etiquetas numéricas en los ejes
    ctx.fillStyle = '#333333';
    ctx.font = '11px Segoe UI, sans-serif';
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += pasoX) {
        if (x === 0) continue;
        const px = origenX + x * escalaX;
        ctx.fillText(x, px - 4, Math.min(height - 5, Math.max(12, origenY + 14)));
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += pasoY) {
        if (y === 0) continue;
        const py = origenY - y * escalaY;
        ctx.fillText(y, Math.min(width - 25, Math.max(5, origenX - 22)), py + 4);
    }

    // 3. Curva azul de la función f(x) o P(x)
    ctx.strokeStyle = '#1f77b4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let primerPunto = true;
    for (let px = 0; px <= width; px += 2) {
        const x = (px - origenX) / escalaX;
        const y = evalY(x);
        if (!isNaN(y) && isFinite(y)) {
            const py = origenY - y * escalaY;
            if (py >= -50 && py <= height + 50) {
                if (primerPunto) {
                    ctx.moveTo(px, py);
                    primerPunto = false;
                } else {
                    ctx.lineTo(px, py);
                }
            } else {
                primerPunto = true;
            }
        } else {
            primerPunto = true;
        }
    }
    ctx.stroke();

    // 4. Punto rojo en (xPunto, yObjetivo) + líneas punteadas si está fuera del eje X
    const pxPunto = origenX + xPunto * escalaX;
    const pyPunto = origenY - yObjetivo * escalaY;

    if (!esRaiz) {
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 1.5;

        // Línea vertical hacia el eje X
        ctx.beginPath();
        ctx.moveTo(pxPunto, pyPunto);
        ctx.lineTo(pxPunto, origenY);
        ctx.stroke();

        // Línea horizontal hacia el eje Y
        ctx.beginPath();
        ctx.moveTo(pxPunto, pyPunto);
        ctx.lineTo(origenX, pyPunto);
        ctx.stroke();
        ctx.restore();
    }

    // Círculo rojo
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(pxPunto, pyPunto, 5.5, 0, 2 * Math.PI);
    ctx.fill();

    // Etiqueta inteligente ("Raíz" vs "Punto interpolado")
    ctx.fillStyle = '#c0392b';
    ctx.font = 'bold 12px Segoe UI, sans-serif';
    const textoEtiqueta = esRaiz
        ? `Raíz: ${xPunto.toFixed(4)}`
        : `Punto: (${xPunto.toFixed(2)}, ${yObjetivo.toFixed(4)})`;
    ctx.fillText(textoEtiqueta, pxPunto + 10, pyPunto - 10);
}



// --- LÓGICA DE LA CALCULADORA LIBRE ---
const selectMetodo = document.getElementById('calcMetodo');
const labelInputA = document.getElementById('labelInputA');
const containerInputB = document.getElementById('containerInputB');

selectMetodo?.addEventListener('change', () => {
    const contenedorA = document.getElementById('calcInputA')?.parentElement || document.getElementById('inputA')?.parentElement;
    const contenedorB = document.getElementById('containerInputB');
    const contenedorTaylor = document.getElementById('containerGradoTaylor');
    const divLagrange = document.getElementById('campos-lagrange');
    const divSimpson = document.getElementById('campos-simpson');

    if (selectMetodo.value === 'biseccion') {
        labelInputA.innerText = "Intervalo A (Inferior):";
        if (contenedorA) contenedorA.style.display = 'block';
        if (contenedorB) contenedorB.style.display = 'block';
        if (contenedorTaylor) contenedorTaylor.style.display = 'none';
    } else if (selectMetodo.value === 'taylor') {
        labelInputA.innerText = "Centro de aproximación (a):";
        if (contenedorA) contenedorA.style.display = 'block';
        if (contenedorB) contenedorB.style.display = 'none';
        if (contenedorTaylor) contenedorTaylor.style.display = 'block';
    } else if (selectMetodo.value === 'lagrange' || selectMetodo.value === 'simpson13') {
        if (contenedorA) contenedorA.style.display = 'none';
        if (contenedorB) contenedorB.style.display = 'none';
        if (contenedorTaylor) contenedorTaylor.style.display = 'none';
    } else {
        labelInputA.innerText = "Valor Inicial (X0):";
        if (contenedorA) contenedorA.style.display = 'block';
        if (contenedorB) contenedorB.style.display = 'none';
        if (contenedorTaylor) contenedorTaylor.style.display = 'none';
    }

    if (divLagrange) divLagrange.style.display = (selectMetodo.value === 'lagrange') ? 'block' : 'none';
    if (divSimpson) divSimpson.style.display = (selectMetodo.value === 'simpson13') ? 'block' : 'none';
});



document.getElementById('btnCalcular')?.addEventListener('click', () => {
    const metodo = selectMetodo.value;
    const ecuacion = document.getElementById('inputFuncion').value;
    const a = parseFloat(document.getElementById('inputA').value);
    const b = parseFloat(document.getElementById('inputB').value);
    const tol = parseFloat(document.getElementById('inputTol').value);
    const maxIter = parseInt(document.getElementById('inputIter').value) || 50;
    const resultBox = document.getElementById('resultadoCalc');
    const inputGrado = document.getElementById('inputGradoTaylor');
    const gradoTaylor = inputGrado ? parseInt(inputGrado.value) || 3 : 3;

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
        res = ejecutarBiseccionMatematica(ecuacion, a, b, tol, maxIter);
        headers = ["Iteración (n)", "Punto Medio (c)", "f(c)", "Error Absoluto"];
    } else if (metodo === 'punto_fijo') {
        res = ejecutarPuntoFijoMatematico(ecuacion, a, tol, maxIter);
        headers = ["Iteración (n)", "x_n", "g(x_n)", "Error Absoluto"];
    } else if (metodo === 'newton') {
        res = ejecutarNewtonMatematico(ecuacion, a, tol, maxIter);
        headers = ["Iteración (n)", "x_n", "f(x_n)", "Error Absoluto"];
    }else if (metodo === 'taylor') {
        const resTaylor = ejecutarTaylorMatematico(ecuacion, a, gradoTaylor);
        let tabla = `<table class="tabla-pasos"><thead><tr><th>Grado (n)</th><th>Derivada f^(n)(a)</th><th>Coeficiente c_n</th></tr></thead><tbody>`;
        resTaylor.historial.forEach(p => {
            tabla += `<tr><td style="font-weight:bold;">${p.i}</td><td>${p.valorDerivada.toFixed(5)}</td><td>${p.coef.toFixed(5)}</td></tr>`;
        });
        tabla += `</tbody></table>`;
        
        resultBox.innerHTML = tabla + `<div class="alerta-final" style="font-size:0.85rem; word-break: break-all;"><strong>Polinomio aproximado:</strong> P(x) = ${resTaylor.polinomioEcuacion}</div>`;
        const boxGrafico = document.getElementById('contenedorGrafico');
        if (boxGrafico) {
            boxGrafico.style.display = 'block';
            graficarFuncionEnCanvas(resTaylor.polinomioEcuacion, a, 'graficoCanvas');
        }

        
        // 🛑 NUEVA LÍNEA: EL FRENO DE MANO PARA TAYLOR
        return; 
        } else if (metodo === 'lagrange') {
        const ptsX = document.getElementById('calc-ptsX').value.split(',').map(Number);
        const ptsY = document.getElementById('calc-ptsY').value.split(',').map(Number);
        const xBuscar = parseFloat(document.getElementById('calc-xBuscar').value);

        if (ptsX.length !== ptsY.length || ptsX.some(isNaN) || ptsY.some(isNaN) || isNaN(xBuscar)) {
            resultBox.style.display = 'block';
            resultBox.innerHTML = `<p class="text-danger"><strong>Error:</strong> Ingresa la misma cantidad de puntos X y Y separados por coma (ej: 1, 2, 4).</p>`;
            return;
        }

        const resLag = ejecutarLagrangeMatematico(ptsX, ptsY, xBuscar);
        let tabla = `<table class="tabla-pasos"><thead><tr><th>i</th><th>x<sub>i</sub></th><th>y<sub>i</sub></th><th>L<sub>i</sub>(${xBuscar})</th><th>y<sub>i</sub> · L<sub>i</sub></th></tr></thead><tbody>`;
        resLag.historial.forEach(p => {
            tabla += `<tr><td>${p.i}</td><td>${p.x}</td><td>${p.y}</td><td>${p.li.toFixed(6)}</td><td>${p.aporte.toFixed(6)}</td></tr>`;
        });
        tabla += `</tbody></table>`;

        resultBox.style.display = 'block';
        resultBox.innerHTML = tabla + `<div class="alerta-final"><strong>Resultado Interpolado P(${xBuscar}):</strong> ${resLag.resultado.toFixed(6)}</div>`;

        const boxGrafico = document.getElementById('contenedorGrafico');
        if (boxGrafico) {
            boxGrafico.style.display = 'block';
            graficarFuncionEnCanvas(resLag.polinomioEcuacion, xBuscar, 'graficoCanvas');
        }
        return;

    } else if (metodo === 'simpson13') {
        const aSimp = parseFloat(document.getElementById('calc-simp-a').value);
        const bSimp = parseFloat(document.getElementById('calc-simp-b').value);
        const nSimp = parseInt(document.getElementById('calc-simp-n').value);

        if (isNaN(aSimp) || isNaN(bSimp) || isNaN(nSimp) || nSimp <= 0 || nSimp % 2 !== 0) {
            resultBox.style.display = 'block';
            resultBox.innerHTML = `<p class="text-danger"><strong>Error:</strong> En Simpson 1/3 el número de subintervalos (n) debe ser entero positivo y PAR (ej: 2, 4, 6, 8).</p>`;
            return;
        }

        const resSimp = ejecutarSimpson13Matematico(ecuacion, aSimp, bSimp, nSimp);
        let tabla = `<p><strong>Ancho de paso (h):</strong> ${resSimp.h.toFixed(6)}</p><table class="tabla-pasos"><thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>Coef.</th><th>Coef · f(x<sub>i</sub>)</th></tr></thead><tbody>`;
        resSimp.historial.forEach(p => {
            tabla += `<tr><td>${p.i}</td><td>${p.x.toFixed(4)}</td><td>${p.fx.toFixed(6)}</td><td>${p.coef}</td><td>${p.termino.toFixed(6)}</td></tr>`;
        });
        tabla += `</tbody></table>`;

        resultBox.style.display = 'block';
        resultBox.innerHTML = tabla + `<div class="alerta-final"><strong>Integral Aproximada I:</strong> ${resSimp.integral.toFixed(6)}</div>`;

        const boxGrafico = document.getElementById('contenedorGrafico');
        if (boxGrafico) {
            boxGrafico.style.display = 'block';
            graficarFuncionEnCanvas(ecuacion, (aSimp + bSimp) / 2, 'graficoCanvas');
        }
        return;
    }

    
    
    if (res.errorIntervalo) {
        resultBox.innerHTML = `<p class="text-danger"><strong>Error de Intervalo:</strong> f(a) y f(b) deben tener signos opuestos en bisección.</p>`;
    } else if (res.errorDerivada) {
        resultBox.innerHTML = `<p class="text-danger"><strong>Error Numérico:</strong> La derivada se hizo cero.</p>`;
        } else {
            resultBox.innerHTML = generarTablaHTML(res.historial, tol, headers) + 
                `<div class="alerta-final"><strong>Raíz aproximada:</strong> ${res.raiz.toFixed(6)} encontrado en ${res.iteraciones} iteraciones.</div>`;
            
            // CONEXIÓN CON EL CANVAS GRÁFICO
            const boxGrafico = document.getElementById('contenedorGrafico');
            if (boxGrafico) {
                boxGrafico.style.display = 'block';
                let ecGrafica = ecuacion;
                if (metodo === 'punto_fijo') {
                    ecGrafica = `${ecuacion} - x`; // Ajuste g(x) - x = 0
                }
                graficarFuncionEnCanvas(ecGrafica, res.raiz);
            }
        }
    resultBox.style.display = 'block';
});

// --- RENDERIZACIÓN AUTOMÁTICA DE TRABAJOS DE CLASE ---
const bloquesEjercicios = document.querySelectorAll('.ejercicio-automatico');

function cargarTareasDesdeArchivo() {
    const contenedorLista = document.getElementById('contenedorListaTareas');
    if (!contenedorLista) return;

    const tareasAMapear = typeof LISTA_TAREAS !== 'undefined' ? LISTA_TAREAS : [];
    contenedorLista.innerHTML = "";

    tareasAMapear.forEach(tarea => {
        const divTarea = document.createElement('div');
        divTarea.className = 'ejercicio-box';
        divTarea.style.marginBottom = '1.5rem';

        divTarea.innerHTML = `
            <h3>${tarea.nombre} <span style="font-size:0.85rem; color:#ffffff; background:#3498db; padding:2px 6px; border-radius:4px;">${tarea.metodo.toUpperCase()}</span></h3>
            <p><strong>Función Base:</strong> <code>${tarea.ecuacion}</code></p>
            <p id="detalles-tarea-${tarea.id}"></p>
            <button class="btn-ejercicio" id="btn-tarea-${tarea.id}">Resolver Trabajo</button>
            <div id="resultado-ejercicio-${tarea.id}" class="tabla-contenedor"></div>
        `;

        contenedorLista.appendChild(divTarea);

        const pDetalles = document.getElementById(`detalles-tarea-${tarea.id}`);
               if (pDetalles) {
            if (tarea.metodo === 'taylor') {
                pDetalles.innerHTML = `<strong>Configuración:</strong> Centro (a) = ${tarea.centro} | Grado (n) = ${tarea.grado}`;
            } else if (tarea.metodo === 'lagrange') {
                pDetalles.innerHTML = `<strong>Puntos X:</strong> [${tarea.ptsX.join(', ')}] | <strong>Evaluar en x =</strong> ${tarea.xBuscar}`;
            } else if (tarea.metodo === 'simpson13') {
                pDetalles.innerHTML = `<strong>Configuración:</strong> Intervalo [${tarea.a}, ${tarea.b}] | Subintervalos (n) = ${tarea.n}`;
            } else {
                pDetalles.innerHTML = `<strong>Configuración:</strong> X0/A = ${tarea.a} ${tarea.b ? '| B = ' + tarea.b : ''} | Tol = ${tarea.tol}`;
            }
        }

        const contenedorRes = document.getElementById(`resultado-ejercicio-${tarea.id}`);


        const botonResolver = document.getElementById(`btn-tarea-${tarea.id}`);
        if (botonResolver) {
        botonResolver.addEventListener('click', () => {
            try {
                if (tarea.metodo === 'taylor') {
                    const resTaylor = ejecutarTaylorMatematico(tarea.ecuacion, tarea.centro, tarea.grado);
                    let tabla = `<table class="tabla-pasos"><thead><tr><th>Grado (n)</th><th>Derivada f^(n)(a)</th><th>Coeficiente c_n</th></tr></thead><tbody>`;
                    resTaylor.historial.forEach(p => {
                        tabla += `<tr><td style="font-weight:bold;">${p.i}</td><td>${p.valorDerivada.toFixed(5)}</td><td>${p.coef.toFixed(5)}</td></tr>`;
                    });
                    tabla += `</tbody></table>`;
                    contenedorRes.innerHTML = tabla + `<div class="alerta-final" style="font-size:0.85rem; word-break: break-all;"><strong>Polinomio aproximado:</strong><br>P(x) = ${resTaylor.polinomioEcuacion}</div>`;
                    renderizarGraficaTarea(resTaylor.polinomioEcuacion, tarea.centro);

                } else if (tarea.metodo === 'lagrange') {
                    const resLag = ejecutarLagrangeMatematico(tarea.ptsX, tarea.ptsY, tarea.xBuscar);
                    let tabla = `<table class="tabla-pasos"><thead><tr><th>i</th><th>x<sub>i</sub></th><th>y<sub>i</sub></th><th>L<sub>i</sub>(${tarea.xBuscar})</th><th>y<sub>i</sub> · L<sub>i</sub></th></tr></thead><tbody>`;
                    resLag.historial.forEach(p => {
                        tabla += `<tr><td>${p.i}</td><td>${p.x}</td><td>${p.y}</td><td>${p.li.toFixed(6)}</td><td>${p.aporte.toFixed(6)}</td></tr>`;
                    });
                    tabla += `</tbody></table>`;
                    contenedorRes.innerHTML = tabla + `<div class="alerta-final"><strong>Resultado Interpolado P(${tarea.xBuscar}):</strong> ${resLag.resultado.toFixed(6)}</div>`;
                    renderizarGraficaTarea(resLag.polinomioEcuacion, tarea.xBuscar);

                } else if (tarea.metodo === 'simpson13') {
                    const resSimp = ejecutarSimpson13Matematico(tarea.ecuacion, tarea.a, tarea.b, tarea.n);
                    let tabla = `<p><strong>Ancho de paso (h):</strong> ${resSimp.h.toFixed(6)}</p><table class="tabla-pasos"><thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>Coef.</th><th>Coef · f(x<sub>i</sub>)</th></tr></thead><tbody>`;
                    resSimp.historial.forEach(p => {
                        tabla += `<tr><td>${p.i}</td><td>${p.x.toFixed(4)}</td><td>${p.fx.toFixed(6)}</td><td>${p.coef}</td><td>${p.termino.toFixed(6)}</td></tr>`;
                    });
                    tabla += `</tbody></table>`;
                    contenedorRes.innerHTML = tabla + `<div class="alerta-final"><strong>Integral Aproximada I:</strong> ${resSimp.integral.toFixed(6)}</div>`;
                    renderizarGraficaTarea(tarea.ecuacion, (tarea.a + tarea.b) / 2);

                } else {
                    let resRaiz;
                    let headers = [];
                    if (tarea.metodo === 'biseccion') {
                        resRaiz = ejecutarBiseccionMatematica(tarea.ecuacion, tarea.a, tarea.b, tarea.tol, tarea.maxIter);
                        headers = ["Iteración (n)", "Punto Medio (c)", "f(c)", "Error Absoluto"];
                    } else if (tarea.metodo === 'punto_fijo') {
                        resRaiz = ejecutarPuntoFijoMatematico(tarea.ecuacion, tarea.a, tarea.tol, tarea.maxIter);
                        headers = ["Iteración (n)", "x_n", "g(x_n)", "Error Absoluto"];
                    } else if (tarea.metodo === 'newton') {
                        resRaiz = ejecutarNewtonMatematico(tarea.ecuacion, tarea.a, tarea.tol, tarea.maxIter);
                        headers = ["Iteración (n)", "x_n", "f(x_n)", "Error Absoluto"];
                    }

                    if (resRaiz && (resRaiz.errorIntervalo || resRaiz.errorDerivada)) {
                        contenedorRes.innerHTML = `<p class="text-danger">Error al ejecutar el método numérico.</p>`;
                    } else if (resRaiz) {
                        contenedorRes.innerHTML = generarTablaHTML(resRaiz.historial, tarea.tol, headers) +
                            `<div class="alerta-final"><strong>Resultado:</strong> Raíz aproximada ${resRaiz.raiz.toFixed(6)}</div>`;
                        let ecGrafica = tarea.ecuacion;
                        if (tarea.metodo === 'punto_fijo') ecGrafica = `${tarea.ecuacion} - x`;
                        renderizarGraficaTarea(ecGrafica, resRaiz.raiz);
                    }
                }
            } catch (err) {
                console.error("Detalle del error:", err);
                contenedorRes.innerHTML = `<p class="text-danger">Error: ${err.message}</p>`;
            }
        });

        }
    });
}

function renderizarGraficaTarea(ecuacion, puntoMarcado) {
    const boxGrafico = document.getElementById('contenedorGraficoTarea');
    if (boxGrafico) {
        boxGrafico.style.display = 'block';
        setTimeout(() => {
            graficarFuncionEnCanvas(ecuacion, puntoMarcado, 'graficoCanvasTarea');
            boxGrafico.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}
function inicializarModuloTareas() {
    console.log("=== INICIANDO MÓDULO DE TRABAJOS DE CLASE ===");
    
    const contenedor = document.getElementById('contenedorListaTareas');
    if (!contenedor) {
        console.warn("⚠️ ALERTA: No se encontró 'contenedorListaTareas' en el HTML.");
        return;
    }

    if (typeof LISTA_TAREAS === 'undefined') {
        console.error("❌ ERROR CRÍTICO: La variable 'LISTA_TAREAS' no existe en memoria.");
        return;
    }

    console.log(`✅ ÉXITO: Detectadas ${LISTA_TAREAS.length} tareas listas.`);
    cargarTareasDesdeArchivo();
}

// Escuchamos al navegador para arrancar en el momento exacto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarModuloTareas);
} else {
    inicializarModuloTareas();
}
// EJECUCIÓN DIRECTA E INMEDIATA EN MEMORIA AL LEER EL SCRIPT
cargarTareasDesdeArchivo();