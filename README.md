# Para Nati — Web de Estudio Parafarmacia

## 🚀 Cómo publicar en Vercel (paso a paso)

### 1. Sube los archivos a GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en **"New repository"**
3. Nombre: `paranati` → **Create repository**
4. Sube los 3 archivos:
   - `index.html` (en la raíz)
   - `api/chat.js` (dentro de la carpeta `api/`)
   - `vercel.json` (en la raíz)

### 2. Despliega en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en **"Add New Project"**
3. Selecciona el repositorio `paranati`
4. Haz clic en **"Deploy"** (sin cambiar nada más)

### 3. ⚠️ Añade la API Key de Anthropic (IMPRESCINDIBLE para el chat IA)

1. En Vercel, entra en tu proyecto → **Settings** → **Environment Variables**
2. Añade:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tu API key (empieza por `sk-ant-...`)
3. Haz clic en **Save**
4. Ve a **Deployments** → **Redeploy** para que aplique la variable

### 4. ¡Listo! 🎉

Tu web estará disponible en `https://paranati.vercel.app` (o similar).

---

## Estructura de archivos

```
paranati/
├── index.html        ← La web completa
├── vercel.json       ← Configuración de Vercel
└── api/
    └── chat.js       ← Backend que conecta con la IA
```
