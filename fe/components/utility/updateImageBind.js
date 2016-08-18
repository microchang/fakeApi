
import $ from 'jquery';

export default function (fileInput, imageDom, opts, cb) {
  const {width, height} = opts;
  let reader = new FileReader();
  let updateCanvas = $('<canvas width="' + width + 'px" height="' + height + 'px"></canvas>')[0];

  fileInput.on('change', function () {
    let files = this.files;
    let file = files[0];

    // 接受 jpeg, jpg, png 类型的图片
    if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
      fileInput.value = '';
      return alert('请选择图片！');
    }

    reader.onload = function () {
      //更改显示图片，用canvas重绘图片
      let originDataUrl = this.result;
      let ctx = updateCanvas.getContext('2d');

      if (imageDom) {
        imageDom.src = originDataUrl;
        ctx.drawImage(imageDom, 0, 0, width, height);
      } else {
        let tempImg = new Image();
        tempImg.src = originDataUrl;
        ctx.drawImage(tempImg, 0, 0, width, height);
        cb && typeof (cb) === 'function' && cb({
          type: 'base64',
          data: originDataUrl
        });
      }
      //将canvas对象转成二进制文件，传给后台
      //这里也可以用toDataURL获得base64的字符串
      updateCanvas.toBlob((blob) => {
        let fd = new FormData();
        fd.append('files', blob, 'data');
        $.ajax({
          url: '',
          type: 'POST',
          data: fd,
          dataType: 'json',
          processData: false,  // 告诉jQuery不要去处理发送的数据
          contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
          success: (data) => {
            cb && typeof (cb) === 'function' && cb({
              type: 'url',
              data: data.data
            });
          },
          error: (e) => {
            console.error(e);
            cb && typeof (cb) === 'function' && cb({
              type: 'e',
              data: e
            });
          }
        });
      });

      // 清空图片上传框的值
      fileInput[0].value = '';


    };

    reader.readAsDataURL(file);
  });
}