export default {
  /**
   * Mixin for popup link sharers.
   */
  popup: {
    template: '<a :href="\'#share-\'+ network" @click.prevent="$parent.share(network)"><slot></slot></a>'
  },

  /**
   * Mixin for direct link sharers.
   */
  direct: {
    template: '<a v-bind:href="$parent._getSharer(network)" :data-action="attributes(\'data-action\')" @click="$parent.touch(network)"><slot></slot></a>',
    methods: {
      /**
       * Returns attribute value by key.
       *
       * @param key
       */
      attributes (key) {
        return this.attr !== undefined && this.attr[key] !== undefined
          ? this.attr[key]
          : undefined;
      }
    }
  }
};
