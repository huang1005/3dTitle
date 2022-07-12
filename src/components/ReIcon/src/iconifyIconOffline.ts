import { h, defineComponent } from "vue";
import { Icon as IconifyIcon, addIcon } from "@iconify/vue/dist/offline";
import HomeFilled from "@iconify-icons/ep/home-filled";
import Tickets from "@iconify-icons/ep/tickets";
import Monitor from "@iconify-icons/ep/monitor";
import Position from "@iconify-icons/ep/position";

addIcon("home-filled", HomeFilled)
addIcon("tickets", Tickets)
addIcon("monitor", Monitor)
addIcon("position", Position)


export default defineComponent({
    name: "IconifyIcon",
    props: {
        icon: {
            type: String,
            default: ''
        }
    },
    components: { IconifyIcon },
    render() {
        const attrs = this.$attrs
        return h(
            IconifyIcon,
            {
                icon: this.icon,
                ...attrs
            }
        )
    }
})