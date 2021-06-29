import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import Details from "../views/event/Details";
import Edit from "../views/event/Edit";
import Register from "../views/event/Register";
import EventLayout from '../views/event/Layout';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';
import EventCreate from '../views/EventCreate.vue';
import NProgress from "nprogress";

import EventService from "../services/EventService";
import {GStore} from '@/store';

const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue');

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/create",
    name: "EventCreate",
    component: EventCreate,
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    component: EventLayout,
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: "404Resource",
              params: { resource: "event" },
            };
          } else {
            return { name: "NetworkError", };
          }
        });
    },
    children: [
      {
        path: "",
        name: "Details",
        component: Details,
      },
      {
        path: "edit",
        name: "Edit",
        component: Edit,
        meta: { requireAuth: true },
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => ({ path: '/events/' + to.params.afterEvent }),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to,from,savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = "Sorry, you are not authorized to biew this page";

    setTimeout(() => {
      GStore.flashMessage = '';
    }, 3000);
    if (from.href) {
      return false;
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
