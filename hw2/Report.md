# hw2
## 1. 遇见的困难与解决

### 1.1. Bootstrap网格布局

 - 一开始将`"col-*"`写在`<div id="students">`的子元素`<div>`里，发现没有效果，因为` buildStudents()`会清除子元素。
 - 后来尝试在` buildStudents()`中新建子元素`<div>`，并添加`"col-*"`，发现可以。


### 1.2. 如何搜寻

- 使用`.toLowerCase()`将输入的字符串转为小写
- 使用`.includes()`判断是否包含子串

### 1.3. 如何将`click`事件绑定到`li`上

```js
    const interests=document.createElement("ul");
    // ... 
    interests.addEventListener("click",(e)=>{
            e?.preventDefault();
			document.getElementById("search-name").value="";
			document.getElementById("search-major").value="";
			document.getElementById("search-interest").value=e.target.textContent;
			handleSearch(e);
		})
```