# hw4
## 1. 遇见的困难与解决

### 1.1. useEffect的条件

在

```js
useEffect(() => {
        setCurPage(1);
    }, [searchName, searchMajor, searchInterest]);
```

中，最开始将`result`作为依赖项（因为在逻辑上是直接相关的）。但导致每次改变页码时，就会触发result改变（重渲染），页面都会自动跳转到第一页。

通过一系列实验发现，对于非`state`的变量，每次有`state`变量改变时，都会重新赋值。

### 1.2. `Form.Control`的设置

```js
// const [input, setInput] = useState("");
 <Form.Control
        id="myInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
```

### 1.3. `Col`生效条件

在`<Col><Col/>`标签外面不能是`<div><div/>`，但`<></>`可以。

### 1.4. `props`的传参写法

```js
// const Interest = (props) => {
//     return <li>{props.interest}</li>
// }

<Interest interest={interest} />
//这里不应是props={interest}，而应该是interest={interest}
```