# WFS React + Vite Project

This project is built with [Vite](https://vitejs.dev/) and [React](https://react.dev/), and includes a set of modern UI libraries and tools for rapid development.

# 📘 React Hooks 速查表

整理常用的 React Hooks，包括基础使用、进阶 Hook 及第三方实用库。

---

## ✅ 基础 Hooks（官方自带）

| Hook | 说明 | 示例 |
|------|------|------|
| `useState` | 状态管理 | `const [count, setCount] = useState(0)` |
| `useEffect` | 处理副作用（如数据加载） | `useEffect(() => {}, [])` |
| `useRef` | 获取 DOM 引用或持久变量（不引起重渲染） | `const ref = useRef(null)` |
| `useMemo` | 缓存计算结果（性能优化） | `useMemo(() => compute(), [deps])` |
| `useCallback` | 缓存函数引用，避免子组件重复渲染 | `useCallback(() => doSomething(), [deps])` |
| `useContext` | 获取 Context 中的值 | `const value = useContext(MyContext)` |

---

## 🔁 高级 Hooks（官方）

| Hook | 说明 | 示例 |
|------|------|------|
| `useReducer` | 更复杂的状态逻辑（类似 Redux） | `const [state, dispatch] = useReducer(reducer, init)` |
| `useLayoutEffect` | 与 `useEffect` 类似，但同步执行 | `useLayoutEffect(() => {}, [])` |
| `useImperativeHandle` | 暴露组件方法给父组件，配合 `forwardRef` | `useImperativeHandle(ref, () => ({ focus }))` |
| `useId` | 稳定 ID，适合 SSR（React 18+） | `const id = useId()` |
| `useTransition` | 异步状态更新（UI 更平滑，React 18+） | `const [isPending, startTransition] = useTransition()` |
| `useDeferredValue` | 推迟值的更新（React 18+） | `const deferredQuery = useDeferredValue(query)` |

---

## 🧩 第三方 Hooks 推荐

### 🔹 数据请求

| Hook | 库 | 说明 |
|------|----|------|
| `useSWR` | swr | 简洁高效的数据获取与缓存 |
| `useQuery` / `useMutation` | react-query / tanstack-query | 更复杂的数据获取和缓存管理 |

### 🔹 表单处理

| Hook | 库 | 说明 |
|------|----|------|
| `useForm` | react-hook-form | 高效、轻量的表单状态处理 |
| `useFieldArray` | react-hook-form | 处理动态表单项 |

### 🔹 工具类 Hooks

| Hook | 库 | 说明 |
|------|----|------|
| `useDebounce` | usehooks-ts / custom | 防抖处理输入 |
| `useThrottle` | usehooks-ts / custom | 节流处理频繁事件 |
| `useLocalStorage` | usehooks-ts / custom | 与 localStorage 同步状态 |
| `useMediaQuery` | usehooks-ts / custom | 响应式断点监听 |
| `useClickOutside` | usehooks-ts / custom | 检测点击是否在元素外部 |

---

## 📦 Libraries Used

### UI Libraries
- **Material UI (MUI)**: [@mui/material](https://mui.com/) and [@mui/icons-material](https://mui.com/components/material-icons/) — Google's Material Design React components and icons
- **Emotion**: [@emotion/react](https://emotion.sh/docs/introduction), [@emotion/styled](https://emotion.sh/docs/styled) — CSS-in-JS styling for MUI
- **Tailwind CSS**: [tailwindcss](https://tailwindcss.com/) — Utility-first CSS framework
- **@tailwindcss/vite**: Vite plugin for Tailwind CSS
- **React Spring**: [@react-spring/web](https://www.react-spring.dev/) — Spring-physics-based animation library
- **Lucide React**: [lucide-react](https://lucide.dev/) — Icon library for React
- **Daisy UI**: [daisyui@latest](https://daisyui.com/) - Icon libary for React With Tailwind CSS

### Routing
- **React Router**: [react-router-dom](https://reactrouter.com/) — Declarative routing for React

### Utilities
- **Axios**: [axios](https://axios-http.com/) — Promise-based HTTP client
- **Three.js**: [three](https://threejs.org/) — 3D library for WebGL
- **Vanta.js**: [vanta](https://www.vantajs.com/) — Animated backgrounds using Three.js

### Development Tools
- **Vite**: [vite](https://vitejs.dev/) — Next Generation Frontend Tooling
- **ESLint**: [eslint](https://eslint.org/) — Linting utility for JavaScript/React
- **@vitejs/plugin-react**: Vite plugin for React

## 🛠️ Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Preview the production build:**
   ```sh
   npm run preview
   ```

## 📚 Adding More Libraries
If you need to add more UI libraries (such as Font Awesome or UIverse), you can install them with npm:
```sh
npm install @fortawesome/react-fontawesome
npm install uiverse
npm i -D daisyui@latest
npm install @heroicons/react
npm install @tanstack/react-table
npm install --save react-toastify
```

## 📁 Project Structure
- `src/` — Source code (components, routes, assets)
- `public/` — Static assets (icons, images)
- `index.html` — Main HTML file
- `vite.config.js` — Vite configuration
- `eslint.config.js` — ESLint configuration

---

For more details, see the documentation for each library linked above.

install extension eslint and ES7 + ES7+ React/Redux/
React-Native snippets
rafce ✅ 一个 箭头函数组件 + export default
rfce  ✅ 一个 普通 function 组件 + export default
rsc ✅ 一个 类组件 Class
rconst  ✅ React constructor 函数
usf ✅ useState 简写
uef ✅ useEffect 简写