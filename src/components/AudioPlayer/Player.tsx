import { mixState } from "@/atoms/mixesAtom";
import { convertPlayerDuration } from "@/helpers/convertDuration";
import {
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import {
  BsFillPersonFill,
  BsListUl,
  BsPauseCircle,
  BsPlayCircle,
  BsSoundwave,
} from "react-icons/bs";
import { useRecoilValue } from "recoil";
import NextLink from "next/link";

type PlayerProps = {};

const Player: React.FC<PlayerProps> = () => {
  const { currentlyPlayingMix } = useRecoilValue(mixState);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(1);
  const [prevVolumeLevel, setprevVolumeLevel] = useState(1);
  const [audioMuted, setAudioMuted] = useState(false);
  const playingAudioRef = useRef<HTMLAudioElement>(null);
  const audio = playingAudioRef?.current;

  const toggleAudio = () => {
    setAudioPlaying((prevState) => !prevState);
    audio?.addEventListener("timeupdate", () => {
      const currentTime = Math.floor(audio.currentTime);
      setCurrentTime(currentTime);
    });
  };

  const handleProgressChange = (value: number) => {
    setCurrentTime(value);
    audio!.currentTime = value;
  };

  const handleVolumeChange = (val: number) => {
    setVolumeLevel(val);
    setprevVolumeLevel(val);
  };

  useEffect(() => {
    audio?.addEventListener("loadedmetadata", () => {
      setRemainingTime(audio.duration);
    });
    audio?.addEventListener("canplay", () => {
      audio?.play();
      setAudioPlaying(true);
    });
    audio?.addEventListener("ended", () => {
      setAudioPlaying(false);
      setCurrentTime(0);
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

  useEffect(() => {
    if (audio) {
      audio.volume = volumeLevel;
    }
  }, [volumeLevel, audio]);

  useEffect(() => {
    if (audioMuted) {
      setVolumeLevel(0);
    } else {
      setVolumeLevel(prevVolumeLevel);
    }
  }, [prevVolumeLevel, audioMuted]);

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
        {currentlyPlayingMix?.imageURL ? (
          <Image
            src={currentlyPlayingMix?.imageURL}
            alt={currentlyPlayingMix?.title}
            boxSize="40px"
            mr={4}
          />
        ) : (
          <Icon as={BsSoundwave} boxSize="40px" mr={4} />
        )}
        <Flex
          textAlign="left"
          direction="column"
          alignItems="start"
          width="400px"
        >
          <Link
            as={NextLink}
            href={`/${currentlyPlayingMix?.creatorSlug}/${currentlyPlayingMix?.slug}`}
          >
            <Text color="whiteAlpha.900" fontSize="14px" noOfLines={1}>
              {currentlyPlayingMix?.title}
            </Text>
          </Link>
          <Link
            as={NextLink}
            href={`/${currentlyPlayingMix?.creatorSlug}`}
            mr={6}
          >
            <Text color="whiteAlpha.900" fontSize="11px">
              by {currentlyPlayingMix?.creatorName}
            </Text>
          </Link>
        </Flex>
        <Flex direction="row" alignItems="center">
          <IconButton
            icon={<AiOutlineHeart />}
            aria-label="Favourite mix"
            color="whiteAlpha.900"
            variant="link"
            size="lg"
            _active={{
              color: "whiteAlpha.900",
            }}
          />
          <Link as={NextLink} href={`/${currentlyPlayingMix?.creatorSlug}`}>
            <IconButton
              icon={<BsFillPersonFill />}
              aria-label="View creator profile"
              color="whiteAlpha.900"
              variant="link"
              size="lg"
              mt={1}
              _active={{
                color: "whiteAlpha.900",
              }}
            />
          </Link>
          <Link
            as={NextLink}
            href={`/${currentlyPlayingMix?.creatorSlug}/${currentlyPlayingMix?.slug}`}
          >
            <IconButton
              icon={<BsListUl />}
              aria-label="View tracklist"
              color="whiteAlpha.900"
              variant="link"
              size="lg"
              mt={1}
              _active={{
                color: "whiteAlpha.900",
              }}
            />
          </Link>
        </Flex>
        <Flex direction="row" ml={8} width="100%">
          <Text color="whiteAlpha.900" fontSize="12px" mr={4} width="50px">
            {convertPlayerDuration(currentTime)}
          </Text>
          <Slider
            aria-label="Audio seek track"
            defaultValue={0}
            value={currentTime}
            min={0}
            max={audio?.duration}
            size="sm"
            pr={2}
            onChange={handleProgressChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text color="whiteAlpha.900" fontSize="12px" ml={4} width="50px">
            {remainingTime ? convertPlayerDuration(remainingTime) : "--:--"}
          </Text>
        </Flex>
        <Flex direction="row" alignItems="center">
          <IconButton
            icon={audioMuted ? <BiVolumeMute /> : <BiVolumeFull />}
            aria-label="Volume control"
            color="whiteAlpha.900"
            variant="link"
            size="lg"
            ml={2}
            onClick={() => setAudioMuted((prevState) => !prevState)}
          />
          <Slider
            aria-label="Volume control slider"
            min={0}
            max={1}
            step={0.1}
            value={volumeLevel}
            onChange={(val) => handleVolumeChange(val)}
            bgColor="blue.800"
            width="80px"
          >
            <SliderTrack height={3}>
              <SliderFilledTrack height={3} />
            </SliderTrack>
          </Slider>
        </Flex>
      </Flex>
    </section>
  );
};
export default Player;
