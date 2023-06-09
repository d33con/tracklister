import { mixState } from "@/atoms/mixesAtom";
import { convertPlayerDuration } from "@/helpers/convertDuration";
import {
  Center,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import {
  BsFillPersonFill,
  BsListUl,
  BsPauseCircle,
  BsPlayCircle,
} from "react-icons/bs";
import { useRecoilValue } from "recoil";

type PlayerProps = {};

const Player: React.FC<PlayerProps> = () => {
  const { currentlyPlayingMix } = useRecoilValue(mixState);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0.5);
  const [audioMuted, setAudioMuted] = useState(false);
  const playingAudioRef = useRef<HTMLAudioElement>(null);
  const audio = playingAudioRef?.current;

  let audioProgress = (currentTime / audio?.duration) * 100;

  const toggleAudio = useCallback(() => {
    setAudioPlaying((prevState) => !prevState);
    audio?.addEventListener("timeupdate", (e) => {
      const currentTime = Math.floor(audio.currentTime);
      setCurrentTime(currentTime);
    });
    audio?.addEventListener("ended", () => {
      setAudioPlaying(false);
      setCurrentTime(0);
    });
  }, [audio]);

  useEffect(() => {
    audio?.addEventListener("canplay", () => {
      audio?.play();
      const currentTime = Math.floor(audio.currentTime);
      setAudioPlaying(true);
      setCurrentTime(currentTime);
      setRemainingTime(audio.duration);
    });
    if (audioPlaying) {
      audio?.play();
      audio?.addEventListener("timeupdate", (e) => {
        const currentTime = Math.floor(audio.currentTime);
        setCurrentTime(currentTime);
        setRemainingTime(audio.duration - audio.currentTime);
      });
    } else {
      audio?.pause();
    }
  }, [audio, audioPlaying]);

  return (
    <section>
      <audio
        src={currentlyPlayingMix?.audioURL}
        ref={playingAudioRef}
        muted={audioMuted}
      />
      <Flex
        direction="row"
        height="52px"
        width="100%"
        bg="blue.800"
        pl={24}
        pr={24}
        alignItems="center"
        position="fixed"
        bottom="0"
      >
        {audioPlaying ? (
          <IconButton
            variant="link"
            aria-label="Pause audio"
            fontSize="38px"
            color="blackAlpha.900"
            mr={4}
            icon={<BsPauseCircle />}
            onClick={toggleAudio}
          />
        ) : (
          <IconButton
            variant="link"
            aria-label="Play audio"
            fontSize="38px"
            color="blackAlpha.900"
            mr={4}
            icon={<BsPlayCircle />}
            onClick={toggleAudio}
          />
        )}
        <Image
          src={currentlyPlayingMix?.imageURL}
          alt={currentlyPlayingMix?.title}
          boxSize="40px"
          mr={4}
        />
        <Flex
          textAlign="left"
          direction="column"
          alignItems="start"
          width="350px"
        >
          <Text color="whiteAlpha.900" fontSize="16px">
            {currentlyPlayingMix?.title}
          </Text>
          <Text color="whiteAlpha.900" fontSize="12px">
            by {currentlyPlayingMix?.creatorId}
          </Text>
        </Flex>
        <IconButton
          icon={<AiOutlineHeart />}
          aria-label="Favourite mix"
          color="whiteAlpha.900"
          variant="link"
          size="lg"
        />
        <IconButton
          icon={<BsFillPersonFill />}
          aria-label="View profile"
          color="whiteAlpha.900"
          variant="link"
          size="lg"
        />
        <IconButton
          icon={<BsListUl />}
          aria-label="Favourite mix"
          color="whiteAlpha.900"
          variant="link"
          size="lg"
        />
        <Flex direction="row" ml={8} width="100%">
          <Text color="whiteAlpha.900" fontSize="12px" mr={4} width="50px">
            {convertPlayerDuration(currentTime)}
          </Text>
          <Slider
            aria-label="Audio seek track"
            value={audioProgress}
            size="sm"
            pr={2}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text color="whiteAlpha.900" fontSize="12px" ml={4} width="50px">
            {convertPlayerDuration(remainingTime)}
          </Text>
        </Flex>
        <Popover isOpen={showVolumeControl} matchWidth>
          <PopoverTrigger>
            <IconButton
              icon={audioMuted ? <BiVolumeMute /> : <BiVolumeFull />}
              aria-label="Volume control"
              color="whiteAlpha.900"
              variant="link"
              size="lg"
              ml={2}
              onMouseEnter={() => setShowVolumeControl(true)}
              onClick={() => setAudioMuted((prevState) => !prevState)}
            />
          </PopoverTrigger>
          <PopoverContent
            width="40px"
            bgColor="blue.800"
            onMouseLeave={() => setShowVolumeControl(false)}
          >
            <Center>
              <Slider
                aria-label="Volume control slider"
                value={volumeLevel}
                orientation="vertical"
                minH="36"
                bgColor="blue.800"
                mb="34px"
                pt="12px"
              >
                <SliderTrack pt={2} pb={2}>
                  <SliderFilledTrack pt={2} pb={2} />
                </SliderTrack>
              </Slider>
            </Center>
          </PopoverContent>
        </Popover>
      </Flex>
    </section>
  );
};
export default Player;
