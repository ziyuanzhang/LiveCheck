var baseUrl = "http://xianquansi.cn:8080/loan";
var checkSuccess = false;
$(document).ready(function () {
  $("#check-btn").click(function () {
    var nameVal = $("#name").val().trim();
    var idVal = $("#id").val().trim();
    if (nameVal.length == 0) {
      $("#tips").text("姓名必填").show().delay(3000).fadeOut();
    } else if (idVal.length == 0) {
      $("#tips").text("身份证必填").show().delay(3000).fadeOut();
    } else {
      var data = {
        realName: nameVal,
        certNo: idVal,
        userId: window.location.href.split("=")[1]
      };
      $.get(baseUrl + "/api/user/checkUserCertNo", data, function (e) {
        var res = JSON.parse(e);
        // submit1: {"status":0,"msg":"输入成功","data":null},
        // submit1: {"status":1,"msg":"输入失败，请检查信息是否正确","data":null}
        if (res.status == 1) {
          console.log("shibai");
          $("#tips").text(res.msg).show().delay(3000).fadeOut();
        } else {
          $("#tips").text("检测成功").show().delay(3000).fadeOut();

          $("#recording").trigger("click");
        }
      });
    }
  });

  $("#recording").change(function (e) {
    //console.log("size:", e.target.files[0].size / 1024 / 1024);
    if (e.target.files[0].size / 1024 / 1024 > 5) {
      $("#tips").text("超过5M了").show().delay(3000).fadeOut();
      return;
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // console.log("file:", formData.get("file"));
    $.ajax({
      url: baseUrl + "/api/common/fileUpload",
      type: "POST",
      data: formData, // 上传formdata封装的数据
      dataType: "JSON",
      cache: false, // 不缓存
      processData: false, // jQuery不要去处理发送的数据
      contentType: false, // jQuery不要去设置Content-Type请求头
      success: function (res) {
        //成功回调
        console.log("formData-res:", res);
        if (res.status == "0") {
          var fileUrlData = {
            fileUrl: res.data
          };
          send(fileUrlData);
        } else {
          $("#tips").text("上传失败").show().delay(3000).fadeOut();
        }
      }
    });
  });
  function send(fileUrlData) {
    $.get(baseUrl + "/api/common/linkSendTrueMan", fileUrlData, function (e) {
      //console.log("huti:", e);
      var fileUrlRes = JSON.parse(e);
      if (fileUrlRes.status == "0") {
        checkSuccess = true;
      } else {
        $("#tips").text(fileUrlRes.data).show().delay(3000).fadeOut();
      }
    });
  }
  $("#submitBtn").click(function () {
    if (checkSuccess) {
      loadURL("mylinkface://check?result=1");
    } else {
      $("#tips").text("请先完成身份验证").show().delay(3000).fadeOut();
    }
  });
  function loadURL(url) {
    var iFrame;
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", url);
    iFrame.setAttribute("style", "display:none;");
    iFrame.setAttribute("height", "0px");
    iFrame.setAttribute("width", "0px");
    iFrame.setAttribute("frameborder", "0");
    document.body.appendChild(iFrame);
    // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
  }
});
