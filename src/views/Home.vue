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
            Lily
          </div>
          <div class="p-d-flex p-jc-center p-ai-center p-mb-2">
            <div>
              <p-button
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                ><i class="material-icons md-18">playlist_add</i></p-button
              >
              <p-button
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                ><i class="material-icons md-18">skip_previous</i></p-button
              >
              <p-button
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                ><i class="material-icons md-18">pause</i></p-button
              >
              <p-button
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                ><i class="material-icons md-18">play_arrow</i></p-button
              >
              <p-button
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                ><i class="material-icons md-18">skip_next</i></p-button
              >
              <p-button
                class="p-button-sm p-button-outlined p-button-text p-mr-1"
                ><i class="material-icons md-18">volume_off</i></p-button
              >
            </div>
          </div>

          <div class="p-d-flex p-jc-center p-ai-center p-mb-2">
            <slider v-model="currentTrack" :min="0" :max="100" />
          </div>
          <div class="p-d-flex p-jc-between p-ai-center p-mb-4">
            <div>0</div>
            <div>100</div>
          </div>
          <div class="p-d-flex p-jc-center p-ai-center">
            <p-button class="p-button-sm p-button-outlined p-button-text p-mr-1"
              ><i class="material-icons md-18">shuffle</i></p-button
            >
            <p-button class="p-button-sm p-button-outlined p-button-text p-mr-1"
              ><i class="material-icons md-18">replay</i></p-button
            >
            <p-button class="p-button-sm p-button-outlined p-mr-1 p-button-text"
              ><i class="material-icons md-18">volume_down</i></p-button
            >
            <slider v-model="volume" :min="0" :max="100" style="width: 7rem" />
            <p-button
              class="p-button-sm p-button-outlined p-mr-1 p-button-text p-ac-start"
              ><i class="material-icons md-18">volume_up</i></p-button
            >
          </div>
        </template>
      </card>
    </div>
  </div>
  <div class="p-col-6 p-offset-3 p-mt-5">
    <list-box
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      filter
    />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      volume: 50,
      currentTrack: 0,
      selectedCity: null,
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
    };
  },
  methods: {
    onFilesSelected(event) {
      console.log(event);
      debugger;
    },
  },
};
</script>
