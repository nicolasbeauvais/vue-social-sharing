import Vue from 'vue'
import { storiesOf } from '@storybook/vue'

import VueSocialSharing from '../src/vue-social-sharing'

Vue.use(VueSocialSharing)

const withSettings = component => ({
  socialSharingSettings: new VueSocialSharing(),
  ...component
})

const stories = storiesOf('VueSocialSharing', module)

stories
  // Add some stories here to make your plugin more descriptive
  .add(
    'My Customs  Component',
    () =>
      withSettings({
        template: `
        <div>
          <vue-social-sharing />
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-social-sharing\`

        \`\`\`html
        <template>
          <vue-social-sharing />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'My Custom Component with another markup',
    () =>
      withSettings({
        template: `
        <div>
          <b>Hello</b>
          <vue-social-sharing />
          <i>world</i>
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-social-sharing\` with other components

        \`\`\`html
        <template>
          <div>
            <b>Hello</b>
            <vue-social-sharing />
            <i>world</i>
          </div>
        </template>
        \`\`\`
      `
    }
  )
