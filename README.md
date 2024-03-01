# servicio-direccion-x-poligono
This is the repository for the **Punto&Coma servicio-direccion-x-poligono**. A simple service to verify an address within a map polygon.

## How to participate?

First, to participate you must be part of the community of [discord](https://discord.gg/P7g9XJ4URc)

## Collaborate with code

If you wish to contribute code, please:

- **Review the open issues** or **create a new one** explaining the improvement or bug to fix.

- **Make a fork** of the repository.

- Create a new branch for your feature or bug fix.

- Write and **test** your code.

- Make sure to follow the existing code **style guidelines**.

- Send a Pull Request to the `develop` branch with a detailed description of the proposed changes and reference the related issue.

## Contribute ideas, bugs or feedback 💡

If you have an idea, find a bug or want to give feedback on the project:

- Open a new issue in the repository describing your idea, the bug you found or the feedback you want to share.
- Be as detailed as possible in the description.
- If possible, include screenshots or any other resource that can help to better understand your point.

## Conventional Commits

The commit conventions used in this project are as follows:
- **Commit Type**: The commit type provides context about the change made. Some common examples include feat for new features, fix for bug fixes, and docs for documentation changes.
- **Optional Scope**: The scope provides additional information about the scope of the change, such as the affected module or component
- **Change Description**: The change description should be brief yet descriptive, providing enough information to understand the purpose of the commit.

Example of a commit following these conventions:

```bash
feat(login): add email validation
```

> [!IMPORTANT]
> This project adheres to **Conventional Commits** to maintain a clear and consistent history of changes.

For more information on Conventional Commits, please refer to the [official website](https://www.conventionalcommits.org/en/v1.0.0/).  
Here's [Conventional Commits for VSCode](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).



# POC: Servicio de Geolocalización 

Este documento describe el Concepto de Prueba (POC) para un servicio de geolocalización desarrollado usando Node.js. El servicio está diseñado para verificar si una dirección dada se encuentra dentro de un área poligonal especificada. Este POC tiene como objetivo guiar a los desarrolladores a través del proceso de desarrollo, destacando los requisitos funcionales principales y los componentes clave del servicio.

## Requisitos Funcionales

1. **Geocodificación de Direcciones**: El servicio debe aceptar una dirección como entrada y convertir esta dirección en coordenadas geográficas (latitud y longitud). Este proceso se conoce como geocodificación.

2. **Definición del Polígono**: El servicio debe permitir la entrada de un polígono definido por un arreglo de coordenadas geográficas. Estas coordenadas representan los vértices del polígono, delimitando el área a comparar con la dirección geocodificada.

3. **Verificación de Punto Dentro del Polígono**: Una vez que la dirección esté geocodificada, el servicio debe determinar si el punto geográfico resultante (latitud y longitud) cae dentro del polígono especificado.

4. **Endpoint de la API**: El servicio debe exponer un endpoint de API REST para recibir la dirección y los puntos del polígono como datos JSON y devolver una respuesta JSON que indica si la dirección está dentro del polígono.

5. **Manejo de Errores**: El servicio debe incluir un manejo básico de errores para escenarios comunes como direcciones inválidas, datos de polígono mal formados y fallos en la geocodificación.

## Componentes Técnicos

- **Express.js**: Un marco de aplicación web mínimo y flexible para Node.js que proporciona un robusto conjunto de características para aplicaciones web y móviles.
- **Node-Geocoder**: Una biblioteca para Node.js que abstrae varios proveedores de geocodificación, permitiendo una fácil geocodificación de direcciones.
- **@turf/turf**: Una biblioteca de análisis geoespacial modular que incluye funciones para realizar operaciones geométricas como las verificaciones de punto dentro del polígono.

## Pasos de Desarrollo

1. **Configuración del Proyecto**: Inicializar un nuevo proyecto Node.js e instalar las dependencias requeridas (`express`, `node-geocoder`, `@turf/turf`).

2. **Implementar el Endpoint de la API**: Crear una aplicación Express.js con un endpoint POST `/check_address` que acepte datos JSON conteniendo una dirección y puntos del polígono.

3. **Geocodificar la Dirección**: Usar `node-geocoder` para convertir la dirección de entrada en coordenadas geográficas.

4. **Definir el Polígono y Verificar la Ubicación**: Usar `@turf/turf` para definir un polígono con los puntos proporcionados y verificar si el punto de la dirección geocodificada cae dentro de este polígono.

5. **Devolver el Resultado**: La API debe devolver un objeto JSON que contenga un booleano indicando si la dirección está dentro del polígono, junto con los códigos de estado HTTP apropiados para casos de éxito o error.

6. **Manejo de Errores**: Implementar el manejo de errores para escenarios como datos de entrada inválidos o fallos en la geocodificación.

## Ejemplo de Solicitud API

POST /check_address
Content-Type: application/json
```json
{
  "direccion": "1600 Pennsylvania Ave NW, Washington, DC 20500",
  "puntosPoligono": [
    [-77.0365, 38.8977],
    [-77.0365, 38.8987],
    [-77.0355, 38.8987],
    [-77.0355, 38.8977],
    [-77.0365, 38.8977]
  ]
}
```
## Ejemplo de respuesta
```json
{
  "esta_dentro": true
}
```
