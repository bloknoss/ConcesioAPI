# ConcesioAPI

ConcesioAPI es una REST API creada en NodeJS mediante Express que tiene como objetivo el proporcionar unos endpoints para poder modificar / acceder datos sobre distintos concesionarios y sus respectivos coches de manera cómoda y sencilla.

## Instalación

Usa el gestor de paquetes de node [npm](https://www.npmjs.com/) para instalar las dependencias.

```bash
git clone https://github.com/bloknoss/ConcesioAPI.git
cd ./ConcesioAPI
npm i
```

## Guía de Uso

Una vez dentro del directorio del repositorio, y habiendo seguido la guia de instalación, realizamos el siguiente comando:

```bash
npm start
```

Con esto se debería de iniciar el servidor, y para realizar una llamada a la API, podemos ejecutar el comando [curl](https://curl.se/docs/) en la terminal para comprobar que funciona corretamente (Ajustar el comando según los cambios que hayas realizado):

**Entrada:**

```bash
curl -X GET http://localhost:8080/concesionarios
```

**Salida:**

![image](https://i.imgur.com/YVzFlDg.png)

Se puede apreciar que el comando curl nos ha devuelto un texto en formato JSON con los concesionarios, en lugar de un error, con esto se demostraría que funciona correctamente.

> **_NOTA:_** También se podría utilizar [Postman](https://www.postman.com/), tanto su versión CLI como su GUI, y sería igualmente válido.

## Endpoints - Configuración

Por defecto, la ruta base o la IP donde estará el servidor de forma local será localhost, o [http://localhost](http://localhost/), a través de esto accederemos a los distintos endpoints de nuestra aplicación.
Estos endpoints están divididos entre las dos secciones que puedes acceder, los concesionarios y los coches, los coches pertenecen a los concesionarios, se deberá acceder a los coches mediante la id del concesionario.
Los endpoints estarán documentados abajo.

## API Endpoints - Concesinarios

1. **Obtener todos los concesionarios:**
    <details>
     <summary><code>GET</code> <code><b>/concesionarios/</b></code></summary>

    ##### Parametros

    > Ninguno

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta                               |
    > | ----------- | ------------------ | --------------------------------------- |
    > | `200`       | `application/json` | Lista de concesionarios en formato JSON |
    > | `500`       | `application/json` | Error interno del servidor              |

    ##### Ejemplo cURL

    > ```bash
    > curl -X GET http://localhost:8080/concesionarios/
    > ```

    </details>

2. **Añadir un nuevo concesionario:**
    <details>
     <summary><code>POST</code> <code><b>/concesionarios/</b></code></summary>

    ##### Parametros

    > | Nombre | Tipo      | Tipo de dato         | Descripción                                   |
    > | ------ | --------- | -------------------- | --------------------------------------------- |
    > | body   | requerido | objeto (JSON o YAML) | Datos del nuevo concesionario en formato JSON |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta                  |
    > | ----------- | ------------------ | -------------------------- |
    > | `200`       | `application/json` | `{"message":"ok"}`         |
    > | `500`       | `application/json` | Error interno del servidor |

    ##### Ejemplo cURL

    > ```bash
    > curl -X POST -H "Content-Type: application/json" --data @nuevo_concesionario.json http://localhost:8080/concesionarios/
    > ```

    </details>

3. **Obtener un solo concesionario por ID:**
    <details>
     <summary><code>GET</code> <code><b>/concesionarios/:id</b></code></summary>

    ##### Parametros

    > | Nombre | Tipo      | Tipo de dato | Descripción                    |
    > | ------ | --------- | ------------ | ------------------------------ |
    > | id     | requerido | cadena       | ID del concesionario a obtener |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta                     |
    > | ----------- | ------------------ | ----------------------------- |
    > | `200`       | `application/json` | Concesionario en formato JSON |
    > | `404`       | `application/json` | Concesionario no encontrado   |

    ##### Ejemplo cURL

    > ```bash
    > curl -X GET http://localhost:8080/concesionarios/1
    > ```

    </details>

4. **Actualizar un solo concesionario por ID:**
    <details>
     <summary><code>PUT</code> <code><b>/concesionarios/:id</b></code></summary>

    ##### Parametros

    > | Nombre | Tipo      | Tipo de dato         | Descripción                                          |
    > | ------ | --------- | -------------------- | ---------------------------------------------------- |
    > | id     | requerido | cadena               | ID del concesionario a actualizar                    |
    > | body   | requerido | objeto (JSON o YAML) | Datos actualizados del concesionario en formato JSON |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta                   |
    > | ----------- | ------------------ | --------------------------- |
    > | `200`       | `application/json` | `{"message":"ok"}`          |
    > | `404`       | `application/json` | Concesionario no encontrado |

    ##### Ejemplo cURL

    > ```bash
    > curl -X PUT -H "Content-Type: application/json" --data @concesionario_actualizado.json http://localhost:8080/concesionarios/1
    > ```

    </details>

5. **Eliminar un solo concesionario por ID:**
    <details>
     <summary><code>DELETE</code> <code><b>/concesionarios/:id</b></code></summary>

    ##### Parametros

    > | Nombre | Tipo      | Tipo de dato | Descripción                   |
    > | ------ | --------- | ------------ | ----------------------------- |
    > | id     | requerido | cadena       | ID del concesionario a borrar |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta                   |
    > | ----------- | ------------------ | --------------------------- |
    > | `200`       | `application/json` | `{"message":"ok"}`          |
    > | `404`       | `application/json` | Concesionario no encontrado |

    ##### Ejemplo cURL

    > ```bash
    > curl -X DELETE http://localhost:8080/concesionarios/1
    > ```

    </details>

## API Endpoints - Coches

1. **Obtener todos los coches pertenecientes a un concesionario:**
    <details>
     <summary><code>GET</code> <code><b>/concesionarios/:id/coches</b></code></summary>

    ##### Parametros

    > | Nombre | Tipo      | Tipo de dato | Descripción                    |
    > | ------ | --------- | ------------ | ------------------------------ |
    > | id     | requerido | cadena       | ID del concesionario a obtener |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta                       |
    > | ----------- | ------------------ | ------------------------------- |
    > | `200`       | `application/json` | Lista de coches en formato JSON |
    > | `404`       | `application/json` | Concesionario no encontrado     |

    ##### Ejemplo cURL

    > ```bash
    > curl -X GET http://localhost:8080/concesionarios/1/coches
    > ```

    </details>

2. **Añadir un nuevo coche perteneciente a un concesionario:**
    <details>
     <summary><code>POST</code> <code><b>/concesionarios/:id/coches</b></code></summary>

    ##### Parametros

    > | Nombre | Tipo      | Tipo de dato         | Descripción                                    |
    > | ------ | --------- | -------------------- | ---------------------------------------------- |
    > | id     | requerido | cadena               | ID del concesionario al que pertenece el coche |
    > | body   | requerido | objeto (JSON o YAML) | Datos del nuevo coche en formato JSON          |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta                   |
    > | ----------- | ------------------ | --------------------------- |
    > | `200`       | `application/json` | `{"message":"ok"}`          |
    > | `404`       | `application/json` | Concesionario no encontrado |

    ##### Ejemplo cURL

    > ```bash
    > curl -X POST -H "Content-Type: application/json" --data @nuevo_coche.json http://localhost:8080/concesionarios/1/coches
    > ```

    </details>

3. **Obtener un solo coche de un concesionario por ID de concesionario y ID de coche:**
    <details>
     <summary><code>GET</code> <code><b>/concesionarios/:id/coches/:cocheId</b></code></summary>

    ##### Parametros

    > | Nombre  | Tipo      | Tipo de dato | Descripción                    |
    > | ------- | --------- | ------------ | ------------------------------ |
    > | id      | requerido | cadena       | ID del concesionario a obtener |
    > | cocheId | requerido | cadena       | ID del coche a obtener         |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta             |
    > | ----------- | ------------------ | --------------------- |
    > | `200`       | `application/json` | Coche en formato JSON |
    > | `404`       | `application/json` | Coche no encontrado   |

    ##### Ejemplo cURL

    > ```bash
    > curl -X GET http://localhost:8080/concesionarios/1/coches/0
    > ```

    </details>

4. **Actualizar un solo coche perteneciente a un concesionario por ID de concesionario y ID de coche:**
    <details>
     <summary><code>PUT</code> <code><b>/concesionarios/:id/coches/:cocheId</b></code></summary>

    ##### Parametros

    > | Nombre  | Tipo      | Tipo de dato         | Descripción                                    |
    > | ------- | --------- | -------------------- | ---------------------------------------------- |
    > | id      | requerido | cadena               | ID del concesionario al que pertenece el coche |
    > | cocheId | requerido | cadena               | ID del coche a actualizar                      |
    > | body    | requerido | objeto (JSON o YAML) | Datos actualizados del coche en formato JSON   |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta           |
    > | ----------- | ------------------ | ------------------- |
    > | `200`       | `application/json` | `{"message":"ok"}`  |
    > | `404`       | `application/json` | Coche no encontrado |

    ##### Ejemplo cURL

    > ```bash
    > curl -X PUT -H "Content-Type: application/json" --data @coche_actualizado.json http://localhost:8080/concesionarios/1/coches/0
    > ```

    </details>

5. **Eliminar un solo coche perteneciente a un concesionario por ID de concesionario y ID de coche:**

    <details>
     <summary><code>DELETE</code> <code><b>/concesionarios/:id/coches/:cocheId</b></code></summary>

    ##### Parametros

    > | Nombre  | Tipo      | Tipo de dato | Descripción                                    |
    > | ------- | --------- | ------------ | ---------------------------------------------- |
    > | id      | requerido | cadena       | ID del concesionario al que pertenece el coche |
    > | cocheId | requerido | cadena       | ID del coche a borrar                          |

    ##### Respuestas

    > | Código HTTP | Content-Type       | Respuesta           |
    > | ----------- | ------------------ | ------------------- |
    > | `200`       | `application/json` | `{"message":"ok"}`  |
    > | `404`       | `application/json` | Coche no encontrado |

    ##### Ejemplo cURL

    > ```bash
    > curl -X DELETE http://localhost:8080/concesionarios/1/coches/0
    > ```

    </details>

## Documentación - Swagger

Si quieres echarle un vistazo más avanzado a la documentación, la UI de Swagger esta configurada en `/api-docs`, desde la UI de Swagger, puedes ojear las diferentes rutas, y en caso de necesitarlo, probarlas desde la propia interfaz.

-   **[swagger.json](https://github.com/bloknoss/ConcesioAPI/blob/main/swagger.json)** - El archivo de configuración de Swagger, en caso de necesitar ajustar algun parametro.
-   **[index.js](https://github.com/bloknoss/ConcesioAPI/blob/main/index.js)** - El archivo en el que se configura la ruta del setup de Swagger en nuestra API.

### Vista de Swagger UI:

<img src="https://i.imgur.com/sLiwa25.png" alt="Swagger Example" style="width:500px;"/></br>

> **_NOTA:_** Esta herramienta proporciona una utilidad y facilidad para testear tal que no requeriremos de herramientas o utilidades externas tales como Postman o similares.

## Dependencias de Node
Las dependencias de NPM que usan los proyectos en node se almacenan en **[package.json](https://www.github.com/bloknoss/concesioapi/blob/main/package.json)**   
Existen diferentes tipos de dependencias, las **dependencias normales** que requieren los programas, y las **dependencias de desarrollo** requeridas por el desarrollador durante el desarrollo (ej: [ESLint](https://eslint.org/))  

Dependencias de [NPM](https://www.npmjs.com):

```json
  "dependencies": {
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "swagger-ui-express": "^5.0.0",
    "mongodb": "6.3.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.3.1"
  }
```

-   [Express](https://www.npmjs.com/package/express) - Framework que nos permite montar la API Rest.
-   [Helmet](https://www.npmjs.com/package/helmet) - Biblioteca Middleware que aporta seguridad a la API mediante headers.
-   [Swagger UI](https://www.npmjs.com/package/swagger-ui-express) - Modulo de Swagger UI que permite generar los API docs facilmente en Express.
-   [MongoDB](https://www.npmjs.com/package/mongodb) - Driver de MongoDB permite crear una conexión con la base de datos.  
-   [Cookie Parser](https://www.npmjs.com/package/cookie-parser) - Cookie Parser que añade el header de Cookies y le da un objeto con el nombre la cookie. 
-   [Dotenv](https://www.npmjs.com/package/dotenv) - Modulo que carga variables de entorno de un archivo .env a process.env 

Dependencias de desarrollo:  

```json
  "devDependencies": {
    "eslint": "^8.55.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-prettier": "^5.0.1",
    "prettier": "^3.1.0",
    "nodemon": "^3.0.1"
  }
```
-   [ESLint](https://www.npmjs.com/package/eslint) - Herramienta para identificar errores / patrones no deseados en nuestro código.
-   [ESLint Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) - Convencion de reglas para ESLint, que aporta muchas reglas que estan popularmente aceptadas.
-   [ESLint Prettier](https://www.npmjs.com/package/eslint-config-prettier) - Deshabilita las reglas de Prettier que tengan conflicto con ESLint
-   [ESLint Plugin](https://www.npmjs.com/package/eslint-plugin-import) - Dependencia para evitar conflictos con import/export, y no tener errores con rutas de archivos
-   [Prettier](https://www.npmjs.com/package/prettier) - Formateador de Código, Prettier está como extensión para VSCode además de NPM, se instala como dependencia para poder formatear el código con ESLint.
-   [Nodemon](https://www.npmjs.com/package/nodemon) - Realiza hot reloads (recargas automáticas) al detectar guardados en el archivo.

Las reglas de ESLint están definidas en [.eslintrc.json](https://github.com/bloknoss/concesioapi/blob/main/.eslintrc.json).
> **_NOTA:_** Las dependencias de desarrollo pueden no ser necesarias, pero sí altamente recomendadas para realizar un código legible y más eficiente.
## Contribuciones

Las Contribuciones son una parte esencial de los proyectos open source, por lo tanto toda contribucion a este proyecto se agradece enormemente.
Si estas interesado en contribuir al proyecto, puedes hacer lo siguiente:

1. Clona el proyecto (git clone https://github.com/bloknoss/ConcesioAPI.git)
2. Crea una rama para la feature que quieras crear (git branch | git checkout -b /feature/nombreDeFuncion)
3. Haz commit a tus cambios. (git commit -m "Añadir funcion")
4. Haz push (git push origin feature/nombreDeFuncion)

Una vez realizados estos pasos, puedes iniciar una pull request para mergear tus cambios.

## Licencia

Distribuido bajo la licencia de MIT. Lee [`LICENSE`](https://github.com/bloknoss/ConcesioAPI/blob/main/LICENSE) para más información.
