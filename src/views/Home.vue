<template>
  <div class="p-grid">
    <div class="p-col-6 p-offset-3">
      <card class="h-35vh">
        <template #title>
          <div class="text-primary">
            <i class="material-icons">graphic_eq</i> Music
          </div>
        </template>
        <template #content>
          <div class="p-text-center p-text-uppercase text-primary p-mb-4">
            {{ currentAudio.title }}
          </div>
          <div class="p-d-flex p-jc-center p-ai-center p-mb-2">
            <div>
              <p-button
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                ><i class="material-icons md-18">playlist_add</i></p-button
              >
              <p-button
                :disabled="!canPrev"
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                @click="onPrev"
                ><i class="material-icons md-18">skip_previous</i></p-button
              >
              <p-button
                v-if="isPlaying"
                :disabled="!canControlAudio"
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                @click="onPause"
                ><i class="material-icons md-18">pause</i></p-button
              >
              <p-button
                v-else
                :disabled="!canControlAudio"
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                @click="onPlay"
                ><i class="material-icons md-18">play_arrow</i></p-button
              >
              <p-button
                :disabled="!canNext"
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                @click="onNext"
                ><i class="material-icons md-18">skip_next</i></p-button
              >
              <p-button
                v-if="isMuted"
                :disabled="!canControlAudio"
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                @click="toggleMuted"
                ><i class="material-icons md-18">volume_off</i></p-button
              >
              <p-button
                v-else
                :disabled="!canControlAudio"
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                @click="toggleMuted"
                ><i class="material-icons md-18">volume_up</i></p-button
              >
            </div>
          </div>

          <div class="p-d-flex p-jc-center p-ai-center p-mb-2">
            <slider
              v-model="currentTime"
              :min="timeStart"
              :max="timeEnd"
              step="1"
              @change="onUserPull"
            />
          </div>
          <div class="p-d-flex p-jc-between p-ai-center p-mb-4">
            <div>{{ displayTimeStart }}</div>
            <div>{{ displayTimeEnd }}</div>
          </div>
          <div class="p-d-flex p-jc-center p-ai-center">
            <p-button class="p-button-sm p-button-outlined p-button-text p-mr-1"
              ><i class="material-icons md-18">shuffle</i></p-button
            >
            <p-button
              class="p-button-sm p-button-outlined p-button-text p-mr-1"
              @click="toggleLoop"
              v-if="isLoop"
              :disabled="!canControlAudio"
              ><i class="material-icons md-18">replay</i></p-button
            >
            <p-button class="p-button-sm p-button-outlined p-mr-1 p-button-text"
              ><i class="material-icons md-18">volume_down</i></p-button
            >
            <slider
              v-model="currentVolume"
              :min="0"
              :max="100"
              style="width: 7rem"
              @change="onChangeVolume"
            />
            <p-button
              class="p-button-sm p-button-outlined p-mr-1 p-button-text p-ac-start"
              ><i class="material-icons md-18">volume_up</i></p-button
            >
          </div>
        </template>
      </card>
      <audio
        ref="audioElement"
        :src="currentAudio.src"
        :loop="isLoop"
        @timeupdate="onTimeUpdate"
        @loadeddata="onLoadedAudio"
        autoplay
        @ended="onEnded"
      />
    </div>
  </div>
  <div class="p-col-6 p-offset-3 p-mt-5">
    <list-box
      v-model="currentAudio"
      :options="audioList"
      optionLabel="name"
      filter
    />
  </div>
  <dialog position="bottomright" v-model:visible="showUploadDialog">
    Content
  </dialog>
</template>

<script>
import _ from "lodash";
// import jsmediatags from "jsmediatags";
export default {
  name: "Home",
  data() {
    return {
      currentTime: 0,
      currentAudio: {},
      audioList: [],
      timeStart: 0,
      timeEnd: 0,
      isPlaying: false,
      audioElement: null,
      isLoop: false,
      isMuted: false,
      files: null,
      currentVolume: 100,
      showUploadDialog: false,
    };
  },
  computed: {
    displayTimeStart() {
      return this.convertNumberToTime(this.timeStart);
    },
    displayTimeEnd() {
      return this.convertNumberToTime(this.timeEnd);
    },
    canNext() {
      if (this.audioList.length === 0) {
        return false;
      }
      const currentIndex = this.audioList.findIndex((x) =>
        _.isEqual(x, this.currentAudio)
      );
      return currentIndex < this.audioList.length - 1;
    },
    canControlAudio() {
      return this.audioList.length !== 0;
    },
    canPrev() {
      if (this.audioList.length === 0) {
        return false;
      }
      const currentIndex = this.audioList.findIndex((x) =>
        _.isEqual(x, this.currentAudio)
      );
      return currentIndex > 0;
    },
    currentIndex() {
      if (this.audioList.length === 0) {
        return 0;
      }
      return this.audioList.findIndex((x) => _.isEqual(x, this.currentAudio));
    },
  },
  mounted() {
    this.audioElement = this.$refs.audioElement;
  },
  methods: {
    onFilesSelected(event) {
      console.log(event);
      debugger;
    },
    onLoadedAudio() {
      this.timeStart = this.audioElement.currentTime;
      this.timeEnd = this.audioElement.duration;
      this.currentTime = 0;
      this.isPlaying = true;
    },
    onTimeUpdate() {
      this.currentTime = this.audioElement.currentTime;
    },
    onEnded() {
      if (!this.canNext) {
        this.currentTime = 0;
        this.currentAudio = {};
        this.audioList = [];
        this.files = [];
        if (!this.isLoop) {
          this.isPlaying = false;
        }
      } else {
        const nextAudio = this.audioList[this.currentIndex + 1];
        this.currentAudio = { ...nextAudio };
        this.isPlaying = false;
      }
    },
    onNext() {
      const nextAudio = this.audioList[this.currentIndex + 1];
      this.currentAudio = { ...nextAudio };
      this.isPlay = false;
    },
    onPrev() {
      const prevAudio = this.audioList[this.currentIndex - 1];
      this.currentAudio = { ...prevAudio };
      this.isPlay = false;
    },
    onPause() {
      this.isPlay = false;
      this.audioElement.pause();
    },
    onPlay() {
      this.isPlay = true;
      this.audioElement.play();
    },
    toggleLoop() {
      this.isLoop = !this.isLoop;
    },
    toggleMuted() {
      this.audioElement.muted = !this.audioElement.muted;
      this.isMuted = this.audioElement.muted;
    },
    onChangeVolume(currentVolume) {
      this.currentVolume = currentVolume;
      this.audioElement.volume = Number.parseInt(currentVolume) / 100;
    },
    onUserPull(currentTime) {
      this.currentTime = currentTime;
      this.audioElement.currentTime = currentTime;
    },
    convertNumberToTime(number) {
      if (!Number.isFinite(number)) {
        return "00:00:00";
      }

      let parseValue = Number.parseInt(number, 10);
      if (parseValue === 0) {
        return "00:00:00";
      }

      let hours = Math.floor(parseValue / 3600);
      let minutes = Math.floor((parseValue - hours * 3600) / 60);
      let seconds = parseValue - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
