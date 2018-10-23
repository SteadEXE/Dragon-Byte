<template>
    <div id="error-message" class="text-center text-danger">
        <i class="fas fa-sad-tear my-4"></i>

        <div class="text">La connexion au serveur a été perdu.</div>
        <div class="subtext">Tentative de reconnexion en cours...</div>
    </div>
</template>

<style>
    #error-message i {
        font-size: 80px;
        display: block;
    }

    #error-message .text {
        font-size: 36px;
    }

    #error-message .subtext {
        font-size: 20px;
    }
</style>
