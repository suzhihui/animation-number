import AnimationNumber from "./animation-number.vue"

AnimationNumber.install = (Vue:any) => {
    Vue.component(AnimationNumber.name, AnimationNumber);
}

export default AnimationNumber