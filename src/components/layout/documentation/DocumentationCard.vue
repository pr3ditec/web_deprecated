<script>
export default {
    props: {
        method: {
            type: String,
            required: true,
        },
        route: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: "bg-success",
        },
        details: {
            type: String,
            default: "",
        },
        parameters: {
            type: Array,
            default: [],
        },
        responses: {
            type: Array,
            default: [],
        },
        autenticate: {
            type: Boolean,
            default: true,
        },
        showDetailsRoute: Function
    },
    methods: {
        showDetailsRoute(method, route, details, parameters, responses, autenticate) {
            let documentationRoutes = document.getElementsByClassName("documentation-route");

            if (documentationRoutes) {
                for (let i = 0; i < documentationRoutes.length; i++) {
                    if (documentationRoutes[i].title === route && documentationRoutes[i].getAttribute('method-route') === method) {
                        documentationRoutes[i].classList.add('text-primary');
                        documentationRoutes[i].classList.add('dark:text-primary');
                    } else {
                        documentationRoutes[i].classList.remove('text-primary');
                        documentationRoutes[i].classList.remove('dark:text-primary');
                    }
                }
            }

            this.showDetailsRoute(route, details, parameters, responses, autenticate);
        },
    }
};
</script>

<template>
    <div class="flex align-center pt-2">
        <button
            type="button"
            class="text-left"
            @click="showDetailsRoute(method, route, details, parameters, responses, autenticate)">
            <span class="badge" :class="color">{{ $t(method) }}</span>
            <span
                class="ltr:pl-3 rtl:pr-3 font-extrabold text-black dark:text-[#506690] dark:group-hover:text-white-dark documentation-route"
                :title=route
                :method-route=method
                >{{ $t(route) }}</span
            >
        </button>
    </div>
</template>
