<template>
  <div>
    <Carousel :per-page="1" :mouseDrag="true" :paginationEnabled="false">
      <Slide v-for="(slide, index) in slides" :key="index">
        <div
          class="slider_bck"
          :style="{ background: `url(${slide.background})` }"
        >
          <div class="gradient">
            <div class="container">
              <div class="content">
                <Button linkTo="#" type="link">
                  See Review
                </Button>
                <div class="item">
                  {{ slide.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import SlideOne from '../../assets/images/featured/1.jpg';
import SlideTwo from '../../assets/images/featured/2.jpg';
import SlideThree from '../../assets/images/featured/3.jpg';
import SlideFour from '../../assets/images/featured/4.jpg';

export default {
  data() {
    return {
      slides: [
        {
          title: 'Red Dead Redemption 2',
          background: SlideOne,
        },
        {
          title: 'Watchdogs 2',
          background: SlideTwo,
        },
        {
          title: 'Rise of the Tomb Raider',
          background: SlideThree,
        },
        {
          title: 'Spider Man',
          background: SlideFour,
        },
      ],
    };
  },
  components: {
    Slide,
    Carousel,
  },
};
</script>
