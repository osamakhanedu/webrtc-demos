var canvas = document.querySelector("canvas");

// Optional frames per second argument.
var recordedChunks = [];

navigator.mediaDevices
  .getDisplayMedia()
  .then((stream) => {
    var options = { mimeType: "video/webm" };
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();

    function handleDataAvailable(event) {
      console.log("data-available");
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        console.log(recordedChunks);
        download();
      } else {
        // ...
      }
    }
    function download() {
      var blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: block";
      a.href = url;
      a.download = "test.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }

    // demo: to download after 9sec
    setTimeout((event) => {
      console.log("stopping");
      mediaRecorder.stop();
    }, 10000);
  })
  .catch((err) => {
    console.log("error", err);
  });
