# Despliegue de Monte Real

## Netlify

1. Crea una cuenta en Netlify.
2. Entra en **Add new site → Deploy from Git**.
3. Conecta el repositorio que contenga esta carpeta.
4. En **Build settings**, selecciona **Direct upload** o **Deploy from Git**.
5. Asignar `.` como directorio de publicación.
6. Guarda el sitio y copia la URL generada.

La configuración automática está en `netlify.toml`.

## GitHub Pages

1. Crea un repositorio público en GitHub.
2. Sube todos los archivos de esta carpeta.
3. En GitHub, abre **Settings → Pages**.
4. Selecciona el origen **Deploy from a branch**.
5. Elige la rama principal y la carpeta `/`.
6. Guarda y copia la URL.

No se requiere una compilación porque el sitio es estático.

## IMPORTANTE

La URL de CNAME se encuentra en `CNAME`. Cambia `monterreal.example` por el dominio real antes de publicar.

No se puede autorizar el despliegue remoto mientras no haya GitHub o Netlify configurado en la cuenta y el repositorio disponibles en el entorno.
