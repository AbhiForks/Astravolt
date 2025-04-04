import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);
  const heroHeadingRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVideoRef.current.play()
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
      gsap.to(heroHeadingRef.current, {
        color: "#000",
        duration: 1,
        ease: "power1.inOut",
      });
    }
  });
  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(25% 0%, 76% 0%, 90% 100%, 0% 100%)',
      borderRadius: '0 0 50% 20%'
    });
    gsap.from('#video-from', {
      clippath : 'polygon(25% 0%, 76% 0%, 90% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease : 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end : 'bottom center',
        scrub: true,
        pin: true,
      }
    })
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (currentVideoRef.current) {
      currentVideoRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
          <div onClick={handleMiniVdClick} className="origin-center scale-5 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
            <video
              ref={nextVideoRef}
              src={getVideoSrc(upcomingVideoIndex)}
              loop
              muted
              id="current-video"
              className="size-64 origin-center scale-150 object-cover"
              onLoadedData={handleVideoLoad}
            />
          </div>
        </div>
        <video
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />
        <video
          ref={currentVideoRef}
          src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />
      </div>
      <h1 ref={heroHeadingRef} className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-100">
        <b>Dy</b>namics
      </h1>
      <div className="absolute left-0 top-0 z-40 size-full">
        <div className="mt-24 px-5 sm:px-10">
          <h1 className="special-font hero-heading text-blue-100"><b>Astro</b>volt</h1>
          <p className="mb-5 max-w-64 font-robert-regula text-blue-100">Experience the Epic <br /></p>
          <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-500 flex-center gap-1" />
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>Dy</b>namics
      </h1>
    </div>
  );
}

export default Hero;

