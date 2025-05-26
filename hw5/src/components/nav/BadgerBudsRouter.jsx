import { BrowserRouter, Route, Routes } from "react-router-dom";

import BadgerBuds from "../BadgerBuds";
import BadgerBudsLanding from "./pages/BadgerBudsLanding"
import BadgerBudsAdoptable from "./pages/BadgerBudsAdoptable"
import BadgerBudsBasket from "./pages/BadgerBudsBasket"
import BadgerBudsNoMatch from "./pages/BadgerBudsNoMatch"

export default function BadgerBudsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<BadgerBuds />}>
                <Route index element={<BadgerBudsLanding />} />
                {/* : Add your routes here! */}
                <Route path="/available-cats" element={<BadgerBudsAdoptable />}/>
                <Route path="/basket" element={<BadgerBudsBasket />}/>
                <Route path="*" element={<BadgerBudsNoMatch />}/>
            </Route>
        </Routes>
    </BrowserRouter>
}
       
// `<Route path="/" element={<BadgerBuds />}>` 之所以包裹其他 `Route` 组件，是因为它实现了一种叫做 **嵌套路由 (Nested Routes)** 的模式。这种模式在构建复杂用户界面时非常有用，主要有以下几个原因和好处：

// 1.  **共享布局 (Shared Layouts)**:
//     *   父路由 `<Route path="/" element={<BadgerBuds />}>` 渲染的 `BadgerBuds` 组件通常包含一些所有子页面都共有的 UI 元素，比如导航栏、页脚、侧边栏等。
//     *   当 URL 匹配到任何一个被它包裹的子路由时，父路由的 `BadgerBuds` 组件会首先被渲染。然后，匹配到的子路由对应的组件（例如 `BadgerBudsLanding`, `BadgerBudsAdoptable` 等）会被渲染到 `BadgerBuds` 组件内部的一个特定位置。
//     *   这个“特定位置”通常是通过在 `BadgerBuds` 组件中使用 `<Outlet />` 组件（由 `react-router-dom` 提供）来实现的。`<Outlet />` 就像一个占位符，告诉 React Router 在哪里渲染子路由的内容。
//     *   这样做的好处是，你不需要在每个页面组件中重复编写导航栏、页脚等通用布局代码，使得代码更简洁、更易于维护。

// 2.  **层级化的 URL 结构**: 
//     *   嵌套路由自然地反映了 URL 的层级结构。例如，如果 `/` 是父路由，那么 `/available-cats` 和 `/basket` 就是它的子页面。这种结构使得应用的路由逻辑更清晰，更容易理解。

// 3.  **代码组织和模块化**: 
//     *   可以将应用的不同部分拆分成更小的、可复用的组件。父路由处理整体布局，子路由处理各自页面的特定内容。

// 4.  **更精细的控制**: 
//     *   父路由可以向子路由传递 props，或者通过上下文 (Context API) 共享状态，从而实现更复杂的交互和数据流。

// **工作方式回顾**:

// 当你有一个像这样的结构：

// ```jsx
// <Routes>
//     <Route path="/" element={<BadgerBuds />}>
//         <Route index element={<BadgerBudsLanding />} />
//         <Route path="available-cats" element={<BadgerBudsAdoptable />} /> 
//         {/* 注意这里的 path 是相对父路由的，所以 "available-cats" 实际上是 /available-cats */}
//         <Route path="basket" element={<BadgerBudsBasket />} />
//     </Route>
// </Routes>
// ```

// *   **访问 `/`**: `BadgerBuds` 组件渲染，并且 `BadgerBudsLanding` 组件作为其子内容（在 `<Outlet />` 的位置）渲染。
// *   **访问 `/available-cats`**: `BadgerBuds` 组件渲染，并且 `BadgerBudsAdoptable` 组件作为其子内容渲染。
// *   **访问 `/basket`**: `BadgerBuds` 组件渲染，并且 `BadgerBudsBasket` 组件作为其子内容渲染。

// 在每种情况下，`BadgerBuds` 组件（可能包含导航栏等）都会被渲染，只有它内部的内容区域会根据匹配到的子路由而变化。

// 简而言之，`<Route path="/" element={<BadgerBuds />}>` 包裹其他 `Route` 组件是为了创建一个共享的父级布局，并在该布局中动态地渲染不同的子页面内容。
        