import Vue from 'vue'
import { configure, storiesOf } from '@storybook/vue'
import './style.css'
import StaticData from './stories/static-data'
import DynamicData from './stories/dynamic-data'
import CustomShareNetwork from './stories/custom-share-network'
import MultipleShareNetworks from './stories/multiple-share-networks'

const stories = storiesOf('VueSocialSharing', module)

function loadStories () {
  stories.add(StaticData.name, StaticData.code, StaticData.params)
  stories.add(DynamicData.name, DynamicData.code, DynamicData.params)
  stories.add(CustomShareNetwork.name, CustomShareNetwork.code, CustomShareNetwork.params)
  stories.add(MultipleShareNetworks.name, MultipleShareNetworks.code, MultipleShareNetworks.params)
}

configure(loadStories, module)
