<script>
export default {
    props: {
        show: Boolean,
        questionnaire: Array,
        userName: String,
        darkMode: Boolean,
    },
};
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" :class="{ 'dark-mode': darkMode }">
            <div class="modal-container" :class="{ 'dark-mode': darkMode }">
                <div class="modal-header border-b-2 border-gray-300">
                    <slot name="header"></slot>
                </div>

                <div class="modal-body border-b-2 border-gray-300">
                    <div v-for="(item, index) in questionnaire" :key="index">
                        <h2 class="text-xl font-bold mb-3">
                            <strong>Pergunta:</strong>
                            {{ item.pergunta.descricao }}
                        </h2>
                        <p class="items-center mb-3">
                            <strong>Resposta:</strong>
                            {{ item.resposta.descricao }}
                        </p>
                    </div>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button
                            class="modal-default-button px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                            @click="$emit('close')">
                            Fechar
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
    overflow-y: auto;
}

.dark-mode .modal-container {
    background-color: #000;
    color: #fff;
}

.dark-mode .modal-mask {
    background-color: #000;
    color: #fff;
}

.modal-container {
    width: 1024px;
    height: 900px;
    margin: auto;
    padding: 40px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    color: #42b983;
}

.header-title {
    font-size: 1.5em;
}

.modal-body {
    max-height: 720px;
    overflow-y: auto;
    margin: 30px 0px;
}

.modal-default-button {
    float: none;
    width: 6em;
    margin: auto;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
