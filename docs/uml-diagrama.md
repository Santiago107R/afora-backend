# Diagrama UML del backend

> Generado automáticamente inspeccionando las entidades TypeORM del proyecto.

```mermaid
classDiagram

class Aula {}
class Cargo {}
class Clase {}
class Curso {}
class Estado {}
class Excepcion {}
class Materia {}
class User {}

Estado "1" --> "*" Aula : estado
User "1" --> "*" Clase : user
Aula "1" --> "*" Clase : aula
Curso "1" --> "*" Clase : curso
Materia "1" --> "*" Clase : materia
Clase "1" --> "*" Excepcion : clase
User "1" --> "*" Excepcion : user
Aula "1" --> "*" Excepcion : aula
Cargo "1" --> "*" User : cargo
```

## Entidades detectadas

- Aula: src/aula/entities/aula.entity.ts
- Cargo: src/cargo/entities/cargo.entity.ts
- Clase: src/clase/entities/clase.entity.ts
- Curso: src/curso/entities/curso.entity.ts
- Estado: src/estado/entities/estado.entity.ts
- Excepcion: src/excepcion/entities/excepcion.entity.ts
- Materia: src/materia/entities/materia.entity.ts
- User: src/auth/entities/user.entity.ts