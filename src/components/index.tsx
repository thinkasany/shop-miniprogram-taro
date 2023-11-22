
import loadingGIF from "@/images/icon/loading.gif";

const Loading = (height) => {

  return (
    <div className="loading">
      <img
        className="img"
        src={loadingGIF}
        alt="loading"
        style={{ height }}
      />
      <div className="text">大风吹啊吹</div>
    </div>
  )
}

export default Loading;
