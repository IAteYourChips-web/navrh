import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once, on the client, for the whole app.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
