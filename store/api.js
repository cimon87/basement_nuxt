import apiInstance from '@/js/api/instance'
import Vue from 'vue'

const getInboxUrl = "/messages/inbox";
const messagesUrl = "/messages/send";
const getLogsUrl = "/logs";
const gpioUrl = "/gpio";
const setGpio = "setGpio";
const securityStatusUrl = "/security/status";
const permissionsUrl = "/security/permissions";

const setLoading = "setLoading";
const sending = "sending";
const setSecurityStatus = "setSecurityStatus";

export const state = () => ({
  basementApi : apiInstance,
  inboxList: [],
  sentList: [],
  logsList: [],
  gpioList: [],
  permissionsList: [],
  isLoading: false,
  sending: false,
  securityStatus: { Enabled: 0, SmsEnabled: 0, SilentMode: 0 }
})

export const mutations = {
  setSecurityStatus(state, payload)  {
    state.securityStatus = payload.data;
  },
  updateGpio: (state, payload) => {
    state.gpioList.forEach((gpio, index) => {
      if (gpio.PinName === payload.gpio.PinName) {
        console.log(gpio);
        Vue.set(state.gpioList, index, { ...gpio, State: 0 });
      }
    });
  },
  setGpio: (state, payload) => {
    state.gpioList = payload.data;
  },
  setInbox: (state, payload) => {
    state.inboxList = payload.data;
  },
  setLogs: (state, payload) => {
    state.logsList = payload.data;
  },
  setSentItems: (state, payload) => {
    state.sentList = payload.data;
  },
  setLoading: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  setPermissionsList: (state, permissions) => {
    state.permissionsList = permissions.data;
  },
  sending: (state, sending) => {
    state.sending = sending;
  }
}

export const actions = {
  setSecurityState(context, data) {
    return context.state.basementApi
    .post(securityStatusUrl, data)
    .then((response) => {
      console.log(response);
      context.commit(setSecurityStatus, { data: response.data });
    })
  },
  getSecurityStatus(context, data) {
    return context.state.basementApi
    .get(securityStatusUrl)
    .then((response) => {
      context.commit(setSecurityStatus, { data: response.data });
    })
  },
  getPermissionList(context, data) {
    return context.state.basementApi
    .get(permissionsUrl)
    .then((response) => {
      context.commit("setPermissionsList", { data: response.data });
    })
  },
  updatePermissionItem(context, data) {
    context.commit(setLoading, true);
    return context.state.basementApi
    .put(permissionsUrl,data)
    .then((response) => {
      context.commit("setPermissionsList", { data: response.data });
      context.commit(setLoading, false);
    })
  },
  deletePermissionItem(context, number) {
    context.commit(setLoading, true);
    return context.state.basementApi( { method: 'delete', url: permissionsUrl, data: { number } })
    .then((response) => {
      context.commit("setPermissionsList", { data: response.data });
      context.commit(setLoading, false);
    })
  },
  createPermissionItem(context, data) {
    return context.state.basementApi
    .post(permissionsUrl, data)
    .then((response) => {
      context.commit("setPermissionsList", { data: response.data });
    })
  },
  setGpio(context, data) {
    return context.state.basementApi
    .post(gpioUrl, data)
    .then((response) => {
      context.commit(setGpio, { data: response.data });
    })
  },
  getGpio(context) {
    context.commit(setLoading, true);
    return context.state.basementApi
    .get(gpioUrl)
    .then((response) => {
      context.commit(setGpio, { data: response.data })
      context.commit(setLoading, false);
    })
    .catch(() => {
      context.commit(setLoading, false);
    });
  },
  sendSms: (context, data) => {
    context.commit(sending, true);
    return context.state.basementApi
    .post(messagesUrl, data)
    .then(() => {
      context.commit(sending, false);
    })
    .catch(() => {
      context.commit(sending, false);
    });
  },
  getSent: (context) => {
    context.commit(setLoading, true);
    return context.state.basementApi
    .get(messagesUrl)
    .then((response) => {
      context.commit('setSentItems', { data: response.data });
      context.commit(setLoading, false);
    })
    .catch(() => {
      context.commit(setLoading, false);
    });
  },
  getInbox: (context) => {
    context.commit('setLoading', true);
    return context.state.basementApi
    .get(getInboxUrl)
    .then((response) => {
      context.commit('setInbox', { data: response.data });
      context.commit('setLoading', false);
    })
    .catch(() => {
      context.commit(setLoading, false);
    });
  },
  getLogs: (context) => {
    context.commit('setLoading', true);
    return context.state.basementApi
    .get(getLogsUrl)
    .then((response) => {
      context.commit('setLogs', { data: response.data });
      context.commit('setLoading', false);
    })
    .catch(() => {
      context.commit(setLoading, false);
    });
  }
}

export const getters = {
  securityStatus: (state) => {
    return state.securityStatus;
  },
  logsList: (state) => {
    return state.logsList;
  },
  inboxList: (state) => {
    return state.inboxList;
  },
  isLoading: (state) => {
    return state.isLoading;
  },
  sentList: (state) => {
    return state.sentList;
  },
  gpioList: (state) => {
    return state.gpioList;
  },
  permissionsList: (state) => {
    return state.permissionsList;
  }
}
