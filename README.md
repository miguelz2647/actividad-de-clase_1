#📦 Sistema de Inventario Empresarial 

Prompts y Funcionalidades

1) Ayúdame a diseñar la estructura de datos en JavaScript para un sistema de gestión de inventario empresarial sin backend. 
Necesito que me propongas objetos para:
1. Productos: con campos como id, nombre, categoría, precio, stock, y cualquier otro que sea útil.
2. Movimientos de inventario: con id, productoId, tipo (entrada o salida), cantidad, fecha y usuario.
3. Usuarios: con id, nombre y rol (administrador o empleado).
Además, quiero que los objetos estén listos para almacenarse en localStorage como arrays de objetos.

2) Genera funciones en JavaScript para un CRUD completo de productos en un sistema de inventario sin backend. 
Los productos tienen esta estructura: 
{id, nombre, categoria, precio, stock, descripcion}. 
El CRUD debe:
1. Crear un producto nuevo y guardarlo en localStorage.
2. Leer todos los productos y mostrarlos en una tabla HTML.
3. Editar un producto existente y actualizarlo en localStorage.
4. Eliminar un producto (solo si el usuario es admin) y actualizar la tabla.
5. Evitar duplicar productos por id.
6. Actualizar automáticamente la tabla después de cualquier cambio.
Incluye ejemplos de cómo vincular estas funciones a botones y formularios en HTML.


3)Genera funciones en JavaScript para controlar el stock de productos en un sistema de inventario sin backend. 
Tengo productos con esta estructura: {id, nombre, categoria, precio, stock, descripcion} 
y movimientos: {id, productoId, tipo, cantidad, fecha, usuario}. 
La función debe:
1. Registrar una entrada de producto (aumenta stock) o una salida (disminuye stock).
2. Evitar que el stock quede negativo.
3. Guardar el movimiento en localStorage.
4. Actualizar automáticamente la tabla de productos en HTML.
5. Permitir que se especifique qué usuario realizó el movimiento.
Incluye ejemplos de cómo vincularlo a botones o formularios en la página.


4)Ayúdame a generar validaciones y mejoras de experiencia de usuario (UX) en JavaScript y HTML para un sistema de inventario sin backend. 
Quiero que las funciones:
1. Validan formularios de creación de productos y registro de movimientos.
2. Eviten campos vacíos, IDs duplicados, stock o precios negativos.
3. Muestren alertas claras al usuario usando HTML y CSS (inline o modales).
4. Deshabiliten botones de envío mientras haya errores.
5. Resalten los campos incorrectos.
6. Incluyan ejemplos de código HTML + JS para implementarlo en formularios de productos y movimientos.
7. Mejoren la interacción y claridad de la interfaz sin usar frameworks externos más allá de Bootstrap/Tailwind.


5) Ayúdame a optimizar y refactorizar funciones en JavaScript para un sistema de inventario sin backend. 
Actualmente tengo varias funciones que repiten código para CRUD de productos, movimientos y validaciones. 
Quiero:
1. Funciones reutilizables para leer y guardar datos en localStorage.
2. Funciones genéricas para renderizar tablas en HTML a partir de arrays de objetos.
3. Funciones para mostrar alertas o mensajes de error/éxito de manera uniforme.
4. Mantener compatibilidad con los formularios y botones existentes.
5. Mejorar legibilidad y modularidad del código.
Incluye ejemplos de cómo usar estas funciones con productos y movimientos.

6)Genera funciones en JavaScript para calcular y mostrar estadísticas en un sistema de inventario sin backend. 
Tengo productos: {id, nombre, categoria, precio, stock, descripcion} 
y movimientos: {id, productoId, tipo, cantidad, fecha, usuario}. 
Necesito:
1. Identificar productos con bajo stock (ej. menos de 5 unidades) y mostrarlos en una tabla HTML.
2. Calcular qué productos tienen más movimientos y mostrarlos ordenados.
3. Crear funciones que actualicen automáticamente estas tablas cada vez que se agregue un producto o movimiento.
4. Dar ejemplos de código HTML + JS usando Bootstrap/Tailwind para mostrar estas estadísticas.
5. Opcional: agregar gráficos simples (barras) usando HTML + CSS puro.

7)Ayúdame a generar funciones y estrategias de depuración para un sistema de inventario en JavaScript sin backend. 
Tengo problemas comunes como:
1. localStorage vacío o con datos corruptos.
2. IDs duplicados.
3. Movimientos que restan stock y lo dejan negativo.
4. Funciones que rompen si algún campo está vacío o mal escrito.
Quiero:
- Funciones que validen la integridad de los datos antes de usarlos.
- Mensajes de error claros para el usuario.
- Estrategias para prevenir errores comunes en CRUD y movimientos.
- Ejemplos de código para detectar y corregir estos errores.

8) Ayúdame a diseñar el HTML y CSS de un sistema de inventario empresarial sin backend. 
Quiero que:
1. Las tablas de productos, movimientos y estadísticas sean claras y visualmente atractivas.
2. Los formularios tengan etiquetas, placeholders y validaciones visuales.
3. Los botones sean llamativos, consistentes y cambien de color al pasar el mouse.
4. El diseño sea responsivo para móviles y escritorio.
5. Usar Bootstrap o Tailwind y CSS personalizado para colores, bordes y márgenes.
6. Incluya ejemplos completos de HTML + CSS para la página de productos y dashboard.  esto vuelvelo un readme para subirlo a git, hazlo bonito
