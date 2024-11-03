
const VideoTitleShimmer = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bottom-1 md:bottom-16 lg:bottom-36 left-2 md:left-6 lg:left-8 p-1 md:p-4 bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="h-8 md:h-14 lg:h-18  w-32 md:w-48 lg:w-72 mb-2 rounded-md shimmer"></div>
        <div className="h-6 md:h-16 lg:h-32  w-6/12 md:w-4/12 lg:w-3/12 mb-4 rounded-md shimmer"></div>
        <div className="flex space-x-2">
          <div className="h-6 md:h-10 lg:h-12 w-14 md:w-28 lg:w-32  rounded-md shimmer"></div>
          <div className="h-6 md:h-10 lg:h-12 w-14 md:w-28 lg:w-32  rounded-md shimmer"></div>
        </div>
    </div>      
  );
};

export default VideoTitleShimmer;
