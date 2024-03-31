// src/SoundPlayer.tsx
import React from "react";

type SoundPlayerProps = {
  audioSrc: string;
  playCount: number;
};

type SoundPlayerState = {
  isPlaying: boolean;
  remainingPlays: number;
};

class SoundPlayer extends React.Component<SoundPlayerProps, SoundPlayerState> {
  audioRef: React.RefObject<HTMLAudioElement>;

  constructor(props: SoundPlayerProps) {
    super(props);
    this.audioRef = React.createRef<HTMLAudioElement>();
    this.state = {
      isPlaying: false,
      remainingPlays: 0,
    };
  }

  componentDidMount() {
    this.audioRef.current?.addEventListener("ended", this.handleAudioEnd);
  }

  componentDidUpdate(prevProps: SoundPlayerProps) {
    if (prevProps.audioSrc !== this.props.audioSrc) {
      this.audioRef.current?.pause();
      this.audioRef.current!.src = this.props.audioSrc;
      this.audioRef.current?.load();
      console.log("Audio source updated:", this.props.audioSrc);
    }
  }

  componentWillUnmount() {
    this.audioRef.current?.removeEventListener("ended", this.handleAudioEnd);
  }

  handleAudioEnd = () => {
    const { audioSrc } = this.props;
    this.setState((prevState) => {
      const { remainingPlays } = prevState;
      if (remainingPlays > 1) {
        this.audioRef.current?.play();
      }
      console.log("Audio source:", this.audioRef.current!.src);
      console.log("Remaining plays:", remainingPlays - 1);
      return {
        remainingPlays: remainingPlays - 1,
      };
    });
  };

  playSound = (audioSrc: string | undefined, playCount: number = 3) => {
    if (!audioSrc) {
      audioSrc = "default.mp3";
    }
    this.audioRef.current!.pause();
    var target_src = "/school-broadcast-simulator/" + audioSrc;
    if (this.audioRef.current!.src != target_src) {
      this.audioRef.current!.src = target_src;
      this.audioRef.current!.load();
    }
    this.audioRef.current!.addEventListener("canplay", (event) => {
      this.audioRef.current!.play();
      console.log("Playing sound:", audioSrc, playCount);
    });
    this.setState({
      isPlaying: true,
      remainingPlays: playCount,
    });
  };

  stopSound = () => {
    this.audioRef.current?.pause();
    // this.audioRef.current?.load();
    console.log("Sound stopped");
    this.setState({
      isPlaying: false,
      remainingPlays: 0,
    });
  };

  setVolume = (target_volume: number) => {
    console.log(this.audioRef.current!.volume); // 1
    this.audioRef.current!.volume = target_volume;
    console.log(this.audioRef.current!.volume); // 1
  };

  render() {
    return (
      <div>
        <audio id="audio" ref={this.audioRef} src={this.props.audioSrc} />
      </div>
    );
  }
}

export default SoundPlayer;
