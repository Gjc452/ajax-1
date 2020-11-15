getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.js");
  request.onreadystatechange = () => {
    // 创建 script 标签
    const script = document.createElement("script");
    // 填写 script 内容
    script.innerHTML = request.response;
    // 插到 body 里面
    document.body.appendChild(script);
  };
  request.send();
};
getCSS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/style.css"); //不能用open后面的参数
  request.onreadystatechange = () => {
    // 创建 style 标签
    const style = document.createElement("style");
    // 填写 style 内容
    style.innerHTML = request.response;
    // 插到 head 里面
    document.head.appendChild(style);
  };
  request.send();
};
getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.html");
  request.onreadystatechange = () => {
    // 下载完成但不知道是成功 2xx 还是失败 4xx 5xx
    if (request.readyState === 4) {
      // 状态码为4的时候再执行
      if (request.status >= 200 && request.status < 300) {
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      } else {
        alert("加载失败");
      }
    }
  };
  request.send();
};
getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/4.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const dom = request.responseXML;
        const text = dom.getElementsByTagName("warning")[0].textContent;
        console.log(text.trim());
      }
    }
  };
  request.send();
};
getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const object = JSON.parse(request.response);
        console.log(object);
        myName.textContent = object.name;
      }
    }
  };
  request.send();
};
let n = 1;

getPage.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${n + 1}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      // 状态码为4的时候再执行
      if (request.status >= 200 && request.status < 300) {
        const array = JSON.parse(request.response);
        array.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.id;
          xxx.appendChild(li);
        });
        n += 1;
        if (n === 3) {
          getPage.disabled = true;
          getPage.innerHTML = `后面没了`;
        }
      }
    }
  };
  request.send();
};
