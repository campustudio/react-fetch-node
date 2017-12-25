export function netRequestGet(url, err, callback, headerGet) {
  let headers = Object.assign({
    'Content-Type': 'application/json;charset=utf-8',
  }, headerGet);
  fetch(url, {
    method: 'GET',
    headers: headers,
  }
  ).then((response)=> {
    // console.log("netRequestGet json", response);
    if (response.status == 500) {
      alert.error('程序异常,请联系车件儿客服人员!');
    } else if (response.status == 403) {
      alert.error('登录信息过期,请重新登录!');
      setTimeout(()=> {
        window.location.href = '/';
      }, 1500);
    } else if (response.status == 400 || response.status == 401) {
      response.json().then((json)=> {
        alert.error(json.errorMsg);
        err(json);
      });
    } else if (response.status != 200) {
      alert.error('程序异常,请联系车件儿客服人员!');
    } else {
      if (typeof(response) === 'object') {
        return response;
      } else {
        return response.json();
      }
    }
  }).then((json)=> {
    try {
      callback(json);
    } catch (ex) {
      err(ex);
    }
  });
}

export function netRequestPost(url, data, err, callback) {
  let headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  }
  ).then((response)=> {
    if (response.status == 500) {
      alert('程序异常,请联系车件儿客服人员!');
    } else if (response.status == 403) {
      alert('登录信息过期,请重新登录!');
      setTimeout(()=> {
        window.location.href = '/';
      }, 1500);
    } else if (response.status == 400) {
      response.json().then((json)=> {
        alert(json.errorMsg);
      });
    } else if (response.status != 200) {
      alert('程序异常,请联系车件儿客服人员!');
    } else {
      if (typeof(response) === 'object') {
        return response;
      } else {
        return response.json();
      }
    }
  }).then((json)=> {
    try {
      callback(json);
    } catch (ex) {
      err(ex);
    }
  });
}
