## Consideraciones
```bash
$ la redaccion de los requerimientos es confusa, no se entiende con claridad la relacion entre las entidades categoria de contenido y tematicas, y la relacion entre los diferentes tipo de usuario.
El desarrollo cumple parcialmente los requerimientos, sin embargo pretende demostrar el set de skills necesarios para desarrollar una aplicacion funcional bajo el stack react/nodejs-express usando docker para generar los contenerdores necesarios para levantar la aplicacion y la instancia de mongodb.
```

## Instalación
```bash
# iniciar frontend
$ cd d-front
$ npm install
$ npm run dev
```

```bash
# iniciar backend
$ docker compose -f docker-compose.dev.yml up --build -V
```