<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Clonar el repositorio
2. Ejecutar:
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Copiar archivo ```.env.template``` y renombrar a ```.env```

6. Llenar las variables de entorno definidas en el ```.env```

7. Iniciar la aplicación 
```
npm run start:dev
```

8. Reconstruir data
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* Mongo DB
* Nest JS
