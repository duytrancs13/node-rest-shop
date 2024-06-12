const fs = require("fs");

exports.streamLocalFile = async (request, response, next) => {
  // Ensure there is a range given for the video
  const range = request.headers.range;
  if (!range) {
    response.status(400).send("Requires Range header");
  }

  const videoPath = "Chris-Do.mp4";
  const videoSize = fs.statSync("Chris-Do.mp4").size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  response.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(response);
};

exports.streamUrl = async (request, response, next) => {
  var fileUrl =
    "https://firebasestorage.googleapis.com/v0/b/videostore-fc49a.appspot.com/o/438977143_1137762070602257_4752466063248295124_n.mp4?alt=media&token=93b9b1ff-6535-487c-994b-a34a67e5208a";

  var range = req.headers.range;
  var positions, start, end, total, chunksize;

  // HEAD request for file metadata
  request(
    {
      url: fileUrl,
      method: "HEAD",
    },
    function (error, response, body) {
      setResponseHeaders(response.headers);
      pipeToResponse();
    }
  );

  function setResponseHeaders(headers) {
    positions = range.replace(/bytes=/, "").split("-");
    start = parseInt(positions[0], 10);
    total = headers["content-length"];
    end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    chunksize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });
  }

  function pipeToResponse() {
    var options = {
      url: fileUrl,
      headers: {
        range: "bytes=" + start + "-" + end,
        connection: "keep-alive",
      },
    };

    request(options).pipe(res);
  }
};
