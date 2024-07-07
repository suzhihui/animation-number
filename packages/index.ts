import AnimationNumber  from "./animation-number"

const components = [
    AnimationNumber
]

const install:any = (Vue:any) => {
    if (install.installed) { return }

    components.map(item => {
        Vue.component(item.name, item);
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    animationNumber: AnimationNumber
}