# segapexpo

**SEGAP (Sistema de Gestión de Accesos para Propietarios)** es una aplicación móvil desarrollada con React Native y Expo, diseñada para modernizar y asegurar el control de acceso en complejos residenciales.

---

## 🚀 Funcionalidades Principales

La aplicación distingue entre diferentes roles de usuario (Administrador, Guardia y Residente) para ofrecer funcionalidades específicas y seguras. Los dos flujos de acceso principales son:

### 1. Acceso de Visitas (Invitaciones QR)

Este flujo permite a los residentes generar invitaciones temporales y de un solo uso para sus visitantes.

- **Generación**: El residente genera un código QR único desde la pantalla "Invitar". Este QR contiene un `idUnico` y un estado "activo".
- **Compartir**: La invitación puede ser compartida fácilmente a través de aplicaciones de mensajería como WhatsApp. La invitación no se activa en la base de datos hasta que se comparte.
- **Validación**: El guardia de seguridad escanea el QR del visitante.
- **Verificación del Sistema**:
    - El sistema busca la invitación en la base de datos (`InvitacionesDAO`).
    - Verifica que el estado sea "activo".
    - Confirma que el residente que generó la invitación esté **solvente**.
    - Si todo es correcto, muestra "ACCESO PERMITIDO" y marca la invitación como "inactiva" para evitar su reutilización.
    - Si alguna verificación falla, muestra "ACCESO DENEGADO" con el motivo del rechazo.

### 2. Acceso de Clientes (Identificación QR)

Este flujo permite a los residentes identificarse usando un código QR personal y permanente.

- **Generación**: Cada residente tiene un código QR personal en la pantalla de "Inicio" de su aplicación. Este QR contiene la información completa de su perfil de cliente.
- **Validación**: El guardia de seguridad escanea el QR del residente.
- **Verificación del Sistema**:
    - El sistema interpreta que es un QR de tipo `Cliente` (y no una invitación).
    - Valida que el `id` del cliente exista en la base de datos (`ClientesDAO`).
    - Si el cliente es encontrado, muestra en pantalla la información relevante del residente (nombre, estado de cuenta, etc.) para una verificación visual por parte del guardia.

---

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework para el desarrollo de aplicaciones móviles multiplataforma.
- **Expo**: Plataforma y herramientas sobre React Native para agilizar el desarrollo y la compilación.
- **TypeScript**: Superset de JavaScript que añade tipado estático para un código más robusto y mantenible.
- **React Navigation**: Para la gestión de la navegación y el flujo entre pantallas.
- **AsyncStorage**: Para la persistencia de datos locales en el dispositivo (ej. invitaciones).

---

## 📁 Estructura del Proyecto

El código fuente está organizado en la carpeta `scr/` con la siguiente estructura:

```
scr/
├── Componentes/  # Componentes reutilizables (GenerarQR, BotonWhatsapp, etc.)
├── DAO/          # Data Access Objects: Lógica de negocio y acceso a datos (ClientesDAO, InvitacionesDAO, etc.)
├── Data/         # Mock de base de datos con archivos JSON (clientes, usuarios, etc.)
├── Modelo/       # Entidades, interfaces y contexto de autenticación (Entidades.ts, AuthContext.tsx)
└── pantallas/    # Pantallas principales de la aplicación (Login, Inicio, EscanearQR, etc.)
```

- **Componentes**: Contiene piezas de UI que se pueden usar en múltiples pantallas.
- **DAO**: Es el corazón de la lógica de negocio. Estos archivos se encargan de interactuar con los datos (actualmente los archivos JSON) y aplicar las reglas del sistema.
- **Data**: Actúa como una base de datos falsa para el desarrollo, permitiendo simular usuarios, clientes e invitaciones.
- **Modelo**: Define las "formas" de nuestros datos (`Cliente`, `Usuario`, `Invitacion`) y gestiona el estado global, como la sesión del usuario.
- **pantallas**: Cada archivo representa una vista completa que el usuario ve en la aplicación.

---

## ⚙️ Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd segapexpo
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo de Expo:**
    ```bash
    npx expo start
    ```

Esto abrirá el Metro Bundler. Puedes escanear el código QR con la aplicación Expo Go en tu dispositivo móvil (iOS o Android) para ejecutar la aplicación.
