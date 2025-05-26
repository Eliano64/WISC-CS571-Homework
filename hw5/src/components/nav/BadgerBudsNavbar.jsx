
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'

export default function BadgerBudsNavbar(props) {
    return <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
        <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Brand as={Link} to="/">
                <img
                    alt="Badger Buddies Logo"
                    src={crest}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Badger Buddies!
            </Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav" className="me-auto">
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/available-cats">Available Cats</Nav.Link>
                    <Nav.Link as={Link} to="/basket">My Basket</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

          
// 这个导航栏组件 <mcfile name="BadgerBudsNavbar.jsx" path="d:\Users\74796\Desktop\ice-webdevbasics1-main\hw5\src\components\nav\BadgerBudsNavbar.jsx"></mcfile> 是使用 `react-bootstrap` 和 `react-router-dom` 实现的。让我为你分解一下：

// 1.  **导入依赖**: 
//     *   从 `react-bootstrap` 导入了 `Container`, `Nav`, 和 `Navbar` 组件，这些是构建导航栏结构和样式的核心。
//     *   从 `react-router-dom` 导入了 `Link` 组件，用于实现导航链接，使得点击链接时可以切换页面而不会重新加载整个应用。
//     *   导入了 `uw-crest.svg` 图片，作为导航栏品牌 Logo。

// 2.  **组件定义**: 
//     *   定义了一个名为 `BadgerBudsNavbar` 的函数组件。

// 3.  **Navbar 结构**: 
//     *   最外层是 `Navbar` 组件，它来自 `react-bootstrap`。 
//         *   `bg="dark"` 和 `variant="dark"` 设置了导航栏的背景为深色，文本为浅色。
//         *   `sticky="top"` 使导航栏固定在页面顶部。
//         *   `expand="sm"` 表示在小屏幕设备上（sm 及以上）导航栏会展开，在更小的屏幕上会折叠成汉堡菜单。
//         *   `collapseOnSelect` 属性使得在点击导航链接后，折叠的导航菜单会自动收起。

// 4.  **Container**: 
//     *   `Navbar` 内部使用了 `Container` 组件，它会使导航栏内容居中并设置合适的边距。

// 5.  **Navbar.Toggle 和 Navbar.Brand**: 
//     *   `Navbar.Toggle` 用于在小屏幕上显示汉堡菜单按钮，`aria-controls="responsive-navbar-nav"` 将其与可折叠的内容关联起来。
//     *   `Navbar.Brand` 用于显示品牌信息，这里包含了一个图片 (`uw-crest.svg`) 和文本 "Badger Buddies!"。
//         *   `as={Link} to="/"` 将品牌区域也设置为一个链接，点击后会导航到首页。
//         *   `<img>` 标签用于显示 Logo 图片，设置了 `alt` 文本、`src`（图片来源）、宽度、高度和 CSS 类名。

// 6.  **Navbar.Collapse**: 
//     *   `Navbar.Collapse` 包裹了导航链接，`id="responsive-navbar-nav"` 与 `Navbar.Toggle` 的 `aria-controls` 对应，实现了响应式折叠功能。
//     *   `className="me-auto"` (margin-end: auto) 会将导航链接推到导航栏的左侧（在 LTR 布局中）。

// 7.  **Nav 和 Nav.Link**: 
//     *   `Nav` 组件用于组织导航链接。
//     *   `Nav.Link` 组件创建了具体的导航项：
//         *   "Home" 链接到 `/`
//         *   "Available Cats" 链接到 `/available-cats`
//         *   "My Basket" 链接到 `/basket`
//         *   `as={Link} to="..."` 同样将这些 `Nav.Link` 转换为 `react-router-dom` 的 `Link` 组件，以实现客户端路由。

// 总的来说，这个组件利用 `react-bootstrap` 提供的预设样式和响应式行为，结合 `react-router-dom` 的路由功能，创建了一个美观且功能完善的导航栏。
        
