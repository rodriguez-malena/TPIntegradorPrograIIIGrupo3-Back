// Utilidades para trabajar con archivos y rutas de proyecto

// Importacion de módulos para trabajar con rutas
import { fileURLToPath } from "url"; // convierte una URL de archivo file:// a una ruta de sistema de archivos
import { dirname, join  } from "path" // "dirname" devuelve el directorio de una ruta y "join" unfica rutas

// Obtener el nombre del archivo actual:
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual:
const __dirname = join(dirname(__filename),"../../../")  // join (...., "../../../") Estamos retrocediendo 3 niveles en la estructura de directorios. Apunta a la raiz del proyecto saliendo de utils/api/src

// Exportamos el directorio base calcuado y la funcion join para construir rutas relativas
export {
    __dirname,
    join
}
