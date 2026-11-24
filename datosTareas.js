// =========================================================================
// BASE DE DATOS MAESTRA DE TRABAJOS DE CLASE (84 EJERCICIOS: ID 0 AL 83)
// =========================================================================
var LISTA_TAREAS = [
    // =========================================================================
    // BLOQUE 1: BISECCIÓN, PUNTO FIJO Y NEWTON INICIALES (Tareas 0 a 17)
    // =========================================================================
    { id: 0, nombre: "Tarea 0:", metodo: "biseccion", ecuacion: "x^2 - x - 1", a: 0, b: 2, tol: 0.008, maxIter: 25 },
    { id: 1, nombre: "Tarea 1:", metodo: "biseccion", ecuacion: "x^2 - 5", a: 0, b: 3, tol: 0.0625, maxIter: 25 },
    { id: 2, nombre: "Tarea 2:", metodo: "biseccion", ecuacion: "cos(0.5 * e^(-x)) + x^2 - 2", a: -1.9, b: -1.7, tol: 0.007, maxIter: 30 },
    { id: 3, nombre: "Tarea 3:", metodo: "biseccion", ecuacion: "e^(3*x) - 4", a: 0, b: 1, tol: 0.001, maxIter: 25 },
    { id: 4, nombre: "Tarea 4:", metodo: "biseccion", ecuacion: "x^2 - 78.8", a: 6, b: 12, tol: 0.001, maxIter: 25 },
    { id: 5, nombre: "Tarea 5:", metodo: "biseccion", ecuacion: "x*e^(x)-2", a: 0, b: 2, tol: 0.001, maxIter: 25 },
    { id: 6, nombre: "Tarea 6:", metodo: "biseccion", ecuacion: "e^(-x) - x", a: 0, b: 35, tol: 0.00000000000000000001, maxIter: 20 },
    { id: 7, nombre: "Tarea 7:", metodo: "biseccion", ecuacion: "x*e^(x)-2", a: 0, b: 2, tol: 0.001, maxIter: 15 },
    { id: 8, nombre: "Tarea 8:", metodo: "biseccion", ecuacion: "2*x^(2) - x - 5", a: 0, b: 3, tol: 0.001, maxIter: 15 },
    { id: 9, nombre: "Tarea 9:", metodo: "biseccion", ecuacion: "x^(2) - 1.5*x + 0.5", a: 0.375, b: 0.75, tol: 0.001, maxIter: 15 },
    { id: 10, nombre: "Tarea 10:", metodo: "biseccion", ecuacion: "-x^(2) - 1.8*x + 2.5", a: -1, b: 1, tol: 0.005, maxIter: 15 },
    { id: 11, nombre: "Tarea 11:", metodo: "punto_fijo", ecuacion: "(2*e^2)/5", a: 0, tol: 0.001, maxIter: 15 },
    { id: 12, nombre: "Tarea 12:", metodo: "punto_fijo", ecuacion: "e^(-x)", a: 0, tol: 0.001, maxIter: 15 },
    { id: 13, nombre: "Tarea 13:", metodo: "punto_fijo", ecuacion: "sin(x^(1/2))", a: 0.5, tol: 0.001, maxIter: 15 },
    { id: 14, nombre: "Tarea 14:", metodo: "punto_fijo", ecuacion: "(x^3-5)/10", a: 1.5, tol: 0.001, maxIter: 20 },
    { id: 15, nombre: "Tarea 15:", metodo: "punto_fijo", ecuacion: "2/(e^x)", a: 2, tol: 0.001, maxIter: 30 },
    { id: 16, nombre: "Tarea 16:", metodo: "punto_fijo", ecuacion: "sqrt((x+5)/2)", a: 2, tol: 0.000001, maxIter: 30 },
    { id: 17, nombre: "Tarea 17:", metodo: "newton", ecuacion: "sqrt(10/(x+4))", a: 1, tol: 0.000001, maxIter: 30 },

    // =========================================================================
    // BLOQUE 2: NEWTON-RAPHSON AVANZADOS (Tareas 18 a 22)
    // =========================================================================
    { id: 18, nombre: "Tarea 18 (Newton Raíz 1):", metodo: "newton", ecuacion: "(x - 2)^3 * (x + 1)", a: 2.5, tol: 0.000001, maxIter: 40 },
    { id: 19, nombre: "Tarea 19 (Newton Raíz 2):", metodo: "newton", ecuacion: "(x - 2)^3 * (x + 1)", a: -1.5, tol: 0.000001, maxIter: 40 },
    { id: 20, nombre: "Tarea 20 (Newton Intervalo):", metodo: "newton", ecuacion: "e^x - 3*x^2", a: 1, tol: 0.00001, maxIter: 30 },
    { id: 21, nombre: "Tarea 21 (Newton Intervalo):", metodo: "newton", ecuacion: "e^x - 3*x^2", a: 4, tol: 0.00001, maxIter: 30 },
    { id: 22, nombre: "Tarea 22 (Newton Tanh):", metodo: "newton", ecuacion: "(e^(2*(x^2 - 9)) - 1) / (e^(2*(x^2 - 9)) + 1)", a: 3.2, tol: 0.0001, maxIter: 20 },

    // =========================================================================
    // BLOQUE 3: SERIE DE TAYLOR (Tareas 23 a 38)
    // =========================================================================
    { id: 23, nombre: "Tarea 23 (Taylor Ejemplo Orden 3):", metodo: "taylor", ecuacion: "-0.1*x^4 - 0.15*x^3 - 0.5*x^2 - 0.25*x + 1.2", centro: 0, grado: 3 },
    { id: 24, nombre: "Tarea 24 (Taylor Ej. 1 - e^1.2):", metodo: "taylor", ecuacion: "e^x", centro: 1, grado: 3 },
    { id: 25, nombre: "Tarea 25 (Taylor Ej. 2 - ln(1.5)):", metodo: "taylor", ecuacion: "ln(x)", centro: 1, grado: 4 },
    { id: 26, nombre: "Tarea 26 (Taylor Ej. 3 - sin(pi/3)):", metodo: "taylor", ecuacion: "sin(x)", centro: 0.7854, grado: 5 },
    { id: 27, nombre: "Tarea 27 (Taylor Ej. 4 - ln(3)):", metodo: "taylor", ecuacion: "ln(x)", centro: 2, grado: 6 },
    { id: 28, nombre: "Tarea 28 (Taylor Ej. 5 - 1/2.4):", metodo: "taylor", ecuacion: "1/x", centro: 2, grado: 4 },
    { id: 29, nombre: "Tarea 29 (Taylor Ej. 6 - ln(2.5)):", metodo: "taylor", ecuacion: "ln(x + 1)", centro: 1, grado: 4 },
    { id: 30, nombre: "Tarea 30 (Taylor Ej. 7 - e^1.21):", metodo: "taylor", ecuacion: "e^(x^2)", centro: 1, grado: 4 },
    { id: 31, nombre: "Tarea 31 (Taylor Ej. 8 - sin(2pi/5)):", metodo: "taylor", ecuacion: "sin(2*x)", centro: 0.5236, grado: 5 },
    { id: 32, nombre: "Tarea 32 (Taylor Ej. 9 - ln(3.5)):", metodo: "taylor", ecuacion: "ln(x)", centro: 2, grado: 6 },
    { id: 33, nombre: "Tarea 33 (Taylor - 1/2.3^2):", metodo: "taylor", ecuacion: "1/(x^2)", centro: 2, grado: 4 },
    { id: 34, nombre: "Tarea 34 (Taylor - ln(2.6)):", metodo: "taylor", ecuacion: "ln(x)", centro: 2, grado: 5 },
    { id: 35, nombre: "Tarea 35 (Taylor - sqrt(4.5)):", metodo: "taylor", ecuacion: "sqrt(x + 1)", centro: 3, grado: 4 },
    { id: 36, nombre: "Tarea 36 (Taylor - e^2.4):", metodo: "taylor", ecuacion: "e^(2*x)", centro: 1, grado: 5 },
    { id: 37, nombre: "Tarea 37 (Taylor - cos(3pi/5)):", metodo: "taylor", ecuacion: "cos(2*x)", centro: 0.7854, grado: 5 },
    { id: 38, nombre: "Tarea 38 (Taylor - 1/(1+1.2^2)):", metodo: "taylor", ecuacion: "1/(1 + x^2)", centro: 1, grado: 4 },

    // =========================================================================
    // BLOQUE 4: INTERPOLACIÓN LINEAL Y POLINOMIAL DE LAGRANGE (Tareas 39 a 46)
    // =========================================================================
    { id: 39, nombre: "Tarea 39 (Lagrange Lineal - f(2.8)):", metodo: "lagrange", ecuacion: "Puntos dados", ptsX: [1.5, 3.5], ptsY: [4.8, 12.4], xBuscar: 2.8 },
    { id: 40, nombre: "Tarea 40 (Lagrange Lineal - ln(2.4)):", metodo: "lagrange", ecuacion: "ln(x)", ptsX: [2.0, 3.0], ptsY: [0.693147, 1.098612], xBuscar: 2.4 },
    { id: 41, nombre: "Tarea 41 (Lagrange Lineal - e^0.7 Caso A):", metodo: "lagrange", ecuacion: "e^x", ptsX: [0.5, 1.0], ptsY: [1.648721, 2.718282], xBuscar: 0.7 },
    { id: 42, nombre: "Tarea 42 (Lagrange Lineal - e^0.7 Caso B):", metodo: "lagrange", ecuacion: "e^x", ptsX: [0.6, 0.8], ptsY: [1.822119, 2.225541], xBuscar: 0.7 },
    { id: 43, nombre: "Tarea 43 (Lagrange Grado 2 - f(3)):", metodo: "lagrange", ecuacion: "Puntos dados", ptsX: [1.0, 2.0, 4.0], ptsY: [2.0, 3.0, 11.0], xBuscar: 3 },
    { id: 44, nombre: "Tarea 44 (Lagrange Grado 2 - f(2)):", metodo: "lagrange", ecuacion: "Puntos dados", ptsX: [0.0, 1.0, 3.0], ptsY: [1.0, 3.0, 13.0], xBuscar: 2 },
    { id: 45, nombre: "Tarea 45 (Lagrange Grado 3 - f(1.5)):", metodo: "lagrange", ecuacion: "Puntos dados", ptsX: [0.0, 1.0, 2.0, 3.0], ptsY: [1.0, 2.0, 11.0, 34.0], xBuscar: 1.5 },
    { id: 46, nombre: "Tarea 46 (Lagrange Grado 3 - f(3)):", metodo: "lagrange", ecuacion: "Puntos dados", ptsX: [1.0, 2.0, 4.0, 5.0], ptsY: [2.0, 4.0, 14.0, 22.0], xBuscar: 3 },


    // =========================================================================
    // BLOQUE 5: BISECCIÓN EXTRA Y APLICACIONES DE INGENIERÍA (Tareas 47 a 50)
    // =========================================================================
    { id: 47, nombre: "Tarea 47 (Bisección - 4x^2 - 5x):", metodo: "biseccion", ecuacion: "4*x^2 - 5*x", a: 1, b: 1.6, tol: 0.0001, maxIter: 8 },
    { id: 48, nombre: "Tarea 48 (Bisección - x^4 + 3x^3 - 2):", metodo: "biseccion", ecuacion: "x^4 + 3*x^3 - 2", a: 0, b: 1, tol: 0.01, maxIter: 25 },
    { id: 49, nombre: "Tarea 49 (Aplicación Paracaidista):", metodo: "biseccion", ecuacion: "((9.81 * 68.1) / x) * (1 - e^(-(x / 68.1) * 10)) - 40", a: 10, b: 15, tol: 0.01, maxIter: 25 },
    { id: 50, nombre: "Tarea 50 (Aplicación Canal Manning):", metodo: "biseccion", ecuacion: "((sqrt(0.0002) * (15 * x)^(5/3)) / (0.04 * (15 + 2*x)^(2/3))) - 60", a: 0.1, b: 20, tol: 0.001, maxIter: 30 },

    // =========================================================================
    // BLOQUE 6: NEWTON-RAPHSON COMPLETO DE CLASE (Tareas 51 a 70)
    // =========================================================================
    { id: 51, nombre: "Tarea 51 (Newton - x^5 - x - 1):", metodo: "newton", ecuacion: "x^5 - x - 1", a: 1.2, tol: 0.00000001, maxIter: 25 },
    { id: 52, nombre: "Tarea 52 (Newton - cos(x) - 3e^x):", metodo: "newton", ecuacion: "cos(x) - 3*e^x", a: -4, tol: 0.00001, maxIter: 25 },
    { id: 53, nombre: "Tarea 53 (Newton - Polinomio Ej. 7):", metodo: "newton", ecuacion: "3.1230*x^3 + 3.5980*x^2 + 0.0593*x - 0.0896", a: 0.0666, tol: 0.00001, maxIter: 25 },
    { id: 54, nombre: "Tarea 54 (Newton - x^x - 100):", metodo: "newton", ecuacion: "x^x - 100", a: 3.5, tol: 0.0000000001, maxIter: 30 },
    { id: 55, nombre: "Tarea 55 (Newton - e^(-x) - x):", metodo: "newton", ecuacion: "e^(-x) - x", a: 0, tol: 0.001, maxIter: 20 },
    { id: 56, nombre: "Tarea 56 (Newton - 2cos(x) - e^x):", metodo: "newton", ecuacion: "2*cos(x) - e^x", a: 0.785, tol: 0.00001, maxIter: 25 },
    { id: 57, nombre: "Tarea 57 (Newton - x^3 - 2x - 5):", metodo: "newton", ecuacion: "x^3 - 2*x - 5", a: 2, tol: 0.00001, maxIter: 20 },
    { id: 58, nombre: "Tarea 58 (Newton - sin(sqrt(x))):", metodo: "newton", ecuacion: "sin(sqrt(x))", a: 0.5, tol: 0.00001, maxIter: 25 },
    { id: 59, nombre: "Tarea 59 (Newton - 2sin(sqrt(x)) - x):", metodo: "newton", ecuacion: "2*sin(sqrt(x)) - x", a: 0.5, tol: 0.00001, maxIter: 25 },
    { id: 60, nombre: "Tarea 60 (Newton - x^3 - 10x - 5):", metodo: "newton", ecuacion: "x^3 - 10*x - 5", a: 0.5, tol: 0.0001, maxIter: 25 },
  // =========================================================================
    // BLOQUE 7: ÚLTIMOS EJERCICIOS DE NEWTON-RAPHSON (Tareas 61 a 70)
    // =========================================================================
    { id: 61, nombre: "Tarea 61 (Newton - sqrt(5)):", metodo: "newton", ecuacion: "x^2 - 5", a: 4, tol: 0.0001, maxIter: 20 },
    { id: 62, nombre: "Tarea 62 (Newton - x^3 - x - 1):", metodo: "newton", ecuacion: "x^3 - x - 1", a: 1, tol: 0.00001, maxIter: 20 },
    { id: 63, nombre: "Tarea 63 (Newton - x^3 - 6x, x0=5):", metodo: "newton", ecuacion: "x^3 - 6*x", a: 5, tol: 0.00001, maxIter: 25 },
    { id: 64, nombre: "Tarea 64 (Newton - x^3 - 6x, x0=-5):", metodo: "newton", ecuacion: "x^3 - 6*x", a: -5, tol: 0.00001, maxIter: 25 },
    { id: 65, nombre: "Tarea 65 (Newton - x^3 - 6x, x0=1):", metodo: "newton", ecuacion: "x^3 - 6*x", a: 1, tol: 0.00001, maxIter: 25 },
    { id: 66, nombre: "Tarea 66 (Newton - cos(pi*x)):", metodo: "newton", ecuacion: "cos(3.14159265 * x)", a: 0.3, tol: 0.00001, maxIter: 25 },
    { id: 67, nombre: "Tarea 67 (Newton - Polinomio Grado 5):", metodo: "newton", ecuacion: "x^5 - x^4 + 2*x^3 - 3*x^2 + x - 4", a: 1.5, tol: 0.000001, maxIter: 25 },
    { id: 68, nombre: "Tarea 68 (Newton - Raíz en):", metodo: "newton", ecuacion: "2*x*cos(2*x) - (x - 2)^2", a: 2.5, tol: 0.000001, maxIter: 25 },
    { id: 69, nombre: "Tarea 69 (Newton - Raíz en):", metodo: "newton", ecuacion: "2*x*cos(2*x) - (x - 2)^2", a: 3.5, tol: 0.000001, maxIter: 25 },
    { id: 70, nombre: "Tarea 70 (Newton - ln(x^2+1) - e^0.4x·cos):", metodo: "newton", ecuacion: "ln(x^2 + 1) - e^(0.4*x)*cos(3.14159265 * x)", a: -0.4, tol: 0.00001, maxIter: 25 },

    // =========================================================================
    // BLOQUE 8: INTEGRACIÓN NUMÉRICA - SIMPSON 1/3 (Tareas 71 a 83)
    // =========================================================================
    { id: 71, nombre: "Tarea 71 (Simpson 1/3 - S2 Ej. 1):", metodo: "simpson13", ecuacion: "x^4 + 3*x^2 + 2", a: 0, b: 2, n: 4 },
    { id: 72, nombre: "Tarea 72 (Simpson 1/3 - S2 Ej. 2):", metodo: "simpson13", ecuacion: "e^(-x) * cos(x)", a: 0, b: 1.570796, n: 6 },
    { id: 73, nombre: "Tarea 73 (Simpson 1/3 - S2 Ej. 3 n=8):", metodo: "simpson13", ecuacion: "ln(x) / (x^2 + 1)", a: 1, b: 3, n: 8 },
    { id: 74, nombre: "Tarea 74 (Simpson 1/3 - S2 Ej. 3 n=16):", metodo: "simpson13", ecuacion: "ln(x) / (x^2 + 1)", a: 1, b: 3, n: 16 },
    { id: 75, nombre: "Tarea 75 (Simpson 1/3 - S2 Ej. 4 Vehículo n=10):", metodo: "simpson13", ecuacion: "5 + 2*x^2 * e^(-0.2*x)", a: 0, b: 10, n: 10 },
    { id: 76, nombre: "Tarea 76 (Simpson 1/3 - S2 Ej. 4 Vehículo n=20):", metodo: "simpson13", ecuacion: "5 + 2*x^2 * e^(-0.2*x)", a: 0, b: 10, n: 20 },
    { id: 77, nombre: "Tarea 77 (Simpson 1/3 - S2 Ej. 5 Gaussiana):", metodo: "simpson13", ecuacion: "e^(-x^2)", a: 0, b: 2, n: 16 },
    { id: 78, nombre: "Tarea 78 (Simpson 1/3 - S3 Ej. 1):", metodo: "simpson13", ecuacion: "x^4 - 2*x^2 + 5", a: 0, b: 3, n: 6 },
    { id: 79, nombre: "Tarea 79 (Simpson 1/3 - S3 Ej. 2):", metodo: "simpson13", ecuacion: "sin(x) * e^(-x/2)", a: 0, b: 3.141593, n: 8 },
    { id: 80, nombre: "Tarea 80 (Simpson 1/3 - S3 Ej. 3 n=6):", metodo: "simpson13", ecuacion: "(x^2 + 1) / (x^3 + 2)", a: 1, b: 4, n: 6 },
    { id: 81, nombre: "Tarea 81 (Simpson 1/3 - S3 Ej. 3 n=12):", metodo: "simpson13", ecuacion: "(x^2 + 1) / (x^3 + 2)", a: 1, b: 4, n: 12 },
    { id: 82, nombre: "Tarea 82 (Simpson 1/3 - S3 Ej. 4 Energía):", metodo: "simpson13", ecuacion: "120 + 30*sin(3.14159265 * x / 6) + 5*x^2", a: 0, b: 6, n: 12 },
    { id: 83, nombre: "Tarea 83 (Simpson 1/3 - S3 Ej. 5 Convergencia):", metodo: "simpson13", ecuacion: "e^(-x^2) / (1 + x^2)", a: 0, b: 2, n: 32 },
];