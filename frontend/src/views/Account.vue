<template>
    <div class="row">
        <div class="col-sm-4 offset-sm-4">
            <nickname></nickname>
            <password></password>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Nickname from '@/components/account/Nickname'
    import Password from '@/components/account/Password'

    export default {
        components: {
            nickname: Nickname,
            password: Password
        },
        data () {
            return {
                nickname: '',
                busy: true
            }
        },
        beforeMount () {

        }
    }
</script>

