 /* eslint-disable */
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
          <div class="p-grid">
            <div class="p-col-4">
              <div class="p-d-flex p-jc-center p-ai-center">
                <img
                  v-if="currentAudio.cover && isPlaying"
                  :src="currentAudio.cover"
                  :class="{ image: isPlaying }"
                />
                <avatar
                  v-else-if="currentAudio.cover"
                  :image="currentAudio.cover"
                  class="p-mr-2"
                  size="xlarge"
                  style="width: 150px; height: 150px; border-radius: 100%"
                />
              </div>
            </div>
            <div class="p-col-8">
              <div class="p-text-center p-text-uppercase text-primary p-mb-4">
                {{ currentAudio.title }}
              </div>
              <div class="p-d-flex p-jc-center p-ai-center p-mb-2">
                <div>
                  <p-button
                    class="p-button-sm p-button-outlined p-button-text p-mr-1"
                    v-tooltip="'Add playlist'"
                    @click="showUploadDialog = true"
                    ><i class="material-icons md-18">playlist_add</i></p-button
                  >
                  <p-button
                    :disabled="!canPrev"
                    class="p-button-sm p-button-outlined p-button-text p-mr-1"
                    v-tooltip="'Previous'"
                    @click="onPrev"
                    ><i class="material-icons md-18">skip_previous</i></p-button
                  >
                  <p-button
                    v-if="isPlaying"
                    :disabled="!canControlAudio"
                    v-tooltip="'Pause'"
                    class="p-button-sm p-button-outlined p-button-text p-mr-1"
                    @click="onPause"
                    ><i class="material-icons md-18">pause</i></p-button
                  >
                  <p-button
                    v-else
                    :disabled="!canControlAudio"
                    v-tooltip="'Play'"
                    class="p-button-sm p-button-outlined p-button-text p-mr-1"
                    @click="onPlay"
                    ><i class="material-icons md-18">play_arrow</i></p-button
                  >
                  <p-button
                    :disabled="!canNext"
                    v-tooltip="'Next'"
                    class="p-button-sm p-button-outlined p-button-text p-mr-1"
                    @click="onNext"
                    ><i class="material-icons md-18">skip_next</i></p-button
                  >
                  <p-button
                    v-if="isMuted"
                    :disabled="!canControlAudio"
                    v-tooltip="'Mute'"
                    class="p-button-sm p-button-outlined p-button-text p-mr-1"
                    @click="toggleMuted"
                    ><i class="material-icons md-18">volume_off</i></p-button
                  >
                  <p-button
                    v-else
                    :disabled="!canControlAudio"
                    v-tooltip="'Unmute'"
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
                  :step="1"
                  @change="onUserPull"
                />
              </div>
              <div class="p-d-flex p-jc-between p-ai-center p-mb-4">
                <div>{{ displayTimeStart }}</div>
                <div>{{ displayTimeEnd }}</div>
              </div>
              <div class="p-d-flex p-jc-center p-ai-center">
                <p-button
                  class="p-button-sm p-button-outlined p-button-text p-mr-1"
                  v-tooltip="'Shuffle'"
                  @click="onShuffle"
                  ><i class="material-icons md-18">shuffle</i></p-button
                >
                <p-button
                  class="p-button-sm p-button-outlined p-button-text p-mr-1"
                  v-tooltip="'Loop'"
                  v-if="isLoop"
                  :disabled="!canControlAudio"
                  @click="toggleLoop"
                  ><i class="material-icons md-18">repeat_one</i></p-button
                >
                <p-button
                  class="p-button-sm p-button-outlined p-button-text p-mr-1"
                  v-else
                  v-tooltip="'Loop'"
                  :disabled="!canControlAudio"
                  @click="toggleLoop"
                  ><i class="material-icons md-18">repeat</i></p-button
                >
                <p-button
                  class="p-button-sm p-button-outlined p-mr-2 p-button-text"
                  v-tooltip="'Decrease volume'"
                  @click="onDecreaseVolume"
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
                  v-tooltip="'Increase volume'"
                  class="p-button-sm p-button-outlined p-ml-2 p-button-text p-ac-start"
                  @click="onIncreaseVolume"
                  ><i class="material-icons md-18">volume_up</i></p-button
                >
              </div>
            </div>
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
      optionLabel="title"
      filter
      listStyle="max-height:500px; height: 500px;"
    >
      <template #option="slotProps">
        <div class="p-d-flex">
          <avatar
            :image="slotProps.option.cover"
            class="p-mr-2"
            size="xlarge"
          />
          <div>
            <div>{{ slotProps.option.title }}</div>
            <div>{{ slotProps.option.artist }}</div>
            <div>{{ slotProps.option.album }}</div>
          </div>
        </div>
      </template>
    </list-box>
  </div>
  <p-dialog
    :header="'Upload music files'"
    :modal="true"
    :maximizable="true"
    v-model:visible="showUploadDialog"
    class="w-55vw"
  >
    <file-upload
      name="demo[]"
      accept="audio/*"
      :multiple="true"
      :customUpload="true"
      :chooseLabel="'Browse...'"
      :uploadLabel="'Add to playlist'"
      :cancelLabel="'Clear'"
      @uploader="uploadHandler"
    >
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </file-upload>
    <template #footer>
      <p-button
        label="Close"
        icon="pi pi-times"
        autofocus
        @click="showUploadDialog = false"
      />
    </template>
  </p-dialog>
  <!-- <scroll-top :threshold="200" /> -->
</template>

<script>
import _ from "lodash";
import jsmediatags from "jsmediatags";
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
      return this.convertNumberToTime(this.timeStart + this.currentTime);
    },
    displayTimeEnd() {
      return this.convertNumberToTime(this.timeEnd - this.currentTime);
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
    async uploadHandler(e) {
      this.currentAudio = {};
      this.audioList = [];
      this.files = [...e.files];

      for (let i = 0; i < this.files.length; i++) {
        let self = this;
        let onSuccess = function (tag) {
          let imageUrl = "";
          if (tag.tags.picture && tag.tags.picture.length !== 0) {
            imageUrl = window.URL.createObjectURL(
              new Blob([new Uint8Array(tag.tags.picture.data)], {
                type: tag.tags.picture.format,
              })
            );
          }
          self.audioList.push({
            src: window.URL.createObjectURL(self.files[i]),
            title: tag.tags.title || self.files[i].name,
            artist: tag.tags.artist,
            year: tag.tags.year,
            album: tag.tags.album,
            cover: imageUrl,
            hasCover: imageUrl !== "",
          });

          if (self.audioList.length !== 0) {
            self.currentAudio = { ...self.audioList[0] };
          }
        };
        await jsmediatags.read(this.files[i], {
          onSuccess,
          onError: function (error) {
            console.log(error);
          },
        });
      }

      this.showUploadDialog = false;
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
        this.currentAudio = {...this.audioList[0]};
        this.audioElement.play();
      } else {
        const nextAudio = this.audioList[this.currentIndex + 1];
        this.currentAudio = { ...nextAudio };
        this.isPlaying = false;
      }
    },
    onNext() {
      const nextAudio = this.audioList[this.currentIndex + 1];
      this.currentAudio = { ...nextAudio };
      this.isPlaying = false;
    },
    onPrev() {
      const prevAudio = this.audioList[this.currentIndex - 1];
      this.currentAudio = { ...prevAudio };
      this.isPlaying = false;
    },
    onPause() {
      this.isPlaying = false;
      this.audioElement.pause();
    },
    onPlay() {
      this.isPlaying = true;
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
    onIncreaseVolume() {
      this.currentVolume += 5;
      this.audioElement.volume = Number.parseInt(this.currentVolume) / 100;
    },
    onDecreaseVolume() {
      this.currentVolume -= 5;
      this.audioElement.volume = Number.parseInt(this.currentVolume) / 100;
    },
    onShuffle() {
      this.audioList = _.shuffle(this.audioList);
    },
  },
};
</script>
<style scoped>
.image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 100%;
  -webkit-animation: spin 8s linear infinite;
  -moz-animation: spin 8s linear infinite;
  animation: spin 8s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
