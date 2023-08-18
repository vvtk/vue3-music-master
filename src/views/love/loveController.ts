import {ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";

interface IMusicMenu {
    label: string,
    name: string,
}

export function useMusicMenu() {
    const menus: IMusicMenu[] = [
        {
            label: '歌曲',
            name: 'picked',
        },
        {
            label: '歌单',
            name: 'dt',
        }
    ];

    const router = useRouter();
    const route = useRoute();

    const currentMenu = ref(route.name)


    watch(() => route.name, m => {
        currentMenu.value = m
    })


    const onTabClick = ({props}: { props: IMusicMenu }) => {
        router.push({name: props.name, replace: true,})
    }

    return {
        menus,
        currentMenu,
        onTabClick,
    }
}
