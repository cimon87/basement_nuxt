<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
    
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        items: [
          { icon: 'apps', title: 'Security Panel', to: '/' },
          { icon: 'settings_input_component', title: 'GPIO', to: '/gpio' },
          { icon: 'inbox', title: 'Inbox', to: '/inbox' },
          { icon: 'send', title: 'Outbox', to: '/outbox' },
          { icon: 'message', title: 'Sms gateway', to: '/smsgateway' },
          { icon: 'perm_identity', title: 'Permissions', to: '/permissions' },
          { icon: 'list', title: 'Logs', to: '/logs' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Basement Security Panel'
      }
    }
  }
</script>
