import router from '@/router';
import store from '@/store';

import { getToken } from '@/utils/auth';

const whiteList = ['/login'];


router.router.beforeEach( async (to, from, next) => {
    /* must call `next` */
    const hasToken = getToken()

    if(hasToken){

        if(to.path === '/login'){
            next({path : '/'});
        }else{

            
        }

    }

});

