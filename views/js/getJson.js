function getJson(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.open("GET", url, true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if ((status >= 200 && status < 300) || status == 304) {
          var json = {};
          try {
            json = JSON.parse(xhr.responseText);
          } catch (error) {
            json = null;
          }
          resolve(json);
        } else {
          reject(xhr);
        }
      }
    };
  });
}
